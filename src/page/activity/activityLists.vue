<template>
  <div class="dinglian-activityLists-all">
    <form class="dinglian-circle-search clearfix" onsubmit="return false;">
      <input type="search" placeholder="🔍 请输入圈子关键词" v-model="keyword" @search="searchActivity">
    </form>
    <activity-info-lists :footer="false" :activityLists="activityLists"></activity-info-lists>
    <button class="dinglian-activityLists-release" @click="redirectCreateActivity()">
      发布活动
    </button>
  </div>

</template>
<script>
  import ActivityInfoLists from '../../components/baseActivity/activityInfoLists.vue'
  export default {
    components: {
      ActivityInfoLists
    },
    data () {
      return {
        keyword: '',
        start: 0,
        pageSize: 9999999,
        activityLists: []
      }
    },
    created () {
      this.getActivityList()
    },
    methods: {
      redirectCreateActivity () {
        this.$router.push({'path': '/chooseActivityTags'})
      },
//      搜索
      searchActivity () {
//        console.log(navigator.userAgent)
        this.activityLists = []
        this.getActivityList()
      },
//      获取活动列表
      getActivityList () {
        this.axios({
          method: 'get',
          url: 'getActivityList',
          params: {
            keyword: this.keyword,
            start: this.start,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.activityLists = res.data.data
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
    width: 3.45rem;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    float: left;
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
