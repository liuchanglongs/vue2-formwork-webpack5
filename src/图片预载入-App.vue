<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 23:09:31
 * @Description: lcl
-->
<template>
  <div id="app">
    <router-view></router-view>
    <div class="img-pre-imgs1"></div>
    <div class="img-pre-imgs2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // 图像预载入
    // 对于浏览器载入图像来说，只有在对图像发送一个 HTTP请求之后，它们才会被浏览器载入，对图像的 HTTP 请求要么使用 ＜img＞ 标记，要么通过方法调用实现。
    // [
    //   require('@/assets/image/baby.jpeg'),
    //   'https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    // ].map(v => {
    //   let image = new Image(0, 0);
    //   image.className = 'lcl-test-img';
    //   image.src = v;
    // });
  },
  // created() {
  //   console.log(document.querySelector('.lcl-test-img'));
  // },
};
</script>

<style lang="less" scoped>
// .img-pre-imgs1 {
//   width: 0;
//   height: 0;
//   background: url('@/assets/image/baby.jpeg');
// }
// .img-pre-imgs2 {
//   width: 0;
//   height: 0;
//   background: url('https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500');
// }
</style>
