<template>
  <div>
    <vue-qr :text="qrcodeContent" size="200" dotScale="1" whiteMargin="true" colorLight="red"></vue-qr>
  </div>
</template>
<script>
  import VueQr from 'vue-qr'
  export default {
    components: {
      VueQr
    },
    created () {
      this.qrcodeContent = this.$store.state.qrCode
    },
    data () {
      return {
        qrcodeContent: ''
      }
    }
  }
</script>
