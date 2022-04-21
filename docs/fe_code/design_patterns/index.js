const { createItem } = require("../../utils/createItem");

const dpItem = createItem("/fe_code/design_patterns/");

const design_patterns = {
  title: "设计模式",
  path: "/fe_code/design_patterns",
  collapsable: true,
  children: [
    dpItem("01概述"),
    dpItem("02单例模式"),
    dpItem("03策略模式"),
    dpItem("04代理模式"),
  ],
};

module.exports = {
  design_patterns,
};
