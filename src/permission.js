/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-26 22:58:24
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 17:03:04
 * @Description: lcl
 */
import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist
// 404
const notFound = {
  path: '*',
  hidden: true,
  name: '404',
  component: () =>
    import(/* webpackChunkName: "404" */ '@/views/404/index.vue'),
};

router.beforeEach(async (to, from, next) => {
  const { token, role } = store.getters;
  NProgress.start();
  if (token) {
    if (to.path == '/login') {
      next('/');
    } else {
      if (role) {
        next();
        NProgress.done();
      } else {
        try {
          /**
           * 1. 请求用户信息
           * 2. 组装路由
           * */
          const role = await store.dispatch('user/getUserMsg');
          const routeArry = await store.dispatch('getRouter/configRouter', {
            role,
          });
          router.addRoute(routeArry);
          router.addRoute(notFound);
          console.log(router.getRoutes());
          next({ ...to, replace: true });
          NProgress.done();
        } catch (error) {
          // remove token and go to login page to re-login
          next('/login');
          Message.error(error || 'Has Error');

          NProgress.done();
        }
      }
    }
  } else {
    NProgress.done();
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});
