<template>
  <div class="dinglian-activityLists-all">
    <div class="dinglian-circle-search">
      <input type="search" placeholder="🔍 请输入圈子关键词">
    </div>
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
        this.$router.push({'path': '/createActivity'})
      },
      getActivityList () {
        this.axios({
          method: 'get',
          url: 'getActivityList'
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
    height: 44px;
    background: #f2f2f2;
    padding: 10px 15px;
  }
  .dinglian-circle-search > input[type^=search] {
    margin: 0 auto;
    height: 24px;
    width: 345px;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
  }
  .dinglian-activityLists-all {
    position: relative;
    height: 100%;
  }
  .dinglian-activityLists-release {
    position: absolute;
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
