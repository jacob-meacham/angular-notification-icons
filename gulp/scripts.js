'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts:jshint', function() {
    return gulp.src([options.src + '/**/*.js', options.app + '/**/*.js'])
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'));
  });

  gulp.task('scripts', ['scripts:jshint'], function () {
    return gulp.src([options.src + '/**/*.js', options.app + '/**/*.js'])
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());
  });
};
