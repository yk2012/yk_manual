const { createItem } = require("../../utils/createItem");

const tsBasicsItem = createItem("/fe_advance/typescript/basics/");
const tcItem = createItem("/fe_advance/typescript/type_challenges/");
const proItem = createItem("/fe_advance/typescript/project/");

const typescript = {
  title: "typescript",
  path: "/fe_advance/typescript",
  collapsable: true,
  children: [
    {
      title: "基础知识",
      path: "/fe_advance/typescript/basics/01概述",
      children: [
        tsBasicsItem("01概述"),
        tsBasicsItem("02类型声明"),
        tsBasicsItem("03枚举类型"),
        tsBasicsItem("04配置选项"),
        tsBasicsItem("05webpack配置"),
        tsBasicsItem("06面向对象"),
        tsBasicsItem("07接口"),
        tsBasicsItem("08泛型"),
        tsBasicsItem("09类型检查机制"),
        tsBasicsItem("10高级类型"),
      ],
    },
    {
      title: "类型体操",
      path: "/fe_advance/typescript/type_challenges/01为什么叫类型体操",
      children: [tcItem("01为什么叫类型体操")],
    },
    {
      title: "TS实战",
      path: "/fe_advance/typescript/project/01Vue项目",
      children: [proItem("01Vue项目"), proItem("02React项目")],
    },
  ],
};

module.exports = {
  typescript,
};
