<template>
  <!--报名成员列表-->
  <div class="dinglian-mem-whole">
    <ul>
      <li :key="index" v-for="(item, index) in activityMembers">
        <div class="dinglian-mem-firstMember">
          <i class="dinglian-mem-avatar">
            <img :src="item.picture">
          </i>
          <div class="clearfix">
            <h4 v-if="item.gender === 1"><em class="dinglian-mem">{{item.name}}</em></h4>
            <h4 v-else><em class="dinglian-womem">{{item.name}}</em></h4>
            <span>报名时间: {{item.signUpTime | formatDate}}</span>
          </div>
          <span class="dinglian-mem-phoneNo" v-show="item.phoneNo"><a :href="'tel:' + item.phoneNo"></a></span>
        </div>
        <ul class="dinglian-mem-proxy" v-show="item">
          <li :key="idx" v-for="(retinue, idx) in item.retinues">
            <!--<img src="../../assets/images/circle.jpg">-->
            <span>{{retinue.name}}</span>
            <span :class="{'male':retinue.gender == '1','female':retinue.gender == '2'}"></span>
            <span>代</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  import { formatDate } from '../../utils/date.js'
  export default {
    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    data () {
      return {
        activityId: '',
        activityMembers: []
      }
    },
    created () {
      this.activityId = this.$route.params.id
      this.getActivityMembers()
    },
    methods: {
      getActivityMembers () {
        this.axios({
          method: 'get',
          url: 'getActivityMembers',
          params: {
            userId: this.$store.state.userId,
            activityId: this.activityId
          }
        }).then(res => {
          this.activityMembers = res.data.data
        }).catch()
      }
    }
  }
</script>
<style scoped>
  .dinglian-mem-whole {
    font-size: 0.14rem;
    background: #fff;
  }
  .dinglian-mem-firstMember {
    width: 100%;
    height: 0.65rem;
    line-height: 0.65rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0.12rem;
  }
  .dinglian-mem-firstMember .dinglian-mem-avatar {
    display: block;
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    border: 0.01rem solid #DDDDDD;
    overflow: hidden;
    position: relative;
  }
  .dinglian-mem-firstMember img {
    width: 0.36rem;
    height: 0.36rem;
    border: 0;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .dinglian-mem-firstMember > span {
    display: inline-block;
    width: 0.4rem;
  }
  .dinglian-mem-firstMember > div {
    flex: 2;
    margin-left: 0;
    text-align: left;
    padding-top: 8px;
    padding-left: 10px;
  }
  .dinglian-mem-firstMember > div > h4 {
    font-weight: 400;
    display: inline-block;
    width: 100%;
    height: 0.11rem;
    line-height: 0.11rem;
    float: left;
  }
  .dinglian-mem-firstMember > div > span {
    float: left;
    display: inline-block;
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #999999;
    margin-top: 4px;
    font-size: 11px;
  }
  .dinglian-mem-firstMember > span {
    /*background: #ffd200;*/
  }
  .dinglian-mem-proxy {
    padding-left: 0.68rem;
    padding-right: 0.15rem;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-mem-proxy > li {
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: left;
    display: flex;
    flex-flow: row nowrap;
    padding: 11px 0;
    border-top: 1px solid #dddddd;
    padding-left: 0.1rem;
  }
  .dinglian-mem-proxy > li > img {
    width: 0.23rem;
    height: 0.23rem;
    border-radius: 50%;
    margin-right:0.1rem;
  }
  .dinglian-mem-proxy > li > span {
    line-height: 0.23rem;
    margin-right: 0.15rem;
    font-size: 0.14rem;
    color: #333;
  }
  .dinglian-mem-proxy > li > span:nth-of-type(2) {
    width: 0.15rem;
  }
  .dinglian-mem-proxy > li > span.male {
    background: url("../../assets/images/man.svg") no-repeat left center;
    -webkit-background-size: 0.12rem;
    background-size: 0.12rem;
  }
  .dinglian-mem-proxy > li > span.female {
    background: url("../../assets/images/women.svg") no-repeat left center;
    -webkit-background-size: 0.12rem;
    background-size: 0.12rem;
  }
  .dinglian-mem-proxy > li > span:last-of-type {
    width: 0.2rem;
    height: 0.2rem;
    border: 1px solid #DDD;
    line-height: 0.2rem;
    text-align: center;
    margin-top: 0.02rem;
    -webkit-border-radius: 0.01rem;
    -moz-border-radius: 0.01rem;
    border-radius: 0.01rem;
    color: #999;
    font-size: 0.11rem;
    font-family: "PingFangSc";
  }
  /*拨打电话*/
  .dinglian-mem-phoneNo {
    width: 0.4rem;
    height: 0.4rem;
    padding-right: 0.1rem;
  }
  .dinglian-mem-phoneNo > a {
    display: block;
    background-color: #ffd200;
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../assets/images/mobile999.svg") no-repeat left center;
    padding: 0.1rem;
    background-clip: content-box;
    background-origin: content-box;
    margin-right: 5px;
  }
  .dinglian-mem, .dinglian-womem {
    font-style: normal;
    position: relative;
  }
  .dinglian-mem::after {
    position: absolute;
    content: '';
    width: 0.11rem;
    height: 0.11rem;
    background: url("../../assets/images/man.svg") no-repeat left center;
    right: -0.15rem;
  }
  .dinglian-womem::after {
    position: absolute;
    content: '';
    width: 0.11rem;
    height: 0.11rem;
    background: url("../../assets/images/women.svg") no-repeat left center;
    right: -0.15rem;
  }
</style>
