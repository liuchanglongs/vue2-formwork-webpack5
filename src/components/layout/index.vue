<template>
  <div class="layout">
    <el-container>
      <el-header> </el-header>
      <el-container>
        <el-aside width="200px">
          <asideMenuItem ref="asideMenu"></asideMenuItem>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenuItem from './aside-menu-item.vue';
import { mapState } from 'vuex';

export default {
  name: 'layout',
  components: {
    asideMenuItem,
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
  beforeDestroy: function () {},
};
</script>

<style lang="less" scoped>
.layout {
  width: 98vw;
  height: 100vh;
  background-color: #f4f4f4;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    // border: 1px solid #000;
    box-shadow: 0 5px 5px #f2f2f2;

    .header-left {
      overflow: hidden;
      // border: 1px solid #000;
      .logo {
        width: 44px;
        height: 44px;
        align-items: center;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        margin-right: 14px;
        box-shadow: 0px 4px 10px 0px rgba(175, 175, 175, 0.3);
        img {
          display: block;
          width: 30px;
          height: 24px;
          // border: 1px solid #000;
        }
      }

      span {
        color: #4faa3d;
        font-size: 18px;
      }
    }
    .header-right {
      width: 100px;
      justify-content: space-around;
      .el-badge {
        margin-top: 5px;
        margin-right: 20px;
        cursor: pointer;
        img {
          display: block;
        }
      }

      .header-pic {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ffb953;
        // background: url(../../assets/images/user-portrait.svg) no-repeat;
        background-size: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    // border: 1px solid #000;
    // box-shadow: 5px 0 5px #f2f2f2;
  }
  .el-menu {
    border: none;
  }
  .el-main {
    overflow: auto;
    background-color: #ffffff;
    margin: 12px 0 0 12px;
    padding: 0;
    color: #333;
    height: calc(100vh - 80px);
  }
  .el-container {
    height: 100%;
  }
}
</style>

<style lang="less">
.popover-logout {
  margin-top: 15px !important;
  width: 0px !important;
  border: 0;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
  .login-out {
    height: 40px;
    width: 158px;
    background: #ffffff;
    display: flex;
    align-items: center;
    line-height: 40px;
    font-family: SourceHanSansCN-Regular;
    font-size: 15px;
    font-weight: normal;
    letter-spacing: 0px;
    border-radius: 10px;
    color: #4faa3d;
    position: absolute;
    right: 23px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(203, 203, 203, 0.3);
    .login-icon {
      display: block;
      margin: 0 8px 0 18px;
      width: 17px;
      height: 17px;
      // background: url(../../assets/images/logout.png) no-repeat;
      background-size: 17px 17px;
    }
  }
}
</style>
