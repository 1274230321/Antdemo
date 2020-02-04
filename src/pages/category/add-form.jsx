import React,{ useEffect } from "react";
import { Form, Select, Input } from "antd";

const AddForm = (props) =>{
    const Item = Form.Item
    const Option = Select.Option
    const { getFieldDecorator } = props.form
    const { category, parentId, setForm } = props
    useEffect(() => {
        setForm(props.form)
    })
    return (
        <div>
            <Form>
                <Item>
                    {getFieldDecorator('parent_Id',{
                        initialValue : parentId
                    })(
                    <Select>
                        <Option value="0">1-level</Option>
                        {category.map((value) => {
                            return (
                            <Option value={value._id} key={value._id}>{value.name}</Option>
                            )
                        })}
                    </Select>
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('categoryName',{
                        rules : [{required : true, message : 'Please input category name!'}]
                    })(
                        <Input placeholder='please input category name '></Input>
                    )}
                </Item>
            </Form>
        </div>
    )
}

export default Form.create()(AddForm);