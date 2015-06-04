'use strict';

var gulp = require('gulp');

// TODO: why no templateCache in $?
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var templateCache = require('gulp-angular-templatecache');

module.exports = function(options) {
  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  // TODO: Combine all of these pipes
  gulp.task('templates', function() {
    return gulp.src(options.src + '/**/*.html')
       .pipe(templateCache({module: 'angular-notifications.tpls'}))
       .pipe(gulp.dest(options.tmp + '/templateCache'));
  });

  gulp.task('build', ['scripts:jshint', 'templates'], function() {
    gulp.src([options.src + '/**/*.js', options.tmp + '/templateCache/*.js', '!' + options.src + '/**/*.spec.js'])
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'))
      .pipe($.concat('angular-notifications.js'))
      .pipe(gulp.dest(options.dist))
      .pipe($.uglify())
      .pipe($.rename('angular-notifications.min.js'))
      .pipe(gulp.dest(options.dist));

    return gulp.src(options.src + '/**/*.less')
      .pipe($.concat('angular-notifications.less'))
      .pipe(gulp.dest(options.tmp))
      .pipe($.less()).on('error', options.errorHandler('Less'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe($.rename('angular-notifications.css'))
      .pipe(gulp.dest(options.dist))
      .pipe($.csso())
      .pipe($.rename('angular-notifications.min.css'))
      .pipe(gulp.dest(options.dist));
  });
};
