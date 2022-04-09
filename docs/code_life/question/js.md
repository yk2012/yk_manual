
![在这里插入图片描述](https://img-blog.csdnimg.cn/9dea9d22d0f2420384ecf3a7ca4bd785.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)



之前也总结过一些前端面试题，推荐可以一起看看

[【网络】计算机网络常见面试题 - 前端面试必备 - 吐血整理](https://blog.csdn.net/weixin_44972008/article/details/116524856)

[【CSS】面试题总结 - 基础知识总结 - 复习专用 - 前端面试必备 - 吐血整理](https://blog.csdn.net/weixin_44972008/article/details/116734993)

[【Vue】面试题总结 - 基础知识总结 - 复习专用 - 组件相关 - Vue家族 - 源码相关](https://blog.csdn.net/weixin_44972008/article/details/116934802)


> 这次是关于JavaScript的面试题有题目也有答案，想深入了解，可以看我之前的一些笔记博文（狠详细）。当然，每题有相关博文的我都会放链接~

> 持续更新中...


## 1. 变量声明与类型

### 1.1 var let const 区别
1. var是ES5语法，let、const是ES6的语法
2. var有变量提升
3. var、let是变量，可修改；const是常量，不可修改
4. let、const 块级作用域；var函数作用域

![在这里插入图片描述](https://img-blog.csdnimg.cn/59db5c8ee46748eeaed78b89683da38b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
[【ES6】变量声明-var-let-const-区别与联系-总结](https://blog.csdn.net/weixin_44972008/article/details/112340914)

### 1.2 数据类型
值类型（7个）：Undefined、Null、Number、String、Boolean、Symbol(ES6)、BigInt(ES10)
引用类型：Object：Array、Function

[【JS】JavaScript-ES5数据类型-基本数据类型-引用数据类型-类型之间的转换-数据类型的判断](https://blog.csdn.net/weixin_44972008/article/details/111460647)


### 1.3 值类型与引用类型的区别

值类型  存在**栈**内存中，变量拿到的就是它的值 
引用类型 存在**堆**内存中，变量拿到的只是它的一个引用，是它的地址

[【JS】JavaScript-对象-Object-内建对象-宿主对象-自定义对象-操作对象-基本数据类型与引用数据类型区别](https://blog.csdn.net/weixin_44972008/article/details/111592531)

### 1.4 typeof 能判断哪些类型
1. undefined、string、number、boolean、symbol、bigint【除了null的基本类型】
2. function 【函数】
3. object (typeof null === 'object') 【所有引用类型只能到object这里】

### 1.5 判断数据类型的方式
1. typeof 【除了null的基本类型 + function】
2. instanceof 【引用类型】【从子类到父类直到object】【顺着原型链】
3. toString() 【任意类型】
4. Array.isArray() 【数组】


### 1.6 `===` 与 `==`
`===` 严格的比较是否相等

`==` 会进行类型转换，再进行比较

以下都是成立的
```javascript
100 == '100'
0 == ''
0 == false
fase == ''
null == undefined
```
有一个情况可以用下 `==`
```javascript
if(a == null) {}
// 等价于
if(a === null || a === undefined)()
```

### 1.7 truly变量与falsely变量
truly变量：`!!a === true` 的变量
falsely变量：`!!b === false` 的变量

以下是falsey变量，除了这六种情况，其余都是truely变量
```javascript
!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === false
!!false === false
```


### 1.8 强制类型转换和隐式类型转换
强制：`parseInt`、`parseFloat`、`toString`
隐式：`if`、逻辑运算、`==`、`+`拼接字符串



一定要看这个，狠详细
[【JS】JavaScript-ES5数据类型-基本数据类型-引用数据类型-类型之间的转换-数据类型的判断](https://blog.csdn.net/weixin_44972008/article/details/111460647)

### 1.9 语句与表达式
表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

```javascript
a
a+b
demo(1)
x===y? 'a': 'b'
```

语句

```javascript
if(){}
for(){}
```


## 2. 数组字符串相关


### 2.1 手写深拷贝

```javascript
function deepClone(obj){
	if (typeof obj !== 'object' || obj === null){
		return obj
	}
	let result = Array.isArray(obj) ? []: {}
	for (let key in obj) {
		if(obj.hasOwnProperty(key)) {
			result[key] = deepClone(obj[key])
		}
	}
	return result
}
```

[【JS】自定义JS工具函数库-自定义对象方法-new-instanceof-mergeObject-实现数组与对象的深拷贝与浅拷贝-封装字符串相关函数](https://blog.csdn.net/weixin_44972008/article/details/116092535)


### 2.2 手写深度比较
```javascript
// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === object && obj !== null;
}

// 深度比较
function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型，直接判断【一般不会传函数，不考虑函数】
    return obj1 === obj2;
  }
  if (obj1 === obj2) {
    return true;
  }
  // 两个都是对象或数组，而且不相等
  // 1. 先判断键的个数是否相等，不相等一定返回false
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Objext.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  // 2. 以obj1为基准，和obj2依次递归比较
  for (let key in obj1) {
    // 递归比较
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  // 3. 全相等
  return true;
}
```


### 2.3 数组的API有哪些是纯函数
纯函数：①不改变原数组(没有副作用)  ②返回一个新数组
concat、map、filter、slice

非纯函数：push、pop、shift、unshift、forEach、some、every、reduce

[【JS】你不得不知道的JavaScript数组相关知识【全面总结】复习专用](https://blog.csdn.net/weixin_44972008/article/details/118050919)

### 2.4 `split()`和`join()`的区别
`split()` 是字符串的方法
`join()` 是数组的方法
```javascript
'1-2-3'.split('-') // [1,2,3]
[1,2,3].join('-') // 1-2-3
```

### 2.5 数组`slice`与`splice`区别

slice 切片 
splice 剪接 

[【JS】JavaScript数组-操作方法-concat-数组强制打平-slice-splice方法使用](https://blog.csdn.net/weixin_44972008/article/details/113093122)


### 2.6 手写字符串 trim
```javascript
String.prototype.trim = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
```
## 3. 函数相关

### 3.1 函数声明与函数表达式
函数声明式

```javascript
function fn(a, b) {
  return a + b;
}
```

函数表达式

```javascript
let fun = function(a, b){
  return a + b;
}
```


### 3.2 什么是JSON
- JSON是一种数据格式，本质是一段字符串
- JSON格式与JS对象结构一致，对JS语言更友好
- `window.JSON`是一个全局对象，常用的两个方法 `JSON.stringify` 和`JSON.parse`

### 3.3 将URL参数解析成JS对象

传统方法，分析search
```javascript
function queryToObj() {
	const res = {}
	const search = location.search.substr(1)
	search.split('&').forEach(paramStr => {
		const arr = paramStr.split('=')
		const key = arr[0]
		const val = arr[1]
		res[key] = val
	})
	return res
}
```
使用URLSearchParams

```javascript
function queryToObj() {
	const res = {}
	const pList = new URLSearchParams(location.search)
	pList.forEach((val, key) => {
		res[key] = val
	})
	return res
}
```



## 4. 原型与原型链
### 4.1 解释一下原型与原型链
 每个函数对象都有显式原型 ``prototype``
 每个实例对象都有隐式原型 ``__proto__``
 实例对象的`__proto__`指向函数对象的`prototype`

![在这里插入图片描述](https://img-blog.csdnimg.cn/3277ac902bca42dc9cf2a69bdc211ca0.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
（之前博文中的图）


原型链：实例对象在获取对象上的属性和方法时，先在自身找，找不到就去隐式原型上面找

![在这里插入图片描述](https://img-blog.csdnimg.cn/a4c32d27c575477f87b85f5863baae0c.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
（之前博文中的图）


### 4.2 class的原型本质
class是ES6语法规范，由ECMA委员会发布【构造函数、继承】
ECMA只规定语法规则，不规定如何实现

下面博文具体介绍了class语法，以及具体的原生实现【构造函数、继承】

[【ES6】JavaScript面向对象-面向对象与面向过程的对比-类class-继承extends-构造函数-super](https://blog.csdn.net/weixin_44972008/article/details/112367802)

[【JS】JavaScript创建对象 - 工厂模式 - 构造函数模式 - 原型模式 - 原型链 - 组合模式](https://blog.csdn.net/weixin_44972008/article/details/117223648)

[【JS】JavaScript继承 - 原型链 - 盗用构造函数 - 组合继承 -原型式继承 - 寄生式继承 - 寄生式组合继承](https://blog.csdn.net/weixin_44972008/article/details/117225958)




### 4.3 new Object() 与 Object.create()的区别
- `{}` 等同于 `new Object()`，原型为`Object.prototype`
- `Object.create(null)` 没有原型
- `Object.create({...})` 可以指定原型


### 4.4 用class语法写一个简单的jQuery

```javascript
class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }

  get(index) {
    return this[index];
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }
  
  on(type, fn) {
    return this.each((elem) => {
      elem.addEventListener(type, fn, false);
    });
  }
}

// 插件
jQuery.prototype.dialog = function(info){
	console.log(info);
}

// 拓展性
class myjQuery extends jQuery{
	constructor(selector){
		super(selector)
	}
	// 扩展自己的方法
	addClass(className){}
	addStyle(data){}
}
```



## 5. 作用域与闭包
这篇博文写的很详细，推荐阅读
[【JS】你不知道的JavaScript 笔记（一）—— 作用域与闭包 - 编译原理 - LHS - RHS - 循环与闭包 - 模块 - 词法作用域 - 动态作用域](https://blog.csdn.net/weixin_44972008/article/details/118543521)

[【JS】函数定义与调用方式-函数this指向问题-call-apply-bind方法使用与自定义](https://blog.csdn.net/weixin_44972008/article/details/115955430)

[【JS】你不知道的JavaScript笔记（二）- this - 四种绑定规则 - 绑定优先级 - 绑定例外 - 箭头函数](https://blog.csdn.net/weixin_44972008/article/details/118607326)

### 5.1 作用域
一个变量合法的使用范围，JS中采用的是**词法作用域**（静态作用域）
【变量的查找，取决于在哪里定义，而不是在哪里执行】

全局作用域 - 函数作用域 - 块级作用域

**自由变量**：一个变量在当前作用域没有定义，但是被使用了。这时就向上级作用域一层一层依次查找，直到找到为止，最后在全局作用域都没找到就报错 `ReferenceError：xxx is not defiend`


### 5.2 this不同场景下如何取值
this查找采用的是**动态作用域**
【this的指向，取决于在哪里执行，而不是在哪里定义】

例题
```javascript
const User = {
	count: 1,
	getCount: function() {
		return this.count
	}
}
console.log(User.getCount()) // 1
const func = User.getCount
console.log( func() ) // undefined
```

[【JS】你不知道的JavaScript笔记（二）- this - 四种绑定规则 - 绑定优先级 - 绑定例外 - 箭头函数](https://blog.csdn.net/weixin_44972008/article/details/118607326)

### 5.3 手写bind
[【JS】函数定义与调用方式-函数this指向问题-call-apply-bind方法使用与自定义](https://blog.csdn.net/weixin_44972008/article/details/115955430)


```javascript
Function.prototype.myBind = function() {
	// 将参数拆解为数组
	const args = Array.prototype.slice.call(arguments)  
	// 获取this
	const t = args.shift()
	// fn1.bind(...)中的 fn1
	const self = this
	return function() {
		return self.apply(t, args)
	}
}
```
使用

```javascript
function fn1(a, b, c) {
	console.log('this', this)
	console.log(a, b, c)
	return 'this is fn1'
}
const fn2 = fn1.myBind({x: 100}, 10, 20, 30)
const result = fn2() 
console.log(result)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/843996d5c47b47559561a51607376811.png)


### 5.4 闭包
当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了**闭包**

① 函数作为参数被传递 ② 函数作为返回值被返回

[【JS】你不知道的JavaScript 笔记（一）—— 作用域与闭包 - 编译原理 - LHS - RHS - 循环与闭包 - 模块 - 词法作用域 - 动态作用域](https://blog.csdn.net/weixin_44972008/article/details/118543521)

### 5.5 闭包的应用场景
隐藏数据，只提供API

```javascript
function createCache() {
	const data = {}  // 闭包中的数据被隐藏，不被外界访问
	return {
		set: function(key, value) {
			data[key] = value
		},
		get: function(key){
			return data[key]
		}
	}
}

const cache = createCache()
c.set('a', 100)
console.log(c.get('a'))
```


## 6. ES6新特性

[【ES6】变量声明-var-let-const-区别与联系-总结](https://blog.csdn.net/weixin_44972008/article/details/112340914)

[【ES6】Symbol基本使用及常用内置符号](https://blog.csdn.net/weixin_44972008/article/details/115280565)

[【ES6】JavaScript函数-箭头函数-this指向-简写](https://blog.csdn.net/weixin_44972008/article/details/112929712)

[【ES6】JavaScript-变量的解构赋值-数组解构-对象解构-对象的属性-对象的方法](https://blog.csdn.net/weixin_44972008/article/details/112795786)

[【ES6】JavaScript对象-增强的对象语法-属性值简写-可计算属性-简写方法名](https://blog.csdn.net/weixin_44972008/article/details/112910925)

[【ES6】JavaScript函数-参数的默认值-与解构赋值的结合使用-对arguments的影响-默认参数作用域与暂时性死区](https://blog.csdn.net/weixin_44972008/article/details/112950370)

[【ES6】JavaScript数组-数组的创建-构造函数-字面量-Array.from()-Array.of()静态方法](https://blog.csdn.net/weixin_44972008/article/details/113105956)

[【ES6】JavaScript数组-迭代器方法-keys()-values()-entries()-迭代方法-every()-some()-filter()-map()-forEach()](https://blog.csdn.net/weixin_44972008/article/details/113574651)

[【ES6】JavaScript面向对象-面向对象与面向过程的对比-类class-继承extends-构造函数-super](https://blog.csdn.net/weixin_44972008/article/details/112367802)

[【ES6】迭代器与生成器](https://blog.csdn.net/weixin_44972008/article/details/115280516)

[【Promise】入门-同步回调-异步回调-JS中的异常error处理-Promis的理解和使用-基本使用-链式调用-七个关键问题](https://blog.csdn.net/weixin_44972008/article/details/113779708)

[【ES8】异步代码终极解决方案 async 和 await](https://blog.csdn.net/weixin_44972008/article/details/114262960)

[【ES6模块化】import - export - 按需引入 - 项目中使用babel - ES6模块化引入npm包](https://blog.csdn.net/weixin_44972008/article/details/114282782)

## 7. 异步相关

因为单线程，所以异步【同步会阻塞代码执行】

JS单线程， 和DOM渲染共用一个线程【因为JS可以修改DOM结构】
浏览器和node.js已经支持JavaScript启动进程，如 Web Worker


### 7.1 同步与异步的区别
[【JavaScript】同步与异步-异步与并行-异步运行机制-为什么要异步编程-异步与回调-回调地狱-JavaScript中的异步操作](https://blog.csdn.net/weixin_44972008/article/details/114380206)


### 7.2 前端使用异步的场景
网络请求，如ajax
定时任务


### 7.3 Promise的三种状态

1. pending 等待中  不会触发`then`和`catch`
2. resolved 成功了  会触发后续的`then`回调函数
3. rejected 失败了  会触发后续的`catch`回调函数

`then`正常返回 resolved，里面有报错则返回 rejected
`catch`正常返回 resolved，里面有报错则返回 rejected

[【Promise】入门-同步回调-异步回调-JS中的异常error处理-Promis的理解和使用-基本使用-链式调用-七个关键问题](https://blog.csdn.net/weixin_44972008/article/details/113779708)


### 7.4 promise的then和catch

```javascript
Promise.resolve().then(()=>{
	console.log(1) // 执行
}).catch(()=>{
	console.log(2) // 不执行
}).then(()=>{
	console.log(3) // 执行
})
```

```javascript
Promise.resolve().then(()=>{
	console.log(1) // 执行
	throw new Error('err1')
}).catch(()=>{
	console.log(2) // 执行
}).then(()=>{
	console.log(3) // 执行
})
```


```javascript
Promise.resolve().then(()=>{
	console.log(1) // 执行
	throw new Error('err1')
}).catch(()=>{
	console.log(2) // 执行
}).catch(()=>{
	console.log(3) // 不执行
})
```

### 7.5 手写promise加载图片

```javascript
function loadImg(src){
	return new Promise((resolve, reject)=>{
		const img = document.createElement('img')
		img.onload = () =>{
			resolve(img)
		}
		img.onerror = () => {
			reject(new Error(`图片加载失败 ${src}`))
		}
		img.src = src
	})
}

// 使用
const url = ''
loadImg(url).then(img => {
	console.log(img.width)
	return img
}).then(img => {
	console.log(img.height)
}.catch(err => console.error(err))

// 使用加载多张图片
url1 = ''
url2 = ''
loadImg(url1).then(img1 => {
	console.log(img1.width)
	return img1
}).then(img1 => {
	console.log(img1.height)
	return loadImg(url2)	
}).then(img2 => {
	console.log(img2.width)
	return img2
}).then(img2 => {
	console.log(img2.height)
}).catch(err => console.error(err))
```



### 7.6 async/await与Promise
1. 执行`async`函数，返回的是Promise对象
2. `await`相当于Promise的`then`
3. `try/catch`可以捕获异常，代替了Promise的`catch`

[【ES8】异步代码终极解决方案 async 和 await](https://blog.csdn.net/weixin_44972008/article/details/114262960)

### 7.7 字节面试看代码题
```javascript
async function async1() { // 函数定义
  console.log("async1 start"); // 2
  await async2(); // 函数执行
  // await后面的内容，可以看作是回调里的内容，即异步执行
  console.log("async1 end"); // 6
}

async function async2() { // 函数定义
  console.log("async2"); // 3
}

console.log("script start"); // 1
async1(); // 函数执行

new Promise((resolve)=>{
	console.log('promise1'); // 4
	resolve();
}).then(()=>{
	console.log('promise2'); // 7
})

console.log("script end"); // 5 同步代码执行完毕
```

### 7.8 for-of 的应用场景  【异步】
for、forEach、for-in 是常规的【同步】遍历
for-of常用于【异步】的遍历

```javascript
function muti(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

const nums = [1, 2, 3];

nums.forEach(async (i) => {
  const res = await muti(i);
  console.log(res); // 会同时打印出三个结果
});

(async function () {
  for (let i of nums) {
    const res = await muti(i);
    console.log(res); // 会每隔一秒打印出一个结果
  }
})();
```

## 8. Event Loop
### 8.1 宏任务macroTask与微任务microTask
- 宏任务：setTimeout、setInterval、Ajax、DOM事件【W3C规范】
- 微任务：Promise、async/await【ES规范】

微任务执行时机比宏任务早

<hr>

- 微任务在DOM渲染**前**触发 【Promise】
- 宏任务在DOM渲染**后**触发 【setTimeout】


### 8.2 Event Loop机制

- 回调栈 Call Stack 
- 事件循环 event loop
- 回调队列 Callback Queue
- 微任务队列 micro task queue
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210709215035349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70 =400x)

1. 同步代码，一行一行放在回调栈中执行，执行完了就出栈
2. 遇到异步，记录下来，等待时机；时机到了，就移动到回调队列中
3. 当回调栈为空，（微任务[微任务队列]）【尝试DOM渲染】 事件循环开始工作：轮询查找（宏任务）回调队列，有则移动到回调栈中执行
4. 继续轮询loop

【同步任务——微任务——DOM渲染——宏任务】——同步任务——微任务——DOM渲染——宏任务......

<hr>

实际上真正的 event loop 是这样的
1. 一开始整个脚本作为一个**宏任务**执行
2. 执行过程中**同步代码**直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查**微任务**列表，有则依次执行，直到全部执行完
4. 执行浏览器UI线程的渲染工作
5. 检查是否有Web Worker任务，有则执行
6. 执行完本轮的**宏任务**，回到2，依此循环，直到宏任务和微任务队列都为空

所以过程是 

【宏任务（代码整体）——同步任务——微任务——DOM渲染】——宏任务——同步任务——微任务——DOM渲染......


### 8.3 event loop练习

```javascript
console.log('1'); // ①同步任务 

setTimeout(function() { // ① 宏任务
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

process.nextTick(function() { // ① 微任务
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7'); // ① 同步任务 
    resolve();
}).then(function() { // ① 微任务
    console.log('8')
})

setTimeout(function() { // ① 宏任务
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
    
    console.log('13');
    
    process.nextTick(function() {
        console.log('14'); // 微任务 process.nextTick 比 promse.then优先级要高
    })
})
```
1 7 6 8 2 4 3 5 9 11 13 10 14 12


## 9. DOM
### 9.1 获取节点操作

```javascript
document.getElementById('yk') // 元素
document.getElementsByTagName('div') // 集合

document.getElementsByClassName('container') // 集合
document.querySelectorAll('p') // 集合
```


### 9.2 标签属性 attribute
修改的是标签属性【内联样式】
修改html属性，会改变html结构
```javascript
const pList = document.querySelectorAll('p')
const p = pList[0]

p.getAttribute('data-name')
p.setAttribute('data-name','ykjun')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 10px')
```


### 9.3 对象属性 property
用JS的属性操作DOM元素
修改对象属性，不会 体现到html结构中
```javascript
const pList = document.querySelectorAll('p')
const p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' // 修改样式

console.log(p.className) // 获取class
p.className = 'p1' // 修改class

console.log(p.nodeName) // 获取nodeName节点名称
console.log(p.nodeType) // 获取nodeType节点类型
```


### 9.4 DOM结构操作

```javascript
const div1 = document.getElementById('div1')
const div2 = document.getElementById('div2')

// 新建节点
const newP = document.createElement('p')
newP.innerHTML = 'this is new p'

// 插入节点
div1.appendChild(newP)

// 移动节点
const p1 = document.getElementsByTagName('p')[0]
div2.appendChild(p1)

// 获取父元素
console.log(p1.parentNode)

// 获取子元素列表
const div1ChildNodes = div1.childNodes
console.log('div1ChildNodes', div1ChildNodes)

const div1ChildNodesP = Array.from(div1ChildNodes).filter(child => {
	if(child.nodeType === 1) {
		return true;
	}
	return false;
}
console.log('div1ChildNodesP', div1ChildNodesP)

// 删除节点
div1.removeChild(div1ChildNodesP[0])
```
### 9.5 优化DOM性能
#### 9.5.1 对DOM查询进行缓存

不使用缓存DOM查询结果
```javascript
for(let i = 0; i < document.getELementsByTagName('p').length; i++){
	//	每次循环都会计算length，频繁进行DOM查询
}
```

缓存DOM查询结果
```javascript
const pList = document.getELementsByTagName('p')
const length = pList.length
for(let i = 0; i < length; i++){
	// 缓存length， 只进行一次DOM查询
}
```

#### 9.5.2 将频繁操作改为一次性操作

```javascript
const listNode = document.getElementById('list')
// 创建一个文档片段，此时还没有插入到DOM树中
const frag = document.createDocumentFragment()
// 执行插入操作
for(let i = 0; i < 10; i++){
	const li = document.createElement('li')
	li.innerHTML = "Iist Item " + i
	frag.appendChild(li)
}
// 都完成后，再插入DOM树中
listNode.appendChild(frag)
```

## 10. BOM
- navigator
- screen
- location
- history

[【BOM】JavaScript-定时器-执行机制-location-navigator-history](https://blog.csdn.net/weixin_44972008/article/details/112258690)
### 10.1 检查浏览器类型
```javascript
const ua = navigator.userAgent
const isChorme = ua.indexOf('Chrome')
console.log(isChorme)
```

### 10.2 拆解URL各个部分
location
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210710100415245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
## 11. 事件
[【DOM】JavaScript-事件高级-注册事件-事件流-事件对象-事件冒泡-委派-鼠标键盘事件](https://blog.csdn.net/weixin_44972008/article/details/112212622)

### 11.1 事件绑定、冒泡、代理

```javascript
const btn = document.getElementById('btn1')
btn.addEventListener('click', event => {
	console.log('clicked')
})
```



### 11.2 写一个通用的事件绑定函数

```javascript
function bindEvent(elem, type, fn){
	elem.addEventListener(type, fn)
}

const btn1 = document.getELementById('btn1')
bindEvent(btn1,  'click', event => {
	console.log(event.target) // 获取触发的元素
	event.preventDefault() // 阻止默认行为
	alert('clicked')
})
```

升级版【支持代理】
```javascript
function bindEvent(elem, type, selector, fn){
	if(fn == null){
		fn = selector
		selector = null
	}
	elem.addEventListener(type, event => {
		if(selector){
			// 代理绑定 
			if (target.matches(selector)){
				fn.call(target, event)
			}
		}else {
			// 普通绑定
			fn.call(target, event)
		}
	})
}


// 普通绑定
const btn1 = document.getELementById('btn1')
bindEvent(btn1, 'click', function(event) {
	console.log(event.target) // 获取触发的元素
	event.preventDefault() // 阻止默认行为
	alert(this.innerHTML)
})

// 代理绑定 [在a父节点div上绑定事件]
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', 'a', function(event) {
	event.preventDefault()
	alert(this.innerHTML)
})
```

###  11.3 描述事件冒泡过程
- 基于DOM树形结构
- 事件会顺着触发元素往上冒泡
- 应用场景：事件代理

###  11.4 无限下拉的图片列表，如何监听每个图片的点击
- 事件代理
- 用`event.target`获取触发元素
- 用`matches`来判断是否是触发元素
 



## 12. AJAX
[【Ajax】HTTP相关问题-GET-POST-XHR使用-jQuery中的ajax-跨域-同源-jsonp-cors](https://blog.csdn.net/weixin_44972008/article/details/113772348#comments_17323096)

[【axios】使用json-server 搭建REST API - 使用axios - 自定义axios - 取消请求 - 拦截器](https://blog.csdn.net/weixin_44972008/article/details/114368528)

### 12.1 手写一个简单的ajax
```javascript
function ajax(url) {
	const p = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					resolve(
						JSON.parse(xhr.responseText)
					)
				} else if (xhr.status === 404) {
					reject(new Error('404 not found'))
				}
			}
		}
		xhr.send(null)
	})
	return p
}

// 使用
const url = '/data/test.json'
ajax(url)
.then(res => console.log(res))
.catch(err => console.log(err))
```

### 12.2 跨域解决方案

浏览器中加载图片、css、js可以无视同源策略
- `<img />` 可用于统计打点，可使用第三方服务
- `<link />` `<script>` 可以使用CDN
- `<script>` 可以实现JSONP

所有跨域，都必须经过server端允许和配合
未经server允许就实现跨域，说明浏览器有漏洞

- JSONP
- CORS
- 代理

[【Ajax】HTTP相关问题-GET-POST-XHR使用-jQuery中的ajax-跨域-同源-jsonp-cors](https://blog.csdn.net/weixin_44972008/article/details/113772348#comments_17323096)

## 13. 浏览器存储
[【浏览器】浏览器存储&缓存 - Cookie - localStorage - sessionStorage - IndexDB - Cache Storage - Application Cache](https://blog.csdn.net/weixin_44972008/article/details/118103017)

cookie 
- 本身用于浏览器和服务器通讯
- 存储大小最大4KB
- http请求时需要发送到服务端，增加请求数据量
- 是能用`document.cookie='...'`来修改，太过简陋

localStorage 和 sessionStorage
- HTML5专门为存储设计，最大可存5M
- API简单易用 `setItem` `getItem`
- 不会随着HTTP请求被发出去


## 14. 页面加载
### 14.1 资源的形式
- HTML代码
- 媒体文件，如图片、视频
- JavaScript代码 css代码


### 14.2 从输入url到渲染出页面的整个过程
① 获取资源
DNS域名解析：域名——> IP地址
TCP三次握手建立连接
浏览器根据IP地址向服务器发起HTTP请求
服务器处理HTTP请求，并资源返回给浏览器

② 渲染页面
浏览器根据HTML代码生成DOM Tree
根据CSS代码生成 CSSOM
将DOM Tree 和 CSSOM 整合成 渲染树 Render Tree
根据Render Tree 渲染页面
遇到 scrpit 标签 则暂停渲染，优先加载并执行JS代码，完成再继续
直至把Render Tree 渲染完成


### 14.3 window.onload与DOMContentLoaded的区别
`window.onload`  资源全部加载完成才能执行，包括图片
`DOMContentLoaded`  DOM渲染完成即可，图片可能尚未下载

```javascript
const img1 = document.getElementById('img1')
img1.onload = function() {
	console.log('img loaded') // 2 
}
window.addEventListener('load', function() {
	console.log('window loaded') // 3
})
document.addEventListener('DOMContentLoaded', function() {
	console.log('dom content loaded') // 1
})

```

### 14.4 重绘与回流

![在这里插入图片描述](https://img-blog.csdnimg.cn/6c652a65076f48388b2d0f3b1efd6701.png)

重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。

回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）

## 15. 性能优化

### 15.1 前端常见性能优化方案
1. 思路
- 多使用内存、缓存或其他方法
- 减少CPU计算量，减少网络加载耗时
- 空间换时间

2. 加载优化
- 减少资源体积：压缩代码
- 减少访问次数：合并代码，SSR服务端渲染、缓存
- 使用更快的网络：CDN

3. 渲染优化
- CSS放在head，JS放在body最下面
- 尽早开始执行JS，用DOMContentLoaded触发
- 懒加载
- 对DOM查询进行缓存
- 频繁DOM操作，合并到一起插入DOM结构
- 节流与防抖

### 15.2 缓存
静态资源加hash后缀，根据文件内容计算hash
文件内容不变，则hash不变，则url不变
url和文件不变，就会自动触发HTTP缓存机制，返回304

网络方面的缓存分为三块：DNS缓存、HTTP缓存、CDN缓存， HTTP 缓存也称为浏览器缓存

[(建议收藏)为什么第二次打开页面快？五步吃透前端缓存，让页面飞起](https://juejin.cn/post/6993358764481085453)

### 15.3 SSR服务渲染
将网页和数据一起加载，一起渲染
非SSR（前后端分离）：先加载网页，再加载数据(ajax)，再渲染数据

### 15.4 图片懒加载

先给一个小的预览图，判断到用户访问到当前位置，再加载高清
```html
<img id="img1" src="preview.png" data-realsrc="real.png" />
<script>
	let img1 = document.getElementById('img1')
	img1.src = img1.getAttribute('data-realsrc')
<script>
```

### 15.5 节流与防抖

[【JS】函数节流与函数防抖-自定义JS工具类](https://blog.csdn.net/weixin_44972008/article/details/115969534)




## 16. 前端安全

### 16.1 XSS 跨站请求攻击




[前端安全系列（一）：如何防止XSS攻击？](https://juejin.cn/post/6844903685122703367)

### 16.2 XSRF 跨站请求伪造

[前端安全系列之二：如何防止CSRF攻击？](https://juejin.cn/post/6844903689702866952)

## 17. 算法刷题 

[【算法】经典排序算法总结-JavaScript描述-图解-复杂度分析](https://blog.csdn.net/weixin_44972008/article/details/115670939)

[【LeetCode】经典题分类（数学 - 数组 - 字符串）精选 - JavaScript - ES6 - 技巧总结](https://blog.csdn.net/weixin_44972008/article/details/117390861)

[【LeetCode】经典题分类（链表 ）精选 - JavaScript - ES6 - 技巧总结](https://blog.csdn.net/weixin_44972008/article/details/117857353)

[【LeetCode】经典题分类（树&图 ）精选 - JavaScript - ES6 - 技巧总结](https://blog.csdn.net/weixin_44972008/article/details/119191683)
