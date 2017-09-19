<!--编辑圈子详情-->
<template>
  <div class="dinglian-editCircleinformation-all bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <!--编辑圈子封面-->
    <div class="dinglian-createCirclePhoto-uploadPhoto">
      <label v-show="!cover" v-on:click.stop="takePictures"></label>
      <i class="dinglian-createCirclePhoto-background">
        <img :src="previewImg" alt="" v-show="previewImg">
      </i>
      <div class="dinglian-createCirclePhoto-cover" v-show="cover">
        <label v-on:click.stop="takePictures">
          <img src="../../assets/images/modify.png" alt="">
        </label>
      </div>
    </div>
    <!--编辑圈子名称-->
    <div class="dinglian-editCircleinformation-name"></div>
    <!--编辑圈子分类-->
    <div class="dinglian-editCircleinformation-classify"></div>
    <!--编辑圈子介绍-->
    <div class="dinglian-editCircleinformation-all"></div>
  </div>
</template>
<script>

</script>
<style scoped>
  .dinglian-editCircleinformation-all {
    position: relative;
  }
  .dinglian-createCirclePhoto-uploadPhoto {
    position: relative;
    height: 1.8rem;
    /*border-bottom: 1px solid #999999;*/
  }
  label {
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    z-index: 10;
  }
  .dinglian-createCirclePhoto-background {
    background: #fff url(../../assets/images/createCircle.svg) no-repeat center center;
    background-size: 50% 50%;
    display: inline-block;
    width: 100%;
    height: 1.8rem;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin: 0 auto;
  }
  .dinglian-createCirclePhoto-background > img {
    /*width: 3.75rem;*/
    /*height: 1.8rem;*/
    display: block;
  }
  .dinglian-createCirclePhoto-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background: #dddddd;*/
    /*opacity: 0.2;*/
    background: rgba(0,0,0,0.2);
    z-index: 11;
  }
  .dinglian-createCirclePhoto-cover > label {
    position: absolute;
    width: 1rem;
    height: 0.3rem;
    bottom: 0.15rem;
    right: 0;
    left: auto;
    top: auto;
    z-index: 13;
  }
  .dinglian-createCirclePhoto-cover  img {
    width: 0.86rem;
    height: 0.22rem;
    position: absolute;
    right: 0;
  }
</style>
