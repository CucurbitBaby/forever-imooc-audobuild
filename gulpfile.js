var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')
var sequence = require('run-sequence');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var gif = require('gulp-if');
var coffee = require('gulp-coffee')
var babel = require('gulp-babel')

// nprocess.env是node预设置
var isProduction = process.env.ENV === 'prod';
gulp.task('default', function() {
	sequence('babel', 'babelWatch', 'mainjs');
});

gulp.task('mainjs', function() {
	var b = browserify({
		entries: ['build/js/index.js'],
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
    .pipe(gif(isProduction, uglify()))
    .pipe(gulp.dest('./js/'))
	}

	bundle();
	b.on('update', bundle);

});


gulp.task('coffee', function() {
  // 讲coffee文件编译为JS文件
  gulp.src('./assets/js/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('./build/js/'))
})


gulp.task('coffeeWatch', function() {
  gulp.watch('./assets/js/*.coffee', function() {
    sequence('coffee');
  })
})

gulp.task('babel', function() {
  // 讲coffee文件编译为JS文件
  gulp.src('./assets/js/*.js')
  .pipe(babel({presets: ["es2015"]}))
  .pipe(gulp.dest('./build/js/'))
})


gulp.task('babelWatch', function() {
  gulp.watch('./assets/js/*.js', function() {
    sequence('babel');
  })
})