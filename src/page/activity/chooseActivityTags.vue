<template>
  <div class="dinglian-choose-all bColor">
    <div>
      <h3>选择分类</h3>
      <p>选择分类，让别人更好的找到你</p>
    </div>
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
      添加标签
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="item.id" :key="item.id" v-for="item in activityType">
        <ul class="dinglian-choose-tags clearfix">
          <li :id="item.id" :key="item.id" v-for="item in tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="edit-button">继续</mt-button>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        selected: '1',
        isEdit: false,
        activity: null,
        activityType: [],
        tagsList: [],
        selectedTags: [],
        isUnlimited: false,
        tagImgs: [require('../../assets/images/dancing.svg'), require('../../assets/images/table.svg'), require('../../assets/images/basketball.svg')]
      }
    },
    created () {
      this.getActivityType()
      this.activity = this.$store.state.activity || {}
    },
    methods: {
      goNextStep () {
        this.$store.commit(types.ACTIVITYTAGS, this.convertToStr(this.selectedTags))
        this.$router.replace({'path': '/editContent'})
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
      checkTag (tagId, tagName) {
        if (tagName === '不限') {
          this.selectedTags.splice(1, this.selectedTags.length)
          this.isUnlimited = true
        }
        if (tagName !== '不限' && this.isUnlimited) {
          this.selectedTags.splice(1, this.selectedTags.length)
          this.isUnlimited = false
        }
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
  .mint-navbar {
    padding-bottom: 0.315rem;
  }
  .mint-navbar .mint-tab-item {
    width: 0.24rem;
    text-align: -webkit-center;
  }
  .mint-navbar .mint-tab-item-label > div{
    padding: 0.1rem 0 0;
  }
  /*切换标签颜色 start*/
  .dinglian-circle-tags {
    color: #999999;
    border: 0.01rem solid #999999;
    font-size: 0.12rem;
    padding: 0.05rem;
    border-radius: 0.08rem;
  }
  .dinglian-circle-changetags {
    background-color: #333333;
    color: #ffffff;
    border: 0.01rem solid #333;
    font-size: 0.12rem;
    padding: 0.05rem;
    border-radius: 0.08rem;
  }
  /*切换标签颜色 end*/
  .dinglian-classification-tagList {
    padding-left: 0.15rem;
    width: 100%;
    margin-bottom: 0.1rem;
  }
  .dinglian-classification-tagList li {
    list-style: none;
    float: left;
    margin-left: 0;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
  }
  a {
    color: #333333;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0.03rem solid #ffd200;
    color: #333333;
  }
  .mui-pull-left {
    float: none;
  }
  img {
    width: 30%;
  }
  /*主体*/
  .dinglian-choose-all > div {
    background: #fff;
  }
  .dinglian-choose-all > div:nth-of-type(1){
    padding-top: 0.64rem;
    padding-bottom: 0.37rem;
  }
  /*h3 标题*/
  .dinglian-choose-all > div h3 {
    font-family: "PingFang-Regular";
    font-size: 0.24rem;
    font-weight: 300;
    color: #666666;
    margin-bottom: 0.14rem;
  }
  .dinglian-choose-all > div p {
    font-size:0.11rem;
    color: #999999;
  }
  /*标签*/
  .dinglian-circle-tagsHeader {
    font-size: 0.14rem;
    text-align: left;
    padding: 0.27rem 0 0.15rem 0.15rem;
    margin-top: 0.01rem;
    color: #333;
  }
  .dinglian-choose-tags {
    overflow: hidden;
    padding-left: 0.15rem;
    padding-bottom: 0.135rem;
  }
  .dinglian-choose-tags > li {
    font-size: 0.11rem;
    float: left;
    border: 0.01rem solid #999;
    border-radius: 0.11rem;
    margin: 0 0.1rem 0.15rem 0;
    color: #999;
    line-height: 0.22rem;
    padding: 0 0.1rem;
  }
  .dinglian-choose-tags .dinglian-choose-tags-li {
    background: #333333;
    color: #ffffff;
    border-color: #333;
  }
  .mint-tab-container {
    margin-bottom: 0.2rem;
  }
  .mint-button--normal {
    display: block;
  }
  /*分类底部黄色条*/
  .mint-navbar > a{
    position: relative;
  }
  .mint-navbar .mint-tab-item.is-selected[data-v-485b87ae] {
    border-width: 0.02rem;
  }
  .mint-navbar .mint-tab-item:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.03rem;
    left: 0;
    width: 0.4rem;
    height: 0.03rem;
    background: #fff;
  }
  .mint-navbar .mint-tab-item:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.03rem;
    right: 0;
    width: 0.4rem;
    height: 0.03rem;
    background: #fff;
  }
</style>
