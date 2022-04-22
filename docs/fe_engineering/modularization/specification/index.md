
> 把单独的一个功能封装到一个模块（文件）中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以以来别的模块

## 模块化的好处

1. 防止命名冲突
2. 代码复用，提高效率
3. 高维护性

## 模块化的演变过程

1. 文件划分

使用`<script></script>`标签来使用不同的js文件（完全依靠约定）

缺点：
- 污染全局作用域
- 命名冲突问题
- 无法管理模块之间的依赖关系

2. 命名空间模式

将每个模块包裹成全局对象的形式


3. 立即执行函数 IIFE

```js
(function(){})()
```


## 3. 模块化规范产品


## 模块化规范


### CommonJS
（Node端）

以同步模式加载模块，启动时加载模块，执行时使用模块

- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过module.exports导出成员
- 通过require函数载入模块

node.js/Browserify
- 模块分为：`单文件模块` 与 `包`
- 模块成员导出：`module.exports` 和 `exports`
- 模块成员导入：`require('模块标识符')`


### AMD (Asynchronous Module Definition)
（浏览器端）
Require.js

定义模块
```js
// 模块名，依赖项，函数
define('module1', ['jquery', './module2'], function($, module2){
  // 导出成员
  return {
    start: function(){
      $('body').animate({ margin: '200px' })
      module2()
    }
  }
})
```

加载模块
```js
require(['module1'], function(module1){
  module1.start()
})
```

- 使用起来复杂
- 模块js文件请求频繁

### CMD (Common Module Definition)
（浏览器端）

Sea.js


## 最佳实践


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab970a3178a04fbc96c31a218f0255d1~tplv-k3u1fbpfcp-watermark.image?)


# 还需要改进

- ES Modules 存在环境兼容问题
- 模块文件过多，网络请求频繁
- 所有前端资源都需要模块化

这就需要打包工具了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/408e4f88e71349eebc4527481b3d3ea9~tplv-k3u1fbpfcp-watermark.image?)

打包工具解决的是前端整体的模块化，并不单指JavaScript模块化