
## 1. async 和 await
`async` 和 `await` 两种语法结合可以让异步代码像同步代码一样
`async`和`await`关键字让我们可以用一种更简洁的方式写出基于`Promise`的异步行为，而无需刻意地链式调用`promise`
`async`用来声明异步函数，函数会返回一个`promise`对象
`awiat`用来暂停异步函数代码的执行，等待`promise`解决

## 2. 用promise存在的一个问题*
这个`promise`在超时后会解决为一个值，如果程序中的其他代码要在这个值可用时访问它，则需要写一个解决处理程序
```javascript
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
// 如果程序中的其他代码要在这个值可用时访问它，则需要写一个解决处理程序
p.then(x => console.log(x)); //3
```
这样是不方便的，因为其他代码都必须塞到`promise`处理程序中
## 3. async 声明异步函数
1. `async`函数返回值为`promise`对象
2. `promise`对象的结果由`async`函数执行的返回值决定

```javascript
async function fn() {
 // 1. 返回结果不是一个Promise类型的对象，返回的结果就是成功的Promise对象
 // return 'yk';  // Promise {<resolved>: "yk"}
  // return; // Promise {<resolved>: undefined}
	
  // 2. 抛出错误，返回的结果是一个失败的Promise
  // throw new Error('出错'); // Promise {<rejected>: Error: 出错

  // 3. 返回一个Promise
  return new Promise((resolve, reject) => {
    // resolve('成功的数据');
    reject('失败的数据');
  })
}

const result = fn();
console.log(result);

result.then(value => {
  console.log(value);
}, reason => {
  console.warn(reason);
})
```
## 4. await 表达式

> 异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力，使用`await`关键字可以暂停异步函数代码的执行，等待期约解决

 `[返回值] = await 表达式;`
1. `await` 必须写在`async`函数中，但是`async`函数中可以没有`await`
2. `await` 右侧的表达式一般为 `promise` 对象，也可以是其他值
3. `await` 返回的是`promise`成功的值，如果是其他值就返回此值
4. `await`的`promise`失败了，就会抛出异常，需要通过`try-catch`捕获处理

```javascript
const promise = new Promise((resolve, reject)=> {
  // resolve('成功的值');
  reject('失败的数据');
})

async function main(){
  try {
    let result = await promise;
    console.log(result); // 成功的值
  } catch(e){
    console.log(e); // 失败的数据
  }
}
main() 
```

## 5. async与await解决上面的*问题
```javascript
async function foo() {
	let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
	console.log(await p);
}
foo(); // 3
```


## 6. 注意
`async`关键字不过是一个标识符，如果异步函数中没有`await`关键字，其执行与普通函数没什么区别

```javascript
async function foo() {
	console.log(2);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
```

```javascript
async function foo() {
	console.log(2);
	await null;
	console.log(4);
}
console.log(1);
foo();
console.log(3);


async function foo2() {
	console.log(2);
	console.log(await 4);
}
console.log(1);
foo2();
console.log(3);
```

```javascript
async function foo() {
	console.log(2);
	console.log(await Promise.resolve(6));
	console.log(7);
}
async function bar() {
	console.log(4);
	console.log(await 8);
	console.log(9);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
```

## 7. async与await结合发送ajax
```javascript
function sendAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300){
          resolve(xhr.response);
        }else{
          reject(xhr.status);
        }
      }
    }
  })
}

// then
sendAjax('https://api.apiopen.top/getJoke').then(value=>{
  console.log(value);
}, reason => {
})

// async await
async function sendmsg() {
  let daunzi = await sendAjax('https://api.apiopen.top/getJoke');
  console.log(daunzi)
}
sendmsg();
```

## 资料
[尚硅谷Web前端ES6教程](https://www.bilibili.com/video/BV1uK411H7on?p=49)
[尚硅谷Promise教程](https://www.bilibili.com/video/BV1MJ41197Eu?p=35)
[尚硅谷Web前端Promise教程从入门到精通](https://www.bilibili.com/video/BV1GA411x7z1?p=46)
[阮一峰ES6教程](https://es6.ruanyifeng.com/#docs/async) 
[MDN async_function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 
[MDN await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)