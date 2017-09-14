<template>
  <div class="dinglian-position-whole">
    <div class="dinglian-position-header">
      <div id="r-result">
        <input type="text" id="suggestId" size="20" class="dinglian-position-topInput" placeholder="搜活动的地址" />
      </div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:300px;height:auto; display:none;"></div>
    </div>
    <!--<button @click="getAddress">获取当前地址</button>-->
    <!--<button @click="getLocation">获取当前位置</button>-->
    <!--<button @click="getDistance">测距</button>-->
    <b-map ref="bmap" class="dinglian-position-bmap" v-on:getCurrentAddress="getCurrentAddress"></b-map>
    <div class="footer">
      <span>{{address}}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import BMap from '../../components/BMap.vue'
  import * as types from '../../store/mutation-types'
  export default {
    components: {
      BMap
    },
    name: 'hello',
    data () {
      return {
        address: ''

      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      getAddress () {
        alert('当前位置地址：' + this.$refs.bmap.address)
      },
      getLocation () {
        alert('当前位置坐标：' + this.$refs.bmap.position)
      },
      getDistance () {
        alert('距离当前位置：' + this.$refs.bmap.distance + 'm')
      },
      getCurrentAddress (val) {
        this.address = val
        this.$store.commit(types.CURRENTADDRESS, val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    font-size: 14px;
  }
  .dinglian-position-whole {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .dinglian-position-header {
    position: absolute;
    z-index: 8;
    top: 0.2rem;
    left: 0;
    right: 0;
    width: 94%;
    margin: auto;
    height: 0.4rem;
    /*background-color: #ffffff;*/
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.9);
  }
  .dinglian-position-topInput {
    width: 100%;
    height: 0.4rem;
    padding-left: 0.2rem;
  }
  .dinglian-position-bmap {
    height: 100%;
  }

</style>
