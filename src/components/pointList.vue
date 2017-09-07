<template>
  <div class="dinglian-mem-whole">
    <ul>
      <li :key="index" v-for="(item, index) in TopicPraiseList">
        <div class="dinglian-mem-firstMember">
          <img :src="item.picture">
          <div class="clearfix">
            <h4 v-if="item.gender === 1">{{item.name}} 男</h4>
            <h4 v-else>{{item.name}} 女</h4>
            <span>{{item.createTime | formatDate}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { formatDate } from '../utils/date.js'
  export default {
    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    data () {
      return {
        TopicPraiseList: []
      }
    },
    created () {
      this.getTopicPraiseList()
    },
    methods: {
      getTopicPraiseList () {
        this.axios({
          method: 'get',
          url: 'getTopicPraiseList',
          params: {
            topicId: this.$route.params.id
          }
        }).then(res => {
          if (res.data.success) {
            this.TopicPraiseList = res.data.data
          }
        }).catch()
      }
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
    /*background: #ffd200;*/
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
