import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import { getUserAction } from '@/store/action'
import './index.scss'

class LoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { username, password } = values
                this.props.handleLogin({ username, password })
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
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <h1>TodoList</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        没有账号？点击<Link to="/register">注册</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm)

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin({ username, password }) {
            dispatch(getUserAction({ username, password }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
