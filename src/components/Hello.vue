<template>
  <div class="hello">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                 :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
                 :distanceIndex="1"
                 ref="loadmore">
      <ul style="height: 300px;background-color: #999999;display: block">
        <li v-for="item in items">{{item}}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [1],
      allLoaded: false,
      autoLill: false
    }
  },
  methods: {
    loadTop () {
      console.log('刷新')
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      console.log('加载')
      console.log(1111)
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    font-size: 12px;
  }
</style>
