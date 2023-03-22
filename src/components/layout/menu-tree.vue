<template>
  <div class="menu-tree">
    <template v-for="(item, index) in data">
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!item.children"
        :key="index + 'index'"
        :index="item.path"
        @click="operation('close', item)"
      >
        <!-- item.meta.icon -->
        <img v-if="item.meta.icon" :src="item.meta.icon" class="ico" />
        <img v-else :src="require('@/assets/images/aside-permissions.png')" class="ico" />
        <span slot="title" class="font-r">{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- submenu菜单 -->
      <el-submenu v-else class="sub-menu" :key="index" :index="item.path">
        <template slot="title">
          <img v-if="item.meta.icon" :src="item.meta.icon" class="ico" />
          <img v-else :src="require('@/assets/images/aside-permissions.png')" class="ico" />
          <span slot="title" class="font-r">{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item2, index) of item.children"
            :key="index + '12'"
            :index="item2.path"
            class="sub-item"
          >
            <span slot="title" class="font-r">{{ item2.meta.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'menuTree',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="less" scoped></style>
