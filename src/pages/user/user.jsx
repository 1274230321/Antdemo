import React, { useState, useRef, useEffect } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import UserForm from './user-form'
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from "../../utils/cosntants";

const User = () => {
    //避免user.current === null 取值会报错
    const emptyUser = {
        _id: '',
        email: '',
        role_id: '',
        username: '',
        password: '',
        phone: ''
    }
    const [isShow, setIsShow] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const user = useRef(emptyUser)
    const roleNames = useRef()
    const form = useRef()

    //hooks
    useEffect(() => {
        getUsers()
    }, [])
    //foo
    const showAddUser = () => {
        user.current = emptyUser
        setIsShow(true)
    }
    const showUpdate = (sth) => { // 保存 user
        user.current = sth
        setIsShow(true)
    }
    const getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
            // 初始化生成一个包含所有角色名的对象容器 {_id1: name1, _id2: nam2} 
            initRoleNames(roles)
            setUsers(users)
            setRoles(roles)
        }
    }
    /*
   根据角色的数组生成一个包含所有角色名的对象容器
   */
    const initRoleNames = (roles) => {
        roleNames.current = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
    }
    const clickDelete = (sth) => {
        Modal.confirm({
            content: `Sure you want to delete ${sth.username}?`,
            onOk: async () => {
                const result = await reqDeleteUser(user.current._id)
                if (result.status === 0) {
                    getUsers()
                }
            }
        })
    }
    const AddOrUpdateUser = async () => {
        // 获取表单数据
        const userData = form.current.getFieldsValue()
        form.current.resetFields()
        if (user.current._id) {
            userData._id = user.current._id
        }
        setIsShow(false)
        const result = await reqAddOrUpdateUser(userData)
        if (result.status === 0) {
            getUsers()
        }
    }


    //static
    const columns = [
        {
            title: 'User name', dataIndex: 'username'
        }, {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone', dataIndex: 'phone'
        }, {
            title: 'Create time',
            dataIndex: 'create_time',
            render: formateDate
        },
        {
            title: 'Role',
            dataIndex: 'role_id',
            render: value => roleNames.current[value]
        },
        {
            title: 'Operation', render: (sth) => (
                <span>
                    <LinkButton onClick={() => showUpdate(sth)}>Modify</LinkButton> &nbsp;&nbsp;
                    <LinkButton onClick={() => clickDelete(sth)}>Delete</LinkButton>
                </span>)
        }]
    const title = <Button type="primary" onClick={showAddUser}>Create user</Button>

    return (
        <div>
            <Card title={title}>
                <Table
                    columns={columns} rowKey='_id'
                    dataSource={users} bordered
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }} />
                <Modal
                    title={user.current._id ? 'Modify user' : 'Add user'} visible={isShow}
                    onCancel={() => setIsShow(false)} onOk={AddOrUpdateUser}>
                    <UserForm
                        setForm={(data) => form.current = data} user={user}
                        roles={roles} />
                </Modal>
            </Card>
        </div>

    )
}

export default User;