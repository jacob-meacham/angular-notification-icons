'use strict';

var DemoController = function(notificationService) {
  var vm = this;

  vm.notifications = 0;
  notificationService.setNotifications('first', vm.notifications);
};

angular.module('notificationsDemo.controllers')
  .controller('DemoController', ['notificationService', DemoController]);
