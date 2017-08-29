<template>
  <div class="dinglian-mem-whole">
    <ul>
      <li :key="index" v-for="(item, index) in activityMembers">
        <div class="dinglian-mem-firstMember">
          <img :src="item.picture">
          <div class="clearfix">
            <h4 v-if="item.gender === 1">{{item.name}} 男</h4>
            <h4 v-else>{{item.name}} 女</h4>
            <span>报名时间: {{item.signUpTime | formatDate}}</span>
          </div>
          <span><a :href="'tel:' + item.phoneNo">拨打电话</a></span>
        </div>
        <ul class="dinglian-mem-proxy" v-show="item">
          <li :key="idx" v-for="(retinue, idx) in item.retinues">
            <span>{{retinue.name}}</span>
            <span>{{retinue.gender}}</span>
            <span>dai</span>
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
      this.activityId = this.$store.state.activityId
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
          console.log(this.activityMembers)
        }).catch()
      }
    }
  }
</script>
<style scoped>
  .dinglian-mem-whole {
    font-size: 14px;
  }
  .dinglian-mem-firstMember {
    width: 100%;
    height: 0.65rem;
    line-height: 0.65rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 12px;
  }
  .dinglian-mem-firstMember > img {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
  }
  .dinglian-mem-firstMember > span {
    display: inline-block;
    width: 0.17rem;
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
    height: 16px;
    line-height: 16px;
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
    background: #ffd200;
  }
  .dinglian-mem-proxy {
    padding-left: 0.68rem;
    padding-right: 15px;
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
  }
  .dinglian-mem-proxy > li > img {
    width: 0.23rem;
    height: 0.23rem;
    border-radius: 50%;
  }
  .dinglian-mem-proxy > li > span {
    display: inline-block;
    line-height: 0.23rem;
    margin-left: 15px;
  }
</style>
