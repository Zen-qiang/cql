<template>
  <div>
    <mt-loadmore :bottom-method="loadBottom"
                 :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
                 :distanceIndex="1"
                 ref="loadmore">

    <ul class="dinglian-lists-ul">
      <li class="clearfix dinglian-lists-con" :key="item.coterieId" v-for="item of coterieList">
        <div class="dinglian-lists-con-left">
          <img :src="item.cover" alt="" @click="redirectCircleInfo(item.coterieId)">
        </div>
        <div class="dinglian-lists-con-right">
          <h3>{{item.name}}</h3>
          <div class="dinglian-lists-statistics clearfix">
            <span class="fs_11">成员&nbsp;{{item.membersCnt}}</span>
            <span class="fs_11">话题&nbsp;{{item.activityCnt}}</span>
          </div>
          <div class="dinglian-lists-tags clearfix">
            <span class="fs_11" :key="tagName" v-for="tagName of item.tags">{{tagName}}</span>
          </div>
          <p>{{item.description}}</p>
        </div>
      </li>
    </ul>

    </mt-loadmore>
  </div>
</template>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    name: 'CircleInfoLists',
    data () {
      return {
        autoLill: false,
        uid: this.$store.state.userId
      }
    },
    props: ['coterieList', 'allLoaded'],
    methods: {
      redirectCircleInfo (id) {
        this.$store.commit(types.CIRCLEID, id)
        this.$router.push({'path': '/circleDetails/' + this.uid + '/' + id})
      },
      loadBottom () {
        console.log('加载')
        this.$emit('pullUpCircle')
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
</script>
<style scoped>
  .dinglian-lists-con {
    height: 130px;
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
  }
  .dinglian-lists-con-right > h3 {
    font-size: 14px;
    text-align: left;
    height: 15px;
    line-height: 15px;
  }
  .dinglian-lists-statistics {
    text-align: left;
    height: 11px;
    line-height: 11px;
    padding-top: 5px;
  }
  .dinglian-lists-statistics > span {
    color: #999999;
    display: inline-block;
    float: left;
    margin-left: 13px;
  }
  .dinglian-lists-statistics > span:first-of-type {
    margin-left: 0;
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
  .dinglian-lists-con-right > p {
    margin-top: 17px;
    font-size: 12px;
    height: 29px;
    text-align: left;
    margin-right: 15px;
  }
</style>
