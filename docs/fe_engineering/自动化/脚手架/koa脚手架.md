

本文相关代码：[youth_camp_ykjun: 青训营&开课吧 实战课程代码仓库 - Gitee.com](https://gitee.com/ykang2020/youth_camp_ykjun/tree/master/blog_pro/learn-koa-setup)

# 一、前言

> 今天来复习&总结青训营实训营第二天的内容，在上次课程中我们[从0到1创建了一个vue的脚手架](https://juejin.cn/post/7018377688708546573)，今天我们跟着崔老师[@阿崔cxr](https://juejin.cn/user/2101921961483374)使用自动化思维来搭建一个koa脚手架


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e349e4bc879a473391a7b8d71e4ba3a3~tplv-k3u1fbpfcp-watermark.image?)

PS:本博文是崔老师 **前端工程化** 课程的第一部分：**初始化**，后面我会尽力更新完~ 包括：webpack原理、rollup原理、实现mini-vite、自动测试等


# 二、分析vue-cli

1. 使用指令创建一个项目


```powershell
vue create hello-world
```


2. 提供选择 单选/多选


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d530f090ee3348cea989b543dfc4652f~tplv-k3u1fbpfcp-watermark.image?)



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f043d117ab2642de924bd29504787b56~tplv-k3u1fbpfcp-watermark.image?)



3. 安装依赖


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e98ca440cc644d29ae8e6f982652f480~tplv-k3u1fbpfcp-watermark.image?)

总结一下步骤就是：① 输入指令 ② 选择配置 ③ 创建文件 ④ 安装依赖

那么我们就按照这个步骤来写我们的脚手架



# 三、起步

接下来我们就要自己实现一个脚手架，有了上节课的基础知识，今天的内容可以让你更上一层楼。



首先创建我们脚手架的项目目录 `learn-koa-setup`

然后初始化项目`npm init -y`

将项目模块化规范改成ESM，即在package.json中添加`"type": "module",`

创建好`index.js`，在这里编写脚手架要做的事情

```js
import fs from "fs";

// 核心：自动化思维【先想手动创建一个项目的基本步骤】

// 1. 创建了文件夹（项目名）
fs.mkdirSync("ykyk");

// 2. 创建了index.js
fs.writeFileSync("./ykyk/index.js", "index");

// 3. 创建了package.json
fs.writeFileSync("./ykyk/package.json", "package");

// 4. 安装依赖
// TODO package -> npm
```

我们测试一下
```node
node index.js
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da89d49067394d689998cc0a571e22aa~tplv-k3u1fbpfcp-watermark.image?)

文件夹和文件已经创建，也填充了基本内容

我们每次执行这个命令，都要手动删除ykyk这个文件夹，然后再新建，比较麻烦，我们用指令让他`自动`执行，在package.json中添加指令（我这里使用的是windows删除文件夹的指令）

```js
"scripts": {
  "test": "rd /s ykyk && node index.js"
},
```

此时就可以直接使用 `npm test` 命令来完成删除文件夹，然后执行index.js文件了！

# 四、完善

上面的步骤虽然很easy，但是已经是大体的方向已经明确了，接下来要做的就是不断完善这里面的具体细节。

> 注意：我们这里使用`小步骤`的方式写代码。一点一点的完善，一次只完成一个很小的功能，然后进行测试。功能没问题再往下写，这样保证我们在编写代码的时候及时知道哪里出了错，及时修正。

我们这里用到了很多根路径，我们将他封装起来


```js
function getRootPath() {
  return "./ykyk";
}
```
就可以这样使用了

```js
// 1. 创建了文件夹（项目名）
fs.mkdirSync(getRootPath());

// 2. 创建了index.js
fs.writeFileSync(getRootPath()+"/index.js", "index");

// 3. 创建了package.json
fs.writeFileSync(getRootPath()+"/package.json", "package");
```

## 1. 生成index.js内容

### ① 生成模板

我们创建一个模板 indexTemplate.js

先将模板内容写死，然后导出创建模板的函数
```js
export function createIndexTemplate() {
  return `
    const Koa = require("koa");
    const app = new Koa();
    app.listen(8000, () => {
      console.log("open server localhost:8000");
    });
  `;
}
```

在index.js中引入，并使用
```js
import { createIndexTemplate } from "./indexTemplate.js";

fs.writeFileSync(getRootPath() + "/index.js", createIndexTemplate());
```

最后执行指令，查看效果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66805bf8ae1c40fdb1001abb26d968e9~tplv-k3u1fbpfcp-watermark.image?)

### ② 动态生成模板

接下来我们就要让模板的内容可以根据不同的设置，来呈现不同的代码

这里我们用到一个第三方库 [ejs 高效的嵌入式 JavaScript 模板引擎](https://www.npmjs.com/package/ejs)

安装 `npm i ejs`

创建文件 template/index.ejs


```js
const Koa = require("koa");

const app = new Koa();

app.listen(8000, () => {
  console.log("open server localhost:8000");
});
```

此时在 indexTemplate.js 就应该这样引入和使用

```js
import ejs from "ejs";
import fs from "fs";

export function createIndexTemplate() {
  // 读取ejs模板
  const template = fs.readFileSync("./template/index.ejs", "utf-8");
  // 交给ejs来渲染
  const code = ejs.render(template);
  // 返回渲染后的模板
  return code;
}
```

此时再测试一下，发现没有问题，然后就要进行条件渲染了

修改index.ejs文件【根据文档中给出的语法】

```js
const Koa = require("koa");

<% if (router) { %>
const Router = require("koa-router");
<% } %>

const app = new Koa();

<% if (router) { %>
const router = new Router();
router.get("/", (ctx) => {
ctx.body = "hello YK菌";
});
app.use(router.routes());
<% } %>

app.listen(8000, () => {
console.log("open server localhost:8000");
});
```

通过给渲染函数传递参数来决定是否渲染响应的内容

```js
const code = ejs.render(template, {
  router: true,
});
```

### ③ 模拟用户输入的数据

其实这个参数应该是由用户来选择的，但是我们是`小步骤`的方式编写代码，所以我们先将用户的输入写死。

```js
// 先把配置中间件数据写死
const inputConfig = {
  middleware: {
    router: true,
  },
};

// 将配置文件传入创建模板函数
fs.writeFileSync(getRootPath() + "/index.js", createIndexTemplate(inputConfig));
```

在`indexTemplate.js`中这样使用即可

```js
export function createIndexTemplate(inputConfig) {
  // 读取ejs模板
  const template = fs.readFileSync("./template/index.ejs", "utf-8");
  // 交给ejs来渲染
  const code = ejs.render(template, {
    router: inputConfig.middleware.router,
  });
  // 返回渲染后的模板
  return code;
}
```

### ④ 拓展完整选项

我们把四个选项补齐


```js
// 程序的input
const inputConfig = {
  middleware: {
    router: true,
    static: true,
    views: true,
    body: true
  },
};
```

**indexTemplate.js**
```js
import ejs from "ejs";
import fs from "fs";

export function createIndexTemplate(inputConfig) {
  // 读取ejs模板
  const template = fs.readFileSync("./template/index.ejs", "utf-8");
  // 交给ejs来渲染
  const code = ejs.render(template, {
    router: inputConfig.middleware.router,
    static: inputConfig.middleware.static,
    views: inputConfig.middleware.views,
    body: inputConfig.middleware.body
  });
  // 返回渲染后的模板
  return code;
}
```


**[template](https://gitee.com/ykang2020/youth_camp_ykjun/tree/master/blog_pro/learn-koa-setup/template)**/**index.ejs**
```js
const Koa = require("koa");
<% if (router) { %>
const Router = require("koa-router");
<% } %>
<% if (static) { %>
const serve = require("koa-static");
<% } %>
<% if (views) { %>
const views = require("koa-views");
<% } %>
<% if (body) { %>
const body = require("koa-body");
<% } %>
const app = new Koa();

<% if (router) { %>
const router = new Router();
router.get("/", (ctx) => {
ctx.body = "hello YK菌";
});
app.use(router.routes());
<% } %>
<% if (static) { %>
app.use(serve(__dirname + "/static"));
<% } %>
<% if (views) { %>
app.use(
views(__dirname + "/views", {
extension: "pug",
})
);
<% } %>
<% if (body) { %>
app.use(
body({
multipart: true,
})
);
<% } %>

app.listen(8000, () => {
console.log("open server localhost:8000");
});
```

测试我们的代码功能 `npm test`

此时创建出的ykyk项目中的index.js就是根据选项生成的完整的代码了

显示 ykyk/index.js 中的内容符合我们的预期
```js
const Koa = require("koa");

const Router = require("koa-router");

const serve = require("koa-static");

const views = require("koa-views");

const body = require("koa-body");

const app = new Koa();

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello YK菌";
});
app.use(router.routes());

app.use(serve(__dirname + "/static"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

app.use(
  body({
    multipart: true,
  })
);

app.listen(8000, () => {
  console.log("open server localhost:8000");
});
```



## 2. 生成package.json内容

简单使用ejs生成了index.js模板，我们再基于数据生成package.json，和上面的步骤基本一样

### ① 生成模板
首先创建 `packageTemplate.js`

```js
import ejs from "ejs";
import fs from "fs";

export function createPackageTemplate(inputConfig) {
  // 读取ejs模板
  const template = fs.readFileSync("./template/package.ejs", "utf-8");
  // 交给ejs来渲染
  const code = ejs.render(template, {
    router: inputConfig.middleware.router,
    static: inputConfig.middleware.static,
    views: inputConfig.middleware.views,
    body: inputConfig.middleware.body,
  });
  // 返回渲染后的模板
  return code;
}
```



然后创建一个模板 `template/package.ejs`


```js
{
  "name": "koa-setup-ykyk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "rm -rf hei && node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.1"
    <% if (router) { %>
    ,"koa-router": "^10.1.1"
    <% } %>
    <% if (static) { %>
    ,"koa-static": "^5.0.0"
    <% } %>
    <% if (views) { %>
    ,"koa-views": "^7.0.1"
    ,"pug": "^3.0.2"
    <% } %>
    <% if (body) { %>
    ,"koa-body": "^4.1.3"
    <% } %>
  }
}
```

这里有一个小技巧，就是把可选包的前面加上逗号，这样就可以保证这里的格式没有问题了~ 

### ② 获取项目名称

模拟用户输入packageName

```js
// 程序的input
const inputConfig = {
  packageName: 'yk_demo',
  middleware: {
    router: true,
    ...
  },
};
```


在这里引入即可
```js
...
  // 交给ejs来渲染
  const code = ejs.render(template, {
    packageName: inputConfig.packageName,
    ...
  });
...
```
最后根据ejs的语法在template/package.ejd中这样写就可以


```js
"name": "<%= packageName %>",
```

最后我们测试一下`npm test`，可以看到生成的package.json符合我们的预期


```js
{
  "name": "yk_demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rm -rf hei && node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.1",
    "koa-router": "^10.1.1",
    "koa-static": "^5.0.0",
    "koa-views": "^7.0.1",
    "pug": "^3.0.2",
    "koa-body": "^4.1.3"
  }
}
```

相同的写法，我们可以把index.js中的端口号也设置成可供用户自己选择的模式，具体的可以看我代码仓库中的代码
[youth_camp_ykjun: 青训营&开课吧 实战课程代码仓库 - Gitee.com](https://gitee.com/ykang2020/youth_camp_ykjun/tree/master/blog_pro/learn-koa-setup)

## 3. 获取用户输入

接下来我们要做的就是获取真实的用户输入，这里我们使用 `inquirer` 这个库（A collection of common interactive command line user interfaces.） 网址：[inquirer - npm (npmjs.com)](https://www.npmjs.com/package/inquirer)

首先安装这个库 `npm i inquirer`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6088b3fb99f74123a574c03b59e9df9a~tplv-k3u1fbpfcp-watermark.image?)




创建question/index.js获取用户输入

```js
import inquirer from "inquirer";

export function question() {
  return inquirer.prompt([
    // 获取用户输入的项目名称
    { type: "input", name: "packageName", message: "set package name" },
    // 获取用户输入的端口号，默认值为8080
    {
      type: "number",
      name: "port",
      message: "set port number",
      default: () => 8080,
    },
    // 多选，获取用户选择的中间件
    {
      type: "checkbox",
      name: "middleware",
      choices: [
        { name: "koaRouter" },
        { name: "koaStatic" },
        { name: "koaViews" },
        { name: "koaBody" },
      ],
    },
  ]);
}
```

然后将模拟的数据替换成真实用户输入的数据 

```js
import { question } from "./question/index.js";

const answer = await question();

// 程序的input
const inputConfig = {
  packageName: answer.packageName,
  port: answer.port,
  middleware: {
    router: answer.middleware.indexOf("koaRouter") !== -1,
    static: answer.middleware.indexOf("koaStatic") !== -1,
    views: answer.middleware.indexOf("koaViews") !== -1,
    body: answer.middleware.indexOf("koaBody") !== -1,
  },
};
```

这里我们使用了一个`await`，但是没有使用`async`函数包裹，这是因为新版(14.8+)的node.js中支持在顶层直接使用`await`

当然我们可以把index.js中获取用户输入的逻辑抽离出去，并将代码进行简化

创建一个config.js

```js
export function createConfig(answer) {
  return {
    packageName: answer.packageName,
    port: answer.port,
    middleware: {
      router: haveMiddleware("koaRouter"),
      static: haveMiddleware("koaStatic"),
      views: haveMiddleware("koaViews"),
      body: haveMiddleware("koaBody"),
    },
  };
  function haveMiddleware(name) {
    return answer.middleware.indexOf(name) !== -1;
  }
}
```
index.js直接引入

```js
import { question } from "./question/index.js";
import { createConfig } from "./config.js";

const answer = await question();
const inputConfig = createConfig(answer);
```

大功告成，看看效果

![GIF 2021-11-28 20-55-32.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee55a032b044c54a3b53c99f54617f3~tplv-k3u1fbpfcp-watermark.image?)

文件内容ykyk/index.js

```js
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const app = new Koa();

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello YK菌";
});
app.use(router.routes());

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
```

文件内容ykyk/package.json
```js
{
  "name": "ykyk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rm -rf hei && node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.1",
    "koa-router": "^10.1.1",
    "koa-views": "^7.0.1",
    "pug": "^3.0.2"
  }
}
```

## 4. 安装依赖

上次我们使用的是nodejs原生调用子进程安装依赖[【青训营Pro】🛠️从0到1实现一个自己的前端约定路由项目脚手架🏗️ 工具~ - 掘金 (juejin.cn)](https://juejin.cn/post/7018377688708546573#heading-18)，今天我们使用一种社区里比较常用的 [execa - npm (npmjs.com)](https://www.npmjs.com/package/execa) 来自动安装依赖

首先就是安装`npm i execa`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1147e540889a4fa1a13769d4f934d8de~tplv-k3u1fbpfcp-watermark.image?)


直接引入使用
```js
import { execa } from "execa";

// 4. 安装依赖
// TODO package -> npm
// 配置安装路径 和 显示安装状态
execa("npm install", {cwd: getRootPath(), stido: [2, 2, 2] });
```
测试一下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/964d202ea04f4fc691874108e1ee75a7~tplv-k3u1fbpfcp-watermark.image?)

启动成功~

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c063ec7c5d94af0824e409d77d3f866~tplv-k3u1fbpfcp-watermark.image?)

## 5. 格式化代码

使用`prettier`的API调用的形式来格式化我们的代码 [API · Prettier](https://prettier.io/docs/en/api.html)

安装 `npm i prettier`

分别在indexTemplate.js和packageTemplate.json中使用
```js
...
import prettier from "prettier";

export function createIndexTemplate(inputConfig) {
  ...
  // 返回渲染后的模板
  return prettier.format(code, {
    parser: "babel",
  });
}
```


```js
...
import prettier from "prettier";

export function createPackageTemplate(inputConfig) {
  ...
  // 返回渲染后的模板
  return prettier.format(code, {
    parser: "json",
  });
}
```

可以自己测试一下效果

## 6. 处理路径问题

最后我们处理一下我们的路径问题将我们之前写的 `相对路径` 改成 `绝对路径` 

首先是项目根路径

```js
...
import path from "path";

...
function getRootPath() {
  // 拼接 根路径 + 项目名 得到项目根路径
  return path.resolve(process.cwd(), inputConfig.packageName);
}
```


然后就是indexTemplate.js导入index.ejs的路径问题

在commonjs中可以使用__dirname来获取路径，但是我们这里使用的是esm，所以我们用url中的fileURLToPath来处理

```js
...
import { fileURLToPath } from "url";
import path from "path";

  ...
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // 读取ejs模板
  const template = fs.readFileSync(
    path.resolve(__dirname, "./template/index.ejs"),
    "utf-8"
  );
...
```

那在packageTempalte.js中就是一样的操作了


# 五、发布

后面的步骤就和之前的一样啦~ [【青训营Pro】🛠️从0到1实现一个自己的前端约定路由项目脚手架🏗️ 工具~ - 掘金 (juejin.cn)](https://juejin.cn/post/7018377688708546573#heading-21)首先创建一个全局的指令来创建项目，然后上传至npm仓库

将之前写的代码都放在bin目录下，然后修改package.json中的内容[和之前的步骤一样](https://juejin.cn/post/7018377688708546573#heading-13)

把项目通过 `npm link` 链接到全局， 然后可以通过`npm root -g` 查看全局的npm信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a814d74a6fc94b28acc9c0a97513adb3~tplv-k3u1fbpfcp-watermark.image?)

可以看到此时项目已经链接到全局了，通过指令 `learn-koa-setup-yk` 就可以启动我们的脚手架项目了


```powershell
npm config set registry=https://registry.npmjs.org
npm publish
npm config set registry=https://registry.npm.taobao.org
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46663d83ad264f38a1ca7659964b67c4~tplv-k3u1fbpfcp-watermark.image?)

可以分享给别人你写好的脚手架啦 `npm i learn-koa-setup-yk`

> 最后，欢迎关注我的专栏，和**YK菌**做好朋友

