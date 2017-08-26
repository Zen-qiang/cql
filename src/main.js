// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入mint ui
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(mint)
import './assets/css/base.css'
// 引入axios
import axios from './http'
import * as types from './store/mutation-types'
import cookie from './utils/cookie'

// Vue.use(axios)
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

// 引入全局变量配置
import domain from './domain.js'
Vue.prototype.domain = domain

Vue.config.productionTip = false

if (window.sessionStorage.getItem('userId')) {
  store.commit(types.USERID, window.sessionStorage.getItem('userId'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.userId) {
      next()
    } else {
      console.log('get user authorization')
      cookie.setCookie('redirectUrl', to.fullPath)
      axios({
        method: 'get',
        url: 'userAuthorization',
        params: {
          callbackUrl: encodeURI('http://' + window.location.host + '/authorization')
        }
      }).then(res => {
        window.location.href = res.data
      }).catch()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
