import React, { useRef } from "react";
import "./left-nav.less";
import { Link, withRouter } from "react-router-dom";
import { setHeaderTitle } from "../../redux/actions";
import { connect } from "react-redux";
import sapLogo from '../../assets/images/sap-logo-svg.svg';
import { Menu, Icon } from 'antd';
import menuItems from '../../config/menuConfig'

const { SubMenu } = Menu;

const LeftNav = (props) => {
  const path = props.location.pathname;
  //hooks
  //取出当前用户的menus信息
  const menuSet = useRef([])
  menuSet.current = new Set(props.user.role.menus || [])

  //foo
  const hasAuth = (item) => {
    const key = item.key
    /*
    1. 如果是admin
    2. 如果isPublic
    3. 如果menus中有这个key
    4. 如果有子元素
    */
    if (props.user.username === 'admin' || item.isPublic || menuSet.current.has(key)) {
      return true
    } else if (item.children) {
      return !!item.children.find(child => menuSet.current.has(child.key))
    }

  }

  const getMenuNodes = (items) => {
    return items.map(item => {
      if (hasAuth(item)) {
        if (!item.children) {
          // 一旦请求路径匹配上当前 item, 将 item 的 title 保存到 redux 
          if (item.key === path || path.indexOf(item.key) === 0) {
            props.setHeaderTitle(item.title)
          }
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={() => props.setHeaderTitle(item.title)}></Link>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </Menu.Item>
          )
        } else {
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
      }
    })
  }
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

export default connect(
  state => ({user: state.user}),
  {
    setHeaderTitle
  }
)(withRouter(LeftNav))