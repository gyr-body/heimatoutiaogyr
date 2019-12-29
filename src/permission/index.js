// 拦截
import router from '../router'
// 全局前置守卫
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  // 判断拦截地址
  progress.start() // 开启进度条
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
router.afterEach(function () {
  progress.done()
  // setTimeout(() => progress.done(), 500) // 关闭进度条
})
