import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: resolve => require(['@/views/loginPage'], resolve)
    },
    {
      name: 'index',
      path: '/',
      redirect: '/homePage'
    },
    {
      name: 'homePage',
      path: '/homePage',
      component: resolve => require(['@/views/homePage'], resolve)
    },
    {
      name: 'lampPage',
      path: '/lampPage/:id',
      component: resolve => require(['@/views/lampPage'], resolve)
    },
    {
      name: 'lampForm',
      path: '/lampForm',
      component: resolve => require(['@/views/lampPage/form.vue'], resolve)
    },
    {
      name: 'lampDetail',
      path: '/lampDetail/:id',
      component: resolve => require(['@/views/lampPage/details.vue'], resolve)
    },
    {
      name: 'lampEditPage',
      path: '/lampEditPage',
      component: resolve => require(['@/views/lampEditPage'], resolve)
    },
    {
      name: 'bzPage',
      path: '/bzPage',
      component: resolve => require(['@/views/bzPage'], resolve)
    },
    {
      name: 'bzDetails',
      path: '/bzPage/:id',
      component: resolve => require(['@/views/bzPage/details.vue'], resolve)
    },
    {
      name: 'bzForm',
      path: '/bzForm',
      component: resolve => require(['@/views/bzPage/form.vue'], resolve)
    },
    {
      name: 'zonePage',
      path: '/zonePage',
      component: resolve => require(['@/views/zonePage'], resolve)
    },
    {
      name: 'setTimePage',
      path: '/setTimePage',
      component: resolve => require(['@/views/setTimePage'], resolve)
    },
    {
      name: 'turnOnOffPage',
      path: '/turnOnOffPage',
      component: resolve => require(['@/views/turnOnOffPage'], resolve)
    },
    {
      name: 'helpPage',
      path: '/helpPage',
      component: resolve => require(['@/views/helpPage'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (!store.state.user) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    if (store.state.user) {
      next()
    } else {
      next({ path: `/login` })
    }
  }
})

export default router
