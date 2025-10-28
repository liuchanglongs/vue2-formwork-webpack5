<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:18
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-15 13:48:21
 * @Description: lcl
-->

# formwork

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```
formwork
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ src
│  ├─ assets
│  │  ├─ image
│  │  └─ style
│  ├─ components
│  ├─ main.js
│  ├─ permission.js
│  ├─ plugins
│  ├─ router
│  │  ├─ index.js
│  │  └─ routes
│  ├─ store
│  │  └─ index.js
│  └─ views
│  ├─ App.vue
├─ .browserslistrc
├─ .eslintignore
├─ .eslintrc.js
├─ .git
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ babel.config.js
├─ jsconfig.json
├─ package.json
├─ README.md
├─ vue.config.js
└─ yarn.lock

```

# 功能点

1. 浏览器进度条：路由、axios 中封装

- nprogress 插件

2. 动态路由
3. 自定义无感刷新页
4. svg->精灵图->icon（没有转 icon 只有 icon 的一些功能）

- 批量导入 .svg 文件的写法
- svg -> icon: 可以设置 color、font-size
