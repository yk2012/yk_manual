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
            // HTML
            {
              title: "HTML",
              path: "/fe_basics/html",
              children: [
                { title: "总体概述", path: "/fe_basics/html/01总体概述" },
                { title: "常用标签", path: "/fe_basics/html/02常用标签" },
                { title: "高阶文本", path: "/fe_basics/html/03高阶文本" },
                { title: "结构标签", path: "/fe_basics/html/04结构标签" },
                { title: "表单标签", path: "/fe_basics/html/05表单标签" },
                { title: "多媒体标签", path: "/fe_basics/html/06多媒体标签" },
              ],
            },
            // CSS
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
            // JS
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
            // ES6+
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
            // ASYNC
            {
              title: "异步编程",
              path: "/fe_basics/asynchronous",
              children: [
                {
                  title: "同步与异步",
                  path: "/fe_basics/asynchronous/01同步与异步",
                },
                { title: "Promise", path: "/fe_basics/asynchronous/02promise" },
                {
                  title: "Promise源码",
                  path: "/fe_basics/asynchronous/03promise源码",
                },
                {
                  title: "generator",
                  path: "/fe_basics/asynchronous/04generator",
                },
                {
                  title: "async/await",
                  path: "/fe_basics/asynchronous/05async",
                },
                {
                  title: "事件循环",
                  path: "/fe_basics/asynchronous/06event_loop",
                },
                { title: "ajax", path: "/fe_basics/asynchronous/07ajax" },
                { title: "axios", path: "/fe_basics/asynchronous/08axios" },
                { title: "axios源码", path: "/fe_basics/asynchronous/09axios" },
              ],
            },
            // BROWSER
            {
              title: "浏览器",
              path: "/fe_basics/browser",
              children: [
                {
                  title: "浏览器存储",
                  path: "/fe_basics/browser/01浏览器存储",
                },
                {
                  title: "浏览器运行",
                  path: "/fe_basics/browser/02浏览器运行",
                },
                {
                  title: "浏览器调试",
                  path: "/fe_basics/browser/03浏览器调试",
                },
              ],
            },
          ],
        },
      ],
      fe_advance: [
        {
          title: "前端进阶",
          path: "/fe_advance",
          collapsable: false,
          children: [
            // vue2基础
            {
              title: "Vue2基础",
              path: "/fe_advance/Vue2_basis",
              children: [
                {
                  title: "快速上手",
                  path: "/fe_advance/Vue2_basis/01快速上手",
                },
                {
                  title: "模板语法",
                  path: "/fe_advance/Vue2_basis/02模板语法",
                },
                {
                  title: "计算与监视",
                  path: "/fe_advance/Vue2_basis/03计算与监视",
                },
                {
                  title: "样式绑定",
                  path: "/fe_advance/Vue2_basis/04样式绑定",
                },
                {
                  title: "列表渲染",
                  path: "/fe_advance/Vue2_basis/05列表渲染",
                },
                {
                  title: "事件处理",
                  path: "/fe_advance/Vue2_basis/06事件处理",
                },
                {
                  title: "双向绑定",
                  path: "/fe_advance/Vue2_basis/07双向绑定",
                },
                {
                  title: "生命周期",
                  path: "/fe_advance/Vue2_basis/08生命周期",
                },
                {
                  title: "动画过渡",
                  path: "/fe_advance/Vue2_basis/09动画过渡",
                },
                {
                  title: "过滤器",
                  path: "/fe_advance/Vue2_basis/10过滤器",
                },
                {
                  title: "指令",
                  path: "/fe_advance/Vue2_basis/11指令",
                },
              ],
            },
            // vue2进阶
            {
              title: "Vue2进阶",
              path: "/fe_advance/Vue2_advance",
              children: [
                {
                  title: "组件",
                  path: "/fe_advance/Vue2_basis/01组件",
                },
                {
                  title: "小知识",
                  path: "/fe_advance/Vue2_basis/02小知识",
                },
                {
                  title: "页面评价",
                  path: "/fe_advance/Vue2_basis/03页面评价",
                },
                {
                  title: "待办事项",
                  path: "/fe_advance/Vue2_basis/04待办事项",
                },
                {
                  title: "组件通信",
                  path: "/fe_advance/Vue2_basis/05组件间通信",
                },
                {
                  title: "用户搜索",
                  path: "/fe_advance/Vue2_basis/06用户搜索",
                },
                {
                  title: "脚手架",
                  path: "/fe_advance/Vue2_basis/07脚手架",
                },
                {
                  title: "组件库",
                  path: "/fe_advance/Vue2_basis/08组件库",
                },
                {
                  title: "路由",
                  path: "/fe_advance/Vue2_basis/09路由",
                },
                {
                  title: "Vuex",
                  path: "/fe_advance/Vue2_basis/10Vuex",
                },
                {
                  title: "Vuex再探",
                  path: "/fe_advance/Vue2_basis/11Vuex再探",
                },
                {
                  title: "VuePress",
                  path: "/fe_advance/Vue2_basis/12VuePress",
                },
              ],
            },
            // 商城后台管理项目
            {
              title: "Vue2项目",
              path: "/fe_advance/Vue2_project1",
              children: [
                {
                  title: "配置",
                  path: "/fe_advance/Vue2_project1/01配置",
                },
              ],
            },
            // Vue3
            {
              title: "Vue3",
              path: "/fe_advance/Vue3",
              children: [
                {
                  title: "基本使用",
                  path: "/fe_advance/Vue3/基本使用",
                },
              ],
            },
            // Vue源码
            {
              title: "Vue源码",
              path: "/fe_advance/vue_src",
              children: [
                {
                  title: "模板引擎",
                  path: "/fe_advance/vue_src/01模板引擎",
                },
                {
                  title: "diff",
                  path: "/fe_advance/vue_src/02diff",
                },
                {
                  title: "数据响应",
                  path: "/fe_advance/vue_src/03数据响应",
                },
                {
                  title: "ast",
                  path: "/fe_advance/vue_src/04ast",
                },
              ],
            },
            // React基础
            {
              title: "React基础",
              path: "/fe_advance/React_basis",
              children: [
                {
                  title: "入门概述",
                  path: "/fe_advance/React_basis/01入门概述",
                },
                {
                  title: "面向组件",
                  path: "/fe_advance/React_basis/02面向组件",
                },
                {
                  title: "生命周期",
                  path: "/fe_advance/React_basis/03生命周期",
                },
                {
                  title: "脚手架",
                  path: "/fe_advance/React_basis/04使用脚手架",
                },
                {
                  title: "待办事项",
                  path: "/fe_advance/React_basis/05待办事项",
                },
                {
                  title: "ajax实战",
                  path: "/fe_advance/React_basis/06ajax实战",
                },
                {
                  title: "router5",
                  path: "/fe_advance/React_basis/07router5",
                },
                {
                  title: "router6",
                  path: "/fe_advance/React_basis/08router6",
                },
              ],
            },
          ],
        },
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
