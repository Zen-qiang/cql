<template>
  <mt-loadmore :bottom-method="loadBottom"
               :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
               :distanceIndex="2" :maxDistance="maxDistance"
               ref="loadmore">
  <div class="dinglian-lists-whole">
    <ul class="dinglian-lists-ul">
      <li :key="item.topicId" v-for="item of topicList">
        <div class="clearfix dinglian-lists-con" @click="redirectActivityInfo(item.activity.activityId)">
          <div class="dinglian-lists-con-left">
            <img :src="item.activity.cover" alt="">
          </div>
          <div class="dinglian-lists-con-right">
            <div class="dinglian-lists-title clearfix">
              <h3 @click="redirectActivityInfo(item.activity.activityId)">{{item.activity.name}}</h3>
              <span class="dinglian-lists-circleTag" @click.stop="goCircleDetails(item.activity.coterie.id)">{{item.activity.coterie.name}}</span>
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
              <span></span>
            </div>
          </div>
        </div>

        <div class="dinglian-lists-footer clearfix">
          <span @click="gotoChatroom(item.topicId)">{{item.commentCnt}}</span>
          <span @click="praiseTopic(item)" :class="['dinglian-lists-footer-like', {'dinglian-lists-footer-likeActive': item.hasPraise}]">{{item.praiseCnt}}</span>
        </div>
      </li>
    </ul>
  </div>
  </mt-loadmore>

</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'CircleEvents',
    data () {
      return {
        autoLill: false,
        maxDistance: 80
      }
    },
    props: ['topicList', 'allLoaded', 'isDismissed'],
    methods: {
        // 跳转活动评论
      gotoChatroom (id) {
        this.$router.push({'path': '/activityMessage/' + id})
      },
//        跳转圈子详情
      goCircleDetails (id) {
        this.$router.push({'path': '/circleDetails/' + id})
      },
//      上拉加载
      loadBottom () {
        this.$emit('pullUpEvents')
        this.$refs.loadmore.onBottomLoaded()
      },
      redirectActivityInfo (activityId) {
        // 跳转到活动详情
        this.$router.push({'path': '/activityDetails/' + activityId})
      },
      praiseTopic (topic) {
        // 话题点赞，如果该话题hasPraise=true,则不能点赞，点赞图标变红
        if (!topic.hasPraise && !this.isDismissed) {
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
    /*padding-top: 2px;*/
  }
  .dinglian-lists-ul {
    background: #f2f2f2;
    padding: 0.1rem 0;
  }
  .dinglian-lists-ul > li {
    margin-bottom: 0.1rem;
    background: #ffffff;
  }
  .dinglian-lists-con {
    height: 1.4rem;
    border-bottom: 1px solid #dddddd;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 31%;
    padding: 0.15rem 0;
    padding-left: 0.15rem;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 0.9rem;
    height: 1.1rem;
    border-radius: 0.02rem;
    object-fit: cover;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    overflow: hidden;
    width: 69%;
    height: 100%;
    padding-top: 0.14rem;
    padding-left: 0.12px;
    padding-right: 0.18rem;
  }
  .dinglian-lists-title {

  }
  .dinglian-lists-title > h3 {
    max-width: 1.63rem;
    font-size: 0.14rem;
    text-align: left;
    height: 0.14rem;
    line-height: 0.14rem;
    font-weight: 400;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dinglian-lists-title > span {
    float: right;
    max-width: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.11rem;
    background: #ffd200;
    border-radius: 0.02rem;
    padding: 0 0.015rem;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 0.18rem;
    line-height: 0.18rem;
    margin-top: 0.05rem;

  }
  .dinglian-lists-tags > span {
    display: inline-block;
    height: 0.18rem;
    float: left;
    border-radius: 0.02rem;
    background: #f2f2f2;
    margin-right: 0.07rem;
    font-size: 0.11rem;
    padding: 0.04rem;
    line-height: 0.1rem;
  }
  .dinglian-lists-cost {
    height: 0.14rem;
    color: #e63832;
    font-size: 0.14rem;
    line-height: 0.14rem;
    text-align: left;
    margin-top: 0.09rem;
  }
  .dinglian-lists-people {
    margin-top: 0.2rem;
    text-align: left;
    font-size: 0.11rem;
    color: #333333;
    height: 0.11rem;
    line-height: 0.11rem;
    overflow: hidden;
  }
  .dinglian-lists-people span:first-child {
    float: left;
  }
  .dinglian-lists-people span:last-child {
    float: right;
    text-align: right;
  }
  .dinglian-lists-people span:last-child > i {
    font-style: normal;
    color: #e63832;
  }
  .dinglian-lists-address {
    margin-top: 0.09rem;
    color: #999999;
  }
  .dinglian-lists-address span:nth-of-type(1) {
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dinglian-lists-address span:nth-of-type(2) {
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    font-size: 11px;
    color: #999999;
    display: inline-block;
    height: 100%;
    float: left;
  }
  .dinglian-lists-footer span:first-of-type {
    margin-left: 0.22rem;
    background: url("../../assets/images/comment.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.21rem;
  }
  .dinglian-lists-footer-like {
    margin-left: 0.55rem;
    background: url("../../assets/images/like.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.21rem;
  }
  .dinglian-lists-footer .dinglian-lists-footer-likeActive {
    margin-left: 0.55rem;
    background: url("../../assets/images/likeActive.svg") no-repeat left center;
    background-size: 0.14rem 0.14rem;
    padding-left: 0.21rem;
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
    background: #FFD200;
  }
  /*报名中*/
  .dinglian-lists-status-IsRegistering {
    background: #5dcf58;
  }
  /*已结束*/
  .dinglian-lists-status-over {
    background: #E63832;
  }
</style>
