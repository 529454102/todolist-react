import { SET_USER } from './actionType'
import { getToken } from '@/utils/auth'
const defaultStore = {
    token: getToken('token'),
    username: getToken('username')
}

export default (state = defaultStore, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case SET_USER:
            newState.token = action.token
            newState.username = action.username
            return newState
        default:
            return state
    }

}