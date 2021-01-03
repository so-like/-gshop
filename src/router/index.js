import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../pages/Home/Home'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Personal from '../pages/Personal/Personal'

// 实现路由懒加载啊 采取函数形式
const Home = () => import('../pages/Home/Home')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')
const Personal = () => import('../pages/Personal/Personal')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,  //只有当请求资源或者发送请求是才会调用这个路由
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/shop',
      component:Shop,
      children:[
        {
          path: '/shop/goods',
          component:ShopGoods
        },
        {
          path: '/shop/info',
          component:ShopInfo
        },
        {
          path: '/shop/ratings',
          component:ShopRatings
        },
        {
          path: '',
          redirect:'/shop/goods'
        }
      ]
    },
    
  ]
})
