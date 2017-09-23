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
    padding: 0.15rem;
  }
  .dinglian-tagsLists-all > li {
    display: inline-block;
    float: left;
    border: 1px solid #999999;
    border-radius: 0.04rem;
    height: 0.22rem;
    line-height: 0.2rem;
    padding: 0 0.1rem;
    margin: 0.1rem 0;
    margin-right: 0.1rem;
  }
  .dinglian-tagsLists-active {
    background: #ffd200;
  }
</style>
