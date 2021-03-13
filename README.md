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

### 3-5 自动化 JavaScript 构建-2 使用watchify实现自动化构建 (07:37)

## 第4章 使用 Browserify 加载第三方类库
> 本章节讲解什么是uglifyJS 前端内容的自动化构建、使用browserify来构建第三方类库、使用gulp-uglify来压缩JavaScript。

### 4-1 什么是uglifyJS 前端内容的自动化构建 (05:17)
### 4-2 使用browserify来构建第三方类库 (11:27)
### 4-3 使用browserify + browserify-shim来构建第三方类库 (07:51)
### 4-4 使用gulp-uglify来压缩JavaScript (08:50)
### 4-5 使用gulp-if给gulp加入条件判断 (04:53)

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