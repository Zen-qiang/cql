<template>
  <div class="dinglian-details-whole">
  <mt-loadmore :top-method="loadTop" :distanceIndex="3" ref="loadTop" :maxDistance="maxDistance" >
    <header>
      <div class="coverStyle" :style="coverStyle">
        <div class="dinglian-details-join">
          <h4>{{circle.name}}</h4>
          <p>已有&nbsp;{{circle.membersCnt}}&nbsp;人参加</p>
          <span v-show="!isCreator && !isJoined && !isDismissed" @click="joinCircle()">{{buttonText}}</span>
          <span v-show="isDismissed">{{buttonText}}</span>
        </div>
        <!--编辑按钮-->
        <span class="dinglian-details-edit" @click="redirectEditCircle(circleId)" v-show="isJoined && !isDismissed"></span>
        <!--二维码-->
        <span class="dinglian-details-qrcode" @click="showQRCode" v-show="!isDismissed"></span>
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
        <circle-events :topicList="topicList" v-on:pullUpEvents="pullUpEvents" :allLoaded="allLoaded" :isDismissed="isDismissed"></circle-events>
      </mt-tab-container-item>
      <mt-tab-container-item id="histroy">
        <circle-events :topicList="topicList" v-on:pullUpEvents="pullUpEvents" :allLoaded="allLoaded" :isDismissed="isDismissed"></circle-events>
      </mt-tab-container-item>
    </mt-tab-container>
  </mt-loadmore>
    <button class="dinglian-activityLists-release" @click="redirectCreateActivity()" v-show="isJoined && !isDismissed">
    </button>
  </div>
</template>
<script>
  import CircleEvents from '../../components/baseCircle/circleEvents.vue'
  import * as types from '../../store/mutation-types'
  import { MessageBox, Toast } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  import VueQr from 'vue-qr'
  export default {
    components: {
      CircleEvents,
      VueQr
    },
    data () {
      return {
        maxDistance: 80,
        selected: 'all',
        circleId: this.$route.params.cid,
        circle: '',
        buttonText: '',
        isCreator: false,
        start: 0,
        pageSize: 10,
        topicList: [],
        coverStyle: {
          width: '100%',
          height: '1.95rem',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          backgroundSize: 'cover',
          position: 'relative'
        },
        page: 1,
        allLoaded: false,
        uid: this.$store.state.userId,
        qrcodeContent: '',
        showed: false,
        isJoined: false,
        isDismissed: false
      }
    },
    watch: {
      selected: function (val, oldVal) {
        this.topicList = []
        this.page = 1
        this.start = 0
        this.allLoaded = false
        this.getTopicList(val)
      }
    },
    mounted () {

    },
    created () {
      this.loadCircleInfo(this.circleId)
      this.qrcodeContent = window.location.href
    },
    methods: {
//      发布活动
      redirectCreateActivity () {
        if (this.isJoined) {
          // 将圈子信息传递
          this.circle.id = this.circle.coterieId
          this.$store.commit(types.CURRENTCIRCLE, this.circle)
          this.$router.push({'path': '/chooseActivityTags'})
        }
      },
      // 获取二维码信息，并提交
      getQrCode () {
        let qrcode = {
          qrcodeContent: this.qrcodeContent,
          circleName: this.circle.name,
          cover: this.circle.cover,
          activityCnt: this.circle.activityCnt,
          membersCnt: this.circle.membersCnt
        }
        this.$store.commit(types.QRCODE, qrcode)
      },
      // 展示二维码
      showQRCode () {
        this.getQrCode()
        this.$router.push({'path': '/qrCode'})
      },
      // 下拉刷新
      loadTop () {
        this.topicList = []
        this.page = 1
        this.start = 0
        this.allLoaded = false
        this.getTopicList(this.selected)
        this.$refs.loadTop.onTopLoaded()
      },
      // 上拉加载
      pullUpEvents () {
        this.page ++
        this.start = (this.page - 1) * this.pageSize
        this.getTopicList()
      },
      // 跳转到编辑圈子
      redirectEditCircle (id) {
        this.getQrCode()
        this.$router.push({'path': '/circleInformation/' + id})
      },
      loadCircleInfo (circleId) {
        // 获取圈子详情
        let param = {
          userId: this.uid,
          coterieId: circleId
        }
        this.axios({
          method: 'get',
          url: 'getCoterieInfo',
          params: param
        }).then(res => {
          this.circle = res.data.data
          this.isCreator = res.data.data.isCreator
          this.isJoined = res.data.data.isJoined
          if (res.data.data.status !== 1) {
            this.isDismissed = true
          } else {
            this.isDismissed = false
          }
          this.sharePeople(res.data.data)
          this.coverStyle.backgroundImage = 'url(' + this.circle.cover + ')'
          this.initLayout(this.circle)
          this.getTopicList(this.selected)
        }).catch()
      },
      sharePeople () {
        var _this = this
        var shareTitle = '[点击加入]'
        shareTitle += _this.circle.name
        wx.ready(function () {
          // 朋友圈
          wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
            imgUrl: _this.circle.cover,
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          // 朋友
          wx.onMenuShareAppMessage({
            title: _this.circle.name, // 分享标题
            desc: _this.circle.description, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
            imgUrl: _this.circle.cover,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      },
      getTopicList (dataType) {
        let param = {
          userId: this.uid,
          coterieId: this.circleId,
          dataType: dataType,
          start: this.start,
          pageSize: this.pageSize
        }
        // 获取话题列表
        this.axios({
          method: 'get',
          url: 'getTopicList',
          params: param
        }).then(res => {
          if (res.data.data.length > 0) {
            for (let item in res.data.data) {
              this.topicList.push(res.data.data[item])
            }
          } else {
            this.allLoaded = true
          }
        }).catch()
      },
      joinCircle () {
        this.isJoined = !this.isJoined
        // 加入圈子，当已加入时变成退出
        let isJoin = !this.circle.isJoined
        this.axios({
          method: 'post',
          url: 'joinCoterie',
          data: {
            userId: this.uid,
            coterieId: this.circleId,
            isJoin: isJoin
          }
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.error.message)
          } else {
            this.circle.isJoined = isJoin
            if (isJoin) {
              this.circle.membersCnt++
              Toast('加入圈子成功')
            } else {
              this.circle.membersCnt--
            }
            this.initLayout(this.circle)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      dismissCircle () {
        if (this.isCreator && this.circle.status === 1) {
          MessageBox.confirm('确认解散该圈子?').then(action => {
            this.axios({
              method: 'get',
              url: 'dismissCoterie',
              params: {
                userId: this.uid,
                coterieId: this.circleId
              }
            }).then(res => {
              if (!res.data.success) {
                Toast(res.data.error.message)
              } else {
                this.circle.status = res.data.data.status
                this.initLayout(this.circle)
              }
            }).catch()
          })
        }
      },
      initLayout (circle) {
        // 初始化界面
        if (circle) {
          // 陌生人
          if (!circle.isJoined && !circle.isCreator) {
            this.buttonText = '加入'
          }
          if (circle.status) {
            if (circle.status === 2) {
              this.buttonText = '解散中'
            } else if (circle.status === 3) {
              this.buttonText = '已解散'
            }
          }
        }
      }
    }
  }
</script>
<style scoped>
  .dinglian-details-whole {
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
    position: relative;
  }
  /*头部背景*/
  .dinglian-details-background {
    width: 100%;
    height: 1.95rem;
    background: url("../../assets/images/carousel0.jpg") no-repeat center center;
    position: relative;
  }
  .dinglian-details-join {
    position: absolute;
    width: 1.8rem;
    height: 1rem;
    left: 50%;
    margin-left: -0.9rem;
    top: 0.8rem;
    z-index: 7;
  }
  .dinglian-details-join > h4 {
    color: #ffffff;
    font-family: "PingFangSc";
    font-weight: 400;
    font-size: 0.15rem;
    height: 0.15rem;
    line-height: 0.15rem;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .dinglian-details-join > p {
    font-size: 0.12rem;
    margin-top: 0.07rem;
    color: #ffffff;
  }
  .dinglian-details-join > span {
    position: absolute;
    text-decoration: none;
    height: 0.24rem;
    line-height: 0.12rem;
    font-size: 0.12rem;
    background: #ffd200;
    border-radius: 0.12rem;
    margin-top: 0.22rem;
    margin-right: -0.29rem;
    padding: 0.06rem 0.18rem;
    color: #333333;
    left: 50%;
    transform: translateX(-50%);
  }
  .dinglian-details-edit,.dinglian-details-qrcode {
    position: absolute;
    right: 0;
    top: 0;
    background: url("../../assets/images/edit.svg") no-repeat center;
    width: 0.4rem;
    height: 0.4rem;
    z-index: 8;
    padding: 0.1rem;
    background-clip: content-box;
    background-origin: content-box;
  }
  .dinglian-details-qrcode {
    background-color: #ffd200;
    left: 0;
    background: url("../../assets/images/qr.svg") no-repeat center;
    background-clip: content-box;
    background-origin: content-box;
  }
  .dinglian-details-gray {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
  }
  header > p {
    width: 100%;
    padding: 0.15rem;
    text-align: left;
    font-size: 0.12rem;
    /*height: 0.5rem;*/
    background-color: #ffffff;
    border-bottom: 1px solid #dddddd;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  /*二维码*/
  header {
    position: relative;
    width: 100%;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0.02rem solid #f2f2f2;
  }
  @-webkit-keyframes show {
    from {
      width: 100%;
    }
    to {
      width: 1rem;
    }
  }
  @keyframes move {
    from {
      width: 100%;
    }
    to {
      width: 1rem;
    }
  }
  .mint-navbar .mint-tab-item.is-selected::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    margin:auto;
    /*width: 1.05rem;*/
    border-bottom: 2px solid #ffd200;
    z-index: 11;
    -webkit-animation:show 0.5s;
    -o-animation:show 0.5s;
    animation:show 0.5s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  .mint-navbar .mint-tab-item {
    position: relative;
  }



  .dinglian-vueqr {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 14;
    border: 1px solid red;
    top: 0.5rem;
    height: 2.02rem;
  }
  @-webkit-keyframes move {
    from{
      opacity: 0.6;
      -webkit-transform: scale(0.6);
      -moz-transform: scale(0.6);
      -ms-transform: scale(0.6);
      -o-transform: scale(0.6);
      transform: scale(0.6);
    }
    to{
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes move {
    from{
      opacity: 0.6;
      -webkit-transform: scale(0.6);
      -moz-transform: scale(0.6);
      -ms-transform: scale(0.6);
      -o-transform: scale(0.6);
      transform: scale(0.6);
    }
    to{
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  .dinglian-activityLists-release {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    border-radius: 50%;
    background: url("../../assets/images/snniuz.png") no-repeat center center;
    background-size: 0.6rem 0.6rem;
    -webkit-animation:move 0.5s ease-in;
    -o-animation:move 0.5s ease-in;
    animation:move 0.5s ease-in;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -moz-animation-direction: alternate;
    -o-animation-direction: alternate;
    animation-direction: alternate;
  }
</style>
