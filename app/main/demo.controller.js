'use strict';

var DemoController = function(NotificationsService) {
  var vm = this;

  vm.pending = 10;
  NotificationsService.subscribe('first');
  NotificationsService.setNotifications('first', 10);

  vm.addNotification = function() {
    NotificationsService.addNotification('first');
  };
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', ['NotificationsService', DemoController]);
