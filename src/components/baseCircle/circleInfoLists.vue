<template>
  <div>
    <ul class="dinglian-lists-ul">
      <li class="clearfix dinglian-lists-con">
        <div class="dinglian-lists-con-left">
          <img src="../../assets/images/circle.jpg" alt="">
        </div>
        <div class="dinglian-lists-con-right">
          <h3>全部的标题</h3>
          <div class="dinglian-lists-statistics clearfix">
            <span class="fs_11">成员350</span>
            <span class="fs_11">话题452</span>
            <span class="fs_11">活动8</span>
          </div>
          <div class="dinglian-lists-tags clearfix">
            <span class="fs_11">桌游</span>
            <span class="fs_11">桌游</span>
          </div>
          <p>单价你代付克罗米芬莱克罗米芬莱克罗米芬莱克罗米芬莱克斯大三大四的打顿你...</p>
        </div>
      </li>
      <li class="clearfix dinglian-lists-con">
        <div class="dinglian-lists-con-left">
          <img src="../../assets/images/circle.jpg" alt="">
        </div>
        <div class="dinglian-lists-con-right">
          <h3>全部的标题</h3>
          <div class="dinglian-lists-statistics clearfix">
            <span class="fs_11">成员350</span>
            <span class="fs_11">话题452</span>
            <span class="fs_11">活动8</span>
          </div>
          <div class="dinglian-lists-tags clearfix">
            <span class="fs_11">桌游</span>
            <span class="fs_11">桌游</span>
          </div>
          <p>单价你代付克罗米芬莱克罗米芬莱克罗米芬莱克罗米芬莱克斯大三大四的打顿你...</p>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    name: 'CircleInfoLists',
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .dinglian-lists-con {
    height: 130px;
    border-bottom: 1px solid #dddddd;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 31%;
    padding: 15px 0;
    padding-left: 15px;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    width: 69%;
    height: 100%;
    padding-top: 14px;
    padding-left: 13px;
  }
  .dinglian-lists-con-right > h3 {
    font-size: 14px;
    text-align: left;
    height: 15px;
    line-height: 15px;
  }
  .dinglian-lists-statistics {
    text-align: left;
    height: 11px;
    line-height: 11px;
    padding-top: 5px;
  }
  .dinglian-lists-statistics > span {
    color: #999999;
    display: inline-block;
    float: left;
    margin-left: 13px;
  }
  .dinglian-lists-statistics > span:first-of-type {
    margin-left: 0;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 18px;
    line-height: 18px;
    margin-top: 7px;

  }
  .dinglian-lists-tags > span {
    display: inline-block;
    float: left;
    border-radius: 4px;
    background: #f2f2f2;
    margin-right: 7px;
    padding: 2px;
  }
  .dinglian-lists-con-right > p {
    margin-top: 17px;
    font-size: 12px;
    height: 29px;
    text-align: left;
    margin-right: 15px;
  }
</style>
