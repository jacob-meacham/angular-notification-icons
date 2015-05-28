'use strict';

var DemoController = function(NotificationsService) {
  var vm = this;

  vm.notifications = 0;
  NotificationsService.subscribe('first');
  NotificationsService.setNotifications('first', vm.notifications);
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', ['NotificationsService', DemoController]);
