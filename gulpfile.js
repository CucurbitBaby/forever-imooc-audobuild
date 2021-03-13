var gulp = require('gulp');
var browserify = require('browserify')
var fs = require('fs')
var sequence = require('run-sequence');
var watchify = require('watchify');

gulp.task('default', function() {
	// sequence('vendorjs','mainjs');
	sequence('mainjs');

});



gulp.task('mainjs', function() {
	var b = browserify({
		entries: ['assets/js/index.js'],
		cache: {},
		packageCache: {},
		plugin: [watchify]
	})
  // .external('angular').external('lodash')
  
	function bundle() {
		b.bundle().pipe(fs.createWriteStream('js/main.js'))
	}

	bundle();
	b.on('update', bundle);

});
