

# 事件循环

同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。

当指定的事情完成时，Event Table会将这个函数移入Event Queue。

主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。

上述过程会不断重复，也就是常说的Event Loop(事件循环)。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210524200544978.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# JS执行过程图原理图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210301170822560.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# 说明

JS是单线程的

- JS 中用来存储待执行回调函数的队列包含2个不同特定的队列

1. 宏队列：用来保存待执行的宏任务（回调），比如：定时器回调 、 DOM 事件回调 、 ajax 回调

2. 微队列：用来保存待执行的微任务（回调），比如：promise 的回调 、 MutationObserver 的回调还有如 I/O 操作、UI 渲染（node中的process.newtTick）

- JS 执行时会区别这2个队列

1. JS 引擎首先必须执行所有的初始化同步任务代码

1. 每次准备取出第一个宏任务microtask前，都要将所有的microtask微任务一个一个取出来执行

总结： 同步任务——微队列——宏队列





# 例子
```javascript
setTimeout(() => { // 放入宏队列   3
  console.log('timeout()1');
  Promise.resolve(5).then(value=>{ // 放入微队列   4
  console.log('promise resolve()5', value);
});
}, 0);
Promise.resolve(2).then(value=>{ // 放入微队列   1
  console.log('promise resolve()2', value);
});
setTimeout(() => { // 放入宏队列  5
  console.log('timeout()3');
}, 0);
Promise.resolve(4).then(value=>{ // 放入微队列   2
  console.log('promise resolve()4', value);
});
// 11宏队列与微队列.html:18 promise resolve()2 2
// 11宏队列与微队列.html:24 promise resolve()4 4
// 11宏队列与微队列.html:12 timeout()1
// 11宏队列与微队列.html:14 promise resolve()5 5
// 11宏队列与微队列.html:21 timeout()3
```


# 总结
首先js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。

在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务

当同步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。

任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。

当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

# 例题

```javascript
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function(resolve, reject) {
  console.log(2);
  resolve()
}).then(function() {
  console.log(3)
});
process.nextTick(function () {
  console.log(4)
})
console.log(5) 
```

第一轮：主线程开始执行，遇到setTimeout，将setTimeout的回调函数丢到 **宏任务队列** 中，在往下执行new Promise **立即执行** ，输出2，then的回调函数丢到 **微任务队列** 中，再继续执行，遇到process.nextTick，同样将回调函数扔到为 **微任务队列** ，再继续执行，**同步** 输出5

当所有同步任务执行完成后看有没有可以执行的微任务，发现有then函数和nextTick两个微任务，先执行哪个呢？process.nextTick指定的异步任务总是发生在所有异步任务之前，因此先执行process.nextTick输出4然后执行then函数输出3，第一轮执行结束。

第二轮：从宏任务队列开始，发现setTimeout回调，输出1执行完毕

因此结果是25431


# 参考
- [尚硅谷Promise教程](https://www.bilibili.com/video/BV1MJ41197Eu?p=36)
- [https://juejin.cn/post/6844904200917221389](https://juejin.cn/post/6844904200917221389)


