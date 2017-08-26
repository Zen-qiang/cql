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
      this.getUser()
    },
    methods: {
      getUser () {
        var url = window.location.search
        var params = {}
        if (url.indexOf('?') !== -1) {
          var str = url.substr(1)
          var strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
          }
        }
        if (params.openId) {
          this.axios({
            method: 'get',
            url: 'getUser',
            params: {
              openId: params.openId
            }
          }).then(res => {
            if (res.data.data) {
              this.$store.commit(types.USERID, res.data.data.userId)
              this.$router.push({'path': cookie.readCookie('redirectUrl')})
            }
          }).catch()
        }
      }
    }
  }
</script>