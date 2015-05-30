'use strict';

module.exports = function(config) {

  var configuration = {
    autoWatch : false,
    colors: true,

    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    browsers : ['PhantomJS'],

    reporters: ['mocha', 'coverage'],

    preprocessors: {
      'src/**/*.js' : 'coverage',
      'src/**/*.html': ['ng-html2js']
    },
    
    coverageReporter: {
        type: 'lcov',
        dir: 'build/coverage/client'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'angular-notifications.tpls'
    },
  };

  config.set(configuration);
};
