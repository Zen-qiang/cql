<template>
  <div class="edit-all">
    <div class="dinglian-edit-title">
      <div>
        <img :src="profilePicture" alt="">
      </div>
      <input type="text" placeholder="输入活动名称" v-model="activityName">
    </div>
    <div class="dinglian-edit-belongsCircle">
      <label for="">所属圈子</label>
      <span v-if="circle">{{circle.name}}</span>
      <span v-else></span>
    </div>
    <div class="dinglian-edit-circleLists">
      <ul>
        <li>以活动之名创建</li>
        <li :key="item.id" v-for="item of circles" @click="checkCircle(item)">{{item.name}}</li>
      </ul>
    </div>
    <!--上传图片 start-->
    <div class="dinglian-edit-photo">
      <input id="photo" accept="image/*" capture="camera" type="file" @change="uploadPhoto" multiple />
      <label for="photo" style="width: 100%"></label>
      <i class="dinglian-edit-photoShow">
        <img :src="photo" alt="" v-for="photo in imgLists">
      </i>
    </div>
    <!--上传图片 end-->
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      year-format="{value}"
      month-format="{value}"
      date-format="{value}"
      hour-Format="{value}"
      minute-Format="{value}"
      v-model="startTime">
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
  import lrz from '../../../static/lrz/lrz.bundle'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  export default {
    filters: {
      moment (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    data () {
      return {
        isEdit: false,
        profilePicture: '',
        circles: [],
        circle: null,
        activityName: '',
        startTime: null,
        address: '',
        gps: '',
        minCount: '',
        maxCount: '',
        charge: '',
        phoneNo: '',
        isOpen: true,
        password: '',
        description: '',
        pictures: [],
        imgLists: []
      }
    },
    created () {
      if (this.$store.state.userPicture) {
        this.profilePicture = this.domain.resourceUrl + this.$store.state.userPicture + '?' + Math.random()
      }
      this.getMyCircles()
    },
    methods: {
//      上传图片
      uploadPhoto (e) {
        let vm = this
        var files = e.target.files || e.dataTransfer.files
        if (files.length >= 1 && files.length <= 3) {
          for (let i = 0; i < files.length; i++) {
            lrz(files[i], {width: 450}).then(res => {
              res.base64 = res.base64 + ''
              vm.imgLists.push(res.base64)
            }).always(function () {
              e.target.value = null
            })
          }
        } else {
          Toast('不允许上传图片超过3张！')
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
        let data = {
          userId: this.$store.state.userId,
          tags: this.$store.state.activityTags,
          name: this.activityName,
          startTime: this.startTime,
          charge: this.charge,
          address: this.address,
          gps: this.gps,
          minCount: this.minCount,
          maxCount: this.maxCount,
          isOpen: this.isOpen,
          description: this.description
        }
        if (this.circle) {
          data.coterieId = this.circle.id
        }
        if (this.phoneNo) {
          data.phoneNo = this.phoneNo
        }
        if (!this.isOpen && this.password) {
          data.password = this.password
        }
        if (this.pictures.length > 0) {
          data.pictures = this.pictures
        }
        // console.log(data)
        this.axios({
          method: 'post',
          url: this.isEdit ? 'editActivity' : 'launchActivity',
          data: data
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.message)
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
      }
    }
  }
</script>
<style scoped>
  .edit-all {
    width: 100%;
    /*overflow: hidden;*/
    margin-bottom: 40px;
  }
  div[class^="dinglian"] {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    font-size: 14px;
    line-height: 50px;
    text-align: left;
  }
  .edit-all > div > label:first-of-type {
    margin-left: 15px;
    width: 80px;
    display: inline-block;
    color: #999999;
  }
  /*标题*/
  .edit-all .dinglian-edit-title {
    height: 69px;
    line-height: 69px;
    overflow: hidden;
    padding-left: 15px;
  }
  .dinglian-edit-title  img {
    display: inline-block;
    width: 44px;
    height: 44px;
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
    height: 84px;
  }
  .dinglian-edit-circleLists {
    width: 100%;
  }
  .edit-all .dinglian-edit-circleLists > ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    padding-right: 10px;
    padding-top: 12px;
    padding-left: 15px;
  }
  .dinglian-edit-circleLists > ul > li {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 11px;
    color: #333333;
    float: left;
    background: #ffd200;
    border-radius: 5px;
    margin-right: 7px;
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

</style>
