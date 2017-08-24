<template>
  <!-- 轮播图开始 -->
  <div class="dinglian-home-carousel">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in carouselList" :key="index" @click="">
        <img :src="item.imageUrl" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 轮播图结束 -->
</template>
<script>
  export default {
    name: 'Carousel',
    data () {
      return {}
    },
    props: ['carouselList'],
    created () {
      console.log(this.carouselList[0].imageUrl)
    }
  }
</script>
<style scoped>
  .dinglian-home-carousel {
    width: 100%;
    height: 170px;
  }
  .dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 170px;
  }
  .dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
