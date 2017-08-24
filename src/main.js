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
// Vue.use(axios)
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
