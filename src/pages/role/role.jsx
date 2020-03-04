import React, { useState, useEffect, useRef } from "react";
import { Table, Card, Button, message, Modal } from "antd";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api/index";
import AddForm from "./add-form";
import AuthForm from "./auth-form"
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";

const Role = () => {
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState({ _id: null, menus: [] })
    const [loading, setLoading] = useState(false)
    const [showStatus, setShowStatus] = useState(0)
    const form = useRef()
    const af = useRef()
    //hooks
    useEffect(() => {
        getRoles()
    }, [])

    //foo
    const addRole = () => {
        form.current.validateFields(async (err, values) => {
            if (!err) {
                const { roleName } = values
                const result = await reqAddRole(roleName)
                setShowStatus(0)
                form.current.resetFields()
                if (result.status === 0) {
                    getRoles()
                    message.success('ADD role Success')
                }
            }
        })
    }
    const getRoles = async () => {
        setLoading(true);
        const result = await reqRoles();
        setLoading(false);
        if (result.status === 0) {
            const roles = result.data;
            setRoles(roles);
        } else {
            message.error('Get roles ERROR!');
        }
    }
    const onRow = (record) => {
        return {
            onClick: event => {
                setRole(record)
            }, // 点击行
        };
    }

    const handleCancel = () => {
        setShowStatus(0)
    };
    const showAdd = () => {
        setShowStatus(1)
    }
    const showAuth = () => {
        setShowStatus(2)
    }
    const authRole = async () => {
        const menus = af.current.getMenus()
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        //ajax请求的参数是一个对象 role
        const result = await reqUpdateRole(role)
        setShowStatus(0)
        if (result.status === 0) {
            getRoles()
            message.success('Role update success')
        } else {
            message.error('Role update failed')
        }
    }
    //static
    const title = (
        <span>
            <Button type='primary' onClick={showAdd}>Create roles</Button>
            <Button
                type='primary'
                disabled={!role._id}
                style={{ margin: '0 20px' }}
                onClick={showAuth}
            >
                Authentication Management
            </Button>
        </span>
    )
    const columns = [
        {
            title: 'Role name',
            dataIndex: 'name',
        },
        {
            title: 'Creation time',
            dataIndex: 'create_time',
            render: create_time => formateDate(create_time)
        },
        {
            title: 'Authorized time',
            dataIndex: 'auth_time',
            render: formateDate
        },
        {
            title: 'Licensor',
            dataIndex: 'auth_name',
        },
    ];
    return (
        <div>
            <Card title={title}>
                <Table
                    dataSource={roles}
                    columns={columns}
                    rowKey='_id'
                    bordered
                    loading={loading}
                    onRow={onRow}
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                    pagination={{ pageSize: 7, showQuickJumper: true }}
                />
            </Card>
            <Modal
                title="Create role"
                visible={showStatus === 1}
                onOk={addRole}
                onCancel={handleCancel}
            >
                <AddForm setForm={(data) => form.current = data} />
            </Modal>
            <Modal
                title="Authentication management"
                visible={showStatus === 2}
                onOk={authRole}
                onCancel={handleCancel}
            >
                <AuthForm ref={af} role={role} />
            </Modal>
        </div>
    )
}

export default Role;