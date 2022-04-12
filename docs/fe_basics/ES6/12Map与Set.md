# 1. Set集合

ES6 提供了新的数据结构 Set（集合 ）

它类似于**数组**，但成员的值都是唯一的 

集合实现了 iterator接口，所以可以使用『扩展运算符』和『 for…of…』进行遍历

## 集合的属性和方法：

1) `size` 返回集合的元素个数
2) `add` 增加一个新元素，返回当前集合，可以链式调用
3) `delete` 删除元素，返回 `boolean` 值
4) `has` 检测集合中是否包含某个元素，返回 `boolean`值
5) `clear` 清空集合，返回 `undefined`

```javascript
let s = new Set();
console.log(s, typeof s); // Set(0){} "object"
let s2 = new Set(['大事儿','小事儿','好事儿','坏事儿','小事儿']);
console.log(s2); // Set(4) {"大事儿", "小事儿", "好事儿", "坏事儿"}
```

## 集合实践

```javascript
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 1. 数组去重
let result = [...new Set(arr)];
console.log(result); // (5) [1, 2, 3, 4, 5]

// 2. 交集
let arr2 = [4, 5, 6, 5, 6];
let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item));
console.log(result2); // (2) [4, 5]

// 3. 并集
let union =[...new Set([...arr, ...arr2])];
console.log(union); // (6) [1, 2, 3, 4, 5, 6]

// 4. 差集
let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
console.log(diff); // (3) [1, 2, 3]
```


# 2. Map映射

ES6 提供了 Map 数据结构

它类似于**对象**，也是键值对的集合。 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

Map也实现了iterator接口，所以可以使用『扩展运算符』和『 for…of…』进行遍历

## Map的属性和方法

1) `size`： 返回 `Map`的元素个数
2) `set`： 增加一个新元素，返回当前 `Map`
3) `get`： 返回键名对象的键值
4) `has`： 检测 `Map`中是否包含某个元素，返回 `boolean`值
5) `clear`： 清空集合，返回 `undefined`
6) `delete`： 删除元素

## 使用

```javascript
let m = new Map();
m.set('name', 'YK菌');
console.log(m) // Map(1) {"name" => "YK菌"}

m.set('change', function(){console.log('我可以改变自己')})
console.log(m) // Map(2) {"name" => "YK菌", "change" => ƒ}

let key = {
	school: 'AHU'
};
m.set(key, ['罄苑', '江淮', '龙河'])
console.log(m) // Map(3) {"name" => "YK菌", "change" => ƒ, {…} => Array(3)}
```


## 注意

```javascript
Array.prototype.map()
```

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。


```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

`callback` 生成新数组元素的函数，使用三个参数：
1. `currentValue` callback 数组中正在处理的当前元素。
2. `index` 可选 callback 数组中正在处理的当前元素的索引。
3. `array` 可选 map 方法调用的数组。

`thisArg` 可选 执行 callback 函数时值被用作this。