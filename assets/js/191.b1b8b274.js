(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{761:function(t,a,s){"use strict";s.r(a);var p=s(7),r=Object(p.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"ts概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ts概述"}},[t._v("#")]),t._v(" TS概述")]),t._v(" "),s("p",[t._v("参考链接：")]),t._v(" "),s("ul",[s("li",[t._v("官网：https://www.typescriptlang.org/")]),t._v(" "),s("li",[t._v("中文网：https://www.tslang.cn/ （貌似很久没维护了）")]),t._v(" "),s("li",[t._v("掘金小册： https://juejin.cn/book/6844733813021491207")]),t._v(" "),s("li",[t._v("书籍：《深入理解TypeScript》 https://jkchao.github.io/typescript-book-chinese/")]),t._v(" "),s("li",[t._v("B站尚硅谷视频：https://www.bilibili.com/video/BV1Xy4y1v7S2")])]),t._v(" "),s("h2",{attrs:{id:"一、学习typescript的意义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、学习typescript的意义"}},[t._v("#")]),t._v(" 一、学习TypeScript的意义")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/674754547fd14767b56610dcb0517c94~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("ul",[s("li",[t._v("为JavaScript提供可选的类型系统")]),t._v(" "),s("li",[t._v("兼容当前及未来的JavaScript的特性")])]),t._v(" "),s("p",[t._v("给JavaScript加上类型系统的意义")]),t._v(" "),s("ol",[s("li",[t._v("类型有利于代码的重构，有利于编译器在编译时而不是运行时捕获错误；")]),t._v(" "),s("li",[t._v("类型是出色的文档形式之一，函数签名是一个定理，而函数体是具体的实现。")])]),t._v(" "),s("h3",{attrs:{id:"_1-强类型-vs-弱类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-强类型-vs-弱类型"}},[t._v("#")]),t._v(" 1. 强类型 VS 弱类型")]),t._v(" "),s("p",[t._v("我们都知道JavaScript是一门弱类型的语言，也就是说，我们定义一个变量，不需要考虑它的类型，比如我们定义一个变量"),s("code",[t._v("a")]),t._v("，给它赋值为"),s("code",[t._v("1")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n")])])]),s("p",[t._v("然后我们可以把它赋值为一个字符串、数组、对象等等任意类型")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'yk'")]),t._v("\na "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\na "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"YK"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("这样做虽然写起来很爽，不会报错，但是会有很多隐患。如果代码出现问题，很难找到问题出在哪里。")]),t._v(" "),s("p",[t._v("强类型语言的特点就是"),s("strong",[t._v("不允许改变变量的数据类型，除非进行强制类型转换")])]),t._v(" "),s("p",[t._v("弱类型的一个特点就是"),s("strong",[t._v("在计算时，不同类型之间对使用者透明地对变量进行隐式转换。")]),t._v(" 也就是说"),s("strong",[t._v("变量可以被赋予不同的数据类型")])]),t._v(" "),s("h3",{attrs:{id:"_2-静态语言-vs-动态语言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-静态语言-vs-动态语言"}},[t._v("#")]),t._v(" 2. 静态语言 VS 动态语言")]),t._v(" "),s("p",[t._v("都说JavaScript是动态语言，而Java是静态语言，那他们的区别到底是什么呢？")]),t._v(" "),s("blockquote",[s("p",[t._v("一门语言在编译时报错，那么是"),s("strong",[t._v("静态语言")]),t._v("，如果在运行时报错，那么是"),s("strong",[t._v("动态语言")]),t._v("。")])]),t._v(" "),s("p",[t._v("用官方一点的话说就是")]),t._v(" "),s("blockquote",[s("p",[t._v("在"),s("strong",[t._v("编译")]),t._v("阶段确定所有变量的类型的是"),s("strong",[t._v("静态")]),t._v("类型语言；在"),s("strong",[t._v("执行")]),t._v("阶段确定所有变量的类型的是"),s("strong",[t._v("动态")]),t._v("类型语言。")])]),t._v(" "),s("p",[t._v("所以说，类型有利于代码的重构，它有利于编译器在编译时而不是运行时捕获错误。我们在编写代码的时候就能避免很多错误，这样可以提高我们编码("),s("s",[t._v("找bug")]),t._v(")的效率！")]),t._v(" "),s("p",[t._v("最后来个对比表格")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("静态类型语言")]),t._v(" "),s("th",[t._v("动态类型语言")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("对类型极度严格")]),t._v(" "),s("td",[t._v("对类型非常宽松")])]),t._v(" "),s("tr",[s("td",[t._v("立即发现错误")]),t._v(" "),s("td",[t._v("不能立即发现（单元测试）")])]),t._v(" "),s("tr",[s("td",[t._v("运行时性能好")]),t._v(" "),s("td",[t._v("运行时性能差（可以改善 v8）")])]),t._v(" "),s("tr",[s("td",[t._v("自文档化")]),t._v(" "),s("td",[t._v("可读性差（工具生成文档）")])])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d919b2063c9b48d49efe6c65247f1762~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("h2",{attrs:{id:"二、typescript特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、typescript特性"}},[t._v("#")]),t._v(" 二、TypeScript特性")]),t._v(" "),s("p",[t._v("TypeScript作为JavaScript的超集，TypeScript究竟比JavaScript多了哪些特性")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f99f0ab6228460db1091f74a7532571~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("ul",[s("li",[t._v("相较于JS而言，TS拥有了静态类型，更加"),s("strong",[t._v("严格的语法")]),t._v("，更强大的功能；")]),t._v(" "),s("li",[t._v("TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；")]),t._v(" "),s("li",[t._v("TS代码可以编译为"),s("strong",[t._v("任意版本")]),t._v("的JS代码，可有效解决不同JS运行环境的兼容问题；")]),t._v(" "),s("li",[t._v("同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的"),s("strong",[t._v("维护")]),t._v("中TS却远远胜于JS。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef570319dd8e48259b9078030429e65f~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("p",[t._v("也就是说我们编写的TypeScript代码，最终要编译成任意版本的JavaScript，这样就可以在任何可以使用JavaScript的地方使用它了~")]),t._v(" "),s("p",[t._v("TypeScript作为JavaScript的超集，也就是说"),s("strong",[t._v("JavaScript就是TypeScript")]),t._v("，也可以说"),s("strong",[t._v("TypeScript只是带有文档的JavaScript")]),t._v("，还可以说"),s("strong",[t._v("TypeScript只是JavaScript的一个编译器")])]),t._v(" "),s("h2",{attrs:{id:"三、搭建typescript环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、搭建typescript环境"}},[t._v("#")]),t._v(" 三、搭建TypeScript环境")]),t._v(" "),s("p",[t._v("TS代码需要通过编译器编译为JS，然后再交由JS解析器执行，所以我们要搭建TypeScript环境来写我们的TS代码")]),t._v(" "),s("div",{staticClass:"language-powershell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-powershell"}},[s("code",[t._v("npm install "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("g typescript\n")])])]),s("p",[t._v("创建一个ts文件"),s("code",[t._v("helloTS.ts")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello TS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("编译ts文件")]),t._v(" "),s("div",{staticClass:"language-powershell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-powershell"}},[s("code",[t._v("tsc "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\\helloTS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ts\n")])])]),s("p",[t._v("结果会生成js文件")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b91cac90f7f94e209ca01364ee7b59dc~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("p",[t._v("这样就可以在浏览器中运行，也可以用node来执行了~")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e75d259d5b145dcb98c9943fff52cff~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),t._v(" "),s("p",[t._v("https://www.typescriptlang.org/play")]),t._v(" "),s("p",[t._v("可以在官网playground中查看ts编译后的js代码")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ca32a248e864d0fb300bdb5a0dc9e5d~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})])])}),[],!1,null,null,null);a.default=r.exports}}]);