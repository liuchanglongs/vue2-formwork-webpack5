<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-18 16:22:11
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-20 14:37:32
 * @Description: lcl
-->
<template>
  <div class="content-header">
    <div class="left-box flex-center">
      <i class="el-icon-s-fold"></i>
      <!-- <i class="el-icon-s-unfold"></i> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-box">
      <!-- 搜索路由然后跳转 -->
      <div class="search-router">
        <i class="el-icon-search"></i>
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <!-- 全屏功能 -->
      <!-- <svg-icon icon-class="lock" class-name="lock" /> -->
      <svg-icon
        :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="click"
      />

      <!-- 头像下拉框 -->
      <el-dropdown>
        <!-- <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      isFullscreen: true,
    };
  },
  methods: {
    click() {},
  },
};
</script>

<style lang="less" scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
