<template>
  <div id="allmap" ></div>
</template>

<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      map: null,
      marker: null,
      position: '',
      address: '',
      distance: 0,
      initPoint: null,
      currentPoint: null
    }
  },
  props: {
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    searchComplete () {
      // 建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        'input': 'suggestId',
        'location': this.map
      })
      // 鼠标放在下拉列表上的事件
      ac.addEventListener('onhighlight', function (e) {
        var str = ''
        var _value = e.fromitem.value
        var value = ''
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value
        value = ''
        if (e.toitem.index > -1) {
          _value = e.toitem.value
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value
        document.getElementById('searchResultPanel').innerHTML = str
      })
      var _this = this
      // 鼠标点击下拉列表后的事件
      ac.addEventListener('onconfirm', function (e) {
        var _value = e.item.value
        var myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        document.getElementById('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue
        _this.map.clearOverlays()
        var local = new BMap.LocalSearch(_this.map, {
          // 智能搜索
          onSearchComplete: function (localResult) {
            var pp = localResult.getPoi(0).point
            _this.map.centerAndZoom(pp, 18)
            _this.map.addOverlay(_this.initMarker(pp))
          }
        })
        local.search(myValue)
      })
    },
    geolocationControl () {
      var _this = this
      // 定位当前位置控件
      var geolocationControl = new BMap.GeolocationControl()
      geolocationControl.addEventListener('locationSuccess', function (e) {
        // 定位成功事件
        _this.map.clearOverlays()
        _this.map.centerAndZoom(e.point, 18)
        _this.map.addOverlay(_this.initMarker(e.point))
      })
      geolocationControl.addEventListener('locationError', function (e) {
        // 定位失败事件
        alert(e.message)
      })
      this.map.addControl(geolocationControl)
    },
    getAddressByPoint (p) {
      var _this = this
      var geocoder = new BMap.Geocoder()
      geocoder.getLocation(p, function (result) {
        _this.address = result.address
      })
    },
    getPosition (p) {
      this.position = p.lng + ',' + p.lat
    },
    initMarker (point) {
      var _this = this
      var myIcon = new BMap.Icon('http://langlang2go.oss-cn-shanghai.aliyuncs.com/icon/ditu3.svg', new BMap.Size(45, 88))
      var shadow = new BMap.Icon('http://langlang2go.oss-cn-shanghai.aliyuncs.com/icon/ditu4.svg', new BMap.Size(45, 88))
      this.marker = new BMap.Marker(point, {
        icon: myIcon,
        shadow: shadow,
        enableDragging: true,
        raiseOnDrag: true
      })
      this.marker.addEventListener('dragend', function (e) {
        _this.getPosition(e.point)
        _this.getAddressByPoint(e.point)
        _this.currentPoint = e.point
        // 测距
        _this.distance = _this.map.getDistance(_this.initPoint, _this.currentPoint)
      })
      // 添加标识物
      this.map.addOverlay(this.marker)
      // 移动到指定的point
      this.map.panTo(point)
      // 获取位置
      this.getPosition(point)
      // 获取地址
      this.getAddressByPoint(point)
    },
    init () {
      var _this = this
      // 初始化地图
      var map = new BMap.Map('allmap')
      map.centerAndZoom('上海', 16)
      _this.map = map
      // 默认定位当前位置
      new BMap.Geolocation().getCurrentPosition(function (r) {
        if (this.getStatus() === 0) {
          _this.initPoint = r.point
          // 标记初始化
          _this.initMarker(r.point)
        } else {
          alert('定位失败，状态码为:' + this.getStatus())
        }
      }, {
        enableHighAccuracy: true
      })
      // 添加定位控件
      this.geolocationControl()
      // 关键字提示控件
      this.searchComplete()
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
