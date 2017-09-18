<template>
  <div class="dinglian-edit-whole">
    <div class="dinglian-edit-alternative" @click="addItem()">代友报名</div>
    <div class="dinglian-edit-friends" :key="index" v-for="(item, index) in friends">
      <input type="text" value="张三" placeholder="参加者姓名" v-model="item.name">
      <div class="edit-radio">
        <label for="" @click="checkGender(item, '1')" :class="{'active':item.gender == '1'}"><input type="radio"  value="1" v-model="item.gender"><span>男</span></label>
        <label for="" @click="checkGender(item, '2')" :class="{'active':item.gender == '2'}"><input type="radio"  value="2" v-model="item.gender"><span>女</span></label>
      </div>
      <span @click="removeItem(index)"></span>
    </div>
    <mt-button type="default" @click.native="confirm" style="margin-top: 10px" class="dinglian-button">确定</mt-button>
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
        this.paramData.friends = []
        for (let i in this.friends) {
          if (this.friends[i].name !== '') {
            this.paramData.friends.push(this.friends[i])
          }
          this.friends[i].gender = parseInt(this.friends[i].gender)
        }
//        this.paramData.friends = this.friends
        this.$store.commit(types.PARAMDATA, this.paramData)
        this.$router.push({'path': '/signUpActivity'})
      }
    }
  }
</script>
<style scoped>
  .dinglian-edit-whole {
    background: #fff;
  }
  .dinglian-edit-alternative {
    background: url("../../assets/images/add.svg") no-repeat left center;
    background-size: 0.16rem;
    background-position-x: 1.4rem;
  }
  .dinglian-edit-whole > div {
    font-size: 0.14rem;
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
    margin-right: 0.2rem;
    position: relative;
  }
  .edit-radio input[type=radio] {
    width: 0.18rem;
    height: 0.18rem;
    vertical-align:middle;
    margin-right: 0.1rem;
    opacity: 0;
  }
  .edit-radio > label > span {
    display: inline-block;
    line-height: 0.5rem;
  }
  .edit-radio > label:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #e63832;
    border-radius: 100%;
  }
  .edit-radio > label.active:after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0.03rem;
    bottom: 0;
    margin: auto;
    width: 0.12rem;
    height: 0.12rem;
    background: #e63832;
    border-radius: 100%;
  }
  .dinglian-edit-friends {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.15rem;

  }
  .dinglian-edit-friends > input {
    font-size: 0.14rem;
  }
  .dinglian-edit-friends > span {
    display: inline-block;
    width: 0.15rem;
    height: 100%;
    background: url("../../assets/images/add.svg") no-repeat center left;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }


</style>
