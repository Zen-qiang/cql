<template>
  <div class="dinglian-details-all">
    <carousel :carouselList="carouselList"></carousel>
    <div class="dinglian-details-title clearfix">
      <input type="text" v-model="activityInfo.name">
      <span>金桥街舞1圈</span>
    </div>
    <div class="dinglian-details-chat clearfix">
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
      <mt-switch v-model="isOpen" class="edit-switch"></mt-switch>
    </div>
    <div class="dinglian-details-status">
      <label for="">组织者</label>
      <input type="text" v-model="nickName" disabled>
      <span class="dinglian-details-mobile"></span>
    </div>
    <div class="dinglian-details-status dinglian-details-time">
      <label for="">时间</label>
      <!--<input type="text" v-model="time">-->
      <span>{{activityInfo.startTime | moment}}</span>
      <span></span>
    </div>
    <div class="dinglian-details-status">
      <label for="">地址</label>
      <input type="text" v-model="address" disabled>
      <span class="dinglian-details-address"></span>
    </div>

    <div class="dinglian-details-sign">
      <label for="">报名信息</label>
      <span></span>
      <div></div>
    </div>
    <div class="dinglian-edit-people dinglian-details-types">
      <label for="">人数</label>
      <input type="tel" v-model="minCount">&nbsp;至
      <input type="tel"v-model="maxCount">&nbsp;人
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
      <input type="text" v-model="activityInfo.charge" style="color: red" disabled>
    </div>
    <div class="dinglian-details-types">
      <label for="">报名权限</label>
      <!--<input type="text" v-model="isOpen" disabled>-->
     <span>{{isOpen ? '公开':'非公开' }}</span>
    </div>
    <div class="dinglian-details-types remarks">
      <label for="">活动备注</label>
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-details-textarea">
      {{activityInfo.description}}
    </textarea>
    <mt-button type="default" style="margin-top: 10px" class="dinglian-button" @click.native="singnUpActivity">{{isCreator ? '取消活动' : '参加活动'}}</mt-button>
  </div>
</template>
<script>
  import Carousel from '../../components/carousel.vue'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
//  import { Toast } from 'mint-ui'
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
        carouselList: [{
          imageUrl: require('../../assets/images/carousel0.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel1.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel2.jpg')
        }],
        address: '漕宝路112号',
        types: '羽毛球',
        activityInfo: '',
        isOpen: '',
        status: '',
        nickName: '',
        topic: '',
        typesTags: '',
        isCreator: '',
        minCount: '',
        maxCount: '',
        tags: [],
        signActivity: ''
      }
    },
    created () {
      console.log(11)
      this.getActivityInfo()
    },
    watch: {
    },
    methods: {
//        获取活动详情
      getActivityInfo () {
        this.axios({
          method: 'get',
          url: '/getActivityInfo',
          params: {
            userId: this.$store.state.userId,
            activityId: this.$store.state.activityId
          }
        }).then(res => {
          this.activityInfo = res.data.data
          this.isOpen = res.data.data.isOpen
          this.topic = res.data.data.topic
          this.nickName = res.data.data.organizer.nickName
          this.minCount = res.data.data.userCount.minCount
          this.maxCount = res.data.data.userCount.maxCount
          this.typesTags = res.data.data.tags[0]
          this.tags = res.data.data.tags.splice(1)
          this.isCreator = res.data.data.isCreator
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
          this.axios({
            method: 'post',
            url: '/signUp',
            data: {
              userId: this.$store.state.userId,
              activityId: this.$store.state.activityId,
              gender: '1',
              isEditSignUp: false
            }
          }).then(res => {
            if (res.data.success) {
              this.$router.push({'path': '/signUpActivity'})
            }
            console.log(res)
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  div {
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .dinglian-details-all {
    height: 100%;
    background: #f2f2f2;
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
    flex: 2;
  }
  .dinglian-details-status > span {
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
  }
  .dinglian-details-sign > label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
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
  }

</style>
