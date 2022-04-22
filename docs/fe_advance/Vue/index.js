const { createItem } = require("../../utils/createItem");

const vue2BasicsItem = createItem("/fe_advance/Vue/Vue2_basis/");
const vue2AdvanceItem = createItem("/fe_advance/Vue/Vue2_advance/");
const vue2ProjectItem = createItem("/fe_advance/Vue/Vue2_project/");
const vue3BasicsItem = createItem("/fe_advance/Vue/Vue3/");
const vueSrcItem = createItem("/fe_advance/Vue/vue_src/");

const vue = {
  title: "Vue",
  path: "/fe_advance/Vue",
  collapsable: true,
  children: [
    {
      title: "2.x基础知识",
      path: "/fe_advance/Vue/Vue2_basis",
      children: [
        vue2BasicsItem("01快速上手"),
        vue2BasicsItem("02模板语法"),
        vue2BasicsItem("03计算与监视"),
        vue2BasicsItem("04样式绑定"),
        vue2BasicsItem("05列表渲染"),
        vue2BasicsItem("06事件处理"),
        vue2BasicsItem("07双向绑定"),
        vue2BasicsItem("08生命周期"),
        vue2BasicsItem("09动画过渡"),
        vue2BasicsItem("10过滤器"),
        vue2BasicsItem("11指令"),
      ],
    },
    {
      title: "2.x进阶知识",
      path: "/fe_advance/Vue/Vue2_advance",
      children: [
        vue2AdvanceItem("01组件"),
        vue2AdvanceItem("02小知识"),
        vue2AdvanceItem("03页面评价"),
        vue2AdvanceItem("04待办事项"),
        vue2AdvanceItem("05组件间通信"),
        vue2AdvanceItem("06用户搜索"),
        vue2AdvanceItem("07脚手架"),
        vue2AdvanceItem("08组件库"),
        vue2AdvanceItem("09路由"),
        vue2AdvanceItem("10Vuex"),
        vue2AdvanceItem("11Vuex再探"),
        vue2AdvanceItem("12VuePress"),
      ],
    },
    {
      title: "2.x后台管理项目",
      path: "/fe_advance/Vue/Vue2_project",
      children: [vue2ProjectItem("01配置")],
    },
    {
      title: "3.x基础知识",
      path: "/fe_advance/Vue/Vue3",
      children: [vue3BasicsItem("01基本使用")],
    },
    {
      title: "实现原理",
      path: "/fe_advance/Vue/vue_src",
      children: [
        vueSrcItem("01模板引擎"),
        vueSrcItem("02diff"),
        vueSrcItem("03数据响应"),
        vueSrcItem("04ast"),
        vueSrcItem("05mini_vue"),
      ],
    },
  ],
};

module.exports = {
  vue,
};
