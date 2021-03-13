var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')
var sequence = require('run-sequence');
var watchify = require('watchify');

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




// 上一个版本
/*

var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')
var sequence = require('run-sequence');
var watchify = require('watchify');

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



//*/