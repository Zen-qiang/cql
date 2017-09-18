<template>
  <div id="app">
    <keep-alive>
      <transition name="slide">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
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
}
  /*html,body,#app {*/
    /*height: 100%;*/
  /*}*/
html {
  height: 100%;
  background: #f2f2f2;
}
  .slide-enter-active {
    transition: all .3s ease;
  }
  .slide-leave-active {
    /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  }
  .slide-enter, .slide-leave {
    transform: translateX(3.7rem);
    opacity: 0;
  }


</style>
