/* global angular */

(function() {
  'use strict';

  var Notifications = function() {
    var self = this;
    var subscribers = {};

    var _notify = function(id) {
      if (subscribers[id]) {
        angular.forEach(subscribers[id].callbacks, function(cb) {
          if (cb) {
            cb(subscribers[id].pending);
          }
        });
      }
    };

    var _clip = function(number) {
      if (number <= 0) {
        return 0;
      }

      return number;
    };

    self.subscribe = function(id, cb) {
      if (!subscribers[id]) {
        subscribers[id] = {
          pending: 0,
          callbacks: [cb]
        };
      } else {
        subscribers[id].callbacks.add(cb);
      }
    };

    self.setNotifications = function(id, number) {
      subscribers[id].pending = _clip(number);
      _notify(id);
    };

    self.clearNotifications = function(id) {
      subscribers[id].pending = 0;
      _notify(id);
    };

    self.addNotifications = function(id, number) {
      subscribers[id].pending += number;
      _notify(id);
    };

    self.addNotification = function(id) {
      self.addNotifications(id, 1);
    };

    self.removeNotifications = function(id, number) {
      subscribers[id].pending = _clip(subscribers[id].pending - number);
      _notify(id);
    };

    self.removeNotification = function(id) {
      self.removeNotifications(id, 1);
    };
  };

  angular.module('angular-notifications', [])
    .provider('NotificationsService', function() {
      this.$get = function() {
        return new Notifications();
      };
    });
}());