const { createItem } = require("../../utils/createItem");

const moduleItem = createItem("/fe_engineering/modularization/specification/");
const babelItem = createItem("/fe_engineering/modularization/babel/");
const webpackItem = createItem("/fe_engineering/modularization/webpack/");
const viteItem = createItem("/fe_engineering/modularization/vite/");
const rollupItem = createItem("/fe_engineering/modularization/Rollup/");

const modularization = {
  title: "模块化",
  path: "/fe_engineering/modularization",
  collapsable: false,
  children: [
    {
      title: "模块化规范",
      path: "/fe_engineering/modularization/specification",
      children: [moduleItem("01CommonJS"), gitItem("02ESM")],
    },
    {
      title: "Babel",
      path: "/fe_engineering/modularization/babel",
      children: [babelItem("01概述")],
    },
    {
      title: "Webpack",
      path: "/fe_engineering/modularization/webpack",
      children: [
        webpackItem("01快速上手"),
        webpackItem("02初体验"),
        webpackItem("03开发环境"),
        webpackItem("04生产环境"),
        webpackItem("05Webpack性能优化"),
        webpackItem("06Webpack5"),
      ],
    },
    {
      title: "Vite",
      path: "/fe_engineering/modularization/vite",
      children: [viteItem("01概述")],
    },
    {
      title: "Rollup",
      path: "/fe_engineering/modularization/Rollup",
      children: [rollupItem("01概述")],
    },
  ],
};

module.exports = {
  modularization,
};
