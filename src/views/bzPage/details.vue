<template>
  <div class="bz-detail-page">
    <z-header
      title="华强方特-编组详细信息"
      left-icon="arrow-left"
      @leftClick="$router.go(-1)"></z-header>
      <md-field>
      <md-input-item title="所属编组" type="text" v-model="bzForm.GroupName" placeholder="请输入所属编组" align="right"></md-input-item>
      <md-field-item
        name="TurnOnTime"
        title="开灯时间"
        arrow="arrow-right"
        align="right"
        :content="turnOnTimePickerValue"
        @click.native="isTurnOnTimePickerShow = true">
      </md-field-item>
      <md-date-picker
        ref="turnOnTimePicker"
        v-model="isTurnOnTimePickerShow"
        type="custom"
        title="选择开灯时间"
        large-radius
        :custom-types="['HH', 'mm']"
        :default-date="turnOnTime"
        @change="onTurnOnTimePickerChange"
        @confirm="onTurnOnTimePickerConfirm"
      ></md-date-picker>
      <md-field-item
        name="TurnOffTime"
        title="关灯时间"
        arrow="arrow-right"
        align="right"
        :content="turnOffTimePickerValue"
        @click.native="isturnOffTimePickerShow = true">
      </md-field-item>
      <md-date-picker
        ref="turnOffTimePicker"
        v-model="isturnOffTimePickerShow"
        type="custom"
        title="选择关灯时间"
        large-radius
        :custom-types="['HH', 'mm']"
        :default-date="turnOffTime"
        @change="onTurnOffTimePickerChange"
        @confirm="onTurnOffTimePickerConfirm"
      ></md-date-picker>
      <md-cell-item title="是否启用">
        <md-switch slot="right" :value="true" @change="handler('switch0', Enable, $event)" v-model="Enable"></md-switch>
      </md-cell-item>
    </md-field>
    <md-button @click="addBz" type="primary">设置</md-button>
  </div>
</template>
<script>
import { Button, InputItem, Field, Toast, Switch, CellItem, Picker, DatePicker, FieldItem } from 'mand-mobile'
import ZHeader from '@/components/ZHeader.vue'
import { getGroupById } from '@/apis/group.api'
// import marked from 'marked'
export default {
  name: 'bzDetails',
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Switch.name]: Switch,
    [CellItem.name]: CellItem,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [DatePicker.name]: DatePicker,
    [FieldItem.name]: FieldItem,
    ZHeader
  },
  data () {
    return {
      details: '',
      isGroupPickerShow: false,
      GroupPickerValue: '',
      groupList: [],
      isTurnOnTimePickerShow: false,
      isturnOffTimePickerShow: false,
      turnOnTimePickerValue: '',
      turnOffTimePickerValue: '',
      turnOnTime: new Date(),
      turnOffTime: new Date(),
      Enable: true,
      bzForm: {
        GroupName: '',
        TurnOnTime: '',
        TurnOffTime: '',
        Enable: ''
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.hasOwnProperty('id')) {
      this.getDetails(this.$route.params.id)
    }
  },
  methods: {
    onTurnOnTimePickerChange (columnIndex, itemIndex, value) {
    },
    onTurnOnTimePickerConfirm (columnsValue) {
      this.turnOnTimePickerValue = this.$refs.turnOnTimePicker.getFormatDate('HH:mm')
    },
    onTurnOffTimePickerChange (columnIndex, itemIndex, value) {
    },
    onTurnOffTimePickerConfirm (columnsValue) {
      this.turnOffTimePickerValue = this.$refs.turnOffTimePicker.getFormatDate('HH:mm')
    },
    handler (name, active) {
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
    getDetails (id) {
      getGroupById(id).then(res => {
        if (res) {
          this.bzForm.GroupName = res.rows[0].GroupName
          this.turnOnTimePickerValue = res.rows[0].TurnOnTime
          this.turnOffTimePickerValue = res.rows[0].TurnOffTime
        } else {
          Toast.failed('获取编组详细信息失败！', 500, true)
        }
      })
    },
    addBz () {
      if (this.bzForm.name === '') {
        Toast.failed('请输入编组名称!', 500, true)
        return
      }
      if (this.bzForm.new_price === '') {
        Toast.failed('请输入开灯时间!', 500, true)
        return
      }
      if (this.bzForm.intro === '') {
        Toast.failed('请输入关灯时间!', 500, true)
        return
      }
      Toast.info('该功能测试中...')
      // createIron(this.bzForm).then((res) => {
      //   if (res) {
      //     Toast.succeed('创建成功', 500, true)
      //     this.bzForm = {
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
<style lang="scss" scope>
.bz-detail-page {
  .details {
    padding: 20px;
    font-size: 32px;
    img {
      width: 100%;
    }
  }
}
</style>
