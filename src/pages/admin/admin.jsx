import React from "react";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import HeaderBar from "../../components/header/header"
import Home from '../home/home'
import Category from '../category/category' 
import Product from '../product/product' 
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar' 
import Line from '../charts/line' 
import Pie from '../charts/pie'
import { Switch,Route, Redirect } from "react-router-dom";

const { Footer, Sider, Content } = Layout;

const Admin = () =>{
    return (
        <Layout style={{height:'100%'}}>
      <Sider width={250} style={{backgroundColor:'#fff'}}><LeftNav/></Sider>
      <Layout>
      <HeaderBar>Header</HeaderBar>
        <Content style={{margin:20,backgroundColor:'#fff'}}>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/category' component={Category}/>
            <Route path='/product' component={Product}/> 
            <Route path='/role' component={Role}/>
            <Route path='/user' component={User}/>
            <Route path='/charts/bar' component={Bar}/>
            <Route path='/charts/line' component={Line}/> 
            <Route path='/charts/pie' component={Pie}/>
            {/* 如果没有匹配的路由，则渲染redirect的界面  */}
            <Redirect to='/home' />
          </Switch>
        </Content>
      <Footer style={{textAlign:'center'}}>EC System ©2019 Created by Mark Liu</Footer>
      </Layout>
    </Layout>
    )
}

export default Admin;