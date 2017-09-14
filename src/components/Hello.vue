<template>
  <div class="hello">
    <div id="allmap" style="height:400px;width:100%;"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      map: null,
      userPoint: null,
      activityPoint: null,
      userMarker: null,
      activityMarker: null
    }
  },
  created () {
  },
  mounted () {
    var _this = this
    var map = new BMap.Map('allmap')
    map.centerAndZoom('上海', 16)
    this.map = map
    // 创建活动标识
    this.initActivityMarker()
    map.addEventListener('load', function (e) {
      new BMap.Geolocation().getCurrentPosition(function (r) {
        if (this.getStatus() === 0) {
          _this.initUserMarker(r.point)
        } else {
          alert('定位失败，状态码为:' + this.getStatus())
        }
      }, {
        enableHighAccuracy: true
      })
    })
  },
  methods: {
    initUserMarker (p) {
      var userIcon = new BMap.Icon('http://langlang2go.oss-cn-shanghai.aliyuncs.com/icon/ditu4.svg', new BMap.Size(25, 58))
      this.userMarker = new BMap.Marker(p, {
        icon: userIcon
      })
      // 添加标识物
      this.map.addOverlay(this.userMarker)
      // 移动到指定的point
      this.map.panTo(p)
    },
    initActivityMarker () {
      // 定义活动地点
      this.activityPoint = new BMap.Point(121.48187849, 31.24946271)
      var activityIcon = new BMap.Icon('http://langlang2go.oss-cn-shanghai.aliyuncs.com/icon/ditu5.svg', new BMap.Size(75, 118))
      this.activityMarker = new BMap.Marker(this.activityPoint, {
        icon: activityIcon
      })
      // 添加标识物
      this.map.addOverlay(this.activityMarker)
      // 移动到指定的point
      // this.map.panTo(this.activityPoint)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    font-size: 14px;
  }
  #r-result{width:100%;}
</style>
