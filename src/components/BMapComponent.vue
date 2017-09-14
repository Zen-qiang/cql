<template>
  <div id="allmap" ></div>
</template>
<script>
  import BMap from 'BMap'
  export default {
    data () {
      return {
        anchor: 'BMAP_ANCHOR_TOP_LEFT',
        type: 'BMAP_NAVIGATION_CONTROL_LARGE',
        address: ''
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        // 百度地图API功能
        var map = new BMap.Map('allmap')    // 创建Map实例
        map.centerAndZoom(new BMap.Point(121.487, 31.249), 14)  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl())   // 添加地图类型控件
        map.setCurrentCity('上海')          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom()   // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom()   // 启用地图惯性拖拽，默认禁用
        this.getBrowserLocation(map)
        this.addPositionControl(map)
      },
      // 添加定位相关控件
      addPositionControl (map) {
        var _this = this
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: _this.anchor,
          // LARGE类型
          type: _this.type,
          // 启用显示定位
          enableGeolocation: true
        })
        map.addControl(navigationControl)
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl()
        geolocationControl.addEventListener('locationSuccess', function (e) {
          // 定位成功事件
          var address = ''
          address += e.addressComponent.province
          address += e.addressComponent.city
          address += e.addressComponent.district
          address += e.addressComponent.street
          address += e.addressComponent.streetNumber
          _this.address = address
          console.log(_this.address)
          _this.$emit('getAddress', _this.address)
        })
        geolocationControl.addEventListener('locationError', function (e) {
          // 定位失败事件
          alert(e.message)
        })
        map.addControl(geolocationControl)
      },
      // 浏览器定位
      getBrowserLocation (map) {
        var _this = this
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            var mk = new BMap.Marker(r.point)
            map.addOverlay(mk)
            map.panTo(r.point)
//            alert('您的位置：' + r.point.lng + ',' + r.point.lat)
            mk.enableDragging()
            _this.getMarkerPosition(r.point)
          } else {
            alert('failed' + this.getStatus())
          }
        }, {enableHighAccuracy: true})
      },
      getCurrentPosition () {},
//      获取覆盖物的地址
      getMarkerPosition (point) {
        var _this = this
        var marker = new BMap.Marker(point)
        console.log('2222')
        marker.addEventListener('dragend', function (e) {
          console.log('1111')
          var geoc = new BMap.Geocoder()
          geoc.getLocation(e.point, function (rs) {
            var addComp = rs.addressComponents
            alert(addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber)
            _this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            _this.$emit('getAddress', _this.address)
          })
        })
//        var p = marker.getPosition()  // 获取marker的位置
//        坐标转化地址
      }
    }
  }
</script>
<style scoped>

</style>
