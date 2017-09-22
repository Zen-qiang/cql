<!--编辑圈子详情-->
<template>
  <div class="dinglian-editCircleinformation-all bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <!--编辑圈子封面-->
    <div class="dinglian-createCirclePhoto-uploadPhoto">
      <label v-on:click.stop="takePictures"></label>
      <i class="dinglian-createCirclePhoto-background">
        <img :src="circleCover" alt="">
      </i>
      <div class="dinglian-createCirclePhoto-cover">
        <label v-on:click.stop="takePictures">
          <img src="../../assets/images/modify.png" alt="">
        </label>
      </div>
    </div>
    <!--编辑圈子名称-->
    <div class="dinglian-editCircleinformation-name container">
      <span>圈子名称</span>
      <input type="text" v-model="circleName" :value="circleName">
    </div>
    <!--编辑圈子分类-->
    <div class="dinglian-editCircleinformation-classify container" @click="goEditCategory($route.params.cid)">
      <span>分类</span>
      <p v-text="circleTagsType"></p>
    </div>
    <!--编辑圈子标签-->
    <div class="dinglian-editCircleinformation-tags container">
      <span>标签</span>
      <ul>
        <li v-for="tags in circleTags" v-if="flag">{{tags.name}}</li>
        <li v-for="tags in newCircleTags" v-if="!flag">{{tags}}</li>
      </ul>
    </div>
    <!--编辑圈子介绍-->
    <div class="dinglian-editCircleinformation-introduce" @click="goEditIntroduction($route.params.cid)">
      <p>圈子介绍</p>
      <div v-text="newCircleDescription"></div>
    </div>
    <button @click="goCircleInformation($route.params.cid)">保存修改</button>
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
        headerName: '圈子资料',
        cancel: '完成',
        circle: {},
        circleTags: [],
        newCircleTags: [],
        circleTagsType: '',
        circleName: '',
        circleDescription: '',
        circleCover: '',
        newCircleDescription: '',
        flag: false
      }
    },
    created () {
      this.getCircle()
      this.getCircleDescription()
      this.getCircleTags()
      this.getCircleSelectTags()
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
                  _this.circleCover = res.localData
                }
              })
            } else {
              _this.circleCover = localId
            }
            wx.uploadImage({
              localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
              }
            })
          }
        })
      },
//      获取圈子详情
      getCircle () {
        this.axios({
          method: 'get',
          url: '/getCoterieInfo',
          params: {
            coterieId: this.$route.params.cid,
            userId: this.$store.state.userId
          }
        }).then(res => {
          this.circle = res.data.data
          this.circleName = this.circle.name
          this.circleCover = this.circle.cover
        })
      },
//      获取圈子标签类型
      getCircleTags () {
        if (this.$store.state.activityTypeName === '') {
          this.axios({
            method: 'get',
            url: '/getCoterieInfo',
            params: {
              coterieId: this.$route.params.cid,
              userId: this.$store.state.userId
            }
          }).then(res => {
            this.circleTagsType = res.data.data.tags[0].name
          })
        } else {
          this.circleTagsType = this.$store.state.activityTypeName
        }
      },
//      获取圈子标签
      getCircleSelectTags () {
//        this.circleTags = this.$store.state.selectedTags
        if (this.$store.state.selectedTags === '') {
          this.axios({
            method: 'get',
            url: '/getCoterieInfo',
            params: {
              coterieId: this.$route.params.cid,
              userId: this.$store.state.userId
            }
          }).then(res => {
            this.circleTags = res.data.data.tags.slice(1)
            this.flag = true
          })
        } else {
          this.newCircleTags = this.$store.state.selectedTags
          this.flag = false
        }
      },
//      获取圈子描述
      getCircleDescription () {
        if (this.$store.state.circleDescription === '') {
          this.axios({
            method: 'get',
            url: '/getCoterieInfo',
            params: {
              coterieId: this.$route.params.cid,
              userId: this.$store.state.userId
            }
          }).then(res => {
            this.newCircleDescription = res.data.data.description
          })
        } else {
          this.newCircleDescription = this.$store.state.circleDescription
        }
      },
//      跳转到分类界面
      goEditCategory (id) {
        this.$router.push({'path': '/editCategory/' + id})
      },
//      跳转到圈子介绍界面
      goEditIntroduction (id) {
        this.$router.push({'path': '/editIntroduction/' + id})
      },
//      保存按钮跳转到圈子编辑页面
      goCircleInformation (id) {
        this.axios({
          method: 'post',
          url: '/editCoterie',
          params: {
            coterieId: this.$route.params.cid,
            userId: this.$store.state.userId,
            name: this.circleName,
            tags: this.$store.state.circleTags,
            description: this.newCircleDescription,
            file: this.circleCover
          }
        }).then(res => {
          if (res.data.success) {
            Toast('保存成功')
          }
        })
        this.$router.push({'path': '/circleInformation/' + id})
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
  .dinglian-editCircleinformation-all > button {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #FFD200;
    text-align: center;
    height: 0.49rem;
    font-size: 0.15rem;
    color: #333;
    line-height: 0.49rem;
    width: 100%;
    border: none;
    outline: none;
  }
</style>
