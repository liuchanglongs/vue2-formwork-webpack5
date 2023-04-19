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
  {
    path: '/login',
    hidden: true,
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  // 自定义无感刷新页
  {
    path: '/redirect',
    hidden: true,
    name: 'redirect',
    component: LayOut,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * admin ->asyncRoutes
 * other -> commonRoutesredict
 */
export const commonRoutes = {
  path: '/',
  name: 'icon',
  component: LayOut,
  redirect: '/svg-to-icon',
  hidden: true,
  meta: {
    title: 'icon',
  },
  children: [
    {
      path: '/svg-to-icon',
      name: 'svg-to-icon',
      component: () =>
        import(/* webpackChunkName: "svg-to-icon" */ '@/views/svgChangeIcon/index.vue'),
      meta: {
        title: 'svg->精灵图->icon',
        icon: 'el-icon-camera',
      },
    },
  ],
};
export const asyncRoutes = {
  path: '/',
  name: 'icon',
  component: LayOut,
  redirect: '/svg-to-icon',
  hidden: true,
  meta: {
    title: 'icon',
  },
  children: [
    {
      path: '/svg-to-icon',
      name: 'svg-to-icon',
      component: () =>
        import(/* webpackChunkName: "svg-to-icon" */ '@/views/svgChangeIcon/index.vue'),
      meta: {
        title: 'svg->精灵图->icon',
        icon: 'el-icon-camera',
      },
    },

    {
      path: '/pictureOptimization',
      name: 'pictureOptimization',
      component: () =>
        import(
          /* webpackChunkName: "pictureOptimization" */ '@/views/pictureOptimization/index.vue'
        ),
      meta: {
        title: 'pictureOptimization',
        icon: 'el-icon-camera',
      },
    },

    {
      path: '/longList',
      name: 'longList',
      component: () => import(/* webpackChunkName: "longList" */ '@/views/longList/index.vue'),
      meta: {
        title: 'longList',
        icon: 'el-icon-camera',
      },
    },

    {
      path: '/scrollTableList',
      name: 'scrollTableList',
      component: () =>
        import(/* webpackChunkName: "scrollTableList" */ '@/views/scrollTableList/index.vue'),
      meta: {
        title: 'scrollTableList',
        icon: 'el-icon-camera',
      },
    },

    {
      path: '/reuseRouter/:id?',
      name: 'reuse-router',
      component: () =>
        import(/* webpackChunkName: "reuseRouter" */ '@/views/reuseRouter/index.vue'),
      meta: {
        title: 'reuseRouter',
        icon: 'el-icon-camera',
      },
    },

    {
      path: '/recursive',
      name: 'recursive',
      component: () => import(/* webpackChunkName: "recursive" */ '@/views/recursive/index.vue'),
      meta: {
        title: 'recursiveComponent',
        icon: 'el-icon-camera',
      },
      children: [
        {
          path: '/recursive/2-1',
          name: 'recursive-2-1',
          component: () =>
            import(/* webpackChunkName: "recursive-2-1" */ '@/views/recursive/two-1.vue'),
          meta: {
            title: 'recursive-two-2-1',
          },
        },

        {
          path: '/recursive/2-2',
          name: 'recursive-2-2',
          component: () =>
            import(/* webpackChunkName: "recursive-2-2" */ '@/views/recursive/two-2.vue'),
          meta: {
            title: 'recursive-2-2',
          },
        },
        {
          path: '/recursive/2-3',
          name: 'recursive-2-3',
          component: RouteView,
          redirect: '/recursive/3-1',
          meta: {
            title: 'recursive-2-3',
          },
          children: [
            {
              path: '/recursive/3-1',
              name: 'recursive-3-1',
              component: () =>
                import(/* webpackChunkName: "recursive-3-1" */ '@/views/recursive/three-1.vue'),
              meta: {
                title: 'recursive-3-1',
              },
            },
          ],
        },
      ],
    },
  ],
};

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
