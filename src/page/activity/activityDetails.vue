<template>
  <div class="dinglian-details-all">
    <span class="dinglian-details-editIcon" @click.stop="editActivityInfo"  v-show="isCreator">
      {{edit}}
    </span>
    <carousel :carouselList="carouselList"></carousel>
    <div class="dinglian-details-title clearfix">
      <input type="text" v-model="activityInfo.name">
      <span>金桥街舞1圈</span>
    </div>
    <div class="dinglian-details-chat clearfix" @click="gotoMessage">
      <img src="../../assets/images/circle.jpg" alt="">
      <div class="dinglian-details-chatNews">
        <div class="dinglian-details-chatNewsTop">
          <h4>留言板</h4>
          <span>{{topic.lastCommentTime | moment}}</span>
        </div>
        <p>[{{topic.commentCount}}条] {{topic.lastComment}}</p>
      </div>
    </div>
    <div class="dinglian-details-status dinglian-status">
      <label for="">状态</label>
      <span v-if="activityInfo.status === '1'">进行中</span>
      <span v-else-if="activityInfo.status === '2'">正在报名</span>
      <span v-else>已结束</span>
      <mt-switch v-model="allowSignUp" class="edit-switch" v-show="isCreator" @change="preventSwitch"></mt-switch>
    </div>
    <div class="dinglian-details-status">
      <label for="">组织者</label>
      <input type="text" v-model="nickName" disabled>
      <a :href="mobileHref" class="dinglian-details-mobile"></a>
      <!--<span class="dinglian-details-mobile"></span>-->
    </div>
    <div class="dinglian-details-status dinglian-details-time">
      <label for="">时间</label>
      <span>{{activityInfo.startTime | moment}}</span>
      <span></span>
    </div>
    <div class="dinglian-details-status">
      <label for="">地址</label>
      <input type="text" v-model="address" disabled>
      <span class="dinglian-details-address"></span>
    </div>

    <div class="dinglian-details-sign" @click="registerInformation">
      <label for="">报名信息</label>
      <span class="dinglian-details-activityMembers">
        <img :src="item.picture" alt="" v-for="item in activityMembers">
      </span>
      <div></div>
    </div>
    <div class="dinglian-edit-people dinglian-details-types">
      <label for="">人数</label>
      <input type="tel" v-model="minCount" :disabled="disabled">&nbsp;至
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
    <div class="dinglian-details-types">
      <label for="">费用</label>
      <input type="text" v-if="activityInfo.charge === 'free'" value="免费" style="color: red" disabled>
      <input type="text" v-else value="AA制" style="color: red" disabled>
    </div>
    <div class="dinglian-details-types dinglian-details-psd">
      <label for="">密码权限</label>
      <!--<input type="text" v-model="isOpen" disabled>-->
      <span>{{isOpen ? '公开':'非公开' }}</span>
      <mt-switch v-model="isOpen" class="edit-switch" v-show="isCreator" @change="preventSwitch"></mt-switch>
      <!--<mt-switch v-model="isOpen" class="edit-switch" @change="preventSwitch" ></mt-switch>-->
    </div>
    <div class="dinglian-details-types" v-show="!isOpen && isCreator">
      <label for="">输入密码</label>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="dinglian-details-types remarks">
      <label for="">活动备注</label>
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-details-textarea" :disabled="disabled">
      {{activityInfo.description}}
    </textarea>
    <mt-button v-if="isCreator" type="default" style="margin-top: 10px" class="dinglian-button" @click.native="singnUpActivity">取消活动</mt-button>
    <mt-button v-else v-show="allowSignUp" type="default" style="margin-top: 10px" class="dinglian-button" @click.native="singnUpActivity">参加活动</mt-button>
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
        address: '漕宝路112号',
        types: '羽毛球',
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
        mobileHref: 'tel:' + this.$store.state.userPhoneNo
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
//      跳转到查看报名人数
      registerInformation () {
        this.$router.push({'path': '/praiseMembers/' + this.activityInfo.activityId})
      },
      preventSwitch () {
        if (this.edit === '编辑') {
          Toast('请点击右上方的编辑按钮')
        }
      },
//      跳转到活动评论界面
      gotoMessage () {
        this.$router.push({'path': '/activityMessage/' + this.topicId})
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
          this.axios({
            method: 'get',
            url: '/closeActivity',
            params: {
              activityId: this.$store.state.activityId
            }
          }).then(res => {
            if (res.data.success) {
              this.$router.push({'path': '/activityLists'})
            }
            console.log(res)
          }).catch()
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
    font-size: 14px;
    width: 50px;
    height: 40px;
    text-align: center;
    opacity: 0.8;
  }
  div {
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .dinglian-details-all {
    height: 100%;
    background: #f2f2f2;
    position: relative;
  }
  .dinglian-details-all > div {
    background: #ffffff;
  }
  .dinglian-details-title {

  }
  .dinglian-details-title > input {
    font-size: 14px;
    height: 100%;
    padding-left: 15px;
    float: left;
  }
  .dinglian-details-title > span {
    height: 15px;
    line-height: 15px;
    font-size: 11px;
    background: #ffd200;
    border-radius: 4px;
    float: left;
    margin-top: 18px;
  }
  .dinglian-details-chat {
    height: 65px;
    padding: 10px 15px;
    margin: 0 auto;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-details-chat >img {
    display: inline-block;
    width: 45px;
    height: 45px;
    float: left;
  }
  .dinglian-details-chatNews {
    height: 100%;
    overflow: hidden;
    padding-left: 22px;
  }
  .dinglian-details-chatNewsTop {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 14px;
  }
  .dinglian-details-chatNewsTop > h4 {
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
  }
  .dinglian-details-chatNewsTop > span {
    font-size: 11px;
    line-height: 14px;
    color: #999999;
  }
  .dinglian-details-chatNews > p {
    margin-top: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
  .dinglian-details-status {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .dinglian-details-status >label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
  }
  .dinglian-details-status > input {
    background-color: #ffffff;
    flex: 2;
  }
  .dinglian-details-status > span,.dinglian-details-status > a {
    height: 100%;
    width: 45px;
    display: inline-block;
  }
  .dinglian-status > span {
    flex: 2;
  }
  .dinglian-details-sign {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-flow: row nowrap;
  }
  .dinglian-details-sign > label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
  }
  .dinglian-details-activityMembers {
    display: flex;
    flex-flow: row nowrap;
  }
  .dinglian-details-activityMembers > img {
    display: block;
    width: 10px;
    height: 10px;
  }
  .dinglian-details-types {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    /*justify-content: space-between;*/
  }
  .dinglian-details-types >label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
    background-color: #ffffff;
  }
  .dinglian-details-types > input {
    background-color: #ffffff;
  }
  .remarks {
    border-bottom: none;
  }
  .remarks > label {
    color: #333333;
  }
  .dinglian-details-textarea {
    width: 100%;
    font-size: 12px;
    text-align: left;
    padding: 15px;
    padding-top: 0;
    background-color: #ffffff;
  }

  .edit-switch {
    padding-top: 9px;
  }
  .dinglian-details-mobile {
    background: url("../../assets/images/mobile.svg") no-repeat left center;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 5px;
  }
  .dinglian-details-address {
    background: url("../../assets/images/address.svg") no-repeat left center;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 5px;

  }
  .dinglian-details-tags {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    line-height: 50px;
    align-items: center;
  }
  .dinglian-details-tags > li {
    font-size: 11px;
    height: 18px;
    background-color: #999999;
    line-height: 14px;
    margin-right: 10px;
    border-radius: 3px;
    padding: 2px;
  }
  .dinglian-details-time > span:first-of-type {
    flex: 2;
  }
  .dinglian-edit-people {
    font-size: 14px;
    align-items: center;
  }
  .dinglian-edit-people > input {
    width: 78px;
    height: 30px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 10px;
    background-color: #ffffff;
  }
  .dinglian-details-psd {
    justify-content: space-between;
  }
  .dinglian-details-psd > span {
    flex: 2;
  }

</style>
