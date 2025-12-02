<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 10:03:30
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 22:35:01
 * @Description: lcl
-->
<template>
  <div style="padding: 24px" @click="boxRootFn">
    <h1>Modal 中 Radio 标签点击 bug 演示</h1>
    <div>
      这个 Demo 模拟“画布”在全局捕获 click 事件并取消默认行为，导致{" "}
      <text>label</text> 的联动失效：
      点击文字无法选择，但点击圆点（input）可以选择。
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>画布全局拦截（复现 bug） <el-switch v-model="intercept" /></span>
        <el-button type="primary" @click="openFn"> 打开弹窗 </el-button>
      </div>
      <div>
        说明：当“拦截”开启时，点击文字会被取消默认行为，不会触发关联 input；
        开启“边界修复”后，在弹窗内容上截断事件传播，文字点击即可恢复。
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">模拟画布区域</div>
      <div>
        <svg
          width="100%"
          height="100%"
          style="background: #fafafa; border: 1px dashed #ddd"
        >
          <g>
            <text x="20" y="40" style="user-select: none">
              这里是画布（Canvas），用于展示事件日志。打开控制台查看 [canvas]
              打印。
            </text>
            <rect
              x="20"
              y="60"
              width="120"
              height="60"
              fill="#d6e4ff"
              stroke="#adc6ff"
            />
            <rect
              x="180"
              y="60"
              width="120"
              height="60"
              fill="#fff1f0"
              stroke="#ffa39e"
            />
            <rect
              x="340"
              y="60"
              width="120"
              height="60"
              fill="#f6ffed"
              stroke="#b7eb8f"
            />
          </g>
        </svg>
      </div>
    </el-card>

    <el-dialog
      :visible="open"
      title="演示弹窗（Portal 到 body）"
      width="30%"
      center
    >
      在弹窗内容处加捕获阶段的 stopPropagation，隔离到 document 的全局监听
      <div @click="stopPropagationFN">
        <div direction="vertical" size="{12}">
          <text>请尝试点击“文字”与“圆点”，观察是否能选中：</text>
          <el-radio-group v-model="value" @input="radioChangeFn">
            <el-radio label="A">A</el-radio>
            <el-radio label="B">B</el-radio>
            <el-radio label="C">C</el-radio>
          </el-radio-group>

          <Text type="secondary">当前选择：{value}</Text>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="closeFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LabelClickModalBug',
  components: {},
  data() {
    return {
      intercept: true,
      value: 'A',
      open: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    boxRootFn(e) {
      e.preventDefault();
      console.log('boxRootFn div');
    },
    openFn() {
      this.open = true;
    },
    closeFn() {
      this.open = false;
    },
    stopPropagationFN(e) {
      if (!this.intercept) {
        console.log('stopPropagationFN', e);
        e.stopPropagation();
      }
    },
    radioChangeFn(e) {
      this.value = e;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>
