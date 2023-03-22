<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-20 15:32:22
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 10:59:11
 * @Description: lcl
-->
<template>
  <div class="picture-optimization">
    <div class="item">
      <imageElementuiLazy></imageElementuiLazy>
    </div>
    <div class="item">
      <h1>通过new Image()预加载</h1>
      <div
        :class="['no-hover-pre', ismouseenterdiv ? 'hover-pre' : '']"
        @mouseenter="mouseenterdiv"
      ></div>
      <div
        :class="['no-hover-pre', ismouseenterdiv ? 'hover-pre2' : '']"
        @mouseenter="mouseenterdiv"
      ></div>
    </div>
    <div class="item">
      <cssPreLoad></cssPreLoad>
    </div>
    <div class="item">
      <allPreload></allPreload>
    </div>
  </div>
</template>
<script>
import cssPreLoad from './css-pre-load.vue';
import imageElementuiLazy from './image-elementui-lazy.vue';
import allPreload from './all-preload.vue';
export default {
  components: {
    cssPreLoad,
    imageElementuiLazy,
    allPreload,
  },
  data() {
    return {
      importUrl: require('@/assets/image/baby.jpeg'),
      ismouseenterdiv: false,
      imgArry: [
        'https://img2.baidu.com/it/u=2755136447,1374227815&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
        'https://img2.baidu.com/it/u=3311458432,501503621&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
        'https://img0.baidu.com/it/u=3950015208,144429487&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708',
        'https://img0.baidu.com/it/u=953394885,1133990800&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
        'https://img2.baidu.com/it/u=1381481047,1529970259&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500',
        'https://img0.baidu.com/it/u=2022043590,1237511079&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
        'https://img1.baidu.com/it/u=3749107807,315561268&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      ],
    };
  },
  methods: {
    mouseenterdiv() {
      this.ismouseenterdiv = true;
    },
  },
};
</script>

<style lang="less" scoped>
.picture-optimization {
  display: flex;
  flex-wrap: wrap;
  height: 880px;
}

.item {
  width: 400px;
  height: 500px;
  overflow: auto;
}

.no-hover-pre {
  width: 200px;
  height: 200px;
  background: red;
}
.hover-pre {
  background: url('https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500')
    no-repeat;
  background-size: 100%;
}
.hover-pre2 {
  background: url('@/assets/image/baby.jpeg') no-repeat;
  background-size: 100%;
}
</style>
