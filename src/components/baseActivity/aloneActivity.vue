<template>
  <div style="background: #ffffff">
      <div class="clearfix dinglian-lists-con">
        <div class="dinglian-lists-con-left">
          <img :src="activity.cover" alt="" @click="redirectActivityDetails(activity.activityId)">
        </div>
        <div class="dinglian-lists-con-right">
          <div class="dinglian-lists-title clearfix">
            <h3>{{activity.name}}</h3>
            <span class="dinglian-lists-circleTag" @click="redirectActivityDetails(activity.coterie.id)">{{activity.coterie.name}}</span>
          </div>
          <div class="dinglian-lists-tags clearfix">
            <span class="fs_11" :key="tagName" v-for="tagName of activity.tags">{{tagName.name}}</span>
          </div>
          <div class="dinglian-lists-cost">
            <span v-if="activity.charge === 'free'">免费</span>
            <span v-else>AA制</span>
          </div>
          <div class="dinglian-lists-people clearfix">
            <span v-if="activity.status === '1'"><em class="dinglian-lists-status-processing"></em>进行中</span>
            <span v-else-if="activity.status === '2'"><em class="dinglian-lists-status-IsRegistering"></em>正在报名</span>
            <span v-else><em class="dinglian-lists-status-over"></em>已结束</span>
            <span> <i>{{activity.userCount.currentCount}}</i>/{{activity.userCount.minCount}}~{{activity.userCount.maxCount}}人</span>
          </div>
          <div class="dinglian-lists-people dinglian-lists-address clearfix">
            <span>{{activity.address}}</span>
            <span v-show="activity.distance">5.6km</span>
          </div>
        </div>
      </div>
    <div class="dinglian-lists-footer clearfix" v-show="footer">
      <span>{{topic.commentCnt}}</span>
      <span @click="praiseTopic(topic)" :class="['dinglian-lists-footer-like', {'dinglian-lists-footer-likeActive': topic.hasPraise}]">
        {{topic.praiseCnt}}
      </span>
    </div>
  </div>
</template>
<script>
//  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  export default {
    name: 'AloneActivity',
    props: {
      footer: {
        type: Boolean
      },
      activity: {
        type: Object
      }
    },
    data () {
      return {
        topic: {
          topicId: '',
          hasPraise: '',
          praiseCnt: '',
          commentCnt: ''
        }
      }
    },
    created () {
      this.topic.topicId = this.activity.topicId
      this.topic.hasPraise = this.activity.hasPraise
      this.topic.praiseCnt = this.activity.praiseCnt
      this.topic.commentCnt = this.activity.commentCnt
    },
    methods: {
      redirectActivityDetails (id) {
//        this.$store.commit(types.ACTIVITYID, id)
        this.$router.push({'path': '/activityDetails/' + id})
      },
      praiseTopic (topic) {
        // 话题点赞，如果该话题hasPraise=true,则不能点赞，点赞图标变红
        if (!topic.hasPraise) {
          this.axios({
            method: 'get',
            url: 'praiseTopic',
            params: {
              userId: this.$store.state.userId,
              topicId: topic.topicId
            }
          }).then(res => {
            if (!res.data.success) {
              Toast(res.data.error.message)
            } else {
              topic.hasPraise = true
              topic.praiseCnt = res.data.data.praiseCnt
            }
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-lists-con {
    height: 1.4rem;
    border-bottom: 1px solid #dddddd;
    padding: 0.15rem;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 0.9rem;
    height: 1.1rem;
    overflow: hidden;
    margin-right: 0.12rem;
    /*padding: 0.15rem 0;*/
    /*padding-left: 0.15rem;*/
  }
  .dinglian-lists-con-left > img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    width: 69%;
    height: 1.1rem;
    overflow: hidden;
    /*padding-top: 0.15rem;*/
    /*padding-left: 0.13rem;*/
    /*padding-right: 0.18rem;*/
  }
  .dinglian-lists-title {

  }
  .dinglian-lists-title > h3 {
    font-size: 0.14rem;
    text-align: left;
    height: 0.15rem;
    line-height: 0.15rem;
    float: left;
    font-family: 'PingFangSc';
    font-weight: 400;
    width: 1.58rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dinglian-lists-title > span {
    float: right;
    font-size: 0.11rem;
    background: #ffd200;
    border-radius: 0.04rem;
    padding: 0 0.03rem;
    width: 0.78rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 0.18rem;
    line-height: 0.18rem;
    margin-top: 0.02rem;

  }
  .dinglian-lists-tags > span {
    display: inline-block;
    float: left;
    border-radius: 0.04rem;
    background: #f2f2f2;
    margin-right: 0.07rem;
    padding: 0.02rem;
  }
  .dinglian-lists-cost {
    color: #e63832;
    font-size: 0.14rem;
    text-align: left;
    margin-top: 0.09rem;
  }
  .dinglian-lists-people {
    margin-top: 0.1rem;
    text-align: left;
    font-size: 0.11rem;
  }
  .dinglian-lists-people span:first-child {
    float: left;
  }
  .dinglian-lists-people span:last-child {
    float: right;
  }
  .dinglian-lists-people span:last-child i {
    color: red;
    font-style: normal;
  }
  .dinglian-lists-address {
    margin-top: 0.02rem;
  }
  .dinglian-lists-address > span {
    color: #999;
    font-size: 0.11rem;
  }
  /*底部点赞*/
  .dinglian-lists-footer {
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    border-bottom: 1px solid #dddddd;
    text-align: left;
  }
  .dinglian-lists-footer span {
    font-size: 0.11rem;
    color: #999999;
    display: inline-block;
    height: 100%;
    float: left;
  }
  .dinglian-lists-footer span:first-of-type {
    margin-left: 0.22rem;
    background: url("../../assets/images/comment.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.19rem;
  }
  /*.dinglian-lists-footer span:last-of-type {*/
    /*margin-left: 75px;*/
    /*background: url("../../assets/images/like.svg") no-repeat left center;*/
    /*background-size: 14px 14px;*/
    /*padding-left: 19px;*/
  /*}*/
  .dinglian-lists-footer-like {
    margin-left: 0.6rem;
    background: url("../../assets/images/like.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.19rem;
  }
  .dinglian-lists-footer .dinglian-lists-footer-likeActive {
    margin-left: 0.75rem;
    background: url("../../assets/images/likeActive.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.19rem;
  }
  /*状态点*/
  .dinglian-lists-status {
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    border-radius: 50%;
    background: #ffd200;
    margin-right: 0.05rem;
  }
  em[class^='dinglian-lists-status'] {
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    border-radius: 50%;
    margin-right: 0.05rem;
  }
  /*进行中*/
  .dinglian-lists-status-processing {
    background: #5dcf58;
  }
  /*报名中*/
  .dinglian-lists-status-IsRegistering {
    background: #2f8efa;
  }
  /*已结束*/
  .dinglian-lists-status-over {
    background: #ffd200;
  }
</style>
