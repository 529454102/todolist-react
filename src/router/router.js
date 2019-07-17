import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { message } from 'antd'

class RouterAuth extends Component {
    componentDidUpdate(){
        if(!this.props.token && this.props.location.pathname === '/login'){
            message.error('请登录')
        }
    }
    render() {
        console.log(this.props)
        const { location, config, token } = this.props
        const targetRouteConfig = config.find(item => item.path === location.pathname)
        console.log(targetRouteConfig)
        //无效路由重定向404
        if (!targetRouteConfig) {
            console.log('redirect')
            return <Redirect to='/404' />
        }
        const { component } = targetRouteConfig
        //非登陆状态下，访问不需要权限校验的路由
        if (!token && targetRouteConfig && !targetRouteConfig.auth) {
            return <Route exact path={location.pathname} component={component} />
        }
        //非登陆状态下，访问需要权限校验的路由重定向到登陆页面
        if (!token && targetRouteConfig && targetRouteConfig.auth) {
            return <Redirect to='/login' />
        }
        //登陆状态下
        if (token) {
            //访问登陆注册跳回首页
            if (location.pathname === '/login' || location.pathname === '/register') {
                return <Redirect to='/' />
            }
            //正常跳转
            return <Route exact path={location.pathname} component={component} />
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps)(RouterAuth)