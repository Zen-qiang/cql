<template>
  <div class="dinglian-myActivity-all bColor">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="index+''" v-for="(item, index) in tags" :key="index">{{item}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="index+''" v-for="(item, index) in tags" :key="index">
        <activity-info-lists style="margin-top: 0.1rem; margin-bottom: 0.4rem" :footer="footer" :activityLists="activityLists"
                             v-on:pullUpActivity="pullUpActivity"
                             :allLoaded="allLoaded"></activity-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="dinglian-button">创建新活动</mt-button>
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
        selected: '0',
        tags: ['全部活动', '我发起的', '我参与的', '历史活动'],
        start: 0,
        pageSize: 10,
        activityLists: [],
        page: 1,
        allLoaded: false,
        footer: true
      }
    },
    created () {
      this.getMyActivityList()
    },
    watch: {
      selected: function (val, oldVal) {
//        我创建的活动不显示按钮
        if (val === '1') {
          this.footer = false
        } else {
          this.footer = true
        }
        this.page = 1
        this.start = 0
        this.activityLists = []
        this.allLoaded = false
        this.getMyActivityList()
      }
    },
    methods: {
      goRefresh () {
        this.activityLists = []
        this.getMyActivityList()
      },
      goNextStep () {
        this.$router.push({'path': '/chooseActivityTags'})
      },
      pullUpActivity () {
        this.page ++
        this.start = (this.page - 1) * this.pageSize
        this.getMyActivityList()
      },
      getMyActivityList () {
        if (this.$store.state.userId) {
          this.axios({
            method: 'get',
            url: 'getMyActivityList',
            params: {
              userId: this.$store.state.userId,
              dataType: this.selected,
              start: this.start,
              pageSize: this.pageSize
            }
          }).then(res => {
            if (res.data.data.length > 0) {
              for (let item in res.data.data) {
                this.activityLists.push(res.data.data[item])
              }
            } else {
              this.allLoaded = true
            }
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  /*分类底部黄色条*/
  .mint-navbar > a{
    position: relative;
  }
  @-webkit-keyframes move {
    from{
      width: 0;
    }
    to{
      width:0.2rem;
    }
  }
  @keyframes move {
    from{
      width: 0;
    }
    to{
      width:0.2rem;
    }
  }
  .mint-navbar .mint-tab-item {
    border-bottom: 0.02rem solid #fff;
    padding: 0.17rem 0;
    font-size: 0.15rem;
  }
  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom:0;
    border-bottom: 0.02rem solid #ffd200;
  }
  .mint-navbar .mint-tab-item.is-selected:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    left: 0;
    /*width: 0.2rem;*/
    height: 0.02rem;
    background: #fff;
    -webkit-animation: move 0.5s forwards;
    -o-animation: move 0.5s forwards;
    animation: move 0.5s forwards;
  }
  .mint-navbar .mint-tab-item.is-selected:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    right: 0;
    /*width: 0.2rem;*/
    height: 0.02rem;
    background: #fff;
    -webkit-animation: move 0.5s forwards;
    -o-animation: move 0.5s forwards;
    animation: move 0.5s forwards;
  }
</style>
