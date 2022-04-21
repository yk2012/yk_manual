@[toc]

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210114221012616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)


# 1. HTTP协议用于客户端和服务器端之间的通信

![image](https://img-blog.csdnimg.cn/img_convert/13b9eef8cc29597b908740adf89229a3.png)
- 应用HTTP协议时，必定是一端担任客户端角色，另一端担任服务器端角色

# 2. 过请求和响应的交换达成通信
![image](https://img-blog.csdnimg.cn/img_convert/ac830e477be7d43a8b41be2a370ec456.png)

<center>请求必定由客户端发出，而服务器端回复响应</center>


## 2.1 示例
![image](https://img-blog.csdnimg.cn/img_convert/aaf2e3026f70d3026fcd258a055dcdbe.png)

## 2.2 请求报文
> 请求报文是由请求方法、请求URI、协议版本、可选的请求首部字段和内容实体构成的

![image](https://img-blog.csdnimg.cn/img_convert/51f7d13a2938655e5141f8a4662e2c42.png)


## 2.3 响应报文

> 响应报文基本上由协议版本、状态码（表示请求成功或失败的数字代码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成

![image](https://img-blog.csdnimg.cn/img_convert/6b0165e318683180a55fc72a32ca3b5b.png)


# 3. HTTP是不保存状态的协议

> HTTP是一种不保存状态，即无状态（stateless）协议



![image](https://img-blog.csdnimg.cn/img_convert/9998ac0781ec7aa75f4d2f51eb3d213a.png)

- 使用HTTP协议，每当有新的请求发送时，就会有对应的新响应产生。
- 协议本身并不保留之前一切的请求或响应报文的信息。
- 这是为了更快地处理大量事务，确保协议的可伸缩性，而特意把HTTP协议设计成如此简单的。

- HTTP/1.1虽然是无状态协议，但为了实现期望的保持状态功能，于是引入了Cookie技术。
- 有了Cookie再用HTTP协议通信，就可以管理状态了


# 4. 请求URI定位资源
> HTTP协议使用URI定位互联网上的资源

![image](https://img-blog.csdnimg.cn/img_convert/96a2bd1404c8fa9779c548f181e8a2ff.png)

> 因为URI的特定功能，在互联网上任意位置的资源都能访问到

![image](https://img-blog.csdnimg.cn/img_convert/b82e5ed5c2a5447f5c9439390330eb0f.png)
- 如果不是访问特定资源而是对服务器本身发起请求，可以用一个*来代替请求URI
- 查询HTTP服务器端支持的HTTP方法种类
```
OPTIONS * HTTP/1.1
```


# 5. 告知服务器意图的HTTP方法

## 5.1 GET 获取资源
![image](https://img-blog.csdnimg.cn/img_convert/a03fe2e1a72dcadf8e757df1e7c5f411.png)

> GET方法用来请求访问已被URI识别的资源。指定的资源经服务器端解析后返回响应内容


![image](https://img-blog.csdnimg.cn/img_convert/0c20a206e1e27576694122ea0001dc87.png)

![image](https://img-blog.csdnimg.cn/img_convert/0f7a02e3016e36d6c98d29c4f73ec0a0.png)

## 5.2 POST 传输实体主体  
![image](https://img-blog.csdnimg.cn/img_convert/4119304fd15a992118708ad82093424c.png)

![image](https://img-blog.csdnimg.cn/img_convert/3eca24482d6a5843d7e1659e6173c47d.png)


## 5.3 PUT 传输文件
![image](https://img-blog.csdnimg.cn/img_convert/2f7aa2166249ece0836558bdcadf228e.png)


![image](https://img-blog.csdnimg.cn/img_convert/87fa57a51259819a98405a3fe929cabb.png)

## 5.4 HEAD 获得报文首部

![image](https://img-blog.csdnimg.cn/img_convert/cc2ec5f4b1f5234f914c8e317e20bfbc.png)

![image](https://img-blog.csdnimg.cn/img_convert/361f4361cc9548e517dd8d4c7e893dbb.png)

## 5.5 DELETE 删除文件
![image](https://img-blog.csdnimg.cn/img_convert/cb671fadee4e16a8034df6cf193fa090.png)

![image](https://img-blog.csdnimg.cn/img_convert/5dd8a0161f19d55bc64bd7a6fa7e60cb.png)

## 5.6 OPTIONS 询问支持的方法

![image](https://img-blog.csdnimg.cn/img_convert/75e5080d7dc92cdbe06e6141bc53e30d.png)

![image](https://img-blog.csdnimg.cn/img_convert/a76f8b26ea32da361a6435091432783a.png)


## 5.7 TRACE 追踪路径
![image](https://img-blog.csdnimg.cn/img_convert/5d9adfbc7d014f2abb174ff921ebd937.png)

> TRACE方法是让Web服务器端将之前的请求通信环回给客户端的方法

![image](https://img-blog.csdnimg.cn/img_convert/d495b7bcf5220db178086846a008e254.png)

## 5.8 CONNECT 要求用隧道协议连接代理
![image](https://img-blog.csdnimg.cn/img_convert/a10fb40ad27f6aa91baf9688bc851a7a.png)

> CONNECT方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信。主要使用SSL（Secure Sockets Layer，安全套接层）和TLS（TransportLayer Security，传输层安全）协议把通信内容加密后经网络隧道传输

![image](https://img-blog.csdnimg.cn/img_convert/ca3c53c1d7597af82c1c714d97274a43.png)


# 6. 用方法下达命令
![image](https://img-blog.csdnimg.cn/img_convert/a8719e9eca7100add71db40f525c54e3.png)

> 方法名区分大小写，要用大写字母

![image](https://img-blog.csdnimg.cn/img_convert/1cf90569b46e450941756a7c06e7e97a.png)

# 7. 持久连接节省通信量

> 初始版本：每进行一次HTTP通信就要断开一次TCP连接

![image](https://img-blog.csdnimg.cn/img_convert/bd1a3b2c1f6e379fc32ac53049e81d0a.png)

![image](https://img-blog.csdnimg.cn/img_convert/4dbe156da26ed58226056b315c13a28a.png)


## 7.1 持久连接

> HTTP Persistent Connections，也称为HTTP keep-alive或HTTP connectionreuse

> 持久连接的特点是，只要任意一端没有明确提出断开连接，则保持TCP连接状态

![image](https://img-blog.csdnimg.cn/img_convert/6399a308a0215859ef2952092db7c309.png)


## 7.2 管线化

> 持久连接使得多数请求以管线化（pipelining）方式发送成为可能

![image](https://img-blog.csdnimg.cn/img_convert/897ecc3c1c3986a45b293addbec9a9c4.png)

当请求一个包含10张图片的HTML Web页面，与挨个连接相比，用持久连接可以让请求更快结束。而管线化技术则比持久连接还要快。请求数越多，时间差就越明显


# 8. 使用Cookie的状态管理

> HTTP是无状态协议，它不对之前发生过的请求和响应的状态进行管理。也就是说，无法根据之前的状态进行本次的请求处理

![image](https://img-blog.csdnimg.cn/img_convert/7695a19176288adc3f11cfe20657bffb.png)

> Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态

- Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie
- 当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入Cookie值后发送出去

![image](https://img-blog.csdnimg.cn/img_convert/aac277900c7968bd06608fafd836c4ea.png)


![image](https://img-blog.csdnimg.cn/img_convert/266d7f1b35695baec2b7f83ba2a33e8f.png)

①请求报文（没有Cookie信息的状态）

```
GET /reader/ HTTP/1.1
Host: hackr.jp
```


②响应报文（服务器端生成Cookie信息）

```
HTTP/1.1 200 OK
Date: Thu, 12 JUL 2012 07:12:20 GMT
server: Apache
<Set-Cookie: sid=1342077140226724; path=/; expires=Wed, 10-Oct-12 07:12:20 GMT>
Content-Type: text/plain; charset=UTF-8
```


③请求报文（自动发送保存着的Cookie信息）

```
GET /image/ HTTP/1.1
Host: hackr.jp
Cookie: sid=1342077140226724
```





