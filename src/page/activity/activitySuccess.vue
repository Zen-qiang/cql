<template>
  <div class="dinglian-success-all">
    <div class="dinglian-success-icon">
      <img src="../../assets/images/success.svg" alt="">
    </div>
    <div>
      <h3>{{title}}</h3>
      <p>长按关注我们，以便及时获取最新动态</p>
    </div>
    <div class="dinglian-success-title">
      <div>
        <img :src="circle.cover" alt="" @click="redirectCircleDetails">
      </div>
    </div>
    <div class="dinglian-success-shetuan">
      <div><img :src="circle.cover"></div>
      <div>
        <p>{{circle.name}}</p>
        <p>成员<span>1</span>活动<span>2</span></p>
      </div>
    </div>
    <div class="dinglian-success-joinPeople" v-show="!isRelease">
      <div>成员信息</div>
      <div> <i>{{userCount.currentCount}}</i> /{{userCount.minCount}}~{{userCount.maxCount}}人</div>
    </div>
    <div class="dinglian-success-peopleList" v-show="!isRelease" @click="redirectActivityMembers">
      <span :key="index" v-for="(item, index) in circle.activityMembers">
        <img :src="item.picture">
      </span>
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
  .dinglian-success-all {
    height: 100%;
    background: #F1F2F3;
  }
  .dinglian-success-all > div{
    background: #fff;
  }
  .dinglian-success-icon {
    /*padding-top: 50px;*/

  }
  .dinglian-success-icon > img {
    width: 0.42rem;
    height: 0.42rem;
    display: inline-block;
    border-radius: 50%;
  }
  .dinglian-success-all > div >h3 {
    font-size: 19px;
    font-weight: 400;
    /*margin-top: 0.25rem;*/
  }
  .dinglian-success-all > div > p {
    font-size: 11px;
    color: #999999;
    /*margin-top: 0.1rem;*/
  }
  .dinglian-success-title {
    /*padding-top: 0.5rem;*/
    /*padding-bottom: 0.45rem;*/
    padding: 30px 0;
  }
  .dinglian-success-title > div {
    width: 120px;
    height: 120px;
    border: 1px solid #e6e6e6;
    margin: 0 auto;
    overflow: hidden;
    padding:6px;
  }
  .dinglian-success-title img {
    /*display: inline-block;
    width: 120px;
    height: 120px;*/
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .dinglian-success-title > p {
    font-size: 13px;

  }
  .dinglian-success-joinPeople {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-top: 1px solid #dddddd;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .dinglian-success-peopleList {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    display: flex;
    flex-flow: row-reverse nowrap;
    align-items: center;
  }
  .dinglian-success-peopleList > span {
    margin-right: 10px ;
    display: inline-block;
    width: 40px;
    border-radius: 50%;
    background-color: #dddddd;
  }
  .dinglian-success-peopleList > span > img {
    display: block;
    width: 40px;
    border-radius: 50%;
  }
  /*社团展示*/
  .dinglian-success-shetuan {
    height: 70px;
    font-size: 14px;
    text-align: initial;
    overflow: hidden;
    padding: 10px;
    margin-top: 1px;
  }
  .dinglian-success-shetuan > div{
    height: 100%;
  }
  .dinglian-success-shetuan > div:nth-of-type(1) {
    float: left;
    width: 50px;
    border-radius: 4px;
    overflow: hidden;
  }
  .dinglian-success-shetuan > div:nth-of-type(1) > img{
    width: 100%;
    height: 100%;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) {
    overflow: hidden;
    padding: 5px 10px;
    position: relative;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:first-of-type{

  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:last-of-type{
    font-size: 10px;
    color: #666;
  }
  .dinglian-success-shetuan > div:nth-of-type(2) > p:last-of-type > span{
    display: inline-block;
    width: 15px;
    margin: 0 5px 0 2px;
  }
  .dinglian-success-shetuan > div:nth-of-type(2):after {
    content: '>';
    display: block;
    position: absolute;
    top: 25%;
    right: 5px;
   }
  .edit-button {
    display: block;
  }
</style>
