<template>
  <div class="z-header">
    <md-icon :name="leftIcon" @click="leftClick" />
    <div class="z-header-title">{{title}}</div>
    <md-icon :name="rightIcon" @click="rightClick" />
    <md-popup
      v-model="isShowShare"
      position="bottom"
    >
      <md-popup-title-bar
        title="华强方特-室外灯光控制"
        describe="Android版-扫码下载"
        large-radius
      ></md-popup-title-bar>
      <a class="logo-link-header" target="_blank" href="#">
        <div class="logo-img-header"></div>
      </a>
    </md-popup>
  </div>
</template>
<script>
import { Popup, PopupTitleBar, Icon } from 'mand-mobile'
export default {
  name: 'ZHeader',
  props: {
    leftIcon: {
      type: String,
      default: 'arrow-left'
    },
    rightIcon: {
      type: String,
      default: 'share lg'
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data () {
    return {
      isShowShare: false
    }
  },
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon
  },
  methods: {
    leftClick () {
      this.$emit('leftClick')
    },
    rightClick () {
      if (this.rightIcon === 'share' || this.rightIcon === 'share lg') {
        this.isShowShare = true
        // Toast.info('暂未提供帮助文档', 500)
        // location.href = 'https://www.fangte.xyz/'
      } else {
        this.$emit('rightClick')
      }
    }
  }
}
</script>
<style lang="scss" scope>
.z-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  -webkit-box-shadow: 0 0.267vw 1.6vw 0 rgba(44,48,54,.1);
  box-shadow: 0 0.267vw 1.6vw 0 rgba(44,48,54,.1);
  .z-header-title {
    font-size: 30px;
    font-weight: bolder;
  }
}
.logo-link-header {
    display: block;
    background:white;
  }
.logo-img-header {
    margin-top: 0px;
    height: 500px;
    background: url('../assets/apk.png') center / contain no-repeat;
}
</style>
