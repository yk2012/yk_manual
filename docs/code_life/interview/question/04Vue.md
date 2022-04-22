
> 本来是想总结一些面试题，这一总结起来，直接又重新学了一遍Vue
> 就当作复习Vue用的，总结了一些基础知识也有一些面试题
> 持续更新...........

# 1. 基础知识
## 1.1 指令
`v-text` : 更新元素的 textContent
`v-html` : 更新元素的 innerHTML
`v-if` : 如果为true, 当前标签才会输出到页面
`v-else`: 如果为false, 当前标签才会输出到页面
`v-show` : 通过控制display样式来控制显示/隐藏
`v-for` : 遍历数组/对象
`v-on` : 绑定事件监听, 一般简写为@
`v-bind` : 强制绑定解析表达式, 可以省略v-bind
`v-model` : 双向数据绑定
`ref` : 为某个元素注册一个唯一标识, vue对象通过$refs属性访问这个元素对象
`v-cloak` : 使用它防止闪现表达式, 与css配合: [v-cloak] { display: none }


## 1.2 v-if与v-show 显式
`v-if`是控制元素是否加载到页面上（有性能开销）
`v-show`是控制元素的显示与隐藏 （初始创建时加载一次）

频繁切换使用`v-show`

> 使用`v-if`会有性能开销。每次插入或者移除元素时都必须要生成元素内部的DOM树，这在某些时候是非常大的工作量。
> 而`v-show`除了在初始创建开销时之外没有额外的开销。


## 1.3 v-for 遍历

数组
```javascript
v-for="(item, index) in array"
```

对象

```javascript
v-for="(value, key, index) in object"
```

key的重要性：key不要乱写（如random或index）


## 1.4 v-if与v-for不能同时用
`v-for`优先级高一点，会循环之后再判断条件（重复判断），开销比较大

可以把 `v-if` 放在【父】标签或者【子】标签中

## 1.5 data、计算属性、方法
- data对象：可以使用它来存储字符串、数组和对象等数据；
- 方法：可以使用它来存储函数并在模板中调用；
- 计算属性：可以使用它将函数存储下来，然后像访问data对象中的属性一样调用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528161652401.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 1.6 计算属性与方法
1. 计算属性会被缓存（只有当计算属性的依赖发生变化时，代码才会被再次执行）

2. 计算属性可以设置setter和getter

## 1.7 方法中的this
在方法中，this指向该方法所属的组件
可以使用this访问data对象的属性和其他方法

## 1.8 事件对象
默认传入 `$event`
有参数时，显式的在最后传入 `$event`
```html
<p>{{number}}</p>
<button @click="incrementBy1">点击+1</button>
<button @click="incrementBy10(10, $event)">点击+10</button>
```

```javascript
data(){
	return {
		number: 0
	}
}
methods: {
	incrementBy1(e){
		this.number++
		console.log(e.__proto__.constructor) // f MouseEvent()
		console.log(e.target) // <button>点击+1</button>
		console.log(e.currentTarget) // <button>点击+1</button>
	},
	incrementBy10(step, e){
		this.number+=step
		console.log(e.__proto__.constructor) // f MouseEvent()
	}
}
```
1. event是原生的
2. 事件被挂载到当前元素


## 1.9 事件修饰符

`.prevent` 阻止执行事件默认行为
`.stop` 阻止事件继续传播
`.once` 只在第一次触发事件的时候触发事件侦听器
`.capture` 使用捕获模式
`.self` 只监听元素自身而不是它的子元素上触发的事件

还有一些按键修饰符
`@click.ctrl`  按CTRL或 CTRL加Alt或Shift 一同按下
`@click..ctrl.exact`  只按CTRL键
`@click..exact`  没有任何系统修饰符被按下


## 1.10 侦听器 watch
侦听器可以监听data对象属性或者计算属性的变化
当监听的属性发生变化时，侦听器会被传入两个参数：所监听属性的当前值和原来的旧值
监听整个对象被称作深度监听，通过将deep选项设置为true来开启这一特性

```javascript
data() {
	return {
		name: 'YK菌',
		info: {
			hobby: '写博客'
		}
	}
},
watch: {
	name(newValue, oldValue){
		console.log(newValue, oldValue);
	},
	info: {
		handle: function(newValue, oldValue){
			console.log(newValue, oldValue);
		},
		deep: true
}
```
当数据改变时，会调用watch里对应的函数
引用类型值改变后，新旧值都改变了，所以拿不到oldValue

## 1.11 动态绑定class、style
### 1. 类名class

对象 
```javascript
:class="{ 'active': isActive, 'error': isError }"
```

```javascript
data(){
	return {
		isActive: true,
		isError: false
	}
}
```

数组

```javascript
:class="[activeCls, errorCls]"
```

```javascript
data(){
	return {
		activeCls: 'active',
		errorCls: 'error'
	}
}
```
对象数组之间可以互相嵌套

### 2. 内联样式style
对象

```javascript
:style="{ 'color': color, 'fontSize': fontSize + 'px' }"
```
```javascript
data(){
	return {
		color: 'red',
		fontSize : 14
	}
}
```
数组
```javascript
:style="[ styleA, styleB ]"
```

## 1.12 过滤器
使用
只可以在插值和v-bind指令中使用过滤器
```javascript
{{ origin | format }}
```

组件中定义

```javascript
filters: {
	format(value){
		return value + 2;
	}
}
```

全局定义

```javascript
Vue.filter('format', function(value){
	return value + 2;
})
```

过滤器是组件中唯一不能使用this来访问数据或者方法的地方
因为过滤器应该是纯函数，也就是说对于同样的输入每次都返回同样的输出，而不涉及任何外部数据。如果想在过滤器中访问其他数据，可以将它作为参数传入


## 1.13 v-clock
解决初始化慢导致页面闪动
不需要表达式，和CSS的`display:none`配合使用

```html
<div v-clock>{{ data }}</div>
```

```css
[v-clock] {
	display: none;
}
```


## 1.14 生命周期钩子

> 生命周期钩子是一系列会在组件生命周期——从组件被创建并添加到DOM，到组件被销毁的整个过程——的各个阶段被调用的函数

一个有八个 四组

`beforeCreate`在实例初始化前被触发。
`created`会在实例初始化之后、被添加到DOM之前触发。
`beforeMount`会在元素已经准备好被添加到DOM，但还没有添加的时候触发。
`mounted`会在元素创建后触发（但并不一定已经添加到了DOM，可以用`nextTick`来保证这一点）。
`beforeUpdate`会在由于数据更新将要对DOM做一些更改时触发。
`updated`会在DOM的更改已经完成后触发。
`beforeDestroy`会在组件即将被销毁并且从DOM上移除时触发。
`destroyed`会在组件被销毁后触发

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210527104357702.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
## 1.15 什么是nextTick
```javascript
Vue.nextTick( [callback, context] )
```
```javascript
vm.$nextTick( [callback, context] )
```

> Vue 是异步渲染
> data改变后，DOM不会立即渲染
> $nextTick 会在DOM渲染之后被触发，以获取最新的DOM节点

## 1.16 自定义实现v-model
v-model实现数据双向绑定实际上是一个语法糖

```html
<input type="text" v-model="name">
```
相当于

```html
<input type="text" :value="name" @input="name = $event.target.value">
```

```javascript
<template>
    <input type="text" :value="value" @input="handleInput" :placeholder="placehodler" />
</template>

<script>
  export default {
    name: 'YkInput',
    props: {
        value: ['String', 'Number'],
        placeholder: String
    },
    methods: {
        handleInput ($event) {
            // 通过input标签的原生事件input将值emit出去，以达到值得改变实现双向绑定
            this.$emit('input', $event.target.value)
        }
    }
  }
</script>
```
> 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突：

```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

## 1.17 MVVM 模型
传统组件，只是静态渲染，更新还要依赖于操作DOM
Vue - MVVM 数据驱动视图
React - setState 数据驱动视图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210716220741638.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# 2. 组件相关
## 2.1 data为什么是函数
一个组件可以在同一个页面上被多次引用，不希望它们共享一个data对象
因为同一个组件的每个实例的data属性是同一个对象的引用，当该组件的某个实例修改了自身的data属性，相当于所有实例的data属性都被修改了
所以组件的data属性应该是一个函数，在组件初始化时Vue会调用这个函数来生成data对象

## 2.2 组件间通信
###  2.2.1 `props`  父 —> 子

父组件通过标签传递数据 list
```html
<MyList :list="list" />
```
子组件通过props接收数据list
```javascript
props: {
	list: Array
}
```

父组件通过props向下传递数据给子组件
注：组件中的数据共有三种形式：`data`、`props`、`computed`


### 2.2.2 `$emit`  子 —> 父 + 自定义事件

子组件 向外触发一个事件，携带需要传出去的数据`this.title`
```javascript
this.$emit('add', this.title)
```

父组件监听add事件 

```html
<MyInput @add="add">
```
父组件中定义add方法，获取传入的数据，进行操作
```javascript
methods: {
	add(title){
		// 得到数据可以进行操作了
		this.list.push({
			id: Math.random(),
			title
		})
	}
}
```

### 2.2.3 EventBus事件总线 `.$emit` `.$on`
定义一个event-bus.js

```javascript
import Vue from 'vue'
const eventBus = new Vue()
export default eventBus
```

在需要用到的组件中导入

```javascript
import eventBus from './event-bus'
```
在事件中派发到eventBus中并携带数据
```javascript
eventBus.$emit('addItem', this.title)
```
在需要用到数据的组件中接收数据
```javascript
mounted() {
  eventBus.$on('addItem', this.handleAddTitle)
}
```
使用数据

```javascript
methods: {
	handleAddTitle(title){
		console.log(title)
	}
}
```

解绑事件监听
```javascript
beforeDestroy(){
	eventBus.$off('addItem', this.handleAddTitle)
}
```

### 2.2.4 PubSubJS发布订阅
组件中引入PubSubJS库

```javascript
import PubSub from 'pubsub-js'
```

发布消息（触发事件）传递数据
```javascript
PubSub.publish('deleteTodo', this.index)
```

订阅消息（绑定事件监听） 接收数据
```javascript
export default {
	mounted () {
		// 订阅消息(deleteTodo)
		PubSub.subscribe('deleteTodo', (msg, index) => {
			this.deleteTodo(index)
		})
	}
}
```
### 2.2.5 作用域插槽
见下面的

## 2.3 `slot`插槽
### 2.3.1 匿名`slot`
子组件内部定义一个占位符，父组件使用时可以向组件标签中插入任何内容替换子组件slot中的内容

父组件

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

子组件

```javascript
<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“Your Profile”。

如果 	`<navigation-link>` 的 template 中**没有**包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。


> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

### 2.3.2 具名`slot`
给slot元素指定一个name后，可以分发多个内容

例子

子组件模板定义

```html
<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```
父组件使用

```html
<child-component>
  <h2 slot="header">标题</h2>
  <p>内容</p>
  <p>更多</p>
  <div slot="footer">底部</div>
</child-component>
```


这里的`slot`已经废弃了，用`v-slot`替代
必须由`template`标签包裹，且`v-slot`可以简写成`#`
```html
<child-component>
  <template v-slot:header>
    <h2>标题</h2>
  </template>
  
  <template v-slot:default>
  <p>内容</p>
  <p>更多</p>
  </template>
  
  <template #footer>
    <div>底部</div>
  </template>
</child-component>
```
> 注意 v-slot 只能添加在 `<template>` 上

最后相当于
```html
<div class="container">
  <div class="header">
    <h2>标题</h2>
  </div>
  <div class="main">
    <p>内容</p>
  	<p>更多</p>
  </div>
  <div class="footer">
    <div>底部</div>
  </div>
</div>
```
### 2.3.3 作用域插槽
子组件的数据通过标签传给父组件

```javascript
<template>
  <h1>
    <slot :user="user">
      {{ user.name }}
    </slot>
  </h1>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'YK',
        age: 18
      }
    }
  }
}
</script>
```

父组件接收数据并使用

```javascript
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.age }}
  </template>
</current-user>
```

对象结构赋值更简洁

```javascript
<current-user>
  <template v-slot:default="{ user }">
    {{ user.age }}
  </template>
</current-user>
```
## 2.4 动态组件

> Vue.js提供了一个特殊的元素`<component>`用来动态地挂载不同的组件，使用is特性来选择要挂载的组件
> 这个相当于是一个组件占位符，等待填充

示例
这里有三个组件 MyImage、MyVideo、MyTextApp 组件要根据数据来动态渲染组件

数据
```javascript
data() {
  return {
    produceData: [
      { id: 1, type: 'Video' },
      { id: 2, type: 'Text' },
      { id: 3, type: 'Image' },
      { id: 4, type: 'Text' }
    ]
  }
}
```
引入组件

```javascript
import MyImage from './components/MyImage.vue'
import MyText from './components/MyText.vue'
import MyVideo from './components/MyVideo.vue'
```
动态渲染组件
```html
<div v-for="item in produceData" :key="item.id">
  <component :is="`My${item.type}`"></component>
</div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/202105281133502.png)

## 2.5 异步组件

> 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
> 为了简化，Vue允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。
> Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

修改引入方式

```javascript
components: {
	AsyncTest: () => import('./components/AsyncTest')
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528135555964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
只有在点击按钮之后才会加载请求响应的组件文件

可以通过webpack魔法注释给文件起一个名字

```javascript
AsyncTest: () => import(/* webpackChunkName: "AsyncTest" */'./components/AsyncTest')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528135949957.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
## 2.6 keep-alive实现组件缓存
频繁切换，不需要重复渲染

```html
<h1>keep-alive</h1>
<button @click="state = 'A'">A</button>
<button @click="state = 'B'">B</button>
<button @click="state = 'C'">C</button>
<comp-a v-if="state === 'A'"></comp-a>
<comp-b v-if="state === 'B'"></comp-b>
<comp-c v-if="state === 'C'"></comp-c>
```
子组件

```javascript
<template>
  <div>
    组件A
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('组件A渲染')
  },
  destroyed() {
    console.log('组件A销毁')
  }
}
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528141431575.gif#pic_center)
切换组件的时候，另外的组件就会销毁，没有缓存，频繁切换的话开销比较大


利用keep-alive将需要缓存的组件包裹起来就可以了

```html
<keep-alive>
  <comp-a v-if="state === 'A'"></comp-a>
  <comp-b v-if="state === 'B'"></comp-b>
  <comp-c v-if="state === 'C'"></comp-c>
</keep-alive>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528142020596.gif#pic_center)

题外话，使用v-show会在页面一开始就渲染全部组件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528142215129.gif#pic_center)
## 2.7 mixin 抽离组件公共部分
【minxin存在一些问题，Vue3提出的Composition API旨在解决这些问题】

将组件中公共的数据、方法以及生命周期钩子抽离出来保存在一个mixin.js中

```javascript
export default {
  data() {
    return {
      commonData: '公共的数据'
    }
  },
  methods: {
    commonMethod() {
      console.log('公共的方法')
    }
  },
  mounted() {
    console.log('common mounted')
  }
}
```

在需要使用的组件中，引入mixin即可

```javascript
import mixin from './mixin'

export default {
  mixins: [mixin]
}
```

就可以在组件中使用公共的数据方法以及生命周期钩子了

可以抽离出多个mixin
```javascript
import mixin from './mixin'
import mixin2 from './mixin2'

export default {
  mixins: [ mixin, mixin2 ]
}
```

【存在的一些问题】
1. 变量来源不明确，不利于阅读
2. 多mixin可能会造成命名冲突
3. mixin和组件可能出现多对多的关系，复杂度较高


# 3. Vue家族
## 3.1 vue-cli
创建Vue项目

[【Vue】使用vue-cli 2.x 创建项目-配置Vue脚手架-npm方法-vue-cli配置-vscode配置-项目打包与发布-ESlint使用](https://blog.csdn.net/weixin_44972008/article/details/113444060)

[【Vue】vue-cli 3.x - 创建项目 - 图形化 - 命令行 - 配置项目 - axios - elementUI - 码云SSH公钥设置 - Gitee同步](https://blog.csdn.net/weixin_44972008/article/details/114187511)


## 3.2 vue-router
[【Vue】路由 - vue-router - SPA - 基本路由 - 嵌套路由 - 编程式路由导航](https://blog.csdn.net/weixin_44972008/article/details/113921357)

### 3.2.1 路由的概念
1. 后端路由
概念：根据不同的用户URL请求，返回不同的内容
本质：**URL请求地址**与**服务器资源**之间的对应关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528191523713.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
2. 前端路由
概念：根据不同的用户事件，显示不同的页面内容
本质：**用户事件**与**事件处理函数**之间的对应关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528192008239.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
[VueRouter官方文档](https://router.vuejs.org/zh/installation.html)
### 3.3.2 基本路由
1. 引入相关的库文件【vue】【vue-router】
2. 添加路由链接`<router-link to="/about">About</router-link>` 
3. 添加路由占位符`<router-view></router-view>`
4. 定义路由组件
5. 创建路由实例对象并配置路由规则`new Router()`【路由器】
6. 把路由挂载到Vue根实例对象vm中 `router: router` 


```javascript
// 定义路由器
import Vue from 'vue'
import Router from 'vue-router'

import About from '../pages/About'
import Home from '../pages/Home'

Vue.use(Router)
// 创建路由实例对象
export default new Router({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: About
    }
  ]
})
```

```javascript
// 使用路由器
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({ 
  el: '#app',
  router, // 挂载路由实例对象
  components: { App },
  template: '<App/>'
})
```

### 3.3.3 嵌套路由 

```javascript
{
  path: '/home',
  component: Home,
  children: [
    {
      // path: '/news' // path最左侧斜杠代表根路径
      path: '/home/news', //完整写法
      component: News
    },
    {
      path: 'message', // 简化写法
      component: Message
    },
    { //设置默认显示
      path: '',
      redirect: '/home/news'
    }
  ]
}
```

### 3.3.4 动态路由匹配
设置动态路径参数，以冒号开头
【动态路径匹配】
```javascript
new Router({
  routes: [
    {
      path: '/user/:id',
      component: About
    }
  ]
})
```

路由组件中通过`$route.params`获取路由参数
在组件实例中，可以通过属性`this.$route`来获取当前路由对象

```html	
<div>User组件——用户ID为 {{ $route.params.id }} </div>
```

页面使用时接收参数
```html
<router-link to="/user/1">User</router-link>
```

### 3.3.5 向路由组件传递数据
`$route`与对应组件路由高度耦合，不够灵活，所以可以使用`props`将组件与路由解耦

1. `props`的类型是布尔值 (传动态参数)

路由规则开启props传参
```javascript
routes: [{ 
	path:'/user/:id', 
	component: User, 
	props: true 
}]
```

路由组件接收并使用路由参数
```javascript
props: ['id'], // 接收路由参数
template: '<div>用户ID: {{ id }}</div>' // 使用路由参数
```

2. `props`的值是对象类型 （传静态参数）

此时`id`就访问不到了
```javascript
routes: [{ 
	path:'/user/:id', 
	component: User, 
	props: { uname: 'yk', age: 18 } 
}]
```
路由组件接收并使用路由参数 
```javascript
props: ['uname', 'age'], // 接收路由参数
template: '<div>用户信息: {{ uname + '---' + age }}</div>' // 使用路由参数
```

3. `props`的值是函数 （传动态参数+静态参数）
```javascript
routes: [{ 
	path:'/user/:id', 
	component: User, 
	props: route => (
		{ 
			uname: 'yk',
			age: 18,
			id: route.params.id
		}
	)
}]
```

路由组件接收并使用路由参数 
```javascript
props: ['uname', 'age', 'id'], // 接收路由参数
template: '<div>用户信息: {{ uname + '---' + age + '---' +  id }}</div>' // 使用路由参数
```

### 3.3.6 命名路由
在路由规则中命名路由 加一个name属性
```javascript
routes: [{ 
	path:'/user/:id', 
	name: 'user',
	component: User
}]
```

使用
```html
<router-link :to="{ name: 'user', params: {id:123}}">User</router-link>
```

### 3.3.7 编程式路由导航
1. 声明式导航
通过点击链接实现导航的方式 
如`a`标签，`router-link`标签
2. 编程式导航
通过JavaScript的API实现导航的方式
如`location.herf`

VueRouter中实现编程式导航
```javascript
this.$router.push('hash地址')
this.$router.go(n)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210528210900217.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 3.4 vuex
[vuex官方文档](https://vuex.vuejs.org/zh/guide/)

[【Vue】vuex - 状态自管理应用 - state - view - actions](https://blog.csdn.net/weixin_44972008/article/details/113921381)

[【Vue】Vuex管理状态入门到实战 - 计数器demo - todoList项目 - 组件间共享数据 - State - Mutation - Action - Getter](https://blog.csdn.net/weixin_44972008/article/details/115427489)

Vuex可以满足复杂应用中多组件进行状态共享的需求
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210529111144638.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

使用Vuex 
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	// 定义数据
  	value: 'oldValue'
  },
  mutations: {
    // 定义方法
    setValue(state, newValue){
      state.value = newValue
	}
  },
  actions: {
    getMessage(){}
  },
  getters: {
  	// 定义getter
    getMyInfo(state){
	  return `这里可以操作state中的一些数据${state.value}并返回`
    }
  },
  modules: {
  }
})
```

挂载到Vue实例上
```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 3.4.1 概念
`State` 提供唯一的公共**数据源**，所有共享的数据都要统一放到 Store 的 State 中进行存储

`Mutation` 用于**变更 Store中的数据**，包含多个直接更新state 的方法(回调函数)的对象

`Action` 用于处理**异步任务**，包含多个事件回调函数的对象

`Getter` 用于对 Store 中的数据进行**加工处理**形成新的数据，包含多个计算属性(get)的对象

`Module` 一个module 是一个 store 的**配置对象**

### 3.4.2 组件中访问state的方式
1. 使用 `this.$store`
```javascript
this.$store.state.全局数据名称
```
2. `mapState` 辅助函数
```javascript
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  }
}
```
### 3.4.3 组件中触发Mutation的方式
1. 使用`this.$store.commit()`
```javascript
this.$store.commit('setValue', 'newValue') 
```
2. 使用`mapMutations` 

```javascript
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from 'vuex'
// 2. 将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
	...mapMutations(['mutation1', 'mutation2'])
	handle(){
		this.mutation1('params')
	}
}
```

#### 需要传多个参数的情况
定义
```javascript
mutations: {
  // 定义方法
  setValue(state, payload){
    const {newValue, params1} = payload;
    console.log(params1)
    state.value = newValue
  }
}
```
触发
```javascript
this.$store.commit('setValue', {newValue, params1})
```

### 3.3.4 组件中触发getter的方式
1. 使用`this.$store.getters`
```javascript
data(){
  reutrn {
    myInfo: ''	
  }
},
mounted() {
  this.myInfo = this.$store.getters.getMyInfo;
}
```
2. 使用`mapGetters` 
```javascript
import { mapGetters } from 'vuex'
computed: {
	...mapGetters(['showNum'])
}
```

### 3.3.5 组件中触发actions的方式 

> 用mutation只能做到同步变更，而action则用于实现异步变更

使用`store.dispatch()`方法来在组件中调用getMessages




# 4. 源码相关
未完待续....
## 4.1 模板引擎
[【Vue源码】mustache模板引擎 - 基本使用 - 底层原理 - 手写实现](https://blog.csdn.net/weixin_44972008/article/details/115014168#comments_15881353)


## 4.2 数据响应式原理
[【Vue源码】数据响应式原理 - 依赖收集 - defineReactive - Observer - Dep - Watcher](https://blog.csdn.net/weixin_44972008/article/details/115922118#comments_16698936)

### 1. Object.defineProperty的缺点
- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性/删除属性 (`Vue.set` / `Vue.delete`)
- 无法原生监听数组，需要特殊处理

### 2. 数据更新了但是页面没有变化，为什么？怎么解决
[https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

1. 数组的情况

数组中直接使用索引来修改数组中的数据`vm.items[indexOfItem] = newValue`
直接修改数组的长度`vm.items[indexOfItem] = newValue`

应该使用Vue拦截的六种数组原型上的方法`push(),pop(),shift(),unshift(),splice(),sort()`
或者使用 `Vue.set(vm.items, indexOfItem, newValue)`

2. 对象的情况

Vue 无法检测 property 的添加或移除
property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的

使用`Vue.set(object, propertyName, value)`
或者使用`this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })`


## 4.3 虚拟DOM
[【Vue源码】图解 diff算法 与 虚拟DOM-snabbdom-最小量更新原理解析-手写源码-updateChildren](https://blog.csdn.net/weixin_44972008/article/details/115620198)

## 4.4 diff算法
[【Vue源码】图解 diff算法 与 虚拟DOM-snabbdom-最小量更新原理解析-手写源码-updateChildren](https://blog.csdn.net/weixin_44972008/article/details/115620198)

1. 只比较同一层级，不跨层比较
2. tag不同，直接删除重建，不再深度比较
3. tag和key，两者都相同，则认为是相同节点，不再深度比较

# 参考

1. [Vue官方文档](https://cn.vuejs.org/v2/guide/)
2. [VueRouter官方文档](https://router.vuejs.org/zh/installation.html)
3. [Vuex官方文档](https://cn.vuejs.org/v2/guide/)
4. [《Vue.js快跑：构建触手可及的高性能Web应用》](https://weread.qq.com/web/reader/82032410718487828207501)
5. [《Vue.js实战》](https://weread.qq.com/web/reader/c3a32fa0719b1fcdc3a4672kc81322c012c81e728d9d180)
6. [【Vue】使用vue-cli 2.x 创建项目-配置Vue脚手架-npm方法-vue-cli配置-vscode配置-项目打包与发布-ESlint使用](https://blog.csdn.net/weixin_44972008/article/details/113444060)
7. [【Vue】vue-cli 3.x - 创建项目 - 图形化 - 命令行 - 配置项目 - axios - elementUI - 码云SSH公钥设置 - Gitee同步](https://blog.csdn.net/weixin_44972008/article/details/114187511)
8. [【Vue】路由 - vue-router - SPA - 基本路由 - 嵌套路由 - 编程式路由导航](https://blog.csdn.net/weixin_44972008/article/details/113921357)
9. [【Vue】vuex - 状态自管理应用 - state - view - actions](https://blog.csdn.net/weixin_44972008/article/details/113921381)
10. [【Vue】Vuex管理状态入门到实战 - 计数器demo - todoList项目 - 组件间共享数据 - State - Mutation - Action - Getter](https://blog.csdn.net/weixin_44972008/article/details/115427489)
11. [【Vue源码】mustache模板引擎 - 基本使用 - 底层原理 - 手写实现](https://blog.csdn.net/weixin_44972008/article/details/115014168#comments_15881353)
12. [【Vue源码】数据响应式原理 - 依赖收集 - defineReactive - Observer - Dep - Watcher](https://blog.csdn.net/weixin_44972008/article/details/115922118#comments_16698936)
13. [【Vue源码】图解 diff算法 与 虚拟DOM-snabbdom-最小量更新原理解析-手写源码-updateChildren](https://blog.csdn.net/weixin_44972008/article/details/115620198)

