const { fe_basics, cs_basics } = require("../basics/index");
const { typescript, vue, react } = require("../fe_advance/index");
const {
  algorithm,
  design_patterns,
  functional_programming,
  hand_code,
} = require("../fe_code/index");
const {
  standardization,
  modularization,
  automation,
} = require("../fe_engineering/index");

module.exports = {
  title: "YK菌",
  decription: "YK菌的前端学习手册",
  theme: "reco",
  head: ["link", { rel: "icon", href: "/logo.ico" }],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    nav: [
      { text: "基础知识", link: "/basics/" },
      { text: "前端进阶", link: "/fe_advance/" },
      { text: "前端工程化", link: "/fe_engineering/" },
      { text: "技术内功", link: "/fe_code/" },
      { text: "代码人生", link: "/code_life/" },
      {
        text: "关注我",
        items: [
          { text: "GitHub", link: "https://github.com/yk2012" },
          { text: "Gitee", link: "https://gitee.com/ykang2020" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/2409780510207133/posts",
          },
          { text: "CSDN", link: "https://blog.csdn.net/weixin_44972008" },
        ],
      },
    ],
    sidebar: {
      "/basics/": [fe_basics, cs_basics],
      "/fe_advance/": [typescript, vue, react],
      "/fe_engineering/": [standardization, modularization, automation],
      "/fe_code/": [
        algorithm,
        design_patterns,
        functional_programming,
        hand_code,
      ],
      "/code_life/": [],
    },
    subSidebar: "auto",
  },
};
