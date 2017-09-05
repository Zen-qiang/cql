<template>
  <div></div>
</template>
<script>
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
          this.$router.push({
            name: 'Authorization',
            params: {
              openId: res.data.data.openId
            }
          })
        }
      }).catch()
    }
  }
</script>
