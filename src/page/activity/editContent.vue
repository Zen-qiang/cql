<template>
  <div class="edit-all">
    <div class="dinglian-edit-title">
      <div>
        <img :src="profilePicture" alt="">
      </div>
      <input type="text" placeholder="输入活动名称" v-model="activityName" state="success">
    </div>
    <div class="dinglian-edit-belongsCircle" @click.stop="belongCircle">
      <label for="">所属圈子</label>
      <span v-if="circle">{{circle.name}}</span>
      <span v-else></span>
    </div>
    <div class="dinglian-edit-circleLists" v-show="chooseCircle">
      <ul>
        <li :key="item.id" v-for="item of circles" @click.stop="checkCircle(item)">{{item.name}}</li>
      </ul>
    </div>
    <!--上传图片 start-->
    <!--<div class="dinglian-edit-photo">
      <input id="photo" accept="image/*" :capture="capture" type="file" @change="uploadPhoto" multiple />
      <label for="photo" style="width: 100%;margin-left: 0"></label>
      <i class="dinglian-edit-photoShow"v-show="imgLists.length">
        <img :src="photo" alt="" v-for="photo in imgLists">
      </i>
    </div>-->
    <div class="dinglian-edit-photo" @click="takePictures">
      <i class="dinglian-edit-photoShow" v-show="localImgs.length">
        <img :src="localId" alt="选择图片" v-for="localId in localImgs">
      </i>
    </div>
    <!--上传图片 end-->
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      year-format="{value}"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-Format="{value} 点"
      minute-Format="{value} 分"
      v-model="startTime"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
    <div @click="$refs.picker.open()" class="dinglian-edit-time">
      <label for="">时间</label>
      <span>{{startTime | moment}}</span>
      <!--<input type="text" v-model="startTime">-->
    </div>
    <div class="dinglian-edit-address">
      <label for="">地址</label>
      <input type="text" placeholder="自定义位置" v-model="address">
    </div>
    <div class="dinglian-edit-people">
      <label for="">人数</label>
      <input type="tel" v-model="minCount">&nbsp;至
      <input type="tel"v-model="maxCount">&nbsp;人
    </div>
    <div class="dinglian-edit-cost">
      <label for="">费用</label>
      <div class="edit-radio">
        <label for="" @click="checkCharge('free')"><input type="radio" name="charge" value="free" v-model="charge">我请客</label>
        <label for="" @click="checkCharge('dutch')"><input type="radio" name="charge" value="dutch" v-model="charge">现场AA</label>
      </div>
    </div>
    <div class="dinglian-edit-tel">
      <label for="">联系方式</label>
      <input type="tel" placeholder="请输入电话号码" v-model="phoneNo">
    </div>
    <div class="dinglian-edit-public">
      <label for="">公开</label>
      <mt-switch v-model="isOpen" class="edit-switch"></mt-switch>
    </div>
    <div class="dinglian-edit-psw" v-show="!isOpen">
      <label for="">输入密码</label>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-edit-note" placeholder="活动备注" v-model="description"></textarea>
    <mt-button type="default" class="edit-button" @click.native="goNextStep">创建新活动</mt-button>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import * as types from '../../store/mutation-types'
//  import lrz from '../../../static/lrz/lrz.bundle'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import wx from 'weixin-js-sdk'
  export default {
    filters: {
      moment (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    data () {
      return {
        startDate: new Date(),
        endDate: new Date('2018-12-12'),
        isEdit: false,
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
        password: '',
        description: '',
        pictures: [],
        imgLists: [],
        imgFilesList: [],
        chooseCircle: false,
//        capture: 'camera',
        activityNameSuccess: '',
        localImgs: '',
        serverIds: [],
        ready: false
      }
    },
    created () {
//      this.judgmentIos()
      if (this.$store.state.userPicture) {
        this.profilePicture = this.$store.state.userPicture
      }
      this.getMyCircles()
    },
    mounted () {
      this.axios({
        method: 'get',
        url: '/getWxConfig',
        params: {
          url: location.href.split('#')[0]
        }
      }).then(res => {
        wx.config({
          debug: false,
          appId: res.data.data.appId,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: [
            'chooseImage',
            'downloadImage',
            'uploadImage',
            'getLocalImgData'
          ]
        })
        this.ready = true
      }).catch(error => {
        Toast(error)
        this.ready = false
      })
    },
    beforeRouteEnter (to, from, next) {
      let u = navigator.userAgent
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && to.path !== location.pathname) {
        location.assign(to.fullPath)
      } else {
        next()
      }
    },
    methods: {
      takePictures () {
        var _this = this
        if (_this.ready) {
          wx.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
//              _this.localImgs = res.localIds
              _this.uploadImg(res.localIds)
            }
          })
        }
      },
      uploadImg (e) {
        var vm = this
        let equipment = navigator.userAgent
        let isIos = !!equipment.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isIos) {
          e.forEach(imgs => {
            wx.getLocalImgData({
              localId: imgs, // 图片的localID
              success: function (res) {
                Toast(res.localData)
                vm.localImgs.push(res.localData)
              }
            })
          })
        } else {
          vm.localImgs = e
        }
        e.forEach(li => {
          wx.uploadImage({
            localId: li, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              vm.serverIds.push(res.serverId)
            }
          })
        })
      },
//        判断移动设备
//      judgmentIos () {
//        let u = navigator.userAgent
//        let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
//        if (isIos) {
//          this.capture = false
//        } else {
//          this.capture = 'camera'
//        }
//      },
//        选择圈子
      belongCircle () {
        if (!this.chooseCircle) {
          this.chooseCircle = true
        } else {
          this.chooseCircle = false
        }
      },
//      上传图片
//      uploadPhoto (e) {
//        let vm = this
//        vm.imgLists = []
//        vm.imgFilesList = []
//        var files = e.target.files || e.dataTransfer.files
//        if (files.length >= 1 && files.length <= 3) {
//          for (let i = 0; i < files.length; i++) {
//            lrz(files[i], {width: 450}).then(res => {
//              res.base64 = res.base64 + ''
//              vm.imgLists.push(res.base64)
//              // vm.imgFilesList.push(res.file)
//              vm.imgFilesList.push(res.formData.get('file'))
//            }).always(function () {
//              e.target.value = null
//            })
//          }
//        } else {
//          Toast('不允许上传图片超过3张！')
//        }
//      },
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm (e) {

      },
      checkCharge (val) {
        this.charge = val
      },
      goNextStep () {
        Toast(this.localImgs)
        if (!this.activityName) {
          Toast('标题不能为空')
          return false
        }
        if (!this.address) {
          Toast('地址不能为空')
          return false
        }
        if (!this.minCount && !this.maxCount && !(this.minCount < this.maxCount)) {
          Toast('人数错误')
          return false
        }
        if (!this.description) {
          Toast('备注不能为空')
          return false
        }
        if (this.serverIds.length === 0) {
          Toast('图片不能为空')
          return false
        }
        let formdata = new FormData()
        formdata.append('userId', this.$store.state.userId)
        formdata.append('tags', this.$store.state.activityTags)
        formdata.append('name', this.activityName)
        formdata.append('startTime', this.startTime.valueOf())
        formdata.append('charge', this.charge)
        formdata.append('address', this.address)
        formdata.append('gps', this.gps)
        formdata.append('minCount', this.minCount)
        formdata.append('maxCount', this.maxCount)
        formdata.append('isOpen', this.isOpen)
        formdata.append('description', this.description)
        formdata.append('serverIds', this.serverIds)
//        for (var i in this.imgFilesList) {
//          let idx = parseInt(i) + 1
//          formdata.append('pic' + idx, this.imgFilesList[i])
//        }
//        let data = {
//          userId: this.$store.state.userId,
//          tags: this.$store.state.activityTags,
//          name: this.activityName,
//          startTime: this.startTime,
//          charge: this.charge,
//          address: this.address,
//          gps: this.gps,
//          minCount: this.minCount,
//          maxCount: this.maxCount,
//          isOpen: this.isOpen,
//          description: this.description
//        }
        if (this.circle) {
//          data.coterieId = this.circle.id
          formdata.append('coterieId', this.circle.id)
        }
        if (this.phoneNo) {
//          data.phoneNo = this.phoneNo
          formdata.append('phoneNo', this.phoneNo)
        }
        if (!this.isOpen && this.password) {
//          data.password = this.password
          formdata.append('password', this.password)
        }
//        if (this.pictures.length > 0) {
//          data.pictures = this.pictures
//        }
        this.axios({
          method: 'post',
          url: this.isEdit ? 'editActivity' : 'launchActivity',
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
            for (var i in this.circles) {
              if (this.circles[i].isLastCoterie) {
                this.circle = this.circles[i]
                break
              }
            }
          }).catch()
        }
      },
      checkCircle (circle) {
        this.circle = circle
        this.chooseCircle = false
      }
    }
  }
</script>
<style scoped>
  .edit-all {
    width: 100%;
    /*overflow: hidden;*/
    margin-bottom: 0.4rem;
    position: relative;
  }
  div[class^="dinglian"] {
    width: 100%;
    height: 0.5rem;
    border-bottom: 1px solid #dddddd;
    font-size: 14px;
    line-height: 0.5rem;
    text-align: left;
  }
  .edit-all > div > label:first-of-type {
    margin-left: 15px;
    width: 0.8rem;
    display: inline-block;
    color: #999999;
  }
  /*标题*/
  .edit-all .dinglian-edit-title {
    height: 0.69rem;
    line-height: 0.69rem;
    overflow: hidden;
    padding-left: 0.15rem;
  }
  .dinglian-edit-title  img {
    display: inline-block;
    width: 0.44rem;
    height: 0.44rem;
    vertical-align:middle;
  }
  .dinglian-edit-title > div {
    display: inline-block;
  }
  input {
    height: 100%;
  }
  .dinglian-edit-belongsCircle > span {
    background: #ffd200;
    height: 15px;
    line-height: 15px;
    font-size: 11px;
    text-align: center;
    border-radius: 4px;
  }
  /*圈子列表*/
  .edit-all .dinglian-edit-circleLists {
    height: 1rem;
  }
  /*.dinglian-edit-circleLists {*/
    /*width: 100%;*/
  /*}*/
  .edit-all .dinglian-edit-circleLists > ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    /*height: 100%;*/
    padding-right: 0.1rem;
    padding-top: 0.12rem;
    padding-left: 0.15rem;
  }
  .dinglian-edit-circleLists > ul > li {
    display: inline-block;
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 11px;
    color: #333333;
    float: left;
    background: #ffd200;
    border-radius: 5px;
    margin-right: 7px;
    margin-bottom: 5px;
    padding: 0 10px;
  }
/*上传图片*/
  .edit-all .dinglian-edit-photo {
    height: 110px;
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
    margin-left: 10px;
  }

  .dinglian-edit-people > input {
    border: 0;
    outline: none;
    -webkit-appearance: none;
    width: 78px;
    height: 30px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 10px;
  }
  .dinglian-edit-public {
    position: relative;
  }
  .edit-switch {
    height: 100%;
    position: absolute;
    right: 15px;
    top: 0;
    color: #ffd200;
  }
  .dinglian-edit-note {
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #dddddd;
  }
  .mint-datetime-picker {
    width: 100%;
  }
  .dinglian-edit-time > input {
    width: 100%;
  }
  .dinglian-edit-tel > input {
    height: 0.4rem;
  }
  .dinglian-edit-address > input {
    height: 0.4rem;
  }
  .dinglian-edit-psw > input {
    height: 0.4rem;
  }
</style>
