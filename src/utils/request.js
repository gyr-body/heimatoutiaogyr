import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui' // 引入一个提示对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
axios.interceptors.request.use(function (config) {
  // 获取token
  let token = window.localStorage.getItem('user-token')
  // 再请求之前注入token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 请求失败  处理
  return Promise.reject(error)
})
// 响应拦截 响应数据 回来 到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response.data : {}
}, function (error) {
  // 所有的失败都会进入
  // 执行失败时执行
  // 获取状态码
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      // token未携带或已过期
      router.push('/login')
      break
    case 403:
      // resfehtoken未携带或已过期
      router.push('/login')
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // 状态码  提示
  Message({ type: 'warning', message }) // 提示消息
  return Promise.reject(error)
})
export default axios
