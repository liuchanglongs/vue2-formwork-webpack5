<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-21 15:37:32
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 15:43:14
 * @Description: lcl
-->
<template>
  <div class="long-list">
    <h1>虚拟滚动：</h1>
    <!--
     buffer （默认值： 200 ）：添加到滚动可见区域边缘以开始渲染更远项目的像素数量。
     items ：要在滚动条中显示的项目列表。
     itemSize （默认值： null ）：以像素为单位显示项目的高度（或水平模式下的宽度），用于计算滚动大小和位置。如果设置为 null （默认值），它将使用可变大小模式。
     prerender （默认值： 0 ）：为服务器端渲染 (SSR) 渲染固定数量的项目。
      -->
    <recycle-scroller
      class="virtual-list"
      :buffer="200"
      :prerender="20"
      :item-size="40"
      key-field="name"
      :items="tableData"
      @scroll-end="resize"
    >
      <template v-slot="{ item, index }">
        <div class="list-item" :key="item.name">
          <span>{{ index }}</span>
          --
          <span>{{ item.id }}</span
          >-----
          <span>{{ item.name }}</span>
          <el-button size="small" @click="adds(item.name)">add</el-button>
          <el-button size="small" @click="deletes(index)">delete</el-button>
        </div>
      </template>
    </recycle-scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({ id: i, name: Math.random() });
    }
  },
  methods: {
    deletes(name) {
      const list = [];
      this.tableData.map((v, i) => {
        if (0 !== v.id) {
          list.push(v);
        }
      });
      console.log(list);
      this.tableData = list;
    },
    adds() {
      for (let i = 0; i < 10; i++) {
        this.tableData.push({ id: i, name: Math.random() });
      }
    },
    resize() {
      console.log(1);
    },
  },
};
</script>

<style lang="less" scoped>
.virtual-list {
  height: 400px;
}
</style>
