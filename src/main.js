import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
