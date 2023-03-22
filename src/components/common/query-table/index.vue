<template>
  <div class="query-table">
    <div class="content-box">
      <el-row>
        <el-col :span="4" v-if="isTbleTreeAside" class="table-aside">
          <slot v-if="tbleTreeAsideSoltName" :name="tbleTreeAsideSoltName"></slot>
        </el-col>
        <el-col :span="isTbleTreeAside ? 20 : 24">
          <div v-if="headerSlotName" class="header-button buttons">
            <slot :name="headerSlotName"></slot>
          </div>
          <el-table
            class="table-content"
            ref="queryTable"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            style="width: 100%"
            :row-key="rowkey"
            :stripe="stripe"
            :empty-text="emptyText"
            :default-expand-all="defaultExpandAll"
            :tree-props="treeProps"
            @selection-change="selectionChange"
          >
            <el-table-column
              v-for="item in tableColumns"
              :key="item.prop"
              :type="item.type || ''"
              :formatter="item.formatter"
              :prop="item.prop || ''"
              :label="item.label || '#'"
              :width="item.width || 'auto'"
              :fixed="item.fixed || false"
              :reserve-selection="reserveSelection"
              :align="item.align || 'left'"
              :show-overflow-tooltip="item.isShowOverflowTooltip || false"
            >
              <template #default="{ row, column, $index }" v-if="item.slotName">
                <slot
                  :name="item.slotName"
                  :item="item"
                  :column="column"
                  :index="$index"
                  :row="row"
                ></slot>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="paginations" v-if="isShowPagination > 1">
      <el-pagination
        ref="pagination"
        v-bind="paginationConfig"
        :page-size="paginationData.pageSize"
        :total="paginationData.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'queryTable',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    headerSlotName: {
      type: String,
      default: '',
    },
    // 是否显示table的侧边栏树
    isTbleTreeAside: {
      type: Boolean,
      default: false,
    },
    //设置table的侧边栏树的插槽
    tbleTreeAsideSoltName: {
      type: String,
      default: '',
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    rowkey: {
      type: String,
      default: 'id',
    },
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' }),
    },
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => {
        return [
          {
            prop: 'name',
            label: 'name',
            width: '180',
            formatter: item => {
              return item;
            },
          },
        ];
      },
    },
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          'small': true,
          'background': true,
          // 'layout': 'prev,pager,next,sizes,jumper',
          'disabled': false,
          'page-sizes': [10, 20, 50, 100],
          'layout': 'prev,pager,next,sizes,jumper',
        };
      },
    },
    paginationData: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          total: 10,
          pageNum: 1,
        };
      },
    },
  },
  data() {
    return {
      //false:size没有被改变，total<size，分页组件不显示
      //true:size被改变，分页组件显示
      isHandleSizeChange: false,
    };
  },
  computed: {
    isShowPagination() {
      if (!this.isHandleSizeChange) {
        console.log('---');
        return Math.ceil(this.paginationData.total / this.paginationData.pageSize);
      } else {
        console.log('++');
        return 2;
      }
    },
  },
  methods: {
    //  点击分页
    handleCurrentChange(val) {
      this.paginationData.pageNum = val;
      this.$emit('submitForm', { page: val, size: this.paginationData.pageSize });
    },
    // 选择每页显示条数
    handleSizeChange(val) {
      this.isHandleSizeChange = true;
      this.paginationData.pageSize = val;
      // 防止页数*pageSize>total，页面显示空白
      if (this.paginationData.pageNum != 1) {
        const numMsg = this.paginationData.pageSize * (this.paginationData.pageNum - 1);
        if (this.paginationData.total <= numMsg) {
          const pageNum = Math.ceil(this.paginationData.total / this.paginationData.pageSize);
          this.paginationData.pageNum = pageNum;
        }
      }
      this.$emit('submitForm', { page: this.paginationData.pageNum, size: val });
    },
    // table的多选事件
    selectionChange(val) {
      this.$emit('selectionChange', { ...val });
    },
    // table的侧边栏点击每个字节点的事件
    handleNodeClick(data) {
      this.$emit('handleTable', data);
    },
    //input框过滤节点
    filterNode(value, data) {
      console.log('value:', data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 懒加载
    loadNode(node, resolve) {
      this.$emit('loadNode', node, resolve);
    },
  },
};
</script>

<style lang="less" scoped>
.query-table {
  height: calc(100vh - 144px);
  .header-button {
    padding: 16px 16px 14px;
  }
  .content-box {
    .table-aside {
      // max-height: calc(100vh - 340px);
      // background: red;
      // overflow: auto;
      padding: 14px 6px 0;
      // min-width: 160px;
    }
  }

  .el-table::before {
    height: 0;
  }

  :deep(.table-content) {
    max-height: calc(100vh - 340px);
    overflow: auto;
    .el-table__cell {
      padding: 14px 0;
    }
    .el-table__header-wrapper {
      .el-table__header {
        .el-table__cell {
          padding: 15px 0;
        }
        .cell {
          font-family: SourceHanSansCN-Regular;
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #333333;
        }
        th {
          background: #fafafa;
        }
        .has-gutter {
          height: 54px;
        }
      }
    }
    .el-table__body-wrapper {
      .el-table__row {
        height: 54px;
        font-family: SourceHanSansCN-Regular;
        font-size: 13px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #666666;
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-radius: 2px;
      background: #ffb953;
      border: 1px solid #ffb953;
    }
    .el-checkbox__input :hover {
      border: 1px solid #ffb953;
    }
    .el-checkbox__inner {
      border-radius: 2px;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
  .paginations {
    // position: relative;
    margin-top: 80px;
    display: flex;
    justify-content: right;
    .el-pagination {
      margin-right: 35px;
    }
  }
  :deep(.el-pagination.is-background) {
    .btn-next,
    .btn-prev,
    .el-pager li {
      width: 28px;
      height: 28px;
      line-height: 28px;
      background-color: #ffffff;
      border-radius: 2px;
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      letter-spacing: 0px;
      color: rgba(51, 51, 51, 0.65);
    }
    .el-pagination__sizes {
      height: 28px;
      margin-left: 8px;
      margin-right: 7px;
      .el-input {
        input {
          font-family: SourceHanSansCN-Regular;
          font-size: 12px;
          font-weight: normal;
          letter-spacing: 0px;
          color: rgba(51, 51, 51, 0.65);
        }
      }
    }
    .el-pagination__jump {
      height: 28px;
      line-height: 28px;
      margin-left: 0;
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      font-weight: normal;
      letter-spacing: 0px;
      color: rgba(51, 51, 51, 0.65);
      .el-pagination__editor {
        margin: 0 10px;
        .el-input__inner {
          height: 28px;
          font-family: SourceHanSansCN-Regular;
          font-size: 12px;
          font-weight: normal;
          letter-spacing: 0px;
          color: rgba(51, 51, 51, 0.65);
        }
      }
    }
  }

  :deep(.el-pagination .is-background .el-pager li:not(.disabled).active) {
    background: #4faa3d;
    box-shadow: 0px 2px 9px 0px rgba(79, 170, 61, 0.36);
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #fff;
  }
}
</style>
