'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', function() {
    gulp.src(options.src + '/**/*.js')
      .pipe($.concat('angular-notifications.js'))
      .pipe(gulp.dest(options.dist))
      .pipe($.uglify())
      .pipe($.rename('angular-notifications.min.js'))
      .pipe(gulp.dest(options.dist));

    gulp.src(options.src + '/**/*.less')
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
