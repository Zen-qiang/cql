<template>
  <mt-header :title="headerName" fixed>
    <mt-button slot="left" icon="back" @click="historyBack">返回</mt-button>
  </mt-header>
</template>
<script>
  export default {
    name: 'DingLianHeader',
    props: {
      headerName: {
        type: String,
        default: '出趣浪'
      }
    },
    data () {
      return {}
    },
    methods: {
      historyBack () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .mint-header {
    background-color: #ffd200;
    height: 0.4rem;
    color: #333333;
  }
</style>
