## Proxy

```js
const person = {
  name: 'yk',
  age: 18
}

const personProxy = new Proxy(person, {
  get(target, property){
    return property in target ? target[property] : 'default' 
  },
  set(target, property, value){
    if(property === 'age'){
      if(!Number.isInterage(value)){
        throw new TypeError(`${value} is not an int`)
      }
    }
    target[property] = value
  }
})
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1395bb697644e36935ad13632544bdf~tplv-k3u1fbpfcp-watermark.image?)




## Reflect


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ffb1876edc43c8b960b4f73e2b403c~tplv-k3u1fbpfcp-watermark.image?)



