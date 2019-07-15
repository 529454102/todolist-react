import Cookie from 'js-cookie'

export function getToken(name) {
    return Cookie.get(name)
}

export function setToken(name, value) {
    if (name === 'token') {
        return Cookie.set(name, value, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) })
    }
    return Cookie.set(name, value)
}

export function removeToken() {
    Cookie.remove('token')
    Cookie.remove('username')
}