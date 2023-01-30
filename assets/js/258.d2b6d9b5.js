(window.webpackJsonp=window.webpackJsonp||[]).push([[258],{829:function(t,a,s){"use strict";s.r(a);var r=s(7),e=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"webpack5-入门-实战-源码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack5-入门-实战-源码"}},[t._v("#")]),t._v(" webpack5 入门 实战 源码")]),t._v(" "),s("h2",{attrs:{id:"入门"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#入门"}},[t._v("#")]),t._v(" 入门")]),t._v(" "),s("h3",{attrs:{id:"基本配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本配置"}},[t._v("#")]),t._v(" 基本配置")]),t._v(" "),s("p",[t._v("webpack.config.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Node.js的核心模块，专门用来处理文件路径")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 入口")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 相对路径和绝对路径都行")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./src/main.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// path: 文件输出目录，必须是绝对路径")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// path.resolve()方法返回一个绝对路径")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// __dirname 当前文件的文件夹绝对路径")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dist"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// filename: 输出文件名")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("filename")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"main.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 加载器")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("module")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rules")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 插件")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模式")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("mode")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"development"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 开发模式")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"处理样式资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理样式资源"}},[t._v("#")]),t._v(" 处理样式资源")]),t._v(" "),s("h3",{attrs:{id:"处理图片资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理图片资源"}},[t._v("#")]),t._v(" 处理图片资源")]),t._v(" "),s("h3",{attrs:{id:"修改输出资源路径和名称"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修改输出资源路径和名称"}},[t._v("#")]),t._v(" 修改输出资源路径和名称")]),t._v(" "),s("h3",{attrs:{id:"自动清空上次打包资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动清空上次打包资源"}},[t._v("#")]),t._v(" 自动清空上次打包资源")]),t._v(" "),s("h3",{attrs:{id:"处理字体图标资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理字体图标资源"}},[t._v("#")]),t._v(" 处理字体图标资源")]),t._v(" "),s("h3",{attrs:{id:"处理其他资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理其他资源"}},[t._v("#")]),t._v(" 处理其他资源")]),t._v(" "),s("h3",{attrs:{id:"处理js资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理js资源"}},[t._v("#")]),t._v(" 处理js资源")]),t._v(" "),s("h3",{attrs:{id:"处理html资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理html资源"}},[t._v("#")]),t._v(" 处理html资源")]),t._v(" "),s("h3",{attrs:{id:"开发服务器-自动化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开发服务器-自动化"}},[t._v("#")]),t._v(" 开发服务器&自动化")]),t._v(" "),s("h3",{attrs:{id:"生产模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产模式"}},[t._v("#")]),t._v(" 生产模式")]),t._v(" "),s("h3",{attrs:{id:"css处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css处理"}},[t._v("#")]),t._v(" CSS处理")]),t._v(" "),s("h3",{attrs:{id:"html压缩"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html压缩"}},[t._v("#")]),t._v(" HTML压缩")]),t._v(" "),s("h2",{attrs:{id:"实战"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实战"}},[t._v("#")]),t._v(" 实战")]),t._v(" "),s("h2",{attrs:{id:"原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")])])}),[],!1,null,null,null);a.default=e.exports}}]);