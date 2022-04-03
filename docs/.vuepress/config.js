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
      { text: "前端基础", link: "/fe_basics/" },
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
      "/fe_basics/": [
        {
          title: "前端基础",
          path: "/fe_basics/",
          collapsable: true,
          children: [
            {
              title: "HTML",
              path: "/fe_basics/html",
              children: [
                { title: "常用标签", path: "/fe_basics/html/01常用标签" },
                { title: "HTML5标签", path: "/fe_basics/html/02HTML5标签" },
                { title: "语义化标签", path: "/fe_basics/html/03语义化标签" },
              ],
            },
            {
              title: "CSS",
              path: "/fe_basics/css",
              children: [
                { title: "选择器", path: "/fe_basics/css/01选择器" },
                { title: "盒子模型", path: "/fe_basics/css/02盒子模型" },
                { title: "浮动布局", path: "/fe_basics/css/03浮动布局" },
                { title: "定位", path: "/fe_basics/css/04定位" },
                { title: "字体&背景", path: "/fe_basics/css/05字体背景" },
                { title: "高级技巧", path: "/fe_basics/css/06高级技巧" },
                { title: "CSS3", path: "/fe_basics/css/07CSS3新特性" },
                { title: "flex布局", path: "/fe_basics/css/08flex" },
                { title: "LESS", path: "/fe_basics/css/09less" },
              ],
            },
            {
              title: "CSS实战",
              path: "/fe_basics/css_demo",
              children: [
                { title: "居中对齐", path: "/fe_basics/css_demo/盒子居中对齐" },
                { title: "三栏布局", path: "/fe_basics/css_demo/三栏布局" },
              ],
            },
            {
              title: "JavaScript",
              path: "/fe_basics/javascript",
              children: [
                { title: "基本语法", path: "/fe_basics/javascript/01基本语法" },
                { title: "数据类型", path: "/fe_basics/javascript/02数据类型" },
                { title: "流程控制", path: "/fe_basics/javascript/03流程控制" },
                { title: "对象", path: "/fe_basics/javascript/04对象" },
                { title: "函数", path: "/fe_basics/javascript/05函数" },
                { title: "数组", path: "/fe_basics/javascript/06数组" },
                { title: "常用类", path: "/fe_basics/javascript/07常用类" },
                { title: "DOM", path: "/fe_basics/javascript/08DOM" },
                { title: "BOM", path: "/fe_basics/javascript/09BOM" },
                { title: "JSON", path: "/fe_basics/javascript/10JSON" },
                { title: "创建对象", path: "/fe_basics/javascript/11创建对象" },
                { title: "继承", path: "/fe_basics/javascript/12继承" },
              ],
            },
            {
              title: "ES6",
              path: "/fe_basics/ES6",
              children: [
                { title: "变量声明", path: "/fe_basics/ES6/01变量声明" },
                { title: "面向对象", path: "/fe_basics/ES6/02面向对象" },
                { title: "结构赋值", path: "/fe_basics/ES6/03解构赋值" },
                { title: "对象增强", path: "/fe_basics/ES6/04对象增强" },
                { title: "箭头函数", path: "/fe_basics/ES6/05箭头函数" },
                { title: "函数参数", path: "/fe_basics/ES6/06函数参数" },
                { title: "操作数组", path: "/fe_basics/ES6/07操作数组" },
                { title: "定义对象", path: "/fe_basics/ES6/08定义对象" },
                { title: "模块化", path: "/fe_basics/ES6/09模块化" },
                { title: "Symbol", path: "/fe_basics/ES6/10Symbol" },
                {
                  title: "迭代器与生成器",
                  path: "/fe_basics/ES6/11迭代器与生成器",
                },
                { title: "Map&Set", path: "/fe_basics/ES6/12Map与Set" },
              ],
            },
            {
              title: "异步编程",
              path: "/fe_basics/asynchronous",
              children: [
                { title: "ajax", path: "/fe_basics/asynchronous/01ajax" },
                { title: "Promise", path: "/fe_basics/asynchronous/02promise" },
                { title: "async", path: "/fe_basics/asynchronous/03async" },
                { title: "事件循环", path: "/fe_basics/asynchronous/04event_loop" },
                { title: "axios", path: "/fe_basics/asynchronous/05axios" },
              ]
            },
            {
              title: "浏览器",
              path: "/fe_basics/browser",
              children: [
                { title: "变量声明", path: "/fe_basics/ES6/01变量声明" },
              ]
            }
          ],
        },
      ],
      "fe_advance": [
        {
          title: '前端进阶',
          path: '/fe_advance',
          collapsable: false,
          children: [
            {
              title: 'Vue2基础',
              path: '/fe_advance/'
            }
          ]
        }
      ],
      "/fe_code/": [
        {
          title: "技术内功",
          path: "/fe_code/",
          collapsable: false,
          children: [
            {
              title: "算法",
              path: "/fe_code/algorithm",
              children: [
                {
                  title: "数据结构",
                  path: "/fe_code/algorithm/basics/01数据结构",
                },
                {
                  title: "排序算法",
                  path: "/fe_code/algorithm/basics/02排序算法",
                },
                {
                  title: "快速幂",
                  path: "/fe_code/algorithm/basics/03快速幂",
                },
              ],
            },
            // {
            //   title: "设计模式",
            //   path: "/fe_code/design_patterns",
            // },
            // {
            //   title: "函数自定义",
            //   path: "/fe_code/hand_code",
            // },
          ],
        },
      ],
      "/code_life/": [
        {
          title: "代码人生",
          path: "/code_life",
          collapsable: false,
          children: [
            {
              title: "面试题目",
              path: "/code_life/question",
              collapsable: false,
            },
            {
              title: "面试经验",
              path: "/code_life/experience",
              collapsable: false,
            },
            {
              title: "代码人生",
              path: "/code_life/summary",
              collapsable: false,
            },
          ],
        },
      ],
    },
  },
};
