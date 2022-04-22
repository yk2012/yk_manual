const { createItem } = require("../../utils/createItem");

const reactBasicsItem = createItem("/fe_advance/React/React_basics/");
const reactAdvanceItem = createItem("/fe_advance/React/React_advance/");
const hooksItem = createItem("/fe_advance/React/React_Hooks/");
const reactSrcItem = createItem("/fe_advance/React/React_src/");

const react = {
  title: "React",
  path: "/fe_advance/React",
  collapsable: true,
  children: [
    {
      title: "基础知识",
      path: "/fe_advance/React/React_basics",
      children: [
        reactBasicsItem("01入门概述"),
        reactBasicsItem("02面向组件"),
        reactBasicsItem("03生命周期"),
        reactBasicsItem("04使用脚手架"),
        reactBasicsItem("05待办事项"),
        reactBasicsItem("06ajax实战"),
        reactBasicsItem("07router5"),
        reactBasicsItem("08router6"),
      ],
    },
    {
      title: "进阶知识",
      path: "/fe_advance/React/React_advance",
      children: [reactAdvanceItem("01深入理解JSX")],
    },
    {
      title: "Hooks",
      path: "/fe_advance/React/React_Hooks",
      children: [hooksItem("01动机")],
    },
    {
      title: "实现原理",
      path: "/fe_advance/React/React_src",
      children: [reactSrcItem("01设计理念")],
    },
  ],
};

module.exports = {
  react,
};
