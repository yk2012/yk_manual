CommonJS模块化规范

## 概述
CommonJS是Node.js使用的一种模块化规范

在Node.js中，一个文件就是一个模块，每个模块都有自己的作用域

在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理

## 特点
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，运行结果会被缓存，以后再加载时就会直接读取缓存结果。【要想让模块再次运行，必须清除缓存】
- 模块加载的顺序，按照其在代码中出现的顺序。

## 语法
- 暴露模块：`module.exports = value`或`exports.xxx = value`
- 引入模块：`require(xxx)`,如果是第三方模块，`xxx`为模块名；如果是自定义模块，`xxx`为模块文件路径

> 注意，这里导出的是一个对象引用

## 示例
### 使用module.exports

demo.js
```javascript
const a = 1;
const b = function () {
  console.log("你好");
};

module.exports.a = a;
module.exports.b = b;

module.exports.c = 2;
module.exports.d = function () {
  console.log("哈哈");
};
```

index.js
```javascript
const demo = require("./demo");

console.log(demo.a, demo.c);
demo.b();
demo.d();
```
### 使用exports.xxx = 

test.js
```javascript
exports.x = 1;
exports.y = function () {
  console.log("aabbcc");
};
```

```javascript
const x = require("./test").x;
const y = require("./test").y;
console.log(x);
y();
```

通过对象结构赋值可以简写
```javascript
const { x, y } = require("./test");
console.log(x);
y();
```
