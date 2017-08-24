<template>
  <div class="dinglian-create-all">
    <h3>创建圈子名称</h3>
    <div>
      <input type="text" placeholder="请输入圈子的名称,不得超过12字" class="fs_11" v-model="circleName">
    </div>
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="dinglian-button">下一步</mt-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  export default {
    name: 'createCircle',
    data () {
      return {
        circleName: ''
      }
    },
    created () {
    },
    methods: {
//        下一步
      goNextStep () {
        console.log(this.$route)
        this.$store.commit(types.CIRCLENAME, this.circleName)
        this.$router.push({'path': '/chooseCategory'})
      }
    }
  }
</script>
<style scoped>
  .dinglian-create-all {
    padding-top: 154px;
    /*overflow: hidden;*/
  }

  .dinglian-create-all > h3 {
    /*margin-top: 154px;*/
    color: #666666;
    font-weight: 400;
    font-size: 24px;
  }
  /*输入框*/
  .dinglian-create-all > div {
    text-align: center;
    margin: 0 auto;
    width: 190px;
    border-bottom: 1px solid #ffd200;
  }
  .dinglian-create-all > div > input {
    width: 173px;
    height: 14px;
  }

</style>
