import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import { registerAPI } from '@/api/user'
import { message } from 'antd'
import './index.scss'

class RegisterForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { username, password } = values
                try {
                    await registerAPI({ username, password })
                    message.success('注册成功,请登录')
                    this.props.history.push('/login')
                } catch (error) {

                }
            } else {
                console.log(err)
            }
        });
    };
    checkUsername = (rule, value, callback) => {
        if (value.indexOf(" ") !== -1) {
            return callback(new Error("用户名不能有空格"));
        } else {
            callback();
        }
    }
    checkPassword = (rule, value, callback) => {
        if (value !== this.props.form.getFieldValue('password')) {
            return callback(new Error("两次输入密码不一致"));
        } else {
            callback();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-container">
                <h1>注册</h1>
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }, { validator: this.checkUsername }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('rpassword', {
                            rules: [{ required: true, message: '请再次输入密码' }, { validator: this.checkPassword }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            注册
                        </Button>
                        已有账号？点击<Link to="/login">登陆</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Register = Form.create()(RegisterForm)

export default Register
