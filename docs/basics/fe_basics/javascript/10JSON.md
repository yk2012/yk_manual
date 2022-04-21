@[toc]
# JavaScript Object Notation JS对象表示法

# 1. JSON 格式
- 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
- 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）
- 字符串必须使用双引号表示，不能使用单引号
- 对象的键名必须放在双引号里面
- 数组或对象最后一个成员的后面，不能加逗号
- JS中的对象只有JS自己认识，其他的语言都不认识
- JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，并且可以转换为任意语言中的对象，JSON在开发中主要用来数据的交互JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须加双引号其他的和JS语法一致

# 2. JSON分类
1. 对象 {}
2. 数组 []

# 3. JSON中允许的值
1. 字符串
2. 数值
3. 布尔值
4. null
5. 对象
6. 数组

## 3.1 举例

```javascript
var arr = '[1,2,3,"hello",true]';  
			  
var obj2 = '{"arr":[1,2,3]}';  
  
var arr2 ='[{"name":"孙悟空","age":18,"gender":"男"},{"name":"孙悟空","age":18,"gender":"男"}]';
```


# 4. JSON工具类

## 4.1 json > js对象

```javascript
JSON.parse()
```
- 可以将以JSON字符串转换为js对象
- 它需要一个JSON字符串作为参数，会将该字符串转换为JS对象并返回


```javascript
var o = JSON.parse(json);
var o2 = JSON.parse(arr);

var obj3 = {name:”猪八戒” , age:28 , gender:”男”};
```


## 4.2 JS对象 > JSON

```javascript
JSON.stringify() // -ify/fy，表示”使……化。
```

- 可以将一个JS对象转换为JSON字符串
- 需要一个js对象作为参数，会返回一个JSON字符串

```javascript
var str = JSON.stringify(obj3);
console.log(str);
```

- JSON这个对象在IE7及以下的浏览器中不支持，所以在这些浏览器中调用时会报错