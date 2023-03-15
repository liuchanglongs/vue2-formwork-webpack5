/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-19 15:24:25
 * @LastEditors: lcl
 * @LastEditTime: 2022-08-09 09:11:21
 * @Description: lcl
 */
import config from '@/config/env-api.js';

export default {
  // 得到config.nameSpace对象
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.nameSpace) || '{}');
  },

  // 存储config.nameSpace[key]存储值
  setItem(key, val) {
    let storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage));
  },

  // 得到config.nameSpace[key]存储值
  getItem(key) {
    return this.getStorage()[key];
  },

  // 移除config.nameSpace存储对象中的key
  clearItem(key) {
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage));
  },

  // 移除config.nameSpace存储对象
  clearAll() {
    window.localStorage.removeItem(config.nameSpace);
  },

  // 清空整个localStorage
  clearStorgae() {
    window.localStorage.clear();
  },
};
