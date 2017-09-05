<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item :id="index+''" v-for="(item, index) in tags" :key="index">{{item}}</mt-tab-item>
      <!--<mt-tab-item :id="index+''" v-for="(item, index) in tags" :key="index">{{item}}</mt-tab-item>-->
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="index+''" v-for="(item, index) in tags" :key="index">
      <!--<mt-tab-container-item :id="index+''" v-for="(item, index) in tags" :key="index">-->
        <activity-info-lists style="margin-top: 10px" :footer="true" :activityLists="activityLists"
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
//        tags: [
//          {name: '全部活动', id: 0},
//          {name: '我发起的', id: 1},
//          {name: '我参与的', id: 2},
//          {name: '历史活动', id: 3}
//        ],
        start: 0,
        pageSize: 10,
        activityLists: [],
        page: 1,
        allLoaded: false
      }
    },
    created () {
      this.getMyActivityList()
    },
    watch: {
      selected: function (val, oldVal) {
        console.log(11111)
        this.page = 1
        this.start = 0
        console.log(this.selected)
        this.getMyActivityList()
      }
    },
    methods: {
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
//            this.activityLists = res.data.data
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

</style>
