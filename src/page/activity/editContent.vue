<template>
  <div class="edit-all">
    <div class="dinglian-edit-title">
      <div>
        <img src="../../assets/images/like.svg" alt="">
      </div>
      <input type="text" placeholder="输入活动名称">
    </div>
    <div class="dinglian-edit-belongsCircle">
      <label for="">所属圈子</label>
      <span>金桥街舞1圈</span>
    </div>
    <div class="dinglian-edit-circleLists">
      <ul>
        <li>以活动之名创建</li>
        <li>街舞一圈</li>
        <li>街舞一圈</li>
        <li>街舞一圈</li>
        <li>街舞一圈</li>
        <li>街舞一圈</li>
      </ul>
    </div>
    <div class="dinglian-edit-photo">

    </div>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="pickerValue">
    </mt-datetime-picker>
    <div @click="openPicker" class="dinglian-edit-time">
      <label for="">时间</label>
      <input type="text">
    </div>
    <div class="dinglian-edit-address">
      <label for="">地址</label>
      <input type="text" placeholder="自定义位置">
    </div>
    <div class="dinglian-edit-people">
      <label for="">人数</label>
      <input type="tel">&nbsp;至
      <input type="tel">&nbsp;人
    </div>
    <div class="dinglian-edit-cost">
      <label for="">费用</label>
      <div class="edit-radio">
        <label for=""><input type="radio" name="cost" />我请客</label>
        <label for=""><input type="radio" name="cost">现场AA</label>
      </div>
    </div>
    <div class="dinglian-edit-tel">
      <label for="">联系方式</label>
      <input type="tel" placeholder="请输入电话号码">
    </div>
    <div class="dinglian-edit-public">
      <label for="">公开</label>
      <mt-switch v-model="value" class="edit-switch"></mt-switch>
    </div>
    <div class="dinglian-edit-psw">
      <label for="">输入密码</label>
      <input type="password" placeholder="请输入密码">
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-edit-note" placeholder="活动备注"></textarea>
    <mt-button type="default" class="edit-button">创建新活动</mt-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pickerValue: ''
      }
    },
    methods: {
      openPicker () {
        this.$refs.picker.open()
      }
    }
  }
</script>
<style scoped>
  .edit-all {
    width: 100%;
    overflow: hidden;
  }
  div[class^="dinglian"] {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    font-size: 14px;
    line-height: 50px;
    text-align: left;
  }
  .edit-all > div > :first-child {
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

  .edit-all .dinglian-edit-photo {
    height: 110px;
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

</style>
