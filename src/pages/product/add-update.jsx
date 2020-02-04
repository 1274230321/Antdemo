import React, { useRef, useState, useEffect } from "react";
import { Card, message, Form, Button, Icon, Input, Upload, Cascader } from "antd";
import PictureWall from "./picture-wall";
import RichTextEditor from "./rich-text-editor";
import './product.less'
import { reqCategory } from '../../api/index'
import LinkButton from "../../components/link-button/index";
import { reqAddOrUpdateProduct } from "../../api/index";

const AddUpdate = (props) => {
    const { Item } = Form
    const { TextArea } = Input
    const { getFieldDecorator, validateFields } = props.form
    const editor = useRef()
    const [options, setOptions] = useState([])
    const product = useRef()
    const isUpdate = useRef('')
    const categoryIds = useRef([])
    const pw = useRef()
    //update getstate不为空
    const getState = props.location.state
    product.current = getState || {}
    isUpdate.current = !!getState
    //hooks
    useEffect(() => {
        getCategory('0')
        if (isUpdate.current) {
            const { categoryId, pCategoryId } = props.location.state
            if (pCategoryId === '0') {
                categoryIds.current.push(categoryId)
            } else {
                categoryIds.current.push(pCategoryId)
                categoryIds.current.push(categoryId)
            }
        }

    }, [])

    //callback
    const handleSubmit = () => {
        validateFields(async (err, values) => {
            if (!err) {
                const { name, desc, price, categoryIds } = values;
                //const detail = editor.current
                //pw.current 即代表子组件 父组件调用子组件方法
                const imgs = pw.current.getImgs();
                const detail = editor.current.getDetail();
                let pCategoryId = ''
                let categoryId = ''
                if (categoryIds.length === 1) { // 选择的是一级分类
                    pCategoryId = '0'
                    categoryId = categoryIds[0]
                } else { // 选择的是二级分类
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const productData = { name, desc, price, pCategoryId, categoryId, imgs, detail }
                //if update 还需要指定update的值
                if(isUpdate) {
                    productData._id = product.current._id 
                }
                const result = await reqAddOrUpdateProduct(productData);
                if (result.status === 0) {
                    message.success('Upload success')
                    props.history.goBack();
                } else {
                    message.error('Upload failed')
                }
            } else {
                message.error('feckup')
            }
        })
    }
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const validatePrice = (rule, value, callback) => {
        value = value * 1;
        if (value > 0) {
            callback()
        } else {
            callback('Please input correct price number!')
        }
    }

    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //异步请求二级列表的内容
        targetOption.loading = true;
        const subCategorys = await getCategory(targetOption.value)
        targetOption.loading = false;
        // load options lazily
        if (!subCategorys.status && subCategorys.length > 0) {
            const cOptions = subCategorys.map((s) => ({
                value: s._id,
                label: s.name,
                isLeaf: true
            }))
            targetOption.children = cOptions;
        } else {
            targetOption.isLeaf = true
        }
        setOptions(options)
    };
    const getCategory = async (parentId) => {
        const result = await reqCategory(parentId)
        const categorys = result.data
        if (result.status === 0) {
            if (parentId === '0') {
                initOptions(categorys)
            } else {
                return categorys
            }
        } else {
            message.error("Can't get category！")
        }
    }
    const initOptions = async (category) => {
        const options = category.map((c) => ({
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        //如果是update，且是二级列表
        if (isUpdate.current && product.current.pCategoryId !== '0') {
            const result = await getCategory(product.current.pCategoryId)
            if (result && result.length > 0) {
                const cOptions = result.map((c) => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }))
                //找到对应的一级option
                const targetOption = options.find(option => option.value === product.current.pCategoryId)
                targetOption.children = cOptions
            }
        }
        setOptions(options)
    }

    //data
    const title = (
        <span>
            <LinkButton onClick={props.history.goBack}>
                <Icon type="arrow-left" />
            </LinkButton>
            <span style={{ margin: '0 10px' }}>{isUpdate.current ? 'Update Product' : 'Add Product'}</span>
        </span>
    )
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 8 }
    }
    const detailsLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 }
    }


    return (
        <Card title={title}>
            <Form>
                <Item label='Product Name'  {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: product.current.name,
                        rules: [
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ],
                    })(<Input />)}
                </Item>
                <Item label='Product Description' {...formItemLayout}>
                    {getFieldDecorator('desc', {
                        initialValue: product.current.desc,
                        rules: [
                            {
                                required: true,
                                message: 'Please input product description!',
                            },
                        ],
                    })(<TextArea placeholder='Please input product description' autoSize={{ maxRows: 6, minRows: 2 }} />)}
                </Item>
                <Item label='Price' {...formItemLayout}>
                    {getFieldDecorator('price', {
                        initialValue: product.current.price,
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Product price!',
                            },
                            {
                                validator: validatePrice,
                            },
                        ],
                    })(<Input prefix="$" suffix="USD" />)}
                </Item>
                <Item label="Product Category" {...formItemLayout}>
                    {
                        getFieldDecorator('categoryIds', {
                            initialValue: categoryIds.current,
                            rules: [
                                { required: true, message: 'Please input product category!' }
                            ]
                        })(<Cascader
                            options={options}
                            loadData={loadData} />
                        )}
                </Item>
                <Item label="Pictures" {...formItemLayout}>
                    <PictureWall ref={pw} imgs={product.current.imgs} />
                </Item>
                <Item label="Details" {...detailsLayout} className='product-detail'>
                    <RichTextEditor ref={editor} detail={product.current.detail}/>
                </Item>

                <Item label="Upload" extra="aa" {...formItemLayout}>
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
              </Button>
                        </Upload>
                    )}
                </Item>
                <Item {...formItemLayout}>
                    <Button type='primary' onClick={handleSubmit}>Submit</Button>
                </Item>

            </Form>
        </Card>
    )
}

export default Form.create()(AddUpdate);