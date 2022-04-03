@[toc](手写Promise)

[代码见https://github.com/yk2012/Promise_demo](https://github.com/yk2012/Promise_demo)
# 1. 整体结构框架

```javascript
/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'fulfilled'
  const REJECTED = 'rejected'

  /**
   * Promise构造函数
   * @param {function} executor 执行器函数（同步执行）(resolve, reject) => {}
   */
  function Promise(executor) {
  
  }

  /**
   * Promise原型对象then方法 
   * 指定成功和失败的回调函数
   * @param {function} onResolved 成功的回调函数(value) => {}
   * @param {function} onRejected 失败的回调函数(reason) => {}
   * @returns 一个新的promise对象结果由onResolved/onRejected执行的结果决定
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    
  }

  /**
   * Promise原型对象catch方法
   * 指定失败的回调函数
   * @param {function} onRejected 失败的回调函数(reason) => {}
   * @returns 一个新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    
  }

  /**
   * Promise函数对象resolve方法
   * @param {*} value 成功的值
   * @returns 一个成功/失败的promise
   */
   Promise.resolve = function (value) {

  }

  /**
   * Promise函数对象reject方法
   * @param {*} resaon 失败的原因
   * @returns 一个失败的promise
   */
  Promise.reject = function (resaon) {

  }

  /**
   * Promise函数对象all方法
   * @param {Array<Promise>} promises 
   * @returns 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
   */
  Promise.all = function (promises) {

  }

  /**
   *Promise函数对象race方法
   * @param {Array<Promise>} promises 
   * @returns 返回 一个promise，其结果由第一个完成的promise决定
   */
  Promise.race = function (promises) {

  }


  // 向外暴露Promise函数
  window.Promise = Promise
})(window)
```

# 2. Promise(executor)
   * Promise构造函数
   * executor: 执行器函数（同步执行）
   
```javascript
/**
 * Promise构造函数
 * @param {*} executor 执行器函数（同步执行）(resolve, reject) => {}
 */
function Promise(executor) {

  const self = this; // 保存当前实例对象的this的值
  // 添加属性
  self.PromiseState = PENDING // 给promise对象指定status属性，初始值为pending
  self.PromiseResult = null // 给promise对象指定一个用于存储结果数据的属性
  self.callbacks = [] // 存的是对象 每个元素的结构：{onResolved() {}, onRejected() {}}

  /**
   * executor内部定义成功时调用的函数
   * @param {*} value 成功的值
   * @returns 
   */
  function resolve(value) {
    // 如果当前状态不是pending，直接结束
    if (self.PromiseState !== PENDING) return
    // 1. 修改对象的状态（promiseState）为 fulfilled
    self.PromiseState = RESOLVED 
    // 2. 设置对象结果值（promiseResult）为 value
    self.PromiseResult = value
    // 如果有待执行的callback函数，立即【异步】执行回调函数onResolved
    if (self.callbacks.length > 0) {
      setTimeout(() => { // 放入队列中执行所有成功的回调
        self.callbacks.forEach(callbacksObj => {
          callbacksObj.onResolved(value)
        })
      }, 0)
    }
  }
  
  /**
   * executor内部定义失败时调用的函数
   * @param {*} reason 失败的原因
   * @returns 
   */
  function reject(reason) {
    // 如果当前状态不是pending，直接结束
    if (self.PromiseState !== PENDING) return
    // 1. 修改对象的状态（promiseState）为 rejected
    self.PromiseState = REJECTED
    // 2. 设置对象结果值（promiseResult）为 reason
    self.PromiseResult = reason
    // 如果有待执行的callback函数，立即【异步】执行回调函数onRejected
    if (self.callbacks.length > 0) {
      setTimeout(() => { // 放入队列中执行所有失败的回调
        self.callbacks.forEach(callbacksObj => {
          callbacksObj.onRejected(reason)
        })
      }, 0)
    }
  }
  
  // 立即【同步】执行executor函数
  try {
    executor(resolve, reject)
  } catch(error) { // 如果执行器抛出异常，promise对象变成rejected状态
    reject(error)
  }
}
```
# 3. Promise.prototype.then

```javascript
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    if (self.PromiseState === PENDING) { // 假如当前状态还是pending状态，将回调函数保存起来
      self.callbacks.push({
        onResolved(value) {
          // onResolved(self.PromiseResult)
          try {
            const result = onResolved(self.PromiseResult) // 执行成功的回调 result接收返回值
            if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
              // result.then(
              //   value => {
              //     resolve(value) // 当result成功时，让return的promise也成功
              //   },
              //   reason => {
              //     reject(reason) // 当result失败时，让return的promise也失败
              //   }
              // )
              result.then(resolve, reject) // 简洁写法
            } else { // 2. 如果回调函数返回的不是promise
              resolve(result)
            }
          } catch (error) { //1. 如果抛出异常
            reject(error)
          }
         },
        onRejected(reason) {
          // onRejected(self.PromiseResult)
          try {
            const result = onRejected(self.PromiseResult) // 执行失败的回调 result接收返回值
            if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
              result.then(resolve, reject)
            } else { // 2. 如果回调函数返回的不是promise
              resolve(result)
            }
          } catch (error) { //1. 如果抛出异常
            reject(error)
          }
         }
      })
    } else if (self.PromiseState === RESOLVED) { // resolved
      setTimeout(() => {
        /**
         * 1. 如果抛出异常，return的promise就会失败，reason是error
         * 2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
         * 3. 如果回调函数返回的是promise，return的promise结果就是这个promise的结果
         */
        try {
          const result = onResolved(self.PromiseResult) // 执行成功的回调 result接收返回值
          if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
            // result.then(
            //   value => {
            //     resolve(value) // 当result成功时，让return的promise也成功
            //   },
            //   reason => {
            //     reject(reason) // 当result失败时，让return的promise也失败
            //   }
            // )
            result.then(resolve, reject) // 简洁写法
          } else { // 2. 如果回调函数返回的不是promise
            resolve(result)
          }
        } catch (error) { //1. 如果抛出异常
          reject(error)
        }
      }, 0)
    } else { // rejected
      setTimeout(() => {
        try {
          const result = onRejected(self.PromiseResult) // 执行失败的回调 result接收返回值
          if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
            result.then(resolve, reject)
          } else { // 2. 如果回调函数返回的不是promise
            resolve(result)
          }
        } catch (error) { //1. 如果抛出异常
          reject(error)
        }
      }, 0)
    }
  })
}
```
简化封装一下

```javascript
/**
 * Promise原型对象then方法 
 * 指定成功和失败的回调函数
 * @param {function} onResolved 成功的回调函数(value) => {}
 * @param {function} onRejected 失败的回调函数(reason) => {}
 * @returns 一个新的promise对象结果由onResolved/onRejected执行的结果决定
 */
Promise.prototype.then = function (onResolved, onRejected) {
  // 指定默认的成功的回调onResolved （向后传递成功的value）
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  // 指定默认的失败的回调onRejected（向后传递失败的reason 实现错误/异常传透的关键点）
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

  const self = this

  return new Promise((resolve, reject) => {
    /**
     * 调用指定回调函数处理，根据执行的结果改变return的promise的状态
     * @param {function} callback 指定回调函数
     */
    function handle(callback) {
      try {
        const result = callback(self.PromiseResult) // result获取回调函数执行(return)的结果
        if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
          result.then(resolve, reject) // 简洁写法
        } else { // 2. 如果回调函数返回的不是promise
          resolve(result)
        }
      } catch (error) { //1. 如果抛出异常
        reject(error)
      }
    }

    if (self.PromiseState === PENDING) { // 1. 当前状态是pending状态，将回调函数保存起来
      self.callbacks.push({
        onResolved(value) { //执行成功的回调函数，改promise的状态
          handle(onResolved)
         },
        onRejected(reason) { //执行失败的回调函数，改promise的状态
          handle(onRejected)
         }
      })
    } else if (self.PromiseState === RESOLVED) { // 2. resolved，【异步】执行onResolved并改变return的promise的状态
      setTimeout(() => {
        handle(onResolved)
      }, 0)
    } else { // 3. rejected，【异步】执行onRejected并改变return的promise的状态
      setTimeout(() => {
        handle(onRejected)
      }, 0)
    }
  })
}
```
# 4. Promise.prototype.catch

```javascript
/**
 * Promise原型对象catch方法
 * 指定失败的回调函数
 * @param {function} onRejected 失败的回调函数(reason) => {}
 * @returns 一个新的promise对象
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
```
# 5. Promise.resolve

```javascript
/**
 * Promise函数对象resolve方法
 * @param {*} value 成功的值
 * @returns 一个成功/失败的promise
 */
Promise.resolve = function (value) {
  // 返回一个成功/失败的promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
      value.then(resolve,reject)
    } else { // value不是promise => promise状态变为成功，数据是value
      resolve(value)
    }
  })
}
```

# 6. Promise.reject

```javascript
/**
 * Promise函数对象reject方法
 * @param {*} resaon 失败的原因
 * @returns 一个失败的promise
 */
Promise.reject = function (reason) {
  // 返回一个失败的promise
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```

# 7. Promise.all	

```javascript
/**
 * Promise函数对象all方法
 * @param {Array<Promise>} promises 
 * @returns 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0 // 声明计数变量
    // const values = []; // 保存每个成功promise结果的数组
    const values = new Array(promises.length) // 指定数组长度
    for (let i = 0; i < promises.length; i++){
      // promises[i].then(value => {
      Promise.resolve(promises[i]).then(value => { // 防止数组中有不是promise的元素
        // 得知对象状态是成功
        count++
        // 将当前promise对象成功的结果存入到数组中
        values[i] = value
        if (count === promises.length) { //每个promise对象都成功
          resolve(values) // 修改函数状态
        }
      }, reason => {
          reject(reason)
        })
    }
  })
}
```

# 8. Promise.race

```javascript
/**
 *Promise函数对象race方法
 * @param {Array<Promise>} promises 
 * @returns 返回 一个promise，其结果由第一个完成的promise决定
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++){
      // promises[i].then(value => {
      Promise.resolve(promises[i]).then(value => { // 防止数组中有不是promise的元素
        // 修改返回对象的状态为 成功
        resolve(value)
      }, reason => {
        reject(reason)
      })
    }
  })
}
```


# 9. 自定义函数对象方法Promise.resolveDelay&Promise.rejectDelay

```javascript
/**
 * 自定义方法 延时返回一个成功/失败的promise
 * @param {*} value 成功的数据
 * @param {Number} timeout 延迟时间
 * @returns 一个成功/失败的promise
 */
Promise.resolveDelay = function (value, timeout) {
  // 延时返回一个成功/失败的promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
        value.then(resolve,reject)
      } else { // value不是promise => promise状态变为成功，数据是value
        resolve(value)
      }
    })
  }, timeout);
}

/**
 * 自定义方法 延时返回一个失败的promise
 * @param {*} reason 失败的原因
 * @param {*} timeout 延迟时间
 * @returns 一个失败的promise
 */
Promise.rejectDelay = function (reason, timeout) {
  // 延时返回一个失败的promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(reason)
    }, timeout)
  })
}
```

# 10. class写法

```javascript
/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {

  const PENDING = 'pending'
  const RESOLVED = 'fulfilled'
  const REJECTED = 'rejected'

  class Promise {
    /**
     * Promise构造函数
     * @param {function} executor 执行器函数（同步执行）(resolve, reject) => {}
     */
    constructor(executor) {

      const self = this; // 保存当前实例对象的this的值
      // 添加属性
      self.PromiseState = PENDING // 给promise对象指定status属性，初始值为pending
      self.PromiseResult = null // 给promise对象指定一个用于存储结果数据的属性
      self.callbacks = [] // 存的是对象 每个元素的结构：{onResolved() {}, onRejected() {}}

      /**
       * executor内部定义成功时调用的函数
       * @param {*} value 成功的值
       * @returns 
       */
      function resolve(value) {
        // 如果当前状态不是pending，直接结束
        if (self.PromiseState !== PENDING) return
        // 1. 修改对象的状态（promiseState）为 fulfilled
        self.PromiseState = RESOLVED
        // 2. 设置对象结果值（promiseResult）为 value
        self.PromiseResult = value
        // 如果有待执行的callback函数，立即【异步】执行回调函数onResolved
        if (self.callbacks.length > 0) {
          setTimeout(() => { // 放入队列中执行所有成功的回调
            self.callbacks.forEach(callbacksObj => {
              callbacksObj.onResolved(value)
            })
          }, 0)
        }
      }
    
      /**
       * executor内部定义失败时调用的函数
       * @param {*} reason 失败的原因
       * @returns 
       */
      function reject(reason) {
        // 如果当前状态不是pending，直接结束
        if (self.PromiseState !== PENDING) return
        // 1. 修改对象的状态（promiseState）为 rejected
        self.PromiseState = REJECTED
        // 2. 设置对象结果值（promiseResult）为 reason
        self.PromiseResult = reason
        // 如果有待执行的callback函数，立即【异步】执行回调函数onRejected
        if (self.callbacks.length > 0) {
          setTimeout(() => { // 放入队列中执行所有失败的回调
            self.callbacks.forEach(callbacksObj => {
              callbacksObj.onRejected(reason)
            })
          }, 0)
        }
      }
    
      // 立即【同步】执行executor函数
      try {
        executor(resolve, reject)
      } catch (error) { // 如果执行器抛出异常，promise对象变成rejected状态
        reject(error)
      }
    }

    /**
     * Promise原型对象then方法 
     * 指定成功和失败的回调函数
     * @param {function} onResolved 成功的回调函数(value) => {}
     * @param {function} onRejected 失败的回调函数(reason) => {}
     * @returns 一个新的promise对象结果由onResolved/onRejected执行的结果决定
     */
    then (onResolved, onRejected) {
      // 指定默认的成功的回调onResolved （向后传递成功的value）
      onResolved = typeof onResolved === 'function' ? onResolved : value => value
      // 指定默认的失败的回调onRejected（向后传递失败的reason 实现错误/异常传透的关键点）
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

      const self = this

      return new Promise((resolve, reject) => {
        /**
         * 调用指定回调函数处理，根据执行的结果改变return的promise的状态
         * @param {function} callback 指定回调函数
         */
        function handle(callback) {
          try {
            const result = callback(self.PromiseResult) // result获取回调函数执行(return)的结果
            if (result instanceof Promise) { // 3. 如果回调函数返回的是promise
              result.then(resolve, reject) // 简洁写法
            } else { // 2. 如果回调函数返回的不是promise
              resolve(result)
            }
          } catch (error) { //1. 如果抛出异常
            reject(error)
          }
        }

        if (self.PromiseState === PENDING) { // 1. 当前状态是pending状态，将回调函数保存起来
          self.callbacks.push({
            onResolved(value) { //执行成功的回调函数，改promise的状态
              handle(onResolved)
            },
            onRejected(reason) { //执行失败的回调函数，改promise的状态
              handle(onRejected)
            }
          })
        } else if (self.PromiseState === RESOLVED) { // 2. resolved，【异步】执行onResolved并改变return的promise的状态
          setTimeout(() => {
            handle(onResolved)
          }, 0)
        } else { // 3. rejected，【异步】执行onRejected并改变return的promise的状态
          setTimeout(() => {
            handle(onRejected)
          }, 0)
        }
      })
    }


    /**
     * Promise原型对象catch方法
     * 指定失败的回调函数
     * @param {function} onRejected 失败的回调函数(reason) => {}
     * @returns 一个新的promise对象
     */
    catch (onRejected) {
      return this.then(undefined, onRejected)
    }


    /**
     * Promise函数对象resolve方法
     * @param {*} value 成功的值
     * @returns 一个成功/失败的promise
     */
    static resolve(value) {
      // 返回一个成功/失败的promise
      return new Promise((resolve, reject) => {
        if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
          value.then(resolve,reject)
        } else { // value不是promise => promise状态变为成功，数据是value
          resolve(value)
        }
      })
    }


    /**
     * Promise函数对象reject方法
     * @param {*} resaon 失败的原因
     * @returns 一个失败的promise
     */
    static reject (reason) {
      // 返回一个失败的promise
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

  
    /**
     * Promise函数对象all方法
     * @param {Array<Promise>} promises 
     * @returns 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
     */
     static all (promises) {
      return new Promise((resolve, reject) => {
        let count = 0 // 声明计数变量
        // const values = []; // 保存每个成功promise结果的数组
        const values = new Array(promises.length) // 指定数组长度
        for (let i = 0; i < promises.length; i++){
          // promises[i].then(value => {
            Promise.resolve(promises[i]).then(value => { // 防止数组中有不是promise的元素
            // 得知对象状态是成功
            count++
            // 将当前promise对象成功的结果存入到数组中
            values[i] = value
            if (count === promises.length) { //每个promise对象都成功
              resolve(values) // 修改函数状态
            }
          }, reason => {
              reject(reason)
            })
        }
      })
    }


    /**
     *Promise函数对象race方法
    * @param {Array<Promise>} promises 
    * @returns 返回 一个promise，其结果由第一个完成的promise决定
    */
    static race (promises) {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++){
          // promises[i].then(value => {
          Promise.resolve(promises[i]).then(value => { // 防止数组中有不是promise的元素
            // 修改返回对象的状态为 成功
            resolve(value)
          }, reason => {
            reject(reason)
          })
        }
      })
    }

    /**
     * 自定义方法 延时返回一个成功/失败的promise
     * @param {*} value 成功的数据
     * @param {Number} timeout 延迟时间
     * @returns 一个成功/失败的promise
     */
    static resolveDelay (value, timeout) {
      // 延时返回一个成功/失败的promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
            value.then(resolve,reject)
          } else { // value不是promise => promise状态变为成功，数据是value
            resolve(value)
          }
        })
      }, timeout);
    }

    /**
     * 自定义方法 延时返回一个失败的promise
     * @param {*} reason 失败的原因
     * @param {*} timeout 延迟时间
     * @returns 一个失败的promise
     */
     static rejectDelay (reason, timeout) {
      // 延时返回一个失败的promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason)
        }, timeout)
      })
    }
  }

  // 向外暴露Promise函数
  window.Promise = Promise
})(window)
```
[代码见https://github.com/yk2012/Promise_demo](https://github.com/yk2012/Promise_demo)