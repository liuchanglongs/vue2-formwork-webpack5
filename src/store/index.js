/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 10:03:30
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-23 22:32:47
 * @Description: lcl
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getRouter from '@/store/modules/getRouter';

import getters from './getters.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { getRouter },
});
