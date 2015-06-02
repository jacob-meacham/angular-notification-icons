/* global angular */

(function() {
  'use strict';

  var NotificationDirectiveController = function($animate, notificationService) {
    var self = this;

    self.pending = 0;

    self.init = function(element) {
      self.$element = element.find('.angular-notifications-icon');
      console.log(self.$element);
    };

    var appear = function() {
      $animate.addClass(self.$element, 'visible');
      if (self.appearAnimation) {
        $animate.addClass(self.$element, self.appearAnimation).then(function() {
          self.$element.removeClass(self.appearAnimation);
        });
      }
      // TODO: Play sound, if requested
    };

    var clear = function() {
      $animate.removeClass(self.$element, 'visible');
      if (self.disappearAnimation) {
        $animate.addClass(self.$element, self.disappearAnimation).then(function() {
          self.$element.removeClass(self.disappearAnimation);
        });
      }
    };

    var update = function() {
      self.updateAnimation = 'pop';
      if (self.updateAnimation) {
        $animate.addClass(self.$element, self.updateAnimation).then(function() {
          self.$element.removeClass(self.updateAnimation);
        });
      }
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

    notificationService.subscribe('first', notificationCallback);
    if (self.initialAmount) {
      notificationService.setNotifications(self.initialAmount);
    }
  };

  var notificationDirective = function() {
    return {
      restrict: 'EA',
      scope: {
        appearAnimation: '=?',
        disappearAnimation: '=?',
        updateAnimation: '=?',
        removeTrigger: '=?',
        initialCount: '=?',
        hideCount: '=?'
      },
      controller: 'NotificationDirectiveController',
      controllerAs: 'notification',
      bindToController: true,
      transclude: true,
      templateUrl: 'template/notification-icon.html',
      link: function(scope, element, attrs, ctrl) {
        ctrl.init(element);
      }
    };
  };

  angular.module('angular-notifications')
    .controller('NotificationDirectiveController', ['$animate', 'NotificationsService', NotificationDirectiveController])
    .directive('notificationIcon', notificationDirective);
}());