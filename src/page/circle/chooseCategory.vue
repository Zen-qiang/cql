<template>
  <div>
    <h3>选择分类</h3>
    <p>选择分类，让别人更好的找到你</p>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <img class="mui-media-object mui-pull-left" src="../../assets/images/dancing.png">
        <div class="mui-media-body">
          街舞
        </div>
      </mt-tab-item>
      <mt-tab-item id="2" class="dinglian-classification-navbar">
        <img class="mui-media-object mui-pull-left" src="../../assets/images/table.png">
        <div class="mui-media-body">
          桌游
        </div>
      </mt-tab-item>
      <mt-tab-item id="3">
        <img class="mui-media-object mui-pull-left" src="../../assets/images/basketball.png">
        <div class="mui-media-body">
          其他
        </div>
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="dinglian-circle-tagsHeader">
      标签
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul class="dinglian-classification-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id)" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="dinglian-classification-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id)" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="dinglian-classification-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id)" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        selected: '1'
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  .dinglian-classification-body {
    background-color: #ffffff;
    padding-top: 6rem;
  }
  h3 {

  }
  img {
    width: 50%;
  }
  .mint-navbar .mint-tab-item {
    width: 24px;
    text-align: -webkit-center;
  }
  .dinglian-circle-tagsHeader {
    width: 94%;
    text-align: left;
    padding-top: 6rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    border-bottom: 1px solid #999999;
    margin-left: 3%;
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

</style>
