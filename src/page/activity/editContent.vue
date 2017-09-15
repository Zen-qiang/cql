<template>
  <div class="edit-all bColor" :class="{'active':!active}">
    <div class="dinglian-edit-title">
      <img :src="profilePicture" alt="">
      <input type="text" placeholder="输入活动名称" v-model="activityName" state="success">
    </div>
    <div class="dinglian-edit-belongsCircle" @click.stop="belongCircle">
      <label for="">所属圈子</label>
      <span v-if="circle">{{circle.name}}</span>
      <span v-else></span>
      <p :class="{'active':chooseCircle}"></p>
    </div>
    <div class="dinglian-edit-circleLists" :class="{'active':chooseCircle}">
    <ul>
        <li :key="item.id" v-for="item of circles" @click.stop="checkCircle(item)">{{item.name}}</li>
      </ul>
    </div>
    <!--上传图片 start-->
    <div class="dinglian-edit-photo" @click="takePictures">
      <i class="dinglian-edit-photoShow" v-show="localImgs.length ||  ioslocIds.length">
        <img :src="ioslocId" alt="选择图片" v-for="ioslocId in ioslocIds">
        <img :src="localId" alt="选择图片" v-for="localId in localImgs" v-show="!ioslocIds.length">
      </i>
    </div>
    <group>
      <datetime v-model="limitHourValue" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" @on-change="change">
        <span>时间</span><span v-text="times"></span>
      </datetime>
    </group>
    <!--test-->

    <div class="dinglian-edit-address">
      <label for="addr">地址</label>
      <input type="text" placeholder="自定义位置" v-model="address" id="addr">
      <span @click="getLocationGps"></span>
    </div>
    <div class="dinglian-edit-people">
      <label for="">人数</label>
      <input type="tel" v-model="minCount">&nbsp;至
      <input type="tel" v-model="maxCount">&nbsp;人
    </div>
    <div class="dinglian-edit-cost">
      <label for="">费用</label>
      <div class="edit-radio">
        <label for="" @click="checkCharge('free',1)"><span :class="{'active':charge=='free'}"></span><input type="radio" name="charge" value="free" v-model="charge">我请客</label>
        <label for="" @click="checkCharge('dutch')"><span :class="{'active':charge=='dutch'}"></span><input type="radio" name="charge" value="dutch" v-model="charge">现场AA</label>
      </div>
    </div>
    <div class="dinglian-edit-tel">
      <label for="">联系方式</label>
      <input type="tel" placeholder="请绑定电话号码" v-model="phoneNo" disabled>
      <span @click="active = !active" v-show="needBind">绑定</span>
    </div>
    <div class="dinglian-edit-public">
      <label for="">公开</label>
      <mt-switch v-model="switchOpen" class="edit-switch"></mt-switch>
    </div>
    <div class="dinglian-edit-psw" :class="{'active':!switchOpen}">
      <label for="">输入密码</label>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-edit-note" placeholder="活动备注" v-model="description"></textarea>
    <mt-button type="default" class="edit-button" @click.native="goNextStep" v-show="active">发布</mt-button>
    <!--绑定手机号 start-->
    <div class="editContent-phone-content" :class="{'active':active}">
      <div class="editContent-phone-fix" :class="{'active':active}">
        <div class="editContent-phone-title">
          <h3>绑定手机号<span @click="active = !active"></span></h3>
        </div>
        <div class="editContent-phone-body">
          <div><input type="tel" placeholder="请输入手机号" v-model="telphone"></div>
          <div><input type="text" placeholder="请输入验证码" v-model="verifyNo"><span @click.stop="sendCode()" :class="{sendActive: isSendCode}">{{sendCodeButton}}</span></div>
          <p></p>
          <div><button :class="{signUpActive: isSignUpActive}" @click="bindConfirm()">立即绑定</button></div>
        </div>
      </div>
    </div>
    <!--绑定手机号 end-->
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import * as types from '../../store/mutation-types'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import wx from 'weixin-js-sdk'
  import { judgmentTel } from '../../assets/js/tools'
  import { Datetime, Group } from 'vux'
  export default {
    components: {
      Datetime,
      Group
    },
    filters: {
      moment (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    computed: {
    },
    data () {
      return {
        startDate: '',
        endDate: '',
        times: '',
        date: new Date(),
        fullYear: '',
        month: '',
        day: '',
        hours: '',
        minutes: '',
        profilePicture: '',
        circles: [],
        circle: null,
        activityName: '',
        startTime: null,
        address: '',
        gps: ' ',
        minCount: '',
        maxCount: '',
        charge: '',
        phoneNo: '',
        isOpen: true,
        switchOpen: true,
        password: '',
        description: '',
        pictures: [],
        imgLists: [],
        imgFilesList: [],
        chooseCircle: false,
        activityNameSuccess: '',
        localImgs: [],
        ioslocIds: [],
        serverIds: [],
        limitHourValue: '',
        active: true,
        isSignUpActive: false,
        telphone: '',
        verifyNo: '',
        sendCodeButton: '发送验证码',
        needBind: false,
        currentInfo: {},
        isDisabled: true,
        isBindConfirm: false,
        isSendCode: false,
        stepTimes: ''
      }
    },
    watch: {
      minCount: function (val) {
        if (this.maxCount === '' && val > this.maxCount) {
          this.maxCount = val
        }
      },
      telphone: function (val) {
        if (val.length > 0) {
          this.isSignUpActive = true
        } else {
          this.isSignUpActive = false
        }
      }
    },
    created () {
//        获取用户头像
      if (this.$store.state.userPicture) {
        this.profilePicture = this.$store.state.userPicture
      }
//      绑定手机号
      if (this.$store.state.userPhoneNo && this.$store.state.userPhoneNo !== 'null') {
        this.phoneNo = this.$store.state.userPhoneNo
      } else {
        this.needBind = true
      }
//      获取圈子选择列表
      this.getMyCircles()
      /* 时间 */
      this.fullYear = this.date.getFullYear().toString()
      this.month = this.forMartTimes(this.date.getMonth() + 1)
      this.day = this.forMartTimes(this.date.getDate())
      this.hours = this.forMartTimes(this.date.getHours())
      this.minutes = this.forMartTimes(this.date.getMinutes())
      this.times = this.fullYear + '-' + this.month + '-' + this.day + ' ' + this.hours + ':' + this.minutes
      this.startDate = this.fullYear + '-' + this.month + '-' + this.day
      if (this.$store.state.currentAddress) {
        this.address = this.$store.state.currentAddress.address
        this.gps = this.$store.state.currentAddress.position
      }
      this.currentInfo = this.$store.state.currentInfo
      if (this.currentInfo) {
        this.activityName = this.currentInfo.activityName
        this.circle = this.currentInfo.circle
        if (this.currentInfo.localImgs) {
          this.localImgs = this.currentInfo.localImgs
        }
        if (this.currentInfo.ioslocIds) {
          this.ioslocIds = this.currentInfo.ioslocIds
        }
        if (this.currentInfo.serverIds) {
          this.serverIds = this.currentInfo.serverIds
        }
        this.times = this.currentInfo.times
        this.minCount = this.currentInfo.minCount
        this.maxCount = this.currentInfo.maxCount
        this.charge = this.currentInfo.charge
        this.isOpen = this.currentInfo.isOpen
        this.password = this.currentInfo.password
        this.description = this.currentInfo.description
      }
    },
    methods: {
      forMartTimes (val) {
        return val < 10 ? '0' + val : val.toString()
      },
      change (value) {
        this.times = value
      },
//      获取本地的gps 跳转地图
      getLocationGps () {
        this.currentInfo.activityName = this.activityName
        this.currentInfo.circle = this.circle
        this.currentInfo.localImgs = this.localImgs
        this.currentInfo.ioslocIds = this.ioslocIds
        this.currentInfo.serverIds = this.serverIds
        this.currentInfo.times = this.times
        this.currentInfo.minCount = this.minCount
        this.currentInfo.maxCount = this.maxCount
        this.currentInfo.charge = this.charge
        this.currentInfo.isOpen = this.isOpen
        this.currentInfo.password = this.password
        this.currentInfo.description = this.description
        this.$store.commit(types.CURRENTINFO, this.currentInfo)
        this.$router.push({'name': 'ActivityPosition'})
      },
//      拍照，上传照片
      takePictures () {
        var _this = this
        var imglen = _this.localImgs.length
        wx.chooseImage({
          count: 3 - imglen, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            _this.localImgs = _this.localImgs.concat(res.localIds)
            // 判断ios是不是用的 wkwebview 内核
            if (window.__wxjs_is_wkwebview) {
              for (var i = 0; i < res.localIds.length; i++) {
                wx.getLocalImgData({
                  localId: res.localIds[i], // 图片的localID
                  success: function (res) {
                    var localData = res.localData  // localData是图片的base64数据，可以用img标签显示
                    localData = localData.replace('jgp', 'jpeg')
                    _this.ioslocIds.push(localData)
                  }
                })
              }
            }
            for (var l = 0; l < res.localIds.length; l++) {
              wx.uploadImage({
                localId: res.localIds[l], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  _this.serverIds.push(res.serverId)
                }
              })
            }
          }
        })
      },
//        选择圈子
      belongCircle () {
        if (!this.chooseCircle) {
          this.chooseCircle = true
        } else {
          this.chooseCircle = false
        }
      },
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm (e) {

      },
      checkCharge (val) {
        this.charge = val
      },
      goNextStep () {
//        alert(Date.parse(this.times))
        if (this.$store.state.activityTags === 0) {
          Toast('标签不能为空')
          return false
        }
        if (!this.activityName) {
          Toast('标题不能为空')
          return false
        }
        if (this.serverIds.length === 0) {
          Toast('图片不能为空')
          return false
        }
        if (!this.address) {
          Toast('地址不能为空')
          return false
        }
        if (parseInt(this.minCount) < 1 || parseInt(this.maxCount) < parseInt(this.minCount)) {
          Toast('人数填写错误')
          return false
        }
        if (!this.charge) {
          Toast('费用不能为空')
          return false
        }
        if (!judgmentTel(this.phoneNo)) {
          return false
        }
        if (!this.description) {
          Toast('备注不能为空')
          return false
        }
        this.stepTimes = Date.parse(this.times) + ''
        alert(this.stepTimes)
        let formdata = new FormData()
        formdata.append('userId', this.$store.state.userId)
        formdata.append('tags', this.$store.state.activityTags)
        formdata.append('name', this.activityName)
        formdata.append('startTime', this.stepTimes)
        formdata.append('charge', this.charge)
        formdata.append('address', this.address)
        formdata.append('gps', this.gps)
        formdata.append('minCount', this.minCount)
        formdata.append('maxCount', this.maxCount)
        formdata.append('isOpen', this.isOpen)
        formdata.append('description', this.description)
        formdata.append('serverIds', this.serverIds)
        formdata.append('endTime', this.stepTimes)
        if (this.circle) {
          formdata.append('coterieId', this.circle.id)
        }
        if (this.phoneNo) {
          formdata.append('phoneNo', this.phoneNo)
        }
        if (!this.isOpen && this.password) {
          formdata.append('password', this.password)
        }
        this.axios({
          method: 'post',
          url: 'launchActivity',
          data: formdata
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.error.message)
          } else {
            this.$store.commit(types.ACTIVITYID, res.data.data.activityId)
            let circleObj = {
              id: res.data.data.coterieId,
              name: res.data.data.coterieName,
              cover: res.data.data.coterieCover,
              isRelease: true
            }
            this.$store.commit(types.CIRCLE, circleObj)
            this.currentInfo = {}
            this.$store.commit(types.CURRENTINFO, this.currentInfo)
            this.$router.push({'path': '/activitySuccess'})
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getMyCircles () {
        // 获取我的圈子列表
        if (this.$store.state.userId) {
          let param = {
            userId: this.$store.state.userId,
            dataType: '1',
            showLastCoterie: true
          }
          this.axios({
            method: 'get',
            url: 'getMyCoteries',
            params: param
          }).then(res => {
            this.circles = res.data.data
            if (this.circles.length === 1) {
              this.circle = this.circles[0]
            } else {
              for (var i in this.circles) {
                if (this.circles[i].isLastCoterie) {
                  this.circle = this.circles[i]
                  break
                }
              }
            }
          }).catch()
        }
      },
      checkCircle (circle) {
        this.circle = circle
        this.chooseCircle = false
      },
//    发送验证码
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
                  _this.sendCodeButton = num + 's后发送'
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
//    立即绑定
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
              this.phoneNo = this.telphone
              this.$store.commit(types.USERPHONENO, this.telphone)
              this.telphone = ''
              this.verifyNo = ''
              this.active = !this.active
              this.needBind = false
            }
          }).catch()
        }
      }
    }
  }
</script>
<style scoped>
  .edit-all {
    padding-bottom: 0.4rem;
    position: relative;
    overflow: hidden;
    height: auto;
  }
  .edit-all.active {
    height: 100%;
  }
  .edit-all > div {
    background: #fff;
    margin-bottom: 1px;
    padding: 0 0.15rem;
    overflow: hidden;
  }
  div[class^="dinglian"] {
    width: 100%;
    height: 0.5rem;
    font-size: 0.14rem;
    line-height: 0.5rem;
    text-align: left;
  }
  .edit-all > div > label:first-of-type {
    width: 0.8rem;
    display: inline-block;
    color: #999999;
  }
  /*标题*/
  .edit-all .dinglian-edit-title {
    height: 0.69rem;
    line-height: 0.69rem;
    position: relative;
  }
  .dinglian-edit-title img {
    position: absolute;
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .dinglian-edit-title input {
    font-size: 0.14rem;
    width: 100%;
    height: 100%;
    padding-left: 0.6rem;
  }
  .dinglian-edit-belongsCircle {
    position: relative;
  }
  .dinglian-edit-belongsCircle > span {
    background: #ffd200;
    height: 0.15rem;
    line-height: 0.15rem;
    font-size: 0.11rem;
    text-align: center;
    border-radius: 0.02rem;
    padding:0 0.03rem;
  }
  .dinglian-edit-belongsCircle > p {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.15rem;
    margin: auto;
    width: 0.1rem;
    height: 0.1rem;
    background: url("../../assets/images/jtcy.svg") no-repeat center center;
    transition: all 0.3s;
  }
  .dinglian-edit-belongsCircle > p.active {
    transform: rotate(90deg);
  }
  /*圈子列表*/
  .edit-all .dinglian-edit-circleLists {
    height: 0;
    margin-bottom: 0;
    transition: all 0.3s;
  }
  .edit-all .dinglian-edit-circleLists.active {
    height: 1.2rem;
    overflow: hidden;
    margin-bottom: 1px;
  }
  .edit-all .dinglian-edit-circleLists > ul {
    padding-top: 0.12rem;
    overflow: hidden;
  }
  .dinglian-edit-circleLists > ul > li {
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 0.11rem;
    color: #333333;
    float: left;
    background: #ffd200;
    border-radius: 0.02rem;
    margin-right: 0.07rem;
    margin-bottom: 0.1rem;
    padding: 0 0.09rem;
  }
/*上传图片*/
  .edit-all .dinglian-edit-photo {
    height: 1.1rem;
    position: relative;
    background: url("../../assets/images/upload.png") no-repeat left center;
    background-size: 100% 110px;
  }
  .dinglian-edit-photo > input[type=file] {
    position: absolute;
    left: -9999px;
  }
  .dinglian-edit-photo > label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
  }
  .dinglian-edit-photoShow {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background-color: #ffffff;
  }
  .dinglian-edit-photoShow > img {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.1rem;
  }

  .dinglian-edit-people > input {
    border: 0;
    outline: none;
    -webkit-appearance: none;
    width: 78px;
    height: 0.3rem;
    border: 1px solid #dddddd;
    border-radius: 0.04rem;
    padding-left: 0.1rem;
  }
  /*费用*/
  .dinglian-edit-cost > div > label {
    position: relative;
  }
  .dinglian-edit-cost > div > label [type="radio"] {
    opacity: 0;
  }
  .dinglian-edit-cost > div > label span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.03rem;
    margin: auto;
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
  }
  .dinglian-edit-cost > div > label span.active {
    background: #E63832;
  }
  .dinglian-edit-cost > div > label span:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -0.03rem;
    margin: auto;
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #E63832;
    border-radius: 50%;
  }
  .dinglian-edit-public {
    position: relative;
  }
  .edit-switch {
    height: 100%;
    position: absolute;
    right: 0.15rem;
    top: 0;
    color: #ffd200;
  }
  .dinglian-edit-note {
    margin-top: 0.1rem;
    width: 100%;
    padding: 0.15rem;
    overflow: hidden;
    font-size: 0.14rem;
  }
  .mint-datetime-picker {
    width: 100%;
  }
  .dinglian-edit-time > input {
    width: 100%;
  }
  .dinglian-edit-tel {
    position: relative;
  }
  .dinglian-edit-tel > input {
    height: 0.4rem;
    font-size: 0.14rem;
    background: #fff;
  }
  .dinglian-edit-tel > span {
    position:absolute;
    right: 0;
    color: #E63832;
    width: 0.6rem;
  }
  .dinglian-edit-address {
    position: relative;
  }
  .dinglian-edit-address > input {
    height: 0.4rem;
    font-size: 0.14rem;
    width: 1.8rem;
  }
  .dinglian-edit-address > span {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0.15rem;
    width: 0.3rem;
    height: 0.16rem;
    background: url("../../assets/images/address.svg") no-repeat center center;
    background-clip: content-box;
    background-origin: content-box;
  }
  .dinglian-edit-psw {
    height: 0!important;
    overflow: hidden;
    transition: all 0.3s;
  }
  .dinglian-edit-psw.active {
    height: 0.5rem!important;
  }
  .dinglian-edit-psw > input {
    height: 0.4rem;
    font-size: 0.14rem;
  }
  .mint-button--normal {
    display: block;
    margin-top: 0.2rem;
    position: absolute;
    bottom: 0;
  }
  /*绑定手机号*/
  .edit-all > .editContent-phone-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0,0,0,0.7);
    padding:0;
    height: 100%  ;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    visibility: visible;
  }
  .edit-all > .editContent-phone-content.active {
    background: rgba(0,0,0,0);
    visibility: hidden;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix {
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
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix.active {
    top: -3rem;
    opacity:0;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title {
    background: #ffd200;
    height: 0.44rem;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title > h3 {
    font-size: 0.17rem;
    font-family: 'PingFangSc';
    font-weight: normal;
    height: 100%;
    line-height: 0.44rem;
    position: relative;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-title > h3 > span {
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
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body {
    background: #F2F2F2;
    padding: 0.2rem;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div {
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
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > p {
    height: 1px;
    margin-top: 0.15rem;
    background: #DDDDDD;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div:nth-of-type(3) {
    margin-top: 0.15rem;
    margin-bottom: 0;
    padding: 0;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input {
    font-size: 0.14rem;
    padding-left: 0.24rem;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input[type='tel'] {
    background: url("../../assets/images/people.svg") no-repeat left center;
    -webkit-background-size: 0.15rem;
    background-size: 0.15rem;
    width: 100%;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > input[type='text'] {
    background: url("../../assets/images/yzm.svg") no-repeat left center;
    -webkit-background-size: 0.15rem;
    background-size: 0.15rem;
    width:60%;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > span {
    /*width: 0.87rem;*/
    height: 0.29rem;
    padding:0 0.06rem;
    background: #ffd200;
    color: #333;
    font-size: 0.1rem;
    -webkit-border-radius: 0.05rem;
    -moz-border-radius: 0.05rem;
    border-radius: 0.05rem;
    line-height: 0.29rem;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div .sendActive {
    background-color: #DDDDDD;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > button {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: #DDDDDD;
    color: #999;
    font-size: 0.15rem;
  }
  .edit-all > .editContent-phone-content > .editContent-phone-fix > .editContent-phone-body > div > button.signUpActive {
    background: #ffd200;
    color: #333;
  }
</style>
