import React,{ useEffect } from "react";
import { Form, Input } from "antd";

const UpdateForm = (props) =>{
    const Item = Form.Item
    const { getFieldDecorator } = props.form
    const categoryName = props.categoryName
    const setForm = props.setForm
    useEffect(() => {
        setForm(props.form)
    }, [])

    
    return (
        <div>
            <Form>
                <Item>
                    {getFieldDecorator('categoryName',{
                        rules:[{required: true,
                                message:"Category name is required!"}],
                        initialValue : categoryName
                    })(
                        <Input></Input>
                    )}
                </Item>
            </Form>
        </div>
    )
}

export default Form.create()(UpdateForm);