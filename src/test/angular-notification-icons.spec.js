'use strict';

describe('angular-notifications-icon', function() {
  beforeEach(module('angular-notification-icons'));

  describe('NotificationDirectiveController', function() {
    var $controller;
    var $rootScope;
    var $animate;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$animate_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $animate = _$animate_;
    }));

    it('should pass', function(done) {
      $controller('NotificationDirectiveController', {$scope: $rootScope.$new()});
      done();
    });
  });
});