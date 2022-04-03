@[toc]
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210223111126871.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

@[toc]


@[toc]
# 1. 用单台虚拟主机实现多个域名

> HTTP/1.1规范允许一台HTTP服务器搭建多个Web站点

- 即使物理层面只有一台服务器，但只要使用虚拟主机的功能，则可以假想已具有多台服务器
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210223111453686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)



- 在相同的IP地址下，由于虚拟主机可以寄存多个不同主机名和域名的Web网站，因此在发送HTTP请求时，必须在Host首部内完整指定主机名或域名的URI
![image](https://img-blog.csdnimg.cn/img_convert/bd89192b0b68eb334c1ab22eef9fbe7d.png)

# 2. 通信数据转发程序

HTTP通信时，除客户端和服务器以外，还有一些用于通信数据转发的应用程序，例如代理、网关和隧道。它们可以配合服务器工作

## 2.1 代理

> 代理是一种有转发功能的应用程序，它扮演了位于服务器和客户端“中间人”的角色，接收由客户端发送的请求并转发给服务器，同时也接收服务器返回的响应并转发给客户端

![image](https://img-blog.csdnimg.cn/img_convert/116a0e8d8cd853dc9059b3379cece293.png)

代理不改变请求URL，会直接发送给前方持有资源的目标服务器

![image](https://img-blog.csdnimg.cn/img_convert/6cc1c115d39463c95f964fa028c33643.png)

转发时，需要附加Via首部字段以标记出经过的主机信息


![image](https://img-blog.csdnimg.cn/img_convert/8465bb9de4119442505d7042a85b1205.png)

使用代理的理由：利用缓存技术减少网络带宽的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要目的等

### 2.1.1 缓存代理
代理转发响应时，缓存代理（Caching Proxy）会预先将资源的副本（缓存）保存在代理服务器上
### 2.1.2 透明代理
转发请求或响应时，不对报文做任何加工的代理类型被称为透明代理（Transparent Proxy）。反之，对报文内容进行加工的代理被称为非透明代理。

## 2.2 网关

> 网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器一样对请求进行处理。有时客户端可能都不会察觉，自己的通信目标是一个网关


![image](https://img-blog.csdnimg.cn/img_convert/578bf60ad38fd4a4be38e106a3f20ece.png)

利用网关可以由HTTP请求转化为其他协议通信

利用网关能提高通信的安全性，因为可以在客户端与网关之间的通信线路上加密以确保连接的安全。比如，网关可以连接数据库，使用SQL语句查询数据。另外，在Web购物网站上进行信用卡结算时，网关可以和信用卡结算系统联动

## 2.3 隧道

> 隧道是在相隔甚远的客户端和服务器两者之间进行中转，并保持双方通信连接的应用程序，届时使用SSL等加密手段进行通信。隧道的目的是确保客户端能与服务器进行安全的通信

![image](https://img-blog.csdnimg.cn/img_convert/97d7d161ff0dfa88a21e7545cde0e95e.png)

隧道本身不会去解析HTTP请求。也就是说，请求保持原样中转给之后的服务器。隧道会在通信双方断开连接时结束

# 3. 保存资源的缓存

缓存服务器的优势在于利用缓存可避免多次从源服务器转发资源。因此客户端可就近从缓存服务器上获取资源，而源服务器也不必多次处理相同的请求了

![image](https://img-blog.csdnimg.cn/img_convert/8db86800b03156471d04f4412b96e866.png)

## 3.1 缓存的有效期限
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210223111534794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


## 3.2 客户端的缓存

以InternetExplorer程序为例，把客户端缓存称为临时网络文件（Temporary InternetFile）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210223111556180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


