@[toc]
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210125210324585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70#pic_center)


# 1. HTTP报文

> 用于HTTP协议交互的信息被称为HTTP报文


- 请求端（客户端）的HTTP报文叫做请求报文，响应端（服务器端）的叫做响应报文


![image](https://img-blog.csdnimg.cn/img_convert/a940fde15d50a1c836c29481c1f4047d.png)


# 2. 请求报文及响应报文的结构

![image](https://img-blog.csdnimg.cn/img_convert/fa9226cc6a8e0f70c135b1b0326a306a.png)

## 2.1 请求行
包含用于请求的方法，请求URI和HTTP版本
## 2.2 状态行
包含表明响应结果的状态码，原因短语和HTTP版本
## 2.3 首部字段
包含表示请求和响应的各种条件和属性的各类首部

一般有4种首部，分别是：通用首部、请求首部、响应首部和实体首部
## 2.4 其他
可能包含HTTP的RFC里未定义的首部（Cookie等）

![image](https://img-blog.csdnimg.cn/img_convert/bca042ef2a2ab9dfe22d0d6d128d1d66.png)


# 3. 编码提升传输速率

## 3.1 报文主体和实体主体的差异

### 报文（message）

> HTTP通信中的基本单位，由8位组字节流（octet sequence，其中octet为8个比特）组成，通过HTTP通信传输

### 实体（entity）
> 作为请求或响应的有效载荷数据（补充项）被传输，其内容由实体首部和实体主体组成。

HTTP报文的主体用于传输请求或响应的实体主体。通常，报文主体等于实体主体。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。报文和实体这两个术语在之后会经常出现，请事先理解两者的差异。

## 3.2 压缩传输的内容编码
内容编码指明应用在实体内容上的编码格式，并保持实体信息原样压缩

内容编码后的实体由客户端接收并负责解码

![image](https://img-blog.csdnimg.cn/img_convert/a680e00ef9420958604b171edf3d325d.png)

常用的内容编码
- gzip（GNU zip）
- compress（UNIX系统的标准压缩）
- deflate（zlib）
- identity（不进行编码）

## 3.3.3 分割发送的分块传输编码
在传输大容量数据时，通过把数据分割成多块，能够让浏览器逐步显示页面。
这种把实体主体分块的功能称为**分块传输编码**（Chunked Transfer Coding）

![image](https://img-blog.csdnimg.cn/img_convert/8b94ae1276755ca807f8bfe976d23ece.png)

# 4. 发送多种数据的多部分对象集合
> HTTP协议中采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。

通常是在图片或文本文件等上传时使用

![image](https://img-blog.csdnimg.cn/img_convert/eee8d33faf1e02ea1fbf26505abe5f89.png)

## 4.1 multipart/form-data
> 在Web表单文件上传时使用

## 4.2 multipart/byteranges
> 状态码206（Partial Content，部分内容）响应报文包含了多个范围的内容时使用



# 5. 获取部分内容的范围请求
> 指定范围发送的请求叫做范围请求（Range Request）

![image](https://img-blog.csdnimg.cn/img_convert/b83a892d43bb90c1f7f7774666306178.png)

- 针对范围请求，响应会返回状态码为206 Partial Content的响应报文。
- 另外，对于多重范围的范围请求，响应会在首部字段Content-Type标明multipart/byteranges后返回响应报文。
- 如果服务器端无法响应范围请求，则会返回状态码200 OK和完整的实体内容。

# 6. 内容协商返回最合适的内容

![image](https://img-blog.csdnimg.cn/img_convert/3e77a72115310694ae9e38751961644c.png)



## 内容协商（Content Negotiation）技术

### 服务器驱动协商（Server-driven Negotiation）
> 由服务器端进行内容协商。以请求的首部字段为参考，在服务器端自动处理

### 客户端驱动协商（Agent-driven Negotiation）
> 用户从浏览器显示的可选项列表中手动选择
> 还可以利用JavaScript脚本在Web页面上自动进行上述选择

### 透明协商（Transparent Negotiation）
> 服务器驱动和客户端驱动的结合体，是由服务器端和客户端各自进行内容协商的一种方法