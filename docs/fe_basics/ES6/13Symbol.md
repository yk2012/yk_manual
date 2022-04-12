
> Symbol是原始值，且Symbol实例是唯一、不可变的。Symbol的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

# 1. 基本使用
## 1.1 创建Symbol
```javascript
let s = Symbol();
console.log(s, typeof s); // Symbol() "symbol"

let s2 = Symbol('YK菌');
let s3 = Symbol('YK菌');
console.log(s2, typeof s2, s2===s3); // Symbol(YK菌) "symbol" false

let s4 = Symbol.for('YK菌');
let s5 = Symbol.for('YK菌');
console.log(s4, typeof s4, s4===s5); // Symbol(YK菌) "symbol" true
```
## 1.2 性质
1) Symbol的值是唯一的，用来解决命名冲突的问题
2) Symbol值不能与其他数据进行运算
3) Symbol定义的对象属性不能使用 for…in循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名

```javascript
let s = Symbol();
let result1 = s + 100; // TypeError: Cannot convert a Symbol value to a number
let result2 = s > 100; // TypeError: Cannot convert a Symbol value to a number
let result3 = s + '100'; // TypeError: Cannot convert a Symbol value to a string
let result4 = s + s; // TypeError: Cannot convert a Symbol value to a number
```
# 2. 基本应用
## 2.1 给对象添加属性和方法
```javascript
// 向game对象中添加方法up, down
let game = { 
	name: '俄罗斯方块',
	up: function(){ console.log('上升')},
	down: function(){ console.log('下降') }
};

// 声明一个对象
let methods = {
	up: Symbol('up'),
	down: Symbol('down')
};
// 添加方法
game[methods.up] = function() {
	console.log('methods.up改变形状');
}
game[methods.down] = function() {
	console.log('methods.down快速下降');
}

console.log(game);
// down: ƒ ()
// name: "俄罗斯方块"
// up: ƒ ()
// Symbol(down): ƒ ()
// Symbol(up): ƒ ()
```

```javascript
let game = {
	name: '狼人杀',
	[Symbol('say')]: function() {
		console.log('发言');
	},
	[Symbol('zibao')]: function() {
		console.log('自爆');
	}
}
console.log(game); // {name: "狼人杀", Symbol(say): ƒ, Symbol(zibao): ƒ}

```
# 3. Symbol内置值（well-known symbol）
> ECMAScript 6也引入了一批常用内置符号（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。

## Symbol.hasInstance
> 一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由instanceof操作符使用

instanceof操作符可以用来确定一个对象实例的原型链上是否有原型
当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
```javascript
class Person{ 
	static [Symbol.hasInstance](param) {
		console.log(param);
		console.log('我被用来检测类型');
		return true;
	}
}
let o = {}
console.log(o instanceof Person); // {} '我被用来检测类型' true
```

## Symbol.isConcatSpreadable
> 一个布尔值，如果是true，则意味着对象应该用Array.prototype.concat()打平其数组元素”

ES6中的Array.prototype.concat()方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。覆盖Symbol.isConcatSpreadable的值可以修改这个行为
对象的Symbol.isConcatSpreadable属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开
```javascript
const arr = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(arr.concat(arr2)); // [1, 2, 3, 4, 5, 6]

arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2)); //[1, 2, 3, [4, 5, 6]]
```


## Symbol.iterator

> 一个方法，该方法返回对象默认的迭代器。由for-of语句使用

## Symbol.toStringTag

> 一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法Object.prototype.toString()使用

## Symbol.match

> 一个正则表达式方法，该方法用正则表达式去匹配字符串。由String.prototype.match()方法使用

## Symbol.replace

> 一个正则表达式方法，该方法替换一个字符串中匹配的子串。由String.prototype.replace()方法使用

## Symbol.search

> 一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由String.prototype.search()方法使用


## Symbol.split

> 一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由String.prototype.split()方法使用

## Symbol.toPrimitive

> 一个方法，该方法将对象转换为相应的原始值。由ToPrimitive抽象操作使用

## Symbol.species

> 一个函数值，该函数作为创建派生对象的构造函数

## Symbol.asyncIterator

> 一个方法，该方法返回对象默认的AsyncIterator。由for-await-of语句使用

这个符号表示实现异步迭代器API的函数

## Symbol.unscopables

> 一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中排除