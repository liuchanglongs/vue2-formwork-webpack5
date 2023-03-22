<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-21 10:59:31
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 14:50:41
 * @Description: lcl
-->
<template>
  <div>
    <h3>图片一起加载:{{ rate }}</h3>
    <div class="all-preload">
      <img v-for="v in imgurl" :key="v" :src="v" alt="" />
    </div>
    <h3>图片按照顺序加载：</h3>
    <sortLoadImg></sortLoadImg>
  </div>
</template>

<script>
import sortLoadImg from './sort-load-img.vue';
export default {
  components: { sortLoadImg },
  data() {
    return {
      imgurl: [],
      rate: '00%',
      ifShow1: true,
      count: 0,
      list: [
        'http://img.daimg.com/uploads/allimg/210924/3-210924224920.jpg',
        'https://img2.baidu.com/it/u=11880906,3001230239&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
        'https://img0.baidu.com/it/u=3894703994,3097391307&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
        'https://img0.baidu.com/it/u=925843206,3288141497&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=769',
        'https://img0.baidu.com/it/u=1090378715,855752191&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
      ],
    };
  },
  created() {
    this.preload();
  },
  methods: {
    preload() {
      this.count = 0;
      const list = this.list;
      const len = list.length;
      list.forEach(url => {
        let img = new Image(0, 0);
        img.src = url;
        img.onload = img.onerror = () => {
          this.count += 1;
          let count = this.count;
          this.rate = ((count / len) * 100).toFixed(2) + '%';
          if (len == count) {
            this.imgurl = list;
          }
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 80px;
  height: 80px;
}
.all-preload {
  position: relative;
}
// .masks {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   z-index: 99;
//   background-color: red;
// }
</style>
