<template>
  <div class="dinglian-alone-whole">
    <div class="editContent-phone-content" :class="{'active':active}">
      <div class="editContent-phone-fix" :class="{'active':active}">
        <div class="editContent-phone-title">
          <h3>绑定手机号<span @click="active = !active"></span></h3>
        </div>
        <div class="editContent-phone-body">
          <div><input type="tel" placeholder="请输入手机号" v-model="telphone"></div>
          <div><input type="text" placeholder="请输入验证码" v-model="verifyNo"><span @click="sendCode()" :class="{sendActive: isSendCode}">{{sendCodeButton}}</span></div>
          <p></p>
          <div><button :class="{signUpActive: isSignUpActive}" @click="bindConfirm()">立即绑定</button></div>
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
        <input type="text" v-model="userName" disabled>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">手机</label>
        <input type="text" v-model="telphone" v-show="!needBind" disabled>
        <span v-show="needBind" @click="active = !active">绑定手机号</span>
      </div>
      <div class="dinglian-alone-userinfo">
        <label for="">性别</label>
        <div class="edit-radio">
          <div>{{userGender}}</div>
        </div>
      </div>
    </div>

    <div class="dinglian-alone-addUsers" v-show="friends.length">
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
  import { judgmentTel } from '../../assets/js/tools'
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
        // bindPhone: false,
        telphone: '',
        verifyNo: '',
        password: '',
        activity: {},
        friends: [],
        sendCodeButton: '发送验证码',
        isSignUpActive: false,
        active: true,
        userGender: '男',
        isSendCode: false,
        isDisabled: true
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
      if (this.$store.state.userGender && this.$store.state.userGender !== 'null') {
        if (this.$store.state.userGender === '1') {
          this.userGender = '男'
        } else if (this.$store.state.userGender === '2') {
          this.userGender = '女'
        }
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
        if (this.$store.state.paramData.friends) {
          this.friends = this.$store.state.paramData.friends
        }
      }
    },
    watch: {
      telphone: function (val) {
        if (val.length > 0) {
          this.isSignUpActive = true
        } else {
          this.isSignUpActive = false
        }
      }
    },
    methods: {
      removeItem (index) {
        this.friends.splice(index, 1)
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
          if (res.data.success) {
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
            this.$router.replace({'path': '/activitySuccess'})
          } else {
            Toast(res.data.error.message)
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
        if (judgmentTel(this.telphone)) {
          this.confirm(data)
        }
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
          if (!judgmentTel(this.telphone)) {
            return
          }
          let num = 60
          var timer = null
          clearInterval(timer)
          this.isSendCode = true
          if (this.isDisabled) {
            this.axios({
              method: 'get',
              url: 'sendCode',
              params: {
                phoneno: this.telphone
              }
            }).then(res => {
              if (res.data.success) {
                this.isDisabled = false
                var _this = this
                timer = setInterval(function () {
                  num--
                  _this.sendCodeButton = num + 's后重新发送'
                  if (num === 0) {
                    clearInterval(timer)
                    num = 60
                    _this.isDisabled = true
                    _this.sendCodeButton = '发送验证码'
                    _this.isSendCode = false
                  }
                }, 1000)
              } else {
                Toast(res.data.error.message)
              }
            }).catch()
          }
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
              // this.telphone = ''
              this.$store.commit(types.USERPHONENO, this.telphone)
              this.verifyNo = ''
              this.needBind = false
              this.active = !this.active
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
    margin: 0 0 0.1rem;
    background: #ffffff;
  }
  .dinglian-alone-sign > .dinglian-alone-userinfo {
    font-size: 0.14rem;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    padding: 0 0.15rem;
  }
  .dinglian-alone-userinfo > input {
    text-align: right;
    background: #fff;
    color: #333;
    font-size: 0.14rem;
  }
  .dinglian-alone-userinfo > input:disabled {
    color: #333;
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
    width: 0.16rem;
    height:0.16rem;
    background: url("../../assets/images/add.svg") no-repeat center left;
    top: 50%;
    margin-top: -0.08rem;
    left: -0.26rem;
  }
  .dinglian-alone-addUsers {
    background: #ffffff;
    font-size: 0.14rem;
    margin-bottom: 0.5rem;
  }
  .dinglian-alone-addUsers > div {
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.15rem;
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
  .dinglian-alone-users input {
    background: #ffffff;
    color: #333333;
  }
  .dinglian-alone-users input:disabled {
    background: #ffffff;
    color: #333333;
  }
  .dinglian-alone-users > ul {
    display: flex;
    flex-flow: row nowrap;
  }
  .dinglian-alone-users > ul > li:first-of-type {
    height: 100%;
    width: 0.15rem;
    background: url("../../assets/images/delete.svg") no-repeat center;
  }
  .dinglian-alone-users > ul > li:nth-of-type(2) {
    padding-left: 0.25rem;
    width: 0.55rem;
    margin-right: 0.3rem;
    background-color: #ffffff;
  }
  .dinglian-alone-users > span {
    display: inline-block;
    background: url("../../assets/images/editBlack.svg") no-repeat center left;
    width: 0.28rem;
    padding: 0 0.05rem;
    background-origin: content-box;
    background-clip: content-box;
  }
  .dinglian-alone-button {
    background: #e63832;
    color: #ffffff;
    font-size: 0.15rem;
  }
  .dinglian-alone-whole > .editContent-phone-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0,0,0,0.7);
    padding:0;
    height: 100%;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    visibility: visible;
    z-index: 9;
  }
  .dinglian-alone-whole > .editContent-phone-content.active {
    background: rgba(0,0,0,0);
    visibility: hidden;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix {
    position: absolute;
    top: 1rem;
    right: 0;
    left: 0;
    margin:auto;
    width: 2.97rem;
    opacity:1;
    -webkit-border-radius:0.05rem;
    -moz-border-radius:0.05rem;
    border-radius:0.05rem;
    overflow: hidden;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    z-index: 9;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix.active {
    top: -3rem;
    opacity:0;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title {
    background: #ffd200;
    height: 0.44rem;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title > h3 {
    font-size: 0.17rem;
    font-family: 'PingFangSc';
    font-weight: normal;
    height: 100%;
    line-height: 0.44rem;
    position: relative;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title > h3 > span {
    position:absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 0.44rem;
    height: 0.44rem;
    background: url("../../assets/images/添加.svg") no-repeat center center;
    -webkit-background-size: 0.18rem;
    background-size: 0.18rem;
    transform: rotate(45deg);
    border-radius: 100%;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body {
    background: #F2F2F2;
    padding: 0.2rem;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div {
    height: 0.44rem;
    display:flex;
    padding: 0.075rem;
    justify-content: space-between;
    background: #fff;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin-bottom: 0.1rem;
    border: 1px solid #DDDDDD;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > p {
    height: 1px;
    margin-top: 0.15rem;
    background: #DDDDDD;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div:nth-of-type(3) {
    margin-top: 0.15rem;
    margin-bottom: 0;
    padding: 0;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input {
    font-size: 0.14rem;
    padding-left: 0.24rem;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input[type='tel'] {
    background: url("../../assets/images/people.svg") no-repeat left center;
    -webkit-background-size: 0.15rem;
    background-size: 0.15rem;
    width: 100%;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input[type='text'] {
    background: url("../../assets/images/yzm.svg") no-repeat left center;
    -webkit-background-size: 0.15rem;
    background-size: 0.15rem;
    width: 60%;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > span {
    /*width: 0.87rem;*/
    width:35%;
    height: 0.29rem;
    padding:0 0.06rem;
    background: #ffd200;
    color: #333;
    font-size: 0.1rem;
    -webkit-border-radius: 0.05rem;
    -moz-border-radius: 0.05rem;
    border-radius: 0.05rem;
    line-height: 0.29rem;
    text-align: center;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div .sendActive {
    background-color: #DDDDDD;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > button {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: #DDDDDD;
    color: #999;
    font-size: 0.15rem;
  }
  .dinglian-alone-whole > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > button.signUpActive {
    background: #ffd200;
    color: #333;
  }

</style>
