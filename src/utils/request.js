import axios from 'axios'
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
}, function () {
  // 执行失败时执行
})
export default axios
