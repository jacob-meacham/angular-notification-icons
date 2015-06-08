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
