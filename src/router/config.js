import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import NotFound from '../views/NotFound'

export const config = [
    {
        path: '/',
        component: Home,
        auth: true
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/404',
        component: NotFound
    }
]