

JSX语法会被转换JS

```js
React.createElement(
  type, // 组件类型
  [props], // 标签属性 or 组件props
  [...children] // 子节点
)
```

写一个简单的jsx
```jsx
<div>
  <TextComponent />
  <div>hello, yk</div>
  let us learn React!
</div>
```
通过babel编译成
```js
React.createElement("div", null, 
  React.createElement(TextComponent, null),
  React.createElement("div", null, "hello, yk"),
  "let us learn React!"
)
```

jsx转换规则

元素类型|转换后类型|type属性
---|---|---
element|React element类型| 标签字符串，如"div"
fragment类型| React element类型|Symbol(react.fragment)类型
文本类型|字符串|无
数组类型|返回数组结构，内部元素被React.createElement转换| 无
组件类型|React element类型|组件类或者组件函数本身
三元表达式|执行，然后按上述规则处理|取决于返回值
函数执行|执行，然后按上述规则处理|取决于返回值



## fiber类型

React element 对象的每一个子节点都会形成一个与之对应的 fiber 对象，然后通过 sibling、return、child 将每一个 fiber 对象联系起来。


- child： 一个由父级 fiber 指向子级 fiber 的指针。
- return：一个子级 fiber 指向父级 fiber 的指针。
- sibling: 一个 fiber 指向下一个兄弟 fiber 的指针。



```js
export const FunctionComponent = 0;       // 函数组件
export const ClassComponent = 1;          // 类组件
export const IndeterminateComponent = 2;  // 初始化的时候不知道是函数组件还是类组件 
export const HostRoot = 3;                // Root Fiber 可以理解为根元素 ， 通过reactDom.render()产生的根元素
export const HostPortal = 4;              // 对应  ReactDOM.createPortal 产生的 Portal 
export const HostComponent = 5;           // dom 元素 比如 <div>
export const HostText = 6;                // 文本节点
export const Fragment = 7;                // 对应 <React.Fragment> 
export const Mode = 8;                    // 对应 <React.StrictMode>   
export const ContextConsumer = 9;         // 对应 <Context.Consumer>
export const ContextProvider = 10;        // 对应 <Context.Provider>
export const ForwardRef = 11;             // 对应 React.ForwardRef
export const Profiler = 12;               // 对应 <Profiler/ >
export const SuspenseComponent = 13;      // 对应 <Suspense>
export const MemoComponent = 14;          // 对应 React.memo 返回的组件
```

> jsx 中写的 map 数组结构的子节点，外层会被加上 fragment; map 返回数组结构，作为 fragment 的子节点。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e01f1038a04b989da2fdf8a12f3007~tplv-k3u1fbpfcp-watermark.image?)







