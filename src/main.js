/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-19 11:04:57
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-23 23:15:59
 * @Description: lcl
 */
/**
 * 组件实例：
 *
 * 应用实例：
 * createapp->创建app->返回一个应用实例 ->
 * 主要注册全局组件；
 * component 注册组件
 * directive 注册指令
 * filter注册过滤器
 * use使用插件
 *
 * 允许链式操作：应用的实例也会返回这个实例
 * */
import Vue from 'vue';

const app1 = Vue.component('h-text', {
  template: `<h1>hahah</h1>`,
  data() {
    return {};
  },
});
const app = new Vue({
  render: h => {
    return h({});
  },
});
app.$mount('#app');
