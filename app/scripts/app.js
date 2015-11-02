'use strict';

var app = angular.module('angular-notification-icons.demo', ['ngRoute', 'hljs', 'angular-notification-icons', 'ngAnimate', 'angular-notification-icons.demo.controllers']);

// Pre-define modules
angular.module('angular-notification-icons.demo.controllers', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      controller: 'DemoController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);

var DemoController = function($interval) {
  var vm = this;

  var autoCounter = function(index, start, steps, delay) {
    var numIterations = 0;
    vm.autoPending[index] = start;
    $interval(function() {
      if (++numIterations > steps) {
        vm.autoPending[index] = start;
        numIterations = 0;
      } else {
        vm.autoPending[index] = vm.autoPending[index] + 1;
      }
    }, delay);
  };

  vm.autoPending = [0, 0];
  autoCounter(0, 1, 4, 1000);
  autoCounter(1, 98, 4, 1000);

  vm.scriptSrc = '<link rel="stylesheet" href="bower_components/angular-notification-icons/angular-notification-icons.min.css">\n\n' +
'<script src="bower_components/angular/angular.js"></script>\n' +
'<script src="bower_components/angular-animate/angular-animate.js"></script>\n' +
'<script src="bower_components/angular-notification-icons/angular-notification-icons.min.js"></script>';
};

var GifController = function($interval) {
  var vm = this;

  vm.autoPending = [0, 0, 0, 0];

  $interval(function() {
    vm.autoPending[0] = 1;
  }, 5000, 1);
  $interval(function() {
    vm.autoPending[1] = 1;
  }, 5800, 1);
  $interval(function() {
    vm.autoPending[2] = 1;
  }, 6600, 1);
  $interval(function() {
    vm.autoPending[3] = 1;
  }, 7400, 1);

  $interval(function() {
    vm.autoPending[0] = 2;
    vm.autoPending[1] = 2;
    vm.autoPending[2] = 2;
    vm.autoPending[3] = 2;
  }, 8400, 1);
};


angular.module('angular-notification-icons.demo.controllers')
  .controller('DemoController', ['$interval', DemoController])
  .controller('GifController', ['$interval', GifController]);