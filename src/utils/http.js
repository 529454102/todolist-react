import axios from 'axios'
import { getToken } from '@/utils/auth'
import { message } from 'antd'
import { HashRouter } from "react-router-dom";
import { setUser } from '@/store/action'
import store from '@/store'

const service = axios.create({
    baseURL: 'http://47.102.199.149:3000',
    timeout: 10000
})

service.interceptors.request.use(
    request => {
        console.log(store)
        console.log('request')
        console.log(request)
        if (request.url === '/login' || request.url === 'register') {
            return request
        }
        if (getToken('token')) {
            request.headers['Authorization'] = 'Bearer ' + getToken('token')
        } else {
            store.dispatch(setUser({ username: '', token: '' }))
            message.error('请重新登陆')
            new HashRouter().history.push('/login')
            return
        }
        return request
    },
    error => {
        console.log(error)
    }
)

service.interceptors.response.use(
    response => {
        console.log('response')
        console.log(response)
        switch (response.data.code) {
            case 200: return response.data;
            default: message.error(response.data.message); console.log(response.data); throw new Error(response.data.message);
        }

    },
    error => {
        message.error(error.response.data.message)
        throw new Error(error.response.data.message || `未知错误信息： ${error}`)
    }
)
export default service