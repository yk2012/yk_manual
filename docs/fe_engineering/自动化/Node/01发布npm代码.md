

关于 自定义JS工具类 相关类似的源码请看 [https://gitee.com/ykang2020/my_utils](https://gitee.com/ykang2020/my_utils)

对相关自定义模块进行打包发布

[【JS】自定义JS工具函数库-封装数组高级方法-unique-cancat-slice-flatten-chunk-difference-pull-drop](https://blog.csdn.net/weixin_44972008/article/details/115979796)
[【JS】自定义JS工具函数库-自定义对象方法-new-instanceof-mergeObject-实现数组与对象的深拷贝与浅拷贝-封装字符串相关函数](https://blog.csdn.net/weixin_44972008/article/details/116092535)
等相关博文

这是我的node和npm的版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425201757441.png)

# 1. 导出所有模块
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425194600660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

```javascript
// 暴露函数相关API
export { apply } from "./function/apply";
export { bind } from "./function/bind";
export { call } from "./function/call";
export { debounce } from "./function/debounce";
export { throttle } from "./function/throttle";

// 暴露数组相关API
export { chunk } from "./array/chunk";
export { concat } from "./array/concat";
export {
  map,
  reduce,
  filter,
  find,
  findIndex,
  every,
  some,
} from "./array/declares";
export { difference } from "./array/difference";
export { drop, dropRight } from "./array/drop";
export { flatten } from "./array/flatten";
export { pull, pullAll } from "./array/pull";
export { slice } from "./array/slice";
export { unique } from "./array/unique";

// 暴露对象相关API
export { clone1, clone2 } from "./object/clone";
export {
  deepClone1,
  deepClone2,
  deepClone3,
  deepClone4,
} from "./object/deepClone";
export { mergeObject } from "./object/mergeObject";
export { myInstanceOf } from "./object/myInstanceOf";
export { newInstance } from "./object/newInstance";

// 暴露字符串相关API
export { reverseString, palindrome, truncate } from "./string/reverseString";

// 暴露事件相关API
export { myAddEventListener } from "./eventBind/myAddEventListener";
export { eventBus } from "./eventBind/eventBus";
export { PubSub } from "./eventBind/myPubSub";
```
删除所有之前在模块里默认暴露的`default`关键字

# 2. 配置webpack

```javascript
const path = require("path");
module.exports = {
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 打包文件夹
    publicPath: "dist",
    // 打包文件
    filename: "yk-utils.js",
    // 设置对外暴露对象的全局名称
    library: "ykUtils",
    // 打包生成通过esm、commonjs、requirejs的语法引入
    libraryTarget: "umd",
  },
  // 配置webpack-dev-server
  devServer: {
    // 静态根目录
    contentBase: "www",
    // 端口号
    port: 8080,
  },
};
```
# 3. 打包
packjson.js

```javascript
  "scripts": {
    "dev": "webpack-dev-server",
    "build:watch": "webpack --watch"
  },
```

运行
```javascript
npm run build:watch
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425195958960.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

生成的打包文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425200033694.png)
# 4. 测试
新建一个html文件，引入打包好了js文件，进行测试

```html
  <script src="../dist/yk-utils.js"></script>
  <script>
    console.log(ykUtils.reverseString('abcdef'))
  </script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425200546349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
# 5. 改包描述文件
packjson.js
name: 必须是唯一的名称(在npm在线中央仓库中没有同名的)
main: 必须指定为打包生成的js文件
keywords: 指定一些方便别的程序员搜索到当前库的关键字

```javascript
{
  "name": "mine-own-util",
  "version": "1.0.1",
  "description": "",
  "main": "./dist/atguigu-utils.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:watch": "webpack --watch"
  },
  "keywords": [
    "atguigu",
    "utils",
    "array",
    "object",
    "function",
    "string",
    "axios",
    "event-bus",
    "pub-sub"
  ],
  "author": "yk2012",
  "license": "ISC",
  "dependencies": {
    "webpack": "^5.16.0",
    "webpack-cli": "^4.4.0"
  }
}
```
# 6. 配置npm

```javascript
npm get registry
```

查看自己npm的配置，之前有没有改成淘宝镜像
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425202019659.png)
**注意**：发布的时候npm配置的中央仓库不能是淘宝镜像

所以要执行 改回 npm官方地址

```javascript
npm config set registry https://registry.npmjs.org/
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425202237768.png)

相关博文
[【npm】npm换成cnpm](https://blog.csdn.net/weixin_44972008/article/details/114187209)

平时不用发布时可以换成淘宝镜像:

```javascript
npm config set registry http://registry.npm.taobao.org/
```
去[官网](https://www.npmjs.com/)注册一个npm账号

然后登录npm账号

```javascript
npm login
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425202644718.png)
# 7. 发布仓库


```javascript
npm publish
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425202925683.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
此时就已经上传到npm中央仓库了~

任何人都可以下载这个包了~

# 8. 测试

创建一个新文件夹

下载包
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425203249395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

可以看到已经下载下来了~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425203524427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
使用

```javascript
// 使用ESM引入
import {test} from 'yk-utils'
test()
```

```javascript
// 使用commonjs引入
const {test} = require('yk-utils')
test()
```


# 9. 更新与删除
## 更新包
内容后 修改版本号
然后重新打包
最后在重新上传即可

## 删除包
必须在72小时内, 否则不能再删除
```javascript
npm unpublish --force
```

为了不污染中央仓库，强制删除刚刚发布的包~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425204204741.png)
关于 自定义JS工具类 相关类似的源码请看 [https://gitee.com/ykang2020/my_utils](https://gitee.com/ykang2020/my_utils)