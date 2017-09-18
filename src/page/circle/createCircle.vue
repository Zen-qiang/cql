<template>
  <div class="dinglian-create-all">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <h3>创建圈子名称</h3>
    <input type="text" placeholder="请输入圈子的名称,不得超过12字" class="fs_11" v-model="circleName">
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="dinglian-button">下一步</mt-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  import { Toast } from 'mint-ui'
  export default {
    components: {
      DingLianHeader
    },
    name: 'createCircle',
    data () {
      return {
        headerName: '创建圈子',
        circle: null,
        circleName: null
      }
    },
    created () {
      this.circle = this.$store.state.circle || {}
      if (this.circle) {
        // 编辑圈子
        this.circleName = this.circle.name
      }
    },
    methods: {
      goNextStep () {
        // 下一步
        this.circle.name = this.circleName
        if (this.circleName != null) {
          if (this.circleName.length > 0 && this.circleName.length <= 12) {
            this.$store.commit(types.CIRCLE, this.circle)
            this.$router.push({'path': '/chooseCategory'})
          } else if (this.circleName.length > 12) {
            Toast('圈子的名称不能超过12字！')
          } else {
            Toast('圈子的名称不能为空！')
          }
        } else {
          Toast('圈子的名称不能为空！')
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-create-all {
    height: 100vh;
    padding-top: 0.9rem;
    background: #fff;
  }
  .dinglian-create-all > h3 {
    color: #666666;
    font-weight: 200;
    font-size: 0.24rem;
    font-family: "PingFang";
    text-align: center;
  }
  /*输入框*/
  .dinglian-create-all input {
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    margin: auto;
    width: 1.9rem;
    font-size: 0.11rem;
    text-align: center;
    padding-bottom: 0.09rem;
    border-bottom: 1px solid #ffd200;
    border-radius: 0;
  }
</style>
