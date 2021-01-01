<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: currentIndex === index }"
            @click="clickMenuItem(index)"
          >
            <!-- 如果商品没有图标那么就不解析显示 -->
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUL">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.descripttion }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CartControl from "../../../components/CartControl/CartControl";
import Food from "../../../components/Food/Food";
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标
      tops: [], //所有右侧分类li的top组成的数组，列表第一次显示后就不再变化
      food: {}
    };
  },
  mounted() {
    // 调用action中的getShopGoods方法  传一个回调函数过去
    this.$store.dispatch("getShopGoods", () => {
      //更新数据后置行
      this.$nextTick(() => {
        //列表数据更新之后调用

        this._initScroll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {
      // 1.得到条件数据
      const { scrollY, tops } = this;
      // 2.根据条件数据计算
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY小于下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      // 3.返回结果
      return index;
    }
  },

  methods: {
    // 初始化滚动条
    _initScroll() {
      // 将menu-wrapper设置为滑动条
      const menuScroll = new BScroll(".menu-wrapper", {
        // 配置默认事件
        click: true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, //因为惯性的滑动是不会更新数据的
        click: true
      });
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        console.log(x, y);
        // 滑动变化也会有负值 所以取绝对值
        this.scrollY = Math.abs(y);
      });
      // 绑定滚动结束的监听
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        console.log("scrollEnd", x, y);
        // 滑动变化也会有负值 所以取绝对值
        this.scrollY = Math.abs(y);
      });
    },

    _initTops() {
      // 1.初始化Tops
      const tops = [];
      let top = 0;
      tops.push(top);
      // 2.收集
      // 找到左侧菜品li的top坐标 快速定位到foodsUL这个ul
      let lis = this.$refs.foodsUL.getElementsByClassName("food-list-hook");
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      // 3.更新数据
      this.tops = tops;
      console.log(tops);
    },

    // 点击左侧菜单滑动右侧列表
    clickMenuItem(index) {
      // console.log(index)
      // 得到目标位置的scrollY值
      const scrollY = this.tops[index];
      // x坐标和y坐标以及持续的时间
      this.scrollY = -scrollY;
      // 平滑滚动右侧菜单
      this.foodsScroll.scrollTo(0, -scrollY, 500);
    },

    // 显示点击的food
    showFood(food){
      // 设置food
      this.food = food
      // 显示food组件 调用子组件的方法 通过ref方法
      this.$refs.food.toggleShow()
    }
  },
  components: {
    CartControl,
    Food
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 275px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
