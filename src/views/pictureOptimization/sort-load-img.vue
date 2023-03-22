<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-21 14:22:53
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 15:09:53
 * @Description: lcl
-->
<template>
  <div class="sort-load-img">
    <div class="img-box" ref="imgBox"></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isLoading: true,
      isRrr: false,
      list: [
        'http://img.daimg.com/uploads/allimg/210924/3-210924224920.jpg',
        'https://img2.baidu.com/it/u=11880906,3001230239&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
        'https://img0.baidu.com/it/u=3894703994,3097391307&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
        'https://img0.baidu.com/it/u=925843206,3288141497&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=769',
        'https://img0.baidu.com/it/u=1090378715,855752191&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
      ],
      count: 0,
    };
  },
  mounted() {
    this.sortLoad();
  },
  methods: {
    sortLoad() {
      const img = document.createElement('img');
      img.style.width = '100px';
      img.style.width = '100px';
      img.style.margin = '10px';
      img.src = this.list[this.count];
      this.$refs.imgBox.appendChild(img);
      img.onload = img.onerror = () => {
        if (this.list.length == this.count + 1) return;
        this.count += 1;
        this.sortLoad();
      };
    },
  },
};
</script>

<style lang="less" scoped>
.img-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
