<template>
  <div></div>
</template>
<script>
  import * as types from '../../store/mutation-types'
  import cookie from '../../utils/cookie'
  export default {
    data () {
      return {}
    },
    created () {
      var url = window.location.search
      var params = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      this.axios({
        method: 'get',
        url: 'getAccessToken',
        params: {
          code: params.code,
          state: params.state
        }
      }).then(res => {
        if (res.data.data.openId) {
          this.getUser(res.data.data.openId)
          // this.checkSubscribe(res.data.data.openId)
        }
      }).catch()
    },
    methods: {
      // checkSubscribe (openId) {
      //   this.axios({
      //     method: 'get',
      //     url: 'checkSubscribe',
      //     params: {
      //       openId: openId
      //     }
      //   }).then(res => {
      //     if (res.data.success) {
      //       this.getUser(openId)
      //     } else {
      //       window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzNTg4NjQwOA==&scene=124#wechat_redirect'
      //     }
      //   }).catch()
      // },
      getUser (openId) {
        this.axios({
          method: 'get',
          url: 'getUser',
          params: {
            openId: openId
          }
        }).then(res => {
          // console.log(1111)
          if (res.data.data) {
            this.$store.commit(types.USERID, res.data.data.userId)
            this.$store.commit(types.USERNAME, res.data.data.nickName)
            this.$store.commit(types.USERPICTURE, res.data.data.picture)
            this.$store.commit(types.USERPHONENO, res.data.data.phoneNo)
            this.$store.commit(types.USERGENDER, res.data.data.gender)
            // this.$router.push({'path': cookie.readCookie('redirectUrl')})
            location.assign(location.origin + '#' + cookie.readCookie('redirectUrl'))
          }
        }).catch()
      }
    }
  }
</script>
