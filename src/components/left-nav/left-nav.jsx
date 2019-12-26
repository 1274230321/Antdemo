import React from "react";
import "./left-nav.less";
import { Link } from "react-router-dom";
import sapLogo from '../../assets/images/sap-logo-svg.svg';

import {Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;

const LeftNav = () =>{
    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={sapLogo} alt='logo'></img>
                <h2>EC System</h2>
            </Link>
            <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="1">option1</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
          </SubMenu>
          <Menu.Item key="4">
          <span>
                <Icon type="laptop" />
                option4
              </span>
          </Menu.Item>
        </Menu>
        </div>
    )
}

export default LeftNav;