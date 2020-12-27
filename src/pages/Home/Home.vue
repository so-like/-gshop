<template>
  <div class="msite">
    <!--首页头部-->
    <!-- 通过props实现组件间的信息传递 -->
    <HeaderTop :title="address.name">
      <!-- 搜索 -->
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <!-- 登录注册 -->
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/personal': '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
          </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghu"></i>
        </span>
      </router-link>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>

  </div>
</template>

<script>

import {mapState} from 'vuex'
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

// 引入头部模板标签
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList"
export default {
  data() {
    return {
      baseImageUrl:'https://fuss10.elemecdn.com'
    };
  },
  mounted() {
    // 发送请求食品分类列表
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')

    
  },
  // 计算属性
  computed:{
    // 通过store中的state经纬度来读取地址 用户信息等等
    ...mapState(['address','categorys','userInfo']),

    // 根据categorys这个一维数组来创建一个二维数组
    categorysArr(){
      // 首先获取我们从后台获取到的食品分类数组
      const {categorys} = this
      // 准备两个数组 一个大数组一个小数组
      const arr = []
      let minarr = []
      // 遍历categorys
      categorys.forEach(c => {

        // 如果小数组满了就准备一个新的小数组 继续将遍历出来的c加到小数组中
        if(minarr.length===8){
          minarr = []
        }

        // 判断如果小数组是空的就将它加到大数组中 将小数组和大数组关联起来
        if(minarr.length===0){
          arr.push(minarr)
        }

        minarr.push(c)
      });
      return arr
    }

    // 
  },
  // 监视轮播的数组是否发生变化
  watch:{
    categorysArr(value){
// 创建一个滑动实例对象
// 使用setTimeout可以实现效果但不是最好的
    // setTimeout(() => {

    //   // 先更新数据再一步更新界面
    //   new Swiper(".swiper-container", {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   },
    //   speed: 1000, //速度
    //   autoplay: true, //自动切换
    //   autoplay: {
    //     delay: 3000, //自动切换的时间间隔，单位ms
    //     disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay
    //   }
    // });
    // }, 100);

    // 一旦界面更新则立即创建newwiper(界面更新在数据更新之后)
    this.$nextTick(()=>{
      new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      },
      speed: 1000, //速度
      autoplay: true, //自动切换
      autoplay: {
        delay: 3000, //自动切换的时间间隔，单位ms
        disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay
      }
    });

    });
    
    }
  },
  components: {
    // 注册标签
    HeaderTop,
    ShopList
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px   
</style>