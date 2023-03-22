<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-21 15:37:32
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-21 22:32:49
 * @Description: lcl
-->
<template>
  <div class="long-list">
    <h1>虚拟滚动：</h1>
    <recycle-scroller
      class="virtual-list"
      :buffer="1000"
      :prerender="200"
      :item-size="42"
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
