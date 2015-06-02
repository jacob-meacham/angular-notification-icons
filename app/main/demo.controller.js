'use strict';

var DemoController = function() {
  var vm = this;

  vm.pending = 0;

  vm.addNotification = function() {
    vm.pending += 1;
  };
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', [DemoController]);
