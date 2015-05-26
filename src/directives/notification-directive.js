/* global angular */

(function() {
  'use strict';

  var NotificationDirectiveController = function(notificationService) {
    var self = this;

    self.visible = false;
    self.pending = 0;

    var appear = function() {
      self.visible = true;
      // TODO: Play intro animation, if requested
      // TODO: Play sound, if requested
    };

    var clear = function() {
      self.visible = false;
      // TODO: Play outro animation, if requested
    };

    var update = function() {
      // TODO: Play update animation, if requested
      // TODO: Play sound, if requested
    };

    // TODO: Bind to notification service pending amount?
    var notificationCallback = function(notificationsPending) {
      self.pending = notificationsPending;
      if (self.visible === false && notificationsPending !== 0) {
        appear();
      } else if (self.visible === true && notificationsPending === 0) {
        clear();
      }
      update();
    };

    notificationService.subscribe(self.id, notificationCallback);
    if (self.initialAmount) {
      notificationService.setNotifications(self.initialAmount);
    }
  };

  var notificationDirective = function() {
    return {
      restrict: 'EA',
      controller: 'NotificationDirectiveController',
      controllerAs: 'notification',
      bindToController: true,
      link: function() {
        // TODO: Add optional DOM event for clearing notifications
      }
    };
  };

  angular.module('angular-notifications')
    .controller('NotificationDirectiveController', ['Notifications', NotificationDirectiveController])
    .directive('notificationIcon', notificationDirective);
}());