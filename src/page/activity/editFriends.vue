<template>
  <div class="dinglian-edit-whole">
    <div class="dinglian-edit-alternative">代友报名</div>
    <div class="dinglian-edit-friends">
      <input type="text" value="张三" placeholder="参加者姓名">
      <div class="edit-radio">
        <label for=""><input type="radio" name="cost" />男</label>
        <label for=""><input type="radio" name="cost">女</label>
      </div>
      <span></span>
    </div>
    <div class="dinglian-edit-friends">
      <input type="text" placeholder="参加者姓名">
      <div class="edit-radio">
        <label for=""><input type="radio" name="cost" />男</label>
        <label for=""><input type="radio" name="cost">女</label>
      </div>
      <span></span>
    </div>
  </div>

</template>
<script>
  export default {
    data () {}
  }
</script>
<style scoped>
  .dinglian-edit-alternative {
    background: url("../../assets/images/add.svg") no-repeat left center;
    background-size: 16px;
    background-position-x: 1.4rem;
  }
  .dinglian-edit-whole > div {
    font-size: 14px;
    height: 0.5rem;
    border-bottom: 1px solid #dddddd;
    line-height: 0.5rem;
  }
  .edit-radio {
    display: inline-block;
  }
  .edit-radio > label {
    display: inline-block;
    height: 100%;
    margin-right: 15px;

  }
  .edit-radio input[type=radio] {
    width: 18px;
    height: 18px;
    vertical-align:text-top;
    margin-right: 5px;
  }
  .dinglian-edit-friends {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 15px;

  }
  .dinglian-edit-friends > span {
    display: inline-block;
    width: 15px;
    height: 100%;
    background: url("../../assets/images/delete.svg") no-repeat center left;
  }


</style>
