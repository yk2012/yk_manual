# webpack5 入门 实战 源码

## 入门

### 基本配置

webpack.config.js
```js
// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
```
### 处理样式资源






### 处理图片资源


### 修改输出资源路径和名称


### 自动清空上次打包资源


### 处理字体图标资源


### 处理其他资源


### 处理js资源


### 处理html资源


### 开发服务器&自动化


### 生产模式


### CSS处理


### HTML压缩



## 实战



## 原理


