'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  var inject = function(srcDir, _injectOptions) {
    return function() {
      if (!_injectOptions) {
        _injectOptions = {};
      }
      
      var injectOptions = {
        ignorePath: [options.tmp + '/serve'],
        addRootSlash: false
      };
      injectOptions.srcStyles = _injectOptions.srcStyles || options.tmp + '/serve/**/*.css';
      injectOptions.srcJs = _injectOptions.srcJs || srcDir + '/**/*.js';

      var injectStyles = gulp.src(injectOptions.srcStyles, { read: false });

      var injectScripts = gulp.src([
        options.app + '/**/*.js',
        injectOptions.srcJs,
        '!' + srcDir + '/**/*.spec.js'
      ])
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

      return gulp.src(options.app + '/*.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(options.wiredep))
        .pipe(gulp.dest(options.tmp + '/serve'));
    };
  };
  gulp.task('inject', ['scripts', 'styles'], inject(options.src));
  gulp.task('inject:dist', inject(options.dist, {srcStyles: options.dist + '/angular-notification-icons.css', srcJs: options.dist + '/angular-notification-icons.js'}));
  gulp.task('inject:dist:min', inject(options.dist, {srcStyles: options.dist + '/angular-notification-icons.min.css', srcJs: options.dist + '/angular-notification-icons.min.js'}));
};
