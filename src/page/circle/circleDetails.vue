<template>
  <div>
    <header>
      <div class="dinglian-details-background">
        <div class="dinglian-details-join">
          <h4>games</h4>
          <p>已有50人参加</p>
          <span>加入</span>
        </div>
        <span class="dinglian-details-edit"></span>
        <div class="dinglian-details-gray"></div>
      </div>
      <p>手机睡觉啊阿拉斯加阿萨卡就撒开卡哈安卡拉健身卡了大量叫大姐三卡三卡里打极乐世界大连市将辣椒</p>
    </header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">所有活动</mt-tab-item>
      <mt-tab-item id="2">历史活动</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <circle-events></circle-events>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2222
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<script>
  import CircleEvents from '../../components/baseCircle/circleEvents.vue'
  export default {
    components: {
      CircleEvents
    },
    data () {
      return {
        selected: '1'
      }
    }
  }
</script>
<style scoped>
  /*头部背景*/
  .dinglian-details-background {
    width: 100%;
    height: 195px;
    background: url("../../assets/images/carousel0.jpg");
    position: relative;
  }
  .dinglian-details-join {
    position: absolute;
    width: 180px;
    height: 100px;
    left: 50%;
    margin-left: -90px;
    top: 90px;
    z-index: 7;
  }
  .dinglian-details-join > h4 {
    color: #ffffff;
    font-size: 15px;
  }
  .dinglian-details-join > p {
    font-size: 12px;
    margin-top: 12px;
    color: #ffffff;
  }
  .dinglian-details-join > span {
    text-decoration: none;
    display: inline-block;
    width: 58px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    background: #ffd200;
    border-radius: 4px;
    margin-top: 22px;
  }
  .dinglian-details-edit {
    position: absolute;
    right: 0;
    top: 0;
    background: url("../../assets/images/edit.svg") no-repeat center;
    width: 40px;
    height: 40px;
    z-index: 8;
    padding: 10px;
    background-clip: content-box;
    background-origin: content-box;
  }
  .dinglian-details-gray {
    position: absolute;
    left: 0;
    top: 0;
    background: gainsboro;
    opacity: 0.3;
    width: 100%;
    height: 100%;
  }
  header > p {
    width: 100%;
    padding: 15px;
    text-align: left;
    font-size: 12px;
  }

</style>
