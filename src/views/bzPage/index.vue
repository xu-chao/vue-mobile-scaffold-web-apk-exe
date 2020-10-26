<template>
  <div class="group-page">
    <z-header
      title="华强方特-编组列表"
      right-icon="edit"
      @rightClick="$router.push('/bzForm')"
      left-icon="arrow-left"
      @leftClick="$router.go(-1)"></z-header>
      <z-search
      :searchText="searchText"
      ></z-search>
    <div class="group-list">
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        :bouncing="true"
        @refreshing="onRefresh"
        @end-reached="onEndReached"
        style="height: calc(100vh - 120px)">
        <md-scroll-view-refresh
          slot="refresh"
          slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
          :scroll-top="scrollTop"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></md-scroll-view-refresh>
        <z-card
          v-for="v in groupList"
          :key="v.value"
          >
          <div slot="left">
            <div class="z-card-title">{{v.text}}</div>
            <div class="z-card-info">{{v.TurnOnTime}} -- {{v.TurnOffTime}}</div>
          </div>
          <template slot="right">
            <div class="ctrl-btn-group">
              <md-button type="primary" size="small" :round="true" inline plain @click="seeGroup(v.value)">
                <i class="iconfont iconfont-look"></i>
              </md-button>
              &nbsp;
              <md-button type="warning" size="small" :round="true" inline @click="turn(v.value)">
                <i class="iconfont iconfont-onoff"></i>
              </md-button>
            </div>
          </template>
          <template slot="btn">
            <button class="z-card-btn del-btn"  @click="delGroup(v.value)">删除</button>
          </template>
        </z-card>
        <!-- <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        >
        </md-scroll-view-more> -->
      </md-scroll-view>
    </div>
    <!-- <z-tabbar></z-tabbar> -->
    <!-- <z-tabbar
    :index="index"
    ></z-tabbar> -->
    <!-- 开关操作弹框 -->
    <md-dialog
      title="整组灯光进行操作？"
      :closable="true"
      v-model="turnDialog"
      :btns="dialogBtns">
    </md-dialog>
  </div>
</template>
<script>
import { Button, Dialog, Toast, ScrollView, ScrollViewRefresh, ScrollViewMore } from 'mand-mobile'
import ZHeader from '@/components/ZHeader.vue'
import ZSearch from '@/components/ZSearch.vue'
import ZTabbar from '@/components/ZTabbar.vue'
import ZCard from '@/components/ZCard.vue'
import { getAllGroup, groupTurnOn, groupTurnOff } from '@/apis/group.api'
import { queryFormat } from 'zmethods'
export default {
  name: 'ArticlePage',
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    ZHeader,
    ZSearch,
    ZTabbar,
    ZCard
  },
  data () {
    this.dialogBtns = [
      {
        text: '开',
        handler: this.turnGroupOn
      },
      {
        text: '关',
        handler: this.turnGroupOff
      }
    ]
    return {
      index: 2,
      searchText: '输入编组名称进行筛选',
      groupList: [],
      isFinished: false,
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      turnDialog: false
    }
  },
  computed: {
    queryString () {
      return queryFormat(this.query)
    }
  },
  mounted () {
    this.getAllGroups()
  },
  methods: {
    /**
     * 下拉刷新
     */
    onRefresh () {
      setTimeout(() => {
        this.getAllGroups()
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
    getAllGroups () {
      getAllGroup().then(res => {
        this.groupList = res.rows
      })
    },
    /**
     * 删除编组
     */
    delGroup (id) {
      Dialog.confirm({
        title: '删除此编组',
        content: '此操作将永久删除该编组, 是否继续',
        confirmText: '继续',
        onConfirm: () => {
          Toast.info('删除功能暂时未开发', 500, true)
          // deleteGroup(id).then(res => {
          //   if (res) {
          //     Toast.succeed('删除成功', 500, true)
          //   } else {
          //     Toast.failed('删除失败', 500, true)
          //   }
          // })
        }
      })
    },
    /**
     * 查看编组
     */
    seeGroup (id) {
      // Toast.info('暂时无法查看该编组详细信息', 500, true)
      this.$router.push(`/bzPage/${id}`)
    },
    /**
     * 开/关弹框
     */
    turn (id) {
      this.editTurnId = id
      this.turnDialog = true
    },
    /**
     * 编组开灯
     */
    turnGroupOn () {
      let id = this.editTurnId
      if (id === '') {
        Toast.failed('编组开关失败！', 500, true)
      } else {
        groupTurnOn(id).then(res => {
          if (res) {
            this.turnDialog = false
            Toast.succeed('开灯成功', 1200, true)
            this.$router.push(`/lampPage/${id}`)
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
      let id = this.editTurnId
      if (id === '') {
        Toast.failed('编组开关失败！')
      } else {
        groupTurnOff(id).then(res => {
          if (res) {
            this.turnDialog = false
            Toast.succeed('关灯成功', 1200)
            this.$router.push(`/lampPage/${id}`)
          } else {
            Toast.succeed('关灯失败', 1200)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scope>
.group-page {
  .group-list {
    padding: 5px;
    background: rgb(249, 250, 251);
  }
  .ctrl-btn-group {
    padding: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
