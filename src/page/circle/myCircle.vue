<template>
  <div>
    <div class="dinglian-circle-search">
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
          <li class="dinglian-myCircle-info">
            <img src="../../assets/images/my_circle1.jpg" alt="">
            <span>金桥街舞</span>
          </li>
          <li class="dinglian-myCircle-info">
            <img src="../../assets/images/my_circle2.jpg" alt="">
            <span>金桥街舞</span>
          </li>
          <li class="dinglian-myCircle-info">
            <img src="../../assets/images/my_circle3.jpg" alt="">
            <span>找找兴趣</span>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2222
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       333
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
  /*圈子列表*/
  .dinglian-myCircle-lists {
    padding: 10px 0;
    padding-left: 4%;
    display: flex;
    flex-flow: row wrap;
  }
  .dinglian-myCircle-info {
    float: left;
    width: 109px;
    height: 128px;
    margin-right: 9px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .dinglian-myCircle-info > img {
    display: inline-block;
    width: 100%;
    border-radius: 4px;
  }
  .dinglian-myCircle-info > span {
    font-size: 11px;
  }

</style>
