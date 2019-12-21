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
export default axios
