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
        <p>创建于 {{circle.creationDate}}</p>
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
      <router-link :to="{name: 'CircleMembers', params: {cid: $route.params.cid}}" tag="li">
        <div>所有成员</div>
        <div class="dinglian-circleInformation-allPeople">
          <ul>
            <li>{{coterieMembersCnt + 1}}人</li>
            <li><img :src="managePicture" alt=""></li>
            <li v-for="item in membersPic"><img :src="item" alt="成员"></li>
          </ul>
        </div>
      </router-link>
      <li @click="goCircleCode">
        <div>圈子二维码</div>
        <div class="dinglian-circleInformation-code"></div>
      </li>
      <li @click="goEditCircle($route.params.cid)" v-show="circle.isCreator">
        <div>编辑圈子资料</div>
        <div class="dinglian-circleInformation-info"></div>
      </li>
      <li>
        <div>消息免打扰</div>
        <div class="dinglian-circleInformation-disturb">
          {{disturb ? '免打扰' : '接收信息'}}&nbsp;&nbsp;
          <mt-switch v-model="disturb" @change="changeCoteriePush"></mt-switch>
        </div>
      </li>
    </ul>
    <!--圈子功能 end-->
    <!--退出圈子 start-->
    <div class="dinglian-circleInformation-dropOut" @click="cancelCircle">
      退出圈子
    </div>
    <div v-show="sheetVisible" class="dinglian-circleInformation-sheet" @click.stop="cancelCircle">
      <ul class="dinglian-circleInformation-cancel">
        <li class="dinglian-circleInformation-creator" v-show="circle.isCreator">你是创建者，退出将解散该圈子！</li>
        <li @click.stop="exitCircle" class="dinglian-circleInformation-exit">退出圈子</li>
        <li @click.stop="cancelCircle">取消</li>
      </ul>
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
      this.getCoterieInfo()
      this.getCoterieMembers(this.$route.params.cid)
    },
    data () {
      return {
        headerName: '圈子资料',
        circle: {},
        coterieMembers: {},
        disturb: '',
        coterieMembersCnt: 0,
        managePicture: '',
        membersPic: [],
        sheetVisible: false
      }
    },
    methods: {
      exitCircle () {
        if (this.circle.isCreator) {
          this.axios({
            method: 'get',
            url: 'dismissCoterie',
            params: {
              userId: this.$store.state.userId,
              coterieId: this.$route.params.cid
            }
          }).then(res => {
            if (res.data.success) {
              Toast('解散圈子成功！')
              this.$router.replace({'path': '/circleDetails/' + this.$route.params.cid})
            } else {
              Toast(res.data.error.message)
            }
          })
        } else {
          this.axios({
            method: 'post',
            url: 'joinCoterie',
            data: {
              userId: this.$store.state.userId,
              coterieId: this.$route.params.cid,
              isJoin: false
            }
          }).then(res => {
            if (res.data.success) {
              Toast('退出圈子成功！')
              this.$router.replace({'path': '/circleDetails/' + this.$route.params.cid})
            } else {
              Toast(res.data.error.message)
            }
          })
        }
      },
      // 切换是否退出圈子
      cancelCircle () {
        this.sheetVisible = !this.sheetVisible
      },
      // 获取圈子信息
      getCoterieInfo () {
        this.axios({
          method: 'get',
          url: 'getCoterieInfo',
          params: {
            coterieId: this.$route.params.cid,
            userId: this.$store.state.userId
          }
        }).then(res => {
          if (res.data.success) {
            this.circle = res.data.data
            this.disturb = !res.data.data.allowPush
          } else {
            Toast(res.data.error.message)
          }
        })
      },
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
            this.membersPic = []
            this.coterieMembers = res.data.data
            this.coterieMembersCnt = res.data.data.coterieMembersCnt
            this.managePicture = res.data.data.manager.picture
            this.members = res.data.data.members
            if (this.members.length) {
              for (let i = 0; i < 2; i++) {
                this.membersPic.push(this.members[i].picture)
              }
            }
          } else {
            Toast(res.data.error.message)
          }
        })
      },
      // 圈子二维码
      goCircleCode () {
        this.$router.push({'path': '/qrCode'})
      },
      // 跳转到编辑圈子
      goEditCircle (id) {
        this.$router.push({'path': '/editCircleInformation/' + id})
      },
      // 消息推送
      changeCoteriePush () {
        this.axios({
          method: 'get',
          url: 'changeCoteriePush',
          params: {
            userId: this.$store.state.userId,
            coterieId: this.$route.params.cid,
            allowPush: !this.disturb
          }
        }).then(res => {
          res.data.success ? Toast('消息推送切换成功') : Toast(res.data.error.message)
        })
      }
    }
  }
</script>
<style scoped>
  .dinglian-circleInformation-whole {
    position: relative;
  }
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
    line-height: 1.5rem;
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
  .dinglian-circleInformation-allPeople > ul > li > img {
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
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
  .dinglian-circleInformation-sheet {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    font-size: 0.14rem;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .dinglian-circleInformation-cancel {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(235, 235, 236, 1);
    z-index: 3;
    animation: bounceInUp 0.1s;
  }
  .dinglian-circleInformation-cancel > li {
    height: 0.49rem;
    line-height: 0.49rem;
    background-color: #ffffff;
  }
  .dinglian-circleInformation-cancel .dinglian-circleInformation-creator {
    height: 0.26rem;
    line-height: 0.26rem;
    margin-bottom: 1px;
    font-size: 0.11rem;
    color: #999999;
  }
  .dinglian-circleInformation-exit {
    color: #e63832;
    margin-bottom: 0.09rem;
  }
  /*退出圈子 end*/
  @keyframes bounceInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
