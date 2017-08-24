<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部活动</mt-tab-item>
      <mt-tab-item id="2">我发起的</mt-tab-item>
      <mt-tab-item id="3">我参与的</mt-tab-item>
      <mt-tab-item id="4">历史活动</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <activity-info-lists style="margin-top: 10px" :footer="true"></activity-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        222
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        333
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        333
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
        selected: '1'
      }
    }
  }
</script>
<style scoped>

</style>
