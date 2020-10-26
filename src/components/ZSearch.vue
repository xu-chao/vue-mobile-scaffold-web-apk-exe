<template>
<div>
 <form action="/">
    <van-search
      @cancel="onCancel"
      @search="onSearch"
      :placeholder="searchText"
      show-action
      v-model="value"
    />
  </form>
</div>
  <!-- <div>
      <md-input-item
        ref="searchInput"
        :placeholder="searchText"
      >
        <md-icon class="searchIcon" name="search lg" slot="left" @click.native="onClick"></md-icon>
      </md-input-item>
  </div> -->
</template>

<script>
import { InputItem, Icon, Toast } from 'mand-mobile'
import { Search } from 'vant'

export default {
  name: 'ZSearch',
  components: {
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  props: {
    searchText: {
      type: String,
      default: '输入搜索'
    }
  },
  // watch: {
  //   searchText: function (newVal, oldVal) {
  //     this.searchText = newVal
  //   }
  // },
  data () {
    return {
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
