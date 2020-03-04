import {
    SET_HEAD_TITLE,
    SHOW_ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from "./action-types";
import { reqLogin } from "../api/index";
import storageUtils from "../utils/storageUtils";
//设置头部标题的同步方法
export const setHeaderTitle = (title) => ({ type: SET_HEAD_TITLE, data: title })
//接收用户数据的同步方法
export const receiveUser = (user) => ({type: RECEIVE_USER, user})
//错误信息的异步方法
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})
//登出的同步方法
export const logout = () => {
    storageUtils.removeUser()
    return {type: RESET_USER}
}
//请求登陆数据的异步方法 
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if(result.status === 0){
            const user = result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}