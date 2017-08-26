<template>
  <div class="dinglian-alone-whole">
    <!--绑定手机号 start-->
    <div class="dinglian-alone-cover" v-show="bindPhone">
      <div class="dinglian-alone-bindtel">
        <div class="dinglian-alone-bind-header">
          <h4>
            绑定手机号
            <span></span>
          </h4>
        </div>
        <div class="dinglian-alone-bind-body clearfix">
          <input type="text" placeholder="请输入手机号">
          <input type="text" placeholder="请输入验证码">
          <span>发送验证码</span>
        </div>
        <div class="dinglian-alone-bind-footer">
          <div>
            <mt-button type="default" class="dinglian-alone-bind-button">立即绑定</mt-button>
          </div>
        </div>

      </div>

    </div>
    <!--绑定手机号 end-->
    <alone-activity :footer="false" style="background: #ffffff"></alone-activity>
    <div class="dinglian-alone-sign">
      <div class="dinglian-alone-userinfo dinglian-alone-color">
        <label for="">报名信息</label>
        <span>添加好友</span>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">姓名</label>
        <input type="text" v-model="username">
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">手机</label>
        <span v-if="telphone">1822882882</span>
        <span v-else-if="!telphone">请绑定手机</span>
        <input type="text" v-model="telphone" v-else="telphone">
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">性别</label>
        <input type="text" v-model="sex" v-if="sex">
        <div class="edit-radio" v-else="sex">
          <label for=""><input type="radio" name="cost">男</label>
          <label for=""><input type="radio" name="cost">女</label>
        </div>
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
          <li><input type="text" value="张三" disabled></li>
          <li>
            <input type="text" v-model="sex" v-if="sex" disabled>
            <div class="edit-radio" v-else="sex">
              <label for=""><input type="radio" name="cost">男</label>
              <label for=""><input type="radio" name="cost">女</label>
            </div>
          </li>
        </ul>
        <span></span>
      </div>
      <div class="dinglian-alone-users">
        <ul>
          <li></li>
          <li><input type="text" value="张三" disabled></li>
          <li>
            <input type="text" v-model="sex" v-if="sex" disabled>
            <div class="edit-radio" v-else="sex">
              <label for=""><input type="radio" name="cost">男</label>
              <label for=""><input type="radio" name="cost">女</label>
            </div>
          </li>
        </ul>
        <span></span>
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
        telphone: '',
        sex: '男',
        bindPhone: false
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  .dinglian-alone-whole {
    height: 100%;
    background: #f2f2f2;
    position: relative;
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
  .dinglian-alone-color > span {
    color: #e63832;
    position: relative;

  }
  .dinglian-alone-color > span::before {
    position: absolute;
    content: " ";
    width: 16px;
    height:16px;
    background: url("../../assets/images/add.svg") no-repeat center left;
    top: 50%;
    margin-top: -8px;
    left: -26px;
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
    margin-right: 30px;
  }
  .dinglian-alone-users > span {
    display: inline-block;
    background: url("../../assets/images/editBlack.svg") no-repeat center left;
    width: 28px;
    padding: 0 5px;
    background-origin: content-box;
    background-clip: content-box;
  }
  .dinglian-alone-button {
    background: #e63832;
    color: #ffffff;
    font-size: 15px;
  }
  /*绑定手机号*/
  .dinglian-alone-cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    background: #dddddd;
    /*opacity: 0.1;*/
  }
  .dinglian-alone-bindtel {
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
    background: #ffffff;
    border-radius: 4px;
  }
  .dinglian-alone-bind-header {
    font-size: 17px;
    margin: 0 auto;
    background: #ffd200;
    height: 0.45rem;
  }
  .dinglian-alone-bind-header > h4 {
    line-height: 0.45rem;
    width: 100%;
    height: 100%;
    font-weight: 400;
    text-align: center;
    position: relative;
  }
  .dinglian-alone-bind-header > h4 > span {
    position: absolute;
    top: 0.15rem;
    right: 0.15rem;
    width: 0.15rem;
    height: 0.15rem;
    background: #e63832;
  }
  .dinglian-alone-bind-body {
    height: 1.35rem;
    background: #f2f2f2;
    padding: 0.11rem 0.2rem;
    position: relative;

  }
  .dinglian-alone-bind-body > span {
    font-size: 14px;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 0.87rem;
    position: absolute;
    bottom: 0.21rem;
    right: 0.28rem;
    background: #ffd200;
    border-radius: 4px;

  }
  .dinglian-alone-bind-body > input {
    width: 100%;
    background: #ffffff;
    float: left;
    height: 0.44rem;
    margin: 0 auto;
    margin-top: 0.11rem;
    border-radius: 4px;
    border: 1px solid #dddddd;
  }
  .dinglian-alone-bind-body > input:first-of-type {
    background: url("../../assets/images/people.svg") no-repeat left center;
    background-size: 25px;
    background-position: 5px;
    background-color: #ffffff;
    padding: 0 35px;
  }
  .dinglian-alone-bind-body > input:last-of-type {
    background: url("../../assets/images/people.svg") no-repeat left center;
    background-size: 25px;
    background-position: 5px;
    background-color: #ffffff;
    padding: 0 35px;
    padding-right: 1.3rem;
  }
  .dinglian-alone-bind-footer {
    height: 0.8rem;
    background: #f2f2f2;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0 0.2rem;
    padding-top: 0.05rem;
  }
  .dinglian-alone-bind-footer > div {
    border-top: 1px solid #dddddd;
    height: 100%;
    position: relative;
  }
  .dinglian-alone-bind-button {
    position: absolute;
    top: 0.15rem;
    left: 0;
    width: 100%;
    background: #dddddd;
    color: #999999;
  }

</style>
