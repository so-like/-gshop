// 定义n个接口的请求实例
// 引入已经封装好的ajax
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
// ## 目录：
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => ajax(BASE_URL+`/position/${geohash}`)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodTypes = () => ajax(BASE_URL+`/index_category`)

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShopList = (longitude,latitude) => ajax(BASE_URL+`/shops`,{longitude,latitude})

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (geohash,keyword) => ajax(BASE_URL+`/search_shops`,{geohash,keyword})



// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqLogin = ({name,pwd,captcha}) => ajax(BASE_URL+`/login_pwd`,{name,pwd,captcha},'POST')

// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqPhone = (phone) => ajax(BASE_URL+`/sendcode`,{phone})

// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqLoginPhone = (phone,code) => ajax(BASE_URL+`/login_sms`,{phone,code},'POST')

// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(BASE_URL+`/userinfo`)

// [10、用户登出](#10用户登出)<br/>
export const reqLoginOut = () => ajax(BASE_URL+`/logout`)


//11  获取商家信息 [在这里不需要填加api让代理拦截]
export const reqShopInfo = () => ajax('/info')

//12    获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')

//13    获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

