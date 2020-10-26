<template>
  <div class="home-page">
    <z-header title="华强方特-主页" left-icon="back" @leftClick="logout">
    </z-header>
    <md-notice-bar mode="closable" icon="volumn" scrollable>
      室外灯光控制的部分功能测试中，相关操作会影响园区灯光，请谨慎操作！
    </md-notice-bar>
    <div class="dashboard">
      <div class="dashboard-item">
        <div class="number dashboard-breath" @click="toFuncTest()">
          {{ onLineNum }}
        </div>
        <div class="text">在线盒子</div>
      </div>
      <div class="dashboard-item">
        <div class="number dashboard-breath" @click="toFuncTest()">
          {{ offLineNum }}
        </div>
        <div class="text">离线盒子</div>
      </div>
      <div class="dashboard-item">
        <div class="number dashboard-breath" @click="toFuncTest()">
          {{ onNum }}
        </div>
        <div class="text">开</div>
      </div>
      <div class="dashboard-item">
        <div class="number dashboard-breath" @click="toFuncTest()">
          {{ offNum }}
        </div>
        <div class="text">关</div>
      </div>
    </div>
    <div class="shop-block" @click="toHelp">室外灯光控制</div>
    <div class="feature-container">
      <div class="feature-item" @click="$router.push('/lampPage/24')">
        <div class="iconfont iconfont-lamp"></div>
        <div class="text">灯光列表</div>
      </div>
      <div class="feature-item" @click="$router.push('/lampForm')">
        <div class="iconfont iconfont-add"></div>
        <div class="text">新增盒子</div>
      </div>
      <div class="feature-item" @click="$router.push('/bzPage')">
        <div class="iconfont iconfont-bianzu"></div>
        <div class="text">盒子编组</div>
      </div>
      <div class="feature-item" @click="$router.push('/zonePage')">
        <div class="iconfont iconfont-quyu"></div>
        <div class="text">编组分配</div>
      </div>
      <div class="feature-item" @click="$router.push('/setTimePage')">
        <div class="iconfont iconfont-dingshi"></div>
        <div class="text">定时设置</div>
      </div>
      <div class="feature-item" @click="toFuncTest()">
        <div class="iconfont iconfont-onoff"></div>
        <div class="text">总开关</div>
      </div>
    </div>
    <!-- <a class="logo-link" target="_blank" :href="``"> -->
    <div class="logo-img" @click="showShare = true"></div>
    <!-- <z-tabbar></z-tabbar> -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <!-- </a> -->
  </div>
</template>

<script>
import { getHomeSum } from '@/apis/home.api'
import ZHeader from '@/components/ZHeader.vue'
import ZTabbar from '@/components/ZTabbar.vue'
import { Toast, NoticeBar } from 'mand-mobile'
import { ShareSheet } from 'vant'
export default {
  name: 'HomePage',
  components: {
    ZHeader,
    ZTabbar,
    [NoticeBar.name]: NoticeBar,
    [ShareSheet.name]: ShareSheet
  },
  data () {
    return {
      timer: '',
      onLineNum: 0,
      offLineNum: 0,
      onNum: 0,
      offNum: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  mounted () {
    this.getDashboard()
    this.timer = setInterval(this.getDashboard, 1000 * 60 * 10)
  },
  methods: {
    onSelect (option) {
      Toast.info('功能测试中...' + option.name, 1000, true)
      this.showShare = false
    },
    /**
     * 获取dashboard数据
     */
    getDashboard () {
      getHomeSum().then((res) => {
        if (res.OnlineNum === '') {
          this.onLineNum = 0
        } else {
          this.onLineNum = res.OnlineNum
        }
        if (res.DisOnlineNum === '') {
          this.offLineNum = 0
        } else {
          this.offLineNum = res.DisOnlineNum
        }
        if (res.TrunOnNum === '') {
          this.onNum = 0
        } else {
          this.onNum = res.TrunOnNum
        }
        if (res.TrunOffNum === '') {
          this.offNum = 0
        } else {
          this.offNum = res.TrunOffNum
        }
      })
    },
    /**
     * 退出登录
     */
    logout () {
      this.$store.dispatch('LOG_OUT')
      this.$router.push('/login')
    },
    /**
     * 去使用帮助
     */
    toHelp () {
      // this.$router.push('/helpPage')
      Toast.info('暂未提供使用说明...', 500, true)
    },
    toFuncTest () {
      Toast.info('功能测试中...', 500, true)
    }
  },
  destroyed () {
    if (this.timer) {
      // 如果定时器在运行则关闭
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss">
.home-page {
  .logo-link {
    display: block;
  }
  .logo-img {
    margin-top: 200px;
    height: 300px;
    background: url("../../assets/logo_enter.png") center / contain no-repeat;
  }
  .shop-block {
    padding: 20px;
    text-align: center;
    font-size: 28px;
    border-bottom: 1px solid #ddd;
    &:active {
      background: #eee;
    }
  }
  .dashboard {
    display: flex;
    background: #2f86f6;
    .dashboard-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 30px 0;
      color: #fff;
      .number {
        font-size: 50px;
        font-weight: bold;
      }
      .text {
        margin-top: 20px;
        font-size: 25px;
        color: #b6ceec;
      }
    }
  }
  .dashboard-breath {
    -webkit-animation: breath 5s infinite ease-in-out alternate;
    animation: breath 5s infinite ease-in-out alternate;
  }
  @-webkit-keyframes breath {
    0% {
      opacity: 0.2;
    }
    70% {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }
  @keyframes breath {
    0% {
      opacity: 0.2;
    }
    70% {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }
  .feature-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    height: 500px;
    .feature-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #ddd;
      &:active {
        background: #eee;
      }
      &:first-child {
        border-left: 0;
      }
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
      &:nth-child(3) {
        border-right: 0;
      }
      .iconfont {
        font-size: 45px;
        // color: #FF4500;
        color: #2f86f6;
      }
      .text {
        margin-top: 20px;
        font-size: 28px;
        color: #333;
      }
    }
  }
}
</style>
