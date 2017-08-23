<template>
  <div>
    <div class="dinglian-createCirclePhoto-uploadPhoto">
      <input id="photo" accept="image/*" type="file" @change="uploadImg" ref="photo" />
      <label for="photo" v-show="isBlock"></label>
      <i class="dinglian-createCirclePhoto-background">
        <img :src="imgUrl" alt="" v-show="imgUrl">
      </i>
    </div>
    <p>简介</p>
    <mt-field placeholder="选择分类，让别人更好的找到你" type="textarea" rows="4" v-model="introduction"></mt-field>
  </div>

</template>
<script>
  export default {
    data () {
      return {}
    }
  }

</script>
<style scoped>
  .dinglian-createCirclePhoto-html {
    padding-top: 65px;
  }
  .dinglian-createCirclePhoto-uploadPhoto {
    position: relative;
    /*border: 1px solid red;*/
  }
  .dinglian-createCirclePhoto-uploadPhoto > input {
    position: absolute;
    left: -9999px;
  }
  label {
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    z-index: 10;
  }
  .dinglian-createCirclePhoto-background {
    background: url(../../assets/images/createCircle.png) no-repeat center center;
    display: inline-block;
    width: 100%;
    height: 200px;
  }
  .dinglian-createCirclePhoto-background > img {
    width: 100%;
    height: 200px;
  }
  .dinglian-createCirclePhoto-html > p {
    background-color: #ffffff;
    margin-bottom: 0;
    text-align: left;
    font-size: 20px;
    padding: 15px;
    color: #333333;
  }


</style>
