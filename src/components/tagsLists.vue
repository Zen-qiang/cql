<template>
  <ul class="dinglian-tagsLists-all clearfix">
    <li class="fs_9" :key="item.id" v-for="item of tagsList" @click="checkTag(item.id)">{{item.name}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'TagsLists',
    data () {
      return {}
    },
    props: ['tagsList'],
    methods: {
      checkTag (tagId) {
        // 向父类传值
        this.$emit('checkTag', tagId)
      }
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
