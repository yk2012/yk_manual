
# 1. redux理解
## 1.1. 相关文档

中文文档: [http://www.redux.org.cn/](http://www.redux.org.cn/)

Github: [https://github.com/reactjs/redux](https://github.com/reactjs/redux)

先把它装上

```shell
npm i redux
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db19ad1cc3ab4def9de13fb4eb35d6f9~tplv-k3u1fbpfcp-zoom-1.image)

## 1.2. redux是什么

之前学过vuex，这两个差不多，都是**状态管理**用的

[【Vue】Vuex管理状态入门到实战 - 计数器demo - todoList项目 - 组件间共享数据 - State - Mutation - Action - Getter](https://blog.csdn.net/weixin_44972008/article/details/115427489)

[【Vue】vuex - 状态自管理应用 - state - view - actions](https://blog.csdn.net/weixin_44972008/article/details/113921381)

1.	redux是一个专门用于做`状态管理`的JS库(不是react插件库)。
2.	可以用在react, angular, vue等项目中, 但基本与react配合使用。
3.	作用: 集中式管理react应用中多个组件`共享`的状态。

## 1.3. 什么情况下需要使用redux

1.	某个组件的状态，需要让其他组件可以随时拿到（共享）
2.	一个组件需要改变另一个组件的状态（通信）
3.	总体原则：能不用就不用, 如果不用比较吃力才考虑使用


## 1.4. redux工作流程

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae7911876fb44dc19d2afd2e34b546cf~tplv-k3u1fbpfcp-zoom-1.image)

# 2. redux的三个核心概念

## 2.1. action

1.	动作的**对象**
2.	包含 2 个属性
	- `type`：标识属性, 值为字符串, 唯一, 必要属性
	- `data`：数据属性, 值类型任意, 可选属性
3.	例子：`{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }`

## 2.2. reducer

1.	用于初始化状态、加工状态
2.	加工时，根据旧的`state`和`action`， 产生新的`state`的纯**函数**

```js
function Reducer(state=0, action){
  const { type } = action
  if(type === 'INCREMENT'){
    return state + 1
  }else{
    return state
  }
}
```

## 2.3. store

1.	将`state`、`action`、`reducer`联系在一起的**对象**

2.	如何得到此对象?

```js
import { createStore } from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
```

3.	此对象的功能?

	1) 获取状态：	`getState()`: 得到 `state`
	2) 修改状态：	`dispatch(action)`: 分发`action`, 触发`reducer`调用, 产生新的`state`
	3) 更新视图：	`subscribe(listener)`: 注册监听, 当产生了新的`state`时, 自动调用，在这里调用`render()`就可以重新渲染视图

## 2.4 总体流程

1. 定义reducer
2. 基于reducer创建store
3. 获取store状态 `getState()`
4. 更新store状态 `dispatch()`
5. 检测store中state的变换，驱动视图更新`subscribe()`


# 3. API

## 3.1. `createStore()`

作用：创建包含指定 `reducer` 的 `store` 对象

```js
const store = createStore(reducer)
```

## 3.2. store对象

1.	作用: `redux`库最核心的管理对象
2.	它内部维护着:
	1)	`state`
	2)	`reducer`
3.	核心方法:
	1)	`getState()`
	2)	`dispatch(action)`
	3)	`subscribe(listener)`
4.	具体编码:
	1)	`store.getState()`
	2)	`store.dispatch({type:'INCREMENT', number})`
	3)	`store.subscribe(render)`


## 3.3. `applyMiddleware()`

作用：应用上基于`redux`的中间件(插件库)


## 3.4. `combineReducers()`

作用：合并多个`reducer`函数


# 4. 使用redux编写应用

## 4.1 效果

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e922a62799a74d45b57a40282e65ce97~tplv-k3u1fbpfcp-zoom-1.image)

## 4.2 实现

### redux/store.js

> 该文件专门用于暴露一个store对象，整个应用只有一个store对象

```javascript
// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore } from "redux";
// 引入为Count组件服务的reducer
import countReducer from "./count_reducer.js";
// 暴露store
export default createStore(countReducer);
```
### redux/count_reducer.js

> 该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
> reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)

```javascript
import {INCREMENT,DECREMENT} from './constant'

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
  // console.log(preState);
  //从action对象中获取：type、data
  const {type,data} = action
  //根据type决定如何加工数据
  switch (type) {
    case INCREMENT: //如果是加
      return preState + data
    case DECREMENT: //若果是减
      return preState - data
    default:
      return preState
  }
}
```


### redux/count_action.js

> 该文件专门为Count组件生成action对象

```javascript
import {INCREMENT,DECREMENT} from './constant'

export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})
```

### redux/constant.js

> 该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错

```javascript
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

### Count/index.jsx

```javascript
import React, { Component } from 'react'
//引入store，用于获取redux中保存状态
import store from '../../redux/store'
//引入actionCreator，专门用于创建action对象
import {createIncrementAction,createDecrementAction} from '../../redux/count_action'

export default class Count extends Component {

  /* componentDidMount(){
    //检测redux中状态的变化，只要变化，就调用render
    store.subscribe(()=>{
      this.setState({})
    })
  } */

  //加法
  increment = ()=>{
    const {value} = this.selectNumber
    store.dispatch(createIncrementAction(value*1))
  }
  //减法
  decrement = ()=>{
    const {value} = this.selectNumber
    store.dispatch(createDecrementAction(value*1))
  }
  //奇数再加
  incrementIfOdd = ()=>{
    const {value} = this.selectNumber
    const count = store.getState()
    if(count % 2 !== 0){
      store.dispatch(createIncrementAction(value*1))
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.selectNumber
    setTimeout(()=>{
      store.dispatch(createIncrementAction(value*1))
    },500)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}
```

### index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App/>,document.getElementById('root'))

// 监测redux中状态的改变，如redux的状态发生了改变，那么重新渲染App组件
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```
## 4.3 总结

1. store.js：
	1). 引入redux中的createStore函数，创建一个store
	2). createStore调用时要传入一个为其服务的reducer
	3). 记得暴露store对象

2. count_reducer.js：
	1. reducer的本质是一个函数，接收：`preState`,`action`，返回加工后的状态
	2. reducer有两个作用：初始化状态，加工状态
	3. reducer被第一次调用时，是store自动触发的，
			传递的preState是`undefined`,
			传递的action是:`{type:'@@REDUX/INIT_a.2.b.4}`

3. 在index.js中监测store中状态的改变，一旦发生改变重新渲染`<App/>`
		备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

完整版新增文件：

1. count_action.js 专门用于创建action对象
2. constant.js 放置容易写错的type值

# 5. redux异步编程

## 5.1理解

1.	redux默认是不能进行异步处理的, 
2.	某些时候应用中需要在redux中执行异步任务(ajax, 定时器)

## 5.2. 使用异步中间件

```powershell
npm install redux-thunk
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5d0b56045c9488b9ba34d8ab467d1be~tplv-k3u1fbpfcp-zoom-1.image)

### count_action.js

> 该模块专门为Count组件生成action对象

异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的

```javascript
import {INCREMENT,DECREMENT} from './constant'

//同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的
export const createIncrementAsyncAction = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(createIncrementAction(data))
		},time)
	}
}
```

### store.js

> 该模块专门用于暴露一个store对象，整个应用只有一个store对象

在这里引入中间件

```javascript
//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```
	
## 5.3 总结

1. 明确：延迟的动作不想交给组件自身，想交给action
2. 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
3. 具体编码：
	1. npm install redux-thunk，并配置在store中
	2. 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
	3. 异步任务有结果后，分发一个同步的action去真正操作数据。
 4. 备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。


# 6. react-redux

## 6.1. 理解

1.	一个React插件库
2.	专门用来简化React应用中使用redux

## 6.2. react-redux将所有组件分成两大类

1.	UI组件
	1)	只负责 UI 的呈现，不带有任何业务逻辑
	2)	通过props接收数据(一般数据和函数)
	3)	不使用任何 Redux 的 API
	4)	一般保存在components文件夹下

2.	容器组件
	1)	负责管理数据和业务逻辑，不负责UI的呈现
	2)	使用 Redux 的 API
	3)	一般保存在containers文件夹下

模型图
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42e552ce208d4a5fb69a9590f51d6897~tplv-k3u1fbpfcp-zoom-1.image)

## 6.3. 相关API

1.	`Provider`：让所有组件都可以得到state数据
 
2.	`connect`：用于包装 UI 组件生成容器组件
 
3.	`mapStateToprops`：将外部的数据（即state对象）转换为UI组件的标签属性
 
4.	`mapDispatchToProps`：将分发action的函数转换为UI组件的标签属性

## 6.4 基本使用

### 安装

```powershell
npm install react-redux
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2ca339a66d3450984aaa2528cbfdbea~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ffad64742b24b6192f959d81580e1de~tplv-k3u1fbpfcp-zoom-1.image)

### components/Count/index.jsx

UI组件

```javascript
import React, { Component } from 'react'

export default class Count extends Component {
  //加法
  increment = ()=>{
    const {value} = this.selectNumber
    this.props.jia(value*1)
  }
  //减法
  decrement = ()=>{
    const {value} = this.selectNumber
    this.props.jian(value*1)
  }

  //奇数再加
  incrementIfOdd = ()=>{
    const {value} = this.selectNumber
    if(this.props.count % 2 !== 0){
      this.props.jia(value*1)
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.selectNumber
    this.props.jiaAsync(value*1,500)
  }

  render() {
    //console.log('UI组件接收到的props是',this.props);
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}
```

### containers/Count/index.jsx

容器组件

```javascript
//引入Count的UI组件
import CountUI from '../../components/Count'
//引入action
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from '../../redux/count_action'

//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

/* 
  1.mapStateToProps函数返回的是一个对象；
  2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
  3.mapStateToProps用于传递状态
*/
function mapStateToProps(state){
  return {count:state}
}

/* 
  1.mapDispatchToProps函数返回的是一个对象；
  2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
  3.mapDispatchToProps用于传递操作状态的方法
*/
function mapDispatchToProps(dispatch){
  return {
    jia:number => dispatch(createIncrementAction(number)),
    jian:number => dispatch(createDecrementAction(number)),
    jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)
```
### App.jsx

给容器组件传递store

```javascript
import React, { Component } from 'react'
import Count from './containers/Count'
import store from './redux/store'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传递store */}
        <Count store={store} />
      </div>
    )
  }
}
```
### 总结

1. 明确两个概念：
	1. UI组件:不能使用任何 redux 的api，只负责页面的呈现、交互等。
	2. 容器组件：负责和 redux 通信，将结果交给UI组件。
2. 如何创建一个容器组件————靠 react-redux 的 connect 函数
	`connect(mapStateToProps,mapDispatchToProps)(UI组件)`
		- `mapStateToProps`: 映射状态，返回值是一个对象
		- `mapDispatchToProps`: 映射操作状态的方法，返回值是一个对象
3. 备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
4. 备注2：mapDispatchToProps，也可以是一个对象【优化1】

## 6.5 优化

### 优化1 简写`mapDispatchToProps`

```javascript
//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  state => ({count:state}),

  //mapDispatchToProps的一般写法
  /* dispatch => ({
    jia:number => dispatch(createIncrementAction(number)),
    jian:number => dispatch(createDecrementAction(number)),
    jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
  }) */

  //mapDispatchToProps的简写
  {
    jia:createIncrementAction,
    jian:createDecrementAction,
    jiaAsync:createIncrementAsyncAction,
  }
)(CountUI)
```

### 优化2 Provider

容器组件可以检测redux中的状态改变，并渲染页面，所以不需要在index.js中检测了
不要在App.jsx中给子组件传递store了

#### index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```

### 优化3 整合UI组件和容器组件

每个组件两个文件夹太麻烦了，直接整合在一起就好了~

#### containers/Count/index.jsx
```javascript
import React, { Component } from 'react'
//引入action
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from '../../redux/count_action'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

//定义UI组件
class Count extends Component {

  state = {carName:'奔驰c63'}

  //加法
  increment = ()=>{
    const {value} = this.selectNumber
    this.props.jia(value*1)
  }
  //减法
  decrement = ()=>{
    const {value} = this.selectNumber
    this.props.jian(value*1)
  }
  //奇数再加
  incrementIfOdd = ()=>{
    const {value} = this.selectNumber
    if(this.props.count % 2 !== 0){
      this.props.jia(value*1)
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.selectNumber
    this.props.jiaAsync(value*1,500)
  }

  render() {
    //console.log('UI组件接收到的props是',this.props);
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  state => ({count:state}),

  //mapDispatchToProps的一般写法
  /* dispatch => ({
    jia:number => dispatch(createIncrementAction(number)),
    jian:number => dispatch(createDecrementAction(number)),
    jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
  }) */

  //mapDispatchToProps的简写
  {
    jia:createIncrementAction,
    jian:createDecrementAction,
    jiaAsync:createIncrementAsyncAction,
  }
)(Count)
```

### 总结
1. 容器组件和UI组件整合一个文件
2. 无需自己给容器组件传递store，给`<App/>`包裹一个`<Provider store={store}>`即可。
3. 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
4. `mapDispatchToProps`也可以简单的写成一个对象
5. 一个组件要和redux“打交道”要经过哪几步？
	1. 定义好UI组件---不暴露
	2. 引入connect生成一个容器组件，并暴露，写法如下：
```javascript
connect(
	state => ({key:value}), //映射状态
	{key:xxxxxAction} //映射操作状态的方法
)(UI组件)
```
3. 在UI组件中通过this.props.xxxxxxx读取和操作状态

## 6.6 数据共享版
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44372d4752dd4154bf945702003935ec~tplv-k3u1fbpfcp-zoom-1.image)

### store.js

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, combineReducers } from "redux";
//引入为Count组件服务的reducer
import countReducer from "./reducers/count";
//引入为Count组件服务的reducer
import personReducer from "./reducers/person";
//引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";

// 汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
  he: countReducer,
  rens: personReducer,
});

//暴露store
export default createStore(allReducer, applyMiddleware(thunk));
```

### 总结
1. 定义一个Pserson组件，和Count组件通过redux共享数据。
2. 为Person组件编写：reducer、action，配置constant常量。
3. 重点：Person的`reducer`和Count的`reducer`要使用`combineReducers`进行合并，合并后的总状态是一个对象！！！
4. 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。


# 7. 使用上redux调试工具
## 7.1 安装chrome浏览器插件
 Redux Dev Tools

## 7.2 下载工具依赖包

```powershell
npm install redux-devtools-extension
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49c83be75486486ea1f4bfffd8a19922~tplv-k3u1fbpfcp-zoom-1.image)

在store中进行配置

```javascript
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```

# 8. 纯函数和高阶函数
reducer要求是一个纯函数，所以操作数组的时候，不能用push之类的方法
## 8.1 纯函数
1.	一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
2.	必须遵守以下一些约束
	1. 不得改写参数数据
	2. 不会产生任何副作用，例如网络请求，输入和输出设备
	3. 不能调用`Date.now()`或者`Math.random()`等不纯的方法  
3.	`redux`的`reducer`函数必须是一个纯函数

## 8.2 高阶函数
1.	理解: 一类特别的函数
	1. 情况1: 参数是函数
	2. 情况2: 返回是函数
2.	常见的高阶函数: 
	1. 定时器设置函数
	2. 数组的`forEach()/map()/filter()/reduce()/find()/bind()`
	3. `promise`
	4. `react-redux`中的`connect`函数
3.	作用: 能实现更加动态, 更加可扩展的功能


# 9. 最终版

1. 所有变量名字要规范，尽量触发对象的简写形式。
2. reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18461b1a4363455fb401424a853a8e7e~tplv-k3u1fbpfcp-zoom-1.image)
## containers/Count/index.jsx

```javascript
import React, { Component } from 'react'
//引入action
import {
  increment,
  decrement,
  incrementAsync
} from '../../redux/actions/count'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

//定义UI组件
class Count extends Component {

  //加法
  increment = ()=>{
    const {value} = this.selectNumber
    this.props.increment(value*1)
  }
  //减法
  decrement = ()=>{
    const {value} = this.selectNumber
    this.props.decrement(value*1)
  }
  //奇数再加
  incrementIfOdd = ()=>{
    const {value} = this.selectNumber
    if(this.props.count % 2 !== 0){
      this.props.increment(value*1)
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.selectNumber
    this.props.incrementAsync(value*1,500)
  }

  render() {
    //console.log('UI组件接收到的props是',this.props);
    return (
      <div>
        <h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
        <h4>当前求和为：{this.props.count}</h4>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  state => ({
    count:state.count,
    personCount:state.persons.length
  }),
  {increment,decrement,incrementAsync}
)(Count)
```

## containers/Person/index.jsx

```javascript
import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'
import {addPerson} from '../../redux/actions/person'

class Person extends Component {

  addPerson = ()=>{
    const name = this.nameNode.value
    const age = this.ageNode.value*1
    const personObj = {id:nanoid(),name,age}
    this.props.addPerson(personObj)
    this.nameNode.value = ''
    this.ageNode.value = ''
  }

  render() {
    return (
      <div>
        <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
        <input ref={c=>this.nameNode = c} type="text" placeholder="输入名字"/>
        <input ref={c=>this.ageNode = c} type="text" placeholder="输入年龄"/>
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {
            this.props.persons.map((p)=>{
              return <li key={p.id}>{p.name}--{p.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    persons:state.persons,
    count:state.count
  }),//映射状态
  {addPerson}//映射操作状态的方法
)(Person)
```


## redux/actions/count.js

```javascript
/* 
  该文件专门为Count组件生成action对象
*/
import { INCREMENT, DECREMENT } from "../constant";

//同步action，就是指action的值为Object类型的一般对象
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const incrementAsync = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(data));
    }, time);
  };
};
```


## redux/action/person.js

```javascript
import { ADD_PERSON } from "../constant";

//创建增加一个人的action动作对象
export const addPerson = (personObj) => ({ type: ADD_PERSON, data: personObj });
```


## redux/reducers/count.js

```javascript
/* 
  1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
  2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import { INCREMENT, DECREMENT } from "../constant";

const initState = 0; //初始化状态
export default function countReducer(preState = initState, action) {
  // console.log('countReducer@#@#@#');
  //从action对象中获取：type、data
  const { type, data } = action;
  //根据type决定如何加工数据
  switch (type) {
    case INCREMENT: //如果是加
      return preState + data;
    case DECREMENT: //若果是减
      return preState - data;
    default:
      return preState;
  }
}
```


## redux/reducers/person.js

```javascript
import { ADD_PERSON } from "../constant";

//初始化人的列表
const initState = [{ id: "001", name: "tom", age: 18 }];

export default function personReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON: //若是添加一个人
      //preState.unshift(data) //此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
      return [data, ...preState];
    default:
      return preState;
  }
}
```


## redux/reducers/index.js

```javascript
/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import { combineReducers } from "redux";
//引入为Count组件服务的reducer
import count from "./count";
//引入为Person组件服务的reducer
import persons from "./person";

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
  count,
  persons,
});
```

## redux/constant.js

```javascript
/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const ADD_PERSON = "add_person";
```


## redux/store.js

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from "redux";
//引入汇总之后的reducer
import reducer from "./reducers";
//引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
//引入redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";

//暴露store
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
```


## App.jsx

```javascript
import React, { Component } from 'react'
import Count from './containers/Count' //引入的Count的容器组件
import Person from './containers/Person' //引入的Person的容器组件

export default class App extends Component {
  render() {
    return (
      <div>
        <Count/>
        <hr/>
        <Person/>
      </div>
    )
  }
}
```

## index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  /* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
## 展示
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fb73037afd64d1cb30423c5a91834d5~tplv-k3u1fbpfcp-zoom-1.image)
# 10. 项目运行打包

```powershell
npm run build
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d87b266b89ef433e95c09d93e39d1903~tplv-k3u1fbpfcp-zoom-1.image)

全局安装serve

```powershell
npm i serve -g
```

运行

```powershell
serve -s build
```
