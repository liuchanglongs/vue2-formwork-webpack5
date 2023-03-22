/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-22 20:48:18
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-23 00:10:45
 * @Description: lcl
 */
import Vue from 'vue';
/**
 * 检测触底
 * 方案一：总共50条数据，先加载20条，滚动触底，在加20条
 * 页面dom渲染越多越卡
 **/
// Vue.directive('scrollTableList', {
//   bind(el, binding, vnode) {
//     // table组件的this
//     const _this = vnode.context;
//     const target = el.querySelector('.el-table__body-wrapper');
//     target.addEventListener('scroll', () => {
//       // console.log(target.scrollTop);
//       // console.log(target.clientHeight);
//       // console.log(target.scrollHeight);
//       // console.log('--');
//       if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
//         if (_this.over >= _this.tableData.length) return;
//         _this.over += 15;
//       }
//     });
//   },
// });

// Vue.mixin({
//   data() {
//     return {
//       start: 0,
//       over: 15,
//     };
//   },
// });

/**
 * 检测触底
 * 方案二：只加载可视区域的数据
 * 找到滚动元素
 * 找到视图元素
 * scrollTop->top
 * scrollTop+clientHeight ->over
 *
 * 解决：选出视图中的元素展示，不能滑动的问题：滚动元素被改变小了
 * 滚动区域的高度=clientHeight+ 上下padding撑开（通过top、over算出）
 * 页面dom渲染越多越卡
 **/
Vue.directive('scrollTableList', {
  bind(el, binding, vnode) {
    // table组件的this
    const _this = vnode.context;
    const target = el.querySelector('.el-table__body-wrapper');
    const scrollBg = el.querySelector('.el-table__body');
    // const { itemheight } = binding.value;
    // console.log(_this.over);
    // console.log(_this.tableData);

    // _this.$nextTick(() => {
    //   const itemHeight = el.querySelector('tbody');
    //   console.log(itemHeight.querySelector('tr')); // null
    // });
    target.addEventListener('scroll', () => {
      _this.scrollTop = target.scrollTop;
      _this.tableHeight = target.clientHeight;
      // 注意：这个itemHeight是数据得到后在渲染的.只能这里面获取得到
      const itemHeight = el.querySelector('.el-table__row');
      if (itemHeight) {
        _this.itemHeight = itemHeight.clientHeight;
      }
      scrollBg.style.paddingTop = _this.padding[0] + 'px';
      scrollBg.style.paddingBottom = _this.padding[1] + 'px';
    });

    //解决屏幕放大缩小 itemHeight为nul的问题
    target.addEventListener('size', () => {
      // 注意：这个itemHeight是数据得到后在渲染的.只能这里面获取得到
      const itemHeight = el.querySelector('.el-table__row');
      _this.itemHeight = itemHeight.clientHeight;
    });
  },
});

Vue.mixin({
  data() {
    return {
      scrollTop: 0,
      tableHeight: 500,
      itemHeight: 49,
    };
  },
  watch: {
    over(old, news) {
      // 初始化滚动背景高度：利用tableData改变->total->over
      const scrollBg = document.querySelector('.el-table__body');
      if (scrollBg.clientHeight == 0) {
        scrollBg.style.paddingBottom = old * this.total + 'px';
      }
    },
  },
  computed: {
    start() {
      // console.log(Math.floor(this.scrollTop / this.itemHeight));
      // 加载可视高度的条数放宽，增加个缓冲区，让滚动更流畅,利于vnode
      // return Math.floor(this.scrollTop / this.itemHeight);
      return Math.max(Math.floor(this.scrollTop / this.itemHeight - 5), 0);
    },

    over() {
      // return Math.ceil((this.scrollTop + this.tableHeight) / this.itemHeight);
      return Math.min(
        Math.ceil((this.scrollTop + this.tableHeight) / this.itemHeight) + 5,
        this.total
      );
    },

    total() {
      return this.tableData ? this.tableData.length : 0;
    },

    padding() {
      const top = this.start * this.itemHeight;
      const bottom = (this.total - this.over) * this.itemHeight;
      return [top, bottom];
    },
  },
});

// Vue.directive("myscroll", {
//   //
//   bind(el, bind, vnode) {
//     const self = vnode.context;
//     let target = el.querySelector(".el-table__body-wrapper");

//     target.addEventListener("scroll", () => {
//       //检测触底
//       /*if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
//         if (self.over >= self.dataList.length) {
//           return;
//         }
//         self.over += 15;
//       }*/
//       //设置table
//       setTimeout(() => {
//         const _table = target.querySelector("table");
//         _table.style.paddingTop = self.padding[0] + "px";
//         _table.style.paddingBottom = self.padding[1] + 50 + "px";
//         self.tableHeight = target.clientHeight
//         self.scrollTop = target.scrollTop
//       }, 200)
//     })
//   }
// })
//mounted
// Vue.mixin({
//   data() {
//     return {
//       scrollTop: 0,
//       tableHeight: 300
//     }
//   },
//   computed: {
//     start() {
//       return Math.max(this.scrollTop / 40 - 5, 0);
//     },
//     over() {
//       return Math.min((this.scrollTop + this.tableHeight) / 40 + 5, this.dataList.length)
//     },
//     padding() {
//       let paddingBottom = (this.dataList - this.over) * 40;
//       let paddingTop = this.start * 40;
//       return [paddingTop, paddingBottom]
//     }
//   }
// })
