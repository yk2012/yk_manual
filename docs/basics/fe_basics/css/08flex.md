
> 今天我们先十分钟搞定flex布局基本语法，然后跟着YK菌利用flex手写一个静态的携程手机网页~


参考&推荐阅读

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html) 


# 1. 什么是flex
flex (flexible box 弹性盒，伸缩盒) 【弹性布局】
- 是CSS3中的又一种布局手段
- 主要同来代替**浮动**来完成页面的布局
- flex可以使元素具有弹性，让元素可以跟随页面大小的改变而改变

任何一个容器都可以指定为flex布局
- 当父盒子设为flex布局后，子元素的float、clear和vertical-align属性将失效
- 采用flex布局的元素，成为flex容器，弹性容器，简称**容器** container
- 其所有子元素自动成为容器成员，成为flex项目(item)，简称**项目** item


一句话总结flex布局原理：**通过给父盒子添加flex属性，来控制子盒子的位置和排列方式**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48784f39fc7c40ebafac05929597ad3d~tplv-k3u1fbpfcp-zoom-1.image)

主轴：排列的方向
侧轴：垂直于主轴（后面也称交叉轴）
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e96845c4b72045779be1d018a5f9158c~tplv-k3u1fbpfcp-zoom-1.image)

# 2. 弹性容器 container
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d8aba318e9647f0aa031325891afc9f~tplv-k3u1fbpfcp-zoom-1.image)

要使用弹性盒，必须先将一个元素设置为弹性容器
（父盒子）通过display设置弹性容器

```css
.box{
  display: flex; /* 设置为块级弹性容器*/
  dispaly: inline-flex /* 设置为行内弹性容器*/
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/addc93cb0e1a4d3c9f59cd97cc2d6b46~tplv-k3u1fbpfcp-zoom-1.image)

- 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效

## 常见容器的属性总结

常见容器属性 | 属性功能
--|--
flex-direction| 设置主轴方向
justify-content | 设置主轴子元素排列方式
flex-wrap | 设置子元素是否换行
align-content | 设置侧轴上子元素的排列方式（多行）
align-items | 设置侧轴上子元素的排列方式（单行）
flex-flow | 复合属性，相当于设置了 flex-direction 和 flex-wrap 



## flex-direction 排列方向
属性决定主轴的方向（即**项目的排列方向**）

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
属性值 | 说明
--|--
row（默认值）| 【从左到右】主轴为水平方向，起点在左端。
row-reverse | 【从右到左】主轴为水平方向，起点在右端。
column | 【从上到下】主轴为垂直方向，起点在上沿。
column-reverse | 【从下到上】主轴为垂直方向，起点在下沿。

## flex-wrap 如何换行
默认情况下，项目都排在一条线（又称"轴线"）上（如果显示不开，就缩小子元素的宽度）。
flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
属性 | 说明
--|--
nowrap（默认）| 不换行。
wrap|换行，第一行在上方。
wrap-reverse|换行，第一行在下方。

## flex-flow 简写
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
（排列方向，换不换行）
```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

## justify-content 主轴对齐方式
justify-content属性定义了项目在**主轴**上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```
属性值 | 对齐方式（以默认主轴为例）
--|--
flex-start（默认值）| 左对齐
flex-end | 右对齐
center | 居中对齐
space-between | 贴边，平均剩余空间
space-around | 平均剩余空间
space-evenly | 均匀分布



`space-between` ： 两端对齐，项目之间的间隔都相等。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a29a626e70d42b99b773c6ec6fb7aee~tplv-k3u1fbpfcp-zoom-1.image)

`space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cae4944b4aa45c99369061fc2a32762~tplv-k3u1fbpfcp-zoom-1.image)
`space-evenly`: 均匀分布（兼容性不好）
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7914d5f0b34e4197a5db86c1de55747f~tplv-k3u1fbpfcp-zoom-1.image)


## align-items 侧轴对齐方式
align-items属性定义项目在**交叉轴**上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7406090cd0bf48e18d2eefc49eada5bf~tplv-k3u1fbpfcp-zoom-1.image)
属性值 | 说明
-- | --
flex-start|交叉轴的起点对齐
flex-end|交叉轴的终点对齐
center|交叉轴的中点对齐
baseline|项目的第一行文字的基线对齐
stretch（默认值）| （拉伸）如果项目未设置高度或设为auto，将占满整个容器的高度

## align-content 侧轴对齐方式（多行）
align-content属性定义了多根轴线的对齐方式。
如果项目只有一根轴线，该属性不起作用。（单行无效）

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c8716a1034142b9a4421392d2463539~tplv-k3u1fbpfcp-zoom-1.image)

属性值 | 说明
--|--
flex-start | 与交叉轴的起点对齐
flex-end | 与交叉轴的终点对齐
center | 与交叉轴的中点对齐
space-between | 与交叉轴两端对齐，轴线之间的间隔平均分布
space-around | 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
stretch（默认值）|  轴线占满整个交叉轴


注意区别 align-content 与 align-items
- align-items 适用于**单行**情况下，只有上对齐、下对齐、居中和拉伸
- align-content 适用于**多行**（换行）的情况，单行无效，可以设置上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8d82475c5e44c519675b3df2c616a73~tplv-k3u1fbpfcp-zoom-1.image)


# 3. 弹性元素 item
弹性容器的（直接）子元素是弹性元素（弹性项）
一个元素可以**同时**是弹性容器和弹性元素




## flex-grow
flex-grow属性定义当父元素有多余空间时，子元素如何伸展，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```
父元素的剩余空间，会按照比例进行分配


## flex-shrink
flex-shrink属性定义了当父元素中的空间不足以容纳所有子元素时，子元素如何伸缩，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。
## flex-basis
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

## flex（推荐使用这个）
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
initial: 0 1 auto
auto: 1 1 auto
none: 0 0 auto

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## align-self 自身侧轴对齐
align-self属性允许单个项目有与其他项目不一样的对齐方式，可**覆盖**align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```


## order 排列顺序
order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

## 自适应练习 
【三栏布局】左右固定，中间自适应
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    div {
      display: flex;
      width: 80%;
      height: 200px;
      background-color: pink;
    }
    div span:first-child{
      width: 150px;
      background-color: skyblue;
    }
    div span:nth-child(2){
      flex: 1;
      background-color: orange;
    }
    div span:nth-child(3){
      width: 150px;
      background-color: skyblue;
    }

  </style>
</head>

<body>
  <div>
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </div>
</body>

</html>
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471488a8cea847d495b4490ebc3e45c4~tplv-k3u1fbpfcp-zoom-1.image)
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d488d2f9c4f74b2b986765df24404fb0~tplv-k3u1fbpfcp-zoom-1.image)


# 4. 实战- 静态携程网手机首页
今天主要是来一次移动端的实战内容
内容很简单，会用到很多CSS3的知识，巩固一下~


目标
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ded76ee9797443ca89c5564d1768ffeb~tplv-k3u1fbpfcp-zoom-1.image)
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05029c7699f64349b337947300c3e99e~tplv-k3u1fbpfcp-zoom-1.image)
## 4.0 起步
### 目录结构
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53fa9b83b0d343fc8510ca368b772d2e~tplv-k3u1fbpfcp-zoom-1.image)

### index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/index.css">
  <title>携程在手，说走就走</title>
</head>

<body>
  <div class="search-index">
    <div class="search"></div>
    <a href="#" class="user"></a>
  </div>
</body>

</html>
```

### index.css
```css
body {
  max-width: 540px;
  min-width: 320px;
  margin: 0 auto;
  font: normal 14px/1.5 Tahoma, "Lucida Grande", Verdana, "Microsoft Yahei",
    STXihei, hei;
  color: #000;
  background: #f2f2f2;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
```


## 4.1 顶部搜索框
### 4.1.1 目标
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59ccb0329ada445b96671cc965522aab~tplv-k3u1fbpfcp-zoom-1.image)



### 4.1.2 整体布局
顶部一个盒子，固定定位，定在顶部，然后居中对齐
中间两个盒子，左边宽度自适应，右边固定宽度


```html
<body>
  <div class="search-index">
    <div class="search"></div>
    <a href="#" class="user"></a>
  </div>
</body>
```

```css
/* 搜索模块 */
.search-index {
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  height: 44px;
  background-color: pink;
}

.search {
  flex: 1;
}

.user {
  width: 44px;
  height: 44px;
  background-color: orange;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/481f536d06fd42468bf6fe4214173ac1~tplv-k3u1fbpfcp-zoom-1.image)
### 4.1.3 填充头像区域
用伪元素将头像显示出来，头像使用的是精灵图
精灵图使用二倍图，将图片等比例缩放为原来的一半，然后测量位置

```html
<a href="#" class="user">我 的</a>
```


```css

a {
  text-decoration: none;
}

.user {
  width: 44px;
  height: 44px;
  background-color: orange;
  font-size: 12px;
  text-align: center;
  color: #2eaae0;
}

.user::before {
  content: "";
  display: block;
  width: 23px;
  height: 23px;
  /* 使用精灵图 */
  background: url(../images/sprite.png) no-repeat -59px -194px;
  /* 二倍图 */
  background-size: 104px auto;
  margin: 5px auto 0;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83acd5fa0ca74249a2ad3babfc3b5e0d~tplv-k3u1fbpfcp-zoom-1.image)
### 4.1.4 搜索框区域
将盒子改成border-box的盒模型

```css
div {
  box-sizing: border-box;
}
```

```html
<div class="search">搜索：目的地/酒店/景点/航班号</div>
```

设置搜索框的大小再加入一些阴影，文字垂直居中

```css
.search {
  position: relative;
  height: 26px;
  /* 行高不是26px而是24px因为使用的是CSS3盒模型 */
  line-height: 24px;
  border: 1px solid #ccc;
  flex: 1;
  font-size: 12px;
  color: #666;
  margin: 7px 10px;
  padding-left: 26px;
  border-radius: 5px;
  /* 设置阴影 */
  box-shadow: 0 2px 4px rgba(0, 0,0,.2);
}
```

搜索图标一样用的精灵图，采用伪元素插入到前面

```css
.search::before {
  content: "";
  /* display: block; */
  /* 改成绝对定位，不占用原来位置，不会把文字挤下去 */
  position: absolute;
  top: 5px;
  left: 5px;
  width: 15px;height: 15px;
  background: url(../images/sprite.png) no-repeat -59px -279px;
  background-size: 104px auto;
}
```

再给整个搜索模块加背景色和上下边框

```css
.search-index {
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  height: 44px;
  background-color: #F6F6F6;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
```

### 4.1.5 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72dfada06fc848b790f680829e9abe9a~tplv-k3u1fbpfcp-zoom-1.image)
## 4.2 焦点图模块
### 4.2.1 布局
```html
  <div class="focus">
    <img src="./upload/focus.jpg" alt="">
  </div>
```

上面搜索框是固定定位，不占原来的位置，要使用padding把上面的位置留出来

```css
/* focus */
.focus {
  padding-top: 26px;
}

.focus img {
  width: 100%;
}
```

### 4.2.2 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8945ad76497043caa330bb39edc0a919~tplv-k3u1fbpfcp-zoom-1.image)
## 4.3 局部导航栏
### 4.3.1 布局
使用flex
圆角矩形

```html
  <ul class="local-nav">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
```


```css
 ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.local-nav {
  display: flex;
  height: 64px;
  background: #fff;
  margin: 3px 4px;
  border-radius: 8px;
}

.local-nav li {
  flex: 1
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e74acf13a9347168e4fa02e81a612db~tplv-k3u1fbpfcp-zoom-1.image)

### 4.3.2 填充内容
使用flex的思路 竖直居中 图片在上 文字在下
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/566a149bd18d40759e9eb8f43adcecc5~tplv-k3u1fbpfcp-zoom-1.image)

```html
  <ul class="local-nav">
    <li>
      <a href="#">
        <span class="local-nav-icon"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="local-nav-icon"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="local-nav-icon"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="local-nav-icon"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="local-nav-icon"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
  </ul>
```

```css
.local-nav a {
  display: flex;
  /* 将主轴改成从上到下 */
  flex-direction: column;
  /* 侧轴居中对齐 */
  align-items: center;
  font-size: 12px;
}

.local-nav-icon {
  width: 32px;
  height: 32px;
  /* flex不会出现外边距合并问题 */
  margin-top: 8px;
  background: url(../images/localnav_bg.png) no-repeat 0 0;
  background-size: 32px auto;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c66b17365704a0eb90f13faf24f5b9a~tplv-k3u1fbpfcp-zoom-1.image)
使用CSS3的选择器，可以方便的给这五个导航设置样式

```html
  <ul class="local-nav">
    <li>
      <a href="#" title="景点·玩乐">
        <span class="local-nav-icon1"></span>
        <span>景点·玩乐</span>
      </a>
    </li>
    <li>
      <a href="#" title="周边游">
        <span class="local-nav-icon2"></span>
        <span>周边游</span>
      </a>
    </li>
    <li>
      <a href="#" title="美食林">
        <span class="local-nav-icon3"></span>
        <span>美食林</span>
      </a>
    </li>
    <li>
      <a href="#" title="一日游">
        <span class="local-nav-icon4"></span>
        <span>一日游</span>
      </a>
    </li>
    <li>
      <a href="#" title="当地攻略">
        <span class="local-nav-icon5"></span>
        <span>当地攻略</span>
      </a>
    </li>
  </ul>
```

```css
.local-nav li a [class^="local-nav-icon"] {
  width: 32px;
  height: 32px;
  background-color: orange;
  /* flex不会出现外边距合并问题 */
  margin-top: 8px;
  background: url(../images/localnav_bg.png) no-repeat 0 0;
  background-size: 32px auto;
}

.local-nav li a .local-nav-icon2 {
  background-position: 0 -32px;
}

.local-nav li a .local-nav-icon3 {
  background-position: 0 -64px;
}

.local-nav li a .local-nav-icon4 {
  background-position: 0 -96px;
}

.local-nav li a .local-nav-icon5 {
  background-position: 0 -128px;
}
```

### 4.3.3 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02b3845fd31342eda50e3f24a432b143~tplv-k3u1fbpfcp-zoom-1.image)
## 4.4 主导航栏
### 4.4.1 布局 
一个大的圆角矩形，里面套三个矩形

```html
  <nav>
    <div class="nav-common">
      <div class="nav-items">1</div>
      <div class="nav-items">2</div>
      <div class="nav-items">3</div>
    </div>
    <div class="nav-common">2</div>
    <div class="nav-common">3</div>
  </nav>
```
里面的盒子采用flex布局
中间的盒子设置 上下margin


```css
nav {
  /* 因为里面的div没有圆角，所以需要这样 */
  overflow: hidden;
  border-radius: 8px;
  margin: 0 4px 3px;
}

.nav-common {
  display: flex;
  height: 88px;
  background-color: orange;
  
}

.nav-common:nth-child(2){
  margin: 3px 0;
}

.nav-items {
  flex: 1
}

/* 表示取前两个元素 */
.nav-items:nth-child(-n+2){
  border-right: 2px solid #fff ;
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f5de297ef44dec993ed88a6b99c6cb~tplv-k3u1fbpfcp-zoom-1.image)

### 4.4.2 填充内容
左边盒子里面一个标签，中间和右边的 盒子里面都是两个标签
```html
  <nav>
    <div class="nav-common">
      <div class="nav-items">
        <a href="#">酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
    </div>
    <div class="nav-common">
      <div class="nav-items">
        <a href="#">酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
    </div>
    <div class="nav-common">
      <div class="nav-items">
        <a href="#">酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
      <div class="nav-items">
        <a href="#">海外酒店</a>
        <a href="#">特价酒店</a>
      </div>
    </div>
  </nav>
```




```css
.nav-items {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.nav-items a {
  flex: 1;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
  /* 文字阴影 */
  text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
}

.nav-items a:nth-child(1){
  border-bottom: 2px solid #fff;
}

/* 第一列的a不要下边框 */
.nav-items:nth-child(1) a {
  border: 0;
  background: url(../images/hotel.png) no-repeat bottom center;
  background-size: 121px auto;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b73c31d0c3f4f13b867c2f804240f45~tplv-k3u1fbpfcp-zoom-1.image)

### 4.4.3 背景颜色渐变
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/401dde46d8944b9e81b0e86917c84e53~tplv-k3u1fbpfcp-zoom-1.image)


```css
width: 600px;
height: 200px;
/* 背景渐变必须添加浏览器私有前缀 */
background: -webkit-linear-gradient(red, blue);

```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75453edcacd74870a5fccda880ad179b~tplv-k3u1fbpfcp-zoom-1.image)


```css
background: -webkit-linear-gradient(left, red, blue);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d7a63c3790f4ff9b486025ad5b3268a~tplv-k3u1fbpfcp-zoom-1.image)

```css
background: -webkit-linear-gradient(top left, red, blue);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb05a92b08f4d56ac87e3999f0ad509~tplv-k3u1fbpfcp-zoom-1.image)

```css
.nav-common:nth-child(1) {
  background: -webkit-linear-gradient(left, #FA5A55, #FA994D);
}

.nav-common:nth-child(2) {
  background: -webkit-linear-gradient(left, #4B90ED, #53BCED);
}

.nav-common:nth-child(3) {
  background: -webkit-linear-gradient(left, #34C2A9, #6CD559);
}
```
### 4.4.4 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af74b20773a24f89aaa1ef82ab99edf1~tplv-k3u1fbpfcp-zoom-1.image)
## 4.5 侧导航栏
### 4.5.1 布局
和之前一样，不过这个是多行的

html
```html
  <ul class="subnav-entry">
    <li>
      <a href="#">
        <span class="subnav-entry-icon1"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon2"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon3"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon4"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon5"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon6"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon7"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon8"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon9"></span>
        <span>电话费</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="subnav-entry-icon10"></span>
        <span>电话费</span>
      </a>
    </li>

  </ul>
```

css
注意flex属性不是写1，而是写百分比了

```css
.subnav-entry {
  display: flex;
  border-radius: 8px;
  background-color: #fff;
  margin: 0 4px;
  flex-wrap: wrap;
}

.subnav-entry li {
  /* 这里不能写1,要不然下不去, 可以写百分比, 占父盒子的百分之20 */
  flex: 20%;
}

.subnav-entry a {
  display: flex;
  flex-direction: column;
  align-items: center;
}

[class^="subnav-entry-icon"] {
  width: 28px;
  height: 28px;
  background-color: orange;
  margin-top: 4px;
  background: url(../images/subnav-bg.png) no-repeat;
  background-size: 28px auto;
}

.subnav-entry-icon2{
  background-position: 0 -28px;
}

.subnav-entry-icon3{
  background-position: 0 -62px;
}

.subnav-entry-icon4{
  background-position: 0 -97px;
}

.subnav-entry-icon5{
  background-position: 0 -128px;
}

.subnav-entry-icon6{
  background-position: 0 -160px;
}

.subnav-entry-icon7{
  background-position: 0 -195px;
}

.subnav-entry-icon8{
  background-position: 0 -226px;
}

.subnav-entry-icon9{
  background-position: 0 -256px;
}

.subnav-entry-icon10{
  background-position: 0 -284px;
}
```

### 4.5.2 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44778a8b11b14f9084a0fed28eb4b8e2~tplv-k3u1fbpfcp-zoom-1.image)
## 4.6 热门活动区域
### 4.6.1 热门活动
```html
<div class="sales-box">
  <div class="sales-hd">
    <h2>热门活动</h2>
    <a href="#">更多</a>
  </div>
</div>
```
有个h2标签，写文字有利于SEO，然后让文字看不见，利用伪元素插入图片
```css
.sales-box {
  border-top: 1px solid #bbb;
  background-color: #fff;
  margin: 4px;
}

.sales-hd {
  height: 44px;
  border-bottom: 1px solid #ccc;
}

.sales-hd h2 {
  position: relative;
  /* 隐藏内部问题 */
  text-indent: -999px;
  overflow: hidden
}

.sales-hd h2::after {
  position: absolute;
  top: 8px;
  left: 20px;
  content: '';
  width: 79px;
  height: 15px;
  background: url(../images/hot.png) no-repeat 0 -20px;
  background-size: 79px auto;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/959319ad833a41fc887ec47c39544af9~tplv-k3u1fbpfcp-zoom-1.image)
### 4.6.2 更多福利

```html
<div class="sales-box">
  <div class="sales-hd">
    <h2>热门活动</h2>
    <a href="#" class="more">获取更多福利</a>
  </div>
</div>
```

```css
.more {
  position: absolute;
  right: 5px;
  top: 0px;
  background: -webkit-linear-gradient(left, #ff5066, #ff6bc6);
  border-radius: 15px;
  padding: 3px 20px 3px 10px;
  color: #fff;
}


.more::after {
  content: "";
  position: absolute;
  top: 7px;
  right: 9px;
  width: 7px;
  height: 7px;
  /* 画一个三角 上右边框再旋转 */
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/919d2821ced041e88520976edb7443f9~tplv-k3u1fbpfcp-zoom-1.image)
### 4.6.3 活动详情
```html
  <div class="sales-box">
    <div class="sales-hd">
      <h2>热门活动</h2>
      <a href="#" class="more">获取更多福利</a>
    </div>
    <div class="sales-bd">
      <div class="row">
        <a href="#"><img src="./upload/pic1.jpg" alt="乡村榜"></a>
        <a href="#"><img src="./upload/pic2.jpg" alt="高铁游"></a>
      </div>
      <div class="row">
        <a href="#"><img src="./upload/pic3.jpg" alt="定制游"></a>
        <a href="#"><img src="./upload/pic4.jpg" alt="领券中心"></a>
      </div>
      <div class="row">
        <a href="#"><img src="./upload/pic5.jpg" alt="会员福利"></a>
        <a href="#"><img src="./upload/pic6.jpg" alt="优品商城"></a>
      </div>
    </div>
```

```css
.row{
  display: flex;
}

.row a {
  flex: 1;
  border-bottom: 1px solid #eee;
}

.row a:nth-child(1) {
  border-right: 1px solid #eee;
}

.row a img {
  width: 100%;
}
```
### 4.6.4 效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4611bbccb4904d2ea2cd03c97a9d8616~tplv-k3u1fbpfcp-zoom-1.image)



