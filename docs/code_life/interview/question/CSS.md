
**CSS Cascading Style Sheets 层叠样式表**

> CSS入门挺简单，但是想要精通CSS还挺难的~今天整理一些面试题，面试题说明是最常用最基础的最容易混淆的一些知识点，用来复习CSS也是很不错的选择
> 学无止境，不定期持续更新中......

# 1. 基础知识类
大部分的内容可以参考我之前的博文用来仔细复习用
[【CSS】入门-特性-基础选择器&复合选择器-类-id-通配符-后代选择器-子元素选择器-伪类选择器-并集选择器](https://blog.csdn.net/weixin_44972008/article/details/110390552)
## 1.1 CSS的层叠性

> 为同一个属性指定了不同的值，层叠最终只会选择一个值来渲染元素

当有多个样式规则冲突声明时，会出现层叠性，CSS会根据 ①来源②优先级③源码顺序 来决定最终起作用的是哪一个样式规则
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210513093816158.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
如上图所示 
1. 来源重要性由低到高
	1. 用户代理 （浏览器默认样式）
	2. 作者 （你写的CSS） 
	3. 作者的 !important 
2. 内联样式 在标签行内声明样式
3. 判断选择器优先级
4. 源码顺序

tips 经验法则建议（不要使用id选择器，不要使用!important）
## 1.2 继承性

> 如果一个元素的某个属性没有层叠值，则可能会继承某个祖先元素的值

### 1.2.1 哪些属性可以继承
（1）**字体**系列属性
font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust

（2）**文本**系列属性
text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、text-transform、direction、color

（3）**表格**布局属性
caption-side、border-collapse、empty-cells

（4）**列表**属性
list-style-type、list-style-image、list-style-position、list-style

（5）**光标**属性
cursor

（6）**元素可见性**
visibility

（7）还有一些不常用的；speak，page，设置嵌套引用的引号类型quotes等属性

### 1.2.2 line-height的继承
三种继承的情况
1. 具体数值  【继承具体数值】
2. 比例 【继承比例】
3. 百分比 【继承计算过的具体数值】


### 1.2.3 不可继承的样式属性
不可继承的样式属性： border, padding, margin, width, height；
### 1.2.4 不可以继承的元素怎么办
当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

使用`inherit`关键字可以强制继承一个通常不会被继承的属性
使用`initial`关键字卡可以将某个**属性**重制成属性的默认初始值注意与`auto`的区别



## 1.3 选择器相关
### 1.3.1 常用选择器
（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1 p）
（5）相邻后代选择器（子）选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）

### 1.3.2 选择器优先级
ID选择器，类选择器，标签名
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210513100138655.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

### 1.3.3 伪类选择器与伪元素选择器 
在css3中使用单冒号来表示伪类，用双冒号来表示伪元素。
但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置，比如after、before等。

css引入伪类和伪元素概念是为了格式化文档树以外的信息。
也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after。


### 1.3.4 关于伪类 LVHA 的解释
就是因为层叠性，选择器优先级都一样，最终就是按照书写位置决定样式，后书写的会覆盖前书写的


a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类 :link、:visited、:hover、:active；

当链接未访问过时：
（1）当鼠标滑过a链接时，满足:link和:hover两种状态，要改变a标签的颜色，就必须将:hover伪类在:link伪类后面声明；
（2）当鼠标点击激活a链接时，同时满足:link、:hover、:active三种状态，要显示a标签激活时的样式（:active），必须将:active声明放到:link和:hover之后。
因此得出LVHA这个顺序。

当链接访问过时，情况基本同上，只不过需要将:link换成:visited。

### 1.3.5 LVHA这个顺序能不能变？
可以，但也只有:link和:visited可以交换位置，因为一个链接要么访问过要么没访问过，不可能同时满足，也就不存在覆盖的问题。

## 1.4 块级元素行内元素
块级元素
display:block/table; 有 div h1 h2 table ul ol p 等
display: inline/inline-block; 有 span img input button 等

- `block`：块级元素，前后都有换行符，可设置width和height，padding和margin水平垂直方向均有效
- `inline`：内联元素，前后无换行符，在一排排列，不可设置width和height，垂直方向上padding和margin失效
- `inline-block`：内联块级元素，可设置width和height，padding和margin水平垂直方向均有效，前后无换行符

## 1.5 什么是盒子模型
[【CSS】盒子模型-边框-内外边距-外边距合并-清除内外边距-圆角边框-盒子阴影-文字阴影](https://blog.csdn.net/weixin_44972008/article/details/110421001)

盒模型分为两种 
IE盒模型（border-box）、W3C标准盒模型（content-box）

标准盒子模型：
width=content 
盒子宽度=width+padding+border

IE盒子模型：
width=content+padding+border 
盒子宽度=width

## 1.6 对 line-height 是如何理解的？
line-height指的是一行字的高度，包含了字间距，实际上是下一行基线到上一行基线的距离。
如果一个标签没有定义height属性，那么其最终表现的高度是由line-height决定的。
一个容器没有设置高度，那么撑开容器的高度的是line-height,而不是容器内部的文字内容。
把line-height值设置为height一样大小的值可以实现单行文字的垂直居中。
line-height和height都能撑开一个高度，height会触发haslayout，而line-height不会。

## 1.7 为什么img是inline还可以设置宽高
img属于替换元素，替换元素一般有内在尺寸和宽高比，所以具有width和height，可设定

HTML中的替换元素：img、input、textarea、select

## 1.8 什么是浮动？用处 清除浮动
[【CSS】浮动float-清除浮动-标准流-浮动布局](https://blog.csdn.net/weixin_44972008/article/details/110734655)
1. 浮动元素会脱离标准流（脱标）
脱离标准普通流的控制（浮）移动到指定位置（动），（俗称脱标）
浮动的盒子不再保留原先的位置

2. 浮动元素会一行内显示并且元素顶部对齐
浮动的元素是互相贴靠在一起的（不会有缝隙），如果父级宽度装不下这些浮动的盒子，多出的盒子会另起一行对齐

3. 浮动元素会具有行内块元素的特性
任何元素都可以浮动
行内元素有了浮动，不需要转换成块级、行内块元素就可以直接设置高度和宽度
块级元素没有设置宽度，默认宽度和父级一样宽，添加浮动之后，它的大小根据内容来决定


### 清除浮动
```css
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1
}
```

## 1.9 什么是定位？用处
[【CSS】定位--静态定位-相对定位-绝对定位-子绝父相-固定定位-粘性定位](https://blog.csdn.net/weixin_44972008/article/details/110734680)

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/46ab2af9fb7e9c735d83565d5df988dc.png)


## 1.10 display 有哪些值？说明他们的作用。
`block`    块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
`none`    元素不显示，并从文档流中移除。
`inline`    行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
`inline-block`默认宽度为内容宽度，可以设置宽高，同行显示。
`list-item`    像块类型元素一样显示，并添加样式列表标记。
`table`    此元素会作为块级表格来显示。
`inherit`    规定应该从父元素继承display属性的值。
`grid` 定义一个容器属性为网格布局
`flex`	定义一个弹性布局

## 1.11 负外边距
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210513160724381.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 1.12 BFC
### 定义
块级格式化上下文（block formatting context,BFC)

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

### 触发方式/哪些元素会生成BFC

1. 根元素，即HTML标签
2. 浮动元素：float值为left或right
3. 定位元素：position为fixed或absolute的元素
4. overflow值不为visible，为auto、scroll、hidden的元素
5. display值为inline-block、table-cell、table-caption、flex、inline-flex的元素

### 约束规则
1. 内部的box会在垂直方向上一个接一个放置
2. 内部的box垂直方向上的距离由margin决定
3. 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也如此
4. BFC的区域不会与float的元素区域重叠
5. 计算BFC高度时，浮动元素也参与计算

### 作用
1. 阻止元素被浮动元素覆盖
2. 可用来清除浮动带来的外边距塌陷问题
3. 阻止因浏览器四舍五入造成的多列布局换行的情况
4. 阻止相邻元素margin合并（防止外边距折叠）
5. 可以用来自适应两栏布局


## 1.13 隐藏页面中某个元素的方法？
1. opacity=0；
2. visibility=hidden；
3. display：none；
4. position移到外部；
5. z-index图层遮盖
### visibility=hidden, opacity=0, display:none区别
- `opacity=0;` 元素透明度为0，该元素被隐藏起来，但不会改变页面布局，如果该元素已经绑定一些事件，仍能触发
- `visibility=hidden;`元素不可见但仍然存在，不会改变页面布局，但不会触发该元素已经绑定的事件
- `display:none;`元素不显示并且会改变页面布局，可理解为该元素从页面中被删除


从占据空间角度看：
`display: none;`会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
`visibility:  hidden;`不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见；

从继承方面角度看：
`display: none;`是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；
`visibility:hidden;`是继承属性，子孙节点消失由于继承了hidden，通过设置`visibility: visible;`可以让子孙节点显式；

从重绘和重排角度看：
修改常规流中元素的`display`通常会造成文档重排。
修改`visibility`属性只会造成本元素的重绘

读屏器不会读取`display: none;`元素内容；会读取`visibility: hidden`元素内容


## 1.14 什么是外边距重叠？ 重叠的结果是什么？
首先，外边距重叠就是 margin-collapse。相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距。
折叠结果遵循下列计算原则：

两个相邻的外面边距是正数时，折叠结果就是他们之中的较大值；
两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值；
两个外边距一正一负时，折叠结果是两者的相加的和；


毗邻的两个或多个margin会合并成一个margin，叫做外边距折叠。规则如下：
两个或多个毗邻的普通流中的块元素垂直方向上的margin会折叠；
浮动元素或inline-block元素或绝对定位元素的margin不会和垂直方向上的其他元素的margin折叠；
创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠；
元素自身的margin-bottom和margin-top相邻时也会折叠；


# 2. CSS3新特性

## 2.1 CSS3 有哪些新特性？
新增各种CSS选择器    （:not(.input)：所有class不是“input”的节点）
圆角        （border-radius:8px）
多列布局    （multi-columnlayout）
阴影和反射    （Shadow\Reflect）
文字特效        （text-shadow）
文字渲染        （Text-decoration）
线性渐变        （gradient）
旋转            （transform）
缩放，定位，倾斜，动画，多背景
媒体查询（@media）;
RGBA和透明度 ;
@font-face属性;
多背景图 ;
盒子大小;
语音;
CSS3 2D转换：transform: translate()、rotate()、scale()
CSS3 3D转换：transform: rotateX()、rotateY()
CSS3 过渡：transition
CSS3 动画：animation

## 2.2 transition有哪些属性？
transition-property：指定过渡的属性值
transition-delay：指定延迟过渡时间
transition-duration：指定过渡持续时间
transition-timing-function：指定过渡动画缓动类型（ease-out/快-慢、ease-in/慢-快、ease-in-out/慢-快-慢、liner线性过渡、cubic-bezier贝塞尔曲线等）
## 2.3 新增伪类
（1）elem:nth-child(n)选中父元素下的第n个子元素，并且这个子元素的标签名为elem，n可以接受具体的数
值，也可以接受函数。

（2）elem:nth-last-child(n)作用同上，不过是从后开始查找。

（3）elem:last-child选中最后一个子元素。

（4）elem:only-child如果elem是父元素下唯一的子元素，则选中之。

（5）elem:nth-of-type(n)选中父元素下第n个elem类型元素，n可以接受具体的数值，也可以接受函数。

（6）elem:first-of-type选中父元素下第一个elem类型元素。

（7）elem:last-of-type选中父元素下最后一个elem类型元素。

（8）elem:only-of-type如果父元素下的子元素只有一个elem类型元素，则选中该元素。

（9）elem:empty选中不包含子元素和内容的elem类型元素。

（10）elem:target选择当前活动的elem元素。

（11）:not(elem)选择非elem元素的每个元素。

（12）:enabled    控制表单控件的禁用状态。

（13）:disabled        控制表单控件的禁用状态。

  (14):checked单选框或复选框被选中。


## 2.4 flex
[Flex 布局教程:语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

概念： Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

## 2.5 网格布局grid
[CSS Grid 网格布局教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 2.6 grid布局和flex布局的区别

flex布局是轴线布局，只能指定items针对轴线的位置，可以看作是一维布局；grid布局则是将容器划分为行和列，产生单元格，然后指定items所在的单元格，可以看作是二维布局。

## 2.7 box-sizing 常用的属性有哪些？分别有什么作用？

```css
box-sizing: content-box; // 默认的标准(W3C)盒模型元素效果；
box-sizing: border-box; // 触发怪异(IE)盒模型元素的效果；
box-sizing: inherit; // 继承父元素 box-sizing 属性的值；
```

## 2.7 rgba() 和 opacity 的透明效果有什么不同？
`opacity` 作用于元素以及元素内的所有内容（包括文字）的透明度；

`rgba()` 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果；


## 2.8 响应式 em与rem
- px 绝对长度单位，最常用
- em 相对长度单位，相对于【父元素】，不常用
- rem 相对长度单位，相对于【html根元素】，常用于响应式布局

在html设置font-size，其他元素可以继承，使用rem单位


## 2.9 响应式 media query 媒体查询
通过使用media query + rem来实现移动端的响应式布局

```css
@media only screen and (max-width: 374px) {
/* iPhone5或更小 */
html {
	font-size: 86px;
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
/* iPhone6/7/8/X */
html {
	font-size: 100px;
}
@media only screen and (min-width: 414px) {
/* iPhone6p或更大 */
html {
	font-size: 110px;
}
```
## 2.10 视口与vm、vh
rem的弊端：“阶梯”性 

网页视口尺寸

```javascript
window.screen.height // 屏幕高度
window.innerHeight // 网页视口高度 （浏览器可视区域）
document.body.clientHeight // body 高度
```

- `vm` 相对于视口宽度的 1%
- `vh`  相对于视口高度的 1%

视口（Viewport）= 浏览器窗口的尺寸。如果视口为 50 厘米宽，则 1vw = 0.5 厘米。

# 3. 实际应用类
## 3.1 如何让盒子垂直居中

一般常见的几种居中的方法有：

对于宽高固定的元素

（1）我们可以利用margin:0auto来实现元素的水平居中。

（2）利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水
平和垂直方向上的居中。

（3）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素
的中心点到页面的中心。

（4）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素
的中心点到页面的中心。

（5）使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对
齐，然后它的子元素也可以实现垂直和水平的居中。

对于宽高不定的元素，上面的后面两种方法，可以实现元素的垂直和水平的居中。

主要记住这两种 **定位** or **flex**
具体可以参考YK菌之前的博文[【CSS】实现盒子居中对齐的七种方法](https://blog.csdn.net/weixin_44972008/article/details/115742650)

## 3.2 用纯 CSS 创建一个三角形的原理是什么？
采用的是相邻边框连接处的均分原理。  
将元素的宽高设为0，只设置  border  ，把任意三条边隐藏掉（颜色设为  transparent），剩下的就是一个三角形。

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

## 3.3 一个满屏品字布局如何设计?
简单的方式：
    上面的div宽100%，
    下面的两个div分别宽50%，
    然后用float或者inline使其不换行即可
```css
.content {
    width: 50%;
    height: 150px;
    margin: 0 auto;
}
.top {
    width: 40%;
    height: 50px;
    background-color: pink;
    margin-bottom: 50px;
    margin-left: 30%;
}
.left {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: left;
}
.right {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: right;
}
```
```html
<div class="content">
    <div class="top"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210522201240359.png)

## 3.4 CSS 多列等高如何实现？
（1）利用padding-bottom|margin-bottom正负值相抵，不会影响页面布局的特点。设置父容器设置超出隐藏（overflow:
hidden），这样父容器的高度就还是它里面的列没有设定padding-bottom时的高度，当它里面的任一列高度增加了，则
父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

（2）利用table-cell所有单元格高度都相等的特性，来实现多列等高。

（3）利用flex布局中项目align-items属性默认为stretch，如果项目未设置高度或设为auto，将占满整个容器的高度的特性，来实现多列等高。


## 3.5 三种文档流
### 普通流
普通文档流 指的是网页元素的默认布局行为。行内元素跟随文字的方向从左到右排列，当到达容器边缘时会换行。块级元素会占据完整的一行，前后都有换行

普通流中，盒子一个接着一个排列
块级格式化上下文里，盒子竖着排列；行内格式化上下文中，盒子横着排列
当position为static或relative，并且float为none时会触发普通流
position：static，盒的位置是常规流布局里的位置
position：relative，盒偏移位置由top、bottom、left、right属性定义。即使有偏移，仍然保留原有位置，其他常规流不能占用这个位置

### 定位流

盒从常规流中被移除，不影响常规流的布局
当position为fixed或absolute时为绝对定位元素
position：absolute，元素定位将相对于上级元素中最近的一个relative、fixed、absolute，如果没有则相对于body
### 浮动流

左浮动元素尽量靠左靠上，右浮动同理
除非设置clear，否则普通流环绕在其周围
浮动元素不影响块级元素的布局，但会影响行内元素的布局，让其围绕在自己周围，撑大父级元素，从而间接影响块级元素布局
浮动元素最高点不超过当前行的最高点和其前面的浮动元素的最高点；不超过它的包含块，除非元素本身已经比包含块更宽
行内元素只出现在左浮动元素的右边或右浮动元素的左边

## 3.6 页面布局方式
方式	|布局特点	|设计方法	|缺点
----|----|----|----
静态布局（Static Layout）	|无论浏览器尺寸具体多少，网页布局始终按照最初写代码时的布局来实现|	居中布局，所有样式使用绝对宽度和高度px；屏幕宽高调整时通过滚动条来浏览被遮掩部分	|不能根据用户的屏幕尺寸做出不同表现
流式布局（Liquid Layout）|	屏幕分辨率变化时，页面内元素的大小会变化而布局不变；屏幕太大或太小都会导致元素无法正常显示	|使用%定义宽度，px定义高度，配合max-width/min-width控制尺寸流动范围以免过大或过小影响阅读	|如果屏幕尺寸跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示
自适应布局（Adaptive Layout）|	屏幕分辨率变化时，页面内元素的位置会变化而大小不会变化	|创建多个静态布局，每个静态布局对应一个屏幕分辨率范围，屏幕分辨率改变时，切换不同的静态布局（通过@media媒体查询给不同尺寸的设备切换不同样式）	|需要需要为不同的设备开发不同的页面，增加开发成本；当需求改变时可能会改动多套代码，流程繁琐。
响应式布局（Responsive Layout）|	每个屏幕分辨率下会有一个布局样式，即屏幕分辨率变化时，元素位置和大小都会变	|@media媒体查询+流式布局	|媒体查询是有限的，只能适应主流媒体的宽高
弹性布局（rem/em布局）	|包裹文字的各元素的尺寸采用rem/em做单位（em相对其父元素，rem始终相对html大小，即页面根元素），页面主要划分区域的尺寸仍使用百分数或px	|一般使用rem，根据屏幕大小来控制html元素的font-size，即可自动改变所有用rem定义尺寸的元素的大小	|只做到了宽度自适应，无法满足一些对高度或者元素间距要求较高的设计

### 流式布局VS响应式布局

流式布局用于解决类似的设备不同分辨率之间的兼容（分辨率差异较小）；响应式布局用于解决不同设备之间不同分辨率的兼容（分辨率差异较大）

### 自适应布局VS响应式布局

共同点：检测设备，根据不同设备采用不同CSS，且CSS都采用百分比确定宽度

区别：响应式布局在不同设备上看上去是不一样的，会随着设备的改变而改变展示样式；自适应布局在所有的设备上看上去是一样的模板，不过是长度或者图片变小了

## 3.7 CSS预处理器/后处理器是什么？为什么要使用它们？
预处理器，如：less，sass，stylus,用来预编译sass或者less，增加了css代码的复用性，还有层级，mixin， 变量，循环， 函数等，对编写以及开发UI组件都极为方便。

后处理器， 如： postCss,通常被视为在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

结构清晰， 便于扩展
可以很方便的屏蔽浏览器私有语法的差异
可以轻松实现多重继承
完美的兼容了CSS代码，可以应用到老项目中
## 3.8 link 与 @import 的区别？
link 是HTML方式， @import 是CSS方式；
link最大限度支持并行下载，@import 过多嵌套导致串行下载，出现FOUC；
link 可以通过 rel="alternate stylesheet" 指定候选样式；
浏览器对 link 支持早于@import ，可以使用 @import对老浏览器隐藏样式；
@import必须在样式规则之前，可以在css文件中引用其他文件；

总的来说： link优于@import


## 3.9 css sprites是什么？如何使用？
css精灵图，把一堆小的图片整合到一张大的图片（png）上，利用CSS的“background-image”，“background- repeat”``，“background-position”的组合进行背景定位background-position可以用数字能精确的定位出背景图片的位置，减轻服务器对图片的请求数量。


## 3.10 style标签写在body后与body前有什么区别？
一般情况下，页面加载时自上而下的。将style标签至于body之前，为的是先加载样式。
若是写在body标签之后，由于浏览器以逐行方式对html文档进行解析，当解析到写在写在文档尾部的样式表时，会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后会重新渲染，在windows的IE下可能会出现FOUC现象（页面闪烁）。

## 3.11 圣杯局部
两侧内容宽度固定，中间内容宽度自适应
三栏布局，中间一栏最先加载、渲染出来（主要内容）
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>双飞翼布局</title>
  <style>
    header {
      background-color: pink;
    }

    .main {
      width: 100%;
      float: left;
      background-color: skyblue;
    }

    .center {
      margin: 0 100px 0 100px;
    }

    .left {
      width: 100px;
      background-color: green;
      float: left;
      margin-left: -100%;
    }

    .right {
      width: 100px;
      background-color: red;
      float: left;
      margin-left: -100px;
    }

    footer {
      background-color: pink;
      clear: both
    }
  </style>
</head>

<body>
  <header>头部</header>
  <div class="main">
    <div class="center">主区域</div>
  </div>
  <div class="left">左区域</div>
  <div class="right">右区域</div>
  <footer>底部</footer>
</body>

</html>
```


## 3.12 双飞翼布局
两侧内容宽度固定，中间内容宽度自适应
三栏布局，中间一栏最先加载、渲染出来（主要内容）

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>双飞翼布局</title>
  <style>
    header {
      background-color: pink;
    }

    .wrapper{
      width: 100%;
      float: left;
    }

    .center {
      width: 100%;
      background-color: skyblue;
      float: left;
      margin: 0 100px;
    }

    .left {
      width: 100px;
      background-color: green;
      float: left;
      margin-left: -100%;
    }

    .right {
      width: 100px;
      background-color: red;
      float: left;
      margin-left: -100px;
    }

    footer {
      background-color: pink;
      clear: both
    }
  </style>
</head>

<body>
  <header>头部</header>
  <div class="wrapper">
    <div class="center">主区域</div>
  </div>
  <div class="left">左区域</div>
  <div class="right">右区域</div>
  <footer>底部</footer>
</body>

</html>
```




# 4. 一些相关问题
## 4.1 简单介绍使用图片 base64 编码的优点和缺点。
base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的
url属性。

使用base64的优点是：

（1）减少一个图片的HTTP请求

使用base64的缺点是：

（1）根据base64的编码原理，编码后的大小会比原文件大小大1/3，如果把大图片编码到html/css中，不仅会造成文件体
积的增加，影响文件的加载速度，还会增加浏览器对html或css文件解析渲染的时间。

（2）使用base64无法直接缓存，要缓存只能缓存包含base64的文件，比如HTML或者CSS，这相比域直接缓存图片的效果要
差很多。

（3）兼容性的问题，ie8以前的浏览器不支持。

一般一些网站的小图标可以使用base64图片来引入。



## 4.2 png、jpg、 jpeg、 bmp、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
（1）png-便携式网络图片（Portable Network Graphics）,是一种无损数据压缩位图文件格式。优点是：压缩比高，色彩好。 大多数地方都可以用。
（2）jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
（3）gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果。
（4）bmp的优点： 高质量图片；缺点： 体积太大； 适用场景： windows桌面壁纸；
（5）webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。


# 5. 相关参考
《深入解析CSS》
[104道 CSS 面试题，助你查漏补缺](https://segmentfault.com/a/1190000022021557)
[前端面试每日 3+1](https://github.com/haizlin/fe-interview)
[前端面试小本本](https://barryyeee.github.io/InterviewGuide/Chapter5/)
[css篇--100道近两万字帮你巩固css知识点](https://juejin.cn/post/6844904185847087111)
