import React,{ useEffect, useState, useRef } from "react";
import { Card, Table, Icon, Button, Select, Input, Form, message } from "antd";
import { reqProduct, reqUpdateProductStatus, reqSearchProducts } from "../../api/index";
import { PAGE_SIZE } from "./cosntants";
import LinkButton from "../../components/link-button/index";


const ProductHome = (props) =>{
    const [productsList, setProductsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [searchType, setSearchType] = useState('productName')
    const {Option} = Select
    const PageNum = useRef('')
    const SearchInfo = useRef('')
   
    //hooks
    useEffect(() => {
        getProducts(1);
    },[])

    //callback
    const addProduct = () => {
        props.history.push('/product/addupdate')
    }
    const updateProductStatus = async (productId, status) => {
        const result = await reqUpdateProductStatus(productId, status) 
        if (result.status === 0) {
        message.success('Porduct status upadate success!')
        getProducts(PageNum.current || 1) 
    }
        }
        
    const getProducts = async (pageNum) => {
        PageNum.current = pageNum;
        setLoading(true);
        let result;
        if(SearchInfo){ //搜索分页
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, SearchInfo.current)
        }else{ //一般分页
            result = await reqProduct(pageNum, PAGE_SIZE);
        }
        setLoading(false);
        const {total, list} = result.data
        if(result.status === 0){
            setProductsList(list)
            setTotal(total)
        }
    }


    //data
    const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
        },
        {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => '$' + price
        },
        {
            width: 100,
            title: 'Status',
            dataIndex: 'status',
            render: (status, thisRow) => {
                let btnText = 'Pull OFF'
                let statusText = 'ON';
                if(status === 2){
                    btnText =  'Put ON'
                    statusText = 'OFF'
                }
                status = status === 1 ? 2 : 1
                return (
                    <span>
                        <Button type='primary' 
                        onClick={() => {
                            updateProductStatus(thisRow._id, status)
                            console.log(status)
                                }}>{btnText}</Button>
                <span style={{margin : '0 auto'}}>{statusText}</span>
                    </span>
                )
            },
        },
        {
            width: 100,
            title: 'Operation',
            key: 'operation',
            render: (product) => (
                <span>
                    <LinkButton onClick={() => props.history.push('/product/detail',product)}>Detail</LinkButton>
                    <LinkButton onClick={() => props.history.push('/product/addupdate',product)}>Modify</LinkButton>
                </span>
            ),
          }
      ];
      const title = (
        <span>
         <Select style={{width : 170}} 
         defaultValue = 'productName' 
         onChange={value => setSearchType(value)}
         >
            <Option value="productName">BY NAME</Option>
            <Option value="productDesc">BY DESCRIPTION</Option>
         </Select>  
          <Input style={{width : 200, margin : '0 10px'}} onChange={(e) => SearchInfo.current = e.target.value}></Input>
          <Button type='primary' onClick={() => getProducts(1)}>
            <Icon type='search'></Icon>
            Search
          </Button>
        </span>
    )
    const extra = (
        <div>
          <Button type='primary' onClick={addProduct}>
              <Icon type='plus'></Icon>
              <span>ADD Product</span>
          </Button>
        </div>
      )


    return (
        <div>
          <Card title={title} extra={extra}>
            <Table dataSource={productsList}
            columns={columns}
            rowKey='_id'
            bordered 
            loading={loading}
            pagination={{total:total, 
            defaultPageSize:PAGE_SIZE, 
            showQuickJumper:true,
            onChange:getProducts
            }} />
         </Card>
        </div>
    )
}

export default Form.create()(ProductHome);