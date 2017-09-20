<!--编辑圈子详情-->
<template>
  <div class="dinglian-editCircleinformation-all bColor">
    <ding-lian-header :headerName="headerName" :cancel="cancel"></ding-lian-header>
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
    <div class="dinglian-editCircleinformation-name container">
      <span>圈子名称</span>
      <input type="text" value="LOOKING 街舞">
    </div>
    <!--编辑圈子分类-->
    <div class="dinglian-editCircleinformation-classify container">
      <span>分类</span>
      <p>街舞</p>
    </div>
    <!--编辑圈子标签-->
    <div class="dinglian-editCircleinformation-tags container">
      <span>标签</span>
      <ul>
        <li>桌游</li>
        <li>街舞</li>
        <li>其它</li>
      </ul>
    </div>
    <!--编辑圈子介绍-->
    <div class="dinglian-editCircleinformation-introduce">
      <p>圈子介绍</p>
      <div>Lorem ipsum dolor sit amet, consectetur 中国有嘻哈</div>
    </div>
  </div>
</template>
<script>
//  import { Toast } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  export default {
    components: {
      DingLianHeader
    },
    data () {
      return {
        headerName: '圈子资料',
        cancel: '完成',
        circle: {},
        isEdit: false,
        circleTags: '',
        isBlock: true,
        introduction: '',
        cover: false,
        lists: [],
        serverId: '',
        isActivated: true,
        previewImg: ''
      }
    },
    created () {
      this.circle = this.$store.state.circle
      this.circleTags = this.$store.state.circleTags
      if (this.circle.coterieId) {
        this.isEdit = true
        this.introduction = this.circle.description
        this.previewImg = this.circle.cover
        this.cover = true
      }
    },
    methods: {
//      上传图片
      takePictures () {
        var _this = this
        // if (this.ready) {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // _this.localIds = res.localIds
            let localId = res.localIds[0]
            // 判断ios是不是用的 wkwebview 内核
            if (window.__wxjs_is_wkwebview) {
              wx.getLocalImgData({
                localId: localId, // 图片的localID
                success: function (res) {
                  _this.previewImg = res.localData
                }
              })
            } else {
              _this.previewImg = localId
            }
            wx.uploadImage({
              localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                _this.serverId = res.serverId
                _this.cover = true
              }
            })
          }
        })
      },
      alertLog () {
        console.log(12345)
      }
    }
  }
</script>
<style scoped>
  .dinglian-editCircleinformation-all {
    position: relative;
    height: 100vh;
  }
  .dinglian-createCirclePhoto-uploadPhoto {
    position: relative;
    height: 1.8rem;
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
    overflow: hidden;
    margin: 0 auto;
  }
  .dinglian-createCirclePhoto-background > img {
    display: block;
  }
  .dinglian-createCirclePhoto-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
  /*圈子名称*/
  .container {
    height: 0.5rem;
    display: flex;
    padding: 0 0.15rem;
    align-content: stretch;
    background: #fff;
    margin-bottom: 1px;
  }
  .container > span {
    width: 0.75rem;
    text-align: left;
    font-size: 0.14rem;
    line-height: 0.5rem;
    color: #999;
  }
  .container > input {
    flex-grow:1;
    font-size: 0.14rem;
    line-height: 0.5rem;
    text-align: left;
  }
  /*编辑圈子分类*/
  .dinglian-editCircleinformation-classify > p,.dinglian-editCircleinformation-introduce > p {
    background: url("../../assets/images/jtcy.svg") no-repeat right center;
    -webkit-background-size: 0.1rem;
    background-size: 0.1rem;
  }
  .container > p,.container > ul {
    flex-grow:1;
    font-size: 0.14rem;
    line-height: 0.5rem;
    text-align: left;
    overflow: hidden;
  }
  /*编辑圈子标签*/
  .container > ul > li {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.11rem;
    height: 0.22rem;
    background: #333;
    color: #fff;
    -webkit-border-radius: 0.11rem;
    -moz-border-radius: 0.11rem;
    border-radius: 0.11rem;
    padding: 0 0.1rem;
    line-height: 0.22rem;
    margin-right: 0.05rem;
  }
  /*圈子介绍*/
  .dinglian-editCircleinformation-introduce {
    padding: 0.15rem;
    background: #fff;
    text-align: left;
  }
  .dinglian-editCircleinformation-introduce > p {
    font-size: 0.14rem;
    color: #999;
  }
  .dinglian-editCircleinformation-introduce > div {
    margin-top: 0.08rem;
    font-size: 0.12rem;
    text-indent: 2em;
  }
</style>
