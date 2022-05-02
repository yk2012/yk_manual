(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{570:function(t,_,v){"use strict";v.r(_);var a=v(17),r=Object(a.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/2a4860b52bb7dbc0d0a0f204a01464d6.png",alt:"image"}})]),t._v(" "),v("h1",{attrs:{id:"_1-使用http协议访问web"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用http协议访问web"}},[t._v("#")]),t._v(" 1. 使用HTTP协议访问Web")]),t._v(" "),v("p",[t._v("【问】当我们在网页浏览器（Web browser）的地址栏中输入URL时，Web页面是如何呈现的？")]),t._v(" "),v("p",[t._v("【答】根据Web浏览器地址栏中指定的URL,Web浏览器从Web服务器端获取文件资源（resource）等信息，从而显示出Web页面")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4d8e463c666539577af76abeb0ccbe0d.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("Web使用一种名为HTTP（HyperText Transfer Protocol，超文本传输协议）的协议作为规范，完成从客户端到服务器端等一系列运作流程。而协议是指规则的约定。")])]),t._v(" "),v("center",[v("strong",[t._v("可以说，Web是建立在HTTP协议上通信的")])]),t._v(" "),v("h1",{attrs:{id:"_2-http的诞生"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-http的诞生"}},[t._v("#")]),t._v(" 2. HTTP的诞生")]),t._v(" "),v("h2",{attrs:{id:"_2-1-规划"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-规划"}},[t._v("#")]),t._v(" 2.1 规划")]),t._v(" "),v("ul",[v("li",[t._v("最初设想的基本理念是:")])]),t._v(" "),v("blockquote",[v("p",[t._v("借助多文档之间相互关联形成的超文本（HyperText），连成可相互参阅的WWW（World Wide Web，万维网）")])]),t._v(" "),v("ul",[v("li",[t._v("现在已提出了3项WWW构建技术，分别是：")])]),t._v(" "),v("ol",[v("li",[t._v("把SGML（Standard Generalized Markup Language，标准通用标记语言）作为页面的文本标记语言的"),v("strong",[t._v("HTML")]),t._v("（HyperText Markup Language，超文本标记语言）")]),t._v(" "),v("li",[t._v("作为文档传递协议的"),v("strong",[t._v("HTTP")])]),t._v(" "),v("li",[t._v("指定文档所在地址的"),v("strong",[t._v("URL")]),t._v("（Uniform Resource Locator，统一资源定位符）")])]),t._v(" "),v("h2",{attrs:{id:"_2-2-成长"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-成长"}},[t._v("#")]),t._v(" 2.2 成长")]),t._v(" "),v("ul",[v("li",[t._v("HTTP/0.9   1990年")]),t._v(" "),v("li",[t._v("HTTP/1.0   1996年5月")]),t._v(" "),v("li",[t._v("HTTP/1.1   1997年1月  是目前主流的HTTP协议版本")])]),t._v(" "),v("h1",{attrs:{id:"_3-网络基础tcp-ip"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-网络基础tcp-ip"}},[t._v("#")]),t._v(" 3. 网络基础TCP/IP")]),t._v(" "),v("blockquote",[v("p",[t._v("通常使用的网络（包括互联网）是在TCP/IP协议族的基础上运作的。而HTTP属于它内部的一个子集")])]),t._v(" "),v("h2",{attrs:{id:"_3-1-tcp-ip协议族"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-tcp-ip协议族"}},[t._v("#")]),t._v(" 3.1 TCP/IP协议族")]),t._v(" "),v("center",[t._v("TCP/IP是互联网相关的各类协议族的总称")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/54d2bfdb16e778920cfa8be6408dce85.png",alt:"image"}})]),t._v(" "),v("h2",{attrs:{id:"_3-2-tcp-ip的分层管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-tcp-ip的分层管理"}},[t._v("#")]),t._v(" 3.2 TCP/IP的分层管理")]),t._v(" "),v("blockquote",[v("p",[t._v("TCP/IP协议族按层次分别分为以下4层：应用层、传输层、网络层和数据链路层")])]),t._v(" "),v("p",[t._v("好处：把各层之间的接口部分规划好之后，每个层次内部的设计就能够自由改动了")]),t._v(" "),v("h3",{attrs:{id:"_3-2-1-应用层"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-1-应用层"}},[t._v("#")]),t._v(" 3.2.1 应用层")]),t._v(" "),v("blockquote",[v("p",[t._v("应用层决定了向用户提供应用服务时通信的活动")])]),t._v(" "),v("p",[t._v("TCP/IP协议族内预存了各类通用的应用服务")]),t._v(" "),v("p",[t._v("比如，"),v("strong",[t._v("FTP")]),t._v("（File Transfer Protocol，文件传输协议）和"),v("strong",[t._v("DNS")]),t._v("（Domain Name System，域名系统）服务就是其中两类。")]),t._v(" "),v("p",[t._v("HTTP协议也处于该层")]),t._v(" "),v("h3",{attrs:{id:"_3-2-2-传输层"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-2-传输层"}},[t._v("#")]),t._v(" 3.2.2 传输层")]),t._v(" "),v("blockquote",[v("p",[t._v("传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输")])]),t._v(" "),v("p",[t._v("在传输层有两个性质不同的协议："),v("strong",[t._v("TCP")]),t._v("（Transmission Control Protocol，传输控制协议）和"),v("strong",[t._v("UDP")]),t._v("（User Data Protocol，用户数据报协议）")]),t._v(" "),v("h3",{attrs:{id:"_3-2-3-网络层-网络互连层"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-3-网络层-网络互连层"}},[t._v("#")]),t._v(" 3.2.3 网络层（网络互连层）")]),t._v(" "),v("blockquote",[v("p",[t._v("网络层用来处理在网络上流动的数据包")])]),t._v(" "),v("p",[t._v("数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方")]),t._v(" "),v("p",[t._v("与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线")]),t._v(" "),v("h3",{attrs:{id:"_3-2-4-链路层-数据链路层、网络接口层"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-4-链路层-数据链路层、网络接口层"}},[t._v("#")]),t._v(" 3.2.4 链路层（数据链路层、网络接口层）")]),t._v(" "),v("blockquote",[v("p",[t._v("用来处理连接网络的硬件部分")])]),t._v(" "),v("p",[t._v("包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）")]),t._v(" "),v("p",[t._v("硬件上的范畴均在链路层的作用范围之内")]),t._v(" "),v("h2",{attrs:{id:"_3-3-tcp-ip通信传输流"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-tcp-ip通信传输流"}},[t._v("#")]),t._v(" 3.3 TCP/IP通信传输流")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/126f9c07d0d7ecd5b759b89fee96f183.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("用HTTP举例来说明")])]),t._v(" "),v("ol",[v("li",[t._v("首先作为发送端的"),v("strong",[t._v("客户端")]),t._v("在==应用层==（HTTP协议）"),v("strong",[t._v("发出")]),t._v("一个想看某个Web页面的HTTP"),v("strong",[t._v("请求")])]),t._v(" "),v("li",[t._v("为了传输方便，在==传输层==（TCP协议）把从应用层处收到的数据（HTTP请求报文）进行"),v("strong",[t._v("分割")]),t._v("，并在各个报文上打上"),v("strong",[t._v("标记序号")]),t._v("及"),v("strong",[t._v("端口号")]),t._v("后"),v("strong",[t._v("转发")]),t._v("给==网络层==。")]),t._v(" "),v("li",[t._v("在==网络层==（IP协议），增加作为通信目的地的"),v("strong",[t._v("MAC地址")]),t._v("后转发给==链路层==")]),t._v(" "),v("li",[t._v("接收端的"),v("strong",[t._v("服务器")]),t._v("在==链路层==接收到数据，按序往上层发送，一直到==应用层==")]),t._v(" "),v("li",[t._v("当传输到==应用层==，才能算真正接收到由客户端发送过来的HTTP请求")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/08093055e69cac443eb8827527eddc35.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的"),v("strong",[t._v("首部信息")])]),t._v(" "),v("li",[t._v("反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去")])]),t._v(" "),v("blockquote",[v("p",[t._v("这种把数据信息包装起来的做法称为"),v("strong",[t._v("封装")]),t._v("（encapsulate）")])]),t._v(" "),v("h1",{attrs:{id:"_4-与http关系密切的协议-ip、tcp、dns"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-与http关系密切的协议-ip、tcp、dns"}},[t._v("#")]),t._v(" 4. 与HTTP关系密切的协议：IP、TCP、DNS")]),t._v(" "),v("h2",{attrs:{id:"_4-1-负责传输的-ip-internet-protocol-协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-负责传输的-ip-internet-protocol-协议"}},[t._v("#")]),t._v(" 4.1 负责传输的 IP(Internet Protocol) 协议")]),t._v(" "),v("p",[t._v("按层次分，IP（Internet Protocol）网际协议位于==网络层==")]),t._v(" "),v("blockquote",[v("p",[t._v("IP协议的作用是把各种数据包传送给对方。而要保证确实传送到对方那里，则需要满足各类条件。其中两个重要的条件是"),v("strong",[t._v("IP地址")]),t._v("和"),v("strong",[t._v("MAC地址")]),t._v("（Media Access Control Address）")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/ec33bdc4811619beaac9ec7decfaebaf.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("IP与MAC")])]),t._v(" "),v("ol",[v("li",[t._v("IP地址指明了节点被分配到的地址，MAC地址是指网卡所属的固定地址")]),t._v(" "),v("li",[t._v("IP地址可以和MAC地址进行配对")]),t._v(" "),v("li",[t._v("IP地址可变换，但MAC地址基本上不会更改")])]),t._v(" "),v("blockquote",[v("p",[t._v("使用ARP协议凭借MAC地址进行通信")])]),t._v(" "),v("ul",[v("li",[t._v("IP间的通信依赖MAC地址")]),t._v(" "),v("li",[t._v("在网络上进行中转时，会利用下一站中转设备的MAC地址来搜索下一个中转目标")]),t._v(" "),v("li",[t._v("会采用ARP协议（Address Resolution Protocol）")]),t._v(" "),v("li",[t._v("ARP是一种用以解析地址的协议，根据通信方的IP地址就可以反查出对应的MAC地址")])]),t._v(" "),v("blockquote",[v("p",[t._v("没有人能够全面掌握互联网中的传输状况")])]),t._v(" "),v("p",[t._v("在到达通信目标前的中转过程中，那些计算机和路由器等网络设备只能获悉很粗略的传输路线。这种机制称为路由选择（routing）")]),t._v(" "),v("h2",{attrs:{id:"_4-2-确保可靠性的-tcp-协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-确保可靠性的-tcp-协议"}},[t._v("#")]),t._v(" 4.2 确保可靠性的 TCP 协议")]),t._v(" "),v("p",[t._v("按层次分，TCP位于==传输层==，提供"),v("strong",[t._v("可靠")]),t._v("的"),v("strong",[t._v("字节流")]),t._v("服务")]),t._v(" "),v("blockquote",[v("p",[t._v("字节流服务（Byte Stream Service）是指为了方便传输，将大块数据分割成以报文段（segment）为单位的数据包进行管理。而可靠的传输服务是指，能够把数据准确可靠地传给对方。")])]),t._v(" "),v("p",[t._v("TCP协议为了更容易传送大数据才把数据分割，而且TCP协议能够确认数据最终是否送达到对方")]),t._v(" "),v("p",[t._v("确保数据能到达目标——==三次握手==")]),t._v(" "),v("blockquote",[v("p",[t._v("为了准确无误地将数据送达目标处，TCP协议采用了三次握手（three-way handshaking）策略")])]),t._v(" "),v("ul",[v("li",[t._v("用TCP协议把数据包送出去后，TCP不会对传送后的情况置之不理，它一定会向对方确认是否成功送达")]),t._v(" "),v("li",[t._v("握手过程中使用了TCP的标志（flag）——SYN（synchronize）和ACK（acknowledgement）")])]),t._v(" "),v("ol",[v("li",[t._v("发送端首先发送一个带SYN标志的数据包给对方")]),t._v(" "),v("li",[t._v("接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息")]),t._v(" "),v("li",[t._v("最后，发送端再回传一个带ACK标志的数据包，代表“握手”结束")])]),t._v(" "),v("ul",[v("li",[t._v("若在握手过程中某个阶段莫名中断，TCP协议会再次以相同的顺序发送相同的数据包")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/bd4f3c03838a1175f488ae9ad54e228c.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("除了上述三次握手，TCP协议还有其他各种手段来保证通信的可靠性")])]),t._v(" "),v("h2",{attrs:{id:"_4-3-负责域名解析的dns服务"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-负责域名解析的dns服务"}},[t._v("#")]),t._v(" 4.3 负责域名解析的DNS服务")]),t._v(" "),v("blockquote",[v("p",[t._v("DNS（Domain Name System）服务是和HTTP协议一样位于应用层的协议。它提供域名到IP地址之间的解析服务。")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/3881efdb0cf6a8bbec22ae8a00f82bcc.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("计算机既可以被赋予IP地址，也可以被赋予主机名和域名")]),t._v(" "),v("li",[t._v("用户通常使用主机名或域名来访问对方的计算机，而不是直接通过IP地址访问")])]),t._v(" "),v("blockquote",[v("p",[t._v("DNS协议提供通过域名查找IP地址，或逆向从IP地址反查域名的服务")])]),t._v(" "),v("h1",{attrs:{id:"_5-各种协议与http协议的关系"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-各种协议与http协议的关系"}},[t._v("#")]),t._v(" 5. 各种协议与HTTP协议的关系")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/b09cdef447b3b07e29c9b3bcb9e7c799.png",alt:"image"}})]),t._v(" "),v("h1",{attrs:{id:"_6-uri和url"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-uri和url"}},[t._v("#")]),t._v(" 6. URI和URL")]),t._v(" "),v("p",[t._v("URL（Uniform Resource Locator，统一资源定位符)是使用Web浏览器等访问Web页面时需要输入的网页地址")]),t._v(" "),v("h2",{attrs:{id:"_6-1-uri统一资源标识符uniform-resource-identifier"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-uri统一资源标识符uniform-resource-identifier"}},[t._v("#")]),t._v(" 6.1 URI统一资源标识符Uniform Resource Identifier")]),t._v(" "),v("h3",{attrs:{id:"_6-1-1-uniform"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-1-uniform"}},[t._v("#")]),t._v(" 6.1.1 Uniform")]),t._v(" "),v("ul",[v("li",[t._v("规定统一的格式可方便处理多种不同类型的资源，而不用根据上下文环境来识别资源指定的访问方式")]),t._v(" "),v("li",[t._v("另外，加入新增的协议方案（如http：或ftp:）也更容易")])]),t._v(" "),v("h3",{attrs:{id:"_6-1-2-resource"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-2-resource"}},[t._v("#")]),t._v(" 6.1.2 Resource")]),t._v(" "),v("ul",[v("li",[t._v("资源的定义是“可标识的任何东西”。")]),t._v(" "),v("li",[t._v("不仅是文档文件，图像或服务（例如当天的天气预报）等能够区别于其他类型的，全都可作为资源。")]),t._v(" "),v("li",[t._v("另外，资源不仅可以是单一的，也可以是多数的集合体")])]),t._v(" "),v("h3",{attrs:{id:"_6-1-3-identifier"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-3-identifier"}},[t._v("#")]),t._v(" 6.1.3 Identifier")]),t._v(" "),v("p",[t._v("表示可标识的对象(也称为标识符)")]),t._v(" "),v("ul",[v("li",[t._v("综上所述，URI就是由某个协议方案表示的资源的定位标识符。")]),t._v(" "),v("li",[t._v("协议方案是指访问资源所使用的协议类型名称。")])]),t._v(" "),v("blockquote",[v("p",[t._v("采用HTTP协议时，协议方案就是http")])]),t._v(" "),v("p",[t._v("除此之外，还有ftp、mailto、telnet、file等。标准的URI协议方案有30种左右，由隶属于国际互联网资源管理的非营利社团"),v("strong",[t._v("ICANN")]),t._v("（InternetCorporation for Assigned Names and Numbers，互联网名称与数字地址分配机构）的"),v("strong",[t._v("IANA")]),t._v("（Internet AssignedNumbers Authority，互联网号码分配局）管理颁布")]),t._v(" "),v("ul",[v("li",[t._v("URI用字符串标识某一互联网资源，而URL表示资源的地点（互联网上所处的位置）。可见URL是URI的子集。")]),t._v(" "),v("li",[t._v("通用语法的几个例子")])]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("ftp://ftp.is.co.za/rfc/rfc1808./txt\nhttp://www.iwtf.org/rfc/rfc2396.txt\nldap://[2001:db8::7]/c=GB?objectClass?one\nmailto:yk1123@vip.163.com\nnews:comp.infosystems.www.servers.unix\ntel:+1-816-555-1212\ntelnet://192.0.2.16:80/\nurn:oasis:names:spacification:docbook:dtd:xml:4.1.2\n")])])]),v("h2",{attrs:{id:"_6-2-uri格式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-uri格式"}},[t._v("#")]),t._v(" 6.2 URI格式")]),t._v(" "),v("blockquote",[v("p",[t._v("表示指定的URI，要使用涵盖全部必要信息的绝对URI、绝对URL以及相对URL")])]),t._v(" "),v("p",[t._v("相对URL，是指从浏览器中基本URI处指定的URL")]),t._v(" "),v("ul",[v("li",[t._v("先来了解一下绝对URI的格式")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/e65242a4ba4f1a70c65a8eabeb9cd3bf.png",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("使用http：或https：等协议方案名获取访问资源时要指定协议类型")]),t._v(" "),v("li",[t._v("不区分字母大小写，最后附一个冒号（:）")]),t._v(" "),v("li",[t._v("也可使用data：或javascript：这类指定数据或脚本程序的方案名")])]),t._v(" "),v("h3",{attrs:{id:"_6-2-1-登录信息-认证"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-1-登录信息-认证"}},[t._v("#")]),t._v(" 6.2.1 登录信息（认证）")]),t._v(" "),v("blockquote",[v("p",[t._v("指定用户名和密码作为从服务器端获取资源时必要的登录信息（身份认证）")])]),t._v(" "),v("p",[t._v("此项是可选项")]),t._v(" "),v("h3",{attrs:{id:"_6-2-2-服务器地址"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-2-服务器地址"}},[t._v("#")]),t._v(" 6.2.2 服务器地址")]),t._v(" "),v("blockquote",[v("p",[t._v("使用绝对URI必须指定待访问的服务器地址")])]),t._v(" "),v("p",[t._v("地址可以是类似hackr.jp这种DNS可解析的名称，或是192.168.1.1这类IPv4地址名，还可以是[0:0:0:0:0:0:0:1]这样用方括号括起来的IPv6地址名")]),t._v(" "),v("h3",{attrs:{id:"_6-2-3-服务器端口号"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-3-服务器端口号"}},[t._v("#")]),t._v(" 6.2.3 服务器端口号")]),t._v(" "),v("blockquote",[v("p",[t._v("指定服务器连接的网络端口号")])]),t._v(" "),v("p",[t._v("此项也是可选项，若用户省略则自动使用默认端口号")]),t._v(" "),v("h3",{attrs:{id:"_6-2-4-带层次的文件路径"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-4-带层次的文件路径"}},[t._v("#")]),t._v(" 6.2.4 带层次的文件路径")]),t._v(" "),v("blockquote",[v("p",[t._v("指定服务器上的文件路径来定位特指的资源")])]),t._v(" "),v("p",[t._v("这与UNIX系统的文件目录结构相似。")]),t._v(" "),v("h3",{attrs:{id:"_6-2-5-查询字符串"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-5-查询字符串"}},[t._v("#")]),t._v(" 6.2.5 查询字符串")]),t._v(" "),v("blockquote",[v("p",[t._v("针对已指定的文件路径内的资源，可以使用查询字符串传入任意参数")])]),t._v(" "),v("p",[t._v("此项可选")]),t._v(" "),v("h3",{attrs:{id:"_6-2-6-片段标识符"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-6-片段标识符"}},[t._v("#")]),t._v(" 6.2.6 片段标识符")]),t._v(" "),v("blockquote",[v("p",[t._v("使用片段标识符通常可标记出已获取资源中的子资源（文档内的某个位置）")])]),t._v(" "),v("p",[t._v("但在RFC中并没有明确规定其使用方法。该项也为可选项")])],1)}),[],!1,null,null,null);_.default=r.exports}}]);