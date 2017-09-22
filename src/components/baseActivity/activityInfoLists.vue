<template>
  <div>
    <mt-loadmore :bottom-method="loadBottom"
                 :auto-fill="autoLill" :bottom-all-loaded="allLoaded"
                 :distanceIndex="2"
                 ref="loadmore">
    <ul class="dinglian-lists-ul">
      <li :id="item.activityId" :key="item.activityId" v-for="item in activityLists">
        <div class="clearfix dinglian-lists-con">
          <div class="dinglian-lists-con-left">
            <img :src="item.cover" alt="" @click="redirectActivityDetails(item.activityId)">
            <!--<img v-lazy="item.cover" alt="" @click="redirectActivityDetails(item.activityId)">-->
          </div>
          <div class="dinglian-lists-con-right">
            <div class="dinglian-lists-title clearfix">
              <h3 @click="redirectActivityDetails(item.activityId)">{{item.name}}</h3>
              <span class="dinglian-lists-circleTag" @click="redirectCircleDetails(item.coterie.id)">{{item.coterie.name}}</span>
            </div>
            <div class="dinglian-lists-tags clearfix" @click="redirectActivityDetails(item.activityId)">
              <span :key="tagName" v-for="tagName of item.tags">{{tagName}}</span>
            </div>
            <div class="dinglian-lists-cost" @click="redirectActivityDetails(item.activityId)">
              <span v-if="item.charge === 'free'">免费</span>
              <span v-else>AA制</span>
            </div>
            <div class="dinglian-lists-people clearfix" @click="redirectActivityDetails(item.activityId)">
              <span v-if="item.status === '1'"><em class="dinglian-lists-status-processing"></em>进行中</span>
              <span v-else-if="item.status === '2'"><em class="dinglian-lists-status-IsRegistering"></em>正在报名</span>
              <span v-else><em class="dinglian-lists-status-over"></em>已结束</span>
              <span> <i>{{item.userCount.currentCount}}</i> /{{item.userCount.minCount}}~{{item.userCount.maxCount}}人</span>
            </div>
            <div class="dinglian-lists-people dinglian-lists-address clearfix">
              <span>{{item.address}}</span>
              <span v-show="item.distance"></span>
            </div>
          </div>
        </div>
        <div class="dinglian-lists-footer" v-show="footer && item.status !== '0' ">
          <span v-if="item.isSignUp">已报名</span>
          <span v-else-if="!item.isSignUp">已取消</span>
          <div class="dinglian-lists-changeButton">
            <span v-if="item.isSignUp && item.status === '2'" @click="signOut(item)">{{item.isCreator ? '解散活动' : '取消报名'}}</span>
            <span v-if="item.isSignUp && item.status === '2'" @click="updateSignInfo(item)">修改信息</span>
            <span v-else-if="!item.isSignUp && item.status === '2'" @click="updateSignInfo(item)">重新报名</span>
          </div>
        </div>
      </li>
    </ul>
    </mt-loadmore>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  import { MessageBox, Toast } from 'mint-ui'
  export default {
    name: 'ActivityInfoLists',
    props: {
      footer: {
        type: Boolean
      },
      activityLists: {
        type: Array
      },
      allLoaded: {
        type: Boolean
      }
    },
    data () {
      return {
        cancel: true,
        autoLill: false,
        uid: this.$store.state.userId
      }
    },
    methods: {
      // 下拉加载
      loadBottom () {
        this.$emit('pullUpActivity')
        this.$refs.loadmore.onBottomLoaded()
      },
      // 判断房间密码
      validPassword (activity, password) {
        this.axios({
          method: 'get',
          url: 'validActivityPassword',
          params: {
            activityId: activity.activityId,
            password: password
          }
        }).then(res => {
          if (res.data.success) {
            this.goSingUp(activity)
          } else {
            Toast('活动密码错误')
          }
        }).catch()
      },
      // 跳转到参加活动页面
      goSingUp (activity) {
        this.axios({
          method: 'get',
          url: 'getSignInfo',
          params: {
            userId: this.$store.state.userId,
            activityId: activity.activityId
          }
        }).then(res => {
          activity.signUpInfo = res.data.data
          activity.isEditSignUp = true
          this.$store.commit(types.ACTIVITY, activity)
          this.$router.push({'path': '/signUpActivity'})
        }).catch()
      },
      // 修改信息和重新报名
      updateSignInfo (activity) {
        if (!activity.isOpen) {
          MessageBox.prompt('当前活动未公开，请输入密码').then(({ value, action }) => {
            this.validPassword(activity, value)
          })
        } else {
          this.goSingUp(activity)
        }
      },
      // 跳转到活动详情
      redirectActivityDetails (id) {
        this.$router.push({'path': '/activityDetails/' + id})
      },
      // 跳转到圈子详情
      redirectCircleDetails (id) {
        this.$router.push({'path': '/circleDetails/' + id})
      },
      // 取消报名
      signOut (activity) {
        if (activity.isCreator) {
          MessageBox.confirm('确定解散活动?').then(action => {
            this.axios({
              method: 'get',
              url: '/closeActivity',
              params: {
                activityId: activity.activityId
              }
            }).then(res => {
              if (res.data.success) {
                activity.status = '0'
                Toast('解散成功')
              } else {
                Toast(res.data.error.message)
              }
            })
          })
        } else {
          MessageBox.confirm('确定取消报名?').then(action => {
            this.axios({
              method: 'post',
              url: 'signOut',
              data: {
                userId: this.$store.state.userId,
                activityId: activity.activityId
              }
            }).then(res => {
              if (!res.data.success) {
                Toast(res.data.error.message)
              } else {
                activity.isSignUp = false
                Toast('取消成功')
              }
            }).catch(err => {
              console.log(err)
            })
          })
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-lists-ul {
    width: 100%;
    background: #f2f2f2;
    padding: 0.2rem 0;
    padding-top: 0;
  }
  .dinglian-lists-ul > li {
    margin-bottom: 0.1rem;
    background: #ffffff;
  }
  .dinglian-lists-con {
    height: 1.4rem;
    border-bottom: 1px solid #e2e2e2;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    height: 100%;
    width: 31%;
    padding: 0.15rem 0;
    padding-left: 0.15rem;
    box-sizing: border-box;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 1rem;
    height: 1.1rem;
    /*border-radius: 4px;*/
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    box-sizing: border-box;
    float: left;
    width: 69%;
    height: 100%;
    padding-top: 0.14rem;
    padding-left: 0.1rem;
    padding-right: 0.15rem;
  }
  .dinglian-lists-title {
    height: 0.14rem;

  }
  .dinglian-lists-title > h3 {
    font-size: 0.14rem;
    text-align: left;
    height: 0.14rem;
    line-height: 0.16rem;
    float: left;
    font-weight: 400;
    color: #333333;
    max-width: 9em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .dinglian-lists-title > span {
    float: right;
    font-size: 0.11rem;
    background: #ffd200;
    border-radius: 4px;
    padding: 0 0.03rem;
    max-width: 6em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 0.18rem;
    line-height: 0.18rem;
    margin-top: 0.05rem;

  }
  .dinglian-lists-tags > span {
    box-sizing: border-box;
    display: inline-block;
    float: left;
    font-size: 0.11rem;
    border-radius: 2px;
    background: #f2f2f2;
    margin-right: 0.07rem;
    padding: 0.01rem;
    padding-right: 0.04rem;
    padding-left: 0.04rem;
  }
  .dinglian-lists-cost {
    color: #e63832;
    font-size: 0.14rem;
    text-align: left;
    margin-top: 0.1rem;
    height: 0.14rem;
    line-height: 0.14rem;
  }
  .dinglian-lists-people {
    margin-top: 0.2rem;
    text-align: left;
    font-size: 0.1rem;
    height: 0.1rem;
    line-height: 0.1rem;
  }
  .dinglian-lists-people i {
    color: #e63832;
    font-style: normal;
  }
  .dinglian-lists-address > span {
    color: #999999;
    height: 0.14rem;
    line-height: 0.14rem;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 38%;
    white-space: nowrap;
  }
  .dinglian-lists-people span:first-child {
    float: left;
    width: 60%;
  }
  .dinglian-lists-people span:last-child {
    float: right;
  }
  .dinglian-lists-address {
    margin-top: 0.1rem;
  }
  /*底部点赞*/
  .dinglian-lists-footer {
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    border-bottom: 1px solid #dddddd;
    text-align: left;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.15rem;
    font-size: 0.12rem;
  }
  .dinglian-lists-changeButton {

  }
  .dinglian-lists-changeButton > span {
    display: inline-block;
    border: 1px solid #999999;
    width: 0.6rem;
    height: 0.22rem;
    line-height: 0.22rem;
    text-align: center;
    border-radius: 4px;
    margin-left: 0.15rem;
    color: #999999;
  }
  /*状态点*/
  .dinglian-lists-status {
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    border-radius: 50%;
    background: #ffd200;
    margin-right: 0.05rem;
  }
  em[class^='dinglian-lists-status'] {
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    border-radius: 50%;
    margin-right: 0.05rem;
  }
  /*进行中*/
  .dinglian-lists-status-processing {
    background: #5dcf58;
  }
  /*报名中*/
  .dinglian-lists-status-IsRegistering {
    background: #2f8efa;
  }
  /*已结束*/
  .dinglian-lists-status-over {
    background: #ffd200;
  }
</style>
