<template>
  <div class="edu-table">
    <avue-crud
      ref="crud"
      :data="tableData"
      :option="option"
      :page.sync="page"
      @on-load="onLoad"
      @selection-change="selectionChange"
    >
      <template slot-scope="{ size }" slot="menuLeft">
        <el-button type="success" icon="el-icon-plus" :size="size" @click="handleAdd"
          >新增</el-button
        >
        <el-button type="success" icon="el-icon-plus" :size="size" @click="handleAdd"
          >模板下载</el-button
        >
        <el-button type="success" icon="el-icon-plus" :size="size" @click="handleAdd"
          >数据导入</el-button
        >
        <el-button type="success" icon="el-icon-plus" :size="size" @click="handleAdd"
          >数据导出</el-button
        >
        <el-button type="success" icon="el-icon-plus" :size="size" @click="handleAdd"
          >数据表设计</el-button
        >
        <el-button type="danger" icon="el-icon-plus" :size="size" @click="handleAdd"
          >删除</el-button
        >
      </template>
    </avue-crud>
  </div>
</template>

<script>
export default {
  name: 'professionalManagement',
  props: {
    page: {
      type: Object,
      default: () => {
        return {
          pageSize: 20,
          pagerCount: 5,
        };
      },
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableOptions: {
      type: Object,
      default: () => {
        return {
          menu: true,
          viewBtn: true,
          selection: true,
          align: 'center',
          menuAlign: 'center',
          index: true,
          indexLabel: '序号',
          border: true,
          column: [],
        };
      },
    },
    column: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    column: {
      handler(newValue) {
        this.option.column = newValue;
      },
      immediate: true,
    },
  },
  data() {
    return {
      option: {
        addBtn: false,
        menu: true,
        viewBtn: true,
        selection: true,
        align: 'center',
        menuAlign: 'center',
        index: true,
        indexLabel: '序号',
        border: true,
        column: [],
      },
    };
  },
  methods: {
    // 加载数据
    onLoad(page) {
      this.$emit('on-load', page);
    },
    // 选中数据
    selectionChange(list) {
      this.$emit('select-change', list);
      this.$message.success('选中的数据' + JSON.stringify(list));
    },
  },
};
</script>

<style lang="less" scoped>
.edu-table {
  margin: 10px;
}
</style>
