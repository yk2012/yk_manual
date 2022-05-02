(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{618:function(a,t,s){"use strict";s.r(t);var r=s(17),e=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"_1-精灵图-sprites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-精灵图-sprites"}},[a._v("#")]),a._v(" 1. 精灵图 Sprites")]),a._v(" "),s("h3",{attrs:{id:"_1-1-为什么需要精灵图"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-为什么需要精灵图"}},[a._v("#")]),a._v(" 1.1 为什么需要精灵图")]),a._v(" "),s("ul",[s("li",[a._v("为了有效地减少服务器接收和发送请求的次数，提高页面的加载速度，出现了CSS精灵技术（CSS Sprites、CSS 雪碧）")]),a._v(" "),s("li",[a._v("核心原理：将网页中的一些小背景图像整合到一张大图中，这样服务器只需要一次请求就可以了")])]),a._v(" "),s("h3",{attrs:{id:"_1-2-使用精灵图sprites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-使用精灵图sprites"}},[a._v("#")]),a._v(" 1.2 使用精灵图Sprites")]),a._v(" "),s("ul",[s("li",[a._v("精灵技术主要针对于背景图片使用，就是把多个小背景图片整合到一张大图片中")]),a._v(" "),s("li",[a._v("这个大图片称为 Sprites、精灵图、雪碧图")]),a._v(" "),s("li",[a._v("移动背景图片位置，此时可以使用background-position")]),a._v(" "),s("li",[a._v("移动的距离就是这个目标图片的x和y坐标 （第四象限）")]),a._v(" "),s("li",[a._v("一般情况下都是往上往左移动，所以数值都是负值")]),a._v(" "),s("li",[a._v("使用精灵图时需要精确测量，每个小背景图片的大小和位置")])]),a._v(" "),s("h3",{attrs:{id:"_1-3-示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-示例"}},[a._v("#")]),a._v(" 1.3 示例")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("width: 100px; /*测量盒子大小*/\nheight: 112px; \nbackgroud: url(images/index.png) no-repeat -327px -142px; /*测量盒子位置*/\n")])])]),s("h1",{attrs:{id:"_2-字体图标-iconfont"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-字体图标-iconfont"}},[a._v("#")]),a._v(" 2.字体图标 iconfont")]),a._v(" "),s("h3",{attrs:{id:"_2-1-为什么需要字体图标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-为什么需要字体图标"}},[a._v("#")]),a._v(" 2.1 为什么需要字体图标")]),a._v(" "),s("p",[a._v("使用场景：主要用于显示网页中通用、常用的一些小图标"),s("br")]),a._v(" "),s("ul",[s("li",[a._v("精灵图的缺点：")])]),a._v(" "),s("ol",[s("li",[a._v("图片文件比较大")]),a._v(" "),s("li",[a._v("图片本身放大和缩小会失真")]),a._v(" "),s("li",[a._v("一旦图片制作完毕想要更换非常复杂")])]),a._v(" "),s("p",[a._v("字体图标可以为前端工程师提供一种方便高效的图标使用方式，==展示的是图标，本质属于字体==。")]),a._v(" "),s("ul",[s("li",[a._v("字体图标的优点")])]),a._v(" "),s("ol",[s("li",[a._v("轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了服务器请求")]),a._v(" "),s("li",[a._v("灵活性：本质其实是文字，可以随意改变颜色、产生阴影、透明效果、旋转等")]),a._v(" "),s("li",[a._v("兼容性：几乎支持所有的浏览器")])]),a._v(" "),s("ul",[s("li",[a._v("字体图标不能替代精灵技术，只是对工作中图标部分技术的提升和优化")])]),a._v(" "),s("ol",[s("li",[a._v("如果遇到一些结构和样式比较简单的小图标，用字体图标")]),a._v(" "),s("li",[a._v("如果遇到一些结构和样式复杂一点的小图片，就用精灵图")])]),a._v(" "),s("h3",{attrs:{id:"_2-2-步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-步骤"}},[a._v("#")]),a._v(" 2.2 步骤")]),a._v(" "),s("h4",{attrs:{id:"_2-2-1-下载"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-下载"}},[a._v("#")]),a._v(" 2.2.1 下载")]),a._v(" "),s("p",[a._v("icomoon.io\nwww.iconfont.cn")]),a._v(" "),s("h4",{attrs:{id:"_2-2-2-引入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-引入"}},[a._v("#")]),a._v(" 2.2.2 引入")]),a._v(" "),s("ol",[s("li",[a._v("把fonts文件夹放入页面根目录下")]),a._v(" "),s("li",[a._v("在CSS样式中全局声明字体\n复制压缩包里style.css里面的代码到css文件中")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("@font-face {\n  font-family: 'icomoon';\n  src:  url('fonts/icomoon.eot?3u46ev');\n  src:  url('fonts/icomoon.eot?3u46ev#iefix') format('embedded-opentype'),\n    url('fonts/icomoon.ttf?3u46ev') format('truetype'),\n    url('fonts/icomoon.woff?3u46ev') format('woff'),\n    url('fonts/icomoon.svg?3u46ev#icomoon') format('svg');\n  font-weight: normal;\n  font-style: normal;\n  font-display: block;\n}\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("打开demo.html 复制需要的图标（小方框）或者前面的代码加\\粘贴到需要的地方")]),a._v(" "),s("li",[a._v("声明字体")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("font-family: 'icomoon';\n")])])]),s("h4",{attrs:{id:"_2-2-3-追加"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3-追加"}},[a._v("#")]),a._v(" 2.2.3 追加")]),a._v(" "),s("p",[a._v("上传压缩包中的selection.json，选中想要的新图标，从新下载压缩包，并替换原来的文件即可")]),a._v(" "),s("h1",{attrs:{id:"_3-css三角"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-css三角"}},[a._v("#")]),a._v(" 3. CSS三角")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("div {\n    width: 0;\n    height: 0;\n    line-height: 0; /*为了兼容性*/\n    font-size: 0;\n    border: 10px solid transparent; \n    border-top-color: pink;  /*箭头向下的三角形*/\n}\n\n")])])]),s("p",[a._v("子绝父相 做 小三角")]),a._v(" "),s("h1",{attrs:{id:"_4-css用户界面样式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-css用户界面样式"}},[a._v("#")]),a._v(" 4. CSS用户界面样式")]),a._v(" "),s("h3",{attrs:{id:"_4-1-更改用户的鼠标样式-cursor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-更改用户的鼠标样式-cursor"}},[a._v("#")]),a._v(" 4.1 更改用户的鼠标样式 cursor")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("选择器 {\n    cursor: default; /*默认*/\n    cursor: pointer; /*小手*/\n    cursor: move;   /*移动*/\n    cursor: text;   /*文本光标*/\n    cursor: not-allowed; /*禁止*/\n}\n")])])]),s("h3",{attrs:{id:"_4-2取消表单轮廓-outline"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2取消表单轮廓-outline"}},[a._v("#")]),a._v(" 4.2取消表单轮廓 outline")]),a._v(" "),s("p",[a._v("给表单添加")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("outline: 0;\noutline: none;\n")])])]),s("p",[a._v("可以去掉默认的蓝色边框")]),a._v(" "),s("h3",{attrs:{id:"_4-3防止拖拽文本域-resize"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-3防止拖拽文本域-resize"}},[a._v("#")]),a._v(" 4.3防止拖拽文本域 resize")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("textarea {\n    resize: none;\n}\n")])])]),s("h1",{attrs:{id:"_5-vertical-align-属性应用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-vertical-align-属性应用"}},[a._v("#")]),a._v(" 5. vertical-align 属性应用")]),a._v(" "),s("p",[a._v("用于设置图片或表单（行内块元素）和文字垂直对齐 middle")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("vertical-align: baseline; /*默认，元素放置在父元素的基线上*/\nvertical-align: top;     /*把元素的顶端于行中最高元素的顶端对齐*/\nvertical-align: middle;  /*把此元素放置在父元素的中部*/\nvertical-align: bottom;  /*把元素的顶端于行中最低的元素的顶端对齐*/\n")])])]),s("h3",{attrs:{id:"解决图片底部默认空白缝隙问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决图片底部默认空白缝隙问题"}},[a._v("#")]),a._v(" 解决图片底部默认空白缝隙问题")]),a._v(" "),s("p",[a._v("图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐")]),a._v(" "),s("ul",[s("li",[a._v("解决方法")])]),a._v(" "),s("ol",[s("li",[a._v("给图片添加 vertical-align: middle|top|bottom;")]),a._v(" "),s("li",[a._v("把图片转换成块级元素 display: block;")])]),a._v(" "),s("h1",{attrs:{id:"_6-溢出的文字省略号显示"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-溢出的文字省略号显示"}},[a._v("#")]),a._v(" 6. 溢出的文字省略号显示")]),a._v(" "),s("h3",{attrs:{id:"_6-1-单行文本溢出显示省略号"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-单行文本溢出显示省略号"}},[a._v("#")]),a._v(" 6.1 单行文本溢出显示省略号")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("white-space: nowrap;  /*1.先强制一行内显示文本（默认：normal 自动换行）*/ \noverflow: hidden;     /*2.超出的部分隐藏*/\ntext-overflow: ellipsis; /*文字用省略号代替超出的部分*/\n")])])]),s("h3",{attrs:{id:"_6-2-多行文本溢出显示省略号"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-多行文本溢出显示省略号"}},[a._v("#")]),a._v(" 6.2 多行文本溢出显示省略号")]),a._v(" "),s("p",[a._v("适合于webkit浏览器或移动端")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("overflow: hidden;\ntext-overflow: ellipsis; \ndisplay: -webkit-box;  /*弹性伸缩盒子模型显示*/\n-webkit-line-clamp: 2;   /*限制在一个块元素显示的文本的行数*/\n-webkit-box-orinent: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/\n")])])]),s("ul",[s("li",[a._v("推荐让后台人员设置，操作更简单")])]),a._v(" "),s("h1",{attrs:{id:"_7-常见布局技巧"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-常见布局技巧"}},[a._v("#")]),a._v(" 7. 常见布局技巧")]),a._v(" "),s("h3",{attrs:{id:"_7-1-margin负值的运用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-margin负值的运用"}},[a._v("#")]),a._v(" 7.1 margin负值的运用")]),a._v(" "),s("ul",[s("li",[a._v("让每个盒子margin: -1px; 正好压住相邻盒子边框")]),a._v(" "),s("li",[a._v("鼠标经过某个盒子时，提高当前盒子的层级即可（如果没有定位，则加相对定位，如果有定位，则加z-index）")])]),a._v(" "),s("h3",{attrs:{id:"_7-2-文字环绕浮动元素"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-2-文字环绕浮动元素"}},[a._v("#")]),a._v(" 7.2 文字环绕浮动元素")]),a._v(" "),s("h3",{attrs:{id:"_7-3-行内块的巧妙运用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-3-行内块的巧妙运用"}},[a._v("#")]),a._v(" 7.3 行内块的巧妙运用")]),a._v(" "),s("h3",{attrs:{id:"_7-4-css三角强化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-4-css三角强化"}},[a._v("#")]),a._v(" 7.4 CSS三角强化")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("width: 0;\nheight: 0;\nborder-color: transparent red transparent transparent;\nborder-style: solid;\nborder-width: 22px 8px 0 0;\n")])])]),s("h1",{attrs:{id:"_8-css初始化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-css初始化"}},[a._v("#")]),a._v(" 8. CSS初始化")])])}),[],!1,null,null,null);t.default=e.exports}}]);