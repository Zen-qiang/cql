<template>
  <div class="dinglian-alone-whole">
    <alone-activity :footer="false" style="background: #ffffff" :activity="activity"></alone-activity>
    <div class="dinglian-alone-sign">
      <div class="dinglian-alone-userinfo dinglian-alone-color">
        <label for="">报名信息</label>
        <span @click="showAddFriend">添加好友</span>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">姓名</label>
        <input type="text" v-model="userName">
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">手机</label>
        <input type="text" v-model="telphone" v-show="!needBind">
        <span v-show="needBind" @click="bindPhoneNo">绑定（仅组织者可见）</span>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">性别</label>
        <div class="edit-radio">
          <label for="" @click="checkGender('1')"><input type="radio" name="gender" value="1" v-model="gender">男</label>
          <label for="" @click="checkGender('2')"><input type="radio" name="gender" value="2" v-model="gender">女</label>
        </div>
      </div>
    </div>

    <div class="dinglian-alone-addUsers">
      <div class="dinglian-alone-addTitle">
        <span>添加的朋友</span>
        <span>{{friends.length}}</span>
      </div>
      <div class="dinglian-alone-users"  :key="index" v-for="(item, index) in friends">
        <ul>
          <li @click="removeItem(index)"></li>
          <li><input type="text" v-model="item.name" disabled></li>
          <li>
            <span>{{item.gender}}</span>
          </li>
        </ul>
        <span @click="showAddFriend"></span>
      </div>
    </div>
    <mt-button type="default" class="dinglian-button dinglian-alone-button" @click.native="signUp">立即报名</mt-button>
  </div>
</template>
<script>
  import AloneActivity from '../../components/baseActivity/aloneActivity.vue'
  import * as types from '../../store/mutation-types'
  export default {
    components: {
      AloneActivity
    },
    data () {
      return {
        gender: '1',
        userName: '',
        needBind: false,
        telphone: '',
        activity: {},
        friends: [{
          name: '张三',
          gender: '1'
        }]
      }
    },
    created () {
      this.activity = this.$store.state.activity
      this.userName = this.$store.state.userName
      if (this.$store.state.userPhoneNo) {
        this.telphone = this.$store.state.userPhoneNo
      } else {
        this.needBind = true
      }
    },
    methods: {
      removeItem (index) {
        this.friends.splice(index, 1)
      },
      bindPhoneNo () {
        alert(1)
      },
      checkGender (val) {
        this.gender = val
      },
      signUp () {},
      showAddFriend () {
        let paramData = {
          userName: this.userName,
          gender: this.gender,
          telphone: this.telphone,
          friends: this.friends
        }
        this.$store.commit(types.PARAMDATA, paramData)
        this.$store.commit(types.ACTIVITY, this.activity)
        this.$router.push({'path': '/editFriends'})
      }
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

</style>
