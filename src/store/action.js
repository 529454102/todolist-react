import { GET_USER } from './actionType'
import { loginAPI } from '@/api/user'
import { setToken } from '@/utils/auth'
import { message } from 'antd'

const getUser = ({username, token}) => ({
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
            message.success('登陆成功')
            dispatch(getUser({username, token: res.token}))
        } catch (error) {

        }
    }

}