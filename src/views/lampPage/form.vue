<template>
  <div class="iron-form">
    <z-header
      title="华强方特-添加盒子"
      left-icon="arrow-left"
      @leftClick="$router.go(-1)"></z-header>
    <md-field>
      <md-input-item title="IP" type="text" v-model="ironForm.name" placeholder="请输入盒子IP" align="right"></md-input-item>
      <!-- <md-input-item title="端口" type="money" v-model="ironForm.new_price" placeholder="请输入盒子端口" align="right"></md-input-item> -->
      <md-input-item
        title="端口"
        placeholder="请输入盒子端口"
        is-virtual-keyboard
        clearable
        align="right"
        :value="commonValue"
        @focus="onFakeInputFocus"
        @blur="onFakeInputBlur"
      ></md-input-item>
      <md-input-item title="名称" type="text" v-model="ironForm.intro" placeholder="请输入盒子名称" align="right"></md-input-item>
      <md-input-item title="地址" type="text" v-model="ironForm.intro" placeholder="请输入盒子地址" align="right"></md-input-item>
    </md-field>
    <md-button type="primary" @click="addIron">添加</md-button>
  </div>
</template>
<script>
import { Button, InputItem, Field, Toast } from 'mand-mobile'
import ZHeader from '@/components/ZHeader.vue'
import { createIron } from '@/apis/iron.api'
export default {
  name: 'lampForm',
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    ZHeader
  },
  data () {
    return {
      commonValue: 8080,
      ironForm: {
        name: '',
        new_price: 0,
        intro: ''
      }
    }
  },
  methods: {
    onFakeInputFocus () {
    },
    onFakeInputBlur () {
      this.scrollInputBack && this.scrollInputBack()
    },
    addIron () {
      if (this.ironForm.name === '') {
        Toast.failed('请输入盒子IP!', 500, true)
        return
      }
      if (this.ironForm.new_price === '') {
        Toast.failed('请输入盒子端口!', 500, true)
        return
      }
      if (this.ironForm.intro === '') {
        Toast.failed('请输入盒子名称!', 500, true)
        return
      }
      this.ironForm.new_price = parseInt(this.ironForm.new_price)
      createIron(this.ironForm).then(res => {
        if (res) {
          Toast.succeed('创建成功', 500, true)
          this.ironForm = {
            name: '',
            new_price: 0,
            intro: ''
          }
        }
      })
    }
  }
}
</script>
