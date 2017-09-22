<template>
  <div>
    <mt-loadmore :bottom-method="loadBottom"
                 :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
                 :distanceIndex="2"
                 ref="loadmore">

    <ul class="dinglian-lists-ul">
      <li class="clearfix dinglian-lists-con" :key="item.coterieId" v-for="item of coterieList" @click="redirectCircleInfo(item.coterieId)">
        <div class="dinglian-lists-con-left">
          <img :src="item.cover" alt="">
          <!--<img v-lazy.container="item.cover" alt="">-->
        </div>
        <div class="dinglian-lists-con-right">
          <h3>{{item.name}}</h3>
          <div class="dinglian-lists-statistics clearfix">
            <span class="fs_11">成员&nbsp;{{item.membersCnt}}</span>
            <span class="fs_11">活动&nbsp;{{item.activityCnt}}</span>
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
        this.$router.push({'path': '/circleDetails/' + id})
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
    height: 1.3rem;
    margin-bottom: 1px;
    background: #fff;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 1.15rem;
    padding: 0.15rem 0;
    padding-left: 0.15rem;
    box-sizing: border-box;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 4px;
  }
  image[lazy=loading] {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 4px;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    width: 2.6rem;
    height: 100%;
    padding: 0.15rem;
    padding-left: 0.12rem;
    overflow: hidden;
  }
  .dinglian-lists-con-right > h3 {
    font-size: 14px;
    text-align: left;
    height: 0.15rem;
    line-height: 0.17rem;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
    font-weight: 500;
    font-family: 'PingFangSC-Light';
  }
  .dinglian-lists-statistics {
    text-align: left;
    height: 0.11rem;
    line-height: 0.11rem;
    padding-top: 0.05rem;
    font-size: 11px;
    box-sizing: content-box;
  }
  .dinglian-lists-statistics > span {
    height: 0.11rem;
    line-height: 0.11rem;
    font-size: 11px;
    color: #999999;
    display: inline-block;
    float: left;
    margin-left: 0.13rem;
  }
  .dinglian-lists-statistics > span:first-of-type {
    margin-left: 0;
  }
  .dinglian-lists-tags {
    height: 0.18rem;
    text-align: left;
    line-height: 0.18rem;
    margin-top: 0.07rem;
    box-sizing: content-box;

  }
  .dinglian-lists-tags > span {
    box-sizing: border-box;
    height: 0.18rem;
    line-height: 0.12rem;
    font-size: 0.11rem;
    display: inline-block;
    float: left;
    border-radius: 2px;
    background: #f2f2f2;
    margin-right: 0.07rem;
    padding: 0.03rem;
  }
  .dinglian-lists-con-right > p {
    margin-top: 0.17rem;
    font-size: 0.12rem;
    height: 0.285rem;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*width: 80%;*/
   /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;*/
  }
</style>
