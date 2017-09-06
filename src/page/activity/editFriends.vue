<template>
  <div class="dinglian-edit-whole">
    <div class="dinglian-edit-alternative" @click="addItem()">代友报名</div>
    <div class="dinglian-edit-friends" :key="index" v-for="(item, index) in friends">
      <input type="text" value="张三" placeholder="参加者姓名" v-model="item.name">
      <div class="edit-radio">
        <label for="" @click="checkGender(item, '1')"><input type="radio"  value="1" v-model="item.gender">男</label>
        <label for="" @click="checkGender(item, '2')"><input type="radio"  value="2" v-model="item.gender">女</label>
      </div>
      <span @click="removeItem(index)"></span>
    </div>
    <mt-button type="default" @click.native="confirm" style="margin-top: 10px" class="dinglian-button">添加完成</mt-button>
  </div>

</template>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        paramData: {},
        friends: []
      }
    },
    created () {
      this.$store.commit(types.ACTIVITY, this.$store.state.activity)
      this.paramData = this.$store.state.paramData
      if (this.paramData && this.paramData.friends.length > 0) {
        this.friends = this.paramData.friends
      }
    },
    methods: {
      addItem () {
        let friend = {
          name: '',
          gender: '1'
        }
        this.friends.push(friend)
      },
      removeItem (index) {
        this.friends.splice(index, 1)
      },
      checkGender (item, val) {
        item.gender = val
      },
      confirm () {
        console.log(this.friends)
        this.paramData.friends = this.friends
        this.$store.commit(types.PARAMDATA, this.paramData)
        this.$router.push({'path': '/signUpActivity'})
      }
    }
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
