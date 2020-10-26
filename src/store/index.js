import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'zstorage'

Vue.use(Vuex)

// const apiServer = null
// const apiServer = 'http://10.29.175.5:8088'

const state = {
  user: null,
  // eslint-disable-next-line no-undef
  apiServer: apiServer,
  // eslint-disable-next-line no-undef
  baseUrl: apiServer == null ? Storage.get('baseUrl') : apiServer,
  // baseUrl: Storage.get('baseUrl'),
  // baseUrl: 'http://10.29.175.5:8088',
  // baseUrl: apiServer,
  token: ''
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  LOG_OUT (state) {
    state.user = null
    Storage.set('admin_user', null)
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_BASEURL (state, baseUrl) {
    state.baseUrl = baseUrl
    Storage.set('baseUrl', baseUrl)
  },
  SET_APISERVER (state, apiServer) {
    state.apiServer = apiServer
    Storage.set('apiServer', apiServer)
  }
}

const actions = {
  LOG_OUT ({ commit }) {
    commit('LOG_OUT')
  },
  SET_USER (state, user) {
    state.commit('SET_USER', user)
  },
  SET_TOKEN (state, token) {
    state.commit('SET_TOKEN', token)
  },
  SET_BASEURL (state, baseUrl) {
    state.commit('SET_BASEURL', baseUrl)
  },
  SET_APISERVER (state, apiServer) {
    state.commit('SET_APISERVER', apiServer)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters: {},
  actions: actions
})
