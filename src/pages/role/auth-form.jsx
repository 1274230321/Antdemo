import React, { useEffect, useImperativeHandle, useState, useRef, forwardRef } from "react";
import { Input, Tree, Form } from "antd";
import menuList from "../../config/menuConfig";

let AuthForm = (props, ref) => {
    const { Item } = Form
    const { TreeNode } = Tree;
    const { role } = props
    const { menus } = role
    const [checkedKeys, setCheckedKeys] = useState(menus)
    const treeNodes = useRef()
    //hooks
    useEffect(() => {
        treeNodes.current = getTreeNodes(menuList)
    }, [])
    useImperativeHandle(ref, () => ({
        getMenus: () => checkedKeys
    }))
    //callback
    const onCheck = (checkedKey) => {
        setCheckedKeys(checkedKey)
    }
    const getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }
    //static
    const formItemLayout = {
        labelCol: { span: 4 }, // 左侧 label 的宽度
        wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    return (
        <div>
            <Item label='Role name' {...formItemLayout}>
                <Input value={role.name} disabled />
            </Item>
            <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={onCheck}
            >
                <TreeNode title="Authentication" key="all">
                    {treeNodes.current}
                </TreeNode>
            </Tree>
        </div>
    )
}
AuthForm = forwardRef(AuthForm);
export default AuthForm