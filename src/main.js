import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less' // 引用默认样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
