<template>
  <div class="dinglian-create-all">
    <h3>创建圈子名称</h3>
    <mt-field placeholder="请输入圈子的名称，不得超过12字" v-model="username"></mt-field>
    <mt-button type="default">下一步</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'createCircle',
    data () {
      return {
        circleName: ''
      }
    }
  }
</script>
<style scoped>

</style>
