const { createItem } = require("../../utils/createItem");

const netItem = createItem("/basics/cs_basics/networks/");
const httpItem = createItem("/basics/cs_basics/http/");
const browserItem = createItem("/basics/cs_basics/browser/");
const v8Item = createItem("/basics/cs_basics/v8/");

const cs_basics = {
  title: "计算机基础",
  path: "/basics/cs_basics",
  collapsable: true,
  children: [
    {
      title: "网络协议",
      path: "/basics/cs_basics/networks",
      children: [
        netItem("01网络分层"),
        netItem("02基本概念"),
        netItem("03性能指标"),
        netItem("04网络复习"),
      ],
    },
    {
      title: "深入HTTP",
      path: "/basics/cs_basics/http",
      children: [
        httpItem("01网络基础"),
        httpItem("02HTTP协议"),
        httpItem("03HTTP报文"),
        httpItem("04状态码"),
        httpItem("05Web服务器"),
      ],
    },
    // BROWSER
    {
      title: "浏览器原理",
      path: "/basics/cs_basics/browser",
      children: [
        browserItem("01Chrome架构"),
        browserItem("02从url到页面呈现"),
        browserItem("03渲染原理"),
        browserItem("04浏览器存储"),
        browserItem("05js执行机制"),
      ],
    },
    {
      title: "V8原理",
      path: "/basics/cs_basics/v8",
      children: [
        v8Item("01栈空间与堆空间"),
        v8Item("02垃圾回收"),
        v8Item("03编译器与解释器"),
      ],
    },
  ],
};

module.exports = {
  cs_basics,
};
