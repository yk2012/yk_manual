
# 1. 源码目录结构

```
├── /dist/ # 项目输出目录
├── /lib/ # 项目源码目录
│ ├── /adapters/ # 定义请求的适配器xhr、http
│ │ ├── http.js # 实现http 适配器(包装http 包)
│ │ └── xhr.js # 实现xhr 适配器(包装xhr 对象)
│ ├── /cancel/ # 定义取消功能
│ ├── /core/ # 一些核心功能
│ │ ├── Axios.js # axios 的核心主类
│ │ ├── dispatchRequest.js # 用来调用http 请求适配器方法发送请求的函数
│ │ ├── InterceptorManager.js # 拦截器的管理器
│ │ └── settle.js # 根据http 响应状态，改变Promise 的状态
│ ├── /helpers/ # 一些辅助方法
│ ├── axios.js # 对外暴露接口
│ ├── defaults.js # axios 的默认配置
│ └── utils.js # 公用工具
├── package.json # 项目信息
├── index.d.ts # 配置TypeScript 的声明文件
└── index.js # 入口文件
```

# 2. 源码分析
### 2.1 axios 与Axios 的关系?
1. 从语法上来说: axios 不是Axios 的实例
2. 从功能上来说: axios 是Axios 的实例
3. axios 是Axios.prototype.request 函数bind()返回的函数
4. axios 作为对象有Axios 原型对象上的所有方法, 有Axios 对象上所有属性
### 2.2 instance 与axios 的区别?
1. 相同:
(1) 都是一个能发任意请求的函数: request(config)
(2) 都有发特定请求的各种方法: get()/post()/put()/delete()
(3) 都有默认配置和拦截器的属性: defaults/interceptors
2. 不同:
(1) 默认匹配的值很可能不一样
(2) instance 没有axios 后面添加的一些方法: create()/CancelToken()/all()


### 2.3. axios 运行的整体流程?
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210302162057950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
#### 1. 整体流程:

```javascript
request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)
```

#### 2. request(config):
将请求拦截器/ dispatchRequest() / 响应拦截器通过promise 链串连起来,返回promise
#### 3. dispatchRequest(config):
转换请求数据 ===> 调用xhrAdapter()发请求 ===> 请求返回后转换响应数据. 返回promise
#### 4. xhrAdapter(config):
创建XHR 对象, 根据config 进行相应设置, 发送特定请求, 并接收响应数据,返回promise

### 2.4. axios 的请求/响应拦截器是什么?
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210302162129252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
#### 1. 请求拦截器:
在真正发送请求前执行的回调函数
可以对请求进行检查或配置进行特定处理
成功的回调函数, 传递的默认是config(也必须是)
失败的回调函数, 传递的默认是error
#### 2. 响应拦截器
在请求得到响应后执行的回调函数
可以对响应数据进行特定处理
成功的回调函数, 传递的默认是response
失败的回调函数, 传递的默认是error
### 2.5 axios 的请求/响应数据转换器是什么?
#### 1. 请求转换器
对请求头和请求体数据进行特定处理的函数

```javascript
if (utils.isObject(data)) {
setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
return JSON.stringify(data);
}
```

#### 2. 响应转换器
将响应体json 字符串解析为js 对象或数组的函数

```javascript
response.data = JSON.parse(response.data)
```

### 2.6 response 的整体结构

```javascript
{
	data,
	status,
	statusText,
	headers,
	config,
	request
}
```

### 2.7 error 的整体结构

```javascript
{
	message,
	response,
	request,
}
```

### 2.8 如何取消未完成的请求?
#### 1. 当配置了cancelToken 对象时, 保存cancel 函数
(1) 创建一个用于将来中断请求的cancelPromise
(2) 并定义了一个用于取消请求的cancel 函数
(3) 将cancel 函数传递出来
#### 2. 调用cancel()取消请求
(1) 执行cacel 函数, 传入错误信息message
(2) 内部会让cancelPromise 变为成功, 且成功的值为一个Cancel 对象
(3) 在cancelPromise 的成功回调中中断请求, 并让发请求的proimse 失败,失败的reason 为Cacel 对象