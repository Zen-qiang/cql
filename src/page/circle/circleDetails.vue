<template>
  <div>
    <header>
      <div class="coverStyle" :style="coverStyle">
        <div class="dinglian-details-join">
          <h4>{{circle.name}}</h4>
          <p>已有&nbsp;{{circle.membersCnt}}&nbsp;人参加</p>
          <span v-show="showButton" @click="joinCircle()">{{buttonText}}</span>
        </div>
        <span class="dinglian-details-edit" @click="redirectEditCircle()"></span>
        <div class="dinglian-details-gray"></div>
      </div>
      <p>{{circle.description}}</p>
    </header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">所有活动</mt-tab-item>
      <mt-tab-item id="histroy">历史活动</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="all">
        <circle-events :topicList="topicList"></circle-events>
      </mt-tab-container-item>
      <mt-tab-container-item id="histroy">
        <circle-events :topicList="topicList"></circle-events>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<script>
  import CircleEvents from '../../components/baseCircle/circleEvents.vue'
  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  export default {
    components: {
      CircleEvents
    },
    data () {
      return {
        selected: 'all',
        circleId: 0,
        circle: '',
        buttonText: '',
        showButton: false,
        start: 0,
        pageSize: 999999,
        topicList: [],
        coverStyle: {
          width: '100%',
          height: '195px',
          background: 'url(' + require('../../assets/images/carousel0.jpg') + ')',
          position: 'relative'
        }
      }
    },
    watch: {
      selected: function (val, oldVal) {
        this.getTopicList(val)
      }
    },
    created () {
      this.circleId = this.$store.state.circleId
      this.loadCircleInfo(this.circleId)
    },
    methods: {
      redirectEditCircle () {
        this.$store.commit(types.CIRCLE, this.circle)
        this.$router.push({'path': '/createCircle'})
      },
      loadCircleInfo (circleId) {
        // 获取圈子详情
        let param = {
          userId: 13,
          coterieId: circleId
        }
        this.axios({
          method: 'get',
          url: 'getCoterieInfo',
          params: param
        }).then(res => {
          this.circle = res.data.data
          this.coverStyle.background = 'url(' + this.domain.resourceUrl + this.circle.cover + '?' + Math.random() + ')'
          this.initLayout(this.circle)
          this.getTopicList(this.selected)
        }).catch()
      },
      getTopicList (dataType) {
        let param = {
          userId: 13,
          coterieId: this.circleId,
          dataType: dataType,
          start: this.start,
          pageSize: this.pageSize
        }
        // console.log(param)
        // 获取话题列表
        this.axios({
          method: 'get',
          url: 'getTopicList',
          params: param
        }).then(res => {
          this.topicList = res.data.data
          // console.log(this.topicList)
        }).catch()
      },
      joinCircle () {
        // 加入圈子，当已加入时变成退出
        let isJoin = !this.circle.isJoined
        this.axios({
          method: 'post',
          url: 'joinCoterie',
          data: {
            userId: 13,
            coterieId: this.circleId,
            isJoin: isJoin
          }
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.message)
          } else {
            this.circle.isJoined = isJoin
            if (isJoin) {
              this.circle.membersCnt++
            } else {
              this.circle.membersCnt--
            }
            this.initLayout(this.circle)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      initLayout (circle) {
        // 初始化界面
        if (circle) {
          if (!circle.isCreator) {
            this.showButton = true
          }
          if (circle.isJoined) {
            this.buttonText = '退出'
          } else {
            this.buttonText = '加入'
          }
        }
      }
    }
  }
</script>
<style scoped>
  /*头部背景*/
  .dinglian-details-background {
    width: 100%;
    height: 195px;
    background: url("../../assets/images/carousel0.jpg") no-repeat center center;
    position: relative;
  }
  .dinglian-details-join {
    position: absolute;
    width: 180px;
    height: 100px;
    left: 50%;
    margin-left: -90px;
    top: 90px;
    z-index: 7;
  }
  .dinglian-details-join > h4 {
    color: #ffffff;
    font-size: 15px;
  }
  .dinglian-details-join > p {
    font-size: 12px;
    margin-top: 12px;
    color: #ffffff;
  }
  .dinglian-details-join > span {
    text-decoration: none;
    display: inline-block;
    width: 58px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    background: #ffd200;
    border-radius: 4px;
    margin-top: 22px;
  }
  .dinglian-details-edit {
    position: absolute;
    right: 0;
    top: 0;
    background: url("../../assets/images/edit.svg") no-repeat center;
    width: 40px;
    height: 40px;
    z-index: 8;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
  }
  .dinglian-details-gray {
    position: absolute;
    left: 0;
    top: 0;
    background: gainsboro;
    opacity: 0.3;
    width: 100%;
    height: 100%;
  }
  header > p {
    width: 100%;
    padding: 15px;
    text-align: left;
    font-size: 12px;
  }

</style>
