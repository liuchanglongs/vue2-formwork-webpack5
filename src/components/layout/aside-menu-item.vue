<template>
  <div class="aside-menu">
    <el-menu
      ref="elMenus"
      unique-opened
      class="el-menu-vertical-demo"
      :router="true"
      :default-active="defaultActive"
      @open="handleOpen"
      @select="handleSelect"
    >
      <template v-for="(item, index) in asideList">
        <!-- 一级菜单 -->
        <el-menu-item
          v-if="!item.children"
          :key="index + 'index'"
          :index="item.path"
          @click="operation('close', item)"
        >
          <!-- <img v-if="isShow" :src="require(`@/assets/images/${item.meta.icon}`)" class="ico" />
          <img v-else :src="item.meta.icon" class="ico" /> -->
          <span slot="title" class="font-r">{{ item.meta.title }}</span>
        </el-menu-item>
        <!-- submenu菜单 -->
        <el-submenu v-else class="sub-menu" :key="index" :index="item.path">
          <template slot="title">
            <!-- <img v-if="isShow" :src="require(`@/assets/images/${item.meta.icon}`)" class="ico" />
            <img v-else :src="item.meta.icon" class="ico" /> -->
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
    </el-menu>
  </div>
</template>

<script>
import { routes } from '@/router/index';

import { mapGetters } from 'vuex';
export default {
  name: 'asideMenuItem',
  data() {
    return {
      // 图片路径
      src: '@/assets/images/',
      openArr: [],
      defaultActive: null,
      item: [],
      isShow: true, // 展示用户平台侧边栏图标
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        this.$nextTick(() => {
          this.defaultActive = '';
          this.defaultActive = newValue.path;
        });
        if (newValue.path.split('/')[1] === 'home') {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      immediate: true,
    },
  },
  computed: {
    asideList() {
      return routes[0].children;
    },
  },
  methods: {
    handleSelect(index, path) {
      // console.log(index, path);
    },
    operation(type, item) {
      // 关闭二级菜单
      if (type === 'close') {
        this.$refs.elMenus.close('/home/permission-manage');
      }
    },
    handleOpen(path) {
      // 清除点击二级菜单盒子，一级菜单css没被清楚
      this.$router.push({ path: path });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.aside-menu {
  // width: 148px;
  margin: 54px auto 0 auto;
  // height: calc(100vh - 295px);
  .el-menu {
    width: 100%;
    border: none;
  }

  .el-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-bottom: 18px;
    border-radius: 5px;
    pointer-events: auto;
    cursor: pointer;

    &.is-active {
      background-color: #4faa3d;

      span {
        color: #ffffff;
      }
    }

    &:hover {
      background-color: #4faa3d;

      span {
        color: #ffffff;
      }
    }

    span {
      display: block;
      color: #999999;
    }
  }

  // 图标设置
  .ico {
    display: block;
    margin-right: 12px;
    width: 16px;
    height: 16px;
  }

  :deep(.sub-menu) {
    margin-bottom: 18px;

    &.is-opened {
      .el-submenu__title {
        color: #ffffff;
        background-color: #4faa3d;
      }
    }

    li {
      width: 148px !important;
    }

    .el-submenu__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      border-radius: 5px;
      color: #999999;
      cursor: pointer;
    }

    .el-submenu__title:hover,
    .el-submenu__title.is-active {
      color: #ffffff;
      background-color: #4faa3d;
    }

    .el-submenu__icon-arrow {
      display: none;
    }

    .el-menu-item-group {
      .el-menu-item {
        width: 148px;
        margin-bottom: 5px;
        padding: 0;
        min-width: 0;
        cursor: pointer;
      }

      .sub-item:hover,
      .sub-item.is-active {
        position: relative;
        background-color: #fafafa;
        cursor: pointer;

        span {
          color: #4faa3d;
        }

        &::after {
          position: absolute;
          top: 12px;
          left: 172px;
          content: '';
          display: block;
          width: 2px;
          height: 14px;
          background-color: #4faa3d;
        }
      }
    }
  }
}
</style>
