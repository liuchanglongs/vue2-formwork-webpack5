/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 10:03:30
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 14:30:26
 * @Description: lcl
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import getRouter from '@/store/modules/getRouter';

import getters from './getters.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user, getRouter },
});
