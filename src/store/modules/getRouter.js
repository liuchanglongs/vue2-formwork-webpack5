/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-18 09:30:40
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 14:22:08
 * @Description: lcl
 */

import { commonRoutes, asyncRoutes } from '@/router';

const getRouter = {
  namespaced: true,
  state: () => ({
    routes: null,
  }),
  mutations: {
    setRoutes(state, paylod) {
      state.routes = paylod;
    },
  },
  actions: {
    configRouter(store, payload) {
      // 实际情况，需要根据后端返回的路由做对比，组装成自己想要的路由，而且还要注意redirect，需要动态给
      const { role } = payload;
      const { commit } = store;
      return new Promise((resolve, reject) => {
        if (role == 'admin') {
          resolve(asyncRoutes);
          commit('setRoutes', asyncRoutes);
        } else {
          resolve(commonRoutes);
          commit('setRoutes', commonRoutes);
        }
      });
    },
  },
};

export default getRouter;

// const user = {
//   namespaced: true,
//   state: () => ({
//     // userMsg: '' || storage.getItem('userMsg'),
//     role: null,
//     token: null || storage.getItem('token'),
//     userName: null,
//   }),

//   mutations: {

//   },
//   actions: {

//   },
// };
// export default user;
