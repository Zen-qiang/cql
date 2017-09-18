<template>
  <div class="dinglian-message-whole bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <div class="dinglian-message-header">
      <div class="dinglian-message-avatar">
        <div>
          <div><img :src="messageLists.user.picture" alt=""></div>
          <div class="dinglian-message-title">
            <h3>{{messageLists.user.nickName}}</h3>
            <p>223</p>
          </div>
        </div>
        <span>{{messageLists.topicCreateTime | moment}}</span>
      </div>
      <!--<p>快来报名呀，一起触发</p>-->
    </div>

    <alone-activity :footer="true" :activity="activity"></alone-activity>

    <div class="dinglian-message-comment">
      <div class="dinglian-message-comment-order">
        <span>共有{{messageLists.praiseCnt}}人点过赞</span>
        <div @click="goPointList(messageLists.praiseCnt)">
          <ul>
            <li v-for="item in messageLists.praise">
              <img :src="item.picture">
            </li>
          </ul>
          <p class="dinglian-message-comment-order-more">more</p>
        </div>
      </div>
      <div class="dinglian-message-comment-tit">全部评论</div>
      <div class="dinglian-message-avatar-comment" v-for="topics in topicCommentList">
        <div>
          <div><img :src="topics.user.picture" alt=""></div>
          <div class="dinglian-message-title">
            <h3>{{topics.user.nickName}}</h3>
            <p>{{topics.comment}}</p>
          </div>
        </div>
        <span>{{topics.commentTime | moment}}</span>
      </div>
    </div>
    <div class="dinglian-message-chat">
      <input type="text" v-model="description">
      <span class="dinglian-message-chat-button" @click="createActivityTopic">发送</span>
    </div>
  </div>
</template>
<script>
  import AloneActivity from '../../components/baseActivity/aloneActivity.vue'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  import {Toast} from 'mint-ui'
  moment.locale('zh-cn')
  export default {
    filters: {
      moment (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    components: {
      AloneActivity,
      DingLianHeader
    },
    created () {
      this.getActivityTopic()
      this.getTopicCommentList()
    },
    data () {
      return {
        activity: {},
        messageLists: '',
        topicCommentList: '',
        description: '',
        topic: '',
        headerName: '活动评论'
      }
    },
    methods: {
//      跳转到点赞列表
      goPointList (num) {
        if (num > 0) {
          this.$router.push({'path': '/pointList/' + this.$route.params.id})
        }
      },
//        发送评论
      createActivityTopic () {
        this.axios({
          method: 'post',
          url: '/commentTopic',
          data: {
            userId: this.$store.state.userId,
            topicId: this.$route.params.id,
            comment: this.description
          }
        }).then(res => {
          if (res.data.success) {
            this.topicCommentList = []
            this.getTopicCommentList()
            Toast('评论成功！')
            this.description = ''
          } else {
            Toast(res.data.error.message)
          }
        })
      },
      getActivityTopic () {
        this.axios({
          method: 'get',
          url: '/getActivityTopic',
          params: {
            userId: this.$store.state.userId,
            topicId: this.$route.params.id
          }
        }).then(res => {
          this.messageLists = res.data.data
          this.activity = res.data.data.activity
          this.activity.topicId = res.data.data.topicId
          this.activity.hasPraise = res.data.data.hasPraise
          this.activity.praiseCnt = res.data.data.praiseCnt
          this.activity.commentCnt = res.data.data.commentCnt
        }).catch()
      },
//      获取评论列表
      getTopicCommentList () {
        this.axios({
          method: 'get',
          url: '/getTopicCommentList',
          params: {
            topicId: this.$route.params.id
          }
        }).then(res => {
          this.topicCommentList = res.data.data
        }).catch()
      }
    }
  }
</script>
<style scoped>
  .dinglian-message-whole {
    background: #f2f2f2;
    height: 100%;
  }
  .dinglian-message-header {
    background: #ffffff;
    padding: 0.15rem;
  }
  .dinglian-message-avatar {
    height: 0.44rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .dinglian-message-avatar > div {
    overflow: hidden;
  }
  .dinglian-message-avatar > div > div {
    float: left;
    margin-right: 0.08rem;
  }
  .dinglian-message-avatar > div > div:nth-of-type(1) {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    border: 1px solid #999;
    position: relative;
    overflow: hidden;
  }
  .dinglian-message-avatar > div > div:nth-of-type(1) img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0.36rem;
    height: 0.36rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .dinglian-message-avatar > div > .dinglian-message-title {
    text-align: left;
    padding: 0.02rem 0;
  }
  .dinglian-message-avatar > div > .dinglian-message-title h3 {
    font-size: 0.14rem;
    font-family: "PingFangSc";
    color: #333;
    font-weight: 400;
    /*line-height: 0.14rem;*/
    /*margin-bottom: 0.06rem;*/
  }
  .dinglian-message-avatar > div > .dinglian-message-title p {
    font-size: 0.11rem;
    color: #999;
    /*line-height: 0.11rem;*/
  }
  .dinglian-message-avatar > span {
    font-size: 0.11rem;
    color: #999;
  }
  .dinglian-message-comment {
    background: #ffffff;
    margin-top: 0.1rem;
  }
  .dinglian-message-comment > div {
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-message-comment-tit {
    font-size: 0.14rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: left;
    padding-left: 0.15rem;
  }
  .dinglian-message-comment-order {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 0.11rem;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.15rem;
    color: #999999;
  }
  .dinglian-message-comment-order > div {
    /*display: flex;*/
    /*flex-flow: row nowrap;*/
    /*align-items: center;*/
    overflow: hidden;
    position: relative;
    width: 1.45rem;
    padding-right: 0.55rem;
  }
  .dinglian-message-comment-order > div > p.dinglian-message-comment-order-more {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff url("../../assets/images/jtcy.svg") no-repeat right center;
    -webkit-background-size: 0.08rem;
    background-size: 0.08rem;
    width: 0.55rem;
    padding-left:0.1rem;
    text-align: left;
  }
  .dinglian-message-comment-order > div > ul {
    overflow: hidden;
    float: right;
  }
  .dinglian-message-comment-order > div > ul > li {
    margin-right: 0.05rem;
    float: left;
  }
  .dinglian-message-comment-order > div > ul > li img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
  }
  .dinglian-message-chat {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0.08rem 0.15rem;
  }
  .dinglian-message-chat > input {
    height: 0.34rem;
    line-height: 0.34rem;
    border: 1px solid #dddddd;
    width: 2.83rem;
    border-radius: 0.04rem;
    padding-left: 0.05rem;
  }
  .dinglian-message-chat-button {
    display: inline-block;
    width: 0.47rem;
    height: 0.34rem;
    line-height: 0.34rem;
    background: #ffd200;
    border: none;
    border-radius: 0.04rem;
    font-size: 0.15rem;
  }
  .dinglian-message-chat-button:active {
    background: #f2f2f2;
  }
  .dinglian-message-avatar-comment {
    height: 0.65rem;
    padding: 0.1rem 0.15rem;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .dinglian-message-avatar-comment > div {
    overflow: hidden;
  }
  .dinglian-message-avatar-comment > div > div {
    float: left;
    margin-right: 0.08rem;
  }
  .dinglian-message-avatar-comment > div > div:nth-of-type(1) {
    height: 0.44rem;
    width: 0.44rem;
    border: 1px solid #999;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    position: relative;
  }
  .dinglian-message-avatar-comment > div > div:nth-of-type(1) img {
    width: 0.36rem;
    height: 0.36rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
  .dinglian-message-avatar-comment > div > .dinglian-message-title {
    text-align: left;
    padding: 0.02rem 0;
  }
  .dinglian-message-avatar-comment > div > .dinglian-message-title > h3 {
    font-size: 0.14rem;
    color: #999;
    font-family: 'PingFangSc';
    font-weight: 400;
  }
  .dinglian-message-avatar-comment > div > .dinglian-message-title > p {
    font-size: 0.12rem;
    color: #333;
  }
  .dinglian-message-avatar-comment > span {
    font-size: 0.11rem;
    color: #999;
  }
</style>
