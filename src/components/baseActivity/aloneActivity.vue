<template>
  <div style="background: #ffffff">
      <div class="clearfix dinglian-lists-con">
        <div class="dinglian-lists-con-left">
          <img src="../../assets/images/circle.jpg" alt="">
        </div>
        <div class="dinglian-lists-con-right">
          <div class="dinglian-lists-title clearfix">
            <h3>全部的标题</h3>
            <span class="dinglian-lists-circleTag">金桥1圈</span>
          </div>
          <div class="dinglian-lists-tags clearfix">
            <span class="fs_11">桌游</span>
            <span class="fs_11">桌游</span>
          </div>
          <div class="dinglian-lists-cost">免费</div>
          <div class="dinglian-lists-people clearfix">
            <span><em class="dinglian-lists-status"></em>进行中</span>
            <span> <i>3</i> /5~9人</span>
          </div>
          <div class="dinglian-lists-people dinglian-lists-address clearfix">
            <span>门行路手术室</span>
            <span>5.6km</span>
          </div>
        </div>
      </div>
    <div class="dinglian-lists-footer clearfix" v-show="footer">
      <span>12</span>
      <span>23</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AloneActivity',
    props: {
      footer: {
        type: Boolean
      }
    },
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .dinglian-lists-con {
    height: 140px;
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
    padding-right: 18px;
  }
  .dinglian-lists-title {

  }
  .dinglian-lists-title > h3 {
    font-size: 14px;
    text-align: left;
    height: 15px;
    line-height: 15px;
    float: left;
  }
  .dinglian-lists-title > span {
    float: right;
    font-size: 11px;
    background: #ffd200;
    border-radius: 4px;
    padding: 0 3px;
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
  .dinglian-lists-cost {
    color: #e63832;
    font-size: 14px;
    text-align: left;
    margin-top: 9px;
  }
  .dinglian-lists-people {
    margin-top: 10px;
    text-align: left;
    font-size: 11px;
  }
  .dinglian-lists-people span:first-child {
    float: left;
  }
  .dinglian-lists-people span:last-child {
    float: right;
  }
  .dinglian-lists-address {
    margin-top: 9px;
  }
  /*底部点赞*/
  .dinglian-lists-footer {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #dddddd;
    text-align: left;
  }
  .dinglian-lists-footer span {
    font-size: 11px;
    color: #999999;
    display: inline-block;
    height: 100%;
    float: left;
  }
  .dinglian-lists-footer span:first-of-type {
    margin-left: 41px;
    background: url("../../assets/images/comment.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  .dinglian-lists-footer span:last-of-type {
    margin-left: 75px;
    background: url("../../assets/images/like.svg") no-repeat left center;
    background-size: 14px 14px;
    padding-left: 19px;
  }
  /*状态点*/
  .dinglian-lists-status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #ffd200;
    margin-right: 5px;
  }
</style>
