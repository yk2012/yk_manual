
# 1. 自己创建一个API
## 1.1 API 的分类
1. REST API: restful （Representational State Transfer (资源)表现层状态转化）
(1) 发送请求进行CRUD 哪个操作由请求方式来决定
(2) 同一个请求路径可以进行多个操作
(3) 请求方式会用到GET/POST/PUT/DELETE
2. 非REST API: restless
(1) 请求方式不决定请求的CRUD 操作
(2) 一个请求路径只对应一个操作
(3) 一般只有GET/POST

## 1.2 使用json-server 搭建REST API
### 1.2.1 json-server 是什么?
用来快速搭建REST API 的工具包
### 1.2.2 使用json-server
1. [在线文档: https://github.com/typicode/json-server](https://github.com/typicode/json-server)
2. 下载: `npm install -g json-server`
3. 目标根目录下创建数据库 json 文件: `db.json`

```javascript
{
	"posts": [
		{ "id": 1, "title": "json-server", "author": "typicode" },
		{ "id": 2, "title": "json-server2", "author": "typicode" }
	],
	"comments": [
		{ "id": 1, "body": "some comment", "postId": 1 }
	],
	"profile": { "name": "typicode" }
}
```

4. 启动服务器执行命令: `json-server --watch db.json`
### 1.2.3 使用浏览器访问测试
http://localhost:3000/posts
http://localhost:3000/posts/1
### 1.2.4 使用axios 访问测试
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>
    <button onclick="testGet()">GET请求</button>
    <button onclick="testPost()">POST请求</button>
    <button onclick="testPut()">PUT请求</button>
    <button onclick="testDelete()">DELETE请求</button>
  </div>

  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>
  <script>
    function testGet() {
      axios.get('http://localhost:3000/posts') // 返回一个数组，数组里有两个对象
      // axios.get('http://localhost:3000/posts/1') // 返回一个对象
      // axios.get('http://localhost:3000/posts?id=1') // 返回一个数组，数组里有一个对象
      .then(response => {
        console.log('/posts get', response.data)
      })
    }

    function testPost() { // 添加数据
      axios.post('http://localhost:3000/posts', {"title": "json-server3", "author": "typicode" })
      .then(response => {
        console.log('/posts put', response.data)
      })
    }

    function testPut() { // 更新数据
      axios.put('http://localhost:3000/posts/3', {"title": "json-server_put", "author": "typicode" })
      .then(response => {
        console.log('/posts post', response.data)
      })
    }

    function testDelete() { // 删除数据
      axios.delete('http://localhost:3000/posts/3')
      .then(response => {
        console.log('/posts delete', response.data)
      })
    }
  </script>
</body>
</html>
```


# 2. XHR 的 ajax 封装 (简单版axios)
## 2.1 特点
1. 函数的返回值为`promise`, 成功的结果为`response`, 失败的结果为`error`
2. 能处理多种类型的请求: GET/POST/PUT/DELETE
3. 函数的参数为一个配置对象

```javascript
{
	url: '', // 请求地址
	method: '', // 请求方式GET/POST/PUT/DELETE
	params: {}, // GET/DELETE 请求的 query 参数
	data: {}, // POST/PUT 请求的请求体参数
}
```

4. 响应 json数据 自动解析为 js的对象/数组


## 2.2 编码实现

```javascript
function axios({
  url,
  method='GET',
  params={},
  data={}
}){
  // 返回一个promise对象
  return new Promise((resolve, reject) => {

    // 处理method 转大写
    method = method.toUpperCase();

    // 处理 query参数（拼接到url上）id=1&xxx=abc
    let queryString = '';
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    });
    if(queryString){
      // 去除最后的'&'
      queryString = queryString.substring(0, queryString.length-1)
      // 接到url
      url += '?' + queryString
    }

    // 1. 执行异步Ajax请求
    // 创建xhr对象
    const request = new XMLHttpRequest();
    // 打开连接（初始化请求，没有请求）
    request.open(method, url, true);
    // 发送请求
    if(method === 'GET' || method === 'DELETE'){
      request.send()// undefined
    } else if (method === 'POST' || method === 'PUT'){
      // 设置请求头，告诉服务器请求体的格式是json
      request.setRequestHeader('Content-Type', 'appliaction/json;charset=utf-8'); 
      // 发送json格式请求参数
      request.send(JSON.stringify(data)); // 异步执行
    }
    
    // 绑定状态改变的监听
    request.onreadystatechange = function() { // 同步执行
      // 如果请求没有完成，直接结束
      if (request.readyState !== 4) {
        return;
      }
      // 如果响应状态码在[200, 300)之间代表成功，否则失败
      const {status, statusText} = request
      if( status>= 200 && status<=299) {// 2.1 如果请求成功，调用resolve()
        // 准备结果数据对象response
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText
        };
        resolve(response);
      } else {// 2.2 如果请求失败，调用reject()
        reject(new Error('request error status is ' + status));
      }
    }
  })
}
```
## 2.3 使用测试
```javascript
// 1. GET请求：从服务器端获取数据
function testGet() {
  axios({
    url: 'http://localhost:3000/posts',
    method: 'GET',
    params:{
      id: 1,
      xxx: 'abc'
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}

// 2. POST请求：向服务器端添加数据
function testPost() {
  axios({
    url: 'http://localhost:3000/posts',
    method: 'POST',
    data: {
      "title": "json-server_post",
      "author": "typicode_post"
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}
// 3. PUT请求：服务器更新数据
function testPut() {
  axios({
    url: 'http://localhost:3000/posts/1',
    method: 'PUT',
    data: {
      "title": "json-server_put",
      "author": "typicode_put"
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}

// 3. DELETE请求：服务器删除数据
function testDelete() {
  axios({
    url: 'http://localhost:3000/posts/2',
    method: 'delete'
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}
```

# 3 axios 的理解和使用
## 3.1 axios 是什么?
1. 前端最流行的 ajax请求库
2. react/vue 官方都推荐使用 axios 发ajax 请求
3. [文档: https://github.com/axios/axios](https://github.com/axios/axios)

## 3.2 axios 特点
1. 基于 xhr + promise 的异步 ajax请求库
2. 浏览器端/node 端都可以使用
3. 支持请求／响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

## 3.3 axios 常用语法
`axios(config)`: 通用/最本质的发任意类型请求的方式
`axios(url[, config])`: 可以只指定url 发get 请求
`axios.request(config)`: 等同于axios(config)
`axios.get(url[, config])`: 发get 请求
`axios.delete(url[, config])`: 发delete 请求
`axios.post(url[, data, config])`: 发post 请求
`axios.put(url[, data, config])`: 发put 请求

`axios.defaults.xxx`: 请求的默认全局配置（method\baseURL\params\timeout...）
`axios.interceptors.request.use()`: 添加请求拦截器
`axios.interceptors.response.use()`: 添加响应拦截器

`axios.create([config])`: 创建一个新的axios(它没有下面的功能)

`axios.Cancel()`: 用于创建取消请求的错误对象
`axios.CancelToken()`: 用于创建取消请求的 token 对象
`axios.isCancel()`: 是否是一个取消请求的错误
`axios.all(promises)`: 用于批量执行多个异步请求
`axios.spread()`: 用来指定接收所有成功数据的回调函数的方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304172721643.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)

## 3.4 难点语法的理解和使用
### 3.4.1 `axios.create(config)`
1. 根据指定配置创建一个新的 axios, 也就是每个新 axios 都有自己的配置
2. 新 axios 只是没有**取消请求**和**批量发请求**的方法, 其它所有语法都是一致的
3. 为什么要设计这个语法?
(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理（比如有多个baseURL需要指定）
(2) 解决: 创建2 个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中

```javascript
const instance = axios.create({ // instance是函数类型
	baseURL: 'http://localhost:3000'
})
// 使用instance发Ajax请求
instance({
	url: '/posts'
})
instance.get('/posts')
```

### 3.4.2 拦截器函数/ajax 请求/请求的回调函数的调用顺序
1. 说明: 调用`axios()`并不是立即发送ajax 请求, 而是需要经历一个较长的流程
2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax 请求 => 响应拦截器1 => 响应拦截器2 => 请求的回调
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是`config`, 响应拦截器传递的是`response`

```javascript
// 添加两个请求拦截器(回调函数)
axios.interceptors.request.use(
  config => {
    console.log('request interceptor1 onResolved()') // -----------2
    return config
  },
  error => {
    console.log('request interceptor1 onRejected()')
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  config => {
    console.log('request interceptor2 onResolved()') // -----------1
    return config
  },
  error => {
    console.log('request interceptor2 onRejected()')
    return Promise.reject(error)
  }
)

// 添加两个响应拦截器
axios.interceptors.response.use(
  resopnse => {
    console.log('response interceptor1 onResolved()') // -----------3
    return resopnse
  },
  error => {
    console.log('response interceptor1 onRejected()')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  resopnse => {
    console.log('response interceptor2 onResolved()') // -----------4
    return resopnse
  },
  error => {
    console.log('response interceptor2 onRejected()')
    return Promise.reject(error)
  }
)

axios.get('http://localhost:3000/posts')
  .then(response => {
    console.log('data', response.data) //data Array(4) -------------5
  })
  .catch(error => {
    cosole.log('error', error.message)
  })

// request interceptor2 onResolved()
// request interceptor1 onResolved()
// response interceptor1 onResolved()
// response interceptor2 onResolved()
// data Array(4)
```


### 3.4.3 取消请求
#### 1. 基本流程
1. 配置 `cancelToken` 对象
2. 缓存用于取消请求的 `cancel` 函数
3. 在后面特定时机调用 `cancel` 函数取消请求
4. 在错误回调中判断如果 `error` 是 `cancel`, 做相应处理
#### 2. 实现功能
用express先搭建一个有延迟的服务器

```javascript
const express = require('express')
const cors = require('cors')

const app = express()

// 使用cors, 允许跨域
app.use(cors())
// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded())
// 能解析json格式的请求体参数
app.use(express.json())

app.get('/products1', (req, res) => {
  
  setTimeout(() => {
    res.send([
      {id: 1, name: 'product1.1'},
      {id: 2, name: 'product1.2'},
      {id: 3, name: 'product1.3'}
    ])
  }, 1000 + Math.random()*2000);
  
})

app.get('/products2', (req, res) => {

  setTimeout(() => {
    res.send([{
        id: 1,
        name: 'product2.1'
      },
      {
        id: 2,
        name: 'product2.2'
      },
      {
        id: 3,
        name: 'product2.3'
      }
    ])
  }, 1000 + Math.random() * 2000);

})

app.listen(4000, () => {
  console.log('server app start on port 4000')
})

```
1. 点击按钮, 取消某个正在请求中的请求

```javascript
let cancel // 用于保存取消请求的函数
function getProducts1() {
  axios({
    url: 'http://localhost:4000/products1',
    cancelToken: new axios.CancelToken(function executor(c){ // c是用于取消当前请求的函数
      // 保存取消函数，用于之后可能需要取消当前请求
      cancel = c;
    })
  }).then(
    response => {
      cancel = null
      console.log('请求1成功了', response.data)
    },
    error => {
      cancel = null
      console.log('请求1失败了', error.message, error) // 请求1失败了 强制取消请求 Cancel {message: "强制取消请求"}
    }
  )

}

function getProducts2() {
  axios({
      url: 'http://localhost:4000/products2'
  }).then(
    response => {
      console.log('请求2成功了', response.data)
    }
  )
}

function cancelReq() {
  // alert('取消请求')
  // 执行取消请求的函数
  if (typeof cancel === 'function'){
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210305230614497.gif#pic_center)





2. 在请求一个接口前, 取消前面一个未完成的请求

```javascript
let cancel // 用于保存取消请求的函数
function getProducts1() {
  // 在准备发请求前，取消未完成的请求
  if (typeof cancel === 'function'){
    cancel('取消请求')
  }
  axios({
    url: 'http://localhost:4000/products1',
    cancelToken: new axios.CancelToken(function executor(c){ // c是用于取消当前请求的函数
      // 保存取消函数，用于之后可能需要取消当前请求
      cancel = c;
    })
  }).then(
    response => {

      cancel = null
      console.log('请求1成功了', response.data)
    },
    error => {
      if (axios.isCancel(error)){
        console.log('请求1取消的错误', error.message)
      }else{ // 请求出错了
        cancel = null
        console.log('请求1失败了', error.message, error) // 请求1失败了 强制取消请求 Cancel {message: "强制取消请求"}
      }
    }
  )

}

function getProducts2() {
// 在准备发请求前，取消未完成的请求
  if (typeof cancel === 'function'){
    cancel('取消请求')
  }
  axios({
      url: 'http://localhost:4000/products2',
      cancelToken: new axios.CancelToken(function executor(c){ 
      cancel = c;
    })
  }).then(
    response => {
      cancel = null
      console.log('请求2成功了', response.data)
    },
    error => {
      if (axios.isCancel(error)){
        console.log('请求2取消的错误', error.message)
      }else{ 
        cancel = null
        console.log('请求2失败了', error.message, error) 
      }
    }
  )
}
function cancelReq() {
  // alert('取消请求')
  // 执行取消请求的函数
  if (typeof cancel === 'function'){
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210305231032109.gif#pic_center)
#### 使用拦截器改进代码，减少重复代码

```javascript
// 添加请求拦截器
axios.interceptors.request.use((config) => { // 只写一个成功的回调
  // 在准备发请求前，取消未完成的请求
  if (typeof cancel === 'function'){
    cancel('取消请求')
  }
  // 添加一个cancelToken的配置
  config.cancelToken = new axios.CancelToken(function executor(c){ // c是用于取消当前请求的函数
      // 保存取消函数，用于之后可能需要取消当前请求
      cancel = c;
    })
    return config
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => { // 成功的回调
    cancel = null 
    return response
  },
  error => { // 失败的回调
    if (axios.isCancel(error)){ // 请求取消的错误
        console.log('请求取消的错误', error.message)
        // 中断promise链
        return new Promise(() => {})
    }else{ // 请求出错了
      cancel = null 
      // 将错误向下传递 
      // throw error
      return Promise.reject(error)
    }
  }
)

let cancel // 用于保存取消请求的函数
function getProducts1() {
  axios({
    url: 'http://localhost:4000/products1'
  }).then(
    response => {
      console.log('请求1成功了', response.data)
    },
    error => { // 只用处理请求失败的情况，取消请求的错误不用处理
      console.log('请求1失败了', error.message, error) 
    }
  )
}

function getProducts2() {
  axios({
      url: 'http://localhost:4000/products2'
  }).then(
    response => {
      console.log('请求2成功了', response.data)
    },
    error => {
      console.log('请求2失败了', error.message, error) 
    }
  )
}
function cancelReq() {
  if (typeof cancel === 'function'){
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```




