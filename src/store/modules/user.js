/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-18 09:30:34
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 14:04:27
 * @Description: lcl
 */
import storage from '@/plugins/storage';

const user = {
  namespaced: true,
  state: () => ({
    // userMsg: '' || storage.getItem('userMsg'),
    role: null,
    token: null || storage.getItem('token'),
    userName: null,
  }),

  mutations: {
    // 存储登数据
    handleStorage(state, paylod) {
      const { access_token, refresh_token } = paylod;
    },

    set_usermsg(state, paylod) {
      const { data, type } = paylod;
      switch (type) {
        case 'role':
          state.token = data.token;
          break;
        case 'msg':
          state.role = data.role;
          state.userName = data.userName;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    // 登录 -> 角色、token -> 请求用户信息 -> 根据角色组装路由
    // admin ->全部路由
    // other ： 默认路由routes
    login(store, payload) {
      const { commit } = store;
      const { count, password } = payload;
      return new Promise((resolve, reject) => {
        const obj = {
          role: 'admin',
          token: '9991',
        };
        if (count != 'admin') {
          obj.role = 'user';
        }
        setTimeout(() => {
          commit('set_usermsg', {
            type: 'role',
            data: obj,
          });
          storage.setItem('role', obj.role);
          storage.setItem('token', obj.token);

          resolve(obj);
        }, 2000);
      });
    },
    // 这里没有接口，就用 storage.getItem('role');，代替接口
    getUserMsg(store, payload) {
      const { commit } = store;
      return new Promise((resolve, reject) => {
        const obj = {
          role: 'admin',
          userName: 'admin',
        };
        const role = storage.getItem('role');

        if (role != 'admin') {
          obj.role = 'user';
          obj.userName = 'user';
        }
        setTimeout(() => {
          commit('set_usermsg', {
            type: 'msg',
            data: obj,
          });
          resolve(obj.role);
        }, 2000);
      });
    },
  },
};
export default user;
