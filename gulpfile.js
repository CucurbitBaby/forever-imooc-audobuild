var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')

gulp.task('default', function() {
  
  browserify()  // 初始化
  .add('js/index.js')  // 将js作为输入文件
  .bundle()  // 文件流 stream
  .pipe(fs.createWriteStream('js/main.js'))  // 输出到文件
})
