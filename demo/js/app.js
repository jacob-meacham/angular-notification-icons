'use strict';

var app = angular.module('notificationsDemo', ['ngRoute', 'angular-notifications', 'notificationsDemo.controllers']);

// Pre-define modules
angular.module('notificationsDemo.controllers', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/demo.html',
      controller: 'DemoController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);
