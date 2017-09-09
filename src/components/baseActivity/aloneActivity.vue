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
          <div class="dinglian-lists-cost">{{activity.charge}}</div>
          <div class="dinglian-lists-people clearfix">
            <span v-if="activity.status === '1'"><em class="dinglian-lists-status"></em>进行中</span>
            <span v-else-if="activity.status === '2'"><em class="dinglian-lists-status"></em>正在报名</span>
            <span v-else><em class="dinglian-lists-status"></em>已结束</span>
            <span> <i>{{activity.userCount.currentCount}}</i> /{{activity.userCount.minCount}}~{{activity.userCount.maxCount}}人</span>
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
    height: 140px;
    border-bottom: 1px solid #dddddd;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 31%;
    padding: 15px 0;
    padding-left: 15px;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    width: 69%;
    height: 100%;
    padding-top: 14px;
    padding-left: 13px;
    padding-right: 18px;
  }
  .dinglian-lists-title {

  }
  .dinglian-lists-title > h3 {
    font-size: 14px;
    text-align: left;
    height: 15px;
    line-height: 15px;
    float: left;
  }
  .dinglian-lists-title > span {
    float: right;
    font-size: 11px;
    background: #ffd200;
    border-radius: 4px;
    padding: 0 3px;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 18px;
    line-height: 18px;
    margin-top: 7px;

  }
  .dinglian-lists-tags > span {
    display: inline-block;
    float: left;
    border-radius: 4px;
    background: #f2f2f2;
    margin-right: 7px;
    padding: 2px;
  }
  .dinglian-lists-cost {
    color: #e63832;
    font-size: 14px;
    text-align: left;
    margin-top: 9px;
  }
  .dinglian-lists-people {
    margin-top: 10px;
    text-align: left;
    font-size: 11px;
  }
  .dinglian-lists-people span:first-child {
    float: left;
  }
  .dinglian-lists-people span:last-child {
    float: right;
  }
  .dinglian-lists-address {
    margin-top: 9px;
  }
  /*底部点赞*/
  .dinglian-lists-footer {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #dddddd;
    text-align: left;
  }
  .dinglian-lists-footer span {
    font-size: 11px;
    color: #999999;
    display: inline-block;
    height: 100%;
    float: left;
  }
  .dinglian-lists-footer span:first-of-type {
    margin-left: 41px;
    background: url("../../assets/images/comment.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  /*.dinglian-lists-footer span:last-of-type {*/
    /*margin-left: 75px;*/
    /*background: url("../../assets/images/like.svg") no-repeat left center;*/
    /*background-size: 14px 14px;*/
    /*padding-left: 19px;*/
  /*}*/
  .dinglian-lists-footer-like {
    margin-left: 75px;
    background: url("../../assets/images/like.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  .dinglian-lists-footer .dinglian-lists-footer-likeActive {
    margin-left: 75px;
    background: url("../../assets/images/likeActive.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  /*状态点*/
  .dinglian-lists-status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #ffd200;
    margin-right: 5px;
  }
</style>
