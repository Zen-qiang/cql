<template>
  <div class="dinglian-choose-all">
    <ding-lian-header :headerName="headerName"></ding-lian-header>
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
          <li :id="item.id" :key="item.id" v-for="item in tagsList" :class="{ 'dinglian-choose-tags-li': isSelected(item.id)}" @click="checkTag(item.id, item.name)">{{item.name}}</li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="default" @click.native="goNextStep" style="margin-top: 10px" class="dinglian-button">下一步</mt-button>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  import DingLianHeader from '../../components/DingLianHeader.vue'
  import { Toast } from 'mint-ui'
  export default {
    components: {
      DingLianHeader
    },
    data () {
      return {
        headerName: '创建圈子',
        selected: '1',
        isEdit: false,
        circle: {},
        activityType: [],
        tagsList: [],
        selectedTags: [],
        isUnlimited: false,
        tagImgs: [require('../../assets/images/dancing.svg'), require('../../assets/images/table.svg'), require('../../assets/images/basketball.svg')]
      }
    },
    created () {
      this.circle = this.$store.state.circle
      if (this.circle.coterieId) {
        this.isEdit = true
      }
      this.getActivityType()
    },
    methods: {
      goNextStep () {
        this.$store.commit(types.CIRCLE, this.circle)
        this.$store.commit(types.CIRCLETAGS, this.convertToStr(this.selectedTags))
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
            if (this.isEdit) {
              // 编辑圈子选中原圈子标签
              this.selected = this.circle.tags[0].id
            } else {
              // 新建圈子默认选中第一个分类
              this.selected = this.activityType[0].id
            }
            this.getTagList(this.selected)
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
          if (this.isEdit) {
            // 编辑圈子选中原圈子标签
            this.selectedTags.push(parentId)
            for (var i in this.circle.tags) {
              this.selectedTags.push(this.circle.tags[i].id)
            }
            this.isEdit = false
          } else {
            // 新建圈子把分类标签添加到数组
            this.selectedTags = []
            this.checkTag(parentId)
          }
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
          if (this.selectedTags.length === 4) {
            Toast('最多可选择3个标签')
            return
          }
          this.selectedTags.push(tagId)
        }
        // console.log(this.selectedTags)
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
  .dinglian-choose-all {
    height: 6.67rem;
    background: #fff;
  }
  img {
    width: 50%;
  }
  .mint-navbar .mint-tab-item {
    width: 0.24rem;
    text-align: -webkit-center;
  }
  /*切换标签颜色 start*/
  .dinglian-circle-tags {
    color: #999999;
    border: 1px solid #999999;
    font-size: 0.12rem;
    padding: 0.05rem;
    border-radius: 0.08rem;
  }
  .dinglian-circle-changetags {
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #333333;
    font-size: 0.12rem;
    padding: 0.05rem;
    border-radius: 0.08rem;
  }
  /*切换标签颜色 end*/
  .dinglian-classification-tagList {
    padding-left: 10.15rem;
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
  @-webkit-keyframes move {
    from {
      width: 0;
    }
    to {
      width: 0.425rem;
    }
  }
  @keyframes move {
    from {
      width: 0;
    }
    to {
      width: 0.425rem;
    }
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0.02rem solid #ffd200;
    color: #333333;
  }
  .mint-navbar .mint-tab-item {
    position: relative;
  }
  .mint-navbar .mint-tab-item.is-selected:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    left: 0;
    /*width: 0.425rem;*/
    -webkit-animation:move 0.5s;
    -o-animation:move 0.5s;
    animation:move 0.5s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    /*animation-iteration-count: infinite;*/
    height: 0.02rem;
    background: #fff;
  }
  .mint-navbar .mint-tab-item.is-selected:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -0.02rem;
    right: 0;
    /*width: 0.425rem;*/
    -webkit-animation:move 0.5s;
    -o-animation:move 0.5s;
    animation:move 0.5s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    height: 0.02rem;
    background: #fff;
  }
  .mui-pull-left {
    float: none;
  }
  img {
    width: 30%;
  }
  .mint-tab-item-label > div {
    font-size: 0.12rem;
    margin-top: 0.11rem;
    color: #333;
  }
  /*主体*/
  .dinglian-choose-all {
    padding-top: 0.8rem;
  }
  /*h3 标题*/
 .dinglian-choose-all > h3 {
   font-size: 0.24rem;
   font-weight: 300;
   line-height: 0.22rem;
   color: #666666;
  font-family: "PingFang";
 }
  .dinglian-choose-all >p {
    font-size:0.11rem;
    color: #999999;
    margin-top: 0.11rem;
    margin-bottom: 0.2rem;
  }
  /*标签*/
  .dinglian-circle-tagsHeader {
    width: 94%;
    text-align: left;
    padding-top: 0.49rem;
    padding-bottom: 0.19rem;
    border-bottom: 1px solid #999999;
    margin-left: 3%;
    color: #333333;
    font-size: 0.14rem;
  }
  .dinglian-choose-tags {
    padding: 0.05rem 0.28rem;
    overflow: hidden;

  }
  @-webkit-keyfarmes show {
    from{
      opacity: 0;
      -webkit-transform: translateY(0.05rem);
      -moz-transform: translateY(0.05rem);
      -ms-transform: translateY(0.05rem);
      -o-transform: translateY(0.05rem);
      transform: translateY(0.05rem);
    }
    to{
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes show {
    from{
      opacity: 0;
      -webkit-transform: translateY(0.05rem);
      -moz-transform: translateY(0.05rem);
      -ms-transform: translateY(0.05rem);
      -o-transform: translateY(0.05rem);
      transform: translateY(0.05rem);
    }
    to{
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }
  .dinglian-choose-tags > li {
    display: inline-block;
    float: left;
    height: 0.22rem;
    border: 1px solid #999999;
    border-radius: 0.1rem;
    line-height: 0.22rem;
    font-size: 0.11rem;
    padding: 0 0.1rem;
    margin-top: 0.15rem;
    margin-right: 0.1rem;
    -webkit-animation:show 0.5s;
    -o-animation:show 0.5s;
    animation:show 0.5s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  .dinglian-choose-tags .dinglian-choose-tags-li {
    background: #333333;
    color: #ffffff;
    border-color: #333;
  }
</style>
