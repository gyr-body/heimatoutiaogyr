import Vue from 'vue'
import '../permission'
import VueRouter from 'vue-router'
import Home from '../views/home' // 引用组件
import Login from '../views/login'// 引用组件
import '../views/comment'
import Home2 from '../views/home/home' // 默认背景
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 配置路由表  主页
    path: '/home',
    name: 'home',
    component: Home,
    // 二级路由
    children: [{
      path: '',
      component: Home2
    },
    {
      path: 'comment',
      component: () => import('../views/comment')
    },
    {
      path: 'material',
      component: () => import('../views/materiallist')
    },
    {
      path: 'articles',
      component: () => import('../views/articles')
    },
    {
      path: 'publish',
      component: () => import('../views/publish')
    },
    {
      path: 'publish/:articleId', // 修改文章数据 动态路由参数
      component: () => import('../views/publish')
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
