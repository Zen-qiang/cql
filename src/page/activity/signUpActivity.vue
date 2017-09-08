<template>
  <div class="dinglian-alone-whole">
    <!--绑定手机号 start-->
    <div class="dinglian-alone-cover" v-show="bindPhone">
      <div class="dinglian-alone-bindtel">
        <div class="dinglian-alone-bind-header">
          <h4>
            绑定手机号
            <span @click="hiddenBind()"></span>
          </h4>
        </div>
        <div class="dinglian-alone-bind-body clearfix">
          <input type="text" placeholder="请输入手机号" v-model="telphone">
          <input type="text" placeholder="请输入验证码" v-model="verifyNo">
          <span @click="sendCode()">发送验证码</span>
        </div>
        <div class="dinglian-alone-bind-footer">
          <div>
            <mt-button type="default" class="dinglian-alone-bind-button" @click.native="bindConfirm()">立即绑定</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!--绑定手机号 end-->

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
        <span v-show="needBind" @click="showBind()">绑定手机号</span>
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
        <span v-if="friends.length > 0">{{friends.length}}</span>
        <span v-else>0</span>
      </div>
      <div class="dinglian-alone-users"  :key="index" v-for="(item, index) in friends">
        <ul>
          <li @click="removeItem(index)"></li>
          <li><input type="text" v-model="item.name" disabled></li>
          <li>
            <span v-if="item.gender === 1">男</span>
            <span v-else>女</span>
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
  import { Toast } from 'mint-ui'
  export default {
    components: {
      AloneActivity
    },
    data () {
      return {
        isEditSignUp: false,
        gender: '1',
        userName: '',
        needBind: false,
        bindPhone: false,
        telphone: '',
        verifyNo: '',
        password: '',
        activity: {},
        friends: []
      }
    },
    created () {
      this.activity = this.$store.state.activity
      this.userName = this.$store.state.userName
      if (this.$store.state.userPhoneNo && this.$store.state.userPhoneNo !== 'null') {
        this.telphone = this.$store.state.userPhoneNo
      } else {
        this.needBind = true
      }
      if (this.activity.signUpInfo) {
        this.userName = this.activity.signUpInfo.realName
        this.telphone = this.activity.signUpInfo.phoneNo
        this.gender = this.activity.signUpInfo.gender
        let retinues = this.activity.signUpInfo.retinues
        if (retinues) {
          this.friends = retinues
        }
      }
      if (this.activity.isEditSignUp) {
        this.isEditSignUp = this.activity.isEditSignUp
      }
      if (this.$store.state.paramData) {
        if (this.$store.state.paramData.friends.length > 0) {
          this.friends = this.$store.state.paramData.friends
        }
      }
    },
    methods: {
      removeItem (index) {
        this.friends.splice(index, 1)
      },
//      显示和关闭绑定手机号
      showBind () {
        this.bindPhone = true
      },
      hiddenBind () {
        this.bindPhone = false
      },
//      检查男女
      checkGender (val) {
        this.gender = val
      },
//      报名过程；成功后跳转成功页面
      confirm (data) {
        this.axios({
          method: 'post',
          url: 'signUp',
          data: data
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.error.message)
          } else {
            this.$store.commit(types.ACTIVITYID, res.data.data.activityId)
            let circleObj = {
              id: res.data.data.coterie.id,
              name: res.data.data.coterie.name,
              cover: res.data.data.coterie.cover,
              isRelease: false
            }
            if (res.data.data.activityMembers) {
              circleObj.activityMembers = res.data.data.activityMembers
            }
            if (res.data.data.userCount) {
              circleObj.userCount = res.data.data.userCount
            }
            this.$store.commit(types.CIRCLE, circleObj)
            this.$router.push({'path': '/activitySuccess'})
          }
        }).catch(err => {
          console.log(err)
        })
      },
//      立即报名
      signUp () {
        let data = {
          activityId: this.activity.activityId,
          userId: this.$store.state.userId,
          realName: this.userName,
          phoneNo: this.telphone,
          gender: this.gender,
          isEditSignUp: this.isEditSignUp,
          friends: JSON.stringify(this.friends)
        }
        this.confirm(data)
      },
//      跳转编辑好友页面
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
      },
//      发送验证码
      sendCode () {
        if (this.needBind) {
          if (!this.telphone) {
            Toast('手机号码不能为空')
            return
          }
          this.axios({
            method: 'get',
            url: 'sendCode',
            params: {
              phoneno: this.telphone
            }
          }).then(res => {
            if (!res.data.success) {
              Toast(res.data.error.message)
            }
          }).catch()
        }
      },
      // 提交绑定
      bindConfirm () {
        if (this.needBind) {
          if (!this.telphone) {
            Toast('手机号码不能为空')
            return
          }
          if (!this.verifyNo) {
            Toast('验证码不能为空')
            return
          }
          this.axios({
            method: 'get',
            url: 'bindPhoneNo',
            params: {
              userId: this.$store.state.userId,
              phoneNo: this.telphone,
              verifyNo: this.verifyNo
            }
          }).then(res => {
            if (!res.data.success) {
              Toast(res.data.error.message)
            } else {
              this.hiddenBind()
              this.needBind = false
              this.$store.commit(types.USERPHONENO, this.telphone)
            }
          }).catch()
        }
      }
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
    margin-bottom: 0.5rem;
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
    background-color: #ffffff;
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
    background-color: #ffffff;
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
