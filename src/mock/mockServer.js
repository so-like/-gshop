// 使用mock提供的模拟数据接口
import Mock from 'mockjs'
import data from './data.json'

// 返回商品
Mock.mock('/goods',{code:0,data:data.goods})
// 返回评论
Mock.mock('/info',{code:0,data:data.info})
// 返回
Mock.mock('/ratings',{code:0,data:data.ratings})

// 不需要暴露任何东西