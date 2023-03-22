<template>
  <div class="queryForm">
    <el-form
      ref="queryForm"
      :model="formData"
      :inline="isInline"
      :label-width="labelWidth"
      :rules="rules"
      :label-position="labelPosition"
      :size="size"
    >
      <el-row>
        <template v-for="item in formConfig">
          <el-col :key="item.prop" :span="span" class="flex form-col">
            <el-form-item
              v-if="item.type === 'input'"
              class="form-item"
              :prop="item.prop"
              :label="item.label"
            >
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                :readonly="item.readonly"
                :show-password="item.showPassword"
                :class="{ code: item.isCode }"
              >
              </el-input>
              <!-- 验证码 -->
              <el-button
                type="primary"
                @click="sendCode()"
                :disabled="isDisabled"
                v-if="item.isCode"
                class="code-btn flex"
                >{{ buttonName }}</el-button
              >
            </el-form-item>
            <!-- 修改链接 -->
            <span v-if="item.isLink" class="link" @click="clickLink(item.linkTitle)">{{
              item.linkTitle
            }}</span>
            <el-form-item v-if="item.type === 'select'" :prop="item.prop" :label="item.label">
              <el-select
                v-model="formData[item.prop]"
                :multiple="item.multiple || false"
                :placeholder="item.placeholder"
                :filterable="item.filterable || false"
                class="el-selects"
              >
                <el-option
                  v-for="val in item.options"
                  :key="val.value"
                  :label="val.label"
                  :value="val.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="item.type === 'slot'" :prop="item.prop" :label="item.label">
              <slot :name="item.slotName" :item="item"></slot>
            </el-form-item>
          </el-col>
        </template>
        <el-col v-if="isButton" :span="span">
          <el-form-item label="" class="itemButton">
            <el-button type="primary" @click="submitForm()">Search</el-button>
            <el-button @click="resetForm()">Reset</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'queryForm',
  data() {
    return {
      buttonName: '获取验证码',
      isDisabled: false,
      time: 60,
      trim: '',
    };
  },
  props: {
    span: {
      type: Number,
      default: 6,
    },
    responsiveDesign: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 14,
        md: 8,
        lg: 6,
        xl: 4,
      }),
    },
    isInline: {
      type: Boolean,
      default: false,
    },
    labelPosition: {
      // left top right
      type: String,
      default: 'right',
    },
    labelWidth: {
      type: String,
      default: '',
    },
    size: {
      // large default small
      type: String,
      default: 'default',
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    isButton: {
      type: Boolean,
      default: true,
    },
    formData: {
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
  },
  watch: {},
  methods: {
    // 发送验证码
    sendCode() {
      this.$refs.queryForm.validate(val => {
        if (val) {
          let that = this;
          that.isDisabled = true;
          // localStorage.setItem('time', that.time)
          this.trim = setInterval(function () {
            that.buttonName = that.time + '秒后重新发送';
            --that.time;
            // localStorage.setItem('time', that.time);
            if (that.time < 0) {
              that.buttonName = '获取验证码';
              that.time = 60;
              that.isDisabled = false;
              clearInterval(that.trim);
            }
          }, 1000);
          // 修改链接
          this.$emit('send-code', { ...this.formData });
          // console.log('----------------表单传输的data', this.formData);
        }
      });
    },
    // 清除定时器
    clear() {
      this.buttonName = '获取验证码';
      this.time = 60;
      this.isDisabled = false;
      clearInterval(this.trim);
    },
    clickLink(content) {
      this.buttonName = '获取验证码';
      this.$emit('click-link', content);
    },
    resetForm() {
      this.$refs.queryForm.resetFields();
      this.$emit('submitForm', this.formData);
    },
    submitForm() {
      this.$refs.queryForm.validate(val => {
        if (val) {
          this.$emit('submitForm', this.formData);
        }
      });
      // console.log(this.formConfig);
      // console.log(this.formData);
    },
  },
};
</script>

<style lang="less" scoped>
.queryForm {
  .link:hover {
    cursor: pointer;
  }
  :deep(.el-form) {
    .el-form-item__content {
      line-height: 0;
      .el-select {
        width: 100%;

        .el-input {
          height: 100%;
        }
      }
    }
    .el-form-item__label {
      height: 22px;
      font-family: 'SourceHanSansCN-Regular';
      font-size: 13px;
      font-weight: normal;
      line-height: 22px;
      letter-spacing: 0em;
      color: #999999;
    }
    .el-input {
      height: 38px;
      width: 100%;
      // border: 1px solid #000;
      .el-input__inner {
        height: 38px;
        line-height: 38px;
        border-radius: 5px;
        background: #ffffff;
        border: 2px solid #edf0f4;
        font-family: 'SourceHanSansCN-Regular';
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0em;
        &:hover {
          border: 1px solid #4faa3d;
        }
      }
    }
    .code-btn {
      padding: 0;
      width: 112px;
      height: 38px;
      border-radius: 5px;
      background: #fff;
      box-sizing: border-box;
      color: #4faa3d;
      border: 2px solid #edf0f4;
      &:hover {
        background-color: #fff;
        color: #4faa3d;
        border: 2px solid #edf0f4;
      }
      span {
        display: block;
        margin: 0 auto;
      }
    }
    .form-col {
      // border: 1px solid #000;
      display: flex;

      // width: 500px;
    }
  }
}

// .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: rgba(79, 170, 61, 0.1);
  font-family: 'SourceHanSansCN-Regular';
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #4faa3d;
}
.el-select-dropdown__item.selected {
  font-weight: 500;
}

// :deep(.el-select) {

// }
:deep(.el-selects) {
  .el-select__tags {
    max-width: 100% !important;
  }
}
</style>
