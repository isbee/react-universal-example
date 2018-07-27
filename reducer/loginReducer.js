import { LOG_IN, LOG_OUT, SET_BALANCE } from '../action/actionType'

const initialState = {
    login: false,
    ID: null,
    balance: null
}

export default function loginReducer(state = initialState, action) {

    switch(action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                login: action.isSuccess,
                ID: action.ID
            })
        case SET_BALANCE:
            return Object.assign({}, state, {
                balance: action.balance
            })
        case LOG_OUT:
            return Object.assign({}, state, {
                login: false,
                ID: null
            })
        default:
            return state
    }
}