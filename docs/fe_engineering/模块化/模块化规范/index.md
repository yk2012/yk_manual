## 模块化开发

模块化的演变过程

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


## 模块化规范


### CommonJS
（Node端）

以同步模式加载模块，启动时加载模块，执行时使用模块

- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过module.exports导出成员
- 通过require函数载入模块


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

Sea.js


## 最佳实践


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab970a3178a04fbc96c31a218f0255d1~tplv-k3u1fbpfcp-watermark.image?)


### ES module


在`script`标签中使用`type="module"`开启ESM

- 自动采用严格模式，忽略`'use strict'`
- 每个ESM模块都是单独的私有作用域
- ESM是通过CORS去请求外部JS模块
- ESM的script标签会延迟执行脚本`defer`

