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
    <div class="dinglian-position-footer">
      <span>{{address}}</span>
      <em @click="goEditContent">确认</em>
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
      document.body.scrollTop = 0
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
        this.address = val.address
        this.$store.commit(types.CURRENTADDRESS, val)
      },
      goEditContent () {
        this.$router.push({'path': '/editContent'})
      }
    }
  }
</script>

<style scoped>
  div {
    font-size: 0.14rem;
  }
  .dinglian-position-whole {
    position: relative;
    /*width: 100%;*/
    height: 100vh;
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
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.6);
  }
  .dinglian-position-topInput {
    width: 100%;
    height: 0.4rem;
    padding-left: 0.2rem;
    background: rgba(255, 255, 255, 0.6);
  }
  .dinglian-position-bmap {
    height: 100vh;
    position: relative;
  }
  .dinglian-position-footer {
    position: absolute;
    bottom: 0.2rem;
    z-index: 8;
    /*background-color: #ffffff;*/
    width: 76%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.8);
    height: 0.4rem;
  }
  .dinglian-position-footer > span {
    height: 0.4rem;
    display: block;
    line-height: 0.4rem;
    text-align: left;
  }
  .dinglian-position-footer > em {
    position: absolute;
    right: 0;
    top: 0;
    height: 0.4rem;
    line-height: 0.4rem;
    background-color: #ffd200;
    width: 0.5rem;
    font-style: normal;
    border-radius: 0.04rem;
  }

</style>
