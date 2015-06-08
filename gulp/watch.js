'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  var watch = function(srcDir, watchOptions) {
    return function() {
      if (!watchOptions) {
        watchOptions = {};
      }

      watchOptions.watchSrcLess = watchOptions.watchSrcLess || true;
      watchOptions.watchSrcHtml = watchOptions.watchSrcHtml || true;
      watchOptions.srcJs = watchOptions.srcJs || '/**/*.js';

      gulp.watch([options.app + '/*.html', 'bower.json'], ['inject']);

      if (watchOptions.watchSrcLess) {
        gulp.watch([
          srcDir + '/**/*.less'
        ], function(event) {
          if(isOnlyChange(event)) {
            gulp.start('styles');
          } else {
            gulp.start('inject');
          }
        });
      }

      gulp.watch([srcDir + watchOptions.srcJs, options.app + '/**/*.js'], function(event) {
        if(isOnlyChange(event)) {
          gulp.start('scripts');
        } else {
          gulp.start('inject');
        }
      });

      var htmlToWatch = [options.app + '/*.html'];
      if (watchOptions.watchSrcHtml) {
        htmlToWatch.push(srcDir + '/**/*.html');
      }

      return gulp.watch(htmlToWatch, function(event) {
        browserSync.reload(event.path);
      });
    };
  };

  gulp.task('watch', ['inject'], watch(options.src));
  gulp.task('watch:dist', ['inject:dist'], watch(options.dist, {watchSrcLess: false, watchSrcHtml: false, srcJs: 'angular-notification-icons.js'}));
  gulp.task('watch:dist:min', ['inject:dist:min'], watch(options.dist, {watchSrcLess: false, watchSrcHtml: false, srcJs: 'angular-notification-icons.min.js'}));
};
