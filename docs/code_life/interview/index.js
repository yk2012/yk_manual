const { createItem } = require("../../utils/createItem");

const questionItem = createItem("/code_life/interview/question/");
const handCodeItem = createItem("/code_life/interview/hand_code/");

const interview = {
  title: "面试必备",
  path: "/code_life/interview",
  collapsable: false,
  children: [
    {
      title: "面试题",
      path: "/code_life/interview/question",
      children: [
        questionItem("01网络"),
        questionItem("02CSS"),
        questionItem("03JavaScript"),
        questionItem("04Vue"),
      ],
    },
    {
      title: "手写函数",
      path: "/code_life/interview/hand_code",
      children: [
        handCodeItem("01函数call"),
        handCodeItem("02节流与防抖"),
        handCodeItem("03基本数组方法"),
        handCodeItem("04函数高级"),
        handCodeItem("05对象相关"),
        handCodeItem("06事件"),
      ],
    },
  ],
};

module.exports = {
  interview,
};
