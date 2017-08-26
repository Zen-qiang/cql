export default {
  resourceUrl: 'http://106.14.2.158:5080/chuqulang-resource',
  setCookie: function (key, value) {
    document.cookie = key + '=' + value
    console.log('Set cookie ' + key + ' success!')
  },
  getCookie: function (key) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(key + '=')
      if (start !== -1) {
        start = start + key.length + 1
        var end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        var value = unescape(document.cookie.substring(start, end))
        console.log('Get cookie ' + key + ' success! value:' + value)
        return value
      }
    }
  }
  // resourceUrl: 'http://192.168.3.11:8081/chuqulang-resource'
}
