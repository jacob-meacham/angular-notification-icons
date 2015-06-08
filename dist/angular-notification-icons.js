'use strict';

angular.module('angular-notification-icons', ['angular-notification-icons.tpls', 'ngAnimate']);
angular.module('angular-notification-icons.tpls', []);

angular.module("angular-notification-icons.tpls").run(["$templateCache", function($templateCache) {$templateCache.put("template/notification-icon.html","<div class=\"angular-notifications-container\">\r\n    <div class=\"angular-notifications-icon overlay\" ng-show=\"notification.visible\"><div ng-hide=\"notification.hideCount\">{{notification.count}}</div></div>\r\n    <div class=\"notification-inner\">\r\n        <ng-transclude></ng-transclude>\r\n    </div>\r\n</div>");}]);
/* global angular */

(function() {
  'use strict';

  var NotificationDirectiveController = function($scope, $animate, $q) {
    var self = this;
    self.visible = false;
    self.wideThreshold = self.wideThreshold || 100;

    var animationPromise;
    var animationSet = {
      appear: self.appearAnimation || self.animation || 'grow',
      update: self.updateAnimation || self.animation || 'grow',
      disappear: self.disappearAnimation
    };

    self.init = function(element) {
      self.$element = element.find('.angular-notifications-icon');
      if (self.clearTrigger) {
        element.on(self.clearTrigger, function() {
          self.count = 0;
          $scope.$apply();
        });
      }
    };

    var handleAnimation = function(animationClass) {
      // TODO: Don't interrupt the animation?
      if (animationClass) {
        if (animationPromise) {
          $animate.cancel(animationPromise);
        }

        // Can't chain because the chained promise doesn't have a cancel function.
        animationPromise = $animate.addClass(self.$element, animationClass);
        animationPromise.then(function() {
          self.$element.removeClass(animationClass);
          return $q.when(true);
        });
        
        return animationPromise;
      }

      return $q.when(false);
    };

    var appear = function() {
      self.visible = true;
      handleAnimation(animationSet.appear);
    };

    var clear = function() {
      handleAnimation(animationSet.disappear).then(function(needsDigest) {
        self.visible = false;
        if (needsDigest) {
          $scope.$apply();
        }
      });
    };

    var update = function() {
      handleAnimation(animationSet.update);
    };

    $scope.$watch(function() { return self.count; }, function() {
      if (self.visible === false && self.count > 0) {
        appear();
      } else if (self.visible === true && self.count <= 0) {
        clear();
      } else {
        update();
      }

      // Use more of a pill shape if the count is high enough.
      if (self.count >= self.wideThreshold) {
        self.$element.addClass('wide-icon');
      } else {
        self.$element.removeClass('wide-icon');
      }
    });
  };

  var notificationDirective = function() {
    return {
      restrict: 'EA',
      scope: {
        count: '=',
        hideCount: '@',
        animation: '@',
        appearAnimation: '@',
        disappearAnimation: '@',
        updateAnimation: '@',
        clearTrigger: '@',
        wideThreshold: '@'
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

  angular.module('angular-notification-icons')
    .controller('NotificationDirectiveController', ['$scope', '$animate', '$q', NotificationDirectiveController])
    .directive('notificationIcon', notificationDirective);
}());