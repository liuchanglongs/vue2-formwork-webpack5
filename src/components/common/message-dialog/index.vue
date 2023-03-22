<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-07-29 15:30:41
 * @LastEditors: lcl
 * @LastEditTime: 2022-08-28 19:06:27
 * @Description: lcl
-->
<template>
  <div class="message-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      :before-close="handleClose"
      :show-close="true"
      class="dialogs"
    >
      <div class="msg-box">
        <div class="icon"></div>
        <div class="content">
          <slot :row="deleteData" :name="symbol"> </slot>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose" size="small" class="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'messageDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    // 区分的标识
    symbol: {
      type: String,
      default: 'content',
    },
    deleteData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleSubmit() {
      this.dialogVisible = false;
      this.$emit('handleAction', this.symbol);
    },
  },
};
</script>

<style lang="less">
.message-dialog {
  .msg-box {
    .icon {
      width: 18px;
      height: 18px;
      background: #ffb953;
      background: url('~@/assets/images/dialog-msg.png');
      background-size: 100% 100%;
      margin: 1px 12px 0 0;
    }
  }
}

:deep(.message-dialog) {
  .msg-box {
    display: flex;
    padding-top: 37px;
    .content {
      width: 347px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: left;
      color: #333333;
    }
  }
}
</style>
