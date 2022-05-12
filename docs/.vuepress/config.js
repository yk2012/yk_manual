const { fe_basics, cs_basics } = require("../basics/index");
const { typescript, vue, react } = require("../fe_advance/index");
const {
  algorithm,
  design_patterns,
  functional_programming,
} = require("../fe_code/index");
const {
  standardization,
  modularization,
  automation,
} = require("../fe_engineering/index");
const { interview, life } = require("../code_life/index");

module.exports = {
  title: "YK菌",
  decription: "YK菌的前端学习手册",
  base: "/yk_manual/",
  theme: "reco",
  head: [
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?f32c3b70c575fd4087e737d05053988a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
    ["link", { rel: "icon", href: "/logo52.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新",
        },
      },
    ],
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功",
        },
      },
    ],
    [
      "copyright",
      {
        authorName: "YK菌", // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
      },
    ],
    [
      "cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    subSidebar: "auto",
    smoothScroll: true,
    lastUpdated: "上次更新",
    vssueConfig: {
      platform: "github",
      owner: "yk2012",
      repo: "yk_manual",
      clientId: "3e144f3998e7234cf17b",
      clientSecret: "bcfd0ae906306d3f61e1d953812cba302c3e143e",
    },
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
      "/fe_code/": [algorithm, design_patterns, functional_programming],
      "/code_life/": [interview, life],
    },
  },
};
