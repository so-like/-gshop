<template>
  <div>
      <ShopHeader/>
      <div class="tab">
          <div class="tab-item">
              <router-link to="/shop/goods" replace>点餐</router-link>
          </div>

          <div class="tab-item">
              <router-link to="/shop/ratings" replace>评价</router-link>
          </div>

          <div class="tab-item">
              <router-link to="/shop/info" replace>商家</router-link>
          </div>
      </div>
      <!-- 缓存路由 -->
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'

export default {
  data() { 
    return {

    }
  },
  mounted(){
    this.$store.dispatch('getShopInfo');
  },
  components:{
      ShopHeader,
  }
 }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        &.router-link-active
          color #02a774
</style>