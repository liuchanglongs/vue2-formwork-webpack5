<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-26 12:23:31
 * @LastEditors: lcl
 * @LastEditTime: 2022-10-27 16:15:17
 * @Description: lcl
-->
<template>
  <div class="content-header">
    <el-page-header class="title" @back="gobackFn" :title="gobackText" v-if="goback">
    </el-page-header>
    <div class="title" v-else>{{ titleText }}</div>
    <div class="header-right">
      <el-input
        class="search-input"
        v-model.trim="formData.search"
        @input="search"
        v-if="isSearch"
        :placeholder="placeholder"
        clearable
      >
        <i slot="prefix" class="el-search-icon el-icon-search"></i>
      </el-input>
      <div class="other"><slot name="other"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({ search: '' }),
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 是否显示返回
    goback: {
      type: Boolean,
      default: false,
    },
    gobackText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      trim: '',
    };
  },
  computed: {
    titleText() {
      return this.$route.meta.title;
    },
  },
  methods: {
    search(val) {
      if (this.trim) clearTimeout(this.trim);
      this.trim = setTimeout(() => {
        this.$emit('search', { searchContetnt: val });
      }, 1000);
    },

    gobackFn() {
      this.$emit('goback');
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.content-header {
  height: 66px;
  border-radius: 2px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #f6f6f6 5px solid;
  .title {
    font-family: SourceHanSansCN-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0px;
    color: #333333;
    margin-left: 20px;
    min-width: 64px;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
  :deep(.search-input) {
    width: 370px;
    margin-right: 30px;

    .el-input__inner {
      // width: 370px;
      height: 38px;
      border-radius: 94px;
      background: #fafafa;
      border: 1px solid #fafafa;
      &:hover {
        border: 1px solid #4faa3d;
        // background: red;
      }
    }
    .el-input__prefix {
      display: flex;
      align-items: center;
      z-index: 0;
      .el-search-icon {
        width: 20.31px;
      }
    }
  }

  .other {
    margin-right: 20px;
  }

  :deep(.el-page-header) {
    .el-page-header__left {
      &::after {
        display: none;
      }
    }
  }
}
</style>
