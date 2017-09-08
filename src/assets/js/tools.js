/**
 * 1\校验手机号码
 * Created by yuanxiaogang on 2017/9/8.
 */
import { Toast } from 'mint-ui'
// 校验手机号码
function judgmentTel (tel) {
  var myreg = /^1(3|4|5|7|8)\d{9}$/
  if (tel === '') {
    Toast({
      message: '手机号不能为空',
      duration: 500
    })
    return false
  } else if (tel.length !== 11) {
    Toast({
      message: '手机号不正确',
      duration: 500
    })
    return false
  } else if (!myreg.test(tel)) {
    Toast({
      message: '请输入有效的手机号',
      duration: 500
    })
    return false
  }
  return true
}
//        判断移动设备
//      judgmentIos () {
//        let u = navigator.userAgent
//        let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
//        if (isIos) {
//          this.capture = false
//        } else {
//          this.capture = 'camera'
//        }
//      },
export {
  judgmentTel
}
