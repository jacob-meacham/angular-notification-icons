'use strict';

var app = angular.module('angular-notifications.demo', ['ngRoute', 'angular-notifications', 'hljs', 'angular-notifications.demo.controllers']);

// Pre-define modules
angular.module('angular-notifications.demo.controllers', []);

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

  vm.scriptSrc = '<link rel="stylesheet" href="bower_components/angular-notifications/angular-notifications.min.css">\n\n' +
'<script src="bower_components/angular/angular.js"></script>\n' +
'<script src="bower_components/angular-animate/angular-animate.js"></script>\n' +
'<script src="bower_components/angular-notifications/angular-notifications.min.js"></script>';
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', ['$interval', DemoController]);