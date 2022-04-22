const { createItem } = require("../../utils/createItem");

const gitItem = createItem("/fe_engineering/standardization/Git/");

const standardization = {
  title: "标准化",
  path: "/fe_engineering/standardization",
  collapsable: false,
  children: [
    {
      title: "Git",
      path: "/fe_engineering/standardization/Git",
      children: [gitItem("01基本使用"), gitItem("02配置公钥")],
    },
  ],
};

module.exports = {
  standardization,
};