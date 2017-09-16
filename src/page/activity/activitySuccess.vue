<template>
  <div class="dinglian-success-all bColor">
    <div class="dinglian-success-icon">
      <img src="../../assets/images/success.svg" alt="">
    </div>
    <div>
      <h3>{{title}}</h3>
      <p>长按关注我们，以便及时获取最新动态</p>
    </div>
    <div class="dinglian-success-title">
      <div>
        <!--:src="circle.cover"-->
        <!--@click="redirectCircleDetails"-->
        <img src="../../assets/images/QRcode.jpg" alt="">
      </div>
      <p></p>
    </div>
    <div class="dinglian-success-shetuan" v-show="false">
      <div><img :src="circle.cover"></div>
      <div>
        <p>{{circle.name}}</p>
        <p>成员<span>1</span>活动<span>2</span></p>
      </div>
    </div>
    <div class="dinglian-success-joinPeople" v-show="!isRelease">
      <div>成员信息</div>
      <div> <i>{{userCount.currentCount}}</i>/{{userCount.minCount}}~{{userCount.maxCount}}人</div>
    </div>
    <div class="dinglian-success-peopleList" v-show="!isRelease" @click="redirectActivityMembers">
      <span :key="index" v-for="(item, index) in circle.activityMembers">
        <img :src="item.picture">
      </span>
      <i></i>
    </div>
    <mt-button v-show="!isRelease" type="default" class="edit-button" @click.native="redirectActivityDetails">查看活动</mt-button>
    <mt-button v-show="isRelease" type="default" class="edit-button" @click.native="redirectMyActivity">查看我的活动</mt-button>
  </div>

</template>
<script>
//  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        activityId: '',
        circle: '',
        isRelease: false,
        userCount: {},
        title: '',
        uid: this.$store.state.userId
      }
    },
    created () {
      this.activityId = this.$store.state.activityId
      this.circle = this.$store.state.circle
      this.isRelease = this.circle.isRelease
      if (this.isRelease) {
        this.title = '恭喜您创建成功'
      } else {
        this.title = '恭喜您报名成功'
      }
      if (this.circle.userCount) {
        this.userCount = this.circle.userCount
      }
    },
    methods: {
      redirectActivityMembers () {
        this.$router.push({'path': '/praiseMembers/' + this.activityId})
      },
      redirectMyActivity () {
        this.$router.push({'path': '/myActivity'})
      },
      redirectCircleDetails () {
        this.$router.push({'path': '/circleDetails/' + this.circle.id})
      },
      redirectActivityDetails () {
        this.$router.push({'path': '/activityDetails/' + this.activityId})
      }
    }
  }
</script>
<style scoped>
  .dinglian-success-all > div{
    background: #fff;
  }
  .dinglian-success-icon {
    box-sizing: content-box;
    height: 0.42rem;
    padding: 0.52rem 0 0.25rem;
  }
  .dinglian-success-icon > img {
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    vertical-align: top;
  }
  .dinglian-success-all > div >h3 {
    font-size: 0.19rem;
    font-weight: 300;
    color: #333;
  }
  .dinglian-success-all > div > p {
    font-size: 0.11rem;
    color: #999999;
    padding: 0.1rem 0 0.5rem;
  }
  .dinglian-success-title > div {
    width: 1.2rem;
    height: 1.2rem;
    /*border: 1px solid #e6e6e6;*/
    margin: 0 auto;
    overflow: hidden;
    /*padding:0.06rem;*/
  }
  .dinglian-success-title >div img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .dinglian-success-all .dinglian-success-title > p {
    font-size: 0.13rem;
    color: #333;
    padding:0.09rem 0 0.44rem;
  }
  .dinglian-success-joinPeople {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.15rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.14rem;
    margin-top: 1px;
  }
  .dinglian-success-joinPeople i {
    font-style: normal;
    color: red;
  }
  .dinglian-success-peopleList {
    margin-top: 1px;
    height: 0.5rem;
    font-size: 0.14rem;
    position: relative;
    text-align: left;
    padding: 0 0.15rem 0.125rem;
    overflow: hidden;
  }
  .dinglian-success-peopleList > span {
    margin-right: 0.05rem;
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    margin-top: 0.125rem;
    border-radius: 50%;
    background-color: #dddddd;
    overflow: hidden;
  }
  .dinglian-success-peopleList > span > img {
    width: 100%;
    height: 100%;
    border-radius:50%;
    vertical-align: top;
  }
  .dinglian-success-peopleList > i {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.16rem;
    width: 0.36rem;
    height: 0.3rem;
    margin: auto;
    background: #fff url("../../assets/images/jtcy.svg") no-repeat center center;
    -webkit-background-size:;
    background-size: 0.1rem;
  }
  /*社团展示*/
  .dinglian-success-shetuan {
    height: 0.7rem;
    font-size: 0.14rem;
    text-align: initial;
    overflow: hidden;
    padding: 0.1rem;
    margin-top: 1px;
  }
  .dinglian-success-shetuan > div{
    height: 100%;
  }
  .dinglian-success-shetuan > div:nth-of-type(1) {
    float: left;
    width: 0.5rem;
    border-radius: 0.04rem;
    overflow: hidden;
  }
  .dinglian-success-shetuan > div:nth-of-type(1) > img{
    width: 100%;
    height: 100%;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) {
    overflow: hidden;
    padding: 0.05rem 0.1rem;
    position: relative;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:first-of-type{

  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:last-of-type{
    font-size: 0.1rem;
    color: #666;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:last-of-type > span{
    display: inline-block;
    width: 0.15rem;
    margin: 0 0.05rem 0 0.02rem;
  }
  .dinglian-success-shetuan > div:nth-of-type(2):after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0.16rem;
    width: 0.1rem;
    height: 0.1rem;
    background: url("../../assets/images/jtcy.svg") no-repeat center center;
   }
  .edit-button {
    display: block;
  }
</style>
