/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 23:38:13
 * @Description: lcl
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import LayOut from '@/views/layout/index.vue';

Vue.use(VueRouter);
// 防止跳转同一个路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'),
};

/**
 * Note: sub-menu only appear when route children.length >= 1 && hidden != true
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * routes:
 * 所有角色都可以进入的页面
 */

export const routes = [
  // {
  //   path: '/login',
  //   hidden: true,
  //   name: 'login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  // },
  // // 自定义无感刷新页
  // {
  //   path: '/redirect',
  //   hidden: true,
  //   name: 'redirect',
  //   component: LayOut,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index.vue'),
  //     },
  //   ],
  // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * admin ->asyncRoutes
 * other -> commonRoutesredict
 */

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
