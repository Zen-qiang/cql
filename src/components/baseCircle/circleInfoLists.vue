<template>
  <div>
    <ul class="dinglian-lists-ul">
      <li class="clearfix">
        <div class="dinglian-lists-con-left">
          <img src="../../assets/images/circle.jpg" alt="">
        </div>
        <div class="dinglian-lists-con-right">
          <h3>全部的标题</h3>
          <div>
            <span>成员350</span>
            <span>话题452</span>
            <span>活动8</span>
          </div>
          <div>
            <span>桌游</span>
            <span>桌游</span>
          </div>
          <p>单价你代付克罗米芬莱克罗米芬莱克罗米芬莱克罗米芬莱克斯大三大四的打顿你...</p>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    name: 'CircleInfoLists',
    data () {
      return {}
    }
  }
</script>
<style scoped>
  /*左边区域*/
  .dinglian-lists-con-left {
    float: left;
    width: 20%;
  }
  .dinglian-lists-con-left > img {
    display: block;
    width: 100%;
  }
  .dinglian-lists-con-right {
    float: left;
    width: 80%;
  }

</style>
