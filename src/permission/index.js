// 拦截
import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断拦截地址
  if (to.path.startsWith('/home')) {
    // 定义令牌
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 没有token  强制跳转到login页面
      next('/login')
    }
  } else {
    next()
  }
})
