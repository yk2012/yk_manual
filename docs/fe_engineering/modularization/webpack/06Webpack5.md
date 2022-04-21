
# 1. entry 
入口起点
## 1.1 单入口 string

```javascript
entry: './src/index.js'
```
打包形成一个chunk。 输出一个bundle文件。
此时chunk的名称[name]默认是 main

## 1.2 多入口 array

```javascript
entry: ['./src/index.js', './src/add.js']
```

所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
【用途】只有在HMR功能中让html热更新生效~

## 1.3 多入口 object

```javascript
entry: {
  index: './src/index.js', 
  add: './src/add.js'
}
```

有几个入口文件就形成几个chunk，输出几个bundle文件
此时chunk的名称是 key

【特殊用法】【dll中用过】
```javascript
entry: {
  // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
  index: ['./src/index.js', './src/count.js'], 
  // 形成一个chunk，输出一个bundle文件。
  add: './src/add.js',
  react: ['react', 'react-dom', 'react-router-dom']
}
```

## 完整版demo
```javascript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'], 
    add: './src/add.js',
    react: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
};
```


# 2. output
`filename` 文件名称（指定名称+目录）
`path` 输出文件目录（将来所有资源输出的公共目录）
`publicPath` 所有资源引入公共路径前缀
`chunkFilename`非入口chunk的名称
`library`整个库向外暴露的变量名【将库暴露出去让外面引入使用】
`libraryTarget`变量名添加到哪个上

```javascript
output: {
  // 文件名称（指定名称+目录）
  filename: 'js/[name].js',
  // 输出文件目录（将来所有资源输出的公共目录）
  path: resolve(__dirname, 'build'),
  // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
  publicPath: '/',
  chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
  library: '[name]', // 整个库向外暴露的变量名
  libraryTarget: 'window' // 变量名添加到哪个上 browser
  // libraryTarget: 'global' // 变量名添加到哪个上 node
  // libraryTarget: 'commonjs'
}
```

# 3. module

```javascript
module: {
  rules: [
    // loader的配置
    {
      test: /\.css$/,
      // 多个loader用use
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.js$/,
      // 排除node_modules下的js文件
      exclude: /node_modules/,
      // 只检查 src 下的js文件
      include: resolve(__dirname, "src"),
      // 优先执行
      enforce: "pre",
      // 延后执行
      // enforce: 'post',
      // 单个loader用loader
      loader: "eslint-loader",
      options: {
  		// 配置
	  },
    },
    {
      // 以下配置只会生效一个
      oneOf: [],
    },
  ],
}
```

# 4. resolve
解析模块

```javascript
// 解析模块的规则
resolve: {
  // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
  alias: {
    $css: resolve(__dirname, "src/css"),
  },
  // 配置省略文件路径的后缀名
  extensions: [".js", ".json", ".jsx", ".css"],
  // 告诉 webpack 解析模块是去找哪个目录
  modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
}
```

# 5. dev server
【开发环境】

```javascript
devServer: {
  // 运行代码的目录
  contentBase: resolve(__dirname, "build"),
  // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
  watchContentBase: true,
  watchOptions: {
    // 忽略文件
    ignored: /node_modules/,
  },
  // 启动gzip压缩
  compress: true,
  // 端口号
  port: 5000,
  // 域名
  host: "localhost",
  // 自动打开浏览器
  open: true,
  // 开启HMR功能
  hot: true,
  // 不要显示启动服务器日志信息
  clientLogLevel: "none",
  // 除了一些基本启动信息以外，其他内容都不要显示
  quiet: true,
  // 如果出错了，不要全屏提示~
  overlay: false,
  // 服务器代理 --> 解决开发环境跨域问题
  proxy: {
    // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
    "/api": {
      target: "http://localhost:3000",
      // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        "^/api": "",
      },
    },
  },
}
```


# 6. optimization

```javascript
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
    chunkFilename: "js/[name].[contenthash:10]_chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "production",
  resolve: {
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    extensions: [".js", ".json", ".jsx", ".css"],
    modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      
      // 默认值，可以不写~
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }
      
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true,
      }),
    ],
  },
};
```

# 7. webpack5新内容

此版本重点关注以下内容:

- 通过持久缓存提高构建性能.
- 使用更好的算法和默认值来改善长期缓存.
- 通过更好的树摇和代码生成来改善捆绑包大小.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.


## 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

## Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

## Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

## Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

## Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

## SplitChunk

```js
// webpack4
minSize: 30000;
```

```js
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

## Caching

```js
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

## 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

## 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

## 更多内容

[https://github.com/webpack/changelog-v5](https://github.com/webpack/changelog-v5)
