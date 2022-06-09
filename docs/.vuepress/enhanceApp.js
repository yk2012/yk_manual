// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== "undefined") {
      if (to.path) {
        _hmt.push(["_trackPageview", to.fullPath]);
      }
    }
    next();
  });
  Vue.mixin({
    mounted() {
      // 不加 setTimeout 会有报错，但不影响效果
      setTimeout(() => {
        try {
          docsearch({
            appId: "EOAXZTLE6A",
            apiKey: "950e7863a862fc33a367ae535b1b386f",
            indexName: "yk2012",
            container: ".search-box",
            debug: false,
          });
        } catch (e) {
          console.log(e);
        }
      }, 10);
    },
  });
};
