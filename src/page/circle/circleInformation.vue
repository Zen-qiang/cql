<!--圈子详情-->
<template>
  <div class="dinglian-circleInformation-whole bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <!--圈子头部 start-->
    <div class="dinglian-circleInformation-header">
      <div class="dinglian-circleInformation-avatar">
        <img :src="circle.cover" alt="圈子封面">
      </div>
      <div class="dinglian-circleInformation-name">
        <h3>{{circle.name}}</h3>
        <p>创建于 2018-9-15</p>
      </div>
    </div>
    <!--圈子头部 end-->

    <!--圈子介绍 start-->
    <div class="dinglian-circleInformation-introduction">
      <h4>圈子介绍</h4>
      <p>{{circle.description}}</p>
    </div>
    <!--圈子介绍 end-->

    <!--圈子功能 start-->
    <ul class="dinglian-circleInformation-features">
      <li>
        <div>所有成员</div>
        <div class="dinglian-circleInformation-allPeople">
          <ul>
            <li>34人</li>
            <li><img src="../../assets/images/people.svg" alt=""></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </li>
      <li @click="goCircleCode">
        <div>圈子二维码</div>
        <div class="dinglian-circleInformation-code"></div>
      </li>
      <li>
        <div>编辑圈子资料</div>
        <div class="dinglian-circleInformation-info"></div>
      </li>
      <li>
        <div>消息免打扰</div>
        <div class="dinglian-circleInformation-disturb">
          <mt-switch v-model="disturb" @change="changeCoteriePush">{{disturb}}</mt-switch>
        </div>
      </li>
    </ul>
    <!--圈子功能 end-->
    <!--退出圈子 start-->
    <div class="dinglian-circleInformation-dropOut">
      退出圈子
    </div>
    <!--退出圈子 end-->
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  export default {
    components: {
      DingLianHeader
    },
    created () {
      this.circle = this.$store.state.circle
      this.getCoterieMembers(this.circle.coterieId)
    },
    data () {
      return {
        headerName: '圈子资料',
        circle: {},
        coterieMembers: {},
        disturb: true
      }
    },
    methods: {
      // 获取圈子成员
      getCoterieMembers (coterieId) {
        this.axios({
          method: 'get',
          url: 'getCoterieMembers',
          params: {
            coterieId: coterieId
          }
        }).then(res => {
          if (res.data.success) {
            this.coterieMembers = res.data.data
          } else {
            Toast(res.data.error.message)
          }
        })
      },
      // 圈子二维码
      goCircleCode () {
        this.$router.push({'path': '/qrCode'})
      },
      changeCoteriePush () {
        this.axios({
          method: 'get',
          url: 'changeCoteriePush',
          params: {
            userId: this.$store.state.userId,
            coterieId: this.circle.coterieId,
            allowPush: this.disturb
          }
        }).then(res => {
          res.data.success ? Toast('消息推送切换成功') : Toast(res.data.error.message)
        })
      }
    }
  }
</script>
<style scoped>
  /*圈子头部 start*/
  .dinglian-circleInformation-header {
    height: 0.64rem;
    background-color: #ffffff;
    padding: 0.1rem 0.15rem;
    font-size: 0.16rem;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    margin-bottom: 1px;
  }
  .dinglian-circleInformation-avatar {
    width: 0.44rem;
    height: 0.44rem;
  }
  .dinglian-circleInformation-avatar > img {
    display: block;
    width: 0.44rem;
    height: 0.44rem;
  }
  .dinglian-circleInformation-name {
    padding-left: 0.15rem;
  }
  .dinglian-circleInformation-name > h3 {
    font-family: ﻿PingFangSC-Light;
    font-size: 0.16rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    text-align: left;
    padding-top: 0.05rem;
  }
  .dinglian-circleInformation-name > p {
    font-family: ﻿PingFangSC-Thin;
    font-size: 0.11rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -0.4px;
    color: #999999;
    text-align: left;
    margin-top: 0.06rem;
    height: 0.1rem;
    line-height: 0.1rem;
  }
  /*圈子头部 end*/

  /*圈子介绍 start*/
  .dinglian-circleInformation-introduction {
    font-size: 12px;
    background-color: #ffffff;
    padding: 0.15rem;
    text-align: left;
    margin-bottom: 0.1rem;
  }
  .dinglian-circleInformation-introduction > h4 {
    color: #333333;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-size: 0.14rem;
  }
  .dinglian-circleInformation-introduction > p {
    padding-top: 0.11rem;
    line-height: 0.2rem;
    letter-spacing: -0.5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: #999999;
  }
  /*圈子介绍 end*/

  /*圈子功能 start*/
  .dinglian-circleInformation-features {
    color: #333333;
    font-size: 0.14rem;
    background-color: #ffffff;
    margin-bottom: 0.27rem;
  }
  .dinglian-circleInformation-features > li {
    height: 0.51rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #DDDDDD;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 0.15rem;
    justify-content: space-between;
    padding-right: 0;
  }
  .dinglian-circleInformation-features > li > div:first-of-type {
    letter-spacing: 1.4px;
    color: #333333;
    text-align: left;
  }
  .dinglian-circleInformation-code {
    width: 0.5rem;
    background: url("../../assets/images/qr999.svg") no-repeat center right;
    background-size: 0.16rem 0.16rem;
    background-position-x: 0.15rem;
  }
  .dinglian-circleInformation-info {
    width: 0.5rem;
    background: url("../../assets/images/jtcy999.svg") no-repeat center right;
    background-size: 0.09rem 0.16rem;
    background-position-x: 0.22rem;
  }
  .dinglian-circleInformation-allPeople {
    width: 1.5rem;
    font-size: 0.11rem;
    color: #999999;
  }
  .dinglian-circleInformation-allPeople > ul {
    display: flex;
    flex-flow: row-reverse nowrap;
    height: 100%;
    align-items: center;
    background: url("../../assets/images/jtcy999.svg") no-repeat right center;
    background-size: 0.09rem 0.16rem;
    padding-right: 0.15rem;
    background-origin: content-box;
  }
  .dinglian-circleInformation-allPeople > ul > li {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    line-height: 0.25rem;
    margin-right: 0.05rem;
  }
  .dinglian-circleInformation-allPeople > ul > li:first-of-type {
    font-size: 0.11rem;
    width: 0.38rem;
    padding-right: 0.08rem;
  }
  .dinglian-circleInformation-disturb {
    display: flex;
    align-items: center;
    padding-right: 0.15rem;
  }
  /*圈子功能 end*/

  /*退出圈子 start*/
  .dinglian-circleInformation-dropOut {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #333333;
    text-align: left;
    font-size: 0.14rem;
    background-color: #ffffff;
    padding-left: 0.15rem;
  }
  /*退出圈子 end*/
</style>
