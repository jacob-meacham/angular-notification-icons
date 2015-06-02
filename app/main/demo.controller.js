'use strict';

var DemoController = function() {
  var vm = this;

  vm.pending = [0];
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', [DemoController]);
