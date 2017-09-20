<template>
  <div class="bColor">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
    <!--管理者 start-->
    <p class="dinglian-circleMembers-manager">管理者</p>
    <ul class="dinglian-circleMembers-members">
      <li>
        <div class="dinglian-circleMembers-picture">
          <img :src="manager.picture" alt="">
        </div>
        <h3>
          {{manager.nickName}}
          <span v-if="manager.gender === 1" class="dinglian-circleMembers-gender man"></span>
          <span v-else-if="manager.gender === 2" class="dinglian-circleMembers-gender women"></span>
        </h3>
      </li>
    </ul>
    <!--管理者 end-->

    <!--成员 start-->
    <p class="dinglian-circleMembers-manager" v-show="members.length">成员</p>
    <ul class="dinglian-circleMembers-members">
      <li v-for="member in members">
        <div class="dinglian-circleMembers-picture">
          <img :src="member.picture" alt="">
        </div>
        <h3>
          {{member.nickName}}
          <span v-if="member.gender === 1" class="dinglian-circleMembers-gender man"></span>
          <span v-else-if="member.gender === 2" class="dinglian-circleMembers-gender women"></span>
        </h3>
      </li>
    </ul>
    <!--成员 end-->

  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  export default {
    components: {
      DingLianHeader
    },
    data () {
      return {
        manager: {},
        members: [],
        coterieMembersCnt: 0
      }
    },
    computed: {
      headerName: function () {
        return '圈子成员' + '(' + (this.coterieMembersCnt + 1) + ')'
      }
    },
    created () {
      this.getCoterieMembers()
    },
    methods: {
      // 获取圈子成员
      getCoterieMembers () {
        this.axios({
          method: 'get',
          url: 'getCoterieMembers',
          params: {
            coterieId: this.$route.params.cid
          }
        }).then(res => {
          if (res.data.success) {
            this.manager = res.data.data.manager
            this.members = res.data.data.members
            this.coterieMembersCnt = res.data.data.coterieMembersCnt
          } else {
            Toast(res.data.error.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  /*管理者 start*/
  .dinglian-circleMembers-manager {
    font-size: 0.11rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: left;
    padding-left: 0.15rem;
    color: #666666;
  }
  /*管理者 end*/
  .dinglian-circleMembers-members {
    background-color: #ffffff;
    font-size: 0.14rem;
    letter-spacing: 1.4px;
    color: #333333;
  }
  .dinglian-circleMembers-members > li {
    display: flex;
    flex-flow: row nowrap;
    padding: 0 0.15rem;
    height: 0.64rem;
    line-height: 0.64rem;
    align-items: center;
  }
  .dinglian-circleMembers-picture {
    width: 0.44rem;
    height: 0.44rem;
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    position: relative;
  }
  .dinglian-circleMembers-picture > img {
    width: 0.36rem;
    height: 0.36rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
  }
  .dinglian-circleMembers-members > li > h3 {
    margin-left: 0.08rem;
    height: 100%;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-family: ﻿PingFangSC-Light;
    border-bottom: 1px solid #DDDDDD;
    flex-grow: 1;
    text-align: left;
    font-size: 0.14rem;
  }
  .dinglian-circleMembers-members > li > h3:last-of-type {
    border: 0;
  }
  .dinglian-circleMembers-gender {
    margin-left: 0.1rem;
    display: inline-block;
    width: 0.11rem;
    height: 0.11rem;
    vertical-align: middle;
    background-color: #ffd200;
  }
  .man {
    background: url("../../assets/images/man.svg") no-repeat left center;
  }
  .women {
    background: url("../../assets/images/women.svg") no-repeat left center;
  }

</style>
