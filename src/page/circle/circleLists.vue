<template>
  <div class="dinglian-circle-all bColor">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="4"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search" onsubmit="return false;">
      <input type="search" placeholder="请输入圈子关键词" @focus="moveIcon" @blur="refreshIcon" v-model="keyword" :class="{'active':active}">
      <span :class="{'active':active}" @click="clearSearchContent">取消</span>
    </form>
    <carousel :carouselList="carouselList"></carousel>
    <mt-navbar v-model="tagIndex" class="dinglian-circle-navbar dinglian-circleLists-change-nav">
      <mt-tab-item id="0" @click.native="hiddenTagList()">全部</mt-tab-item>
      <mt-tab-item :id="item.id" :key="item.id" v-for="item of activityType" @click.native="getTagList(item.id)">{{item.name}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="tagIndex">
      <mt-tab-container-item id="0">
        <!--<ul class="dinglian-tagsLists-all clearfix">
          <li class="fs_9" :key="item.id" v-for="item of tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
          <span></span>
        </ul>-->
        <circle-info-lists :coterieList="coterieList" @pullUpCircle="pullUpCircle" :allLoaded="allLoaded"></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <ul class="dinglian-tagsLists-all clearfix" :class="{'active':!temp}">
          <li class="fs_9" :key="item.id" v-for="item of tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
          <span @click="temp = !temp" :class="{'active':!temp}"></span>
        </ul>
        <circle-info-lists :coterieList="coterieList" @pullUpCircle="pullUpCircle" :allLoaded="allLoaded"></circle-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
    </mt-loadmore>
    <div class="dinglian-circle-createCircle" @click="redirectCreateCircle()">
      <span></span>
      <p>创建圈子</p>
    </div>
  </div>

</template>
<script>
  // import TagsLists from '../../components/tagsLists.vue'
  import CircleInfoLists from '../../components/baseCircle/circleInfoLists.vue'
  import Carousel from '../../components/carousel.vue'
  // import { Toast } from 'mint-ui'
//  import wx from 'weixin-js-sdk'
  export default {
    components: {
      // TagsLists,
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
        allLoaded: false,
        isUnlimited: false,
        temp: true,
        active: false
      }
    },
    created () {
      this.getCarouselPicture()
      this.getActivityType()
      this.getCoterieList()
    },
    mounted () {
    },
    watch: {
      keyword: function (val) {
        if (val === '') {
          this.active = false
        }
      }
    },
    methods: {
      resetListData () {
        this.page = 1
        this.allLoaded = false
        this.keyword = ''
        this.coterieList = []
      },
//        下拉刷新
      loadTop () {
        this.resetListData()
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
        this.$refs.circleSearch.blur()
        this.resetListData()
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
      hiddenTagList () {
        this.resetListData()
        this.slvTagsArr = []
        this.tagsList = []
        this.flvTagId = null
        this.getCoterieList()
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
          this.resetListData()
          this.getCoterieList()
        }).catch()
        this.temp = true
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
        this.axios({
          method: 'get',
          url: 'getCoterieList',
          params: param
        }).then(res => {
          if (this.page > 1) {
            if (res.data.data.length > 0) {
              for (let item in res.data.data) {
                this.coterieList.push(res.data.data[item])
              }
            } else {
              this.allLoaded = true
            }
          } else {
            this.coterieList = res.data.data
          }
        }).catch()
      },
      checkTag (tagId, tagName) {
        if (tagName === '不限') {
          this.slvTagsArr.splice(0, this.slvTagsArr.length)
          this.isUnlimited = true
        }
        if (tagName !== '不限' && this.isUnlimited) {
          this.slvTagsArr.splice(0, this.slvTagsArr.length)
          this.isUnlimited = false
        }
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
      },
      // 输入框放大镜图标 聚焦事件
      moveIcon () {
        this.active = true
      },
      // 失焦事件
      refreshIcon () {
        if (this.keyword === '') {
          this.active = false
        }
      },
      // 清除输入框内容
      clearSearchContent () {
        this.keyword = ''
        this.active = false
      }
    }
  }
</script>
<style scoped>
  /*!*搜索框*!
  .dinglian-circle-search {
    width: 100%;
    height: 0.44rem;
    background: #f2f2f2;
    padding: 0.1rem 0.15rem;
    position: relative;
  }
  .dinglian-circle-search > input[type^=search] {
    margin: 0 auto;
    height: 0.24rem;
    line-height: 0.24rem;
    width: 3.45rem;
    border-radius: 0.04rem;
    font-size: 0.12rem;
    color: #999999;
    text-align: center;
    float: left;
    padding-right: 0.1rem;
  }
  .dinglian-circle-search > span {
    position: absolute;
    background: url("../../assets/images/magnifier.svg") no-repeat center center;
    background-size: 0.14rem 0.14rem;
    left: 1.15rem;
    top: 0.15rem;
    width: 0.14rem;
    height: 0.14rem;
  }*/
  /*搜索框*/
  .dinglian-circle-search {
    height: 0.44rem;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    position: relative;
  }
  .dinglian-circle-search > span {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    font-size: 0.14rem;
    color: #333;
    line-height: 0.44rem;
    opacity: 0;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }
  .dinglian-circle-search > span.active {
    right: 0.18rem;
    opacity: 1;
  }
  .dinglian-circle-search > input[type^=search] {
    /*margin: 0 auto;*/
    margin: 0 0.15rem 0 0.15rem;
    height: 0.24rem;
    width: 3.45rem;
    border-radius: 0.12rem;
    font-size: 0.12rem;
    color: #999999;
    background: #fff url("../../assets/images/magnifier.svg") no-repeat 30% center;
    background-size: 0.12rem;
    padding-left: 34%;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .dinglian-circle-search > input[type^=search].active {
    background-position-x: 0.05rem;
    padding-left: 0.2rem;
    margin: 0 0.6rem 0 0.15rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
  }
  /**/
  .mint-search {
    height: auto;
  }
  div {
    width: 100%;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 1.7rem;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /*标签*/
  .dinglian-tagsLists-all {
    padding: 0.1rem 0.3rem 0.01rem 0.15rem;
    height: 0.4rem;
    overflow: hidden;
    position: relative;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .dinglian-tagsLists-all.active {
    height: 1.1rem;
  }
  .dinglian-tagsLists-all > li {
    float: left;
    border: 1px solid #999999;
    font-size: 0.09rem;
    color: #333;
    border-radius: 0.04rem;
    line-height: 0.2rem;
    padding: 0 0.1rem;
    margin: 0 0.1rem 0.1rem 0;
  }
  .dinglian-tagsLists-active {
    background: #ffd200;
  }
  .dinglian-tagsLists-all .dinglian-choose-tags-li {
    background: #ffd200;
    border-color: #ffd200;
  }
  .dinglian-tagsLists-all > span {
    position: absolute;
    top: 0;
    right: 0.05rem;
    height: 0.4rem;
    width: 0.4rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    background: url("../../assets/images/jtcy.svg") no-repeat center center;
    -webkit-background-size:0.15rem 0.8rem;
    background-size:0.15rem 0.8rem;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .dinglian-tagsLists-all > span.active {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  /*创建圈子*/
  .dinglian-circle-createCircle {
    position: fixed;
    width: 0.6rem;
    height: 0.6rem;
    /*line-height: 80px;*/
    bottom: 0.17rem;
    right: 0.17rem;
    background: #ffd200;
    border-radius: 50%;
    font-size: 0.11rem;
    z-index: 8;
    border:1px solid #333;
  }
  .dinglian-circle-createCircle > span {
    display: block;
    background: url("../../assets/images/editBlack.svg") no-repeat center center;
    width: 0.18rem;
    height: 0.18rem;
    margin: 0.1rem auto 0.05rem;
  }
  .dinglian-circle-createCircle > p{
    font-size: 0.11rem;
    color: #333;
    line-height: 0.1rem;
  }
/*切换标签样式*/
  @-webkit-keyframes move {
    from{
      width:0;
    }
    to{
      width:0.24rem;
    }
  }
  @keyframes move {
    from{
      width:0;
    }
    to{
      width:0.24rem;
    }
  }
  .dinglian-circleLists-change-nav .mint-tab-item.is-selected {
    position: relative;
  }
  .dinglian-circleLists-change-nav .mint-tab-item.is-selected:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    left: 0;
    height: 0.03rem;
    /*width:0.23875rem;*/
    background:#fff;
    -webkit-animation:move 0.5s forwards;
    -o-animation:move 0.5s forwards;
    animation:move 0.5s forwards;
  }
  .dinglian-circleLists-change-nav .mint-tab-item.is-selected:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    right: 0;
    height: 0.03rem;
    /*width:0.23875rem;*/
    background:#fff;
    -webkit-animation:move 0.5s forwards;
    -o-animation:move 0.5s forwards;
    animation:move 0.5s forwards;
  }
  .dinglian-circleLists-change-nav .mint-tab-item {
    padding: 0;
  }
</style>
