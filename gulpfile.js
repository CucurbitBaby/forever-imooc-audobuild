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
