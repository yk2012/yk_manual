

> 青训营实战班的课程也结束了，今天先来撸一遍周五杨村长带来的mini-vue课程。错过课程的小伙伴一定不要错过这篇超级详细且稍微拓展的笔记哟~

相关代码可以看我的[gitee仓库](https://gitee.com/ykang2020/youth_camp_ykjun/tree/master/day05)


关于Vue3的一些内容，可以看我之前博文 [带你快速上手Vue3](https://juejin.cn/post/7005140118960865317)



# 一、前端框架设计理念


## 1. 用Vue来举例

- 简单、易上手

- 数据驱动
  - 减少DOM操作
  - data-driven
    - 数据响应式（reactive、effect）
  - 声明式渲染、render
  - vdom
  - patch

- 渐进式progressive（min、vuex、router、element3）


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82d94441d84d494a9c0c8780a41b42c3~tplv-k3u1fbpfcp-watermark.image?)



## 2. Vue3的动机

1. （类型支持）为什么用函数的方式？

- 函数：vue3，react

- class: Angular, vue2（decorator）

函数签名比较明确，这样输入输出的内容就比较明确

2. Composition API 的优势
- 消灭 `this`
- 声明响应式数据
- 复用性、可读性、可维护性


```html
<div id="app">{{title}}</div>
<script src="http://unpkg.com/vue@next"></script>

<script>
  const app = Vue.createApp({
    data() {
      return {
        title: 'vue3,  YK菌, data'
      }
    },
    setup() {
      // Composition API 的优势
      // 消灭this
      // 声明响应式数据
      // 复用性、可读性、可维护性
      const state = Vue.reactive({
        title: 'vue3, YK菌, setup'
      })
      return state
    }
  })

  app.mount('#app')
</script>
```

结果可以看到 `setup` 的优先级更高

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/951f88e1aa5543fcac439e4ed9828721~tplv-k3u1fbpfcp-watermark.image?)



## 3. 小结
1. 类型支持
2. 实例方法和属性 tree-shaking
3. 复用性 `hook`
4. 维护性 `Composition API`
5. API简化
   1. 一致性（指令中的生命周期 和 组件的生命周期 不同）
   2. 删除相同功能的API（`v-model`、`.sync`（Vue3弃））
   ```html
   <comp v-model="foo"></comp>
   <comp :foo.sync="foo"></comp>
   <comp :value="foo" @update:value="foo = $event"></comp>
   ```
   3. render
   ```javascript
   // Vue2 写法
   render(h){
      return h('div', {
        attrs: {
          title: this.title
        }
      }, 'xxx')
   }
   
   // Vue3 写法
   render(){
     return Vue.h('div', {
       title: this.title
     }, 'xxx')
   }
   ```
6. 拓展性：自定义渲染器 `Vue.createRenderer()`
7. 性能优化——响应式基于 `Proxy`
   1. 递归效率问题
   2. 数组问题（单独一套实现）
   3. API影响（动态属性新增删除 `Vue.delete` / `set` ）
   4. 不支持 class collection 数据结构
   5. 兼容性（vue2.7）


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8a78a3a2dc74f46928849f6a562a94a~tplv-k3u1fbpfcp-watermark.image?)


# 二、实现 mini-vue

> 直接读源码还是一件很难下手的事情，新手经常分不清重点，容易在一些边边角角的地方遇到阻碍，浪费很多时间，所以今天我们来写的mini-vue只关注最核心的部分

## 1. 初始化

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf976153efa6419ebcf8df72fa472a97~tplv-k3u1fbpfcp-watermark.image?)


```html
<div id="app">{{title}}</div>

<script>
  // 待填充代码
</script>

<script>
  const app = Vue.createApp({
    data() {
      return {
        title: 'hello, vue3 YK菌'
      }
    }
  })
  app.mount('#app')
</script>
```

### ① 基本结构
```javascript
const Vue = {
  createApp(options) {
    // 返回app对象
    return {
      mount(selector) {
        // 待填充代码 [如何挂载]
      }
    }
  }
}
```

### ② 如何挂载元素

我们应该想的是 Vue 的 `mount` 做了哪些事情？
1. 找到宿主元素
2. 渲染页面
    1. 处理 `template`：使用 `compile` 编译
    2. 用户直接编写`render`
3. 追加到宿主

根据上面的思路，我们来编写代码

```javascript
// 1. 基本结构
const Vue = {
  createApp(options) {
    // 返回app对象
    return {
      mount(selector) {
        // 1. 找到宿主元素
        const parent = document.querySelector(selector)
        // 2. 渲染页面
        if (!options.render) {
          // 2.1 处理template： 编译
          options.render = this.compile(parent.innerHTML)
        }
        // 2.2 用户直接编写render
        // 执行render函数（这里指定render函数中的this的上下文，是配置项中data函数的返回值）
        const el = options.render.call(options.data())

        // 3. 追加到宿主
        parent.innerHTML = ''
        parent.appendChild(el)
      },
      compile(template) {
        // 返回一个render函数
        // parse -> ast
        // generate: ast -> render
        return function render() {
          const h3 = document.createElement('h3')
          h3.textContent = this.title
          return h3
        }
      }
    }
  }
}
```

如下图所示，展示 `data` 中的数据这一步，我们就已经完成了


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edb99f474a4147b2b52f67b0b5b576b9~tplv-k3u1fbpfcp-watermark.image?)


### ③ 兼容性处理

如果用户同时编写 `data` 和 `setup` 时，Vue3是会优先使用 `setup` 中的数据

```js
const app = Vue.createApp({
  data() {
    return {
      title: 'hello, vue3 YK菌 data'
    }
  },
  setup() {
    return {
      title: 'hello, vue3 YK菌 setup'
    }
  }
})
app.mount('#app')
```

所以我们在渲染之前，要处理 `setup` 和其他选项的兼容问题

首先，我们收集 `setup` 和其他选项

```js
if(options.setup){
  this.setupState = options.setup()
}
if(options.data){
  this.data = options.data()
}
```

我们创建一个代理，在 `getter` 和 `setter` 中规定优先级

```js
// 渲染之前，处理setup和其他选项的兼容
const proxy = new Proxy(this, {
  get(target, key) {
    // 先从setup中取，如果取不到再从data中取
    // 如果setup存在，且key在setup中定义过
    if (target.setupState && key in target.setupState) {
      // return target.setupState[key]
      return Reflect.get(target.setupState, key)
    } else {
      // return target.data[key]
      return Reflect.get(target.data, key)
    }

  },
  set(target, key, val) {
    if (target.setupState && key in target.setupState) {
      return Reflect.set(target.setupState, key, val)
    } else {
      return Reflect.set(target.data, key, val)
    }
  }
})
```

挂载元素之前，将 `render` 的上下文设置成 `proxy`

```js
const el = options.render.call(proxy)
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bded572efd8c41038e0674d5d78fd8c9~tplv-k3u1fbpfcp-watermark.image?)



### ④ 扩展性处理（自定义渲染器）

我们上面写的代码中，返回的 `app` 实例，是和web平台强耦合的，因为操作都使用了`document`，要提高可拓展性，我们应该采用高阶组件的方式，将与平台相关的操作通过参数传入进来，达到解耦的效果，让我们的框架做到与平台无关~


```js
// 1. 找到宿主元素
const parent = document.querySelector(selector)

// 3. 追加到宿主
parent.innerHTML = ''
parent.appendChild(el)
```
改成
```js
// 1. 找到宿主元素
const parent = querySelector(selector)

// 3. 追加到宿主
insert(el, parent)
```

如何做到呢？ 我们需要提供一个新的API供用户去选择

```js
const Vue = {
  // 拓展性
  createRenderer({
    querySelector,
    insert
  }) {
    // 返回渲染器
    return {
      createApp(options) {
        // 返回app对象
        return {
          mount(selector) {
            // 1. 找到宿主元素
            const parent = querySelector(selector)

            // 2. 渲染页面
            // ......

            // 3. 追加到宿主
            insert(el, parent)
          },
        }
      }
    }
  },
  createApp(options) {
    // 创建一个web平台特有的渲染器
    const renderer = Vue.createRenderer({
      querySelector(sel) {
        return document.querySelector(sel)
      },
      insert(el, parent) {
        parent.innerHTML = ''
        parent.appendChild(el)
      }
    })
    return renderer.createApp(options)
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edd5249b7d7844cf82acc179fbff9b69~tplv-k3u1fbpfcp-watermark.image?)


初始化后，接下来我们要考虑的就是如何实现响应式的数据

## 2. 响应式

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58f15af814a3457c9b04b3780a383245~tplv-k3u1fbpfcp-watermark.image?)

相信很多没接触过Vue3的小伙伴都听说过，Vue3的响应式是基于 `Proxy` 的

而，Vue2是基于 `Object.defineProperty` 实现数据响应式的，它有很多缺点：（这方面的内容可以看我之前的博文[【Vue源码】数据响应式原理](https://juejin.cn/post/6984784552002600967)）
1. 递归效率问题
2. 数组问题（单独一套实现）
3. API影响（动态属性新增删除 `Vue.delete` / `set` ）
4. 不支持 class collection 数据结构

### ① reactive
下面我们来探索探索，首先使用 `reactive` 创建一个响应式的对象，然后在两秒后， `title` 的值会变，而页面也会跟着变。


```js
const app = Vue.createApp({
  setup() {
    const state = reactive({
      title: 'hello, vue3 YK菌'
    })

    setTimeout(() => {
      state.title = '2秒后见到新的YK菌'
    }, 2000)

    return state
  }
})
app.mount('#app')
```

我们创建一个 `reactive` 函数，用来拦截用户对代理对象的访问，从而在值发生变化的时候做出响应。


```js
// 内容拦截用户对代理对象的访问，从而在值发生变化的时候做出响应
function reactive(obj) {
  // 返回代理的对象
  return new Proxy(obj, {
    get(target, key) {
      console.log('get key:', key)
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      console.log('set key:', key)
      const result = Reflect.set(target, key, val)
      // 通知更新
      app.update()
      return result
    }
  })
}
```


我们在返回的app对象中加入一个更新函数，将之前渲染页面的代码写进去，然后调用一次

```js
// 2.2 用户直接编写render
this.update = function () {
  // 执行render函数（这里指定render函数中的this的上下文，是配置项中data函数的返回值）
  const el = options.render.call(proxy)

  // 3. 追加到宿主
  insert(el, parent)
}
// 调用一次
this.update()
```

可以看到，我们的页面就是响应式的了~ 两秒后内容会变

![GIF 2021-9-28 20-50-50.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02e5e91d7fb74862aa5bd559dcfd87c7~tplv-k3u1fbpfcp-watermark.image?)

休息一下，村长老师给大家唱首歌拉~~~~


![GIF 2021-9-28 20-57-15.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ffbbd3127fe45c38761c2f325c469cc~tplv-k3u1fbpfcp-watermark.image?)

### ② 依赖收集

上面编写的 `reactive` 函数中有一行`app.update()`，这里调用了 `app` 的方法，这和我们 `app` 是强耦合的，我们需要一种机制（发布订阅）来解耦这样的行为：将那些响应式数据和它们相关联的更新函数之间建立**依赖关系**

建立映射关系：依赖dep -> 组件更新函数

Vue2 使用watcher，具体实现可以看我之前的博文 [【Vue源码】数据响应式原理](https://juejin.cn/post/6984784552002600967)

Vue3 创建一个Map这样的数据结构来建立依赖关系 `{ target, { key: [update1, update2] } }`，后面要做的事情就是 **在get中建立依赖关系，在set中获取依赖关系**

下面我们来实现一下：

首先，我们定义一个副作用函数，接收一个函数作为参数 `fn` ，第一步就是要去执行这个 `fn` 函数
```js
function effect(fn) {
  // 1. 执行一次fn
  fn()
}
```
但是这里有个问题，就是执行 `fn` 的时候函数报错了，怎么办，所以我们写成**高阶函数**，包裹一下我们的 `fn`

首先创建一个栈 `effectStack` ，用来临时存储副作用函数

```js
const effectStack = []
```

这里为什么要使用栈来存储呢？ 因为调用副作用函数 `effect` 的时候可能发生嵌套关系，此时使用栈这样的数据结构就可以很好的收集 `eff`

将我们的 `effect` 函数进行升级改造
```js
function effect(fn) {
  // 1. 执行一次fn
  // fn()
  const eff = function () {
    try {
      effectStack.push(eff)
      fn()
    } finally {
      effectStack.pop()
    }
  }
  // 立即调用一次
  eff()
  // 将这个函数返回出去
  return eff
}
```

我们还需要构建这样的依赖关系数据结构

```js
const targetMap = {
// 应该往里面存这样的数据，依赖关系
// state: {
//   'title': [update]
// }
}
```

然后定义一个 `tarck` 函数，用来建立 `target` , `key` 和 `effectStack` 中存储的副作用函数之间的关系


```js
// 建立 target,key 和 effectStack 中存储的副作用函数之间的关系
function track(target, key) {
  // 拿出存储副作用函数的最后一个元素
  const effect = effectStack[effectStack.length - 1]
  // 写死的话是这样的，但是不能这样写，要不然每次都新创建一个对象
  // targetMap[target] = {}
  // targetMap[target][key] = [effect]
  // 所以应该先判断target为key的对象存不存在
  let map = targetMap[target]
  if (!map) {
    // 首次get这个target【不存在就给map初始化一下】 
    map = targetMap[target] = {}
  }

  let deps = map[key]
  if (!deps) {
    deps = map[key] = []
  }
  // 映射关系建立
  if (deps.indexOf(effect) === -1) {
    deps.push(effect)
  }
}
```

再定义一个 `trigger` 函数，用来触发更新

```js
function trigger(target, key) {
  const map = targetMap[target]
  if (map) {
    const deps = map[key]
    if (deps) {
      deps.forEach(dep => dep())
    }
  }
}
```

我们要在 `getter` 中**添加**依赖，在 `setter` 中**触发**更新，所以在 `proxy` 中这样设置

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log('get key:', key)
      // 建立依赖关系
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      console.log('set key:', key)
      Reflect.set(target, key, val)
      // 触发更新
      trigger(target, key)
    }
  })
}
```
最后我们来使用测试用例来测试一下

```js
// 创建响应式数据obj
const obj = reactive({
  foo: 'foo'
})
// 创建一个副作用函数，内部触发响应式数据
effect(() => {
  // 触发响应式数据 
  console.log(obj.foo)
}) 
// 改变obj中的foo属性
obj.foo = 'foo改变了~~~'
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/365a04e4a25946b4b0a73a5903f06fca~tplv-k3u1fbpfcp-watermark.image?)


我们来理理其中的关系

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd78a1517514d81a469071a14ba1452~tplv-k3u1fbpfcp-watermark.image?)

最后，我们要完善我们的代码了，我们要将我们之前写的 `update` 函数，建立副作用，使得数据在变化的时候，再次执行这个 `update` 函数

所以我们只需要将之前写的函数包一层 `effect` 高阶函数

```js
// 2.2 用户直接编写render
this.update = effect(() => {
  // 执行render函数（这里指定render函数中的this的上下文，是配置项中data函数的返回值）
  const el = options.render.call(proxy)

  // 3. 追加到宿主
  insert(el, parent)
})
// this.update()
```

此时我们删去我们的测试用例，看实际在 `setup` 中使用的效果：

![GIF 2021-9-29 23-49-18.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/903644c5c8424e67be4bf8d5771c3f59~tplv-k3u1fbpfcp-watermark.image?)

 
实际上，在源码中，targetMap 采用的数据结构不是一个对象，而是一个Map，而且是WeakMap
 
 
```js
const targetMap = new WeakMap()
```
一些操作改成对应的Map的get和set操作即可
 
```js
// let map = targetMap[target]
let map = targetMap.get(target)
```
 
```js
// map = targetMap[target] = {}
map = targetMap.set(target, {})
```
在存储依赖时，应该使用Set这样的数据结构，可以自动去重

```js
// deps = map[key] = []
deps = map[key] = new Set()

// 映射关系建立
// if (deps.indexOf(effect) === -1) {
//   deps.push(effect)
// }
deps.add(effect)
```


上面的响应式已经完成了，但是它有一个严重的效率问题，就是我们采用的是全量更新的方式更新我们的DOM，这样肯定是不好的，所以这就引出了我们下面要说的虚拟DOM和diff算法

## 3. 虚拟DOM

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e25f58b2c9d4c5daf297d5bf2cb80da~tplv-k3u1fbpfcp-watermark.image?)
  
虚拟DOM（vnode）是什么？
1. vnode就是一个js对象，用来描述视图

为什么要引入vnode？
1. 减少DOM操作
2. 高效更新
3. 跨平台、兼容性

下面我们来定义我们的虚拟DOM——vnode

我们要将compile函数中返回的render函数中的真实DOM变成虚拟DOM

```js
return function render() {
  // const h3 = document.createElement('h3')
  // h3.textContent = this.title
  // return h3
  // 应该产生虚拟DOM
  return h('h3', null, this.title)
  // return h('h3', null, [
  //   h('p', null, this.title),
  //   h('p', null, this.title),
  //   h('p', null, this.title),
  // ])
}
```
定义一个h函数功能是用js对象表示一个DOM

```js
// 传入信息，返回vnode，描述视图
function h(tag, props, children) {
  return {
    tag,
    props,
    children
  }
}
```

此时的更新函数也要改变

```js
this.update = effect(() => {

  const vnode = options.render.call(proxy)
  // 转换vnode为dom
  // 初始化创建整棵树
  if (!this.isMounted) {

    // 实现 createElm， 整体创建，vnode -> el
    const el = this.createElm(vnode)
    parent.innerHTML = ''
    insert(el, parent)
    // init 初始化，设置已挂载标识
    this.isMounted = true
  }
})
```
接下来实现createElm函数，采用递归的形式

```js
createElm({
  tag,
  props,
  children
}) {
  // 遍历vnode，创建整棵树
  const el = createElement(tag)
  // 如果存在属性，就设置他们（省略）
  // el.setAttribute(key, val)
  
  // 递归
  // 判断children是字符串
  if (typeof children === 'string') {
    el.textContent = children
  } else {
    children.forEach(child => insert(this.createElm(child), el))
  }
  return el
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd5b5d93c1634e6e801bb84bf5347fd5~tplv-k3u1fbpfcp-watermark.image?)



## 4. diff
更多细节可以看我之前的博文 [【Vue源码】图解 diff算法](https://juejin.cn/post/6984784551503790116)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db2dafb27ea64e6da0b4866d666a9caf~tplv-k3u1fbpfcp-watermark.image?)

要在createElm中保存真实节点

```js
// vnode中要保存真实DOM，以备未来更新使用
vnode.el = el
```

修改update函数，首次挂载部分前面完成了，加入更新的逻辑
```js
this.update = effect(() => {

  const vnode = options.render.call(proxy)
  // 转换vnode为dom
  // 初始化创建整棵树
  if (!this.isMounted) {

    // 实现 createElm， 整体创建，vnode -> el
    const el = this.createElm(vnode)
    parent.innerHTML = ''
    insert(el, parent)
    // init 初始化，设置已挂载标识
    this.isMounted = true
  } else {
    this.patch(this._vnode, vnode)
  }
  this._vnode = vnode
})
```


### patch更新

```js
patch(oldNode, newNode) {
  const el = newNode.el = oldNode.el
  // 1. 更新：必须更新相同节点
  // 什么样的是相同节点
  if (oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
    // update 相同节点，更新

    const oldChild = oldNode.children
    const newChild = newNode.children

    if (typeof oldChild === 'string') {
      if (typeof newChild === 'string') {
        // 文本更新
        if (oldChild !== newChild) {
          el.textContent = newChild
        }
      } else {
        // 替换文本为一组子元素，清空再创建并追加
        el.textContent = ''
        newChild.forEach(child => insert(this.createElm(child), el))

      }

    } else {
      if (typeof newChild === 'string') {
        // 替换一组子元素为文本
        el.textContent = newChild
      } else {

      }
    }
  } else {
    // replace 不相同节点，替换
  }
},
```

设置这样更新数据： 从字符串到数组
```js
setup() {
  const state = reactive({
    title: 'hello, vue3 YK菌'
  })

  setTimeout(() => {
    state.title = '2秒后见到新的YK菌'.split("")
  }, 2000)

  return state
}

```
效果

![GIF 2021-10-4 22-15-47.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dad22e2e392464b900f74587bae03b4~tplv-k3u1fbpfcp-watermark.image?)

### diff对比

Vue3和Vue2这部分基本一样，我之前的博文中也画过Vue2中diff的对比图，可以看看那篇 [【Vue源码】图解 diff算法](https://juejin.cn/post/6984784551503790116)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55ac68ed7b74454d9ea605d102b4314c~tplv-k3u1fbpfcp-watermark.image?)


这里我们简化，使用最简单粗暴的方式进行更新


```js
updateChildren(el, oldChild, newChild) {
  // 1.获取newCh和oldCh中较短的那一个
  const len = Math.min(oldChild.length, newChild.length)
  // 强制更新
  for (let i = 0; i < len; i++) {
    this.patch(oldChild[i], newChild[i])
  }

  // 处理剩余元素
  // 新数组元素多
  if (newChild.length > oldChild.length) {
    // 批量创建并追加
    // 截取newCh中len后面的部分
    newChild.slice(len).forEach(child => {
      insert(this.createElm(child), el)
    })
  } else if (newChild.length < oldChild.length) {
    // 批量删除
    oldChild.slice(len).forEach(child => {
      remove(child.el, el)
    })
  }
},
```


![GIF 2021-10-4 23-31-16.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91f3972934a04d60a3e4164b91bf801d~tplv-k3u1fbpfcp-watermark.image?)

