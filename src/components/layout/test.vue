<template>
  <div class="aside-menu">
    <el-menu
      unique-opened
      class="el-menu-vertical-demo"
      :router="true"
      :default-openeds="openArr"
      @open="handleOpen"
    >
      <!-- :default-active="defaultActive"  -->
      <el-menu-item index="/work-platform" class="aside-work">
        <i></i>
        <span slot="title" class="font-r">工作台</span>
      </el-menu-item>

      <el-submenu class="aside-permission" index="/permission-manage">
        <template slot="title">
          <i></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/permission-manage" class="permission-manage">
            <span slot="title" class="font-r">权限管理</span>
          </el-menu-item>
          <el-menu-item index="/user-manage" class="user-manage">
            <span slot="title" class="font-r">用户管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/message" class="aside-message">
        <i></i>
        <span slot="title" class="font-r">消息中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'asideMenuItem',
  data() {
    return {
      openArr: [],
      defaultActive: null,
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        let submenu = document.getElementsByClassName('el-menu-item');
        for (let i = 0; i < submenu.length; i++) {
          submenu[i].classList.remove('is-active');
        }
        if (newValue.path.includes('/work-platform')) {
          this.$nextTick(() => {
            let subitem = document.getElementsByClassName('aside-work');
            subitem[0].className = 'el-menu-item aside-work is-active';
            this.openArr = [];
          });
        } else if (newValue.path.includes('/message')) {
          this.$nextTick(() => {
            let subitem = document.getElementsByClassName('aside-message');
            subitem[0].className = 'el-menu-item aside-message is-active';
            this.openArr = [];
          });
        } else if (newValue.path.includes('/permission-manage')) {
          this.$nextTick(() => {
            let subitem = document.getElementsByClassName('permission-manage');
            subitem[0].className = 'el-menu-item permission-manage is-active';
            this.openArr = ['2'];
          });
        } else if (newValue.path.includes('/user-manage')) {
          this.$nextTick(() => {
            let subitem = document.getElementsByClassName('user-manage');
            subitem[0].className = 'el-menu-item user-manage is-active';
            this.openArr = ['2'];
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleOpen(index, path) {
      this.$router.push({ path: '/permission-manage' });
      console.log(index, path);
    },
  },
};
</script>

<style lang="less" scoped>
.aside-menu {
  width: 148px;
  margin: 52px auto 0 auto;
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
    span {
      display: block;
      color: #999999;
    }
  }
  .aside-work {
    i {
      display: block;
      margin-right: 12px;
      width: 16px;
      height: 16px;
      background: url(../../assets/images/aside-work.png) no-repeat;
    }
  }
  .aside-work.is-active,
  .aside-work:hover {
    background-color: #4faa3d;
    i {
      background: url(../../assets/images/aside-work-select.png) no-repeat;
    }
    span {
      color: #ffffff;
    }
  }
  :deep(.aside-permission) {
    margin-bottom: 18px;
    &.is-opened {
      .el-submenu__title {
        color: #ffffff;
        background-color: #4faa3d;
        i:nth-child(1) {
          background: url(../../assets/images/aside-permissions-select.png) no-repeat;
        }
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
      i:nth-child(1) {
        display: block;
        margin-right: 12px;
        width: 16px;
        height: 16px;
        background: url(../../assets/images/aside-permissions.png) no-repeat;
      }
    }
    .el-submenu__title:hover,
    .el-submenu__title.is-active {
      color: #ffffff;
      background-color: #4faa3d;
      i:nth-child(1) {
        background: url(../../assets/images/aside-permissions-select.png) no-repeat;
      }
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
      }
      .el-menu-item:hover,
      .el-menu-item.is-active {
        position: relative;
        background-color: #fafafa;
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
          // border: 1px solid #4faa3d;
          background-color: #4faa3d;
        }
      }
    }
  }
  .aside-message > i {
    display: block;
    margin-right: 12px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/aside-message.png) no-repeat;
  }
  .aside-message.is-active,
  .aside-message:hover {
    border-radius: 5px;
    background-color: #4faa3d;
    i {
      background: url(../../assets/images/aside-message-select.png) no-repeat;
    }
    span {
      color: #ffffff;
    }
  }
}
</style>

<!-- menuList: [
        {
          menu_name: '租户管理',
          path: '/tenantManage',
          icon: 'el-icon-menu',
          childList: [
            {
              menu_name: '租户审核',
              path: '/tenantReview',
              icon: 'el-icon-s-management',
              childList: [],
            },
            {
              menu_name: '租户管理',
              path: '/tenantManage',
              icon: 'el-icon-s-shop',
              childList: [],
            },
          ],
        },
        {
          menu_name: '未认证用户管理',
          path: '/touristManage',
          icon: 'el-icon-s-home',
          childList: [],
        },
        {
          menu_name: '消息中心',
          path: '/message',
          icon: 'el-icon-s-home',
          childList: [],
        },
      ], -->
