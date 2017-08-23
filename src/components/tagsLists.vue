<template>
  <ul class="dinglian-tagsLists-all clearfix">
    <li class="fs_9">桌游</li>
    <li class="dinglian-tagsLists-active fs_9">桌游</li>
    <li class="fs_9">桌游</li>
    <li class="fs_9">桌游</li>
    <li class="fs_9">桌游</li>
    <li class="fs_9">桌游</li>
  </ul>
</template>
<script>
  export default {
    name: 'TagsLists',
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .dinglian-tagsLists-all {
    padding: 15px;
  }
  .dinglian-tagsLists-all > li {
    display: inline-block;
    float: left;
    border: 1px solid #999999;
    border-radius: 4px;
    height: 22px;
    padding: 0 10px;
    margin: 10px 0;
    margin-right: 10px;
  }
  .dinglian-tagsLists-active {
    background: #ffd200;
  }

</style>
