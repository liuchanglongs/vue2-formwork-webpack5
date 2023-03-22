<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-20 23:07:05
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 10:58:32
 * @Description: lcl
-->
<template>
  <div class="css-pre-load">
    <div class="boxs">
      <h3>通过css预加载-></h3>
      <p>css隐藏：width、height为0</p>
      <el-button @click="show">显示</el-button>
      <!-- css隐藏：图片加载好了在赋值url-->
      <img
        :src="
          isShow
            ? 'https://img0.baidu.com/it/u=1727590956,2341015234&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=369'
            : ''
        "
        alt=""
      />
      <ul id="preImg-boxs">
        <li id="preImg1" />
        <li id="preImg2" />
        <li sid="preImg3" />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      document.querySelector('#preImg-boxs').innerHTML = `
        <li><img class="img" src="https://img0.baidu.com/it/u=2734968740,2383881796&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666"></li>
        <li><img class="img" src="https://img2.baidu.com/it/u=2480106139,2144834787&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=552"></li>
        <li><img class="img" src="https://img1.baidu.com/it/u=3006941784,498362026&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=499"></li>`;
    },
  },
};
</script>

<style lang="less" scoped>
#preImg-boxs {
  width: 250px;
  height: 400px;
  overflow-y: auto;
  .img,
  img {
    width: 200px;
    height: 200px;
    margin: 20px 0;
  }
}
/* 预加载文件 */
#preImg1 {
  background-image: url('https://img0.baidu.com/it/u=2734968740,2383881796&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666');
  width: 0;
  height: 0; /* 隐藏用来预加载的标签 */
}

#preImg2 {
  background-image: url('https://img2.baidu.com/it/u=2480106139,2144834787&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=552');
  width: 0;
  height: 0;
}

#preImg3 {
  background-image: url('https://img1.baidu.com/it/u=3006941784,498362026&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=499');
  width: 0;
  height: 0;
}

.pre-img4 {
  background-image: url('https://img0.baidu.com/it/u=1727590956,2341015234&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=369');
  width: 0;
  height: 0;
}
</style>
