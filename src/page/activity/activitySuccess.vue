<template>
  <div class="dinglian-success-all">
    <div class="dinglian-success-icon">
      <img src="../../assets/images/success.svg" alt="">
    </div>
    <h3>恭喜您报名成功</h3>
    <p>去活动的圈子看看吧～～</p>
    <div class="dinglian-success-title">
      <div>
        <img src="../../assets/images/circle.jpg" alt="">
      </div>
      <p>金桥街舞1圈</p>
    </div>
    <div class="dinglian-success-joinPeople">
      <div>成员信息</div>
      <div><i>3</i>/6-10人</div>
    </div>
    <div class="dinglian-success-peopleList"></div>
    <mt-button type="default" class="edit-button">查看我的活动</mt-button>
  </div>

</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .dinglian-success-icon {
    padding-top: 50px;

  }
  .dinglian-success-icon > img {
    width: 42px;
    height: 42px;
    display: inline-block;
    background: #ffd200;
    border-radius: 50%;
  }
  .dinglian-success-all > h3 {
    font-size: 19px;
    font-weight: 400;
    margin-top: 25px;
  }
  .dinglian-success-all > p {
    font-size: 11px;
    color: #999999;
    margin-top: 10px;
  }
  .dinglian-success-title {
    padding-top: 50px;
    padding-bottom: 45px;
  }
  .dinglian-success-title img {
    display: inline-block;
    width: 90px;
    height: 90px;
  }
  .dinglian-success-title > p {
    font-size: 13px;

  }
  .dinglian-success-joinPeople {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-top: 1px solid #dddddd;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
  }
  .dinglian-success-peopleList {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height: 50px;
    line-height: 50px;
  }

</style>
