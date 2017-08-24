<template>
  <div class="dinglian-circle-all">
    <mt-search v-model="search" placeholder="搜索" autofocus ></mt-search>
    <mt-navbar v-model="selected" class="dinglian-circle-navbar">
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item id="1">街舞</mt-tab-item>
      <mt-tab-item id="2">桌游</mt-tab-item>
      <mt-tab-item id="3">其他</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <tags-lists style="margin-top: 10px"></tags-lists>
        <circle-info-lists></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        1
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        3
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<script>
  import TagsLists from '../../components/tagsLists.vue'
  import CircleInfoLists from '../../components/baseCircle/circleInfoLists.vue'
  export default {
    components: {
      TagsLists,
      CircleInfoLists
    },
    data () {
      return {
        search: '',
        selected: '0'
      }
    }
  }
</script>
<style scoped>
  .mint-search {
    height: auto;
  }
  div {
    width: 100%;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 170px;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }




</style>
