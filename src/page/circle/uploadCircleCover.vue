<template>
  <div class="dinglian-upload-all">
    <div class="dinglian-createCirclePhoto-uploadPhoto">
      <input id="photo" accept="image/*" type="file" @change="uploadImg" ref="photo" multiple />
      <label for="photo" v-show="isBlock"></label>
      <i class="dinglian-createCirclePhoto-background">
        <img :src="imgUrl" alt="" v-show="imgUrl">
      </i>
    </div>
    <p>简介</p>
    <textarea class="dinglian-upload-con" rows="4" v-model="introduction" placeholder=""></textarea>
    <mt-button type="default" @click.native="createCircle" style="margin-top: 10px" class="dinglian-button">完成</mt-button>
  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        circle: {},
        isEdit: false,
        circleTags: '',
        photoFile: '',
        isBlock: true,
        imgUrl: '',
        introduction: '',
        dataUrl: ''
      }
    },
    created () {
      this.circle = this.$store.state.circle
      // this.circleName = this.$store.state.circleName
      this.circleTags = this.$store.state.circleTags
      if (this.circle.coterieId) {
        this.isEdit = true
        this.introduction = this.circle.description
        this.imgUrl = this.domain.resourceUrl + this.circle.cover + '?' + Math.random()
      }
      // console.log(this.imgUrl)
    },
    methods: {
      uploadImg () {
        let self = this
        let files = this.$refs.photo.files
        for (var i = 0; i < files.length; i++) {
          if (!files[i] || !window.FileReader) {
            return
          }
          if (/^image/.test(files[i].type)) {
            // 创建一个reader
            let reader = new FileReader()
            // 将图片将转成 base64 格式
            reader.readAsDataURL(files[i])
            // 读取成功后的回调
            reader.onloadend = function () {
              self.dataUrl = this.result
              self.imgUrl = this.result
            }
          }
        }
      },
      createCircle () {
        let data = {
          // test
          userId: 13,
          name: this.circle.name,
          tags: this.circleTags,
          description: this.introduction
        }
        if (this.$refs.photo.files.length > 0) {
          data.picture = this.dataUrl
        }
        if (this.isEdit) {
          data.coterieId = this.circle.coterieId
        }
        this.axios({
          method: 'post',
          url: this.isEdit ? 'editCoterie' : 'createCoterie',
          data: data
        }).then(res => {
          if (!res.data.success) {
            Toast(res.data.message)
          } else {
            this.$router.push({'path': '/myCircle'})
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }

</script>
<style scoped>
  .dinglian-upload-all {
    position: relative;
  }
  .dinglian-createCirclePhoto-uploadPhoto {
    position: relative;
    height: 180px;
    /*border-bottom: 1px solid #999999;*/
  }
  .dinglian-createCirclePhoto-uploadPhoto > input {
    position: absolute;
    left: -9999px;
  }
  label {
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    z-index: 10;
  }
  .dinglian-createCirclePhoto-background {
    background: url(../../assets/images/createCircle.png) no-repeat center center;
    display: inline-block;
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-createCirclePhoto-background > img {
    width: 100%;
    height: 180px;
    display: block;
  }
  .dinglian-upload-all > p {
    background-color: #ffffff;
    margin-bottom: 0;
    text-align: left;
    font-size: 14px;
    padding: 15px;
    color: #333333;
  }
  .dinglian-upload-con {
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 157px;
    padding: 15px;
    font-size: 12px;
  }


</style>
