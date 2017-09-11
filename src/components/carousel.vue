<template>
  <!-- 轮播图开始 -->
  <div class="dinglian-home-carousel" @click="previewImg()">
    <mt-swipe :auto="4000" :show-indicators="indicators" @change="handleChange">
      <mt-swipe-item v-for="(item, index) in carouselList" :key="index">
        <img :src="item.url" @click="redirect(item.redirectUrl)" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 轮播图结束 -->
</template>
<script>
  import wx from 'weixin-js-sdk'
  export default {
    name: 'Carousel',
    data () {
      return {
        indicators: true,
        redurl: ''
      }
    },
    props: ['carouselList'],
    created () {
      if (this.carouselList.length === 1) {
        this.indicators = false
      }
    },
    methods: {
      previewImg () {
        if (this.carouselList.length === 1) {
          wx.previewImage({
            current: this.carouselList[0].url, // 当前显示图片的http链接
            urls: [this.carouselList[0].url] // 需要预览的图片http链接列表
          })
        }
      },
      handleChange (index) {
        console.log(index)
      },
      redirect (redirectUrl) {
        if (redirectUrl) {
          console.log('点击')
          window.location.href = redirectUrl
          wx.previewImage({
            current: redirectUrl, // 当前显示图片的http链接
            urls: [] // 需要预览的图片http链接列表
          })
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-home-carousel {
    width: 100%;
    height: 2.1rem;
  }
  .dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 2.1rem;
  }
  .dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
