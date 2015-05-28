'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('partials', function () {
    return gulp.src([
      options.src + '/**/*.html',
      options.tmp + '/serve/**/*.html'
    ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'angular-notifications',
        root: 'app'
      }))
      .pipe(gulp.dest(options.tmp + '/partials/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['partials'], function() {
    gulp.src(options.src + '/**/*.js')
      .pipe($.concat('angular-notifications.js'))
      .pipe(gulp.dest(options.dist))
      .pipe($.uglify())
      .pipe($.rename('angular-notifications.min.js'))
      .pipe(gulp.dest(options.dist));
  });
};
