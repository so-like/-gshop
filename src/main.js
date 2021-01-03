// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 注册store
import store from './store'
import {Button} from 'mint-ui'
// mock模拟数据接口
import './mock/mockServer'
// 映入路由懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

// 加载日期处理过滤器
import './filters'


// 注册全局组件标签
Vue.component(Button.name,Button)  //<mt-button>

// 路由懒加载配置
Vue.use(VueLazyload, { //内部自定义了一个指令叫v-lazy
  loading
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //使用vue-router
  components: { App },
  template: '<App/>',
  store //使用vuex
})
