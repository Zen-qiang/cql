<template>
  <div class="dinglian-upload-all bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
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
    <p>简介</p>
    <textarea class="dinglian-upload-con" rows="4" v-model="introduction" placeholder="选择分类让别人更好的找到你"></textarea>
    <div><span v-text="num"></span>字</div>
    <p>我同意<a>《出趣浪服务条款》</a></p>
    <mt-button type="default" @click.native="createCircle" style="margin-top: 10px" class="dinglian-button">完成</mt-button>
  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  export default {
    components: {
      DingLianHeader
    },
    data () {
      return {
        headerName: '创建圈子',
        circle: {},
        isEdit: false,
        circleTags: '',
        isBlock: true,
        introduction: '',
        cover: false,
        lists: [],
        serverId: '',
        isActivated: true,
        previewImg: '',
        num: 400
      }
    },
    watch: {
      introduction: function (val) {
        this.num = 400 - parseInt(val.length)
        if (parseInt(val.length) > 400) {
          Toast('不允许超过400个字')
          this.introduction = val.substr(0, 400)
          this.num = 0
        }
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
//      创建圈子
      createCircle () {
        let formData = new FormData()
        formData.append('serverId', this.serverId)
        formData.append('userId', this.$store.state.userId)
        formData.append('name', this.circle.name)
        formData.append('tags', this.circleTags)
        formData.append('description', this.introduction)
        if (this.isEdit) {
          formData.append('coterieId', this.circle.coterieId)
        }
        if (this.isActivated) {
          this.isActivated = false
          this.axios({
            method: 'post',
            url: this.isEdit ? 'editCoterie' : 'createCoterie',
            data: formData
          }).then(res => {
            this.isActivated = true
            if (!res.data.success) {
              Toast(res.data.error.message)
            } else {
              this.$router.push({'path': '/myCircle'})
            }
          }).catch(err => {
            this.isActivated = true
            console.log(err)
          })
        }
      }
    }
  }

</script>
<style scoped>
  .dinglian-upload-all {
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
  .dinglian-upload-all > p {
    background-color: #ffffff;
    margin-bottom: 0;
    text-align: left;
    font-size: 0.14rem;
    padding: 0.15rem;
    color: #333333;
  }
  .dinglian-upload-all > p:last-of-type {
    font-size: 11px;
    text-align: center;
    margin-top: -0.36rem;
    position: relative;
  }
  .dinglian-upload-all > p:last-of-type > a {
    color: #1f88f3;
    margin-top: 0;
  }

  .dinglian-upload-con {
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 1.57rem;
    padding: 0 0.15rem;
    font-size: 0.12rem;
  }
  .dinglian-upload-all .dinglian-upload-con + div {
    font-size: 0.11rem;
    line-height: 0.25rem;
    text-align: right;
    color: #999;
    background: #fff;
    position: relative;
    top: -0.36rem;
    padding: 0 0.15rem;
  }
  .dinglian-upload-all .dinglian-upload-con ~ p{
    background: #F2F2F2;
  }
</style>
