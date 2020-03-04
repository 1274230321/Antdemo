import storageUtils from "../utils/storageUtils";
import { combineReducers } from "redux";
import {
    SET_HEAD_TITLE,
    SHOW_ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from "./action-types";

const initTitle = 'HOME'
function headerTitle(state=initTitle, action){
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}
const initUser = storageUtils.getUser()
function user(state=initUser, action){
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            return {...state, errorMsg: action.errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}
/*向外默认暴露总的reducer函数 管理总的state 类似于以下结构：{
    title: 'Home',
    user: {}
} */
export default combineReducers({headerTitle, user})