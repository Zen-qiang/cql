<template>
  <div>
    <ul class="dinglian-lists-ul">
      <li :id="item.activityId" :key="item.activityId" v-for="item in activityLists">
        <div class="clearfix dinglian-lists-con">
          <div class="dinglian-lists-con-left">
            <img :src="domain.resourceUrl + item.cover + '?' + Math.random()" alt="" @click="redirectActivityDetails(item.activityId)">
          </div>
          <div class="dinglian-lists-con-right">
            <div class="dinglian-lists-title clearfix">
              <h3>{{item.name}}</h3>
              <span class="dinglian-lists-circleTag" @click="redirectCircleDetails(item.coterie.id)">{{item.coterie.name}}</span>
            </div>
            <div class="dinglian-lists-tags clearfix">
              <span class="fs_11" :key="tagName" v-for="tagName of item.tags">{{tagName}}</span>
            </div>
            <div class="dinglian-lists-cost">
              <span v-if="item.charge === 'free'">免费</span>
              <span v-else>AA制</span>
            </div>
            <div class="dinglian-lists-people clearfix">
              <span v-if="item.status === '1'"><em class="dinglian-lists-status"></em>进行中</span>
              <span v-else-if="item.status === '2'"><em class="dinglian-lists-status"></em>正在报名</span>
              <span v-else><em class="dinglian-lists-status"></em>已结束</span>
              <span> <i>{{item.userCount.currentCount}}</i> /{{item.userCount.minCount}}~{{item.userCount.maxCount}}人</span>
            </div>
            <div class="dinglian-lists-people dinglian-lists-address clearfix">
              <span>{{item.address}}</span>
              <span v-show="item.distance">5.6km</span>
            </div>
          </div>
        </div>
        <div class="dinglian-lists-footer" v-show="footer">
          <span v-if="item.isSignUp">已报名</span>
          <span v-else-if="!item.isSignUp">已取消</span>
          <div class="dinglian-lists-changeButton">
            <span v-if="item.isSignUp && item.status === '2'" @click="signOut(item)">取消报名</span>
            <span v-if="item.isSignUp && item.status === '2'" @click="updateSignInfo(item)">修改信息</span>
            <span v-else-if="!item.isSignUp && item.status === '2'" @click="updateSignInfo(item)">重新报名</span>
          </div>
        </div>
      </li>
    </ul>
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
      }
    },
    data () {
      return {
        cancel: true
      }
    },
    methods: {
      updateSignInfo (activity) {
        this.$store.commit(types.ACTIVITY, activity)
        this.$router.push({'path': '/signUpActivity'})
      },
      redirectActivityDetails (id) {
        this.$store.commit(types.ACTIVITYID, id)
        this.$router.push({'path': '/activityDetails'})
      },
      redirectCircleDetails (id) {
        this.$store.commit(types.CIRCLEID, id)
        this.$router.push({'path': '/circleDetails'})
      },
      signOut (activity) {
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
              Toast(res.data.message)
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
</script>
<style scoped>
  .dinglian-lists-ul {
    background: #f2f2f2;
    padding: 10px 0;
  }
  .dinglian-lists-ul > li {
    margin-bottom: 10px;
    background: #ffffff;
  }
  .dinglian-lists-con {
    height: 140px;
    border-bottom: 1px solid #dddddd;
  }
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 31%;
    padding: 15px 0;
    padding-left: 15px;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
  /*右边区域*/
  .dinglian-lists-con-right {
    float: left;
    width: 69%;
    height: 100%;
    padding-top: 14px;
    padding-left: 13px;
    padding-right: 18px;
  }
  .dinglian-lists-title {

  }
  .dinglian-lists-title > h3 {
    font-size: 14px;
    text-align: left;
    height: 15px;
    line-height: 15px;
    float: left;
  }
  .dinglian-lists-title > span {
    float: right;
    font-size: 11px;
    background: #ffd200;
    border-radius: 4px;
    padding: 0 3px;
  }
  .dinglian-lists-tags {
    text-align: left;
    height: 18px;
    line-height: 18px;
    margin-top: 7px;

  }
  .dinglian-lists-tags > span {
    display: inline-block;
    float: left;
    border-radius: 4px;
    background: #f2f2f2;
    margin-right: 7px;
    padding: 2px;
  }
  .dinglian-lists-cost {
    color: #e63832;
    font-size: 14px;
    text-align: left;
    margin-top: 9px;
  }
  .dinglian-lists-people {
    margin-top: 10px;
    text-align: left;
    font-size: 11px;
  }
  .dinglian-lists-people span:first-child {
    float: left;
  }
  .dinglian-lists-people span:last-child {
    float: right;
  }
  .dinglian-lists-address {
    margin-top: 9px;
  }
  /*底部点赞*/
  .dinglian-lists-footer {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #dddddd;
    text-align: left;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 15px;
    font-size: 12px;
  }
  .dinglian-lists-changeButton {

  }
  .dinglian-lists-changeButton > span {
    display: inline-block;
    border: 1px solid #999999;
    width: 60px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 4px;
    margin-left: 15px;
    color: #999999;
  }
  /*状态点*/
  .dinglian-lists-status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #ffd200;
    margin-right: 5px;
  }
</style>
