/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-26 22:58:24
 * @LastEditors: lcl
 * @LastEditTime: 2022-12-08 12:25:57
 * @Description: lcl
 */
import { router } from './router';
import store from './store';
const noFond = {
  // path: "/:cathchAll(.*)*",
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue'),
  meta: {
    title: '404',
    isAuthorization: false,
  },
};

router.beforeEach((to, from, next) => {
  document.title = to.title ? `数莲SaaS平台-用户门户平台-${to.title}` : '数莲SaaS平台-用户门户平台';
  const token = store.state.login.accessToken;
  const userMsg = store.state.login.userMsg;
  const email = store.state.login.email;
  const meta = to.meta;
  // next()
  // 从oa登录
  const { phone, key, grant_type } = to.query;
  if (to.path === '/login' && grant_type === 'key' && phone && key) {
    store.dispatch('login/buyOaLogin', { phone, key }).then(res => {
      next('/');
    });
  } else {
    // 正常登录->token 存在
    if (token) {
      // 是否从登录页进入
      if (to.path === '/login') {
        next({ path: '/home/work-platform' });
      } else {
        //如果用户信息为空则获取用户信息，获取用户信息失败、未绑定邮箱，跳转到登录页
        if (!(userMsg && email)) {
          store.dispatch('logOutHandle').then(() => {
            next({ path: '/login' });
          });
        } else {
          // next()
          // 第三方链接
          // const value = to.query.src || to.fullPath;
          // if (to.query.target) {
          //   window.open(value);
          // }
          // 动态匹配路由-路由存在放行
          const newRoutes = store.state.routes.newRoutes;
          if (newRoutes.length > 0) {
            next();
          } else {
            const userId = store.state.login.userMsg.user_id || '';
            // 获取路由数据
            store
              .dispatch('routes/configRoute', { userId: BigInt(userId), to, next })
              .then(({ getNewRoutes, isGO }) => {
                // getNewRoutes为空数组--->只注册404
                if (getNewRoutes.length > 0 && !isGO) {
                  // 动态添加路由, 动态重定向路由
                  // 动态获取 根路由的redirect
                  const home = {
                    path: '/',
                    name: 'home',
                    redirect: getNewRoutes[0].path || '',
                    component: () =>
                      import(/* webpackChunkName: "home" */ '@/components/layout/index.vue'),
                    meta: {
                      requiresAuth: false,
                      title: '主页',
                      url: '/',
                    },
                    children: getNewRoutes,
                  };
                  router.addRoute(home);
                  // next():放行,但是路由还没加载好
                  // 中断路由\重新执行守卫
                  router.addRoute(noFond);
                  next({ ...to, replace: true });
                  return;
                } else {
                  // getNewRoutes不为空数组->匹配不到路由--->只注册404
                  let isExist = false;
                  router.getRoutes().map(v => {
                    if (v.name === '404') {
                      isExist = true;
                    }
                  });
                  if (isExist) {
                    next();
                  } else {
                    // 正则也会触发路由守卫
                    router.addRoute(noFond);
                    // 路由跳到404
                    // next('/404')
                    // 路由正则匹配到去404
                    next({ ...to, replace: true });
                  }
                  // return
                }
              });
          }
        }
      }
    } else {
      // token不存在
      if (meta.requiresAuth === false) {
        next();
      } else {
        // localStorage.setItem("preRoute", to.fullPath);
        // if (to.fullPath.includes("getShareFile")) {
        //   next({ path: "/login", query: { link: to.query.link } });
        // } else {
        //   next("/login");
        // }
        store.commit('logOut');
        next({ path: '/login' });
      }
    }
  }
});
