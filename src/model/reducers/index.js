/**
 * reducer
 * Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
 * action 被某个组件调用后会想store发送action， 然后reducer处理
 */

import { combineReducers } from 'redux'
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions'

export let initialState = {
    entities: {
        loginUser: null
    },
    loginPageDate: {
        loading: false,
        error: null
    }
}

let reducers = combineReducers({
    entities: function (state = {}, action) {
        switch (action.type) {
            case LOGIN_SUCCESS:
                // return Object.assign({}, state, {loginUser: action.payload})
                return {...state, loginUser: action.payload}
            default:
                return state
        }
    },
    loginPageData: function (state = {}, action) {
        switch (action.type) {
            case LOGIN_LOADING:
                return {...state, loading: action.payload}
            case LOGIN_FAILURE:
                return {...state, error: action.payload}
            case LOGIN_SUCCESS:
                return {...state, error: null}
            default:
                return state
        }
    }
})

export default reducers;
