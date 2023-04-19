/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-19 15:33:34
 * @Description: lcl
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    // '@vue/prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'quotes': 2, // 双引号
    // 'semi': 1, // 是否需要分号
    // 'no-console': 1, // 0是忽略，1是警告，2是报错
    // 'space-before-function-paren': 0,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
    // 'no-undef': 0,
    // 'linebreak-style': [0, 'error', 'windows'],
    // 'no-debugger': 0,
    // 'no-multiple-template-root': 0,
    // 'no-v-for-template-key': 1,
    // 'vue/no-reserved-keys': 0,
    // 'valid-template-root': 1,
    // 'quote-props': 0,
  },
};
