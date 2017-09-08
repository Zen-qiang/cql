<template>
  <div id="app">
    <keep-alive :include="['activityLists', 'activityDetails']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  /*margin-top: 60px;*/
}
  html,body,#app {
    height: 100%;
  }
</style>
