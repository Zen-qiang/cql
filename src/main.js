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

// 引入微信jssdk
// import wx from 'weixin-js-sdk'
Vue.config.productionTip = false

if (window.sessionStorage.getItem('userId')) {
  store.commit(types.USERID, window.sessionStorage.getItem('userId'))
  store.commit(types.USERNAME, window.sessionStorage.getItem('userName'))
  store.commit(types.USERPICTURE, window.sessionStorage.getItem('userPicture'))
  store.commit(types.USERPHONENO, window.sessionStorage.getItem('userPhoneNo'))
}

router.beforeEach((to, from, next) => {
  // if (to.fullPath !== '/authorization' || to.fullPath.indexOf('/api/authorization') > 0) {
  //   axios({
  //     method: 'get',
  //     url: '/getWxConfig',
  //     params: {
  //       // url: 'http://mp.dingliantech.com' + to.fullPath
  //       url: location.href.split('#')[0]
  //     }
  //   }).then(res => {
  //     wx.config({
  //       debug: false,
  //       appId: res.data.data.appId,
  //       timestamp: res.data.data.timestamp,
  //       nonceStr: res.data.data.nonceStr,
  //       signature: res.data.data.signature,
  //       jsApiList: [
  //         'onMenuShareTimeline',
  //         'onMenuShareAppMessage',
  //         'onMenuShareQQ',
  //         'onMenuShareWeibo',
  //         'onMenuShareQZone',
  //         'chooseImage',
  //         'downloadImage',
  //         'uploadImage',
  //         'hideAllNonBaseMenuItem'
  //       ]
  //     })
  //     wx.ready(function () {
  //       // 隐藏所有非基础按钮接口
  //       wx.hideAllNonBaseMenuItem()
  //     })
  //   })
  // }
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
          // callbackUrl: encodeURI('http://mp.dingliantech.com/authorization')
          callbackUrl: encodeURI('http://' + window.location.hostname + '/authorization')
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
