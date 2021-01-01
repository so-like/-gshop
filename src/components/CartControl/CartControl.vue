<template>
  <div class="cartcontrol">
      <!-- 给减少菜品添加动画过渡效果 -->
      <transition name="move">
      <div class="iconfont icon-jian" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
      </transition>
  
  <div class="cart-count" v-if="food.count">{{food.count}}</div>
  <div class="iconfont icon-ziyuan" @click.stop="updateFoodCount(true)"></div>
  </div>

</template>
<script>
export default {
  data() { 
    return {
       
    }
  }, 
  props:{
    food:Object,    
    },
  methods: {
    //   更新数据要在父组件中更新 所以这里要调用action来修改vuex中state
    updateFoodCount(isAdd){
        this.$store.dispatch('updateFoodCount',{isAdd,food:this.food});
    }
  },
 }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-jian
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active,&.move-leave-active
        transition all 1s
      &.move-enter,&.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-ziyuan
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green

</style>