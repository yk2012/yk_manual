(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{645:function(t,a,s){"use strict";s.r(a);var n=s(17),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("@[toc]")]),t._v(" "),s("h1",{attrs:{id:"javascript-object-notation-js对象表示法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#javascript-object-notation-js对象表示法"}},[t._v("#")]),t._v(" JavaScript Object Notation JS对象表示法")]),t._v(" "),s("h1",{attrs:{id:"_1-json-格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-json-格式"}},[t._v("#")]),t._v(" 1. JSON 格式")]),t._v(" "),s("ul",[s("li",[t._v("复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象")]),t._v(" "),s("li",[t._v("原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）")]),t._v(" "),s("li",[t._v("字符串必须使用双引号表示，不能使用单引号")]),t._v(" "),s("li",[t._v("对象的键名必须放在双引号里面")]),t._v(" "),s("li",[t._v("数组或对象最后一个成员的后面，不能加逗号")]),t._v(" "),s("li",[t._v("JS中的对象只有JS自己认识，其他的语言都不认识")]),t._v(" "),s("li",[t._v("JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，并且可以转换为任意语言中的对象，JSON在开发中主要用来数据的交互JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须加双引号其他的和JS语法一致")])]),t._v(" "),s("h1",{attrs:{id:"_2-json分类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-json分类"}},[t._v("#")]),t._v(" 2. JSON分类")]),t._v(" "),s("ol",[s("li",[t._v("对象 {}")]),t._v(" "),s("li",[t._v("数组 []")])]),t._v(" "),s("h1",{attrs:{id:"_3-json中允许的值"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-json中允许的值"}},[t._v("#")]),t._v(" 3. JSON中允许的值")]),t._v(" "),s("ol",[s("li",[t._v("字符串")]),t._v(" "),s("li",[t._v("数值")]),t._v(" "),s("li",[t._v("布尔值")]),t._v(" "),s("li",[t._v("null")]),t._v(" "),s("li",[t._v("对象")]),t._v(" "),s("li",[t._v("数组")])]),t._v(" "),s("h2",{attrs:{id:"_3-1-举例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-举例"}},[t._v("#")]),t._v(" 3.1 举例")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[1,2,3,\"hello\",true]'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\t\t\t  \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" obj2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'{\"arr\":[1,2,3]}'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n  \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'[{"name":"孙悟空","age":18,"gender":"男"},{"name":"孙悟空","age":18,"gender":"男"}]\'')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h1",{attrs:{id:"_4-json工具类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-json工具类"}},[t._v("#")]),t._v(" 4. JSON工具类")]),t._v(" "),s("h2",{attrs:{id:"_4-1-json-js对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-json-js对象"}},[t._v("#")]),t._v(" 4.1 json > js对象")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[t._v("可以将以JSON字符串转换为js对象")]),t._v(" "),s("li",[t._v("它需要一个JSON字符串作为参数，会将该字符串转换为JS对象并返回")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" o "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("json"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" o2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" obj3 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("”猪八戒” "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("28")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("gender")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("”男”"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"_4-2-js对象-json"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-js对象-json"}},[t._v("#")]),t._v(" 4.2 JS对象 > JSON")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -ify/fy，表示”使……化。")]),t._v("\n")])])]),s("ul",[s("li",[t._v("可以将一个JS对象转换为JSON字符串")]),t._v(" "),s("li",[t._v("需要一个js对象作为参数，会返回一个JSON字符串")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj3"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("JSON这个对象在IE7及以下的浏览器中不支持，所以在这些浏览器中调用时会报错")])])])}),[],!1,null,null,null);a.default=r.exports}}]);