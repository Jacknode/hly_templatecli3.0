/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-05 15:50:16
 * @LastEditTime: 2019-10-14 14:18:13
 * @LastEditors: Please set LastEditors
 */
import store from './store'
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
const whiteList = ['/login', '/authredirect'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = sessionStorage.getItem('token');
  if (token) {
    if (to.path === '/login') {
      next((response) => {
        NProgress.done();
      }); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      let admin = JSON.parse(sessionStorage.getItem('admin'))
      if (!admin) {
        next({
          path: '/login'
        })
        NProgress.done()
        return
      } else {
        // 权限设置
      }
    }
    next((response) => {
      NProgress.done();
    });
  } else {

    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})