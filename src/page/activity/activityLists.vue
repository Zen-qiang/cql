<template>
  <div class="dinglian-activityLists-all bColor">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="3"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search" onsubmit="return false;">
      <input type="search" placeholder="请输入活动关键词" @focus="moveIcon" @blur="refreshIcon" v-model="keyword" :class="{'active':active}" @keyup.enter="searchActivity" ref="searchInput">
      <span :class="{'active':active}" @click="clearSearchContent">取消</span>
    </form>
    <activity-info-lists :footer="false" :activityLists="activityLists" v-on:pullUpActivity="pullUpActivity" :allLoaded="allLoaded" style="min-height: 80vh"></activity-info-lists>
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
        allLoaded: false,
        active: false,
        headerName: '活动列表'
      }
    },
    created () {
      this.getActivityList()
    },
    methods: {
      // 下拉刷新
      loadTop () {
        this.activityLists = []
        this.page = 1
        this.start = 0
        this.active = false
        Indicator.open()
        this.keyword = ''
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
        this.allLoaded = false
        this.activityLists = []
        this.getActivityList()
        this.$refs.searchInput.blur()
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
      },
      // 输入框放大镜图标 聚焦事件
      moveIcon () {
        this.active = true
      },
      // 失焦事件
      refreshIcon () {
        if (this.keyword === '') {
          this.active = false
        }
      },
      // 清除输入框内容
      clearSearchContent () {
        this.keyword = ''
        this.active = false
      }
    }
  }
</script>
<style scoped>
  .dinglian-activityLists-all {
    padding-top: 0;
    position: relative;
    height: auto;
  }
  /*搜索框*/
  .dinglian-circle-search {
    height: 0.44rem;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    position: relative;
  }
  .dinglian-circle-search > span {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    font-size: 0.14rem;
    color: #333;
    line-height: 0.44rem;
    opacity: 0;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }
  .dinglian-circle-search > span.active {
    right: 0.18rem;
    opacity: 1;
  }
  .dinglian-circle-search > input[type^=search] {
    /*margin: 0 auto;*/
    margin: 0 0.15rem 0 0.15rem;
    height: 0.24rem;
    width: 3.45rem;
    border-radius: 0.12rem;
    font-size: 0.12rem;
    color: #999999;
    background: #fff url("../../assets/images/magnifier.svg") no-repeat 30% center;
    background-size: 0.12rem;
    padding-left: 34%;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .dinglian-circle-search > input[type^=search].active {
    background-position-x: 0.05rem;
    padding-left: 0.2rem;
    margin: 0 0.6rem 0 0.15rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }
  /**/
  @-webkit-keyframes move {
    from{
      opacity: 0.6;
      -webkit-transform: scale(0.6);
      -moz-transform: scale(0.6);
      -ms-transform: scale(0.6);
      -o-transform: scale(0.6);
      transform: scale(0.6);
    }
    to{
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes move {
    from{
      opacity: 0.6;
      -webkit-transform: scale(0.6);
      -moz-transform: scale(0.6);
      -ms-transform: scale(0.6);
      -o-transform: scale(0.6);
      transform: scale(0.6);
    }
    to{
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  .dinglian-activityLists-release {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    border-radius: 50%;
    background: url("../../assets/images/snniuz.png") no-repeat center center;
    background-size: 0.6rem 0.6rem;
    -webkit-animation:move 0.5s ease-in;
    -o-animation:move 0.5s ease-in;
    animation:move 0.5s ease-in;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -moz-animation-direction: alternate;
    -o-animation-direction: alternate;
    animation-direction: alternate;
  }
</style>
