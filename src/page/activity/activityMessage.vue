<template>
  <div class="dinglian-message-whole">
    <div class="dinglian-message-header">
      <div class="dinglian-message-avatar">
        <img src="../../assets/images/circle.jpg" alt="">
        <div class="dinglian-message-title">
          <h3>{{messageLists.user.nickName}}</h3>
          <span></span>
        </div>
        <span>{{messageLists.topicCreateTime | moment}}</span>
      </div>
      <!--<p>快来报名呀，一起触发</p>-->
    </div>

    <alone-activity :footer="true" :activity="activity"></alone-activity>

    <div class="dinglian-message-comment">
      <div class="dinglian-message-comment-order">
        <span>共有{{messageLists.praiseCnt}}人点过赞</span>
        <ul>
          <li v-for="item in messageLists.praise">
            {{item.nickName}}
          </li>
          <li>more > </li>
        </ul>
      </div>
      <div class="dinglian-message-comment-tit">全部评论</div>
      <div class="dinglian-message-avatar" v-for="topics in topicCommentList">
        <img src="../../assets/images/circle.jpg" alt="">
        <div class="dinglian-message-title">
          <h3>{{topics.user.nickName}}</h3>
          <span>{{topics.comment}}</span>
        </div>
        <span>{{topics.commentTime | moment}}</span>
      </div>
      <!--<div class="dinglian-message-avatar">-->
        <!--<img src="../../assets/images/circle.jpg" alt="">-->
        <!--<div class="dinglian-message-title">-->
          <!--<h3>街舞</h3>-->
          <!--<span>g广东 深证</span>-->
        <!--</div>-->
        <!--<span> 10-19 10:10</span>-->
      <!--</div>-->

    </div>
    <div class="dinglian-message-chat">
      <input type="text" v-model="description">
      <span class="dinglian-message-chat-button" @click="createActivityTopic">发送</span>
    </div>
  </div>
</template>
<script>
  import AloneActivity from '../../components/baseActivity/aloneActivity.vue'
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
      AloneActivity
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
        description: ''
      }
    },
    methods: {
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
            topicId: this.$route.params.id
          }
        }).then(res => {
          this.messageLists = res.data.data
          this.activity = res.data.data.activity
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
    /*height: 0.9rem;*/
  }
  .dinglian-message-header > p {
    font-size: 13px;
    margin: 6px 0;
    text-align: left;
    padding-left: 15px;
  }
  .dinglian-message-avatar {
    height: 0.63rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 11px;
    padding: 15px;
  }
  .dinglian-message-avatar > img {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
  }
  .dinglian-message-avatar > span {
    display: inline-block;
    color: #999999;
  }

  .dinglian-message-title {
    flex: 2;
    text-align: left;
  }
  .dinglian-message-title > h3 {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    padding-left: 8px;
  }
  .dinglian-message-title > span {
    display: inline-block;
    padding-left: 8px;
    color: #999999;
  }
  .dinglian-message-comment {
    background: #ffffff;
    margin-top: 10px;
  }
  .dinglian-message-comment > div {
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-message-comment-tit {
    font-size: 14px;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: left;
    padding-left: 15px;
  }
  .dinglian-message-comment-order {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 11px;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 15px;
    color: #999999;
  }
  .dinglian-message-comment-order > ul {
    display: flex;
    flex-flow: row nowrap;
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
    padding: 0.08rem 15px;
  }
  .dinglian-message-chat > input {
    height: 0.34rem;
    line-height: 0.34rem;
    border: 1px solid #dddddd;
    width: 2.83rem;
    border-radius: 4px;
    padding-left: 5px;
  }
  .dinglian-message-chat-button {
    display: inline-block;
    width: 0.47rem;
    height: 0.34rem;
    line-height: 0.34rem;
    background: #ffd200;
    border: none;
    border-radius: 4px;
    font-size: 15px;
  }
  .dinglian-message-chat-button:active {
    background: #f2f2f2;
  }
</style>
