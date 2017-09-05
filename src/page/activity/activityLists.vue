<template>
  <div class="dinglian-activityLists-all">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="2"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search clearfix" onsubmit="return false;">
      <input type="search" placeholder="🔍 请输入活动关键词" v-model="keyword" @search="searchActivity">
    </form>
    <activity-info-lists :footer="false" :activityLists="activityLists" v-on:pullUpActivity="pullUpActivity" :allLoaded="allLoaded"></activity-info-lists>
  </mt-loadmore>
    <button class="dinglian-activityLists-release" @click="redirectCreateActivity()">
      发布活动
    </button>
  </div>

</template>
<script>
  import ActivityInfoLists from '../../components/baseActivity/activityInfoLists.vue'
  import { Indicator } from 'mint-ui'
//  import wx from 'weixin-js-sdk'
  export default {
    components: {
      ActivityInfoLists
    },
    data () {
      return {
        keyword: '',
        start: 0,
        pageSize: 10,
        activityLists: [],
        page: 1,
        allLoaded: false
      }
    },
    created () {
      this.getActivityList()
    },
    methods: {
      //        下拉刷新
      loadTop () {
        this.activityLists = []
        this.page = 1
        Indicator.open()
        this.getActivityList()
        this.$refs.loadTop.onTopLoaded()
      },
      //      上拉加载
      pullUpActivity () {
        this.page ++
        this.start = (this.page - 1) * this.pageSize
        this.getActivityList()
      },
      redirectCreateActivity () {
        this.$router.push({'path': '/chooseActivityTags'})
      },
//      搜索
      searchActivity () {
        this.page = 1
        this.activityLists = []
        this.getActivityList()
      },
//      获取活动列表
      getActivityList () {
        let params = {
          start: this.start,
          pageSize: this.pageSize
        }
        if (this.keyword) {
          params.keyword = this.keyword
        }
        this.axios({
          method: 'get',
          url: 'getActivityList',
          params: params
        }).then(res => {
          if (res.data.data.length > 0) {
            for (let item in res.data.data) {
              this.activityLists.push(res.data.data[item])
            }
          } else {
            this.allLoaded = true
          }
          Indicator.close()
//          this.activityLists = res.data.data
        }).catch()
      }
    }
  }
</script>
<style scoped>
  /*搜索框*/
  .dinglian-circle-search {
    width: 100%;
    height: 0.44rem;
    background: #f2f2f2;
    padding: 0.1rem 0.15rem;
  }
  .dinglian-circle-search > input[type^=search] {
    margin: 0 auto;
    height: 0.24rem;
    line-height: 0.24rem;
    width: 3.45rem;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    float: left;
    padding-right: 10px;
  }
  .dinglian-activityLists-all {
    position: relative;
    height: 100%;
  }
  .dinglian-activityLists-release {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    background: #ffd200;
    border: none;
    border-radius: 40px;
    line-height: 80px;
  }
</style>
