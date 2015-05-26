/* global angular */

(function() {
  'use strict';

  var Notifications = function() {
    var subscribers = {};

    this.subscribe = function(id, cb) {
      if (!subscribers[id]) {
        subscribers[id] = {
          pending: 0,
          callbacks: [cb]
        };
      } else {
        subscribers[id].callbacks.add(cb);
      }
    };

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

    this.setNotifications = function(id, number) {
      subscribers[id].pending = _clip(number);
      _notify(id);
    };

    this.clearNotifications = function(id) {
      subscribers[id].pending = 0;
      _notify(id);
    };

    this.addNotifications = function(id, number) {
      subscribers[id].pending += number;
      _notify(id);
    };

    this.addNotification = function(id) {
      this.addNotifications(id, 1);
    };

    this.removeNotifications = function(id, number) {
      subscribers[id].pending = _clip(subscribers[id].pending - number);
      _notify(id);
    };

    this.removeNotification = function(id) {
      this.removeNotifications(id, 1);
    };
  };

  angular.module('angular-notifications', [])
    .provider('NotificationsService', function() {
      this.$get = function() {
        return new Notifications();
      };
    });
}());