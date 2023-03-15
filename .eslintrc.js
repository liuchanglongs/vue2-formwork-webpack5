/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-15 11:10:58
 * @Description: lcl
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 'quotes': 2, // 双引号
    // 'semi': 1, // 是否需要分号
    // "no-console": 1, // 0是忽略，1是警告，2是报错
    // "space-before-function-paren": 0
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
  },
};
