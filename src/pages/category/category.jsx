import React,{ useEffect, useState, useRef} from "react";
import { Card, Button, Icon, Table, Divider, message, Modal } from 'antd';
import { reqAddCategory, reqUpdateCategory, reqCategory } from "../../api/index";
import AddForm from "./add-form";
import UpdateForm from "./update-form";
import LinkButton from "../../components/link-button";
const Category = () => {
    const title = 'First-Level Classification List'
    const [category, setCategory] = useState([])
    const [Loading, setLoading] = useState(false)
    const [SubCategory, setSubCategory] = useState()
    const [parentId, setParentId] = useState('0')
    const [parentName, setParentName] = useState('LinkButton')
    const [showStatus, setShowStatus] = useState(0)
    const cates = useRef('')     //当前行的值
    const form = useRef()
    // add
    const addCategory = () => {
      //进行表单验证，rules都通过 err === 0
      form.current.validateFields(async (err, values) => {
        if (!err){
          const { categoryName, parent_Id } = values
          const result = await reqAddCategory(categoryName, parent_Id)
          setShowStatus(0)
          form.current.resetFields()
          if(result.status === 0){
            message.success('ADD Success')
            if(parentId === parent_Id){ //添加的就是当前列表的分类
              getCategorys();
            }else if(parent_Id === '0'){ //如果不是，在二级里添加一级，则更新一级列表，但state没更新，不会跳转
              getCategorys('0');
        }
    }
        }
      })
      
  }
  
    const showAdd = () => {
      setShowStatus(1)

    }
    // update
    const updateCategory = () => {
      form.current.validateFields(async (err, values) => {
        if(!err){
          const categoryId = cates.current._id;
          const {categoryName} = values
          const result = await reqUpdateCategory(categoryId,categoryName)
          form.current.resetFields()
          setShowStatus(0)
          if(result.status === 0){
            getCategorys();
          }
        }
      })
    }

    const showUpdate = (sth) => {
      //将render中的当前值保存出来
      cates.current = sth
      setShowStatus(2)
    }
    //cancel
    const handleCancel = () => {
      setShowStatus(0)
    }

  const showCategory = () => {
    setParentId('0')
    setParentName('')
    setSubCategory([])
  }
    
    const extra = (
      <div>
        <Button type='primary' onClick={showAdd}>
            <Icon type='plus'></Icon>
            <span>ADD</span>
        </Button>
      </div>
    )
    const showSubCategory = (sth) => {
      setParentId(sth._id);
      setParentName(sth.name);
      //还是 ‘0’ 因为state此时还没有更新
      console.log('parentID',parentId)
      console.log(sth)
    }
    //注意：不能写在上边，因为state是异步更新的（特性）需要用effect去等待state更新后
    //再执行getCategory
    useEffect(() => {
      //已经更新过了
      console.log('parentID',parentId)
      getCategorys( parentId );
    }, [parentId, parentName])
      
      const columns = [
        {
          title: 'Classification',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Action',
            key: 'operation',
            //生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引	render(text, record, index)
            render: (sth) => (
                <span>
                    <LinkButton onClick={() => showUpdate(sth)}>modify</LinkButton>
                    {/* 向事件回调函数传递参数，需要在外部先包一个函数 */}
                    <Divider type="vertical" />
                    {parentId === '0' ? <LinkButton onClick={() => showSubCategory(sth)}>sub-categories</LinkButton> : null}
                </span>
            ),
          }
      ];

    //get
    const getCategorys = async (pid) => {
      setLoading(true);
      const id = pid || parentId;
      const result = await reqCategory(id);
      setLoading(false);
      if(result.status === 0 ){
        const categorys = result.data;
        if(parentId === '0'){
          setCategory(categorys);
        }else{
          setSubCategory(categorys);
        }
      }else{
        message.error('Get Category ERROR!');
      }
    }

    return (
        <div>
            <Card title={parentId === '0' ? <span>{title}</span> : (
              <span>
                <LinkButton onClick={showCategory}>1 level</LinkButton>
                <Icon type='arrow-right'></Icon>
                <span>{parentName}</span>
              </span>
            )} extra={extra}>
            <Table dataSource={parentId === '0' ? category:SubCategory}
            columns={columns}
            bordered 
            loading={Loading}
            pagination={{pageSize:7, showQuickJumper:true}} />
         </Card>
      
         <Modal
          title="Add"
          visible={showStatus === 1}
          onOk={addCategory}
          onCancel={handleCancel}
        >
          <AddForm category={category}
           parentId={parentId}
           setForm={(data) => form.current = data}
           />
        </Modal>        
       
        <Modal
          title="Modify"
          visible={showStatus === 2}
          onOk={updateCategory}
          onCancel={handleCancel}
        >
          <UpdateForm categoryName={cates.current.name} setForm={(data) => form.current = data}/>
        </Modal>
      </div>
    )
}

export default Category;