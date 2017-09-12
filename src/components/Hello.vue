<template>
  <div class="hello">
    <div id="r-result">请输入:<input type="text" id="suggestId" size="20" value="百度" style="width:300px;" /></div>
    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:300px;height:auto; display:none;"></div>
    <button @click="getAddress">获取当前地址</button>
    <button @click="getLocation">获取当前位置</button>
    <button @click="getDistance">测距</button>
    <b-map ref="bmap" style="height:400px;width:100%;"></b-map>
  </div>
</template>

<script>
import BMap from './BMap.vue'
export default {
  components: {
    BMap
  },
  name: 'hello',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getAddress () {
      alert('当前位置地址：' + this.$refs.bmap.address)
      // console.log(this.$refs.bmap.address)
    },
    getLocation () {
      alert('当前位置坐标：' + this.$refs.bmap.position)
      // console.log(this.$refs.bmap.position)
    },
    getDistance () {
      alert('距离当前位置：' + this.$refs.bmap.distance + 'm')
      // console.log(this.$refs.bmap.distance + 'm')
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
