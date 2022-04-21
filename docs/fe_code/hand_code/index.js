const { createItem } = require("../../utils/createItem");

const handCodeItem = createItem("/fe_code/hand_code/");

const hand_code = {
  title: "手写函数",
  path: "/fe_code/hand_code",
  collapsable: true,
  children: [
    handCodeItem("01函数式编程概述"),
    handCodeItem("02节流与防抖"),
    handCodeItem("03基本函数方法"),
    handCodeItem("04函数高级"),
    handCodeItem("05对象相关"),
    handCodeItem("06事件"),
  ],
};

module.exports = {
  hand_code,
};
