/**
 * Created by yuanxiaogang on 2017/8/22.
 */
import axios from 'axios'
import qs from 'querystring'
import { Toast } from 'mint-ui'
axios.defaults.timeout = 30000
// axios.defaults.baseURL = 'http://106.14.2.158/api/'
axios.defaults.baseURL = 'http://www.dingliantech.com/chuqulang/api/'
// axios.defaults.baseURL = 'http://192.168.3.11:8081/dinglian/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// http请求拦截器
axios.interceptors.request.use(
  config => {
    // 修改了axios的post调用方法，将post参数转化成键值对
    if (config.method === 'post' && !(config.data instanceof FormData)) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// http响应拦截器
axios.interceptors.response.use(
  response => {
    // Toast('请求成功')
    if (response.data) {
      // 当用户ID为空时，需要跳转授权页面
      // Toast('跳转授权')
    }
    return response
  },
  error => {
    if (error.response.status === 400) {
      Toast('参数不正确，请检查参数名称及类型')
    }
    return Promise.reject(error)
  })

export default axios
