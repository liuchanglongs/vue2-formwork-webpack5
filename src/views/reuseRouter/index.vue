<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-15 18:54:52
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 17:04:43
 * @Description: lcl
-->
<template>
  <div>
    <p>复用同一个路由，要求切换同一个路由生命周期也要重新执行：</p>
    <p>
      不改变的原因：Vue 认为这个组件已经被创建并且已经存在于 DOM
      中，因此不需要重新执行生命周期
    </p>
    <p>方法：改变组件的key,让vue重新比较dom</p>
    <p>1. router-view组件,监听路由传值不同，加上不同属性key</p>
    <p>2. 把要复用的组件封装成一个单独的组件，加上不同属性的key</p>
    <br />
    <br />
    <p>路由传值：</p>
    <ol>
      <li>params（显示传参）： /reuse-router/${id}</li>
      <li>params（隐式传参）： {path:"", params:{id:''}} -->页面刷新会丢失</li>
      <li>query: this.$router.push(`/reuse-router/${id}?id=${id}`);</li>
    </ol>
    <br />
    <br />
    <br />
    <el-button @click="go(1)">按钮1</el-button>
    <el-button @click="go(2)">按钮2</el-button>
    <el-button @click="go(3)">按钮3</el-button>
  </div>
</template>

<script>
export default {
  created() {
    console.log('---created');
  },
  methods: {
    go(id) {
      this.$router.push(`/reuseRouter/${id}`);
      // console.log(this.$route.params);
    },
  },
  mounted() {
    console.log('--mounted');
  },
};
</script>

<style lang="less" scoped></style>
