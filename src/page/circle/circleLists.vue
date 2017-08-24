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
        <tags-lists :tagsList="tagsList" v-on:checkTag="checkTag"></tags-lists>
        <circle-info-lists :coterieList="coterieList"></circle-info-lists>
      </mt-tab-container-item>
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <tags-lists :tagsList="tagsList" v-on:checkTag="checkTag"></tags-lists>
        <circle-info-lists :coterieList="coterieList"></circle-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="dinglian-circle-createCircle">
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
        flvTagId: null,
        slvTagsArr: [],
        start: 0,
        pageSize: 999999,
        carouselList: [{
          imageUrl: require('../../assets/images/carousel0.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel1.jpg')
        }, {
          imageUrl: require('../../assets/images/carousel2.jpg')
        }]
      }
    },
    created () {
      this.getActivityType()
      this.getCoterieList()
    },
    methods: {
      getActivityType () {
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
        console.log(param)
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
        let idx = this.slvTagsArr.indexOf(tagId)
        if (idx > -1) {
          this.slvTagsArr.splice(idx, 1)
        } else {
          this.slvTagsArr.push(tagId)
        }
        this.getCoterieList()
        // console.log(this.slvTagsArr)
      },
      convertToStr (array) {
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
