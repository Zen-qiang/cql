<template>
  <div class="dinglian-mem-whole">
    <ul>
      <li>
        <div class="dinglian-mem-firstMember">
          <img src="../../assets/images/circle.jpg" alt="">
          <div class="clearfix">
            <h4>tike 男</h4>
            <span>报名时间</span>
          </div>
          <span></span>
        </div>
        <ul class="dinglian-mem-proxy">
          <li>
            <img src="../../assets/images/circle.jpg" alt="">
            <span>tike</span>
            <span>男</span>
            <span>dai</span>
          </li>
          <li>
            <img src="../../assets/images/circle.jpg" alt="">
            <span>tike</span>
            <span>男</span>
            <span>dai</span>
          </li>
        </ul>
      </li>
      <li>
        <div class="dinglian-mem-firstMember">
          <img src="../../assets/images/circle.jpg" alt="">
          <div class="clearfix">
            <h4>tike 男</h4>
            <span>报名时间</span>
          </div>
          <span></span>
        </div>
        <ul class="dinglian-mem-proxy">

        </ul>
      </li>
    </ul>
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
  .dinglian-mem-whole {
    font-size: 14px;
  }
  .dinglian-mem-firstMember {
    width: 100%;
    height: 0.65rem;
    line-height: 0.65rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 12px;
  }
  .dinglian-mem-firstMember > img {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
  }
  .dinglian-mem-firstMember > span {
    display: inline-block;
    width: 0.17rem;
  }
  .dinglian-mem-firstMember > div {
    flex: 2;
    margin-left: 0;
    text-align: left;
    padding-top: 8px;
    padding-left: 10px;
  }
  .dinglian-mem-firstMember > div > h4 {
    font-weight: 400;
    display: inline-block;
    width: 100%;
    height: 16px;
    line-height: 16px;
    float: left;
  }
  .dinglian-mem-firstMember > div > span {
    float: left;
    display: inline-block;
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #999999;
    margin-top: 4px;
    font-size: 11px;
  }
  .dinglian-mem-firstMember > span {
    background: #ffd200;
  }
  .dinglian-mem-proxy {
    padding-left: 0.68rem;
    padding-right: 15px;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-mem-proxy > li {
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: left;
    display: flex;
    flex-flow: row nowrap;
    padding: 11px 0;
    border-top: 1px solid #dddddd;
  }
  .dinglian-mem-proxy > li > img {
    width: 0.23rem;
    height: 0.23rem;
    border-radius: 50%;
  }
  .dinglian-mem-proxy > li > span {
    display: inline-block;
    line-height: 0.23rem;
    margin-left: 15px;
  }

</style>
