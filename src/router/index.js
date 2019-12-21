import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home' // 引用组件
import Login from '../views/login'// 引用组件
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
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
