'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  // TODO: Deal with concat vs. min
  var inject = function(srcDir) {
    return function() {
      var injectStyles = gulp.src([
        options.tmp + '/serve/**/*.css',
        '!' + options.tmp + '/serve/vendor.css'
      ], { read: false });

      var injectScripts = gulp.src([
        options.app + '/**/*.js',
        srcDir + '/**/*.js',
        '!' + srcDir + '/**/*.spec.js'
      ])
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

      var injectOptions = {
        ignorePath: [srcDir, options.tmp + '/serve'],
        addRootSlash: false
      };

      return gulp.src(options.app + '/*.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(options.wiredep))
        .pipe(gulp.dest(options.tmp + '/serve'));
    };
  };
  gulp.task('inject', ['scripts', 'styles'], inject(options.src));
  gulp.task('inject:dist', ['scripts', 'styles'], inject(options.dest));
};
