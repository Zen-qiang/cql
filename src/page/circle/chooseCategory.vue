<template>
  <div class="dinglian-choose-all">
    <h3>选择分类</h3>
    <p>选择分类，让别人更好的找到你</p>
    <mt-navbar v-model="selected">
      <mt-tab-item :id="item.id" :key="item.id" v-for="(item, index) in activityType" @click.native="getTagList(item.id)">
        <img :src="tagImgs[index]">
        <div>
          {{item.name}}
        </div>
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="dinglian-circle-tagsHeader">
      标签
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <ul class="dinglian-choose-tags clearfix">
          <li :id="item.id" :key="item.id" v-for="item in tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id)">{{item.name}}</li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="dinglian-button">下一步</mt-button>
  </div>

</template>
<script>
  // import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        selected: '1',
        activityType: [],
        tagsList: [],
        selectedTags: [],
        tagImgs: [require('../../assets/images/dancing.png'), require('../../assets/images/table.png'), require('../../assets/images/basketball.png')],
        circleName: ''
      }
    },
    created () {
      this.getActivityType()
      this.circleName = this.$store.state.circleName
      console.log(this.circleName)
    },
    methods: {
      goNextStep () {
        // this.$store.commit(types.CIRCLETAGS, this.convertToStr(this.selectedTags))
        console.log(window.sessionStorage.getItem('circleName'))
        this.$router.push({'path': '/uploadCircleCover'})
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
          if (this.activityType) {
            this.getTagList(this.activityType[0].id)
            this.selected = this.activityType[0].id
          }
        }).catch()
      },
      getTagList (parentId) {
        // 获取二级标签
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
          this.selectedTags = []
          this.checkTag(parentId)
        }).catch()
      },
      checkTag (tagId) {
        // 选中标签
        let idx = this.selectedTags.indexOf(tagId)
        // 判断是否存在数组中，存在则删除
        if (idx > -1) {
          this.selectedTags.splice(idx, 1)
        } else {
          this.selectedTags.push(tagId)
        }
      },
      isSelected (tagId) {
        return this.selectedTags.indexOf(tagId) > -1
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
  img {
    width: 50%;
  }
  .mint-navbar .mint-tab-item {
    width: 24px;
    text-align: -webkit-center;
  }
  /*切换标签颜色 start*/
  .dinglian-circle-tags {
    color: #999999;
    border: 1px solid #999999;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-circle-changetags {
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #333333;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  /*切换标签颜色 end*/
  .dinglian-classification-tagList {
    padding-left: 15px;
    width: 100%;
    margin-bottom: 10px;
  }
  .dinglian-classification-tagList li {
    list-style: none;
    float: left;
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  a {
    color: #333333;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #ffd200;
    color: #333333;
  }
  .mui-pull-left {
    float: none;
  }
  img {
    width: 30%;
  }
  /*主体*/
  .dinglian-choose-all {
    padding-top: 154px;
  }
  /*h3 标题*/
 .dinglian-choose-all > h3 {
   font-size: 24px;
   font-weight: 300;
   color: #666666;

 }
  .dinglian-choose-all >p {
    font-size:11px;
    color: #999999;
    margin-bottom: 37px;
  }
  /*标签*/
  .dinglian-circle-tagsHeader {
    width: 94%;
    text-align: left;
    padding-top: 81px;
    padding-bottom: 19px;
    padding-left: 16px;
    border-bottom: 1px solid #999999;
    margin-left: 3%;
    color: #333333;
    font-size: 14px;
  }
  .dinglian-choose-tags {
    padding: 5px 28px;
    overflow: hidden;

  }
  .dinglian-choose-tags > li {
    display: inline-block;
    float: left;
    height: 22px;
    border: 1px solid #999999;
    border-radius: 10px;
    line-height: 22px;
    font-size: 11px;
    padding: 0 10px;
    margin-top: 15px;
    margin-right: 10px;
  }
  .dinglian-choose-tags-li {
    background: #333333;
    color: #ffffff;
  }
</style>
