<template>
  <div class="dinglian-success-all">
    <div class="dinglian-success-icon">
      <img src="../../assets/images/success.svg" alt="">
    </div>
    <h3>恭喜您报名成功</h3>
    <p>去活动的圈子看看吧～～</p>
    <div class="dinglian-success-title">
      <div>
        <img :src="domain.resourceUrl + circle.cover + '?' + Math.random()" alt="" @click="redirectCircleDetails">
      </div>
      <p>{{circle.name}}</p>
    </div>
    <div class="dinglian-success-joinPeople" v-show="!isRelease">
      <div>成员信息</div>
      <div><i>3</i>/6-10人</div>
    </div>
    <div class="dinglian-success-peopleList" v-show="!isRelease">
      <span>tou</span>
      <span>tou</span>
      <span>tou</span>
    </div>
    <mt-button v-show="isRelease" type="default" class="edit-button" @click.native="redirectActivityDetails">查看活动</mt-button>
    <mt-button v-show="!isRelease" type="default" class="edit-button" @click.native="redirectMyActivity">查看我的活动</mt-button>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        activityId: '',
        circle: '',
        isRelease: false
      }
    },
    created () {
      this.activityId = this.$store.state.activityId
      this.circle = this.$store.state.circle
      this.isRelease = this.circle.isRelease
    },
    methods: {
      redirectMyActivity () {
        this.$router.push({'path': '/myActivity'})
      },
      redirectCircleDetails () {
        this.$store.commit(types.CIRCLEID, this.circle.id)
        this.$router.push({'path': '/circleDetails'})
      },
      redirectActivityDetails () {
        this.$store.commit(types.ACTIVITYID, this.activityId)
        this.$router.push({'path': '/activityDetails'})
      }
    }
  }
</script>
<style scoped>
  .dinglian-success-icon {
    padding-top: 50px;

  }
  .dinglian-success-icon > img {
    width: 42px;
    height: 42px;
    display: inline-block;
    background: #ffd200;
    border-radius: 50%;
  }
  .dinglian-success-all > h3 {
    font-size: 19px;
    font-weight: 400;
    margin-top: 25px;
  }
  .dinglian-success-all > p {
    font-size: 11px;
    color: #999999;
    margin-top: 10px;
  }
  .dinglian-success-title {
    padding-top: 50px;
    padding-bottom: 45px;
  }
  .dinglian-success-title img {
    display: inline-block;
    width: 90px;
    height: 90px;
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
    width: 50px;
    border-radius: 50%;
    background-color: #dddddd;
  }

</style>
