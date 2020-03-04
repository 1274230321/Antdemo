import React,{ useEffect } from "react";
import { Form, Input } from "antd";

const AddForm = (props) =>{
    const Item = Form.Item
    const { setForm } = props
    const { getFieldDecorator } = props.form
    //hooks
    useEffect(() => {
        setForm(props.form)
    }, [])

    return (
        <div>
            <Form>
                <Item label='Role Name'>
                    {getFieldDecorator('roleName',{
                        rules : [{required : true, message : 'Please input role name!'}]
                    })(
                        <Input placeholder='please input role name ' />
                    )}
                </Item>
            </Form>
        </div>
    )
}

export default Form.create()(AddForm);