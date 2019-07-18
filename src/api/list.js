import http from '@/utils/http'

export function getData(params) {
    return http({
        url: '/list',
        method: 'get',
        params
    })
}

export function addData(data) {
    return http({
        url: '/list',
        method: 'post',
        data
    })
}
export function editData(data) {
    return http({
        url: '/list',
        method: 'put',
        data
    })
}
export function delData(data) {
    return http({
        url: '/list',
        method: 'delete',
        data
    })
}