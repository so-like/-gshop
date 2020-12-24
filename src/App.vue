<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
// 引入映射函数
import {mapActions} from 'vuex'
import {reqFoodTypes} from './api/index'
export default {
  name: 'App',
  mounted() {
    // 发送异步请求获取地址
    // this.$store.dispatch('getAddress')
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress'])
  },
  components:{
    FooterGuide,
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  #app
    width 100%;
    height 100%;
    background:#f5f5f5

</style>
