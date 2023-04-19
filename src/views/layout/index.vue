<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 10:03:30
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 22:35:01
 * @Description: lcl
-->
<template>
  <div class="layout">
    <el-container class="layout-box">
      <el-aside width="200px" class="aside">
        <div class="aside-header">FormWork</div>
        <asideMenuItem></asideMenuItem>
      </el-aside>
      <el-container>
        <el-header>
          <contentHeader></contentHeader>
        </el-header>
        <el-header>
          <tags></tags>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenuItem from './aside-menu-item.vue';
import contentHeader from './content-header.vue';
import tags from './tags.vue';

export default {
  name: 'layout',
  components: {
    asideMenuItem,
    contentHeader,
    tags,
  },
  data() {
    return {
      defaultActive: null,
      isShowOrganization: true,
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(newValue) {},
      immediate: true,
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.layout {
  // width: 98vw;
  height: 100vh;
  background-color: #f4f4f4;

  .aside-header {
    height: 56px;
    line-height: 56px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    color: #ffffff;
  }
  .layout-box {
    height: 100%;
  }
}
</style>
