<template>
<div>
  <!-- <van-tabbar v-model="active" route active-color="#07c160" inactive-color="#000"> -->
  <van-tabbar route active-color="#07c160" inactive-color="#000">
    <van-tabbar-item replace to="/homePage" icon="bulb-o">灯光</van-tabbar-item>
    <van-tabbar-item replace to="/bzPage" icon="award-o">投影</van-tabbar-item>
    <van-tabbar-item replace to="/bzPage" icon="cluster-o">DMX</van-tabbar-item>
    <van-tabbar-item replace to="/bzPage" icon="volume-o">AVCL</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import { Toast } from 'mand-mobile'
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'ZTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  // watch: {
  //   index: function (newVal, oldVal) {
  //     this.index = newVal
  //   }
  // },
  data () {
    return {
      active: 0,
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      Toast({
        content: '功能测试中',
        icon: 'warn'
      })
    },
    onCancel () {
      Toast({
        content: '功能测试中',
        icon: 'warn'
      })
    },
    onClick () {
      Toast({
        content: '功能测试中',
        icon: 'warn'
      })
    }
  }
}
</script>

<style lang="stylus">
.searchIcon {
  padding-left: 30px;
}
</style>
