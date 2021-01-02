// 基于state的getter计算属性的对象
export default{
    totalCount(state){
        // 统计购物车中的食物数量
        return state.cartFoods.reduce((preTotal,food)=> preTotal + food.count, 0)
    },


    totalPrice(state){
        // 统计购物车中的食物的价格 食物数量*食物价格
        return state.cartFoods.reduce((preTotal,food)=> preTotal + food.count*food.price, 0)
    },

    positiveSize(state){
        // 如果评论里边的类型为0则加1否则加0
        return state.ratings.reduce((preTotal,rating)=> preTotal + (rating.rateType===0?1:0), 0)
    }
}