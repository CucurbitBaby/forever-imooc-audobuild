# 前端内容的自动化构建 ≈ 2017-12

## 第1章 概念介绍
> 本章节讲解构建的概念，自动化构建的优势，以及构建工具的演进历史。

### 1-1 介绍课程目标和学习内容 

#### 第一部分 - 理论和背景

##### 1. 什么是构建？为什么要自动化构建？
> 软件的构建： 讲源代码转化为可执行软件的过程。
> a.java/b.java/c.java --compile--> a.calss/b.class/c.class --packge--> result.jar/result/war
> javac a.java / javac b.java /javac c.java ..

##### 2. 构建工具的演进之路。
> 讲的java的构建工具。

##### 3. 前端构建工具的介绍
> 前端构建工具是站在巨人肩膀之上的，JavaScript是站在巨人(各类语言)之上的语言。
* Gulp - 基于流的自动化构建工具。



#### 第二部分 - JavaScript 的构建
##### 1. 什么是 Browserify?
##### 2. 使用 Browserify 加载第三方类库。

##### 3. 使用 Browserify 实现JS的模块化加载。
##### 4. 使用 coffeescript 和 ES6 来优化代码。

#### 第三部分 - CSS 的构建
##### 1. gulp-clean-css 的介绍和使用。
##### 2. SASS

## 第2章 browserify
> 本章讲解什么是browserify以及为什么要使用browserifyt及使用browserify来实现JavaScript的模块化。

### 2-1 什么是browserify以及为什么要使用browserify
> 什么是 Browserify?
> Browserify 可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码，通过预编译让前端 Javascript 可以直接使用 Node NPM 安装的一些库。
* 一个管理前端依赖的工具。
* 可以实现JS的模块化加载。

### 2-2 使用browserify来实现JavaScript的模块化 

#### node.js 的 CommonJS 模块规范
* 使用 module.exports 来定义JS模块
* 使用 require 语句来加载JS模块

#### 安装browserify
> 全局安装 browserfiy
> npm install -g browserify
> 查看全局是否安装
> npm ls browserify -g

#### 使用browserify
> browserify js/add-todo-controller.js js/todo-controller.js js/todos-controller.js js/index.js -o js/main.js
> index.html 替换引入的文件
* 也可以把3个模块删除，browserify 本身有能力分析和打包
* browserify js/index.js -o js/main.js

#### 思考browserify
* browserify 如何分析和打包 相同的模块的?

## 第3章 使用gulp进行构建
> 本章节讲解使用shell脚本进行构建、gulp的基本用法及使用gulp进行构建的方法。

### 3-1 使用gulp进行构建-1 使用shell脚本进行构建
* 新建一个shell脚本 build.sh
  * 文件输入 browserify js/index.js -o js/main.js
* rm js/main.js
* ./build.sh


### 3-2 使用gulp进行构建-2 gulp的基本用法
* 安装 gulp 3.x
  * npm i gulp@3.9.1
* 新建 gulpfile.js
  * 配置gulp任务
* 运行gulp 
  * npx gulp

### 3-3 使用gulp进行构建-3 使用gulp进行构建

#### node中使用shell脚本
* node中执行一个shell脚本，需要 shelljs模块
  * npm install shelljs@0.7.6
```js
var gulp = require('gulp');
var shelljs = require('shelljs')

gulp.task('default', function() {
  shelljs.exec('browserify js/index.js -o js/main.js')
})

```
* rm js/main.js
* npx gulp

#### gulp中使用browserify
> npm install browserify@16.5.0
* browserify 既可以作为可执行文件在shell中调用(终端中里用)
  * 也有自己本身的api，可以作为node模块来调用
  * 直接在gulp任务中直接调用browserify的api岂不是更好。
```js


```

### 3-4 自动化 JavaScript 构建-1 使用gulp.watch实现自动化构建
> 如何把gulp任务自动化

#### gulp watch
* 目前src源文件和main.js打包后文件同在一个目录不好监听整个目录。拆分一下 src文件转移到 \asssets\js

#### gulp default
> default是特殊的task，应该比较灵活取用。
* 可以在gulp任务中调用别的任务。
* npm install run-sequence@2.2.1

#### 完整代码

```js
// 完整 gulpfile.js
var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')
var sequence = require('run-sequence');

gulp.task('default', function() {
	sequence('mainjs', 'watch');
});



gulp.task('mainjs', function() {
  browserify()  // 初始化
  .add('assets/js/index.js')  // 将js作为输入文件
  .bundle()  // 文件流 stream
  .pipe(fs.createWriteStream('js/main.js'))  // 输出到文件
});



gulp.task('watch', function() {
	gulp.watch(['assets/js/*.js'], function(){
		sequence('mainjs');
	});
});

```

### 3-5 自动化 JavaScript 构建-2 使用watchify实现自动化构建 
> browserify 有个插件叫 watchify，智能识别require，只要提供入口文件index.js即可。
> 默认不会终端不会watch输出 但是文件已经生效了。
* npm install watchify@3.11.1
```js
const gulp=require('gulp');

var browserify = require('browserify');
var sequence = require('run-sequence');
var watchify = require('watchify');

var fs = require('fs');


gulp.task('default', function() {
	sequence('mainjs');
});

gulp.task('mainjs', function() {
	var b = browserify({
		entries: ['assets/js/index.js'],
		cache: {},
		packageCache: {},
		plugin: [watchify]
	})
  
  // browserify 的 plugin中添加了 watchify 之后
  // 它初始化结束之后，b这个对象就有一个update事件，每当源文件发生变化的时，update触发
  // 触发后使用callback 让 browserify 再次编译即可。

	// b.bundle().pipe(fs.createWriteStream('js/main.js'));
	// b.on('update', function() {
	// 	b.bundle().pipe(fs.createWriteStream('js/main.js'))
	// })

	function bundle() {
		b.bundle().pipe(fs.createWriteStream('js/main.js'))
	}

	bundle();
	b.on('update', bundle);

});
```

## 第4章 使用 Browserify 加载第三方类库
> 本章节讲解什么是uglifyJS 前端内容的自动化构建、使用browserify来构建第三方类库、使用gulp-uglify来压缩JavaScript。
* 构建本地JS的目的是为了模块化JS?（仅仅只是?）
  * lodash等第三方类库文件本身就是以模块化的方式组织的。为什么还需要构建?
  * 1. 通常不止引入一个类库，可以减少index.html中script引入的复发度。
  * 2. 减少了http请求。

### 4-1 什么是uglifyJS 前端内容的自动化构建
> [在线压缩](https://skalman.github.io/UglifyJS-online/)

### 4-2 使用browserify来构建第三方类库
> [bower使用](https://www.cnblogs.com/wendingding/p/9197207.html)
> [bower常用命令](https://blog.csdn.net/o00543/article/details/53256498)
> [bower常用命令2](https://www.jianshu.com/p/1f3cf01fb028)
> [bower查看包的list命令好像失效了](http://www.bubuko.com/infodetail-900798.html)
> [bower项目在其服务器上维护了受欢迎软件包的列表](https://bower.io/search/)
> [bower的项目path中不能有中文](https://www.jianshu.com/p/6c857c3ae499) 把当前commit的文件拎出去 npm install , bower isntall ..
> [Git速度提速 git协议换https协议](https://blog.csdn.net/helloworld0906/article/details/106374297)
> [bower默认是用Git安装包的，Git默认速度又是很慢的](https://www.jianshu.com/p/8dad15b6018c)
> 找不到bower的国内镜像，只能从Git或者梯子下手了。或者直接配置包的Gitee地址？
> [官网](https://bower.io/)
> 可以直接而指定Git地址安装，但是不能指定包名和地址安装。很烦
> [bower国内源](https://code.i-harness.com/zh-CN/keyword/170518)

* 使用bower维护angulaer lodash等第三方类库 
  * bower install angular#1.6.2
  * bower install lodash#4.17.4
  * 或者  bower search lodash
* 执行版本安装
  * bower install --save jquery#1.2.3

#### 重点
> bower install lodash#4.17.4 能看到真实地址  https://github.com/lodash/lodash/archive/4.17.4.tar.gz
> lodash 这个4.17.4是在tag里面能搜到的
> 既然4.17.4.tar.gz这个地址不能单独检出，那么fork到gitee找到对应的地址即可。然后修改包名
> interview(bower都给下载后的目录里添加什么了呢?) 用WinMerge对比下有啥子区别，就多了一个bwer.json

#### 操作
> 原本 assets/js/index.js 中3个Controller 打包后都会出现在main.js中。
> 对于类库而言我们已经单独把他们打包到了vendor.js中了，避免vendor.js中的类库重复出现在main.js中。
> 最终还是不行，_是可以了，angular这类不是CommonJS规范定义的类库还是不行的。


### 4-3 使用browserify + browserify-shim来构建第三方类库
> browserify-shim 解决非CommonJS模块构建成CommonJS模块
> npm init
* npm install browserify-shim@3.8.13 -D
* package.json 中 devDependencies 并级添加browserify-shim配置
```html
  <script type="text/javascript" src="js/main.js"></script>
```
```js
// assets/js/index.js
angular = require('angular')
_ = require('lodash')

angular
.module('TodoList', [])
.controller('TodosController', require('./todos-controller.js'))
.controller('AddTodoController', require('./add-todo-controller.js'))
.controller('TodoController', require('./todo-controller.js'))

```
```js
  // package.json
  "browserify": {
    "transform": [
      "browserify-shim"
    ]
  },
  "browserify-shim": {
    "angular": "angular",
    "lodash": "_"
  },
  "browser": {
    "angular": "./bower_components/angular/angular.js",
    "lodash": "./bower_components/lodash/dist/lodash.js"
  }
```
* node黑科技require某个不是CommonJS规范的包时
```js
// angular/index.js 
require('./angular');
module.exports = angular;
// 然后直接rquire(' angular/index.js ')
```


### 4-4 使用gulp-uglify来压缩JavaScript
* npm install gulp-uglify@2.0.1
* npm install vinyl-source-stream@2.0.0
  * nodeStream 转为  vinylSourceStream
* npm install vinyl-buffer@1.0.1
  * gulp-uglify要求传入的一个buffer而不是一个stream
```js
gulp.task('mainjs', function() {
	var b = browserify({
		entries: ['assets/js/index.js'],
		cache: {},
		packageCache: {},
		plugin: [watchify]
	})
  
	var bundle = function () {
		// b.bundle().pipe(fs.createWriteStream('js/main.js'))
    b
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
	}

	bundle();
	b.on('update', bundle);

});
```

### 4-5 使用gulp-if给gulp加入条件判断
> npm install gulp-if@2.0.2
> 直接执行gulp 实际是dev环境 并不是prod
> ENV=prod gulp 就是进入if进行压缩。

## 第5章 使用 coffeescipt 和 ES6 来优化代码
> 本章节讲解CoffeeScript的介绍。
### 5-1 使用 coffeescipt 和 ES6 来优化代码-1 CoffeeScript的介绍 (04:17)
### 5-2 使用 coffeescipt 和 ES6 来优化代码-2 在gulp中将CoffeeScript编译为JavaScript (09:55)
### 5-3 使用 coffeescipt 和 ES6 来优化代码-3 ES6的介绍和在gulp中将ES6编译为JavaScript (09:04)

## 第6章 CSS的前端构建
> 本章节结合实例详细讲解如何使用Gulp，结合插件进行CSS的压缩和合成，以及如何将SASS编译为CSS。
### 6-1 minify-css的介绍和使用 gulp-clean-css 来压缩css代码 (08:08)
### 6-2 使用gulp-concat来合并css文件和css的自动化构建 (04:35)
### 6-3 SASS 来帮忙-1 SASS的介绍 (07:45)
### 6-4 SASS 来帮忙-2 使用gulp-sass来编译SASS代码 (06:36)
### 6-5 总结 (02:02)

# 书签

# 扩展
## angular 初级学习