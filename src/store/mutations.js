// 直接更新state的多个方法的对象
// 首先从mutation-types中引入所定义的类型
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO
} from './mutation-types'
export default{
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },

    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys
    },

    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },

    [RECEIVE_USER_INFO](state,{userInfo}){
        state.userInfo = userInfo
    },

    // 将userInfo设置为空对象
    [RESET_USER_INFO](state){
        state.userInfo = {}
    },
}