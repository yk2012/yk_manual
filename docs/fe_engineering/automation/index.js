const { createItem } = require("../../utils/createItem");

const nodeItem = createItem("/fe_engineering/automation/Node/");
const cliItem = createItem("/fe_engineering/automation/cli/");
const databaseItem = createItem("/fe_engineering/automation/database/");

const automation = {
  title: "自动化",
  path: "/fe_engineering/automation",
  collapsable: true,
  children: [
    {
      title: "Node",
      path: "/fe_engineering/automation/Node",
      children: [
        nodeItem("01发布npm代码"),
        nodeItem("01基础"),
        nodeItem("02异步编程"),
        nodeItem("03web应用"),
        nodeItem("04模块机制"),
      ],
    },
    {
      title: "脚手架",
      path: "/fe_engineering/automation/cli",
      children: [cliItem("01约定路由脚手架"), cliItem("02koa脚手架")],
    },
    {
      title: "数据库",
      path: "/fe_engineering/automation/database",
      children: [databaseItem("01MongoDB")],
    },
  ],
};

module.exports = {
  automation,
};
