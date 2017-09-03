<template>
  <div class="hello">
    <div @click="ceshi">
      测试拍照
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import wx from 'weixin-js-sdk'
export default {
  name: 'hello',
  data () {
    return {
    }
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
          'chooseImage',
          'downloadImage',
          'uploadImage'
        ]
      })
      this.ready = true
    }).catch(error => {
      Toast(error)
      this.ready = false
    })
  },
  methods: {
    ceshi () {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds
          alert(localIds)
          _this.shangchuan(localIds[0])
        }
      })
    },
    shangchuan (e) {
      wx.uploadImage({
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var serverId = res.serverId
          alert(serverId)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    font-size: 14px;
  }
</style>
