<template>
  <div>
    <mt-search v-model="search" cancel-text="取消" placeholder="搜索"></mt-search>
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
  .dinglian-circle-carousel {
    width: 100%;
    height: 170px;
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
  .mint-header {
    background-color: #ffd200;
    color: #333333;
    height: 64px;
    padding-top: 20px;
  }
  .dinglian-circle-carousel {
    margin-top: 64px;
    width: 100%;
    height: 170px;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #ffd200;
    color: #333333;
  }
  a {
    color: #333333;
  }
  .dinglian-circle-tagList {
    padding-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
    height: 35px;
    overflow: hidden;
  }
  .dinglian-circle-tagListChange {
    padding-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .dinglian-circle-tagList > li {
    list-style: none;
    float: left;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  .dinglian-circle-tagListChange > li {
    list-style: none;
    float: left;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  .dinglian-circle-tags {
    color: #999999;
    border: 1px solid #999999;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-circle-changetags {
    background-color: #ffd200;
    color: #999999;
    border: 1px solid #ffd200;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }

</style>
