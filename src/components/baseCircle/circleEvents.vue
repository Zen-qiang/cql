<template>
  <div>
    <ul class="dinglian-lists-ul">
      <li :key="item.topicId" v-for="item of topicList">
        <div class="clearfix dinglian-lists-con">
          <div class="dinglian-lists-con-left">
            <img :src="domain.resourceUrl + item.activity.cover" alt="" @click="redirectActivityInfo(item.activity.activityId)">
          </div>
          <div class="dinglian-lists-con-right">
            <div class="dinglian-lists-title clearfix">
              <h3>{{item.activity.name}}</h3>
              <span class="dinglian-lists-circleTag">{{item.activity.coterie.name}}</span>
            </div>
            <div class="dinglian-lists-tags clearfix">
              <span class="fs_11" :key="tag" v-for="tag of item.activity.tags">{{tag}}</span>
            </div>
            <div class="dinglian-lists-cost">{{item.activity.charge}}</div>
            <div class="dinglian-lists-people clearfix">
              <span v-if="item.activity.status === '1'">进行中</span>
              <span v-else-if="item.activity.status === '2'">正在报名</span>
              <span v-else>已结束</span>
              <span> <i>{{item.activity.userCount.currentCount}}</i> /{{item.activity.userCount.minCount}}~{{item.activity.userCount.maxCount}}人</span>
            </div>
            <div class="dinglian-lists-people dinglian-lists-address clearfix">
              <span>{{item.activity.address}}</span>
              <span>5.6km</span>
            </div>
          </div>
        </div>

        <div class="dinglian-lists-footer">
          <span>{{item.commentCnt}}</span>
          <span @click="praiseTopic(item)">{{item.praiseCnt}}</span>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  export default {
    name: 'CircleEvents',
    data () {
      return {}
    },
    props: ['topicList'],
    methods: {
      redirectActivityInfo (activityId) {
        // 跳转到活动详情
        this.$store.commit(types.ACTIVITYID, activityId)
        this.$router.push({'path': '/activityInfo'})
      },
      praiseTopic (topic) {
        // 话题点赞，如果该话题hasPraise=true,则不能点赞，点赞图标变红
        if (!topic.hasPraise) {
          this.axios({
            method: 'get',
            url: 'praiseTopic',
            params: {
              userId: 13,
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
  }
  .dinglian-lists-footer span:first-of-type {
    margin-left: 41px;
    background: url("../../assets/images/comment.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  .dinglian-lists-footer span:last-of-type {
    margin-left: 75px;
    background: url("../../assets/images/like.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
</style>
