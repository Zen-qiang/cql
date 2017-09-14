<template>
  <div>
    <div class="dinglian-bmap-header">
        {{address}}
    </div>
    <b-map-component class="dinglian-bmap-main" v-on:getAddress="getMyAddress"></b-map-component>
  </div>

</template>
<script>
  import BMapComponent from '../../components/BMapComponent.vue'
  export default {
    components: {
      BMapComponent
    },
    data () {
      return {
        address: '',
        position: '',
        distance: ''
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      getMyAddress (val) {
        this.address = val
        console.log('val' + val)
      }
    }
  }
</script>
<style scoped>
  .dinglian-bmap-header {
    width: 100%;
    height: 0.67rem;
    font-size: 14px;
  }
  .dinglian-bmap-main {
    width: 100%;
    height: 6rem;
  }


</style>
