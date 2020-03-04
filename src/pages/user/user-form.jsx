import React, { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const UserForm = (props) => {
    const {user, roles, setForm} = props
    const {getFieldDecorator} = props.form 
    const formItemLayout = {
        labelCol: {span: 4}, 
        wrapperCol: {span: 16}
    }
    //hooks
    useEffect(() => {
        setForm(props.form)
    }, [])

    return (
        <Form {...formItemLayout}>
            <FormItem label="Username">
                {
                    getFieldDecorator('username', {
                        initialValue: user.current.username
                    })(
                        <Input type="text" placeholder="Please input username" />)
                }
            </FormItem>
            {
                !user.current._id ?
                    (
                        <FormItem label="Password">
                            {
                                getFieldDecorator('password', {
                                    initialValue: ''
                                })(
                                    <Input type="password" placeholder="Please input password" />)
                            } </FormItem>
                    ) : null
            }

            <FormItem label="Phone">
                {
                    getFieldDecorator('phone', {
                        initialValue: user.current.phone
                    })(
                        <Input type="phone" placeholder="Please input phone number" />
                    )
                }
            </FormItem>
            <FormItem label="Email">
                {
                    getFieldDecorator('email', {
                        initialValue: user.current.email
                    })(
                        <Input type="email" placeholder="Please input email" />)
                }
            </FormItem>
            <FormItem label="Role">
                {
                    getFieldDecorator('role_id', {
                        initialValue: user.current.role_id
                    })(
                        <Select style={{ width: 200 }} placeholder='Please select role'>
                            {
                                roles.map(role => <Option key={role._id}
                                    value={role._id}>{role.name}</Option>)}
                        </Select>)
                }
            </FormItem>
        </Form>

    )
}

export default Form.create()(UserForm)