<template>
  <div class="dinglian-alone-whole">
    <alone-activity :footer="false" style="background: #ffffff" :activity="activity"></alone-activity>
    <div class="dinglian-alone-sign">
      <div class="dinglian-alone-userinfo dinglian-alone-color">
        <label for="">报名信息</label>
        <input type="text" value="添加好友" disabled>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">姓名</label>
        <input type="text" v-model="username">
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">手机</label>
        <input type="text" v-model="telphone">
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">性别</label>
        <input type="text" v-model="sex">
      </div>
    </div>

    <div class="dinglian-alone-addUsers">
      <div class="dinglian-alone-addTitle">
        <span>添加的朋友</span>
        <span>1</span>
      </div>
      <div class="dinglian-alone-users">
        <ul>
          <li></li>
          <li><input type="text" value="张三"></li>
          <li><input type="text" value="男"></li>
        </ul>
        <span>编辑</span>
      </div>
      <div class="dinglian-alone-users">
        <ul>
          <li></li>
          <li><input type="text" value="张三"></li>
          <li><input type="text" value="男"></li>
        </ul>
        <span>编辑</span>
      </div>

    </div>

    <mt-button type="default" class="dinglian-button dinglian-alone-button">立即报名</mt-button>
  </div>
</template>
<script>
  import AloneActivity from '../../components/baseActivity/aloneActivity.vue'
  export default {
    components: {
      AloneActivity
    },
    data () {
      return {
        username: '王好为',
        telphone: '18761800967',
        sex: '男',
        activity: {}
      }
    },
    created () {
      this.activity = this.$store.state.activity
    },
    methods: {

    }
  }
</script>
<style scoped>
  .dinglian-alone-whole {
    height: 100%;
    background: #f2f2f2;
  }
  .dinglian-alone-sign {
    margin: 10px 0;
    background: #ffffff;
  }
  .dinglian-alone-sign > .dinglian-alone-userinfo {
    font-size: 14px;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  .dinglian-alone-userinfo > input {
    text-align: right;
  }
  .dinglian-alone-color > label {
    color: #999999;
  }
  .dinglian-alone-color > input {
    color: #e63832;
  }
  .dinglian-alone-addUsers {
    background: #ffffff;
    font-size: 14px;
  }
  .dinglian-alone-addUsers > div {
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 15px;
  }
  .dinglian-alone-addTitle {
    display: flex;
    justify-content: space-between;
    color: #999999;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-alone-users {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-alone-users > ul {
    display: flex;
    flex-flow: row nowrap;
  }
  .dinglian-alone-users > ul > li:first-of-type {
    height: 100%;
    width: 15px;
    background: url("../../assets/images/delete.svg") no-repeat center;
  }
  .dinglian-alone-users > ul > li:nth-of-type(2) {
    padding-left: 0.25rem;
    width: 0.55rem;
  }
  .dinglian-alone-button {
    background: #e63832;
    color: #ffffff;
    font-size: 15px;
  }

</style>
