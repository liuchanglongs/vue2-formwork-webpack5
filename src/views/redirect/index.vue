<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-17 22:50:11
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-17 22:59:21
 * @Description: lcl
-->

<script>
export default {
  // 返回h函数，利用replace跳回原页面
  created() {
    const { query, params } = this.$route;
    const { path } = params;
    this.$router.replace({ path: '/' + path, query });
  },
  render(h) {
    return h();
  },
};
</script>

<style lang="less" scoped></style>
