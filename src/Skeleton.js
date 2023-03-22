/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-20 13:47:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-20 13:49:31
 * @Description: lcl
 */
// skeleton.js
import Vue from 'vue';
import listSkeleton from '@/components/Skeleton/listSkeleton.vue';
import detailSkeleton from '@/components/Skeleton/detailSkeleton.vue';

export default new Vue({
  components: {
    listSkeleton,
    detailSkeleton,
  },
  template: `
    <div>
      <listSkeleton id="listSkeleton" style="display:none;" />
      <detailSkeleton id="detailSkeleton" style="display:none;" />
    </div>
  `,
});
