<template>
  <div class="dinglian-circle-all">
    <mt-search v-model="keyword" placeholder="搜索" autofocus>
      <mt-cell
        :key="coterie.coterieId"
        v-for="coterie in coterieList"
        :title="coterie.name"
        :value="coterie.coterieId">
      </mt-cell>
    </mt-search>
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
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item of activityType">
        <tags-lists :tagsList="tagsList" v-on:checkTag="checkTag"></tags-lists>
        <circle-info-lists :coterieList="coterieList"></circle-info-lists>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<script>
  import TagsLists from '../../components/tagsLists.vue'
  import CircleInfoLists from '../../components/baseCircle/circleInfoLists.vue'
  // import { Toast } from 'mint-ui'
  export default {
    components: {
      TagsLists,
      CircleInfoLists
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
        pageSize: 999999
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




</style>
