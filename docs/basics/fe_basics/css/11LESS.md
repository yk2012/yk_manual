
# 1. less是什么？
[官方中文网址](https://less.bootcss.com/)     https://less.bootcss.com/

> Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言

## 1.1 CSS的一些问题
1. 老的语法不好用，不够简洁
2. CSS3的新特性兼容性不行，很多浏览器不支持

## 1.2 less的作用
- 语法更好用更简洁，还有很多好用的功能：变量、mixins、嵌套等，后面的基本使用会详细介绍
不用担心兼容性的问题
## 1.3 vscode好用的less插件
- 浏览器还是不认识less的，所以less文件需要编译成css文件使用
***easy less***
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210123165613422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)
插件可以自动地将less文件编译成css文件

# 2. less 的(最)基本使用
## 2.1 注释
单行注释
```css
// less中的单行注释， 内容不会被解析到CSS文件中
```
多行注释
```css
/*
css中的多行注释，内容会被解析到css文件中
*/ 
```
## 2.2 变量
在变量中可以存储一个任意的值，并且可以在需要时，任意的修改变量中的值
### 2.2.1 变量的语法
一般只定义属性值  使用@xxx声明和@xxx使用变量
还可以作为 选择器、属性名、URL，使用@xxx声明 ，@{ xxx }使用

```css
// 变量的定义
@a: 100px;  // 属性值 
@b: #bfa;  // 
@c: box;   // 选择器
@w: width; // 属性

.@{c} { // 变量作为类名，或者一部分值使用  作为选择器名 @{变量名}
	@{w}: @a; // 变量的直接使用   @变量名
	color: @b; 
}
```

编译后

```css
.box { 
	width: 100px; 
	color: #bfa; 
}
```

### 2.2.2 几个注意点
1. 变量重名，就近原则
2. 可以在变量声明前就使用变量（延迟加载）

### 2.2.3 引用其他属性的值  $
```css
div {
	color: #bfa;
	background-color: $color;
}
```
## 2.3 & 表示外层父元素
嵌套
```css
div {
	color: deeppink;
	.box {
		color: #bfa;
	}
	&:hover{   /* 代表的是 div:hover 没有&的话中间有空格*/
		color: pink;
	}
}
```

## 2.4 extend 扩展
`:extend()` 对当前选择器扩展指定选择器的样式（选择器分组）
```css
.p1 {
	width: 100px;
	height: 100px;
}

.p2:extend(.p1) {
	color: red;
}
```
相当于

```css
.p1,
.p2 {
	width: 100px;
	height: 100px;
}

.p2 {
	color: red;
}
```

## 2.5 mixin混合（有点像函数）
### 复制样式
直接对指定的样式进行引用，复制
```css
.p1 {
	width: 100px;
	height: 100px;
}

.p2 {
	.p1(); /*这里相当于将p1的样式在这里进行了复制*/
}
```

使用类选择器时，可以在选择器后面添加一个括号，这时我们实际上就创建了一个minins，编译成css就没有了，专门给别的类用的
```css
.p1() { /*编译成css文件看不到这个类的样式定义*/
	width: 100px;
	height: 100px;
}

.p2 {
	.p1(); /*这里相当于将p1的样式在这里进行了复制, 后面有没有括号都行*/
}
```

### 作为函数可以传参数
```css
.test(@w, @h, @bg-color) {
	width: @w;
	height: @h;
	border: 1px solid @bg-color;
}

div {
	.test(200px, 300px, #bfa); 
}
```
- 有很多传统编程语言的函数的一些特性
1. 声明的时候可以直接设置默认值
2. 可以不按顺序，调用的时候就写上变量名就行了

### 内置的mixins函数
average()
darken()
等等等


## 2.6 可计算
在less中所有的数值都可以直接运算

```css
.p2 {
	width: 100px*2;
	height: 100px + 50px;
}
```
## 2.7 import
import 用来将其他less引入到当前less

```css
@import "demo.less"; 
```
这样可以实现模块化编程

## 2.8 调试 
在浏览器调试的时候，只能对CSS进行调试，可以设置对less进行调试
配置vscode插件 easy less
1. 打开easy less 介绍界面 找到下图代码复制
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210123205322345.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)

```json
"less.compile": {
	"compress":  true,  // true => remove surplus whitespace
	"sourceMap": true,  // true => generate source maps (.css.map files)
	"out":       false, // false => DON'T output .css files (overridable per-file, see below)
}
```
2. 进入vscode设置界面，进行设置，如图所示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210123205900563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)
3. 粘贴复制的代码至末尾
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210123210056879.png#pic_center)
4. 进行设置

```json
"less.compile": {
    "compress":  true,  // 压缩
    "sourceMap": true,  // 生成源码映射
    "out":       true,  // 生成CSS文件
}
```

这样在浏览器调试CSS时，可以看到对应的less代码的位置

