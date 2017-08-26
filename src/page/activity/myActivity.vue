<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item :id="index+''" v-for="(item, index) in tags" :key="index">{{item}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="index+''" v-for="(item, index) in tags" :key="index">
        <activity-info-lists style="margin-top: 10px" :footer="true" :activityLists="activityLists"></activity-info-lists>
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
        pageSize: 999999,
        activityLists: []
      }
    },
    created () {
      this.getMyActivityList()
    },
    watch: {
      selected: function (val, oldVal) {
        this.getMyActivityList()
      }
    },
    methods: {
      goNextStep () {
        this.$router.push({'path': '/chooseActivityTags'})
      },
      getMyActivityList () {
        this.axios({
          method: 'get',
          url: 'getMyActivityList',
          params: {
            userId: 13,
            dataType: this.selected,
            start: this.start,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.activityLists = res.data.data
          console.log(this.activityLists)
        }).catch()
      }
    }
  }
</script>
<style scoped>

</style>
