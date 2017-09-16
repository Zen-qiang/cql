<template>
  <div class="hello">
    <div id="allmap" :style="style"></div>
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
      activityMarker: null,
      style: {
        width: '100%',
        height: document.querySelector('html').clientHeight + 'px'
      }
    }
  },
  created () {
    let gps = this.$route.params.gps
    var positionStr = gps.split(',')
    if (positionStr.length === 2) {
      this.activityPoint = new BMap.Point(parseFloat(positionStr[0]), parseFloat(positionStr[1]))
    }
  },
  mounted () {
    var _this = this
    var map = new BMap.Map('allmap')
    map.centerAndZoom('上海', 16)
    this.map = map
    // 创建活动标识
    map.addEventListener('load', function (e) {
      new BMap.Geolocation().getCurrentPosition(function (r) {
        if (this.getStatus() === 0) {
          _this.userPoint = r.point
          var driving2 = new BMap.DrivingRoute(_this.map, {
            renderOptions: {
              map: _this.map,
              autoViewport: true
            }
          })
          driving2.search(r.point, _this.activityPoint)
          _this.map.panTo(_this.activityPoint)
        } else {
          alert('定位失败，状态码为:' + this.getStatus())
        }
      }, {
        enableHighAccuracy: true
      })
    })
  },
  methods: {
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
