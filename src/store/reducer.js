import { GET_USER } from './actionType'
const defaultStore = {
    list: [],
    token: "",
    username: ""
}

export default (state = defaultStore, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GET_USER:
            newState.token = action.token
            newState.username = action.username
            return newState
        default:
            return state
    }

}