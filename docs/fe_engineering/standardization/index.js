const { createItem } = require("../../utils/createItem");

const tsBasicsItem = createItem("/fe_engineering/standardization/");

const standardization = {
  title: "标准化",
  path: "/fe_engineering/standardization",
  collapsable: false,
  children: [
    {
      title: "基础知识",
      path: "/fe_advance/typescript/basics",
      children: [tsBasicsItem("01概述")],
    },
    {
      title: "类型体操",
      path: "/fe_advance/typescript/type_challenges",
      children: [tcItem("01为什么叫类型体操")],
    },
  ],
};

module.exports = {
  standardization,
};
