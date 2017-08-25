<template>
  <div class="dinglian-message-whole">
    <div class="dinglian-message-header">
      <div class="dinglian-message-avatar">
        <img src="../../assets/images/circle.jpg" alt="">
        <div class="dinglian-message-title">
          <h3>街舞</h3>
          <span>g广东 深证</span>
        </div>
        <span> 10-19 10:10</span>
      </div>
      <p>快来报名呀，一起触发</p>
    </div>
    <alone-activity :footer="true"></alone-activity>
    <div class="dinglian-message-comment">
      <div class="dinglian-message-comment-order">
        <span>共有28人点过赞</span>
        <ul>
          <li></li>
          <li>more > </li>
        </ul>
      </div>
      <div class="dinglian-message-comment-tit">全部评论</div>
      <div class="dinglian-message-avatar">
        <img src="../../assets/images/circle.jpg" alt="">
        <div class="dinglian-message-title">
          <h3>街舞</h3>
          <span>g广东 深证</span>
        </div>
        <span> 10-19 10:10</span>
      </div>
      <div class="dinglian-message-avatar">
        <img src="../../assets/images/circle.jpg" alt="">
        <div class="dinglian-message-title">
          <h3>街舞</h3>
          <span>g广东 深证</span>
        </div>
        <span> 10-19 10:10</span>
      </div>

    </div>
    <div class="dinglian-message-chat">
      <input type="text">
      <span class="dinglian-message-chat-button">发送</span>
    </div>
  </div>
</template>
<script>
  import AloneActivity from '../../components/baseActivity/aloneActivity.vue'
  export default {
    components: {
      AloneActivity
    },
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .dinglian-message-whole {
    background: #f2f2f2;
    height: 100%;
  }
  .dinglian-message-header {
    background: #ffffff;
    height: 0.9rem;
  }
  .dinglian-message-header > p {
    font-size: 13px;
    margin: 6px 0;
    text-align: left;
    padding-left: 15px;
  }
  .dinglian-message-avatar {
    height: 0.63rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 11px;
    padding: 15px;
  }
  .dinglian-message-avatar > img {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
  }
  .dinglian-message-avatar > span {
    display: inline-block;
    color: #999999;
  }

  .dinglian-message-title {
    flex: 2;
    text-align: left;
  }
  .dinglian-message-title > h3 {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    padding-left: 8px;
  }
  .dinglian-message-title > span {
    display: inline-block;
    padding-left: 8px;
    color: #999999;
  }
  .dinglian-message-comment {
    background: #ffffff;
    margin-top: 10px;
  }
  .dinglian-message-comment > div {
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-message-comment-tit {
    font-size: 14px;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: left;
    padding-left: 15px;
  }
  .dinglian-message-comment-order {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 11px;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 15px;
    color: #999999;
  }
  .dinglian-message-chat {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0.08rem 15px;
  }
  .dinglian-message-chat > input {
    height: 0.34rem;
    line-height: 0.34rem;
    border: 1px solid #dddddd;
    width: 2.83rem;
    border-radius: 4px;
    padding-left: 5px;
  }
  .dinglian-message-chat-button {
    display: inline-block;
    width: 0.47rem;
    height: 0.34rem;
    line-height: 0.34rem;
    background: #ffd200;
    border: none;
    border-radius: 4px;
    font-size: 15px;
  }
  .dinglian-message-chat-button:active {
    background: #f2f2f2;
  }
</style>
