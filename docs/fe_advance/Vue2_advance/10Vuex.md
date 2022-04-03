@[toc]
# 1. vuex 理解
## 1.1. vuex 是什么
1) github 站点: https://github.com/vuejs/vuex
2) 在线文档: https://vuex.vuejs.org/zh-cn/
3) 简单来说: 对vue 应用中多个组件的共享状态进行集中式的管理(读/**写**)
## 1.2. 状态自管理应用
1) state: 驱动应用的数据源
2) view: 以声明方式将state 映射到视图
3) actions: 响应在view 上的用户输入导致的状态变化(包含n 个更新状态的方法)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210221181147577.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 1.3. 多组件共享状态的问题
1) 多个视图依赖于同一状态
2) 来自不同视图的行为需要变更同一状态
3) 以前的解决办法
a. 将数据以及操作数据的行为都定义在父组件
b. 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
4) vuex 就是用来解决这个问题的
# 2. vuex 核心概念和API
## 2.1. state
1) vuex 管理的状态对象


2) 它应该是唯一的

```javascript
const state = {
	xxx: initValue
}
```

## 2.2. mutations
1) 包含多个直接更新state 的方法(回调函数)的对象
2) 谁来触发: action 中的commit('mutation 名称')
3) 只能包含同步的代码, 不能写异步代码

```javascript
const mutations = {
	yyy (state, {data1}) {
		// 更新state 的某个属性
	}
}
```

## 2.3. actions
1) 包含多个事件回调函数的对象
2) 通过执行: commit()来触发mutation 的调用, 间接更新state
3) 谁来触发: 组件中: $store.dispatch('action 名称', data1) // 'zzz'
4) 可以包含异步代码(定时器, ajax)

```javascript
const actions = {
	zzz ({commit, state}, data1) {
		commit('yyy', {data1})
	}
}
```




## 2.4. getters
1) 包含多个计算属性(get)的对象
2) 谁来读取: 组件中: $store.getters.xxx

```javascript
const getters = {
	mmm (state) {
		return ...
	}
}
```

## 2.5. modules
1) 包含多个module
2) 一个module 是一个store 的配置对象
3) 与一个组件(包含有共享数据)对应
## 2.6. 向外暴露store 对象

```javascript
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
```

## 2.7. 组件中

```javascript
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
	computed: {
		...mapState(['xxx']),
		...mapGetters(['mmm']),
	}
	methods: mapActions(['zzz'])
}
{{xxx}} {{mmm}} @click="zzz(data)"
```

## 2.8. 映射store

```javascript
import store from './store'
new Vue({
	store
})
```

## 2.9. store 对象
1) 所有用vuex 管理的组件中都多了一个属性$store, 它就是一个store 对象
2) 属性:
state: 注册的state 对象
getters: 注册的getters 对象
3) 方法:
`dispatch(actionName, data)`: 分发调用action
# 3. demo1: 计数器

## 3.1. store.js

```javascript
/**
* vuex 的store 对象模块
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/*
state 对象
类似于data
*/
const state = {
	count: 0 // 初始化状态数据
}
/*
mutations 对象
包含个方法: 能直接更新state
一个方法就是一个mutation
mutation 只能包含更新state 的同步代码, 也不会有逻辑
mutation 由action 触发调用: commit('mutationName')
*/
const mutations = {
	INCREMENT(state) {
		state.count++
	},
	DECREMENT (state) { // ctrl + shift + x
		state.count--
	}
}
/*
actions 对象
包含个方法: 触发mutation 调用, 间接更新state
一个方法就是一个action
action 中可以有逻辑代码和异步代码
action 由组件来触发调用: this.$store.dispatch('actionName')
*/
const actions = {
	increment ({commit}) {
		commit('INCREMENT')
	},
	decrement ({commit}) {
		commit('DECREMENT')
	},
	incrementIfOdd ({commit, state}) {
		if(state.count%2===1) {
			commit('INCREMENT')
		}
	},
	incrementAsync ({commit}) {
		setTimeout(() => {
			commit('INCREMENT')
		}, 1000)
	}
}
/*
getters 对象
包含多个get 计算计算属性方法
*/
const getters = {
	oddOrEven (state) {
		return state.count%2===0 ? '偶数' : '奇数'
	},
	count (state) {
		return state.count
	}
}
// 向外暴露store 实例对象
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
```

## 3.2. main.js

```javascript
import Vue from 'vue'
import app from './app1.vue'
// import app from './app.vue'
import store from './store'
new Vue({
	el: '#app',
	render: h => h(app),
	store // 所有组件都多个一个属性: $store
})
```

## 3.3. app.vue(未优化前)

```html
<template>
<div>
<p>clicked: {{$store.state.count}} times, count is {{oddOrEven}}</p>
<button @click="increment">+</button>
<button @click="decrement">-</button>
<button @click="incrementIfOdd">increment if odd</button>
<button @click="incrementAsync">increment async</button>
</div>
</template>
<script>
export default {
	computed: {
		oddOrEven () {
			return this.$store.getters.oddOrEven
		}
	},
	methods: {
		increment () {
			this.$store.dispatch('increment')
		},
		decrement () {
			this.$store.dispatch('decrement')
		},
		incrementIfOdd () {
			this.$store.dispatch('incrementIfOdd')
		},
		incrementAsync () {
			this.$store.dispatch('incrementAsync')
		}
	}
}
</script>
<style>
</style>
```


## 3.4. app2.vue(优化后)

```html
<template>
<div>
<p>clicked: {{count}} times, count is {{oddOrEven2}}</p>
<button @click="increment">+</button>
<button @click="decrement">-</button>
<button @click="incrementIfOdd">increment if odd</button>
<button @click="incrementAsync">increment async</button>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	computed: mapGetters({ // 名称不一样
		oddOrEven2: 'oddOrEven',
		count: 'count'
	}),
	methods: mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync']) // 名称一样
}
</script>
<style>
</style>
```



# 4. demo2: todo list
todo list.
## 3.1. store/types.js

```javascript
/**
* 包含多个mutation name
*/
export const RECEIVE_TODOS = 'receive_todos'
export const ADD_TODO = 'add_todo'
export const REMOVE_TODO = 'remove_todo'
export const DELETE_DONE = 'delete_done'
export const UPDATE_ALL_TODOS = 'update_all_todos'
```

## 3.2. store/mutations.js

```javascript
import {RECEIVE_TODOS, ADD_TODO, REMOVE_TODO, DELETE_DONE, UPDATE_ALL_TODOS} from
'./types'
export default {
	[RECEIVE_TODOS] (state, {todos}) {
		state.todos = todos
	},
	[ADD_TODO] (state, {todo}) {
		state.todos.unshift(todo)
	},
	[REMOVE_TODO] (state, {index}) {
		state.todos.splice(index, 1)
	},
	[DELETE_DONE] (state) {
		state.todos = state.todos.filter(todo => !todo.complete)
	},
	[UPDATE_ALL_TODOS] (state, {isCheck}) {
		state.todos.forEach(todo => todo.complete = isCheck)
	}
}
```



## 3.3. store/actions.js

```javascript
import storageUtil from '../util/storageUtil'
import {RECEIVE_TODOS, ADD_TODO, REMOVE_TODO, DELETE_DONE, UPDATE_ALL_TODOS} from './types'
export default {
	readTodo ({commit}) {
		setTimeout(() => {
			const todos = storageUtil.fetch()
			// 提交commit 触发mutation 调用
			commit(RECEIVE_TODOS, {todos})
		}, 1000)
	},
	addTodo ({commit}, todo) {
		commit(ADD_TODO, {todo})
	},
	removeTodo ({commit}, index) {
		commit(REMOVE_TODO, {index})
	},
	deleteDone ({commit}) {
		commit(DELETE_DONE)
	},
	updateAllTodos ({commit}, isCheck) {
		commit(UPDATE_ALL_TODOS, {isCheck})
	}
}
```

## 3.4. store/getters.js

```javascript
export default {
	todos (state) {
		return state.todos
	},
	totalSize (state) {
		return state.todos.length
	},
	completeSize (state) {
		return state.todos.reduce((preTotal, todo) => {
			return preTotal + (todo.complete ? 1 : 0)
		}, 0)
	},
	isAllComplete (state, getters) {
		return getters.totalSize===getters.completeSize && getters.totalSize>0
	}
}
```

## 3.5. store/index.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const state = {
	todos: []
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
```

## 3.6. components/app.vue

```html
<template>
<div class="todo-container">
<div class="todo-wrap">
<todo-header></todo-header>
<todo-main></todo-main>
<todo-footer></todo-footer>
</div>
</div>
</template>
<script>
import todoHeader from './todoHeader.vue'
import todoMain from './todoMain.vue'
import todoFooter from './todoFooter.vue'
import storageUtil from '../util/storageUtil'
export default {
	created () {
	// 模拟异步读取数据
	this.$store.dispatch('readTodo')
	},
	components: {
		todoHeader,
		todoMain,
		todoFooter
	}
}
</script>
<style>
.todo-container {
width: 600px;
margin: 0 auto;
}
.todo-container .todo-wrap {
padding: 10px;
border: 1px solid #ddd;

border-radius: 5px;
}
</style>
```

## 3.7. components/todoHeader.vue

```html
<template>
<div class="todo-header">
<input type="text" placeholder="请输入你的任务名称，按回车键确认"
v-model="title" @keyup.enter="addItem"/>
</div>
</template>
<script type="text/ecmascript-6">
export default {
	data () {
		return {
			title: null
		}
	},
	methods: {
		addItem () {
			const title = this.title && this.title.trim()
			if (title) {
				const todo = {
					title,
					complete: false
				}
			this.$store.dispatch('addTodo', todo)
			this.title = null
			}
		}
	}
}
</script>
<style>
.todo-header input {
	width: 560px;
	height: 28px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 7px;
}
.todo-header input:focus {
	outline: none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

## 3.8. components/todoMain.vue

```html
<template>
<ul class="todo-main">
<todo-item v-for="(todo, index) in todos" :todo="todo" :key="index" :index="index"></todo-item>
</ul>
</template>
<script type="text/ecmascript-6">
import todoItem from './todoItem'
import storageUtil from '../util/storageUtil'
export default {
	components: {
		todoItem
	},
	computed: {
		todos () {
			return this.$store.getters.todos
		}
	},
	watch: {
		todos: {// 深度监视todos, 一旦有变化立即保存
		}
	}
}
</script>
```


# 总结
## Vuex

### 1.概念

在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
```

2. 在```main.js```中创建vm时传入```store```配置项

```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)```或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
```

3. 开启命名空间后，组件中读取state数据：

```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
```

4. 开启命名空间后，组件中读取getters数据：

```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
```

5. 开启命名空间后，组件中调用dispatch

```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6. 开启命名空间后，组件中调用commit

```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```


