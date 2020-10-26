<template>
  <div class="lamp-form">
    <z-header @leftClick="$router.go(-1)" left-icon="arrow-left" title="华强方特-编组分配"></z-header>
    <md-field>
      <md-input-item
        ref="input12"
        title="盒子IP"
        :value="IP"
        readonly
        align="right"
      >
      </md-input-item>
    </md-field>
    <md-field>
      <md-field-item
        title="所属编组"
        :content="selectorValue.join(',')"
        @click="showSelector"
        arrow
        align="right"
      />
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="groupList[0]"
      :defaultValue="selectorValue"
      title="编组多选"
      max-height="320px"
      okText="确定"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      multi
    ></md-selector>
    <md-button @click="addBz" type="primary">分配</md-button>
  </div>
</template>
<script>
import { Button, InputItem, Field, Toast, Switch, CellItem, FieldItem, Selector } from 'mand-mobile'
import { getAllGroup } from '@/apis/group.api'
import ZHeader from '@/components/ZHeader.vue'
export default {
  name: 'lampDetail',
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Switch.name]: Switch,
    [CellItem.name]: CellItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Selector.name]: Selector,
    ZHeader
  },
  data () {
    return {
      groupList: [],
      IP: '10.29.175.5',
      turnOnTime: new Date(),
      turnOffTime: new Date(),
      Enable: true,
      lampDetail: {
        GroupName: '',
        TurnOnTime: '',
        TurnOffTime: '',
        Enable: ''
      },
      isSelectorShow: false,
      selectorValue: [24]
    }
  },
  mounted () {
    this.getAllGroups()
    if (this.$route.params && this.$route.params.hasOwnProperty('id')) {
      // this.getDetails(this.$route.params.id)
    }
  },
  methods: {
    showSelector () {
      this.isSelectorShow = true
    },
    onSelectorConfirm (array) {
      this.selectorValue = array
    },
    /**
     * 初始化全部灯光编组
     */
    getAllGroups () {
      getAllGroup().then(res => {
        if (res === '' || res === null) {
          Toast.failed('加载灯光编组失败！', 500, true)
        } else {
          this.groupList.push(res.rows)
        }
      })
    },
    addBz () {
      if (this.lampDetail.name === '') {
        Toast.failed('请输入编组名称!', 500, true)
        return
      }
      if (this.lampDetail.new_price === '') {
        Toast.failed('请输入开灯时间!', 500, true)
        return
      }
      if (this.lampDetail.intro === '') {
        Toast.failed('请输入关灯时间!', 500, true)
        return
      }
      Toast.info('该功能测试中...', 500, true)
      // createBz(this.lampDetail).then((res) => {
      //   if (res) {
      //     Toast.succeed('创建成功', 500, true)
      //     this.lampDetail = {
      //       GroupName: '',
      //       TurnOnTime: '',
      //       TurnOffTime: '',
      //       Enable: ''
      //     }
      //   }
      // })
    }
  }
}
</script>
