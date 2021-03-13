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
var cleanCss = require('gulp-clean-css')
var concat = require('gulp-concat')
var sass = require('gulp-sass')

// nprocess.env是node预设置
var isProduction = process.env.ENV === 'prod';
gulp.task('default', function() {
	sequence('sass', 'sass-watch', 'babel', 'babelWatch', 'mainjs');
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


gulp.task('minify-css', function() {
  // cleanCss
  gulp.src([
    './assets/css/bootstrap-theme.css',
    './assets/css/bootstrap.css',
    './assets/css/index.css'])
    .pipe(concat('main.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('css/'))
})

gulp.task('minify-css-watch', function() {
  gulp.watch('./assets/css/*.css', ['minify-css'])
})

gulp.task('sass', function() {
  gulp.src('./assets/css/main.scss')
  .pipe(sass())
  .pipe(gif(isProduction, cleanCss()))
  .pipe(gulp.dest('css/'))
})


gulp.task('sass-watch', function() {
  gulp.watch('./assets/css/*.scss', ['sass'])
})