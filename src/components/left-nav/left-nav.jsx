import React from "react";
import "./left-nav.less";
import { Link, withRouter} from "react-router-dom";
import sapLogo from '../../assets/images/sap-logo-svg.svg';
import {Menu, Icon } from 'antd';
import menuItems from '../../config/menuConfig'


const { SubMenu } = Menu;

const getMenuNodes = (items) => {
  return items.map(item => {
    if (!item.children){
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key}></Link>
          <Icon type={item.icon}></Icon>
           <span>{item.title}</span>
        </Menu.Item>
      )
    }else{
      return (
        <SubMenu key={item.key}
        title={
        <span>
        <Icon type={item.icon}></Icon>
        <span>{item.title}</span>
        </span>
        }>
          {getMenuNodes(item.children)}
        </SubMenu>
      )
    }
  })
}
const LeftNav = (props) => {
    const path = props.location.pathname;
    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={sapLogo} alt='logo'></img>
                <h2>EC System</h2>
            </Link>
            <Menu
          mode="inline"
          selectedKeys={[path]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {getMenuNodes(menuItems)}
        </Menu>
        </div>
    )
}

export default withRouter(LeftNav);