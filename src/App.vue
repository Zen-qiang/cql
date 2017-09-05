<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.axios({
      method: 'get',
      url: '/getWxConfig',
      params: {
        url: location.href.split('#')[0]
      }
    }).then(res => {
      wx.config({
        debug: false,
        appId: res.data.data.appId,
        timestamp: res.data.data.timestamp,
        nonceStr: res.data.data.nonceStr,
        signature: res.data.data.signature,
        jsApiList: [
          'hideAllNonBaseMenuItem'
        ]
      })
      wx.ready(function () {
        wx.hideAllNonBaseMenuItem()
      })
    }).catch(error => {
      Toast(error)
    })
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  /*margin-top: 60px;*/
}
  html,body,#app {
    height: 100%;
  }
</style>
