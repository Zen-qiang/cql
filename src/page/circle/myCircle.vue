<template>
  <div class="bColor">
    <div class="dinglian-circle-search">
      <input type="search" placeholder="请输入圈子关键词" @search="searchMyCircle" ref="myCircle" @focus="moveIcon" @blur="refreshIcon" v-model="inputSearchValue" :class="{'active':active}">
      <span :class="{'active':active}" @click="clearSearchContent">取消</span>
    </div>
    <mt-navbar v-model="selected" class="dinglian-myCircle-navbar">
      <mt-tab-item id="1">全部圈子</mt-tab-item>
      <mt-tab-item id="2">我创建的</mt-tab-item>
      <mt-tab-item id="3">我加入的</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul class="dinglian-myCircle-lists">
          <li class="dinglian-myCircle-info" :key="item.id" v-for="item of coteries">
            <img :src="item.cover" alt="" @click="redirectCircleInfo(item.id)">
            <span>{{item.name}}</span>
          </li>
          <li class="dinglian-myCircle-info">
            <img :src="addCoterieImageUrl" alt="" @click="redirectCircleList">
            <span>找找兴趣</span>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="dinglian-myCircle-lists">
          <li class="dinglian-myCircle-info" :key="item.id" v-for="item of coteries">
            <img :src="item.cover" alt="" @click="redirectCircleInfo(item.id)">
            <span>{{item.name}}</span>
          </li>
          <li class="dinglian-myCircle-info">
            <img :src="addCoterieImageUrl" alt="" @click="redirectCircleList">
            <span>找找兴趣</span>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="dinglian-myCircle-lists">
          <li class="dinglian-myCircle-info" :key="item.id" v-for="item of coteries">
            <img :src="item.cover" alt="" @click="redirectCircleInfo(item.id)">
            <span>{{item.name}}</span>
          </li>
          <li class="dinglian-myCircle-info">
            <img :src="addCoterieImageUrl" alt="" @click="redirectCircleList">
            <span>找找兴趣</span>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <button class="dinglian-myCircle-createCircle"><span>创建圈子</span></button>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        selected: '1',
        addCoterieImageUrl: require('../../assets/images/add999.svg'),
        coteries: [],
        uid: this.$store.state.userId,
        active: false,
        inputSearchValue: ''
      }
    },
    created () {
      // 获取我的圈子列表
      this.getMyCircles(this.selected)
    },
    watch: {
      selected: function (val, oldVal) {
        this.getMyCircles(val)
      }
    },
    methods: {
      redirectCircleInfo (id) {
        this.$router.push({'path': '/circleDetails/' + id})
      },
      redirectCircleList () {
        // 跳转的所有圈子列表
        this.$router.push({'path': '/circleLists'})
      },
      getMyCircles (dataType) {
        // 获取我的圈子列表
        if (this.$store.state.userId) {
          let param = {
            userId: this.$store.state.userId,
            dataType: dataType,
            keyword: this.inputSearchValue
          }
          this.axios({
            method: 'get',
            url: 'getMyCoteries',
            params: param
          }).then(res => {
            this.coteries = res.data.data
          }).catch()
        }
      },
      // 输入框放大镜图标 聚焦事件
      moveIcon () {
        this.active = true
      },
      // 失焦事件
      refreshIcon () {
        if (this.inputSearchValue === '') {
          this.active = false
        }
      },
      // 清除输入框内容
      clearSearchContent () {
        this.inputSearchValue = ''
        this.active = false
        this.coteries = []
        this.getMyCircles(this.selected)
      },
      // 搜索圈子
      searchMyCircle () {
        this.$refs.myCircle.blur()
        this.coteries = []
        this.getMyCircles(this.selected)
      }
    }
  }
</script>
<style scoped>
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
    border-radius: 0.04rem;
  }
  /*圈子列表*/
  .dinglian-myCircle-lists {
    padding: 0.1rem 0;
    padding-left: 0.15rem;
    display: flex;
    flex-flow: row wrap;
  }
  .dinglian-myCircle-lists > li:last-of-type {
    background-color: #ffffff;
    color: #999999;
  }
  .dinglian-myCircle-lists > li:last-of-type > img {
    padding: 0.3rem;
    padding-bottom: 0.22rem;
  }
  .dinglian-myCircle-info {
    /*width: 1.09rem;*/
    /*height: 1.28rem;*/
    margin-right: 0.1rem;
    border: 1px solid #dddddd;
    border-radius: 0.04rem;
    margin-bottom: 0.1rem;
  }
  .dinglian-myCircle-info > img {
    display: block;
    width: 1.08rem;
    height: 0.98rem;
    border: 0;
    border-top-left-radius: 0.04rem;
    border-top-right-radius: 0.04rem;

  }
  .dinglian-myCircle-info > span {
    font-size: 0.11rem;
    height: 0.3rem;
    display: block;
    line-height: 0.3rem;
  }
  /*标签点击切换样式*/
  @-webkit-keyframes move {
    from{
      width:0;
    }
    to{
      width:0.26rem;
    }
  }
  @keyframes move {
    from{
      width:0;
    }
    to{
      width:0.26rem;
    }
  }
  .dinglian-myCircle-navbar .mint-tab-item.is-selected {
    position: relative;
  }
  .dinglian-myCircle-navbar .mint-tab-item.is-selected:after {
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
  .dinglian-myCircle-navbar .mint-tab-item.is-selected:before {
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
  .dinglian-myCircle-navbar .mint-tab-item {
    padding: 0;
  }
  /*活动信息*/
  .dinglian-myCircle-info {
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    overflow: hidden;
  }
  .dinglian-myCircle-info > span {
    background: #fff;
  }
  /*创建成功按钮*/
  .dinglian-myCircle-createCircle {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 0.49rem;
    background: #ffd200;
    outline: none;
    border: none;
    width: 100%;
  }
  .dinglian-myCircle-createCircle > span {
    font-size: 0.15rem;
    font-family: "PingFangSc";
    font-weight: 300;
    display: inline-block;
    padding-left: 0.24rem;
    background: url("../../assets/images/editBlack.svg") no-repeat left center;
    background-size: contain;
  }
</style>
