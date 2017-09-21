<!--编辑圈子简介-->
<template>
  <div class="dinglian-editIntroduction-all bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <div class="dinglian-editIntroduction-content">
      <h4>简介</h4>
      <textarea v-model="introduction"></textarea>
      <p><span v-text="num"></span>字</p>
    </div>
    <button @click="goEditCircleInformation">确定</button>
  </div>
</template>
<script>
  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  export default {
    components: {
      DingLianHeader
    },
    data () {
      return {
        headerName: '圈子资料',
        num: 400,
        introduction: ''
      }
    },
    watch: {
      introduction: function (val) {
        this.num = 400 - parseInt(val.length)
        if (parseInt(val.length) > 400) {
          Toast('不允许超过400个字')
          this.introduction = val.substr(0, 400)
          this.num = 0
        }
      }
    },
    methods: {
      goEditCircleInformation () {
        this.$store.commit(types.CIRCLEDESCIPTION, this.introduction)
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .dinglian-editIntroduction-all {
    height: 100vh;
  }
  .dinglian-editIntroduction-content {
    min-height: 1.99rem;
    padding: 0.15rem;
    font-size: 0.14rem;
    background: #fff;
    text-align: left;
    position: relative;
  }
  .dinglian-editIntroduction-content > h4 {
    font-weight: normal;
    color: #999;
    margin-bottom: 0.05rem;
  }
  .dinglian-editIntroduction-content > textarea {
    width: 100%;
    height: 1.8rem;
    text-indent: 2em;
    font-size: 0.14rem;
  }
  .dinglian-editIntroduction-content > p {
    position: absolute;
    right: 0.15rem;
    bottom: 0;
    font-size: 0.11rem;
    color: #999;
  }
  button {
    display: block;
    width: 3.2rem;
    height: 0.49rem;
    background: #ffd200;
    color: #333;
    outline: none;
    border: none;
    -webkit-border-radius: 0.05rem;
    -moz-border-radius: 0.05rem;
    border-radius: 0.05rem;
    margin: 0.3rem auto 0;
  }
</style>
