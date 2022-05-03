const { createItem } = require("../../utils/createItem");

const htmlItem = createItem("/basics/fe_basics/html/");
const cssItem = createItem("/basics/fe_basics/css/");
const cssDemoItem = createItem("/basics/fe_basics/css_demo/");
const jsItem = createItem("/basics/fe_basics/javascript/");
const esItem = createItem("/basics/fe_basics/ES6/");
const asyncItem = createItem("/basics/fe_basics/asynchronous/");

const fe_basics = {
  title: "前端基础",
  path: "/basics/fe_basics/html/01总体概述",
  collapsable: true,
  children: [
    // HTML
    {
      title: "HTML",
      path: "/basics/fe_basics/html/01总体概述",
      children: [
        htmlItem("01总体概述"),
        htmlItem("02常用标签"),
        htmlItem("03高阶文本"),
        htmlItem("04结构标签"),
        htmlItem("05表单标签"),
        htmlItem("06多媒体标签"),
      ],
    },
    // CSS
    {
      title: "CSS",
      path: "/basics/fe_basics/css/01概述",
      children: [
        cssItem("01概述"),
        cssItem("02选择器"),
        cssItem("03字体背景"),
        cssItem("04盒子模型"),
        cssItem("05定位"),
        cssItem("06浮动布局"),
        cssItem("07小技巧"),
        cssItem("08flex"),
        cssItem("09CSS3"),
        cssItem("10CSS工作原理"),
        cssItem("11LESS"),
      ],
    },
    {
      title: "CSS实战",
      path: "/basics/fe_basics/css_demo/01盒子居中对齐",
      children: [cssDemoItem("01盒子居中对齐"), cssDemoItem("02三栏布局")],
    },
    // JS
    {
      title: "JavaScript",
      path: "/basics/fe_basics/javascript/01基本语法",
      children: [
        jsItem("01基本语法"),
        jsItem("02数据类型"),
        jsItem("03流程控制"),
        jsItem("04对象"),
        jsItem("05函数"),
        jsItem("06数组"),
        jsItem("07常用类"),
        jsItem("08DOM"),
        jsItem("09BOM"),
        jsItem("10JSON"),
        jsItem("11创建对象"),
        jsItem("12继承"),
      ],
    },
    // ES6+
    {
      title: "ES6+",
      path: "/basics/fe_basics/ES6",
      children: [
        esItem("01变量声明"),
        esItem("02面向对象"),
        esItem("03解构赋值"),
        esItem("04对象增强"),
        esItem("05箭头函数"),
        esItem("06函数参数"),
        esItem("07操作数组"),
        esItem("08定义对象"),
        esItem("09代理与反射"),
        esItem("10迭代器"),
        esItem("11生成器"),
        esItem("12Map与Set"),
        esItem("13Symbol"),
        esItem("14模块化"),
      ],
    },
    // ASYNC
    {
      title: "异步编程",
      path: "/basics/fe_basics/asynchronous",
      children: [
        asyncItem("01同步与异步"),
        asyncItem("02Promise"),
        asyncItem("03Promise源码"),
        asyncItem("04generator"),
        asyncItem("05async"),
        asyncItem("06event_loop"),
        asyncItem("07ajax"),
        asyncItem("08axios"),
        asyncItem("09axios源码"),
      ],
    },
  ],
};

module.exports = {
  fe_basics,
};
