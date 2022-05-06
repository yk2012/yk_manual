
> 嗨！~ 大家好，我是YK菌 🐷 ，一个微系前端 ✨，喜欢分享自己学到的小知识 🏹，欢迎关注我呀 😘 ~ [微信号: `yk2012yk2012`，微信公众号：`ykyk2012`]

「这是我参与11月更文挑战的第3天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095/ "https://juejin.cn/post/7023643374569816095/")」


> Vue源码系列好久没更新了，今天来介绍AST抽象语法树，在正式介绍之前，我们会做一些准备工作，学习一些基本的算法知识，还有正则的知识。



[https://gitee.com/ykang2020/vue_learn](https://gitee.com/ykang2020/vue_learn)




# 1. 抽象语法树是什么

将**模板语法**直接编译成正常的**HTML语法**是非常困难的

而通过抽象语法树进行过渡，可以让编译工作变得简单

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e99d455bbc3a43e39de39f0b450dc7c8~tplv-k3u1fbpfcp-zoom-1.image)

抽象语法树（Abstract Syntax Tree）本质上就是一个JS对象
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4d4f59516fa4a2b813ee85da7950083~tplv-k3u1fbpfcp-zoom-1.image)

那抽象语法树与我们之前学的虚拟节点有什么关系呢

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93ef52eb788c442eabedce0de839228d~tplv-k3u1fbpfcp-zoom-1.image)




# 2. 知识储备

## 2.1 指针思想

试寻找字符串中，连续重复次数最多的字符 `aaaaaabbbbbbbcccccccccccccdddddd`


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8316c7fa85ae48e9911a7eafc7e622ec~tplv-k3u1fbpfcp-zoom-1.image)


```javascript
// 试寻找字符串中，连续重复次数最多的字符
let str = 'aaaaaaabbbbbbbbbbbccccccccccccccccccccccddddddddd'

let i = 0
let j = 1

let maxRepeatCount = 0
let maxRepeatChar = ''

while (i <= str.length - 1) {
  if (str[i] !== str[j]) {
    console.log(`${i}和${j}之间的字母${str[i]}连续重复了${j-i}次`)
    if (j - i > maxRepeatCount) {
      maxRepeatCount = j - i
      maxRepeatChar = str[i]
    }
    i = j
  }
  j++
}
console.log(`字母${maxRepeatChar}连续重复次数最多，重复了${maxRepeatCount}次`)
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c884f08768bf4b2597d219f853f29d3d~tplv-k3u1fbpfcp-zoom-1.image)

## 2.2 递归

这里可以参考我之前关于[斐波那契](https://juejin.cn/post/7007341127900626957)的博文

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc7e4dc656e94d7dbe7fe7fceb747640~tplv-k3u1fbpfcp-zoom-1.image)
直接暴力递归
```javascript
function fib(n) {
	return n === 0 || n === 1 ? 1 : fib(n-1) + fib(n-2)
}
```

加入缓存对象
```javascript
let cache = {}
function fib(n) {
	if(cache.hasOwnProperty(n)){
		return cache[n]
	}
	let value =  n === 0 || n === 1 ? 1 : fib(n-1) + fib(n-2)
	cache[n] = value
	return value
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/088d8ac09dd5433cb28d17e133227015~tplv-k3u1fbpfcp-zoom-1.image)

```javascript
let arr = [1, 2, 3, [4, 5, [6, 7], 8], 9, [10, 11]]

function convert(arr){
  let result = []
  arr.forEach(item => {
    if(typeof item === 'number'){
      result.push({
        value: item
      })
    }else if (Array.isArray(item)) {
      result.push({
        children: convert(item)
      })
    }
  })
  return result
}

let res = {children: convert(arr)}
console.log(res)
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c8828bd5d844b628ace55c734b4e170~tplv-k3u1fbpfcp-zoom-1.image)

```javascript
let arr = [1, 2, 3, [4, 5, [6, 7], 8], 9, [10, 11]]

function convert(item){
  if(typeof item === 'number'){
    return {value: item}
  }else if (Array.isArray(item)) {
    return {
      children: item.map(_item=>convert(_item))
    }
  }
}

console.log(convert(arr))
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3132cbbf20c48a7a3e36ea431c61443~tplv-k3u1fbpfcp-zoom-1.image)

## 2.3 正则表达式

`replace` 删除字符串中数字

```javascript
> 'awerfa453q5325fd5234rfsdf'.replace(/\d/g, '')
< "awerfaqfdrfsdf"
```

`search` 查找第一个匹配到的位置

```javascript
> 'awerfa453q5325fd5234rfsdf'.search(/\d/)
< 6
> 'awerfa453q5325fd5234rfsdf'.search(/\d/g)
< 6
```

`match` 匹配

```javascript
> 'awerfa453q5325fd5234rfsdf'.match(/\d/)
< ["4", index: 6, input: "awerfa453q5325fd5234rfsdf", groups: undefined]
> 'awerfa453q5325fd5234rfsdf'.match(/\d/g)
< (11) ["4", "5", "3", "5", "3", "2", "5", "5", "2", "3", "4"]
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8791575f4f8d483f9ae78e06a3d32553~tplv-k3u1fbpfcp-zoom-1.image)

`match` 捕获 分组

```javascript
> '23[abc]'.match(/^\d+\[/)
< ["23[", index: 0, input: "23[abc]", groups: undefined]
> '23[abc]'.match(/(^\d+)\[/)
< (2) ["23[", "23", index: 0, input: "23[abc]", groups: undefined]
```

`test`
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e65aa246038458dbe63ed54c1c2606d~tplv-k3u1fbpfcp-zoom-1.image)

## 2.4 栈的思想

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c55caddfdf314fa3895fbc988e899e3c~tplv-k3u1fbpfcp-zoom-1.image)

准备两个栈
一个用来存放数字
一个用来存放字符串

【解题思路】![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e7bf6c9f730452c8f65bc3b08232466~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/552f1c9f152b49ea8008b7a0a4befb5a~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dab166e2d1246f2b4fc1abf082eade0~tplv-k3u1fbpfcp-zoom-1.image)

```javascript
function smartRepeat(templateStr) {
  let i = 0
  let stackNumber = []
  let stackString = []

  let rest = templateStr

  while (i < templateStr.length - 1) {

    // 剩余部分
    rest = templateStr.substring(i);

    // 看剩余部分是不是以数字和[开头
    if (/^\d+\[/.test(rest)) {
      // 得到数字
      let times = Number(rest.match(/^(\d+)\[/)[1])
      // 将数字和空字符串分别入对应的栈
      stackNumber.push(times)
      stackString.push('')

      // 指针向后移动数字的位数 ，再加上[这一位
      i += times.toString().length + 1
    } else if (/^\w+\]/.test(rest)) {
      // 剩余部分是字母数字下划线和]开头的
      // 捕获[]中的内容
      let word = rest.match(/^(\w+)\]/)[1]
      // 将字符栈顶改为当前字母
      stackString[stackString.length - 1] = word
      // 指针右移，移动到]的位置
      i += word.length
    } else if (rest[0] === ']') {
      let word = stackString.pop()
      let times = stackNumber.pop()

      // 将word重复times次，插入到栈顶字符串后面
      let newStr = word.repeat(times)
      stackString[stackString.length - 1] += newStr
      i++
    }
    console.log(i, stackNumber, stackString)
  }
  return stackString[0].repeat(stackNumber[0])
}

let result = smartRepeat('2[4[abc]3[b]]')
console.log(result)
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9afaa7f1557749f1a6b6f382b58f0ad6~tplv-k3u1fbpfcp-zoom-1.image)
# 3. 实现AST


- 学习源码时，源码思想要**借鉴**，而不是**抄袭**，要能够发现源码中书写的精彩的地方
- 将独立的功能拆写为独立的js文件，通常是一个独立的类，每个独立的功能必须能独立的`单元测试`
- 应该围绕中心功能，**先把主干完成，然后修剪枝叶**
- 功能不需要一步到位，功能的拓展要一步一步完成，有的**非核心功能甚至不需要实现**


源码中的parse函数就是将HTML变成AST

index.js
```javascript
import parse from "./parse";

let templateString = `<div>
    <h3 class="aa bb cc" v-on="xxx" id="mybox">你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
</div>`;

const AST = parse(templateString);
console.log(AST);
```

parse.js
```javascript
import parseAttrsString from "./parseAttrsString";

/**
 * parse函数
 * @param {*} templateString
 * @returns
 */
export default function parse(templateString) {
  // 定义一个指针
  let i = 0;
  // 剩余部分
  let rest = "";

  // 开始标记正则
  let startRegExp = /^\<([a-z1-6]+)(\s[^\<]+)?\>/;
  // 结束标记正则
  let endRegExp = /^\<\/([a-z1-6]+)\>/;
  // 结束标记之前的文字【前面不是是<】
  let wordRegExp = /^([^\<]+)\<\/[a-z0-9]+\>/;

  // 准备两个栈
  let stack1 = []; // 辅助栈，存标签名
  let stack2 = [{ chilren: [] }];

  while (i < templateString.length - 1) {
    rest = templateString.substring(i);

    // 识别开始标签
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1];
      let attrsString = rest.match(startRegExp)[2];
      console.log(i, "检测到开始标记", tag);

      const attrsStringLength = attrsString == null ? 0 : attrsString.length;
      // 将开始标记 入栈1
      stack1.push(tag);
      // 处理标签属性
      const attrsArray = parseAttrsString(attrsString);
      // 将空数组 入栈2
      stack2.push({ tag: tag, chilren: [], attrs: attrsArray });

      i += tag.length + 2 + attrsStringLength;
    } else if (endRegExp.test(rest)) {
      // 遇见结束标签
      let tag = rest.match(endRegExp)[1];
      console.log(i, "检测到结束标记", tag);

      let pop_tag = stack1.pop();
      // 此时tag一定与stack1的栈顶相同
      if (tag === pop_tag) {
        let pop_arr = stack2.pop();

        if (stack2.length > 0) {
          stack2[stack2.length - 1].chilren.push(pop_arr);
        }
      } else {
        throw new Error(pop_tag + "标签没有封闭好");
      }

      i += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      let word = rest.match(wordRegExp)[1];
      // 看word是不是全空
      if (!/^\s+$/.test(word)) {
        // 不为空
        console.log(i, "检测到文字", word);
        // 改变stack2的栈顶元素
        stack2[stack2.length - 1].chilren.push({ text: word, type: 3 });
      }
      i += word.length;
    } else {
      i++;
    }
  }
  return stack2[0].chilren[0];
}
```

处理 标签属性 
parseAttrsString.js
```javascript
/**
 * 将attrsString变为数组返回
 * @param {*} attrsString
 */
export default function parseAttrsString(attrsString) {
  let result = [];
  // 当前是否在引号内
  let isQuote = false;
  let point = 0;
  if (attrsString === undefined) return [];

  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if (char === '"') {
      isQuote = !isQuote;
    } else if (char === " " && !isQuote) {
      // 是空格且不在引号之中
      let str = attrsString.substring(point, i);
      // 不是纯空格
      if (!/^\s*$/.test(str)) {
        result.push(str.trim());
        point = i;
      }
    }
  }
  // 循环结束之后，最后一个也要加进去
  result.push(attrsString.substring(point).trim());

  result = result.map((item) => {
    // 根据等号拆分
    const o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });

  return result;
}
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b303e53fdd9243de8e9c9bf141d687ce~tplv-k3u1fbpfcp-zoom-1.image)

[https://gitee.com/ykang2020/vue_learn](https://gitee.com/ykang2020/vue_learn)


> 最后，欢迎关注我的专栏，和**YK菌**做好朋友~



