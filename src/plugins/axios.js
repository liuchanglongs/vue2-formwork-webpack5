/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-19 16:16:53
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-15 16:38:34
 * @Description: lcl
 */
import axios from 'axios';
import store from '@/store';
import { router } from '@/router';
import storage from '@/plugins/storage.js';
//  import { Notify } from 'vant';
import { Message } from 'element-ui';
import NProgress from 'nprogress';

//默认超时时间
axios.defaults.timeout = 120000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress 配置
NProgress.configure({
  showSpinner: false,
});
//http request拦截
axios.interceptors.request.use(
  config => {
    //开启 progress bar
    NProgress.start();
    const meta = config.meta || {};
    const isToken = meta.isToken === false;
    if (config.url.startsWith('/api')) {
      config.headers['Authorization'] = `Basic c3dvcmQ6c3dvcmRfc2VjcmV0`;
      //让每个请求携带token
      if (storage.getItem('access_token') && !isToken) {
        config.headers['Blade-Auth'] = 'bearer ' + storage.getItem('access_token');
      }
    }

    //headers中配置text请求
    if (config.text === true) {
      config.headers['Content-Type'] = 'text/plain';
    }

    //headers中配置serialize为true开启序列化
    // if (config.method === "post" && meta.isSerialize === true) {
    //   config.data = serialize(config.data);
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截
axios.interceptors.response.use(
  res => {
    //关闭 progress bar
    NProgress.done();
    //获取状态码
    const status = res.data.code || res.status;
    const statusWhiteList = [];
    const message = res.data.msg || res.data.error_description || '未知错误';
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    //如果是401则跳转到登录页面
    if (status === 401) {
      store.commit('logOut');
      router.push({ path: '/login' });
      Message({
        message: '登录超时,请重新登录!',
        type: 'error',
      });
      return Promise.reject(new Error(message));
      // 不能调这个，401无法发送logOutHandle请求，token过不了
      // store.dispatch('logOutHandle').then(() => {
      //   router.push({ path: '/login' });
      //   Message({
      //     message: "登录超时,请重新登录!",
      //     type: 'error',
      //   });
      //   return Promise.reject(new Error(message));
      // });
    }

    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message({
        message: message,
        type: 'error',
        customClass: 'err-message',
      });
      return Promise.reject(new Error(message));
    }
    return res.data;
  },
  error => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
