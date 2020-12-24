// 通过mutation间接更新state的多个方法的对象

// 首先引入mutation-types
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
} from './mutation-types'

// 在这引入接口api中的方法
import {
    reqAddress,
    reqFoodTypes,
    reqShopList
}from '../api'

export default{
    // 实现异步promise 获取地址
    async getAddress({commit,state}){
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        // 用result去接收返回的promise对象
        const result = await reqAddress(geohash)

        // 判断请求是否成功提交一个mutation
        if(result.code===0){
            // 这个地址就是返回的promise对象的data数据
            const address = result.data
            // 给定义的RECEIVE_ADDRESS提交一个address地址
            commit(RECEIVE_ADDRESS,{address})
        }
    },

    // 实现异步promise  获取食品分类列表
    async getCategorys({commit,state}){
        // 发送异步ajax请求
        // 用result去接收返回的promise对象
        const result = await reqFoodTypes()
        // 判断请求是否成功提交一个mutation
        if(result.code===0){
            // 给定义的RECEIVE_ADDRESS提交一个address地址
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },

     // 实现异步promise  获取商铺列表
     async getShops({commit,state}){
        // 发送异步ajax请求
        const {longitude,latitude} = state
        
        // 用result去接收返回的promise对象
        const result = await reqShopList(longitude,latitude)
        // 判断请求是否成功提交一个mutation
        if(result.code===0){
            // 这个地址就是返回的promise对象的data数据
            const shops = result.data
            // 给定义的RECEIVE_ADDRESS提交一个address地址
            commit(RECEIVE_SHOPS,{shops})
        }
    },
}