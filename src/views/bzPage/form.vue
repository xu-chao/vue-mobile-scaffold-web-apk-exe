<template>
  <div class="bz-form">
    <z-header @leftClick="$router.go(-1)" left-icon="arrow-left" title="华强方特-添加编组"></z-header>
    <md-field>
      <md-input-item placeholder="请输入编组名称" title="编组名称" type="text" v-model="bzForm.GroupName" align="right"></md-input-item>
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
        :default-date="currentDate"
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
        :default-date="currentDate"
        @change="onTurnOffTimePickerChange"
        @confirm="onTurnOffTimePickerConfirm"
      ></md-date-picker>
      <md-cell-item title="是否启用">
        <md-switch slot="right" :value="true" @change="handler('switch0', Enable, $event)" v-model="Enable"></md-switch>
      </md-cell-item>
    </md-field>
    <md-button @click="addBz" type="primary">添加</md-button>
  </div>
</template>
<script>
import { Button, InputItem, Field, Toast, Switch, CellItem, DatePicker, FieldItem } from 'mand-mobile'
import ZHeader from '@/components/ZHeader.vue'
export default {
  name: 'bzForm',
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Switch.name]: Switch,
    [CellItem.name]: CellItem,
    [Field.name]: Field,
    [DatePicker.name]: DatePicker,
    [FieldItem.name]: FieldItem,
    ZHeader
  },
  data () {
    return {
      currentDate: new Date(),
      isTurnOnTimePickerShow: false,
      isturnOffTimePickerShow: false,
      turnOnTimePickerValue: '',
      turnOffTimePickerValue: '',
      Enable: true,
      bzForm: {
        GroupName: '',
        TurnOnTime: '',
        TurnOffTime: '',
        Enable: ''
      }
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
      Toast.info('该功能测试中...', 500, true)
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
