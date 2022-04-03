

# 1. 新增的语义化标签
之前都是用没有语义的div标签
```HTML
<header> /*头部标签*/
<nav>  /*导航标签*/
<article> /*内容标签*/
<section> /*定义文档某个区域*/
<aside> /*侧边栏标签*/
<footer> /*尾部标签*/
```
![image](https://img-blog.csdnimg.cn/img_convert/75c628a5e44f78bbb992cbde8073e052.png)

# 2. 新增的多媒体标签
### 2.1 视频 video
支持的格式：MP4、WebM、Ogg
```HTML
<video src="文件地址" controls="controls"></video>
```

```HTML
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
您的浏览器不支持Video标签。
</video>
```
属性|值|描述
---|---|---
autoplay|autoplay|如果出现该属性，则视频在就绪后马上播放。
controls|controls|如果出现该属性，则向用户显示控件，比如播放按钮。
height|pixels|设置视频播放器的高度。
width|pixels|设置视频播放器的宽度。
loop|loop|如果出现该属性，则当媒介文件完成播放后再次开始播放。
preload|auto、metadata、none|如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
src|视频URL|要播放的视频的 URL。
poster|图片URL|规定视频正在下载时显示的图像，直到用户点击播放按钮。
muted|muted|如果出现该属性，视频的音频输出为静音。

### 2.2 音频 audio
支持的格式:mp3、wav、ogg
```HTML
<audio src="文件地址" controls="controls"></audio>
```

```HTML
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
您的浏览器不支持 audio 元素。
</audio>
```
属性|值|描述
---|---|---
autoplay|autoplay|如果出现该属性，则音频在就绪后马上播放。
controls|controls|如果出现该属性，则向用户显示控件，比如播放按钮。
loop|loop|如果出现该属性，则当媒介文件完成播放后再次开始播放。
src|URL|要播放的音频的 URL。

- 谷歌浏览器把音频(JS)和视频(muted解决)自动播放禁止了


# 3. 新增的input类型
属性值|说明
---|---
type="email"|限制用户输入必须为email类型
url|url
data|日期
time|时间
month|月
week|周
number|数字
tel|手机号码
search|搜索框
color|生成一个颜色选择表单

# 4. 新增的表单属性
属性|值|说明
---|---|---
required|required| 必填。表单拥有该属性表示其内容不能为空
placeholder|提示文本|表单的提示信息，存在默认值将不显示
autofocus|autofocus|自动聚焦属性，页面加载完成自动聚焦到指定表单
autocomplete|off/on|记住之前输入的文字并提示，默认打开（需要放在表单内，同时加上name属性，同时成功提交）
multiple|multiple|可以多选文件提交

修改placehoder里的颜色

```css
input::placeholder {
    color: pink;
}
```