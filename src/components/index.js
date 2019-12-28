import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BereadCrumb from '../components/bread-crumb'
import { Message } from 'element-ui'
import { quillEditor } from 'vue-quill-editor' // 引入编辑器
import 'quill/dist/quill.core.css' // 引入编辑器的css文件
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('bread-crumb', BereadCrumb) // 面包屑组件
    Vue.component(Message) // 单独引入消息提示
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-image', CoverImage) // 注册一个封装组件
    Vue.component('select-image', SelectImage) // 注册选择素材组件
  }
}
