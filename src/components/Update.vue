<template>
  <div class="hqft-child hqft-child-popup hqft-child-popup-2">
    <md-popup
      v-model="isPopupShow"
      position="bottom"
      :mask-closable="false"
    >
      <md-popup-title-bar
        only-close
        large-radius
        @confirm="hidePopUp()"
        @cancel="hidePopUp()"
      ></md-popup-title-bar>
      <div class="hqft-popup hqft-popup-bottom">
        <p>软件已是最新版</p>
        <!-- <md-progress
          :size="100"
          :value="percent"
          :width="5"
        >
          <span class="progress-value">xx</span>
        </md-progress> -->
        <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#2f86f6">
          <g transform="matrix(1 0 0 -1 0 80)">
            <rect width="10" height="20" rx="3">
              <animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="15" width="10" height="80" rx="3">
              <animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="30" width="10" height="50" rx="3">
              <animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="45" width="10" height="30" rx="3">
              <animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { Popup, PopupTitleBar, ScrollView, Button, Icon, Progress } from 'mand-mobile'
// import { ipcRenderer } from 'electron'
// const { ipcRenderer } = window.require('electron')
// const ipcRenderer = window.ipcRenderer
// const ipcRenderer = window.electron.ipcRenderer
// const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'update',
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [ScrollView.name]: ScrollView
  },
  props: {
    updateFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPopupShow: false,
      percent: 0
    }
  },
  watch: {
    updateFlag: function (newVal, oldVal) {
      this.isPopupShow = newVal
    }
  },
  // mounted () {
  //   ipcRenderer.on('message', (event, text) => {
  //     console.log(arguments)
  //     console.log(text)
  //     // this.tips = text
  //   })
  //   ipcRenderer.on('downloadProgress', (event, progressObj) => {
  //     console.log(progressObj)
  //     this.downloadPercent = progressObj.percent || 0
  //   })
  //   ipcRenderer.on('isUpdateNow', () => {
  //     ipcRenderer.send('isUpdateNow')
  //   })
  //   // // 更新进度
  //   // ipcRenderer.on('downloadProgress', (event, data) => {
  //   //   console.log('into...')
  //   //   debugger
  //   //   this.percent = (data.percent).toFixed(2)
  //   //   if (data.percent >= 100) {
  //   //     // this.show = false;
  //   //   }
  //   // })

  //   // // 主进程返回的检测状态
  //   // ipcRenderer.on('message', (event, data) => {
  //   //   console.log(data)
  //   //   switch (data.status) {
  //   //     // case -1:
  //   //     //   this.$Message.error(data.msg)
  //   //     //   break
  //   //     // case 0:
  //   //     //   this.$Message.loading(data.msg)
  //   //     //   break
  //   //     case 1:
  //   //       this.isPopupShow = true
  //   //       break
  //   //   }
  //   // })

  //   // ipcRenderer.on('isUpdateNow', () => {
  //   //   console.log('into1...')
  //   //   ipcRenderer.send('isUpdateNow')
  //   // })
  // },
  methods: {
    // updateApp () {
    //   console.log('into...')
    //   ipcRenderer.send('checkForUpdate', 'asdad')
    // },
    showPopUp () {
      this.isPopupShow = true
    },
    hidePopUp () {
      this.isPopupShow = false
      this.$emit('flag', this.isPopupShow)
    }
  }
}
</script>

<style lang="stylus">
.hqft-child-popup-2
  float left
  width 100%
  .md-button
    margin-bottom 20px
  .md-popup-title-bar
    .md-popup-cancel
      .md-icon
        align-self flex-start
        margin-left 32px
  .hqft-popup
    position relative
    font-size font-minor-large
    background color-bg-base
    box-sizing border-box
    text-align center
    background-color #FFF
  .hqft-popup-align
    padding 0 40px
    .md-scroll-view
      height 500px
      background #EEE
      p
        line-height 500px
        font-size 64px
        font-weight 200
        color #999
  .hqft-popup-top
    width 100%
    height 75px
    line-height 75px
    background #4a4c5b
    color #fff
    .md-icon
      position absolute
      right 20px
      top 50%
      transform translateY(-50%)
  .hqft-popup-bottom
    width 100%
    padding 0 0 150px
    p
      margin-bottom 100px
      font-size 64px
      font-weight 200
      color #999
  .hqft-popup-left, .hqft-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
