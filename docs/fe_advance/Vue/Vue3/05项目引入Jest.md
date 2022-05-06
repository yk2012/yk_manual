## 单元测试

单元测试（Unit Testing），是指对软件中的最小可测试单元进行检查和验证。

我们实现了一个简单的 add 函数, 并且使用打印 3 和 add(1,2) 的结果来判断函数输出。

```js
function add(x, y){
  return x + y
}

console.log(3 === add(1,2))
```

add 函数虽然看起来很简单，但实际使用时可能会遇到很多情况。比如说 x 如果是字符串，或者对象等数据类型的时候，add 结果是否还可以符合预期？而且 add 函数还有可能被你的同事不小心加了其他逻辑，这都会干扰 add 函数的行为。

为了让 add 函数的行为符合预期，你希望能添加很多 Console 的判断逻辑，并且让这些代码自动化执行。

下面的代码中，我们定义了函数 test 执行测试函数，可以给每个测试起个名字，方便调试的时候查找，expect 可以判断传入的值和预期是否相符。

```js
function add(x,y){
  return x+y
}

function expect(ret){
  return {
    toBe(arg){
      if(ret !== arg){
        throw Error(`预计和实际不符,预期是${arg}，实际是${ret}`)
      }
    }
  }
}

function test(title, fn){
  try{
    fn()
    console.log(title,'测试通过')
  }catch(e){
    console.log(e)
    console.error(title,'测试失败')
  }
}

test('测试数字相加', ()=>{
  expect(add(1,2)).toBe(3)
})
```

命令行执行 node add.js 以后，我们就可以看到下面的结果。如果每次 Git 提交代码之前，我们都能执行一遍 add.js 去检查 add 函数的逻辑，add 函数相当于有了个自动检查员，这样就可以很好地提高 add 函数的可维护性。

```shell
➜  ailemente git:(main) ✗ node add.js
测试数字相加 测试通过
```

下一步，我们如果想让 add 函数支持更多的数据类型，比如我们想支持数字字符串的相加，又要怎么处理呢？我们可以先写好测试代码，在下面的代码中，我们希望数字 1 和字符串 2 也能以数字的形式相加。


```js
test('测试数字和字符串数字相加',()=>{
  expect(add(1,'2')).toBe(3)
})
```

我们在命令行里执行 node add.js 之后，就会提示报错，这说明现在代码还没有符合新的需求，我们需要进一步丰富 add 函数的逻辑。

我们把 add 函数改成下面的代码，再执行 add.js 后，就会提示你两个测试都通过了，这样我们就确保新增逻辑的时候，也没有影响到之前的代码逻辑。

```js
function add(x, y){
  if(Number(x) == x && Number(y) == y){
    return Number(x) + Number(y)
  }
  return x + y
}
```

这是一个非常简单的场景演示，但这个例子能够帮助你快速了解什么是单元测试。下一步，我们要在 Vue 中给我们的组件加上测试。

## 在项目中引入Jest

我们选择 Facebook 出品的 Jest 作为我们组件库的测试代码，Jest 是现在做测试的最佳选择了，因为它内置了断言、测试覆盖率等功能。

不过，因为我们组件库使用 TypeScript 开发，所以需要安装一些插件，通过命令行执行下面的命令，vue-jest 和 @vue/test-utils 是测试 Vue 组件必备的库，然后安装 babel 相关的库，最后安装 Jest 适配 TypeScript 的库。代码如下：

```shell
npm install -D jest@26 vue-jest@next @vue/test-utils@next 
npm install -D babel-jest@26 @babel/core @babel/preset-env 
npm install -D ts-jest@26 @babel/preset-typescript @types/jest
```

安装完毕后，我们要在根目录下新建.babel.config.js。下面的配置目的是让 babel 解析到 Node 和 TypeScript 环境下。

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
}
```

然后，我们还需要新建 jest.config.js，用来配置 jest 的测试行为。不同格式的文件需要使用不同命令来配置，对于.vue 文件我们使用 vue-jest，对于.js 或者.jsx 结果的文件，我们就要使用 babel-jest，而对于.ts 结尾的文件我们使用 ts-jest，然后匹配文件名是 xx.spect.js。这里请注意，Jest 只会执行.spec.js 结尾的文件。

```js
module.exports = {
  transform: {
    // .vue文件用 vue-jest 处理
    '^.+\\.vue$': 'vue-jest',
    // .js或者.jsx用 babel-jest处理
    '^.+\\.jsx?$': 'babel-jest', 
    //.ts文件用ts-jest处理
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)']
}
```

然后配置 package.json，在 scrips 配置下面新增 test 命令，即可启动 Jest。

```js
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "serve": "vite preview",
  "lint": "eslint --fix --ext .js,vue src/",
  "test": "jest",
}
```

完成上面的操作之后，配置工作就告一段落了，可以开始输入代码做测试了。

我们可以在 src 目录下新增 test.spec.js，再输入下面代码来进行测试。在这段代码中，我们使用 expect().toBe() 来判断值是否相等，使用 toHavaBeenCalled 来判断函数是否执行。更多的断言函数你可以去官网查看，这些函数可以覆盖我们测试场景的方方面面。

```js
function sayHello(name,fn){
  if(name=='大圣'){
    fn()
  }
}

test('测试加法',()=>{
  expect(1+2).toBe(3) // 判断值是否相等
})

test('测试函数',()=>{
  const fn = jest.fn()
  sayHello('大圣',fn)
  expect(fn).toHaveBeenCalled() // 判断函数是否执行
})
```


## TDD 开发组件

下一步我们来测试 Vue3 的组件，其实，Vue 的组件核心逻辑也是函数。

这里我们借助 Vue 官方推荐的@vue/test-utils 库来测试组件的渲染，我们新建 src/components/button 文件夹，新建 Button.spec.ts。

参考 Element3 的 button 组件，el-button 组件可以通过传递 size 来配置按钮的大小。现在我们先根据需求去写测试代码，因为现在 Button.vue 还不存在，所以我们可以先根据 Button 的行为去书写测试案例。

```js
import Button from './Button.vue'
import { mount } from '@vue/test-utils'

describe('按钮测试', () => {

  it('按钮能够显示文本', () => {
    const content = '大圣小老弟'
    const wrapper = mount(Button, { //模拟 Vue 的组件渲染
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
  })

  it('通过size属性控制大小', () => {
    const size = 'small'
    const wrapper = mount(Button, {
      props: {
        size
      }
    })
    // size内部通过class控制
    expect(wrapper.classes()).toContain('el-button--small')
  })  

})
```

我们首先要从 @vue/test-utils 库中导入 mount 函数，这个函数可以在命令行里模拟 Vue 的组件渲染。在 Button 的 slot 传递了文本之后，wrapper.text() 就能获取到文本内容，然后对 Button 渲染结果进行判断。之后，我们利用 size 参数，即可通过渲染不同的 class 来实现按钮的大小.

然后我们在命令行执行 npm run test 来执行所有的测试代码。命令行终端上提示，我们期望 button 上含有 el-button-small class，但是实际上 button 上并没有这个 class，所以就会报错。具体报错信息你可以参考下图。

之后，我们再通过实现 Button 组件的逻辑，去处理这个错误信息，这就是 TDD 测试驱动开发的方法。我们实现功能的过程就像小时候写作业，而测试代码就像批改作业的老师。

TDD 的优势就相当于有一位老师，在我们旁边不停做批改，哪怕一开始所有题都做错了，只要我们不断写代码，把所有题都回答正确，也能最后确保全部功能的正确。

我们通过接收 size 去渲染 button 的 class，我们来到 button.vue 中，通过下面的代码可以接收 size 参数，并且成功渲染出对应的 class。

```html
<template>
  <button
    class="el-button" 
    :class="[size ? `el-button--${size}` : '',]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import {computed, withDefaults} from 'vue'
interface Props {
  size?:""|'small'|'medium'|'large'
}
const props = withDefaults(defineProps<Props>(),{
  size:""
})
</script>
```

进行到这里还没有结束，class 还要通过 Sass 去修改浏览器页面内的大小。


为了让你抓住重点，这里的 Sass 代码我放几个核心逻辑，完整代码你可以在项目的GitHub里看到。


```css
@include b(button){
  display: inline-block;
  cursor: pointer;
  background: $--button-default-background-color;
  color: $--button-default-font-color;
  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );
  @include m(small) {
    @include button-size(
      $--button-medium-padding-vertical,
      $--button-medium-padding-horizontal,
      $--button-medium-font-size,
      $--button-medium-border-radius
    );
  }
  @include m(large) {
    @include button-size(
      $--button-large-padding-vertical,
      $--button-large-padding-horizontal,
      $--button-large-font-size,
      $--button-large-border-radius
    );
  }
}
```

前面的代码中通过 b(button) 渲染 el-button 的样式，内部使用变量都可以在 mixin 中找到。通过 b 和 button-size 的嵌套，就能实现按钮大小的控制。


然后我们接着往下进行，想要设置按钮的大小，除了通过 props 传递，还可以通过全局配置的方式设置默认大小。我们进入到代码文件 src/main.ts 中，设置全局变量 $AILEMENTE 中的 size 为 large，并且还可以通过 type="primary"或者 type="success"的方式，设置按钮的主体颜色，代码如下：

```js
const app = createApp(App)
app.config.globalProperties.$AILEMENTE = {
  size:'large'
}
app.use(ElContainer)
  .use(ElButton)
  .mount('#app')
```


首先我们要支持全局的 size 配置，在 src 目录下新建 util.ts，写入下面的代码。我们通过 vue 提供的 getCurrentInstance 获取当前的实例，然后返回全局配置的 $AILEMENTE。这里请注意，由于很多组件都需要读取全局配置，所以我们封装了 useGlobalConfig 函数。


```js
import { getCurrentInstance,ComponentInternalInstance } from 'vue'

export function useGlobalConfig(){
  const instance:ComponentInternalInstance|null =getCurrentInstance()
  if(!instance){
    console.log('useGlobalConfig 必须得在setup里面整')
    return
  }
  return instance.appContext.config.globalProperties.$AILEMENTE || {}
  
}
```

这时我们再回到 Button.vue 中，通过 computed 返回计算后的按钮的 size。如果 props.size 没传值，就使用全局的 globalConfig.size；如果全局设置中也没有 size 配置，按钮就使用 Sass 中的默认大小。

```html
<template>
  <button
    class="el-button" 
    :class="[
      buttonSize ? `el-button--${buttonSize}` : '',
      type ? `el-button--${type}` : ''
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default{
  name:'ElButton'
}
</script>

<script setup lang="ts">

import {computed, withDefaults} from 'vue'
import { useGlobalConfig } from '../../util';

interface Props {
  size?:""|'small'|'medium'|'large',
  type?:""|'primary'|'success'|'danger'
}
const props = withDefaults(defineProps<Props>(),{
  size:"",
  type:""
})
const globalConfig = useGlobalConfig()
const buttonSize = computed(()=>{
  return props.size||globalConfig.size
})
</script>
```

我们来到 src/App.vue 中，就可以直接使用 el-button 来显示不同样式的按钮了。

```html
  <el-button type="primary">
    按钮
  </el-button>
  <el-button type="success">
    按钮
  </el-button>
  <el-button>按钮</el-button>
  <el-button size="small">
    按钮
  </el-button>
```


然后我们进入 jest.config.js 中，新增下面的配置，collectCoverage 标记的意思是我们需要收集代码测试覆盖率。

```js
module.exports = {
  transform: {
    //  用 `vue-jest` 处理 `*.vue` 文件
    '^.+\\.vue$': 'vue-jest', //vuejest 处理.vue
    '^.+\\.jsx?$': 'babel-jest',  // babel jest处理js or jsx
    '^.+\\.tsx?$': 'ts-jest', // ts-jest 处理.ts .tsx
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
}
```

然后在执行 npm run test 后，项目的根目录下就会出现一个 coverage 目录。

我们打开下面的 index.html 后，就可以在浏览器中看到测试覆盖率的报告。对照下图我们可以看到，button 组件的测试覆盖率 100%，util 下面有两行代码飘红，也就是没有测试的逻辑。

在一定程度上，测试覆盖率也能够体现出代码的可维护性，希望你可以用好这个指标。

最后，我们进入.husky/pre-commit 文件，新增 npm run test 命令，这么做的目的是，确保测试通过的代码才能进入 git 管理代码，这会进一步提高代码的规范和可维护性。


```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test
```
