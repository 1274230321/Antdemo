import React from "react";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import HeaderBar from "../../components/header/header"

const { Footer, Sider, Content } = Layout;

const Admin = () =>{
    return (
        <Layout style={{height:'100%'}}>
      <Sider width={250} style={{backgroundColor:'#fff'}}><LeftNav/></Sider>
      <Layout>
      <HeaderBar>Header</HeaderBar>
        <Content>Content</Content>
      <Footer style={{textAlign:'center'}}>EC System ©2019 Created by Mark Liu</Footer>
      </Layout>
    </Layout>
    )
}

export default Admin;