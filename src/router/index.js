/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-15 13:48:52
 * @Description: lcl
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 防止跳转同一个路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//清空动态注册的路由的记录
export const resetRoutes = router => {
  const newRouter = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV,
    routes,
  });
  router.matcher = newRouter.matcher;
};

export default router;
