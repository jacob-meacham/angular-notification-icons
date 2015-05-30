'use strict';

angular.module('angular-notifications', ['angular-notifications.tpls']);
angular.module('angular-notifications.tpls', []);

angular.module("angular-notifications.tpls").run(["$templateCache", function($templateCache) {$templateCache.put("template/notification-icon.html","<div class=\"angular-notifications-container\">\r\n    <div class=\"angular-notifications-overlay angular-notifications-default-dot\"></div>\r\n    <div class=\"notification-inner\">\r\n        <ng-transclude></ng-transclude>\r\n    </div>\r\n</div>");}]);
'use strict';

describe('NotificationService', function() {
  beforeEach(module('angular-notificatios'));

  it('should pass', function(done) {
    true.should.eql(false);
    done();
  });
});
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

  angular.module('angular-notifications')
    .provider('NotificationsService', function() {
      this.$get = function() {
        return new Notifications();
      };
    });
}());
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
      transclude: true,
      templateUrl: 'template/notification-icon.html'
      // link: function() {
      //   // TODO: Add optional DOM event for clearing notifications
      // }
    };
  };

  angular.module('angular-notifications')
    .controller('NotificationDirectiveController', ['NotificationsService', NotificationDirectiveController])
    .directive('notificationIcon', notificationDirective);
}());