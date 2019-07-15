import http from '@/utils/http'

export function loginAPI(data) {
    return http({
        url: '/login',
        method: 'post',
        data
    })
}

export function registerAPI(data) {
    return http({
        url: '/register',
        method: 'post',
        data
    })
}