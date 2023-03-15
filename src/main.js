/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-15 17:04:56
 * @Description: lcl
 */
import Vue from 'vue';
import lodash from 'lodash';
import dayjs from 'dayjs';

import ElementUI from '@/plugins/elementui.js';
import router from './router';
import store from './store';
import axios from './plugins/axios';
import App from '@/App';
import storage from '@/plugins/storage.js';
// 引入自己的ui布局规则
import locale from '@/assets/locale/cn';

import 'nprogress/nprogress.css';

Vue.config.productionTip = false;
Vue.prototype.$storage = storage;
Vue.prototype.$axios = axios;
Vue.prototype.$lodash = lodash;
Vue.prototype.$dayjs = dayjs;
Vue.use(ElementUI, {
  locale: { ...locale }, // 使用本地的 locale 去覆盖官方的 zhLang
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
