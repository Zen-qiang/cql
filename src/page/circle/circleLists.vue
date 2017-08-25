<template>
  <div class="dinglian-circle-all">
    <div class="dinglian-circle-search">
      <input type="search" placeholder="🔍 请输入圈子关键词">
    </div>
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
        <circle-info-lists :coterieList="coterieList"></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <tags-lists :tagsList="tagsList" v-on:checkTag="checkTag"></tags-lists>
        <circle-info-lists :coterieList="coterieList"></circle-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
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
        pageSize: 999999,
        carouselList: []
      }
    },
    created () {
      this.getCarouselPicture()
      this.getActivityType()
      this.getCoterieList()
    },
    methods: {
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
          console.log(this.carouselList)
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
        param.start = this.start
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
          this.coterieList = res.data.data
          // console.log(this.coterieList)
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
        // console.log(this.slvTagsArr)
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
    width: 345px;
    border-radius: 4px;
    font-size: 12px;
    color: #999999;
    text-align: center;
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
  }



</style>
