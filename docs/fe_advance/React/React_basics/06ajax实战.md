
> 今天我们使用React做一个需要发起ajax请求的小demo（github用户搜索页面），我们先使用axios实现，最后再实现一个fetch版本的。这中间我们还会在React中配置代理来解决跨域问题，还会使用消息订阅与发布模式改进我们的代码。


# 1. 理解
之前也学习过ajax和axios，可以先看看这两个笔记复习一下ajax

[【Ajax】HTTP相关问题-GET-POST-XHR使用-jQuery中的ajax-跨域-同源-jsonp-cors](https://juejin.cn/post/6999604180432191519)

[【axios】使用json-server 搭建REST API - 使用axios - 自定义axios - 取消请求 - 拦截器](https://juejin.cn/post/7015487317582299144)

React的一下基础知识笔记可以看这个专栏 https://juejin.cn/column/7015187939386736647

## 1.1. 前置说明
1.	`React`本身只关注于界面, 并不包含发送`ajax`请求的代码
2.	前端应用需要通过`ajax`请求与后台进行交互(`json`数据)
3.	`React`应用中需要集成第三方`ajax`库(或自己封装)
## 1.2. 常用的ajax请求库
1.	`jQuery`: 比较重, 如果需要另外引入不建议使用
2.	`axios`: 轻量级, 建议使用
	1. 封装`XmlHttpRequest`对象的`ajax`
	2.	`promise`风格
	3. 可以用在浏览器端和node服务器端
# 2. axios
安装`npm install axios`

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee392e080c74515a9547fcd36ce7277~tplv-k3u1fbpfcp-zoom-1.image)

## 2.1. 文档
[https://github.com/axios/axios](https://github.com/axios/axios)

## 2.2. 相关API
更多细节可以参考这个笔记的内容
[【axios】使用json-server 搭建REST API - 使用axios - 自定义axios - 取消请求 - 拦截器](https://blog.csdn.net/weixin_44972008/article/details/114368528)

# 3. React中配置代理解决跨域问题
## 3.1 配置代理方法
解决跨域问题，在React开启中间代理

在项目中的package.json中，最后加上一行`"proxy": "http://loaclhost:5000"` 写到端口号

然后重启脚手架

再次发送请求的时候就直接写自己的3000端口

3000端口有的资源直接请求3000端口的，3000端口没有的资源就请求代理设置的5000端口

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）




## 3.2 配置多个代理方法
配置多个代理，不在 package.json 配置

1. 第一步：创建代理配置文件
```
在src下创建配置文件：src/setupProxy.js
```

2. 编写setupProxy.js配置具体代理规则：
```javascript
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    proxy('/api2', { 
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''}
    })
  )
}
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。


# 4. 案例—github用户搜索
之前用Vue也做过这个案例，可以对比着学习
[【Vue】高级系列（七）Vue-cli配置代理 - Ajax实战-demo3-GitHub用户查询-axios-pubsub](https://blog.csdn.net/weixin_44972008/article/details/113992327)

## 4.1 效果
请求地址: https://api.github.com/search/users?q=xxxxxx
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17bce649e774e089e6b423830c2a28e~tplv-k3u1fbpfcp-zoom-1.image)

## 4.2 React 实现
### 4.2.1 静态页面拆分实现
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b55a62b219e14aebb797624bda0d0aa6~tplv-k3u1fbpfcp-zoom-1.image)
#### App.jsx

```javascript
import React, { Component } from 'react'
import Search from './Search'
import Users from './Users'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <Users />
    </div>
    )
  }
}
```

#### Search/index.js

```javascript
import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
          <input type="text" placeholder="请输入你要搜索的用户名" />&nbsp;
          <button>搜索</button>
      </div>
      </section>
    )
  }
}
```

#### User/index.jsx

```javascript
import React, { Component } from 'react'
import './index.css'

export default class Users extends Component {
  render() {
    return (
      <div className="row">
        <div className="card">
          <a rel="noreferrer" href="https://github.com/reactjs" target="_blank">
              <img alt="avatar" src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{ 'width': '100px' }}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
        <div className="card">
          <a rel="noreferrer" href="https://github.com/reactjs" target="_blank">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{ 'width': '100px' }}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
        <div className="card">
          <a rel="noreferrer" href="https://github.com/reactjs" target="_blank">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{ 'width': '100px' }}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
        <div className="card">
          <a rel="noreferrer" href="https://github.com/reactjs" target="_blank">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{ 'width': '100px' }}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
        <div className="card">
          <a rel="noreferrer" href="https://github.com/reactjs" target="_blank">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{ 'width': '100px' }}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
      </div>
    )
  }
}
```

#### User/index.css

```css
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73fe54e206984d59bc9cb78b284f97b3~tplv-k3u1fbpfcp-zoom-1.image)

### 4.2.2 动态交互实现
由于github访问失败，可以伪造一个服务器返回一些固定的结果，让用户体验更佳
使用express搭建一个服务器
#### serve.js
```javascript
const express = require("express")
const axios = require("axios")
const app = express()


/*
  请求地址： http://localhost:3000/search/users?q=aa

  后台路由
    key： /search/users
    value： function () {}
*/
app.get("/search/users", function (req, res) {
  const {q} = req.query
  axios({
    url: 'https://api.github.com/search/users',
    params: {q}
  }).then(response => {
    res.json(response.data)
  })
})

app.get("/search/users2", function (req, res) {
  res.json({
    items: [
      {
        login: "yyx990803",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
        id: 1,
      },
      {
        login: "ruanyf",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
        id: 2,
      },
      {
        login: "yyx9908032",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
        id: 3,
      },
      {
        login: "ruanyf2",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
        id: 4,
      },
      {
        login: "yyx9908033",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
        id: 5,
      },
      {
        login: "ruanyf3",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
        id: 6,
      },
      {
        login: "yyx9908034",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
        id: 7,
      },
      {
        login: "ruanyf4",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
        id: 8,
      },
      {
        login: "yyx9908035",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
        id: 9,
      },
    ],
  });
});



app.listen(5000, "localhost", (err) => {
  if (!err){
  	console.log("服务器启动成功")
  	console.log("请求github真实数据请访问：http://localhost:5000/search/users")
  	console.log("请求本地模拟数据请访问：http://localhost:5000/search/users2")
  } 
  else console.log(err);
})
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0742476849f249b3becb14855418d8c7~tplv-k3u1fbpfcp-zoom-1.image)
#### src/setupProxy.js
设置代理服务器解决跨域问题src/setupProxy.js

```javascript
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  )
}
```


#### 【补充】连续解构赋值

```javascript
let obj = {a:{b:{c:1}}}
console.log(a.b.c) // 1
const {a:{b:{c}}} = obj
console.log(c) // 1

let obj2 = {a:{b:1}}
const {a:{b:data}} = obj2 // 重命名
console.log(data) // 1
```

#### App.jsx
将状态数据定义在App中
操作状态的方法放在App中

```javascript
export default class App extends Component {
  state = {
    users: []
  }
  saveUsers = (users) => {
    this.setState({ users })
  }
  render() {
    const {users} = this.state
    return (
      <div className="container">
        <Search saveUsers={this.saveUsers} />
        <Users users={users} />
    </div>
    )
  }
}
```

#### Search/index/jsx

```javascript
export default class Search extends Component {
  search = () => {
    // 获取用户输入(连续解构赋值+重命名)
    const {keyWordElement: {value: keyWord}} = this
    // console.log(keyWord)
    // 发送网络请求
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        console.log('成功')
        this.props.saveUsers(response.data.items)
      },
      error => {console.log('失败',error)}
    )
  }
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="请输入你要搜索的用户名" />&nbsp;
          <button onClick={this.search}>搜索</button>
      </div>
      </section>
    )
  }
}
```

#### Users/index.jsx

```javascript
export default class Users extends Component {
  render() {
    return (
      <div className="row">
        {
          this.props.users.map((userObj) => {
            return (
              <div key={userObj.id} className="card">
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                    <img alt="avatar" src={userObj.avatar_url} style={{ 'width': '100px' }}/>
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
```

#### 效果展示
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d9e19198ffd41f38306bb8c44009632~tplv-k3u1fbpfcp-zoom-1.image)

### 4.2.3 优化用户体验
在Users组件中，应该不止只有用户列表页面，应该还有
1. 欢迎使用界面【第一次打开页面】
2. 搜索加载页面【点击按钮发送请求和接收到响应之间显示】
3. 搜索失败页面【请求失败显示】

有四种不同的显示，那就需要不同的状态state来控制

```javascript
// 初始化状态
state = { 
  users: [], // users初始值
  isFirst: true, // 是否第一次打开页面
  isLoading: false, // 标识是否处于加载中
  err:'' // 请求失败的消息
}
```

#### App.jsx

```javascript
export default class App extends Component {
  // 初始化状态
  state = { 
    users: [], // users初始值
    isFirst: true, // 是否第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err:'' // 请求失败的消息
  }
  // saveUsers = (users) => {
  //   this.setState({ users })
  // }
  // 更新App的state
  updateAppState = (stateObj) => {
    this.setState(stateObj)
  }
  render() {
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState} />
        <Users {...this.state} />
    </div>
    )
  }
}
```


#### Search/index/jsx

```javascript
export default class Search extends Component {
  search = () => {
    // 获取用户输入(连续解构赋值+重命名)
    const {keyWordElement: {value: keyWord}} = this
    // console.log(keyWord)
    // 发送请求前通知App更新状态
    this.props.updateAppState({
      isFirst: false,
      isLoading: true
    })
    // 发送网络请求
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        // console.log('成功')
        // 请求成功，通知App更新状态
        this.props.updateAppState({isLoading: false, users: response.data.items})
        // this.props.saveUsers(response.data.items)
      },
      error => {
        // console.log('失败', error)
        // 请求失败，通知App更新状态
        this.props.updateAppState({isLoading: false, err: error.message})
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="请输入你要搜索的用户名" />&nbsp;
          <button onClick={this.search}>搜索</button>
      </div>
      </section>
    )
  }
}
```



#### Users/index.jsx

```javascript
export default class Users extends Component {
  render() {
    const {users, isFirst, isLoading, err} = this.props
    return (
      <div className="row">
        {
          isFirst ? <h2>欢迎使用，请输入关键字，随后点击搜索</h2> :
          isLoading ? <h2>Loading...</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> :
          users.map((userObj) => {
            return (
              <div key={userObj.id} className="card">
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                    <img alt="avatar" src={userObj.avatar_url} style={{ 'width': '100px' }}/>
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
```




#### 效果展示
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e02b3c0efdf74899b2038f182d411aed~tplv-k3u1fbpfcp-zoom-1.image)

# 5. 消息订阅-发布机制
> 前面案例中，兄弟组件之间的通信总是要借助父组件才行
> 现在介绍消息订阅-发布机制来进行兄弟组件之间通信
## 介绍PubSubJS库

[https://github.com/mroderick/PubSubJS](https://github.com/mroderick/PubSubJS)

1.	工具库: PubSubJS
2.	下载: `npm install pubsub-js`
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08e17775a0844f719cd4b9750a523212~tplv-k3u1fbpfcp-zoom-1.image)
3.	使用
在【接收】数据的组件中【订阅】消息

```javascript
import PubSub from 'pubsub-js' //引入
PubSub.subscribe('delete', function(data){ }); // 订阅
PubSub.publish('delete', data) // 发布消息 携带数据
```
## 在案例中使用
Users组件【接收】数据，所以Users组件【订阅】消息
Search组件 将数据发送出去，【发布】消息

### App.js
```javascript
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <Users />
    </div>
    )
  }
}
```

### Users/index.jsx
User组件中用状态数据state，状态定义在这里，在这里订阅消息
Search组件改变状态数据，在这里发布消息


```javascript
export default class Users extends Component {
  // 初始化状态
  state = { 
    users: [], // users初始值
    isFirst: true, // 是否第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err:'' // 请求失败的消息
  }
  componentDidMount() {
    // 订阅消息
    PubSub.subscribe('ykyk', (_, data) => {
      this.setState(data)
    })
  }
  render() {
    const {users, isFirst, isLoading, err} = this.state
    return (
      <div className="row">
        {
          isFirst ? <h2>欢迎使用，请输入关键字，随后点击搜索</h2> :
          isLoading ? <h2>Loading...</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> :
          users.map((userObj) => {
            return (
              <div key={userObj.id} className="card">
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                    <img alt="avatar" src={userObj.avatar_url} style={{ 'width': '100px' }}/>
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
```

### Search/index.jsx
Search组件改变状态数据，在这里发布消息【一改变状态，就发布消息】

```javascript
export default class Search extends Component {
  search = () => {
    const {keyWordElement: {value: keyWord}} = this
    // 发送请求前通知Users更新状态
    // this.props.updateAppState({isFirst: false,isLoading: true})
    PubSub.publish('ykyk', {isFirst: false,isLoading: true})
    // 发送网络请求
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        // 请求成功，通知Users更新状态
        PubSub.publish('ykyk', {isLoading: false, users: response.data.items})
        // this.props.updateAppState({isLoading: false, users: response.data.items})
      },
      error => {
        // 请求失败，通知Users更新状态
        PubSub.publish('ykyk', {isLoading: false, err: error.message})
        // this.props.updateAppState({isLoading: false, err: error.message})
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="请输入你要搜索的用户名" />&nbsp;
          <button onClick={this.search}>搜索</button>
      </div>
      </section>
    )
  }
}
```

# 6. Fetch
axios在前端是对xhr的封装
而Fetch是内置的网络请求方法，不需要单独下载安装

## 6.1 文档
1.	[https://github.github.io/fetch/](https://github.github.io/fetch/)
3.	[【相关博文】传统 Ajax 已死，Fetch 永生](https://segmentfault.com/a/1190000003810652)

## 6.2 特点
1.	fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求
2.	老版本浏览器可能不支持

## 6.3 实例演示
### Search/index.jsx
优化前

```javascript
export default class Search extends Component {
	search = async()=>{
		//获取用户的输入(连续解构赋值+重命名)
		const {keyWordElement:{value:keyWord}} = this
		//发送请求前通知List更新状态
		PubSub.publish('ykyk',{isFirst:false,isLoading:true})
		
		//发送网络请求---使用fetch发送（未优化）
		fetch(`/api1/search/users2?q=${keyWord}`).then(
			response => {
				console.log('联系服务器成功了');
				return response.json()
			},
			error => {
				console.log('联系服务器失败了',error);
				return new Promise(()=>{})
			}
		).then(
			response => {console.log('获取数据成功了',response);},
			error => {console.log('获取数据失败了',error);}
		)
	}
}
```

优化后
```javascript
export default class Search extends Component {
	search = async()=>{
		//获取用户的输入(连续解构赋值+重命名)
		const {keyWordElement:{value:keyWord}} = this
		//发送请求前通知List更新状态
		PubSub.publish('ykyk',{isFirst:false,isLoading:true})

		//发送网络请求---使用fetch发送（优化）
		try {
			const response = await fetch(`/api1/search/users2?q=${keyWord}`)
			const data = await response.json()
			// console.log(data);
			PubSub.publish('ykyk',{isLoading:false, users:data.items})
		} catch (error) {
			// console.log('请求出错',error);
			PubSub.publish('ykyk',{isLoading:false, err:error.message})
		}
	}
}
```

# 7. 总结

1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。

2. ES6小知识点：解构赋值+重命名

```javascript
let obj = {a:{b:1}}
const {a} = obj; //传统解构赋值
const {a:{b}} = obj; //连续解构赋值
const {a:{b:value}} = obj; //连续解构赋值+重命名
```

3. 消息订阅与发布机制
	1. 先订阅，再发布（理解：有一种隔空对话的感觉）
	2. 适用于任意组件间通信
	3. 要在组件的componentWillUnmount中取消订阅
4. fetch发送请求（关注分离的设计思想）

```javascript
try {
	const response= await fetch(`/api1/search/users2?q=${keyWord}`)
	const data = await response.json()
	console.log(data);
} catch (error) {
	console.log('请求出错',error);
}
```
