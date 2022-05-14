# TS中webpack的配置
> 实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，今天我们以webpack为例介绍一下如何结合构建工具使用TS。


## 初始化项目

通过执行命令 `npm init -y` 初始化一个项目并创建package.json文件

使用`tsc --init` 创建ts的配置文件tsconfig.json

创建src/index.ts文件，用来编写ts代码


## 使用构建工具webpack

### 安装依赖包

```powershell
npm i -D webpack webpack-cli webpack-dev-server
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29e18b25314c43c197e4aad77a2ffc06~tplv-k3u1fbpfcp-watermark.image?)


-   webpack

    -   构建工具webpack

-   webpack-cli

    -   webpack的命令行工具

-   webpack-dev-server

    -   webpack的开发服务器


```powershell
npm i -D ts-loader typescript 
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f313efcfba74577811825a8288f09fa~tplv-k3u1fbpfcp-watermark.image?)


-   typescript

    -   ts编译器

-   ts-loader

    -   ts加载器，用于在webpack中编译ts文件
    
```powershell
npm i -D html-webpack-plugin clean-webpack-plugin
```    

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9428fce13c734f099be00d907ceb22a0~tplv-k3u1fbpfcp-watermark.image?)


-   html-webpack-plugin

    -   webpack中html插件，用来自动创建html文件

-   clean-webpack-plugin

    -   webpack中的清除插件，每次构建都会先清除目录

### 配置webpack

> 在根目录下配置webpack.config.js


```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  
  // 开发模式使用，方便查错误
  devtool: "inline-source-map",
  
  // 配置服务器
  devServer: {
    contentBase: "./dist",
  },
  
  // 指定打包文件所在目录
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选
    },
  },
  
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
  
  // 配置webpack的loader
  module: {
    rules: [
      {
        test: /.ts$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  
  // 配置webpack的插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

以上是一些基本的配置，但是在实际开发中，webpack在配置开发环境与生产环境时，配置的有些东西不太相同，所以我们应该分开写我们生产环境和开发环境的webpack配置

所以我们就在根目录下创建build文件夹存放我们的webpack配置文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b5d2aee9ee4b77ace50e469bdaee27~tplv-k3u1fbpfcp-watermark.image?)

```powershell
npm i -D webpack-merge
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bcd07b5efbc4e8580b0c94f97841c61~tplv-k3u1fbpfcp-watermark.image?)


基本配置webpack.base.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选
    },
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

开发环境配置webpack.dev.config.js

```js
module.exports = {
  devtool: "inline-source-map",
};
```

生产环境配置webpack.pro.config.js

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

配置主文件webpack.config.js

```js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const devConfig = require("./webpack.dev.config");
const proConfig = require("./webpack.pro.config");

module.exports = (env, argv) => {
  let config = argv.mode === "development" ? devConfig : proConfig;
  return merge(baseConfig, config);
};
```





### 配置tsc

> 根目录下创建tsconfig.json，可以根据自己需要自行配置，详细可以参考[【TS】快速上手（四）配置选项 - 编译选项compilerOptions - 掘金 (juejin.cn)](https://juejin.cn/post/7035907662944403492)

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true
  }
}
```

### 编写代码


index.ts
```ts
const box = document.querySelector('#app')
const hello: string = 'Hello YK菌'

if (box !== null) {
  box.innerHTML = hello
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TS & webpack</title>
</head>

<body>
  <div id="app"></div>
</body>

</html>
```

### 配置命令

> 修改package.json添加如下配置

```json
{
  ......
  "scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js"
  },
  ......
}
```


在src下创建ts文件，并在并命令行执行`npm run build`对代码进行编译，或者执行`npm start`来启动开发服务器



```powershell
npm run build
```
编译


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ddbb8bb36204cd8b49d274127d0ea99~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8818aa224094cec835ef47038c6a86f~tplv-k3u1fbpfcp-watermark.image?)


```powershell
npm start
```
启动开发服务器

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6f4658b4834d89921f9cdcdbfded5e~tplv-k3u1fbpfcp-watermark.image?)


浏览器显示内容

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8bf1a04a68f420683270cdc4d25f8f7~tplv-k3u1fbpfcp-watermark.image?)

## 配置babel

> 除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，通过以下步骤可以将babel引入到项目中。

### 安装依赖包

```powershell
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

-   @babel/core

    -   babel 的核心工具

-   @babel/preset-env

    -   babel 的预定义环境

-   babel-loader

    -   babel 在webpack中的加载器

-   core-js

    -   core-js 用来使老版本的浏览器支持新版ES语法

### 修改配置文件

修改webpack.config.js配置文件

```js
...
module: {
  rules: [
    {
      test: /.ts$/,
      use: [
        {
          loader: "babel-loader",
          // 设置babel
          options: {
            // 设置预定义的环境
            presets: [
              [
                // 指定环境的插件
                "@babel/preset-env",
                // 配置信息
                {
                  // 要兼容的目标浏览器
                  targets: {
                    chrome: "58",
                    ie: "11",
                  },
                  // 指定corejs的版本
                  corejs: "3",
                  // 使用corejs的方式 "usage" 表示按需加载
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
        {
          loader: "ts-loader",
        },
      ],
      exclude: /node_modules/,
    },
  ];
}
...
```

如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。

