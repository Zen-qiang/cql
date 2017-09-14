<template>
  <mt-loadmore :bottom-method="loadBottom"
               :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
               :distanceIndex="1"
               ref="loadmore">
  <div class="dinglian-lists-whole">
    <ul class="dinglian-lists-ul">
      <li :key="item.topicId" v-for="item of topicList" @click="redirectActivityInfo(item.activity.activityId)">
        <div class="clearfix dinglian-lists-con">
          <div class="dinglian-lists-con-left">
            <img :src="item.activity.cover" alt="">
          </div>
          <div class="dinglian-lists-con-right">
            <div class="dinglian-lists-title clearfix">
              <h3 @click="redirectActivityInfo(item.activity.activityId)">{{item.activity.name}}</h3>
              <span class="dinglian-lists-circleTag">{{item.activity.coterie.name}}</span>
            </div>
            <div class="dinglian-lists-tags clearfix" @click="redirectActivityInfo(item.activity.activityId)">
              <span class="fs_11" :key="tag" v-for="tag of item.activity.tags">{{tag}}</span>
            </div>
            <div class="dinglian-lists-cost" @click="redirectActivityInfo(item.activity.activityId)">
              <span v-if="item.activity.charge === 'free'">免费</span>
              <span v-else>AA制</span>
            </div>
            <div class="dinglian-lists-people clearfix" @click="redirectActivityInfo(item.activity.activityId)">
              <span v-if="item.activity.status === '1'"><em class="dinglian-lists-status-processing"></em>进行中</span>
              <span v-else-if="item.activity.status === '2'"><em class="dinglian-lists-status-IsRegistering"></em>正在报名</span>
              <span v-else><em class="dinglian-lists-status-over"></em>已结束</span>
              <span> <i>{{item.activity.userCount.currentCount}}</i> /{{item.activity.userCount.minCount}}~{{item.activity.userCount.maxCount}}人</span>
            </div>
            <div class="dinglian-lists-people dinglian-lists-address clearfix">
              <span>{{item.activity.address}}</span>
              <span>5.6km</span>
            </div>
          </div>
        </div>

        <div class="dinglian-lists-footer clearfix">
          <span>{{item.commentCnt}}</span>
          <span @click="praiseTopic(item)" :class="['dinglian-lists-footer-like', {'dinglian-lists-footer-likeActive': item.hasPraise}]">{{item.praiseCnt}}</span>
        </div>
      </li>
    </ul>
  </div>
  </mt-loadmore>

</template>
<script>
//  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  export default {
    name: 'CircleEvents',
    data () {
      return {
        autoLill: false
      }
    },
    props: ['topicList', 'allLoaded'],
    methods: {
//      上拉加载
      loadBottom () {
        console.log('加载')
        this.$emit('pullUpEvents')
        this.$refs.loadmore.onBottomLoaded()
      },
      redirectActivityInfo (activityId) {
        // 跳转到活动详情
//        this.$store.commit(types.ACTIVITYID, activityId)
        this.$router.push({'path': '/activityDetails/' + activityId})
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
              topic.praiseCnt++
            }
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-lists-whole {
    padding-top: 2px;
  }
  .dinglian-lists-ul {
    background: #f2f2f2;
    padding: 10px 0;
  }
  .dinglian-lists-ul > li {
    margin-bottom: 10px;
    background: #ffffff;
  }
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
