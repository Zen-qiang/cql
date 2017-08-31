<template>

  <div class="dinglian-circle-all">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="1"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search clearfix" onsubmit="return false;">
      <input type="search" placeholder="🔍 请输入圈子关键词" @search="searchCircle" v-model="keyword">
    </form>
    <carousel :carouselList="carouselList"></carousel>
    <mt-navbar v-model="tagIndex" class="dinglian-circle-navbar">
      <mt-tab-item id="0" @click.native="getTagList(null)">全部</mt-tab-item>
      <mt-tab-item :id="item.id" :key="item.id" v-for="item of activityType" @click.native="getTagList(item.id)">{{item.name}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="tagIndex">
      <mt-tab-container-item id="0">
        <ul class="dinglian-tagsLists-all clearfix">
          <li class="fs_9" :key="item.id" v-for="item of tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id)">{{item.name}}</li>
        </ul>
        <circle-info-lists :coterieList="coterieList" @pullUpCircle="pullUpCircle" :allLoaded="allLoaded"></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <tags-lists :tagsList="tagsList" v-on:checkTag="checkTag"></tags-lists>
        <circle-info-lists :coterieList="coterieList" @pullUpCircle="pullUpCircle" :allLoaded="allLoaded"></circle-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
    </mt-loadmore>
    <div class="dinglian-circle-createCircle" @click="redirectCreateCircle()">
      创建圈子
    </div>
  </div>

</template>
<script>
  import TagsLists from '../../components/tagsLists.vue'
  import CircleInfoLists from '../../components/baseCircle/circleInfoLists.vue'
  import Carousel from '../../components/carousel.vue'
  // import { Toast } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  export default {
    components: {
      TagsLists,
      CircleInfoLists,
      Carousel
    },
    data () {
      return {
        keyword: '',
        tagIndex: '0',
        activityType: [],
        tagsList: [],
        coterieList: [],
        // 一级标签
        flvTagId: null,
        // 二级标签
        slvTagsArr: [],
        start: 0,
        pageSize: 10,
        page: 1,
        carouselList: [],
        allLoaded: false
      }
    },
    created () {
      this.getCarouselPicture()
      this.getActivityType()
      this.getCoterieList()
    },
    mounted () {
      wx.ready(function () {
        console.log('woowowwo')
        wx.onMenuShareTimeline({
          title: 'test', // 分享标题
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('分享失败')
          }
        })
        wx.onMenuShareAppMessage({
          title: 'test2', // 分享标题
          desc: 'test22222', // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享成功2')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('分享失败2')
          }
        })
      })
    },
    methods: {
//        下拉刷新
      loadTop () {
        this.coterieList = []
        this.getCoterieList()
        this.$refs.loadTop.onTopLoaded()
      },
//      上拉加载
      pullUpCircle () {
        this.page ++
        this.getCoterieList()
      },
//      搜索圈子
      searchCircle () {
        this.coterieList = []
        this.getCoterieList()
      },
      redirectCreateCircle () {
        // 跳转到创建圈子
        this.$router.push({'path': '/createCircle'})
      },
      getCarouselPicture () {
        this.axios({
          method: 'get',
          url: 'getCoterieCarouselPictures'
        }).then(res => {
          this.carouselList = res.data.data
        }).catch()
      },
      getActivityType () {
        // 获取一级标签
        this.axios({
          method: 'get',
          url: 'getActivityType',
          params: {
            fixed: true
          }
        }).then(res => {
          this.activityType = res.data.data
        }).catch()
      },
      getTagList (parentId) {
        // 获取二级标签
        this.slvTagsArr = []
        let param = {}
        if (parentId) {
          param.parentId = parentId
        }
        this.axios({
          method: 'get',
          url: 'getTagList',
          params: param
        }).then(res => {
          this.tagsList = res.data.data
          this.flvTagId = parentId
          this.getCoterieList()
        }).catch()
      },
      getCoterieList () {
        // 获取圈子列表
        let param = {}
        if (this.flvTagId) {
          param.firstLevelTagId = this.flvTagId
        }
        if (this.slvTagsArr.length !== 0) {
          param.secondLevelTagIds = this.convertToStr(this.slvTagsArr)
        }
        param.start = (this.page - 1) * this.pageSize
        param.pageSize = this.pageSize
        if (this.keyword) {
          param.keyword = this.keyword
        }
        // console.log(param)
        this.axios({
          method: 'get',
          url: 'getCoterieList',
          params: param
        }).then(res => {
//          let temporary = res.data.data
//          this.coterieList = res.data.data
          if (res.data.data.length > 0) {
            for (let item in res.data.data) {
              this.coterieList.push(res.data.data[item])
            }
          } else {
            this.allLoaded = true
            console.log('end')
          }
        }).catch()
      },
      checkTag (tagId) {
        // 勾选二级标签
        let idx = this.slvTagsArr.indexOf(tagId)
        if (idx > -1) {
          this.slvTagsArr.splice(idx, 1)
        } else {
          this.slvTagsArr.push(tagId)
        }
        this.getCoterieList()
      },
      isSelected (tagId) {
        return this.slvTagsArr.indexOf(tagId) > -1
      },
      convertToStr (array) {
        // 数组转字符串
        let data = ''
        for (var i in array) {
          data += array[i] + ','
        }
        return data
      }
    }
  }
</script>
<style scoped>
  /*搜索框*/
  .dinglian-circle-search {
    width: 100%;
    height: 44px;
    background: #f2f2f2;
    padding: 10px 15px;
  }
  .dinglian-circle-search > input[type^=search] {
    margin: 0 auto;
    height: 24px;
    line-height: 24px;
    width: 345px;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    float: left;
  }
  .mint-search {
    height: auto;
  }
  div {
    width: 100%;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 170px;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .dinglian-tagsLists-all {
    padding: 15px;
  }
  .dinglian-tagsLists-all > li {
    display: inline-block;
    float: left;
    border: 1px solid #999999;
    border-radius: 4px;
    height: 22px;
    line-height: 20px;
    padding: 0 10px;
    margin: 10px 0;
    margin-right: 10px;
  }
  .dinglian-tagsLists-active {
    background: #ffd200;
  }
  .dinglian-choose-tags-li {
    background: #333333;
    color: #ffffff;
  }
  .dinglian-circle-createCircle {
    position: fixed;
    width: 80px;
    height: 80px;
    line-height: 80px;
    bottom: 10px;
    right: 10px;
    background: #ffd200;
    border-radius: 40px;
    font-size: 15px;
    z-index: 8;
  }



</style>
