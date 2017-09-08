<template>
  <div class="dinglian-activityLists-all">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="2"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search clearfix" onsubmit="return false;">
      <input type="search" placeholder="请输入活动关键词" v-model="keyword" @search="searchActivity">
      <span v-show="!keyword"></span>
    </form>
    <activity-info-lists :footer="false" :activityLists="activityLists" v-on:pullUpActivity="pullUpActivity" :allLoaded="allLoaded"></activity-info-lists>
  </mt-loadmore>
    <button class="dinglian-activityLists-release" @click="redirectCreateActivity()">
    </button>
  </div>

</template>
<script>
  import ActivityInfoLists from '../../components/baseActivity/activityInfoLists.vue'
  import { Indicator } from 'mint-ui'
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
        this.start = 0
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
        this.start = 0
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
    position: relative;
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
    padding-right: 0.1rem;
  }
  .dinglian-circle-search > span {
    position: absolute;
    background: url("../../assets/images/magnifier.svg") no-repeat center center;
    background-size: 0.14rem 0.14rem;
    left: 1.15rem;
    top: 0.15rem;
    width: 0.14rem;
    height: 0.14rem;
  }
  .dinglian-activityLists-all {
    position: relative;
    height: 100%;
  }
  .dinglian-activityLists-release {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    border-radius: 50%;
    background: url("../../assets/images/snniuz.png") no-repeat center center;
    background-size: 0.6rem 0.6rem;
  }
</style>
