<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-18 22:35:31
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-20 14:04:35
 * @Description: lcl
-->
<template>
  <div>
    <div v-for="item in asideMenu" :key="item.meta.title">
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!item.children"
        :index="item.path"
        @click="open(item.path)"
      >
        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
        <span slot="title" class="font-r">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- submenu菜单 -->
      <el-submenu v-else :index="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title" class="font-r">{{ item.meta.title }}</span>
        </template>
        <!-- <el-menu-item-group> -->
        <loop-menu :asideMenu="item.children"></loop-menu>
        <!-- </el-menu-item-group> -->
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loop-menu',
  props: {
    asideMenu: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // operation(type, item) {
    //   // 关闭二级菜单
    //   if (type === 'close') {
    //     this.$refs.elMenus.close('/home/permission-manage');
    //   }
    // },
    open(path) {
      console.log(path);
    },
  },
  created() {
    // console.log('asideMenu-->', this.asideMenu);
  },
};
</script>

<style lang="less" scoped></style>
