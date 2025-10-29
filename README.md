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

5. 虚拟滚动："vue-virtual-scroller": "^1.1.2",

6. 长列表优化：/scrollTableList

- 改为虚拟滚动

7. 复用同一个路由，要求切换同一个路由生命周期也要重新执行：

- 页面：/reuseRouter/:id

8. 图片优化：/pictureOptimization

- 通过 el-image 懒加载
- 通过 css 预加载
- 通过指令预加载
- 通过 new Image(0, 0)、document.createElement('img');来实现图片一起加载、预加载、按照顺序加载。

9. 重定向页面：返回 h 函数，利用 replace 跳回原页面

- redirect/index.vue
