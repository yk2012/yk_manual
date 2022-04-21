
> 前几天学了一些Node.js的基础，今天来学习Web应用开发，在开发过程中如何进行调试，以及如何线上部署

# Web应用开发


## HTTP 模块

我们可以使用 Node.js 内置HTTP模块 搭建一个最简单的HTTP服务


```js
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello YK!!!");
  })
  .listen(3000, () => {
    console.log("App running at http://127.0.0.1:3000/");
  });

```

控制台输出

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db4bea43cd14a48ad6314c15d2e0eb5~tplv-k3u1fbpfcp-watermark.image)


网页访问（也就是发一个GET请求）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9294b87268c448649fdcc246f900ffb4~tplv-k3u1fbpfcp-watermark.image)

## Koa
实际开发中都会用到一些框架 比如 Express 和 Koa，今天来介绍下 Koa
### 介绍

Koa —— 基于Node.js 平台的下一代Web 开发框架


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38994ba511aa4a6f879528e79d003e84~tplv-k3u1fbpfcp-watermark.image)

安装 `npm i koa`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ad1bcb5077c4c93921fa6c70c8331a6~tplv-k3u1fbpfcp-watermark.image)

Koa 它仅仅提供了一个轻量优雅的函数库，使得编写Web 应用变得得心应手, 不在内核方法中绑定任何中间件


```js
const Koa = require("koa");

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello YK!!!! by Koa";
});

app.listen(3000, () => {
  console.log("App running at http://127.0.0.1:3000/");
});
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c463d38754d641499af91b025489d09c~tplv-k3u1fbpfcp-watermark.image)



Koa 执行过程

- 服务启动
    - 实例化`application`
    - 注册中间件
    - 创建服务、监听端口
- 接受/处理请求
    - 获取请求`req`、`res` 对象
    - `req` -> `request`、`res` -> `response` 封装
    - `request` & `response` -> `context`
    - 执行中间件
    - 输出设置到`ctx.body` 上的内容


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aaf9b209d274824b2f9749a64f343b9~tplv-k3u1fbpfcp-watermark.image)

Koa的源码相对来说比较友好，可以自己看看源码，只有四个文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa5735d548e94678b3d48de71f10b1d0~tplv-k3u1fbpfcp-watermark.image)


### 中间件

Koa 应用程序是一个包含一组中间件函数的对象，它是按照洋葱模型组织和执行的

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52e10c754bfe4bf4b675eb0e9a681930~tplv-k3u1fbpfcp-watermark.image)

中间件的执行顺序：输出结果1 2 3 2 1


```js
const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  console.log("1 --- 1");
  await next();
  console.log("1 --- 2");
});

app.use(async (ctx, next) => {
  console.log("2 --- 1");
  await next();
  console.log("2 --- 2");
});

app.use(async (ctx, next) => {
  console.log("****3*****");
  ctx.body = "中间件的顺序演示";
});

app.listen(3000, () => {
  console.log("App running at http://127.0.0.1:3000/");
});
```

输出结果1 2 3 2 1

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a40d1bb74b94cb6a95db2b011e215b7~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/162221075bbf4d80b641ea54421a72b8~tplv-k3u1fbpfcp-watermark.image)

我们简单实现一下中间件

中间件简单代码实现


```js
const fn1 = async (ctx, next) => {
  console.log("before fn1");
  ctx.name = "YKjun";
  await next();
  console.log("after fn1");
};

const fn2 = async (ctx, next) => {
  console.log("before fn2");
  ctx.age = 18;
  await next();
  console.log("after fn2");
};

const fn3 = async (ctx, next) => {
  console.log(ctx);
  console.log("in fn3...");
};

const compose = (middlewares, ctx) => {
  const dispatch = (i) => {
    let fn = middlewares[i];
    return Promise.resolve(
      fn(ctx, () => {
        return dispatch(i + 1);
      })
    );
  };
  return dispatch(0);
};

compose([fn1, fn2, fn3], {});
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff71b4d5ba5d48a6a88f53475ca5e0ee~tplv-k3u1fbpfcp-watermark.image)


基于中间件原理，获取处理函数执行时间？


```js
const Koa = require("koa");

const app = new Koa();

// logger中间件
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  if (ctx.url !== "/favicon.ico") {
    console.log(`${ctx.method} - ${ctx.url} - ${rt}`);
  }
});

// x-response-time 中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx) => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  ctx.body = `sum=${sum}`;
});

app.listen(3000, () => {
  console.log("App running at http://127.0.0.1:3000/");
});
```

可以看出它整个过程是先从上至下然后从下至上

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/347d2cf9ef324608b5b836ef37a9e7af~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25812096ae5543d8a3c883ed60e6c779~tplv-k3u1fbpfcp-watermark.image)

### 常用中间件
- `koa-router`： 路由解析
- `koa-body`: request body 解析
- `koa-logger`：日志记录
- `koa-views`: 模板渲染
- `koa2-cors` ：跨域处理
- `koa-session`：session 处理
- `koa-helmet`：安全防护

Koa 中间件繁多，质量参差不齐，需要合理选择，高效组合...

### 基于Koa 的前端框架

开源：ThinkJS / Egg ...

内部：Turbo、Era、Gulu ...

它们做了什么？
- Koa 对象 response / request / context / application 等扩展
- Koa 常用中间件库
- 公司内部服务支持
- 进程管理
- 脚手架
- ......


# 调试

## 断点调试

用node的inspect对指定文件进行断点调试
```powershell
node --inspect=0.0.0.0:9229 bootstrap.js
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc350e200cb14e80b31d74551ba3c21b~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7698b9986734a6cb758529334594e20~tplv-k3u1fbpfcp-watermark.image)

也可以安装一个`ndb`包

```powershell
npm install ndb -g
> ndb node bootstrap.js
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea3f368526f4f109b2ad9d813e8794d~tplv-k3u1fbpfcp-watermark.image)


使用 vscode 进行代码调试（我喜欢用这个）

使用之前要先建立一个 json 配置文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f3544673a794900971fbe6ef112f3d0~tplv-k3u1fbpfcp-watermark.image)

打断点进行调试


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36487a4c5262489a96912e86ff315569~tplv-k3u1fbpfcp-watermark.image)


## 日志调试
- SDK 上报
- toutiao.fe.app.2021-07-28.log

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70f62eb1171a498fb4691a5d44004251~tplv-k3u1fbpfcp-watermark.image)



# 线上部署

Node.js 保持了JavaScript 在浏览器中单线程的特点（一个进程只开一个线程）

Node.js 虽然是单线程模型，但是其基于**事件驱动**、**异步非阻塞**模式，可以应用于**高并发**场景，同时避免了线程创建、线程之间上下文切换所产生的资源开销。

缺点：
- 无法利用多核CPU
- 错误会引起整个应用退出，健壮性不足
- 大量计算占用导致CPU，无法继续执


## 利用多核CPU


```js
const http = require("http");

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {} // 单核CPU
    res.end(`handled by process.${process.pid}`);
  })
  .listen(8080);
```
执行一个最简单的HTTP Server


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9069a4382be4b9299c84e391154a271~tplv-k3u1fbpfcp-watermark.image)


这是一个单CPU的服务


**如何利用多核CPU ?**

Node.js 提供了`cluster` / `child_process` 模块


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe057f7df36044c2b1c4a9295de7fce9~tplv-k3u1fbpfcp-watermark.image?)

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpuLen = os.cpus().length;
  console.log("cpus=", cpuLen);
  for (let i = 0; i < cpuLen; i++) {
    cluster.fork();
  }
} else {
  require("./单核http.js");
}
```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/233bced3d1254cc1bcaac999775f53c7~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daa02ceeedea4291b53168309e94d452~tplv-k3u1fbpfcp-watermark.image)

性能对比

ab -c200 -t10 http://localhost:8080/ 测试10秒，并发200



单进程1828
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4eeaa34e7724c5ab1dfdfdc41ebc5cd~tplv-k3u1fbpfcp-watermark.image)

多进程6938
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bb3a46425e8477b8d4760dbd3546129~tplv-k3u1fbpfcp-watermark.image)

多进程健壮性

单进程在程序出错的时候容易整个程序就退出了，我们来看看多进程的健壮性处理

- `fork`：复制一个工作进程后触发该事件。
- `online`：复制好一个工作进程后，工作进程主动发送一条online消息给主进程，主进程收到消息后，触发该事件。
- `listening`：工作进程中调用listen()（共享了服务器端Socket）后，发送一条listening消息给主进程，主进程收到消息后，触发该事件。
- `disconnect`：主进程和工作进程之间IPC通道断开后会触发该事件。
- `exit`：有工作进程退出时触发该事件。
- `setup`:cluster.setupMaster()执行后触发该事件

```js
const http = require("http");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");

if (cluster.isMaster) {
  console.log("Master process id is", process.pid);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", function (worker, code, signal) {
    console.log("worker process died, id", worker.process.pid);
    cluster.fork(); // 退出之后立刻fork一个新进程
  });
} else {
  const server = http.createServer();
  server.on("request", (req, res) => {
    res.writeHead(200);
    console.log(process.pid);
    res.end("hello world\n");
  });
  server.listen(8080);
}

```




## 进程守护

我们不一定每次都要手写管理各种进程，我们可以使用管理工具来实现进程守护。

Node.js 进程管理工具：
- 多进程
- 自动重启
- 负载均衡
- 日志查看
- 性能监控


<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6f445deb70a404b859e7f5f9dd500ae~tplv-k3u1fbpfcp-watermark.image" width=300px float=left><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13fee68829154364959c92341155536c~tplv-k3u1fbpfcp-watermark.image" width=300px float=left>



使用 pm2 进程管理与监控

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8600ace4d8064974acaf3b620699cc29~tplv-k3u1fbpfcp-watermark.image)



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/581895491c124074b2d9a5f1d93efc58~tplv-k3u1fbpfcp-watermark.image)


## 复杂计算
Node.js 复杂计算，占用CPU 卡住了怎么办？


```js
const http = require("http");

const complexCalc = () => {
  console.time("计算耗时");
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }
  console.timeEnd("计算耗时");
  return sum;
};

const server = http.createServer();
server.on("request", (req, res) => {
  if (req.url === "/compute") {
    const sum = complexCalc();
    res.end(`sum is ${sum} \n`);
  } else {
    res.end("success");
  }
});

server.listen(8000);
```
比如我们这里就来一个循环计算模拟复杂计算

计算耗时十几秒

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70d1fce76b034dcab7690a683f8224f6~tplv-k3u1fbpfcp-watermark.image?)

如果我们这时候在请求别的比如127.0.0.1:8000/ping 此时也不能立即输出结果，而是会产生阻塞，要等复杂计算完成才会输出success

复杂计算会占用CPU计算很长时间，简单的任务也会等待复杂的任务计算完才能被执行

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbf4dfc59790426f871df55eb15122fd~tplv-k3u1fbpfcp-watermark.image)

可以考虑使用多进程，将复杂计算，放入子进程来处理，不占用主进程，等复杂计算完成，把结果发送父进程，然后就可以得到结果 

多进程与进程通信

复杂计算子进程
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52660689298c47c89a05f6286d637e9e~tplv-k3u1fbpfcp-watermark.image)


主进程
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d41085ef7a2497c924a3229f915cd14~tplv-k3u1fbpfcp-watermark.image)


# 前端开发与后端开发对比

最后我们来对比对比前端和后端开发的关注点吧~


前端开发
- 跟浏览器打交道，兼容性问题
- UI 规范与组件化
- 加载速度、执行性能、渲染性能
- Crash 监控、白屏监控
- XSS、CSRF 等安全漏洞


服务端开发
- 数据库、Redis 等存储服务
- 服务器管理、容灾
- 性能、内存泄露
- 服务监控、错误监控、流量监控、报警
- SQL 注入、目录遍历等安全漏洞


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89685580bc05479ea9d747b3e9a15869~tplv-k3u1fbpfcp-watermark.image?)