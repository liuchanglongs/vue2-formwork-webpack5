<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-19 11:12:12
 * @Description: lcl
-->
<template>
  <div id="app">
    <router-view :key="key"> </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.params.id || this.$route.name;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.texts {
  font-size: 16px;
}
</style>
