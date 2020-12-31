// 通过mutation间接更新state的多个方法的对象

// 首先引入mutation-types
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS
} from "./mutation-types";

// 在这引入接口api中的方法
import {
  reqAddress,
  reqFoodTypes,
  reqShopList,
  reqUserInfo,
  reqLoginOut,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from "../api";

export default {
  // 实现异步promise 获取地址
  async getAddress({ commit, state }) {
    // 发送异步ajax请求
    const geohash = state.latitude + "," + state.longitude;
    // 用result去接收返回的promise对象
    const result = await reqAddress(geohash);

    // 判断请求是否成功提交一个mutation
    if (result.code === 0) {
      // 这个地址就是返回的promise对象的data数据
      const address = result.data;
      // 给定义的RECEIVE_ADDRESS提交一个address地址
      commit(RECEIVE_ADDRESS, { address });
    }
  },

  // 实现异步promise  获取食品分类列表
  async getCategorys({ commit, state }) {
    // 发送异步ajax请求
    // 用result去接收返回的promise对象
    const result = await reqFoodTypes();
    // 判断请求是否成功提交一个mutation
    if (result.code === 0) {
      // 给定义的RECEIVE_ADDRESS提交一个address地址
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS, { categorys });
    }
  },

  // 实现异步promise  获取商铺列表
  async getShops({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state;

    // 用result去接收返回的promise对象
    const result = await reqShopList(longitude, latitude);
    // 判断请求是否成功提交一个mutation
    if (result.code === 0) {
      // 这个地址就是返回的promise对象的data数据
      const shops = result.data;
      // 给定义的RECEIVE_ADDRESS提交一个address地址
      commit(RECEIVE_SHOPS, { shops });
    }
  },

  // 同步获取用户信息(因为我手里有用户信息)
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo });
  },

  // 异步获取用户信息
  async getUserInfo({ commit }) {
    // 调用获取用户信息的方法
    const result = await reqUserInfo();
    if (result.code == 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, { userInfo });
    }
  },

  // 异步请求退出
  async logout({ commit }) {
    const result = await reqLoginOut();
    if (result.code === 0) {
      commit(RESET_USER_INFO);
    }
  },

  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const info = result.data;
      info.score = 3.5;
      commit(RECEIVE_INFO, { info });
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({ commit }) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const ratings = result.data;
      commit(RECEIVE_RATINGS, { ratings });
    }
  },

  // 异步获取商家商品列表 接收传过来的函数并在数据更新后调用
  async getShopGoods({ commit },callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, { goods });
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      callback && callback()
    }
  }
};
