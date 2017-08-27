/**
 * Created by yuanxiaogang on 2017/8/26.
 * 压缩图片
 *
 */
import lrz from '../../../static/lrz/lrz.bundle'
import { Toast } from 'mint-ui'
function compressPic (e) {
  var files = e.target.files || e.dataTransfer.files
  console.log(files.length)
  if (files.length === 1) {
    lrz(files[0], {width: 450})
  } else if (files.length <= 3 && files.length > 1) {
    lrz(files[0], {width: 450})
  } else {
    e.target.value = null
    Toast('上传图片不能超过3张！')
  }
}
export {
  compressPic
}
