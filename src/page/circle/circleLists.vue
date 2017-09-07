<template>
  <div class="dinglian-circle-all">
    <mt-loadmore :top-method="loadTop"
                 :distanceIndex="4"
                 :maxDistance="100"
                 ref="loadTop">
    <form class="dinglian-circle-search clearfix" onsubmit="return false;">
      <input type="search" placeholder="🔍 请输入圈子关键词" @search="searchCircle" v-model="keyword">
    </form>
    <carousel :carouselList="carouselList"></carousel>
    <mt-navbar v-model="tagIndex" class="dinglian-circle-navbar">
      <mt-tab-item id="0" @click.native="hiddenTagList()">全部</mt-tab-item>
      <mt-tab-item :id="item.id" :key="item.id" v-for="item of activityType" @click.native="getTagList(item.id)">{{item.name}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="tagIndex">
      <mt-tab-container-item id="0">
        <ul class="dinglian-tagsLists-all clearfix">
          <li class="fs_9" :key="item.id" v-for="item of tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
        </ul>
        <circle-info-lists :coterieList="coterieList" @pullUpCircle="pullUpCircle" :allLoaded="allLoaded"></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <ul class="dinglian-tagsLists-all clearfix">
          <li class="fs_9" :key="item.id" v-for="item of tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
        </ul>
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
        isUnlimited: false
      }
    },
    created () {
      this.getCarouselPicture()
      this.getActivityType()
      this.getCoterieList()
    },
    mounted () {
    },
    methods: {
      resetListData () {
        this.page = 1
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
      }
    }
  }
</script>
<style scoped>
  /*搜索框*/
  .dinglian-circle-search {
    width: 100%;
    height: 0.44rem;
    background: #f2f2f2;
    padding: 0.1rem 0.15rem;
  }
  .dinglian-circle-search > input[type^=search] {
    margin: 0 auto;
    height: 0.24rem;
    line-height: 0.24rem;
    width: 3.45rem;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    float: left;
    padding-right: 10px;
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
