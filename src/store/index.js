// vuex最核心的管理对象store
// 然后引入vuex下面的各个模块
import Vue from 'vue';
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getter from './getter';
import actions from './actions'


// 声明使用
Vue.use(Vuex)

// 向外暴露
export default new Vuex.Store({
    state,
    mutations,
    getter,
    actions
})