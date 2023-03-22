/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 23:32:11
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-22 09:27:52
 * @Description: lcl
 */
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  // plugins: [
  //   // px to vw
  //   // postcssPresetEnv({ stage: 0 }),
  //   // postcssPxToViewport({
  //   //   unitToConvert: 'px', // 要转化的单位
  //   //   viewportWidth: 1440, // UI设计稿的宽度
  //   //   unitPrecision: 6, // 转换后的精度，即小数点位数
  //   //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  //   //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  //   //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  //   //   selectorBlackList: ['noChangeVw'], // 指定不转换为视窗单位的类名，
  //   //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  //   //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  //   //   replace: true, // 是否转换后直接更换属性值
  //   //   exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
  //   //   landscape: false, // 是否处理横屏情况
  //   // }),
  // ],
  //  px to rem
  // plugins: {
  //   // 兼容浏览器，添加前缀
  //   autoprefixer: {
  //     overrideBrowserslist: [
  //       'Android 4.1',
  //       'iOS 7.1',
  //       'Chrome > 31',
  //       'ff > 31',
  //       'ie >= 8',
  //       'last 10 versions', // 所有主流浏览器最近10版本用
  //     ],
  //     grid: true,
  //   },
  //   'postcss-pxtorem': {
  //     rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
  //     propList: ['*'], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
  //     unitPrecision: 5, //保留rem小数点多少位
  //     //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
  //     // replace: true,
  //     mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
  //     minPixelValue: 12, //px小于12的不会被转换
  //   },
  // },
};
