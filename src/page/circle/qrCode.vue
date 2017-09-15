<template>
  <div class="dinglian-qr-whole">
    <div class="dinglian-qr-section">
      <div class="dinglian-qr-header">
        <div class="dinglian-qr-header-img">
          <img src="" alt="">
        </div>
        <div class="dinglian-qr-header-body">
          <p>locking 舞会社团</p>
          <p><em class="dinglian-qr-activity">活动<i>3</i></em><em class="dinglian-qr-member">成员<i>56</i></em></p>
        </div>

      </div>
      <div class="dinglian-qr-body">
        <vue-qr :text="qrcodeContent" size="230" dotScale="1" whiteMargin="true" colorLight="red"></vue-qr>
      </div>
      <p>扫描二维码快速加入</p>
    </div>
  </div>
</template>
<script>
  import VueQr from 'vue-qr'
  export default {
    components: {
      VueQr
    },
    created () {
      this.qrcodeContent = this.$store.state.qrCode
    },
    data () {
      return {
        qrcodeContent: ''
      }
    }
  }
</script>
<style scoped>
  .dinglian-qr-whole {
    width: 100%;
    height: 100%;
    padding-top: 0.62rem;
    background-color: #f2f2f2;
  }
  .dinglian-qr-section {
    width: 76%;
    margin: 0 auto;
    height: 385px;
    background-color: #ffffff;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
  }
  .dinglian-qr-header {
    height: 87px;
    width: 100%;
    border-bottom: 1px dashed #e3e3e3;
    padding: 21px;
    display: flex;
    flex-flow: row nowrap;
  }
  .dinglian-qr-section > p {
    font-size: 11px;
    color: #666666;
  }
  .dinglian-qr-body {
    width: 231px;
    height: 231px;
    margin: 0 auto;
  }
  .dinglian-qr-header-img {
    width: 44px;
    height: 44px;
    overflow: hidden;
  }
  .dinglian-qr-header-img > img {
    width: 44px;
  }
  .dinglian-qr-header-body {
    padding-left: 12px;
    padding-top: 7px;
  }
  .dinglian-qr-header-body p {
    text-align: left;
  }
  em,i {
    font-style: normal;
  }
  .dinglian-qr-header-body p:first-of-type {
    height: 17px;
    font-size: 16px;
    line-height: 17px;

  }
  .dinglian-qr-header-body p:last-of-type {
    height: 11px;
    line-height: 11px;
    font-size: 11px;
    margin-top: 6px;
    color: #999999;
  }
  .dinglian-qr-activity i {
    margin-left: 1px;
  }
  .dinglian-qr-activity {
    margin-right: 3px;
  }
  .dinglian-qr-member i {
    margin-left: 1px;
  }

</style>
