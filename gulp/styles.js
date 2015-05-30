'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('styles', function () {
    var lessOptions = {
      options: [
        'bower_components',
        options.src
      ]
    };

    return gulp.src(options.src + '/**/*.less')
      .pipe($.sourcemaps.init())
      .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.tmp + '/serve/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
