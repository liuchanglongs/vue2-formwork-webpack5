<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 15:19:00
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-23 00:12:55
 * @Description: lcl
-->
<template>
  <div class="scroll-table-list">
    <h3>el-table->长列表优化:</h3>
    <el-table
      v-scrollTableList="{ itemheight }"
      :data="tableData.slice(start, over)"
      style="width: 100%"
      height="500"
      :row-style="{ height: itemheight + 'px' }"
    >
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      itemheight: 49,
    };
  },
  mounted() {
    setTimeout(() => {
      const _arr = [];
      for (let index = 0; index < 500; index++) {
        _arr.push({
          id: index,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        });
        this.tableData = _arr;
      }
    }, 100);
  },
};
</script>

<style lang="less" scoped>
.scroll-table-list {
  height: 100%;
}
// .el-table {
//   height: 500px;
//   overflow: auto;
// }
</style>
