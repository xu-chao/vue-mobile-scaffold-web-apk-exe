import axios from 'axios'
import router from '../router'
import Storage from 'zstorage'
import store from '../store'
import { Toast } from 'mand-mobile'
import { Notify } from 'vant'
// create an axios instance
const service = axios.create({
  // baseURL: Storage.get('baseUrl'),
  // baseURL: 'http://10.29.175.5:8088',
  baseURL: store.state.baseUrl,
  // baseURL: null,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // service.baseUrl = Storage.get('baseUrl')
    let token = Storage.get('admin_user') ? Storage.get('admin_user').token : ''
    // console.log(token)
    if (token) {
      config.headers['Authorization'] = token
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    try {
      let req = JSON.parse(response.request.response)
      if (req.err_code === 401) {
        store.commit('LOG_OUT')
        router.replace({
          path: '/login'
        })
        return true
      }
      // if (response.data.code === 200) {
      if (response.data != null) {
        return response.data
      } else {
        Toast.failed('网络请求中断，请连接指定WIFI！')
        // Toast.failed(response.data.data)
      }
    } catch (e) { // 用于文件下载
      return response.data
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch('SET_USER', null)
          router.replace({
            path: '/login'
          })
          break
        default:
          Toast.failed(error.response.data.message)
      }
    }
    // else {
    //   error.response.data = '网络请求中断，请连接指定WIFI！'
    // }
    // return Promise.reject(error.response.data) // 返回接口返回的错误信息
    // Toast.failed('网络请求中断，请连接指定WIFI！', 3000, true)
    Notify({
      type: 'danger',
      message: '网络请求中断，请连接指定WIFI！',
      duration: 2500
    })
    return Promise.reject(new Error('网络请求中断，请连接指定WIFI！'))
  })

export default service
