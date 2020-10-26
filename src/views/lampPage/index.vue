<template>
  <div class="lamp-page">
    <z-header
      title="华强方特-灯光列表"
      right-icon="edit"
      @rightClick="$router.push('/lampForm')"
      left-icon="arrow-left"
      @leftClick="$router.go(-1)"></z-header>
      <z-search
      :searchText="searchText"
      ></z-search>
      <div class="bzbtn">
      <template>
        <div>
          <md-action-bar :actions="bzButton" @click="onBtnClick">
          </md-action-bar>
        </div>
      </template>
    </div>
    <div class="lamp-list">
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        :bouncing="true"
        @refreshing="onRefresh"
        @end-reached="onEndReached"
        style="height: calc(100vh - 180px)">
        <md-scroll-view-refresh
          slot="refresh"
          slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
          :scroll-top="scrollTop"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></md-scroll-view-refresh>
        <z-card
          :useImg="true"
          v-for="v in lampList"
          :key="v.ID">
          <img :ref="'img_'+v.ID" class="z-card-img img" v-if="!v.NetState" src="../../assets/light_offline.png" alt="灯光离线" slot="image" @click="lampDetail(v.ID)">
          <img :ref="'img_'+v.ID" class="z-card-img img" v-else-if="v.LampState" src="../../assets/light_on.png" alt="灯光开" slot="image" @click="lampDetail(v.ID)">
          <img :ref="'img_'+v.ID" class="z-card-img img" v-else src="../../assets/light_off.png" alt="灯光闭" slot="image" @click="lampDetail(v.ID)">
          <div slot="left">
            <!-- <div class="z-card-title"><marquee scrollamount="5">{{v.Name}} -- {{v.Adress}}</marquee></div> -->
            <div class="z-card-title">{{v.Name}}</div>
            <div class="z-card-import">地址：{{v.Adress}}</div>
            <div class="z-card-info">IP：{{v.IP}}</div>
            <div class="z-card-info">占用端口：{{v.Number}}</div>
          </div>
          <template slot="right">
            <div class="ctrl-btn-group">
              <md-switch v-model="v.LampState" @change.stop="changeStatus(v.ID,v.IP,v.Number,v.Name,v.LampState)"></md-switch>
            </div>
          </template>
          <template slot="btn">
            <button class="z-card-btn del-btn"  @click="delLamp(v.ID)">删除</button>
          </template>
        </z-card>
        <!-- <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        >
        </md-scroll-view-more> -->
      </md-scroll-view>
    </div>
    <!-- 开关操作弹框 -->
    <md-dialog
      title="整组灯光进行操作？"
      :closable="true"
      v-model="turnDialog"
      :btns="dialogBtns">
      <template>
      <div>
        <md-field>
          <md-field-item
           title="编组"
           arrow="arrow-right"
           :addon="GroupPickerValue"
           @click="isGroupPickerShow = true">
          </md-field-item>
        </md-field>
        <md-picker
          ref="picker"
          v-model="isGroupPickerShow"
          :data="groupList"
          large-radius
          @confirm="onGroupPickerConfirm()"
          title="选择编组"
        ></md-picker>
      </div>
      </template>
    </md-dialog>
  </div>
</template>
<script>
import { Button, Dialog, Toast, ScrollView, ScrollViewRefresh, ScrollViewMore, Switch, ActionBar, Picker, Field, FieldItem } from 'mand-mobile'
import ZHeader from '@/components/ZHeader.vue'
import ZSearch from '@/components/ZSearch.vue'
import ZCard from '@/components/ZCard.vue'
import { getAllLamp, turnOn, turnOff } from '@/apis/lamp.api'
import { getAllGroup, groupTurnLook, groupTurnOn, groupTurnOff } from '@/apis/group.api'
import { queryFormat } from 'zmethods'
export default {
  name: 'LampPage',
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    ZHeader,
    ZSearch,
    ZCard,
    [Switch.name]: Switch,
    [ActionBar.name]: ActionBar,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem
  },
  data () {
    this.dialogBtns = [
      {
        text: '开',
        icon: 'check lg',
        handler: this.turnGroupOn
      },
      {
        text: '关',
        icon: 'check-disabled lg',
        handler: this.turnGroupOff
      },
      {
        text: '查看',
        icon: 'visible lg',
        handler: this.turnGroupLook
      }
    ]
    return {
      searchText: '输入灯光名称或地址进行筛选',
      bzId: 24,
      success: 0,
      timer: '',
      isGroupPickerShow: false,
      GroupPickerValue: '',
      turnDialog: false,
      lampList: [],
      groupList: [],
      isFinished: false,
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      editTurnId: null,
      bzButton: [
        {
          text: '选择编组',
          round: true
        }
      ]
    }
  },
  computed: {
    queryString () {
      return queryFormat(this.query)
    }
  },
  mounted () {
    // this.getAllLamps()
    this.getAllGroups()
    this.timer = setInterval(this.queryState, 1000 * 60 * 10)
    if (this.$route.params && this.$route.params.hasOwnProperty('id')) {
      this.getAllLamps(this.$route.params.id)
      this.bzId = this.$route.params.id
    }
  },
  methods: {
    queryState () {
      Toast.loading('查询状态中...', 3000, true)
      setTimeout(() => {
        Toast.hide()
        setTimeout(() => {
          this.getAllLamps()
          if (this.success) {
            Toast.succeed('查询状态成功', 500, true)
          } else {
            Toast.failed('查询状态失败', 500, true)
          }
        }, 10)
      }, 500)
    },
    /**
     * 下拉刷新
     */
    onRefresh () {
      setTimeout(() => {
        this.getAllLamps(this.bzId)
        this.$refs.scrollView.finishRefresh()
      }, 2000)
    },
    /**
     * 到底加载
     */
    onEndReached () {
      if (this.isFinished) {
        return
      }
      this.$refs.scrollView.finishLoadMore()
    },
    /**
     * 初始化全部灯光状态
     */
    getAllLamps (id) {
      getAllLamp(id).then(res => {
        if (res === '' || res === null) {
          this.success = 0
          Toast.failed('加载全部灯光列表失败！', 500, true)
        } else {
          this.success = 1
          this.lampList = res.rows
        }
      })
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
    /**
     * 开/关
     */
    changeStatus (id, ip, number, name, state) {
      if (!state) {
        turnOff(id, ip, number, name).then(res => {
          if (res) {
            this.$refs[`img_` + id].src = '../../assets/light_off.png'
            Toast.succeed('关灯成功', 1200, true)
          } else {
            Toast.succeed('关灯失败', 1200, true)
          }
        })
      } else {
        turnOn(id, ip, number, name).then(res => {
          if (res) {
            this.$refs[`img_` + id].src = '../../assets/light_on.png'
            Toast.succeed('开灯成功', 1200, true)
          } else {
            Toast.succeed('开灯失败', 1200, true)
          }
        })
      }
    },
    /**
     * 查看全部灯状态
     */
    turnGroupLook () {
      const picker = this.$refs[`picker`].getColumnValue()
      let id = picker.value
      this.bzId = id
      if (this.GroupPickerValue === '') {
        Toast.failed('未选择编组列表！', 500, true)
      } else {
        groupTurnLook(id).then(res => {
          if (res === '' || res === null) {
            Toast.failed('加载全部灯光列表失败！', 500, true)
          } else {
            this.GroupPickerValue = ''
            this.turnDialog = false
            this.lampList = res.rows
            this.$refs.scrollView.reflowScroller()
          }
        })
      }
    },
    /**
     * 编组开灯
     */
    turnGroupOn () {
      const picker = this.$refs[`picker`].getColumnValue()
      let id = picker.value
      this.bzId = id
      if (this.GroupPickerValue === '') {
        Toast.failed('未选择编组列表！', 500, true)
      } else {
        groupTurnOn(id).then(res => {
          if (res) {
            Toast.succeed('开灯成功', 1200, true)
            groupTurnLook(id).then(res => {
              if (res === '' || res === null) {
                Toast.failed('加载全部灯光列表失败！', 500, true)
              } else {
                this.GroupPickerValue = ''
                this.turnDialog = false
                this.lampList = res.rows
              }
            })
          } else {
            Toast.succeed('开灯失败', 1200, true)
          }
        })
      }
    },
    /**
     * 编组关灯
     */
    turnGroupOff () {
      const picker = this.$refs[`picker`].getColumnValue()
      let id = picker.value
      this.bzId = id
      if (this.GroupPickerValue === '') {
        Toast.failed('未选择编组列表！', 500, true)
      } else {
        groupTurnOff(id).then(res => {
          if (res) {
            Toast.succeed('关灯成功', 1200, true)
            groupTurnLook(id).then(res => {
              if (res === '' || res === null) {
                Toast.failed('加载全部灯光列表失败！', 500, true)
              } else {
                this.GroupPickerValue = ''
                this.turnDialog = false
                this.lampList = res.rows
              }
            })
          } else {
            Toast.succeed('关灯失败', 1200, true)
          }
        })
      }
    },
    /**
     * 删除功能
     */
    delLamp (id) {
      Toast.info('暂时不能使用删除功能！', 500, true)
    },
    /**
     * 编组列表选择
     */
    onGroupPickerConfirm () {
      const values = this.$refs[`picker`].getColumnValues()
      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this[`GroupPickerValue`] = res
    },
    /**
     * 打开选择编组
     */
    onBtnClick (event, action) {
      this.turnDialog = true
    },
    /**
     * 查看灯光详细信息
     */
    lampDetail (id) {
      this.$router.push(`/lampDetail/${id}`)
    }
  },
  destroyed () {
    if (this.timer) { // 如果定时器在运行则关闭
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="scss" scope>
.lamp-page {
  .lamp-list {
    height: 100%;
    padding: 5px;
    background: rgb(249, 250, 251);
  }
  .ctrl-btn-group {
    display: flex;
    align-items: center;
  }
}
.bzbtn {
      display: flex;
      background: #2f86f6;
      .bzbtn-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 30px 0;
        color: #fff;
        .number {
          font-size: 18px;
          font-weight: bold;
        }
        .text {
          margin-top: 20px;
          font-size: 18px;
          color: #b6ceec;
        }
      }
    }
.img {
    -webkit-animation: breath 3s infinite ease-in-out alternate;
    animation: breath 3s infinite ease-in-out alternate;
    }
        @-webkit-keyframes breath {
            0% {
                opacity: .2;
            }
            70% {
                opacity: 1;
            }
            to {
                opacity: .2;
            }
        }
        @keyframes breath {
            0% {
                opacity: .2;
            }
            70% {
                opacity: 1;
            }
            to {
                opacity: .2;
            }
        }
</style>
