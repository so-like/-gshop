<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">校园外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!-- 短信登录页面 -->
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="text"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <!-- 如果不是正确的说完后及好则不能点击 -->
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone:rightPhone }"
                @click.prevent="getCode"
              >
                <!-- 如果还在计时中就显示已发送 如果没有计时就显示获取验证码 -->
                {{
                  computedtime > 0 ? `已发送(${computedtime})s` : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册校园外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 密码登录页面 -->
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="isShow"
                  v-model="pwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="isShow ? 'on' : 'off'"
                  @click="isShow = !isShow"
                >
                  <div class="switch_circle" :class="{ right: isShow }"></div>
                  <span class="switch_text">{{ isShow ? "123" : "***" }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <!-- 验证码的图片 -->
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou1"></i>
      </span>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import { reqLogin, reqPhone, reqLoginPhone } from "../../api";
export default {
  data() {
    return {
      loginWay: true, //loginWay为true代表短信登录
      phone: "", //用户输入的手机号
      computedtime: 0, //计时器时间初始为0
      isShow: false, //是否显示密码
      pwd: "", //搜集的密码
      code: "", //验证码
      captcha: "", //图形验证码
      name: "", //用户名
      alertText: "", //提示信息
      alertShow: false, //是否显示提示框
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 首先出现倒计时
      // 起始值为30s
      // 假如没有计时 就执行循环计时器
      if (!this.computedtime) {
        this.computedtime = 30;
        this.IntervalId = setInterval(() => {
          this.computedtime--;
          if (this.computedtime <= 0) {
            clearInterval(this.IntervalId);
          }
        }, 1000);

        // 接着发送ajax请求本来返回的是promise向指定号码发送ajax请求
        const result = await reqPhone(this.phone);
        // 如果失败了
        if (result.code === 1) {
           // 显示提示信息
            this.showAlert(result.msg);
          // 判断倒计时是否停掉了
          if (this.computedtime) {
            // 停止倒计时
            this.computedtime = 0;
            clearInterval(this.IntervalId);
            this.IntervalId = undefined
          }
        }
      }
    },
    // 抽取一个函数
    showAlert(alertText) {
      // 首先让提示框显示 在者改变提示框信息
      this.alertShow = true;
      this.alertText = alertText;
    },
    // 关闭提示框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    // 更换验证码
    getCaptcha(event) {
      // 点击图片绑定监听事件，改变请求路径 方法是加上当时间件戳 因为是src请求所以不存在跨域
      event.target.src = "http://localhost:4000/captcha?time=" + Date.now();
    },
    // 异步登录
    async login() {
      // 定义返回的请求结果
      let result
      // 前台表单验证
      // 判断你是哪一种登录方式
      if (this.loginWay) {
        //如果loginWay为true则是短信登录
        // 首先取出手机号和正确的手机号
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          // 则向用户提示手机号不正确
          this.showAlert("手机号不正确");
          return
        } else if (!/^\d{6}$/.test(code)) {
          //判断验证码是否有误
          // 向用户提示所输入的验证码有误
          this.showAlert("验证码有误");
          return
        }

        // 发送ajax请求短信登录
        result = await reqLoginPhone(phone,code)


        // 否则就是密码登录
      } else {
        // 首先获取用户名，密码，验证码
        const {name,pwd,captcha} = this;
        if (!this.name) {
          //必须输入用户名
          this.showAlert("必须输入用户名");
          return
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlert("密码必须指定");
          return
        } else if (!this.captcha) {
          // 请输入图形验证码
          this.showAlert("输入图形验证码");
          return
        }

        // 发送ajax请求密码登录
        result = await reqLogin({name,pwd,captcha})
      }
      
         // 不管成功失败都要停止计时
          if (this.computedtime) {
            // 停止倒计时
            this.computedtime = 0;
            clearInterval(this.IntervalId);
            this.IntervalId = undefined
          }


        //根据结果数据处理
        if(result.code == 0){
          const user = result.data
          // 将user保存到vuex得state中

          // 跳转路由到个人中心页面
          this.$router.replace('/personal')
        }else{
          const msg = result.msg
          // 显示提示
          this.showAlert(msg)
        }


    }
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  components: {
    AlertTip
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      > form {
        > div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.right_phone {
                color black
              }
                

              &.right_phone_number {
                color: #000;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              > .switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            > a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      > .iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>