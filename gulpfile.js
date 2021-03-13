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
  
	function bundle() {
		b.bundle().pipe(fs.createWriteStream('js/main.js'))
	}

	bundle();
	b.on('update', bundle);

});

gulp.task('vendorjs', function() {
	var b = browserify()
  .require('./bower_components/angular/angular', {
    expose: 'angular'
  })
  .require('./bower_components/lodash/dist/lodash', {
    expose: 'lodash'
  })
  .bundle().pipe(fs.createWriteStream('js/vendor.js'))
});


