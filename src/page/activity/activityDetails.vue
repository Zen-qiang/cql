<template>
  <div class="dinglian-details-all">
    <!--右上角编辑按钮-->
    <span class="dinglian-details-editIcon" @click="editActivityInfo"  v-show="isCreator && activityInfo.status !== '0'">
      {{edit}}
    </span>
    <!--轮播图-->
    <carousel :carouselList="carouselList"></carousel>
    <!--标题-->
    <div class="dinglian-details-title clearfix">
      <!--<input type="text" v-model="activityInfo.name" disabled>-->
      <p v-text="activityInfo.name"></p>
      <span @click="goCircleDetail(activityInfo.coterie.id)">{{circleName}}</span>
    </div>
    <div class="dinglian-details-chat clearfix" @click="gotoMessage">
      <img src="../../assets/images/circle.jpg" alt="">
      <div class="dinglian-details-chatNews">
        <div class="dinglian-details-chatNewsTop">
          <h4>留言板</h4>
          <span v-show="topic.lastCommentTime">{{topic.lastCommentTime | moment}}</span>
        </div>
        <p>[{{topic.commentCount}}条] {{topic.lastComment}}</p>
      </div>
    </div>
    <div class="dinglian-details-status dinglian-status">
      <label for="">状态</label>
      <span v-if="activityInfo.status === '1'">进行中</span>
      <span v-else-if="activityInfo.status === '2'">正在报名</span>
      <span v-else>已结束</span>
      <mt-switch v-model="allowSignUp" class="edit-switch" v-show="isCreator && !disabled"></mt-switch>
    </div>
    <div class="dinglian-details-status">
      <label for="">组织者</label>
      <!--<input type="text" v-model="nickName" disabled>-->
      <p v-text="nickName"></p>
      <a :href="mobileHref" class="dinglian-details-mobile"></a>
    </div>
    <div class="dinglian-details-status dinglian-details-time">
      <label for="">开始时间</label>
      <span>{{activityInfo.startTime | moment}}</span>
      <span></span>
    </div>
    <div class="dinglian-details-status dinglian-details-time">
      <label for="">结束时间</label>
      <span>{{activityInfo.endTime | moment}}</span>
      <span></span>
    </div>
    <div class="dinglian-details-status">
      <label for="">地址</label>
<<<<<<< HEAD
      <!--<input type="text" v-model="address" disabled>-->
      <p v-text="address"></p>
      <span class="dinglian-details-address"></span>
=======
      <input type="text" v-model="address" disabled>
      <span class="dinglian-details-address" v-show="gps" @click="showActivityMap"></span>
>>>>>>> 5212f2f549936e4f323d8da52b98c3baad8bb390
    </div>

    <div class="dinglian-details-sign" @click="registerInformation">
      <div>
        <label for="">报名信息</label>
        <span>{{userCount.currentCount}}</span><span>/{{userCount.minCount}}-{{userCount.maxCount}}</span>
      </div>
      <div class="dinglian-details-activityMembers">
        <div><img :src="item.picture" alt="" v-for="item in activityMembers"></div>
        <span>more</span>
      </div>
    </div>
    <div class="dinglian-edit-people dinglian-details-types">
      <label for="">人数</label>
      <input type="tel" v-model="minCount" :disabled="disabled">&nbsp;至&nbsp;
      <input type="tel"v-model="maxCount" :disabled="disabled">&nbsp;人
    </div>
    <div class="dinglian-details-types">
      <label for="">类型</label>
      <span>{{typesTags.name}}</span>
    </div>
    <div class="dinglian-details-types">
      <label for="">标签</label>
      <ul class="dinglian-details-tags">
        <li v-for="item in tags">{{item.name}}</li>
      </ul>
    </div>
    <div class="dinglian-details-types freeOrAAA">
      <label for="">费用</label>
      <input type="text" v-if="activityInfo.charge === 'free'" value="免费" style="color:#e63832;font-size:0.14rem;" disabled>
      <input type="text" v-else value="AA制" style="color:#e63832;font-size:0.14rem;" disabled>
    </div>
    <div class="dinglian-details-types dinglian-details-psd">
      <label for="">密码权限</label>
      <span>{{isOpen ? '公开':'非公开' }}</span>
      <mt-switch v-model="isOpen" class="edit-switch" v-show="isCreator && !disabled"></mt-switch>
    </div>
    <div class="dinglian-details-types" v-show="!isOpen && isCreator">
      <label for="">输入密码</label>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="dinglian-details-types remarks">
      <label for="">活动备注</label>
    </div>
    <!--<textarea id="" cols="30" rows="10" class="dinglian-details-textarea" :disabled="disabled">
      {{activityInfo.description}}
    </textarea>-->
    <p class="dinglian-details-textarea">
      {{activityInfo.description}}
    </p>
    <mt-button v-if="isCreator && activityInfo.status !== '0' " type="default" style="margin-top: 10px" class="dinglian-button" @click.native="singnUpActivity">取消活动</mt-button>
    <mt-button v-else v-show="allowSignUp && !isSignUp" type="default" style="margin-top: 10px" class="dinglian-button" @click.native="singnUpActivity">参加活动</mt-button>
    <mt-button v-show="activityInfo.status !== '0' && isSignUp && !isCreator" type="default" style="margin-top: 10px" class="dinglian-button" @click.native="cancelSingnUpActivity">取消报名</mt-button>
  </div>
</template>
<script>
  import { MessageBox, Toast } from 'mint-ui'
  import Carousel from '../../components/carousel.vue'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import * as types from '../../store/mutation-types'
  import wx from 'weixin-js-sdk'
  export default {
    filters: {
      moment (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    components: {
      Carousel
    },
    data () {
      return {
        carouselList: [],
        address: '',
        gps: '',
        activityInfo: {},
        isOpen: '',
        status: '',
        nickName: '',
        topic: '',
        typesTags: '',
        isCreator: false,
        minCount: '',
        maxCount: '',
        tags: [],
        signActivity: '',
        edit: '编辑',
        disabled: true,
        password: '',
        allowSignUp: '',
        topicId: '',
        activityId: '',
        activityMembers: '',
        uid: this.$store.state.userId,
        mobileHref: '',
        userCount: '',
        isSignUp: false,
        circleName: ''
      }
    },
    created () {
      this.getActivityInfo(function (data) {
        wx.ready(function () {
          //        朋友圈
          wx.onMenuShareTimeline({
            title: data.name, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          //        朋友
          wx.onMenuShareAppMessage({
            title: data.name, // 分享标题
            desc: data.description, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      })
    },
    methods: {
//      跳转到圈子详情界面
      goCircleDetail (id) {
        this.$router.push({'path': '/circleDetails/' + id})
      },
//      跳转到查看报名人数
      registerInformation () {
        this.$router.push({'path': '/praiseMembers/' + this.activityInfo.activityId})
      },
//      跳转到活动评论界面
      gotoMessage () {
        this.$router.push({'path': '/activityMessage/' + this.topicId})
      },
      showActivityMap () {
        this.$router.push({'path': '/activityMap/' + this.gps})
      },
//      取消报名
      cancelSingnUpActivity () {
        this.axios({
          method: 'post',
          url: '/signOut',
          data: {
            userId: this.$store.state.userId,
            activityId: this.$route.params.aid
          }
        }).then(res => {
          if (res.data.success) {
            this.isSignUp = false
          }
        })
      },
//        获取活动详情
      getActivityInfo (callbackFn) {
        this.axios({
          method: 'get',
          url: '/getActivityInfo',
          params: {
            userId: this.uid,
            activityId: this.$route.params.aid
          }
        }).then(res => {
          this.activityInfo = res.data.data
          this.circleName = res.data.data.coterie.name
          this.isSignUp = res.data.data.isSignUp
          this.userCount = res.data.data.userCount
          this.activityMembers = res.data.data.activityMembers
          this.isOpen = res.data.data.isOpen
          this.allowSignUp = res.data.data.allowSignUp
          this.nickName = res.data.data.organizer.nickName
          this.minCount = res.data.data.userCount.minCount
          this.maxCount = res.data.data.userCount.maxCount
          this.typesTags = res.data.data.tags[0]
          this.tags = res.data.data.tags.splice(1)
          this.isCreator = res.data.data.isCreator
          this.topic = res.data.data.topic
          this.address = res.data.data.address
          this.gps = res.data.data.gps
          this.mobileHref = 'tel:' + res.data.data.organizer.phoneNo
          if (this.topic) {
            this.topicId = res.data.data.topic.topicId
          }
          let pics = res.data.data.pictures
          if (pics) {
            for (var i in pics) {
              this.carouselList.push({url: pics[i]})
            }
          }
          callbackFn(res.data.data)
        }).catch()
      },
//      参加活动
      singnUpActivity () {
        if (this.isCreator) {
          MessageBox.confirm('确定执行此操作?').then(() => {
            this.axios({
              method: 'get',
              url: '/closeActivity',
              params: {
                activityId: this.$route.params.aid
              }
            }).then(res => {
              if (res.data.success) {
                this.$router.push({'path': '/activityLists'})
              }
            }).catch()
          })
        } else {
          this.activityInfo.cover = this.activityInfo.pictures[0]
          this.$store.commit(types.ACTIVITY, this.activityInfo)
          if (!this.isOpen) {
            MessageBox.prompt('当前活动未公开，请输入密码').then(({ value, action }) => {
              this.validPassword(this.activityId, value)
            })
          } else {
            this.$router.push({'path': '/signUpActivity'})
          }
        }
      },
      validPassword (activityId, password) {
        this.axios({
          method: 'get',
          url: 'validActivityPassword',
          params: {
            activityId: activityId,
            password: password
          }
        }).then(res => {
          if (res.data.success) {
            this.$router.push({'path': '/signUpActivity'})
          } else {
            Toast('活动密码错误')
          }
        }).catch()
      },
//      编辑活动信息
      editActivityInfo () {
        if (this.edit === '编辑') {
          this.disabled = false
          this.edit = '完成'
        } else if (this.edit === '完成') {
          if (!(this.minCount >= 1 && this.maxCount >= this.minCount)) {
            Toast('人数填写错误')
            return false
          }
          this.axios({
            method: 'post',
            url: '/updateActivityInfo',
            data: {
              activityId: this.$route.params.aid,
              minCount: this.minCount,
              maxCount: this.maxCount,
              allowSignUp: this.isOpen
            }
          }).then(res => {
            if (res.data.success) {
              this.disabled = true
              this.edit = '编辑'
              Toast('保存成功！')
            } else {
              Toast(res.data.error.message)
            }
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  /*编辑图标*/
  .dinglian-details-editIcon {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #ffd200;
    font-size: 0.14rem;
    width: 0.5rem;
    height: 0.4rem;
    text-align: center;
    opacity: 0.8;
  }
  div {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: left;
  }
  .dinglian-details-all {
    height: auto;
    background: #f2f2f2;
    position: relative;
    padding-bottom: 0.6rem;
  }
  .dinglian-details-all > div {
    background: #ffffff;
  }
  .dinglian-details-title {
    background-color: #ffffff;
    overflow: hidden;
  }
  .dinglian-details-title > p {
    font-size: 0.15rem;
    height: 100%;
    padding-left: 0.15rem;
    float: left;
    background-color: #ffffff;
    color: #333;
    max-width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .dinglian-details-title > span {
    height: 0.15rem;
    line-height: 0.15rem;
    font-size: 0.11rem;
    background: #ffd200;
    border-radius: 0.04rem;
    float: left;
    margin-top: 0.17rem;
    margin-left: 0.1rem;
    max-width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dinglian-details-chat {
    height: 0.65rem;
    padding: 0.1rem 0.15rem;
    margin: 0 auto;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-details-chat >img {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
    float: left;
  }
  .dinglian-details-chatNews {
    height: 100%;
    overflow: hidden;
    padding-left: 0.22rem;
    padding-top: 0.04rem;
  }
  .dinglian-details-chatNewsTop {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 0.14rem;
  }
  .dinglian-details-chatNewsTop > h4 {
    font-size: 0.14rem;
    line-height: 0.14rem;
    font-weight: 400;
  }
  .dinglian-details-chatNewsTop > span {
    font-size: 0.11rem;
    line-height: 0.14rem;
    color: #999999;
  }
  .dinglian-details-chatNews > p {
    margin-top: 0.1rem;
    height: 0.12rem;
    font-size: 0.12rem;
    line-height: 0.12rem;
    color: #999;
  }
  .dinglian-details-status {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.14rem;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .dinglian-details-status >label {
    height: 100%;
    display: inline-block;
    line-height: 0.5rem;
    width: 0.8rem;
    padding-left: 0.15rem;
    color: #999999;
  }
  .dinglian-details-status > p {
    background-color: #ffffff;
    flex: 2;
    font-size: 0.14rem;
    color: #333;
  }
  .dinglian-details-status > span,.dinglian-details-status > a {
    height: 100%;
    width: 0.45rem;
    display: inline-block;
  }
  .dinglian-status > span {
    flex: 2;
  }
  .dinglian-details-sign {
    margin-top: 0.1rem;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.14rem;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .dinglian-details-sign >div label {
    height: 100%;
    display: inline-block;
    line-height: 0.5rem;
    width: 0.8rem;
    padding-left: 0.15rem;
    color: #999999;
  }
  .dinglian-details-sign >div label + span {
    color:#E63832;
  }
  .dinglian-details-activityMembers {
    width:1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dinglian-details-activityMembers > div {
    /*display: flex;*/
    /*flex-flow: row wrap;*/
    width: 0.9rem;
    height:0.25rem;
    /*align-items: center;*/
    overflow: hidden;
  }
  .dinglian-details-activityMembers > div img {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 0.05rem;
    border-radius: 50%;
    float: right;
  }
  .dinglian-details-activityMembers > span {
    padding-right:0.27rem;
    font-size: 0.11rem;
    color: #999;
    background: url("../../assets/images/jtcy.svg") no-repeat 0.32rem center;
    -webkit-background-size: 0.09rem 0.16rem;
    background-size: 0.09rem 0.16rem;
  }
  .dinglian-details-types {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.14rem;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    /*justify-content: space-between;*/
    position: relative;
  }
  .dinglian-details-types >label {
    height: 100%;
    display: inline-block;
    line-height: 0.5rem;
    width: 0.8rem;
    padding-left: 0.15rem;
    color: #999999;
    background-color: #ffffff;
  }
  .dinglian-details-types > input {
    background-color: #ffffff;
  }
  .dinglian-details-types.freeOrAAA input:disabled {
    background: #fff;
    color: #e63832;
  }
  .remarks {
    border-bottom: none;
  }
  .remarks > label {
    color: #333333;
  }
  .dinglian-details-textarea {
    width: 100%;
    height: 1.45rem;
    font-size: 0.12rem;
    /*text-align: left;*/
    padding: 0 0.15rem 0.15rem;
    background-color: #ffffff;
    overflow-y: scroll;
    text-indent: 2em;
    line-height: 0.18rem;
    position: relative;
  }
  .dinglian-details-types.remarks:after {
    position: absolute;
    top: 1.8rem;
    left: 0;
    height: 0.15rem;
    width: 100%;
    display: block;
    content: '';
    background: #fff;
    z-index:99;
  }
  .dinglian-details-textarea:disabled {
    background-color: #ffffff;
  }
  .edit-switch {
    padding-top: 0.09rem;
  }
  .dinglian-details-mobile {
    background: url("../../assets/images/mobile.svg") no-repeat left center;
    padding: 0.1rem;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 0.05rem;
  }
  .dinglian-details-address {
    background: url("../../assets/images/address.svg") no-repeat left center;
    padding: 0.1rem;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 0.05rem;

  }
  .dinglian-details-tags {
    /*width: 100%;*/
    display: flex;
    flex-flow: row nowrap;
    line-height: 0.5rem;
    align-items: center;
  }
  .dinglian-details-tags > li {
    font-size: 0.11rem;
    height: 0.18rem;
    background-color: #f2f2f2;
    color: #333;
    line-height: 0.14rem;
    margin-right: 0.1rem;
    border-radius: 0.03rem;
    padding: 0.02rem;
  }
  .dinglian-details-time > span:first-of-type {
    flex: 2;
  }
  .dinglian-edit-people {
    font-size: 0.14rem;
    align-items: center;
  }
  .dinglian-edit-people > input {
    width: 0.78rem;
    height: 0.3rem;
    border: 1px solid #dddddd;
    border-radius: 0.4rem;
    padding-left: 0.1rem;
    background-color: #fff;
    outline: none;
  }
  .dinglian-edit-people > input:disabled {
    background: #fff;
  }
  .dinglian-details-psd {
    justify-content: space-between;
  }
  .dinglian-details-psd > span {
    flex: 2;
  }

</style>
