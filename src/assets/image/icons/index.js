import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; //svg组件
// 全局注册组件;
Vue.component('svg-icon', SvgIcon);
// 这是一个批量导入 .svg 文件的写法。
const requireAll = requireContext => {
  console.log(requireContext.keys().forEach(requireContext));
  requireContext.keys().forEach(requireContext);
};
// import svg
// 指定目录和遍历的规则
const req = require.context('@/assets/image/icons/svgs', true, /\.svg$/);
requireAll(req);
