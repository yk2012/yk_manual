
# 1. 什么是webpack性能优化

* 开发环境性能优化
* 生产环境性能优化

## 1.1 开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

## 1.2 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash)
  * tree shaking
  * code split
  * 懒加载/预加载
  * pwa
  

# 2. 开发环境性能优化
## 2.1 HMR
hot module replacement 模块热替换

```javascript
target: "web",
devServer: {
  // 开启HMR 功能
  // 当修改了webpack 配置，新配置要想生效，必须重新webpack 服务
  hot: true,
}
```

* 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块） 【极大提升构建速度】

1. 样式文件：可以使用HMR功能：因为style-loader【开发】内部实现了~

2. js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。

在index.js中添加
```javascript
if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept("./print.js", function () {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}
```

3. html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ 【不用做HMR功能】
解决：修改entry入口，将html文件引入
`entry: ["./src/js/index.js", "./src/index.html"]`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210620195033846.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 2.2 source-map
`source-map`: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

```javascript
devtool: 'source-map'
```

`devtool`后面的选项可以填的内容是：

```javascript
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
```

code | 位置 | 备注
--- | --- | ---
`source-map` | 外部 | 错误代码准确信息 和 源代码的错误位置
`inline-source-map` | 内联 | 只生成一个内联source-map <br/>错误代码准确信息 和 源代码的错误位置
`hidden-source-map` | 外部 | 错误代码错误原因，但是没有错误位置<br/>不能追踪源代码错误，只能提示到构建后代码的错误位置
`eval-source-map` | 内联 | 每一个文件都生成对应的source-map，都在eval<br/>错误代码准确信息 和 源代码的错误位置
`nosources-source-map` | 外部 | 错误代码准确信息, 但是没有任何源代码信息
`cheap-source-map` | 外部 | 错误代码准确信息 和 源代码的错误位置 <br/>只能精确的行
`cheap-module-source-map` | 外部 | 错误代码准确信息 和 源代码的错误位置<br/>module会将loader的source map加入

内联 和 外部的区别
1. 外部生成了文件，内联没有 
2. 内联构建速度更快


【开发环境】：速度快，调试更友好
1.  速度快 (eval>inline>cheap>...)
  eval-cheap-souce-map
  eval-source-map
2. 调试更友好  
  souce-map
  cheap-module-souce-map
  cheap-source-map
3. 推荐使用
--> `eval-source-map`  / `eval-cheap-module-souce-map`

【生产环境】：源代码要不要隐藏? 调试要不要更友好
  内联会让代码体积变大，所以在生产环境不用内联
  nosources-source-map  全部隐藏
  hidden-source-map  只隐藏源代码，会提示构建后代码错误信息
推荐使用
  --> `source-map` / `cheap-module-souce-map`

# 3. 生产环境性能优化
## 3.1 oneOf
使用oneOf之后loader 只会匹配一个
注意：不能有两个配置处理同一种类型文件，js要把eslint提出来

```javascript
module: {
  rules: [
    {
      // 在package.json中eslintConfig --> airbnb
      test: /\.js$/,
      exclude: /node_modules/,
      // 优先执行
      enforce: "pre",
      loader: "eslint-loader",
      options: {
        fix: true,
      },
    },
    {
      // 以下loader只会匹配一个
      // 注意：不能有两个配置处理同一种类型文件
      oneOf: [
        {
          test: /\.css$/,
          use: [...commonCssLoader],
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, "less-loader"],
        },
        /*
          正常来讲，一个文件只能被一个loader处理。
          当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
            先执行eslint 在执行babel
        */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                  targets: {
                    chrome: "60",
                    firefox: "50",
                  },
                },
              ],
            ],
          },
        },
        {
          test: /\.(jpg|png|gif)/,
          loader: "url-loader",
          options: {
            limit: 8 * 1024,
            name: "[hash:10].[ext]",
            outputPath: "imgs",
            esModule: false,
          },
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: "file-loader",
          options: {
            outputPath: "media",
          },
        },
      ],
    },
  ],
},
```

## 3.2 缓存
### 3.2.1 babel缓存
在babel-loader中options中添加配置
 `cacheDirectory: true` 让第二次打包构建速度更快

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: { version: 3 },
          targets: {
            chrome: "60",
            firefox: "50",
          },
        },
      ],
    ],
    // 开启babel缓存
    // 第二次构建时，会读取之前的缓存
    cacheDirectory: true,
  },
}
```


### 3.2.2 文件资源缓存
强制缓存，在一定时间内总是走缓存，但是临时变一个资源，导致页面更新不及时，用的还是缓存，所以给打包出来的文件名后面加一个哈希值，这样改变了文件内容，文件名也就变了

`hash`: 每次wepack构建时会生成一个唯一的hash值
- 问题: 因为js和css同时使用一个hash值
- 如果重新打包，会导致所有缓存失效（可能我却只改动一个文件）

`chunkhash`：根据`chunk`生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
- 问题: js和css的hash值还是一样的
- 因为css是在js中被引入的，所以同属于一个`chunk`

`contenthash`: 根据文件的内容生成hash值
- 不同文件hash值一定不一样    
- 让代码上线运行缓存更好使用

```javascript
output: {
  filename: "js/built.[contenthash:10].js",
  path: resolve(__dirname, "build"),
},
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/built.[contenthash:10].css",
  })
]
```

## 3.3 tree shaking
tree shaking：去除无用代码
- 前提：1. 必须使用ES6模块化  2. 开启production环境
- 作用:  减少代码体积


在package.json中配置 
- "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
- 问题：可能会把css / @babel/polyfill （副作用）文件干掉
- 解决： "sideEffects": ["*.css", "*.less"]


## 3.4 code split 代码分割
代码分割：将一个大的文件分割成多个文件 【可以实现按需加载】

### 方式一 多入口
index.js中也不需要引入test.js了

```javascript
// 单入口
// entry: './src/js/index.js',
entry: {
  // 多入口：有一个入口，最终输出就有一个bundle
  index: "./src/js/index.js",
  test: "./src/js/test.js",
},
output: {
  // [name]：取文件名
  filename: "js/[name].[contenthash:10].js",
  path: resolve(__dirname, "build"),
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210621154928553.png)
### 方式二 optimization
加一个配置项
将node_modules中代码单独打包一个chunk最终输出

```javascript
/*
  1. 可以将node_modules中代码单独打包一个chunk最终输出
  2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
*/
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

比如我引入了jquery（不配置的话jquery会和index.js(在此引入的)融合在一起）
自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk

输出了三个chunk
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210621155900340.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
### 方式三 js代码动态加载
通过js代码，让某个文件单独打包成一个chunk
import动态导入语法：能将某个文件单独打包

index.js中引入test.js
```javascript
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    console.log(mul(2, 5));
  })
  .catch(() => {
    console.log('文件加载失败~');
  });
```



## 3.5 lazy loading 懒加载 与 预加载
例子：点击页面按钮调用某个js文件，应该在点击之后再加载这个js文件

点击按钮之后才会引入每个js文件，这样就可以实现懒加载了

- 懒加载：当文件需要使用时才加载
- 预加载 prefetch：会在使用之前，提前加载js文件 【兼容性有问题】

- 正常加载可以认为是并行加载（同一时间加载多个文件）  
- 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源


```javascript
document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件 
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
```


## 3.6 PWA
  PWA: 渐进式网络开发应用程序(离线可访问)【兼容性问题】
    workbox --> workbox-webpack-plugin

npm i workbox-webpack-plugin

1. 帮助serviceworker快速启动
2. 删除旧的 serviceworker

```javascript
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker
        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```
再在入口文件index.js中进行配置

```javascript
// 注册serviceWorker
// 处理兼容性问题 支持就用，不支持就不用
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
```
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中`eslintConfig`配置
```javascript
"env": {
  "browser": true // 支持浏览器端全局变量
}
```

   2. sw代码必须运行在服务器上
      --> nodejs
      -->
        `npm i serve -g`
        `serve -s build` 启动服务器，将build目录下所有资源作为静态资源暴露出去

这样第一次加载后，进行缓存，断网之后还是可以访问到页面内容



## 3.7多进程打包
npm i thread-loader
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210621174555507.png)

开启多进程打包。 
进程启动大概为600ms，进程通信也有开销。
只有工作消耗时间比较长，才需要多进程打包【babel-loader】【js代码多】

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /* 
      开启多进程打包。 
      进程启动大概为600ms，进程通信也有开销。
      只有工作消耗时间比较长，才需要多进程打包
    */
    // "thread-loader",
    {
      loader: "thread-loader",
      options: {
        workers: 2, // 进程2个
      },
    },
    {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage",
              corejs: { version: 3 },
              targets: {
                chrome: "60",
                firefox: "50",
              },
            },
          ],
        ],
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true,
      },
    },
  ],
}
```


## 3.8 externals
防止将某一些包打包输出到最终的bundle中

```javascript
externals: {
  // 拒绝jQuery被打包进来
  jquery: 'jQuery'
}
```

在index.html通过CDN链接引入jquery
```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```


## 3.9 dll
使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
【dll是打包一次整合在一起，以后就不用打包了】
【externals是不打包，就直接用CDN引入】
### webpack.dll.js
```javascript
const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ["jquery"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]", // 打包的库里面向外暴露出去的内容叫什么名字
  },
  // 上面的内容是将jquery打包进来，然后输出出去，暴露出来的内容是jquery_[hash值]，打包的文件名是jquery.js
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: "[name]_[hash]", // 映射库的暴露的内容名称
      path: resolve(__dirname, "dll/manifest.json"), // 输出文件路径
    }),
  ],
  mode: "production",
};
```
当你运行 `webpack` 时，默认查找 webpack.config.js 配置文件
  需求：需要运行 webpack.dll.js 文件
   --> `webpack --config webpack.dll.js`


### webpack.config.js
webpack.DllReferencePlugin
告诉webpack哪些库不参与打包，同时使用时的名称也得变

下载插件
npm i add-asset-html-webpack-plugin
将某个文件打包输出去，并在html中自动引入该资源

```javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production'
};
```

# 4. 总结
复习一下
## 开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash)
  * tree shaking
  * code split
  * 懒加载/预加载
  * pwa