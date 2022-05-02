const { createItem } = require("../../utils/createItem");

const tsBasicsItem = createItem("/fe_advance/typescript/basics/");
const tcItem = createItem("/basics/cs_basics/type_challenges/");

const typescript = {
  title: "typescript",
  path: "/fe_advance/typescript",
  collapsable: true,
  children: [
    {
      title: "基础知识",
      path: "/fe_advance/typescript/basics",
      children: [
        tsBasicsItem("01概述"),
        tsBasicsItem("02类型声明"),
        tsBasicsItem("03枚举类型"),
        tsBasicsItem("04配置选项"),
        tsBasicsItem("05webpack配置"),
        tsBasicsItem("06面向对象"),
        tsBasicsItem("07接口"),
        tsBasicsItem("08泛型"),
      ],
    },
    {
      title: "类型体操",
      path: "/fe_advance/typescript/type_challenges",
      children: [tcItem("01为什么叫类型体操")],
    },
  ],
};

module.exports = {
  typescript,
};
