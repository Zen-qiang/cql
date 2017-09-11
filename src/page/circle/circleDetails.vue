<template>
  <mt-loadmore :top-method="loadTop"
               :distanceIndex="3"
               ref="loadTop">
  <div class="dinglian-details-whole">
    <header>
      <div class="coverStyle" :style="coverStyle">
        <div class="dinglian-details-join">
          <h4>{{circle.name}}</h4>
          <p>已有&nbsp;{{circle.membersCnt}}&nbsp;人参加</p>
          <span v-if="isCreator" @click="dismissCircle()">{{buttonText}}</span>
          <span v-else @click="joinCircle()">{{buttonText}}</span>
        </div>
        <span class="dinglian-details-edit" @click="redirectEditCircle()"></span>
        <span class="dinglian-details-qrcode" @click="showQRCode"></span>
        <div class="dinglian-details-gray"></div>
      </div>
      <p>{{circle.description}}</p>
      <!--<vue-qr :text="qrcodeContent" size="200" dotScale="1" whiteMargin="true" colorLight="red" v-show="showed" class="dinglian-vueqr"></vue-qr>-->
    </header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">所有活动</mt-tab-item>
      <mt-tab-item id="histroy">历史活动</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="all">
        <circle-events :topicList="topicList" v-on:pullUpEvents="pullUpEvents" :allLoaded="allLoaded"></circle-events>
      </mt-tab-container-item>
      <mt-tab-container-item id="histroy">
        <circle-events :topicList="topicList"></circle-events>
      </mt-tab-container-item>
    </mt-tab-container>
    <button class="dinglian-activityLists-release" @click="redirectCreateActivity()">
    </button>
  </div>
  </mt-loadmore>
</template>
<script>
  import CircleEvents from '../../components/baseCircle/circleEvents.vue'
  import * as types from '../../store/mutation-types'
  import { Toast } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  import VueQr from 'vue-qr'
  export default {
    components: {
      CircleEvents,
      VueQr
    },
    data () {
      return {
        selected: 'all',
        circleId: this.$route.params.cid,
        circle: '',
        buttonText: '',
        isCreator: false,
        dismissBtnText: '',
        showDismissBtn: false,
        start: 0,
        pageSize: 10,
        topicList: [],
        coverStyle: {
          width: '100%',
          height: '195px',
          background: 'url(' + require('../../assets/images/carousel0.jpg') + ')',
          position: 'relative'
        },
        page: 1,
        allLoaded: false,
        uid: this.$store.state.userId,
        qrcodeContent: '',
        showed: false
      }
    },
    watch: {
      selected: function (val, oldVal) {
        this.topicList = []
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
        this.$router.push({'path': '/chooseActivityTags'})
      },
      showQRCode () {
        this.$store.commit(types.QRCODE, this.qrcodeContent)
        this.$router.push({'path': '/qrCode'})
      },
//        下拉刷新
      loadTop () {
        this.$refs.loadTop.onTopLoaded()
      },
//      上拉加载
      pullUpEvents () {
        this.page ++
        this.start = (this.page - 1) * this.pageSize
        this.getTopicList()
      },
      redirectEditCircle () {
        this.$store.commit(types.CIRCLE, this.circle)
        this.$router.push({'path': '/createCircle'})
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
          this.sharePeople(res.data.data)
          this.coverStyle.background = 'url(' + this.circle.cover + ')'
          this.initLayout(this.circle)
          this.getTopicList(this.selected)
        }).catch()
      },
      sharePeople () {
        var _this = this
        wx.ready(function () {
//        朋友圈
          wx.onMenuShareTimeline({
            title: _this.circle.name, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
//        朋友
          wx.onMenuShareAppMessage({
            title: _this.circle.name, // 分享标题
            desc: _this.circle.description, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://langlang2go.oss-cn-shanghai.aliyuncs.com/logo/logo_64x64.png', // 分享图标
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
//          this.topicList = res.data.data
        }).catch()
      },
      joinCircle () {
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
        if (this.isCreator) {
          this.axios({
            method: 'get',
            url: 'dismissCoterie',
            data: {
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
          }).catch(err => {
            console.log(err)
          })
        }
      },
      initLayout (circle) {
        // 初始化界面
        if (circle) {
          this.isCreator = circle.isCreator
          if (circle.isCreator) {
            if (circle.status) {
              if (circle.status === 1) {
                this.buttonText = '解散圈子'
              } else if (circle.status === 2) {
                this.buttonText = '解散中'
              } else if (circle.status === 3) {
                this.buttonText = '已解散'
              }
            }
          } else {
            if (circle.isJoined) {
              this.buttonText = '退出'
            } else {
              this.buttonText = '加入'
            }
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
    position: absolute;
    text-decoration: none;
    width: 0.58rem;
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 12px;
    background: #ffd200;
    border-radius: 4px;
    margin-top: 0.22rem;
    right: 50%;
    margin-right: -0.29rem;
  }
  .dinglian-details-edit,.dinglian-details-qrcode {
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
  /*二维码*/
  header {
    position: relative;
    width: 100%;
  }
  .dinglian-vueqr {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 14;
    border: 1px solid red;
    top: 0.5rem;
    height: 202px;
  }
  .dinglian-activityLists-release {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    border-radius: 50%;
    background: url("../../assets/images/snniuz.png") no-repeat center center;
    background-size: 0.6rem 0.6rem;
  }
</style>
