import { GET_USER } from './actionType'
import { loginAPI } from '@/api/user'
import { setToken } from '@/utils/auth'
import { message } from 'antd'
import { HashRouter } from "react-router-dom";

const getUser = ({ username, token }) => ({
    type: GET_USER,
    username,
    token
})
export const getUserAction = ({ username, password }) => {
    return async (dispatch) => {
        try {
            const res = await loginAPI({ username, password })
            setToken('username', username)
            setToken('token', res.token)
            dispatch(getUser({ username, token: res.token }))
            message.success('登录成功')
            new HashRouter().history.push('/')
        } catch (error) {
        }
    }

}