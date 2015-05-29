'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  var watch = function(srcDir) {
    return function() {
      gulp.watch([options.app + '/*.html', 'bower.json'], ['inject']);

      gulp.watch([
        options.src + '/**/*.less'
      ], function(event) {
        if(isOnlyChange(event)) {
          gulp.start('styles');
        } else {
          gulp.start('inject');
        }
      });

      gulp.watch([options.src + '/**/*.js', options.app + '/**/*.js'], function(event) {
        if(isOnlyChange(event)) {
          gulp.start('scripts');
        } else {
          gulp.start('inject');
        }
      });

      gulp.watch([options.src + '/**/*.html', options.app + '/**/*.html'], function(event) {
        browserSync.reload(event.path);
      });
    };
  };

  gulp.task('watch', ['inject'], watch(options.src));
  gulp.task('watch:dist', ['inject:dist'], watch(options.dist));
};
