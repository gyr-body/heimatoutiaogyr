import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BereadCrumb from '../components/bread-crumb'
import { Message } from 'element-ui'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('bread-crumb', BereadCrumb) // 面包屑组件
    Vue.component(Message) // 单独引入消息提示
  }
}
