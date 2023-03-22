const globaldirectives = Vue => {
  Vue.directive('log', {
    bind(el) {
      console.log(el);
    },
  });
  Vue.directive('isShow', {
    bind() {
      console.log('isShow');
    },
  });
};
export default globaldirectives;
