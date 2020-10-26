<template>
  <div class="login-page">
    <z-header title="华强方特" left-icon="setting lg" @leftClick="ini">
    </z-header>
    <div class="header-title">室外灯光</div>
    <md-field>
      <ValidationObserver ref="obs">
        <ValidationProvider
          name="工号"
          rules="required|numeric"
          v-slot="{ errors }"
        >
          <md-input-item
            :error="errors[0]"
            clearable
            is-title-latent
            placeholder="请输入工号"
            ref="name"
            title="用户名"
            v-model="loginForm.username"
          ></md-input-item>
        </ValidationProvider>
        <ValidationProvider name="密码" rules="required" v-slot="{ errors }">
          <md-input-item
            :error="errors[0]"
            clearable
            is-title-latent
            placeholder="请输入密码"
            ref="id"
            title="密码"
            type="password"
            v-model="loginForm.password"
          ></md-input-item>
        </ValidationProvider>
      </ValidationObserver>
    </md-field>
    <md-button @click="login" class="login-btn" type="primary">登录</md-button>
    <div @click="update" class="ad-img"></div>
    <update :updateFlag="updateFlag" @flag="updateProp"></update>
    <md-dialog
      :closable="true"
      v-model="iniDialog.open"
      :btns="iniDialog.btns"
    >
      <ValidationProvider name="IP" rules="required" v-slot="{ errors }">
        <md-input-item
          :error="errors[0]"
           v-model="ip"
          ref="IP"
          title="IP配置"
          placeholder="10.29.175.5"
          clearable
        ></md-input-item>
      </ValidationProvider>
      <br />IP地址的配置需要同后端程序保持一致
    </md-dialog>
  </div>
</template>
<script>
// import { setting } from '@/utils/'
import { InputItem, Field, Button, Toast, Dialog, NumberKeyboard } from 'mand-mobile'
import { login } from '@/apis/user.api'
import Update from '@/components/Update.vue'
import ZHeader from '@/components/ZHeader.vue'
export default {
  name: 'LoginPage',
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    Update,
    ZHeader,
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Dialog.name]: Dialog
  },
  data () {
    return {
      // isValid: false,
      ip: '',
      updateFlag: false,
      loginForm: {
        username: '',
        password: ''
      },
      iniDialog: {
        open: false,
        btns: [
          {
            text: '重置',
            handler: this.onIniCancel
          },
          {
            text: '确认',
            handler: this.onIniConfirm
          }
        ]
      }
    }
  },
  methods: {
    onIniConfirm () {
      this.iniDialog.open = false
      if (!(typeof this.$store.state.ip === 'undefined')) {
        Toast.succeed('IP已经配置过了，不需再配置', 2000, true)
      } else {
        this.$store.dispatch('SET_BASEURL', 'http://' + this.ip + ':8088')
        Toast.loading('配置', 2000, true)
        setTimeout(() => {
          Toast.hide()
          setTimeout(() => {
            Toast.succeed('配置IP成功', 2000, true)
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          }, 1000)
        }, 1000)
      }
    },
    onIniCancel () {
      // setting.find().then(res => {
      //   console.log(res.site)
      //   this.d = {
      //     id: res.id,
      //     site: res.site,
      //     theme: res.theme,
      //     shortcut: res.shortcut,
      //     view: res.view,
      //     searchAllSites: res.searchAllSites,
      //     externalPlayer: res.externalPlayer,
      //     editPlayerPath: false
      //   }
      //   this.setting = this.d
      // })
      // let db = new Dexie('test_db')
      // db.version(1).stores({
      //   student: 'name,age'
      // })
      // db.open()
      // db.student.put({ name: '小明', age: 18 }).then(function () {
      //   Toast.info('我是小明,今年 ' + db.student.get('小明'))
      //   return db.student.get('小明')
      // }).then(function (data) {
      //   console.log('我是小明,今年 ' + data.age)
      //   Toast.info('我是小明,今年 ' + db.student.get('小明'))
      // }).catch(function (error) {
      //   console.log('error: ' + error)
      //   db.close()
      // })
      // db.close()
      this.$store.dispatch('SET_BASEURL', this.$store.state.baseUrl)
      Toast.info('已重置IP，可能导致访问不了系统，有问题请联系管理员', 2000, true)
      this.iniDialog.open = false
    },
    ini () {
      this.iniDialog.open = true
    },
    updateProp (data) {
      this.updateFlag = data
    },
    update () {
      this.updateFlag = !this.updateFlag
    },
    async login () {
      const isValid = await this.$refs.obs.validate() // 异步调用方法验证
      if (isValid) {
        this.loginForm.username = this.loginForm.username.trim()
        login(this.loginForm).then((res) => {
          if (res) {
            Toast.succeed('登录成功', 1200, true)
            let user = {
              username: this.loginForm.username,
              token: 'xuchao'
            }
            this.$store.dispatch('SET_USER', user)
            // this.$store.dispatch('SET_TOKEN', res.token)
            this.$store.dispatch('SET_TOKEN', 'xuchao')
            this.$storage.set('admin_user', user, 24 * 60 * 60)
            this.$router.push('/')
          } else {
            Toast.failed('登录失败', 3000, true)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  padding: 30px;
  .header-title {
    padding: 80px 0;
    text-align: center;
    font-size: 60px;
    font-weight: bold;
  }
  .login-btn {
    margin-top: 40px;
  }
  .ad-img {
    margin-top: 200px;
    height: 300px;
    background: url("../../assets/logo_updown.png") center / contain no-repeat;
  }
}
</style>
