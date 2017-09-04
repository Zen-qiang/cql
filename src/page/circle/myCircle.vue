<template>
  <div>
    <div class="dinglian-circle-search clearfix">
      <input type="search" placeholder="🔍 请输入圈子关键词">
    </div>
    <mt-navbar v-model="selected">
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
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        selected: '1',
        addCoterieImageUrl: require('../../assets/images/my_circle3.jpg'),
        coteries: []
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
        this.$store.commit(types.CIRCLEID, id)
        this.$router.push({'path': '/circleDetails'})
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
            dataType: dataType
          }
          this.axios({
            method: 'get',
            url: 'getMyCoteries',
            params: param
          }).then(res => {
            this.coteries = res.data.data
          }).catch()
        }
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
    float: left;
  }
  /*圈子列表*/
  .dinglian-myCircle-lists {
    padding: 10px 0;
    padding-left: 4%;
    display: flex;
    flex-flow: row wrap;
  }
  .dinglian-myCircle-info {
    /*float: left;*/
    width: 109px;
    height: 128px;
    margin-right: 9px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .dinglian-myCircle-info > img {
    display: block;
    width: 100%;
    height: 80%;
    border: 0;
    /*border-radius: 4px;*/
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

  }
  .dinglian-myCircle-info > span {
    font-size: 11px;
    height: 20%;
    display: block;
    line-height: 0.25rem;
  }

</style>
