<template>
  <div class="operation-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      :before-close="handleClose"
      class="dialogs"
      :close-on-click-modal="false"
    >
      <!-- 标签页表单 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isTabs">
        <el-tab-pane label="手机号码认证" name="first">
          <!-- <span class="psd-info">请填写完整的手机号码{{ phoneNumber }}以验证身份</span> -->
          <queryForm
            ref="phone"
            :formData="currentData[0]"
            :formConfig="formConfig[0]"
            :isButton="false"
            :span="20"
            :rules="rules[0]"
            labelPosition="left"
            @send-code="sendCode"
          ></queryForm>
        </el-tab-pane>
        <el-tab-pane label="邮箱认证" name="second">
          <!-- <span class="psd-info">请填写正确的邮箱以验证身份</span> -->
          <queryForm
            ref="email"
            :formData="currentData[1]"
            :formConfig="formConfig[1]"
            :isButton="false"
            :span="20"
            :rules="rules[1]"
            labelPosition="left"
            @send-code="sendCode"
          ></queryForm>
        </el-tab-pane>
      </el-tabs>
      <!-- 表单 -->
      <queryForm
        ref="queryForms"
        :formData="currentData"
        :formConfig="formConfig"
        :isButton="false"
        :span="20"
        :rules="rules"
        labelPosition="left"
        @send-code="sendCode"
        v-else
      ></queryForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose" size="small" class="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="handleSubTab" v-if="isTabs">{{
            confirmText
          }}</el-button>
          <el-button type="primary" size="small" @click="handleSubmit" v-else>{{
            confirmText
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'operationDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    currentData: {
      type: Object,
      default: () => ({}),
    },
    formConfig: {
      type: Array,
      default: () => [
        {
          type: null,
          label: null,
          prop: null,
          placeholder: null,
          slot: null,
          icon: null,
        },
      ],
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
      copyFormData: {},
      confirmText: '确认',
      isTabs: false,
      activeName: 'first',
      // tab栏表单数据
      tabData: [],
      tabConfig: [],
      tabIndex: '',
      // 现有的手机号
      phoneNumber: '',
    };
  },
  // 解决规则为change，切换dialog出发验证
  watch: {
    dialogVisible: {
      handler(nval, oval) {
        if (!nval && !Object.keys(this.copyFormData).length > 0) {
          this.copyFormData = this.currentData;
        }
      },
      immediate: true,
    },
  },

  methods: {
    // 切换tabs
    handleClick(tab) {
      this.tabIndex = tab.index;
    },
    // tab表单确认(修改密码)
    handleSubTab() {
      // console.log('tab表单确认');
      // console.log(this.tabIndex);
      let data = {};
      // 0 手机认证 1 邮箱认证
      if (this.tabIndex === '1') {
        // console.log('邮箱认证', this.currentData[1]);
        data = this.currentData[1];
        this.$refs.email.$refs.queryForm.validate(val => {
          if (val) {
            this.$emit('handleSubTab', { type: this.title, data: { ...data } });
          }
        });
      } else {
        // console.log('手机认证', this.currentData[0]);
        data = this.currentData[0];
        this.$refs.phone.$refs.queryForm.validate(val => {
          if (val) {
            this.$emit('handleSubTab', { type: this.title, data: { ...data } });
          }
        });
      }
    },
    // 发送验证码
    sendCode(data) {
      this.$emit('send-code', { isTabs: this.isTabs, data: { ...data } });
    },
    handleClose() {
      if (this.isTabs) {
        // console.log('tab的表单重置');
        this.$refs.phone.$refs.queryForm.resetFields();
        this.$refs.email.$refs.queryForm.resetFields();
        this.$refs.phone.buttonName = '获取验证码';
        this.$refs.email.buttonName = '获取验证码';
        this.$refs.phone.clear();
        this.$refs.email.clear();
      } else {
        // console.log('不是tab的表单重置');
        this.$refs.queryForms.$refs.queryForm.resetFields();
        // console.log(this.$refs.queryForms);
        this.$refs.queryForms.buttonName = '获取验证码';
        this.$refs.queryForms.clear();
      }
      this.dialogVisible = false;
      Object.assign(this.currentData, this.copyFormData);
    },
    // 单个表单确认
    handleSubmit() {
      // console.log('单个表单确认');
      this.$refs.queryForms.$refs.queryForm.validate(val => {
        if (val) {
          // console.log(this.currentData);
          if (this.title === '修改密码') {
            this.$emit('handleSubmit', {
              type: this.title,
              data: { confirmPsd: this.currentData.confirmPsd, newPsd: this.currentData.newPsd },
            });
            return;
          }
          this.$emit('handleSubmit', { type: this.title, data: { ...this.currentData } });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.operation-dialog {
  :deep(.el-dialog) {
    //   width: 478px;
    //   .el-dialog__title {
    //     font-family: 'SourceHanSansCN-Regular';
    //     font-size: 14px;
    //     color: #4faa3d;
    //     &::after {
    //       display: block;
    //       content: '';
    //       margin-top: 10px;
    //       width: 422px;
    //       border: 1px solid #edf0f4;
    //     }
    //   }
    width: 478px;

    .el-tabs {
      position: relative;
      left: -1px;
      top: -45px;
      .psd-info {
        display: block;
        margin: 5px 0;
        font-family: 'SourceHanSansCN-Regular';
        font-size: 12px;
        color: #f93939;
      }
    }
  }
  :deep(.el-tabs) {
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
  :deep(.el-form) {
    .el-row {
      display: flex;
      flex-direction: column;
      .el-form-item--default {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .el-form-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-input--default {
        width: 422px;
      }
      // 验证码
      .code {
        width: 299px;
        margin-right: 10px;
      }
    }
  }
}
</style>
