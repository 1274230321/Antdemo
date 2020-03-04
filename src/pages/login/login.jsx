import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { login } from '../../redux/actions'
import "./login.less";
import sapLogo from '../../assets/images/sap-logo-svg.svg';
import { Form, Icon, Input, Button } from 'antd';

const Login = (props) => {
    const form = props.form;
    const { getFieldDecorator } = form;
    const handleClick = (event) => {
        //移除表单默认行为
        event.preventDefault();
        //对整个表单进行验证 err是boolean，有错误为true，values是一个object，包含username和password
        form.validateFields(async (err, values) => {
            const { username, password } = values;
            if (!err) {
                props.login(username, password)
            }
        })
    }

    return (props.user && props.user._id) ? (<Redirect to='/' />) : (
        <div className='login'>
            <header className='login-header'>
                <img src={sapLogo} alt='logo' />
                <h2>Ming EC Backend System</h2>
            </header>
            <section className='login-content'>
                <div className={props.user.errorMsg ? 'error-msg show' : 'error-msg'}>{props.user.errorMsg}</div>
                <h2>User Login</h2>
                <Form onSubmit={handleClick} className="login-form">
                    <Form.Item>
                        {/* 第一个参数会在valid中通过values取出 */}
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, whitespace: true, message: "Please input your username!" },
                                { max: 12, min: 4, message: "Username must be between 4-12 digits!" },
                                { pattern: /^[0-9a-zA-Z_]+$/, message: "Username must consist of letters, numbers or underscores!" }
                            ]
                        })(<Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, whitespace: true, message: "Please input your password!" },
                                { max: 12, min: 4, message: "Password must be between 4-12 digits!" }
                            ]
                        })(<Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
          </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}
/*高阶函数 （柯里化）把Login组件传进去
形成一个高阶组件，create会传一个form对象给里边 form对象包含很多需要的功能
*/
const WrappedNormalLoginForm = Form.create()(Login);
export default connect(
    state => ({
        user: state.user,
    }),
    { login }
)(WrappedNormalLoginForm)
