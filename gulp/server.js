'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.app || (util.isArray(baseDir) && baseDir.indexOf(options.app) !== -1)) {
      routes = {
        '/bower_components': 'bower_components',
        '/app': 'app',
        '/src': options.src,
        '/dist': options.dist,
        '/templates': options.src + '/templates'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  gulp.task('serve', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.app]);
  });

  gulp.task('serve:dist', ['build'], function () {
    gulp.start('watch:dist');
    browserSyncInit([options.tmp + '/serve', options.app]);
  });

  gulp.task('serve:dist:min', ['build'], function () {
    gulp.start('watch:dist:min');
    browserSyncInit([options.tmp + '/serve', options.app]);
  });
};
