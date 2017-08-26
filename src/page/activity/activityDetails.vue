<template>
  <div class="dinglian-details-all">
    <carousel :carouselList="carouselList"></carousel>
    <div class="dinglian-details-title clearfix">
      <input type="text" v-model="name">
      <span>金桥街舞1圈</span>
    </div>
    <div class="dinglian-details-chat clearfix">
      <img src="../../assets/images/circle.jpg" alt="">
      <div class="dinglian-details-chatNews">
        <div class="dinglian-details-chatNewsTop">
          <h4>上海潮爆了</h4>
          <span>10:10</span>
        </div>
        <p>[30条] 我就是那个残山剩水</p>
      </div>
    </div>
    <div class="dinglian-details-status">
      <label for="">状态</label>
      <input type="text" v-model="status">
      <mt-switch v-model="value" class="edit-switch"></mt-switch>
    </div>
    <div class="dinglian-details-status">
      <label for="">组织者</label>
      <input type="text" v-model="organizer">
      <span class="dinglian-details-mobile"></span>
    </div>
    <div class="dinglian-details-status">
      <label for="">时间</label>
      <input type="text" v-model="time">
      <span></span>
    </div>
    <div class="dinglian-details-status">
      <label for="">地址</label>
      <input type="text" v-model="address">
      <span class="dinglian-details-address"></span>
    </div>

    <div class="dinglian-details-sign">
      <label for="">报名信息</label>
      <span></span>
      <div></div>
    </div>
    <div class="dinglian-details-types">
      <label for="">类型</label>
      <input type="text" v-model="types">
    </div>
    <div class="dinglian-details-types">
      <label for="">标签</label>
      <ul class="dinglian-details-tags">
        <li>狼人杀</li>
        <li>狼人杀</li>
        <li>狼人杀</li>
      </ul>
    </div>
    <div class="dinglian-details-types">
      <label for="">费用</label>
      <input type="text" v-model="cost" style="color: red">
    </div>
    <div class="dinglian-details-types">
      <label for="">报名权限</label>
      <input type="text" v-model="authority">
    </div>
    <div class="dinglian-details-types remarks">
      <label for="">活动备注</label>
    </div>
    <textarea name="" id="" cols="30" rows="10" class="dinglian-details-textarea">
      是北京啊看看哪看看就撒DJ阿萨可能的
    </textarea>
    <mt-button type="default" style="margin-top: 10px" class="dinglian-button">报名参加</mt-button>
  </div>
</template>
<script>
  import Carousel from '../../components/carousel.vue'
  export default {
    components: {
      Carousel
    },
    data () {
      return {
        carouselList: [{
          imageUrl: require('../../assets/images/carousel0.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel1.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel2.jpg')
        }],
        name: '上海曹宝莉4人双人大',
        status: '报名中',
        organizer: '曹老板',
        time: '11：11：11',
        address: '漕宝路112号',
        types: '羽毛球',
        cost: 'AA制',
        authority: '非公开'
      }
    }
  }
</script>
<style scoped>
  div {
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .dinglian-details-all {
    height: 100%;
    background: #f2f2f2;
  }
  .dinglian-details-all > div {
    background: #ffffff;
  }
  .dinglian-details-title {

  }
  .dinglian-details-title > input {
    font-size: 14px;
    height: 100%;
    padding-left: 15px;
    float: left;
  }
  .dinglian-details-title > span {
    height: 15px;
    line-height: 15px;
    font-size: 11px;
    background: #ffd200;
    border-radius: 4px;
    float: left;
    margin-top: 18px;
  }
  .dinglian-details-chat {
    height: 65px;
    padding: 10px 15px;
    margin: 0 auto;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-details-chat >img {
    display: inline-block;
    width: 45px;
    height: 45px;
    float: left;
  }
  .dinglian-details-chatNews {
    height: 100%;
    overflow: hidden;
    padding-left: 22px;
  }
  .dinglian-details-chatNewsTop {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 14px;
  }
  .dinglian-details-chatNewsTop > h4 {
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
  }
  .dinglian-details-chatNewsTop > span {
    font-size: 11px;
    line-height: 14px;
    color: #999999;
  }
  .dinglian-details-chatNews > p {
    margin-top: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
  .dinglian-details-status {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .dinglian-details-status >label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
  }
  .dinglian-details-status > input {
    flex: 2;
  }
  .dinglian-details-status > span {
    height: 100%;
    width: 45px;
    display: inline-block;
  }
  .dinglian-details-sign {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-details-sign > label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
  }
  .dinglian-details-types {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    /*padding: 16px 15px;*/
    display: flex;
    flex-flow: row nowrap;
    /*justify-content: space-between;*/
  }
  .dinglian-details-types >label {
    height: 100%;
    display: inline-block;
    line-height: 50px;
    width: 80px;
    padding-left: 15px;
    color: #999999;
  }
  .remarks {
    border-bottom: none;
  }
  .remarks > label {
    color: #333333;
  }
  .dinglian-details-textarea {
    width: 100%;
    font-size: 12px;
    text-align: left;
    padding: 15px;
    padding-top: 0;
  }

  .edit-switch {
    padding-top: 9px;
  }
  .dinglian-details-mobile {
    background: url("../../assets/images/mobile.svg") no-repeat left center;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 5px;
  }
  .dinglian-details-address {
    background: url("../../assets/images/address.svg") no-repeat left center;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 5px;

  }
  .dinglian-details-tags {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    line-height: 50px;
    align-items: center;
  }
  .dinglian-details-tags > li {
    font-size: 11px;
    height: 18px;
    background-color: #999999;
    line-height: 14px;
    margin-right: 10px;
    border-radius: 3px;
    padding: 2px;
  }


</style>
