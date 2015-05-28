'use strict';

var DemoController = function(Notifications) {
  var vm = this;

  vm.notifications = 0;
  Notifications.setNotifications('first', vm.notifications);
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', ['Notifications', DemoController]);
