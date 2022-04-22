@[toc]

# 1. 函数定义的几种方式
## 1.1 函数声明式

```javascript
function fn(a, b) {
  return a + b;
}
```
## 1.2 函数表达式

```javascript
let fun = function(a, b){
  return a + b;
}
```
## 1.3 构造函数式

```javascript
let fun = new Function('a', 'b', 'return a + b')
```

## 1.4 箭头函数
```javascript
let fn = (a, b) => {
	return a + b;
};
```
关于箭头函数的更多内容，[请见【ES6】JavaScript函数-箭头函数-this指向-简写](https://blog.csdn.net/weixin_44972008/article/details/112929712)

## 1.5 注意点
所有函数都是 `Function` 的实例对象， 属于对象 `instanceof Object` 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421151740152.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
# 2. 函数调用的几种方式
## 2.1 普通函数

```javascript
fun()
fun.call()
```

## 2.2 对象的方法

```javascript
obj.fun()
```

## 2.3 构造函数

```javascript
new Fun()
```

## 2.4 绑定事件函数

触发事件调用
```javascript
btn.onclick = function(){}; // 点击按钮调用
```

## 2.5 定时器函数

定时器到达指定时间自动调用
```javascript
setInterval(function(){}, 1000) // 定时器自动一秒钟调用一次
```

## 2.6 立即执行函数
自动自己调用
```javascript
(function(){})()
```
# 3. 函数中this指向
根据调用方式不同，this的指向也不同，**一般指向调用者**

具体总结表格如下所示
|调用方式|this指向|
|--|--|
|普通函数调用|window|
|构造函数调用|实例对象， 原型对象里面的方法也指向实例对象|
|对象方法调用|该方法所属对象|
|事件绑定方法|绑定事件对象|
|定时器函数|window|
|立即执行函数|window|

- 注意
在箭头函数中，`this`是静态的，`this`始终指向函数声明时所在作用域下的this的值
关于箭头函数的更多内容，[请见【ES6】JavaScript函数-箭头函数-this指向-简写](https://blog.csdn.net/weixin_44972008/article/details/112929712)

# 4. 改变函数的this指向
## 4.1 使用call方法

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

作用：1. 调用函数 2. 改变函数this指向

```javascript
function add(a, b) {
  console.log(a + b)
}

let obj = {
  c: 520
}
add(1,2) // this指向window
add.call(obj, 1, 2) // this指向obj
```
### 应用
主要的作用是可以实现继承

```javascript
function Father(uname, age, sex) {
  this.uname = uname
  this.age = age
  this.sex = sex
}

function Son(uname, age, sex){
  Father.call(this, uname, age, sex)
}

let son = new Son('YK菌', 18, '男')
console.log(son) // Son {uname: "YK菌", age: 18, sex: "男"}
```

## 4.2 使用apply方法

```javascript
fun.apply(thisArg, [argsArray])
```

作用：1. 调用函数 2. 改变函数this指向
但是他的参数必须是数组（伪数组）
```javascript
function add(a, b) {
  console.log(a + b)
}

let obj = {
  c: 520
}
add(1,2) // this指向window
add.call(obj, [1, 2]) // this指向obj
```
### 应用
可以利用apply 借助数学内置对象求最大值

```javascript
let arr = [1, 34, 556, 44, 23]
Math.max.apply(null, arr); // null 表示不需要改变this指向
Math.max.apply(Math, arr); // 不改变的话最好就指回去
```

## 4.3 使用bind方法

```javascript
fun.bind(thisArg, arg1, arg2, ...)
```

不会调用函数，但是可以改变函数内部this的指向
返回 由指定的 `this` 值和初始化参数改造的原函数拷贝

```javascript
function add(a, b) {
  console.log(a + b)
}

let obj = {
  c: 520
}
add(1,2) // this指向window
let f = add.bind(obj, 1, 2) // this指向obj， 不会调用
f() // 调用函数 this指向obj
```
### 应用
改变定时器内部的`this`指向

```javascript
let btn = document.querySelector('button')
btn.onclick = function() {
  this.disabled = true
  setTimeout(function(){
    this.disabled = false;
  }.bind(this), 3000)
}
```

## 4.4 区别与联系
### 相同
都可以改变函数内部的`this`指向

### 区别
`call` 和 `apply`  会调用函数, 并且改变函数内部this指向.
`call` 和 `apply` 传递的参数不一样, `call` 传递参数 `arg1, arg2...`形式  `apply` 必须数组形式`[args]`
`bind`  不会调用函数, 可以改变函数内部`this`指向.

### 主要应用场景
`call` 经常做继承. 
`apply` 经常跟数组有关系.  比如借助于数学对象实现数组最大值最小值
`bind`   不调用函数,但是还想改变this指向. 比如改变定时器内部的`this`指向

# 5. 自定义call、apply、bind方法
最后我们自己定义一下这三个方法。

## call.js
```javascript
export default function call(Fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    // 表示全局对象（ES11新增特性）
    obj = globalThis;
  }
  // 为 obj 添加临时的方法
  obj.temp = Fn;
  // 调用 temp 方法
  let result = obj.temp(...args);
  // 删除tempfangfa
  delete obj.temp;
  // 返回执行结果
  return result;
}
```

## apply.js
```javascript
export default function apply(Fn, obj, arr) {
  if (obj === undefined || obj === null) {
    obj = globalThis;
  }
  // 为obj添加临时方法
  obj.temp = Fn;
  // 执行方法
  let result = obj.temp(...arr);
  // 删除临时属性
  delete obj.temp;
  // 返回结果
  return result;
}

```
## bind.js
```javascript
import call from './call.js'

export default function bind(Fn, obj, ...args) {
  // 返回一个新的函数
  return function (...args2) {
    // 执行 call 函数、
    return call(Fn, obj, ...args, ...args2);
  };
}

```


## 测试

```javascript
import call from "./function/call";
import apply from "./function/apply";
import bind from "./function/bind";

console.log("****test call ****");

function add(a, b) {
  console.log(this);
  return a + b + this.c;
}
let obj = {
  c: 521,
};
window.c = 1314;

console.log(call(add, obj, 10, 20))
console.log(call(add, null, 30, 40))

console.log(obj)
console.log("****test apply****");
console.log(apply(add, obj, [10, 20]))
console.log(apply(add, null, [30, 40]))

console.log(obj)
console.log("****test bind****");
let fn = bind(add, obj, 10, 20);
console.log(fn());

let fn2 = bind(add, obj);
console.log(fn2(10, 20));
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421162435207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
