
# 1. 简介
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625201728302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625203917705.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
NoSQL，指的是非关系型的数据库。NoSQL有时也称作Not Only SQL的缩写，是对不同于传统的关系型数据库的数据库管理系统的统称。

NoSQL用于超大规模数据的存储。（例如谷歌或Facebook每天为他们的用户收集万亿比特的数据）。这些类型的数据存储不需要固定的模式，无需多余操作就可以横向扩展。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021063019241893.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210630192453954.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204029378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。






## RDBMS vs NoSQL

### RDBMS
- 高度组织化结构化数据
- 结构化查询语言（SQL） (SQL)
- 数据和关系都存储在单独的表中。
- 数据操纵语言，数据定义语言
- 严格的一致性
- 基础事务

### NoSQL
- 代表着不仅仅是SQL
- 没有声明性查询语言
- 没有预定义的模式
-键 - 值对存储，列存储，文档存储，图形数据库
- 最终一致性，而非ACID属性
- 非结构化和不可预知的数据
- CAP定理
- 高性能，高可用性和可伸缩性

## NoSQL的优点/缺点
优点:
- 高可扩展性
- 分布式计算
- 低成本
- 架构的灵活性，半结构化数据
- 没有复杂的关系

缺点:
- 没有标准化
- 有限的查询功能（到目前为止）
- 最终一致是不直观的程序


## 基本概念

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625211521580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
- 数据库 database
- 集合(数组) collection
类似与SQL中的数据表，本质上是一个数组，里面包含看多个文档对象，`[{},{},{}]`
- 文档对象 document
类似与SQL中的记录，一个文档对象`{}`就是一条记录

一个【数据库】由多个【集合】构成，一个【集合】包含多个【文档对象】

## 文档手册

官网
[https://www.mongodb.com/](https://www.mongodb.com/)
官网手册
[https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)
菜鸟教程
[https://www.runoob.com/mongodb/mongodb-tutorial.html](https://www.runoob.com/mongodb/mongodb-tutorial.html)




# 2. 安装&启动
下载安装
[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

目前是4.4.6的版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625200524877.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

安装完成后添加到系统环境变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204234690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


在C盘创建data文件夹里面再创建一个db文件夹
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204902986.png)



在cmd中输入mongod即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204510982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
再打开一个CMD属于mongo
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204633494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625204914709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

总结一下
1. 启动mongodb服务器：mongod
2. 修改默认端口：mongod --port 新的端口号
3. mongodb默认的端口：27017
4. 设置mongodb数据库的存储路径：mongod --dbpath 路径
5. 连接mongodb数据库：mongo



可以使用MongoDB Compass图形化使用MongoDB
下载地址 [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625211411874.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


# 3. 使用
## 3.1 基本使用
`show dbs` 或`show databases`
查看所有的数据库
`use xxx`
切换到指定的数据库
`db`
查看当前操作的数据库
`show collections`
查看当前数据库中所有的集合

## 3.2 数据库的CRUD操作

### 插入数据`insert`
插入一条数据
```javascript
db.collectionName.insertOne( {name:'liu'} )
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625220949435.png)


`db`表示的是当前操作的数据库
`collectionName`表示操作的集合，若没有，则会自动创建

插入的文档如果没有手动提供`_id`属性，则会自动创建一个

插入多条数据

```javascript
db.collectionName.insertMany( [ {name:'ykyk'} , {name:'ykyk123'} ] )
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625221054382.png)

需要用【数组】包起来

万能API【可以插入一个或多个】：

```javascript
db.collectionName.insert()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021062522092432.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625221125210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
可视化页面用起来也很方便
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625221413279.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

### 查询数据`find`

```javascript
db.collectionName.find()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625220757147.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


查询集合所有的文档，即所有的数据。
查询到的是整个数组对象。在最外层是有一个对象包裹起来的。

条件查询
```javascript
db.collectionName.find({name:"hhh"})
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625220843787.png)
结果返回的是一个【数组】，可以在后面直接取索引下标
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625221508882.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
查找第一个
```javascript
db.collectionName.findOne() 
```
返回的是查询到的对象数组中的第一个对象（返回的是对象）

查询文档个数
`db.collectionName.count()`或`db.collectionName.length()` 统计文档个数

注意：
```javascript
> db.students.find({_id:222}).name  //错误
> db.students.findOne({_id:222}).name //正确
```

1. mongodb支持直接通过内嵌文档的属性值进行查询

```javascript
{
	name:'ykyk',
	hobby:{
		movies:['movie1','movie2'],
		cities:['zhuhai','chengdu']
	}
}

db.users.find({hobby.movies:'movie1'}) //错误
db.users.find({"hobby.movies":'movie1'})//此时查询的属性名必须加上引号
```

2. 查询操作符的使用

比较操作符
$gt 大于
$gte 大于等于
$lt 小于
$lte 小于等于
$ne 不等于
$eq 等于的另一种写法
$or 或者

```javascript
// 大于200
db.users.find({num:{$gt:200}})
// 大于200且小于300
db.users.find({num:{$gt:200,$lt:300}}) 

//大于300或小于200
db.users.find(
    {
        $or:[
            {num:{$gt:300}},
            {num:{$lt:200}}
        ]
    }
)  
```

3. 分页查询

```javascript
db.users.find().skip(页码-1 * 每页显示的条数).limit(每页显示的条数)
```
```javascript
db.users.find().limit(10) // 前10条数据
db.users.find().skip(50).limit(10) // 跳过前50条数据，即查询的是第61-70条数据，即第6页的数据
```


4. 【排序】find查询结果默认是id升序排序查询的
```javascript
// 1表示升序排列，-1表示降序排列
db.emp.find().sort({sal:1}) 
// 先按照sal升序排列，如果遇到相同的sal，则按empno降序排列
db.emp.find().sort({sal:1,empno:-1}) 
```

注意：`skip`,`limit`,`sort`可以以任意的顺序调用，最终的结果都是先调`sort`，再调`skip`，最后调`limit`

设置查询结果的投影，即只过滤出自己想要的字段
```javascript
// 在匹配到的文档中只显示ename字段
db.emp.find({},{ename:1,_id:0}) 
```


通过可视化界面查询
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625232852188.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)


### 修改数据`update`
替换整个文档
```javascript
db.collectionName.update(condiction,newDocument)
```

修改对应的属性，需要用到修改操作符，比如`$set`,`$unset`,`$push`,`$addToSet`

```javascript
db.collectionName.update(
	// 查询条件
	{_id:222},
	{
		// 修改对应的属性
		$set:{ 
			name:'ykky',
			age:21
		}
		// 删除对应的[属性]
		$unset:{
			gender:1 //这里的1可以随便改为其他的值，无影响
		}
		
	}
)
```
`update`默认与`updateOne()`等效，即对于匹配到的文档只更改其中的第一个
`updateMany()`可以用来更改匹配到的所有文档
```javascript
db.students.updateMany(
	{name:'ykky'},
	{
		$set:{
			age:21,
			gender:222
		}
	}
)
```

向数组中添加数据
```javascript
db.users.update({username:'yk'},{$push:{"hobby.movies":'movie4'}})

// 如果数据已经存在，则不会添加
db.users.update({username:'yk'},{$addToSet:{"hobby.movies":'movie4'}})
```

自增自减操作符`$inc`
```javascript
// 让num自增100
{$inc:{num:100}} 
// 让num自减100
{$inc:{num:-100}} 
// 给工资低于1000的员工增加400的工资
db.emp.updateMany({sal:{$lt:1000}},{$inc:{sal:400}}) 
```

### 删除数据`remove`
【一般不会删除】
```javascript
db.collectionName.remove() 
```
`remove`默认会删除所有匹配的文档。相当于`deleteMany()`
`remove`可以加第二个参数，表示只删除匹配到的第一个文档。此时相当于`deleteOne()`

```javascript
db.students.remove({name:'ykky',true})
```

```javascript
db.collectionName.deleteOne()
db.collectionName.deleteMany()
```
删除所有数据

```javascript
db.students.remove({})
```
性格较差，内部是在一条一条的删除文档。删除整个集合来提高效率。

删除集合
```javascript
db.students.drop()
```

删除数据库
```javascript
db.dropDatabase()
```

注意：删除某一个文档的属性，应该用update。   
remove以及delete系列删除的是整个文档

当删除的条件为内嵌的属性时：
```javascript
db.users.remove({"hobby.movies":'movie3'})
```

# 4. 文档之间的关系
## 一对一（one to one）
通过内嵌文档体现一对一的关系


## 一对多/多对一 （one to many / many to one）
【用户】 - 【订单】
每个订单数据用一个属性保存用户的id

```javascript
db.users.insert([
	{_id:100,username:'yk'},
	{_id:101,username:'ykyk'}
])

db.orders.insert([
	{list:['apple','banana'],user_id:100},
	{list:['apple','banana2'],user_id:100},
	{list:['apple'],user_id:101}
])
```
查询yk的所有订单：

①首先获取yk的id
```javascript
var user_id=db.users.findOne({name:'yk'})._id;
```
②根据id从订单集合中查询对应的订单
```javascript
db.orders.find({user_id:user_id})
```

## 多对多（many to many）
【商品】-【分类】
每个商品数据用一个属性保存多个分类的id
每个分类数据用一个属性保存多个商品的id
【老师】- 【学生】
```javascript
db.teachers.insert([
    {
        _id:100,
        name:'yk'
    },
    {
        _id:101,
        name:'ykyk'
    },
    {
    	_id:102,
    	name:'ykky'
    }
])

db.students.insert([
	{
		_id:1000,
		name:'jun',
		tech_ids:[100,101]
	},
	{
		_id:1001,
		name:'jun2',
		tech_ids:[102]
	}
])
```

# 5. mongoose
中文文档
[http://www.mongoosejs.net/](http://www.mongoosejs.net/)
建议直接看下面的英文文档
[https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)
## 5.1 简介
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625234810582.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
1. mongoose是nodejs中的专门用于操作mongodb数据库的js库

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210625234909279.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)

2. mongoose中的对象：

`Schema` 模式对象（用于约束文档的结构）
`Model` 模型对象（即mongodb中的集合）
`Document` 文档对象（即mongodb中的文档）

## 5.2 安装
```shell
npm i mongoose
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210626000818963.png)

## 5.3 连接与断开数据库

```javascript
// 1.引入mongoose
const mongoose = require("mongoose");

// 2.连接mongodb数据库
mongoose.connect("mongodb://localhost/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 3.监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once("open", () => {
  console.log("数据库连接成功！");
});
// 绑定数据库连接失败事件
mongoose.connection.once("close", () => {
  console.log("数据库已断开");
});

// 4.断开数据库连接(一般不用)【一般只需连接一次，不会断开，除非手动断开】
mongoose.disconnect();
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021062600082971.png)

## 5.4 创建模式Schema对象和模型Model对象

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("数据库连接成功！");
});

const Schema = mongoose.Schema;
// 创建Schema(模式)对象
const stuSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: "female",
  },
  address: String,
});

// 通过Schema创建Model(模型)对象
// Model 代表的是数据库中的集合，通过Model才能对数据库进行操作
// mongoose.model(modelName, schema)
const StuModel = mongoose.model("student", stuSchema);
```


## 5.5 利用模型Model对象进行增删查改操作
### 添加操作`create`
创建一个或多个文档并添加到数据库中
```javascript
Model.create(doc(s), [callback])
```
参数
- doc(s) 可以是一个文档对象，也可以是一个文档对象的数组
- callback 当操作完成后调用的回调函数

```javascript
// 向数据库中插入一个文档
// StuModel.create(doc, err=>{})
StuModel.create(
  {
    name: "YK",
    age: 18,
    gender: "male",
    address: "WuHu",
  },
  (err) => {
    if (!err) {
      console.log("插入成功！");
    }
  }
);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210626132659307.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210626132649581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70)
mongoose会自动把集合名称变成复数形式


```javascript
UserModel.create({ user_id: 100, name: "ykyk" }, function (err) {
  if (!err) hui{
    console.log("插入成功");
  } else {
    console.log(err);
  }
});

let data = [
  { user_id: 101, name: "yk1", age: 19 },
  { user_id: 102, name: "yk2" },
];
UserModel.create(data, function (err) {
  console.log(arguments[1]); //第二个值表示的是所添加的文档对象,是一个数组
});
```

还有一种添加数据的方式通过new 然后save

```javascript
const u = new User({
	name:'ykJun',
	age: 18,
});

u.save(err=>{
	if(err){
		console.log(err);
		return;
	}
	console.log('成功');
});
```

### 查询操作`find`

```javascript
Model.find(conditions,[projection],[options],callback)
Model.findOne(conditions,[projection],[options],callback)
Model.findById(conditions,[projection],[options],callback)
```
参数
- `conditions`: 查询的条件 
- `projection`: 投影  `{ name: 1, gender: 1, _id: 0 }` 或 `'name gender -_id'`
- `options`: 查询选项  `{ skip: xx, limit: xx }`   
- `callback`：查询结果会通过回调函数返回，返回数组



```javascript
UserModel.find({}, function (err, data) {
  console.log(data);
});

UserModel.find(
  { name: /yk/i },
  "name gender -_id",
  { skip: 2, limit: 1 },
  function (err, data) {
    console.log(data); //返回的是一个文档对象数组
  }
);
```
`findById` 返回的是文档对象Document【Document对象是Model的实例】
```javascript
findById
UserModel.findById("5f9fbfba14319e492c0f5bc4", function (err, data) {
  console.log(data);
  console.log(data instanceof UserModel); //true 返回的文档对象属于模型对象（即集合）的实例对象
});
```

#### 查询文档的数量
```javascript
UserModel.count({}, function (err, count) {
  console.log(count);
});
```

### 修改操作`update`

```javascript
Model.update(conditions,[doc],[options],callback)
Model.updateMany(conditions,[doc],[options],callback)
Model.updateOne(conditions,[doc],[options],callback)
Model.replaceOne(conditions,[doc],[options],callback)
```
参数
- conditions 查询条件
- doc 修改后的文档对象
- options 配置参数 `{multi: true}`
- callback 回调函数

```javascript
UserModel.updateOne({ name: "yk" }, { $set: { age: 22 } }, (err,data) => {
  if (!err) {
    console.log("修改成功");
  }
});
```
### 删除操作`remove`

```javascript
model.remove(conditions,callback)
model.deleteOne(conditions,callback)
model.deleteMany(conditions,callback)
```

```javascript
UserModel.remove(
  {
    name: "yk",
  },
  (err, data) => {
    console.log("删除成功");
  }
);
```

### 备注
Document 和 集合文档 一一对应， Document是Model的实例
通过Model查询到的结果都是Document

也可以通过document来处理操作数据库

```javascript
const stu = new StuModel({
	name: 'ykykyk',
	age: 19
})
console.log(stu)
stu.save()

StuModel.findOne({}, (err, doc) => {
	if(!err){
		doc.update({$set:{age:22}}, err => {
			if(!err) {
				console.log('修改成功');
			}
		}
	}
	// 还有很多方法
	// get()
	// set()
	// toObject()
});


```

## 5.6 模块化处理


1. 单独创建一个数据库连接文件`dbconncet.js`

```javascript
const mongooes = require("mongoose");

mongooes.connect("mongodb://localhost/mongooes_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongooes.connection.once("open", function () {
  console.log("连接成功");
});
```

2. 为每一个集合创建一个模型对象文件`xxxModel.js`

```javascript
const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const userSchema = new Schema({
  user_id: String,
  name: String,
  age: Number,
  gender: {
    type: Number,
    default: 0,
  },
});

// 定义模型
const UserModel = mongooes.model("user", userSchema);

module.exports = UserModel;
```

3. 在最终的文件`index.js`中引入数据库连接文件和创建模型的文件

```javascript
require("./dbconncet");
const UserModel = require("./models/userModel");

UserModel.findOne({}, function (err, docs) {
  if (!err) {
    console.log(docs);
  }
});
```











