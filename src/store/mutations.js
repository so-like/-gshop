// 直接更新state的多个方法的对象
// 首先从mutation-types中引入所定义的类型
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutation-types";
export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address;
  },

  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys;
  },

  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops;
  },

  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
  },

  // 将userInfo设置为空对象
  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },


//   模拟后台数据的mock.js
  [RECEIVE_INFO](state, { info }) {
    state.info = info;
  },

  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings;
  },

  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods;
  },

  // 修改父组件中的food的count数据 添加食物的数量
  [INCREMENT_FOOD_COUNT](state, { food }) {
    if(!food.count){//第一次点击为1
      // food.count = 1    这样修改值是没有数据绑定的 
      // 引入vue 第一个参数为对象 第二个参数为属性名要加引号 第三个为值 这样就会有了数据绑定
      Vue.set(food,'count',1)
      // 将food添加到state的shopCart中
      state.cartFoods.push(food)
    }else{
      // 因为为引用对象所以这里添加它看得见
      food.count++
    }
  },
  
  // 减少食物的数量
  [DECREMENT_FOOD_COUNT](state, { food }) {
    if(food.count){
      food.count--
      if(food.count===0){
        // 删除food在cartFood中的下标 删除一个
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  // 清空购物车
  [CLEAR_CART](state) {
    // 遍历购物车中食物 将其count值设置为0
    state.cartFoods.forEach(food=>food.count = 0)
    // 接着清除购物车中的食物
    state.cartFoods = []
  },
};
