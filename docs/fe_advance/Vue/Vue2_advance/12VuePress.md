
@[toc]

> 本文手把手带你搭建一个自己的个人主页小项目
> 注意！ 这里只是起步，骨架搭好了，具体的内容就要根据自己需求往里面加~

这是项目地址，欢迎star
[https://gitee.com/ykang2020/yk_homepage](https://gitee.com/ykang2020/yk_homepage)
[https://github.com/yk2012/yk_homepage](https://github.com/yk2012/yk_homepage)

博客主页
[https://yk2012.github.io/](https://yk2012.github.io/)


都是在官方文档里面学来的~ 
YK菌把步骤记录下来分享给大家，避免再重复踩一些坑~
官方文档 [https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422200213581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# 1. 初始化项目
1. 创建一个新的文件夹，项目正式开始

2. 初始化包管理器

```powershell
npm init -yes
```

3. 安装VueRress本地依赖

```powershell
cnpm install -D vuepress
```

4. 创建文件docs/README.md
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042214352193.png)
5. 在README.md中写入内容

```markdown
# Hello YK
这是YK菌的个人主页~欢迎访问
```
6. 修改package.json中scripts

```javascript
"scripts": {
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs"
}
```
7. 启动本地服务器

```powershell
npm run docs:dev
```
8. 查看网页

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422144130765.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# 2. 页面整体架构搭建
Vue的官方文档应该就是用这个搭建的吧~

## 1. 安装博客主题
我们一开始得到的网页是一个文档的页面，我们可以安装一个博客主题，让我们的页面变成博客页面

```powershell
cnpm install @vuepress/theme-blog -D
```
## 2. 目录结构
可以按照官方的教程来，因为我这里想弄一个主页出来，所以就对目录结构进行了一些改动
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422200714942.png)
## 3. 配置项目
官方文档对于每一个细节都说的很详细，所以我这里直接给出设置文件，大家参考下完整的结构

因为我希望保留主页home，所以就没有完全按照文档的来设置~


.vuepress/config.js
```javascript
module.exports = {
  title: "Hello YK",
  dest: "dist",
  description: "YK HomePage",
  theme: "@vuepress/blog",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/blog/" },
      { text: "随笔", link: "/writing/" },
      { text: "标签", link: "/tag/" },
      { text: "百度", link: "https://baidu.com" },
      { text: "时钟", link: "http://ykang2020.gitee.io/clock/" },
    ],
    directories: [
      {
        id: "blog",
        dirname: "_blogs",
        path: "/blog/",
        title: "我的博客",
      },
      {
        id: "writing",
        dirname: "_writing",
        path: "/writing/",
        title: "我的随笔",
      },
    ],
    siderbar: "auto",
    footer: {
      contact: [{ type: "github", link: "https://github.com/yk2012" }],
      copyright: [
        { text: "YK菌", link: "https://gitee.com/ykang2020" },
        { text: "YK | Copyright © 2021" },
      ],
    },
  },
};
```
## 4. 编辑博文
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422201307288.png)

这里给出了一个例子

```markdown
---
title: 我的第一篇文章
data: 2021-04-22
author: YK菌
location: HeFei
tags:
  - JavaScript
  - DOM
summary: 这是文章的总结
---

# 这是第一篇文章啊
```

这样设置就可以看到这样效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422201715523.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
可以按标签分类自己的博客
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422201758151.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

## 5. 编辑主页

```javascript
# Hello YK
这是YK菌的个人主页~欢迎访问

<img src="https://raw.githubusercontent.com/yk2012/image-yk/master/20210422/YK菌.kpl2nkte2z4.jpg" width="100px" />
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422201636127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

# 3. 部署上线

[【Tips】GitHub访问缓慢or无法访问 的解决方案](https://yk2012.github.io/2021/04/22/git%E8%AE%BF%E9%97%AE%E9%97%AE%E9%A2%98/)

在github上新建一个项目 名称为 `yk2012.github.io`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422225401140.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
项目根目录新建一个`deploy.sh`文件

```shell
#!/usr/bin/env sh
set -e
npm run docs:build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:yk2012/yk2012.github.io.git master
cd - 
```
执行.sh文件

开启GitHub Pages 服务
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422235726667.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
# 4. 访问网页


[https://yk2012.github.io/](https://yk2012.github.io/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422235845271.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423135103695.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423135116354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423135049716.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423135218290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042314372499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
这是项目地址，欢迎star
[https://gitee.com/ykang2020/yk_homepage](https://gitee.com/ykang2020/yk_homepage)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423144114537.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
[https://github.com/yk2012/yk_homepage](https://github.com/yk2012/yk_homepage)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423144307291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
