'use strict';

describe('angular-notifications-icon', function() {
  beforeEach(module('angular-notification-icons', 'angular-notifications.tpls'));

  describe('NotificationDirectiveController', function() {
    var $controller;
    var scope;
    var $animate;
    var $q;

    var sandbox;
    var element;
    var angularElement;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();

      element = { name: 'foo' };
      angularElement = { };
    });

    afterEach(function() {
      sandbox.restore();
    });

    beforeEach(inject(function(_$controller_, $rootScope, _$animate_, _$q_) {
      $controller = _$controller_;
      scope = {$scope: $rootScope.$new()};
      $animate = _$animate_;
      $q = _$q_;
    }));

    var spyOn = function(object, functionName) {
      if (!object[functionName]) {
        var spy = sandbox.spy();
        object[functionName] = spy;
        return spy;
      }

      return sandbox.spy(object, functionName);
    };

    it('should start with reasonable defaults', function() {
      var ctrl = $controller('NotificationDirectiveController', scope);
      ctrl.visible.should.be.false;
      ctrl.wideThreshold.should.eql(100);
    });

    it('should initialize with an element', function() {
      var jqElement = [angularElement];
      angularElement.querySelector = function() { };
      var selectorSpy = spyOn(angularElement, 'querySelector');

      var ctrl = $controller('NotificationDirectiveController', scope);
      ctrl.init(jqElement);
      selectorSpy.firstCall.args.should.eql(['.angular-notifications-icon']);
    });

    it('should set a clear trigger if specified', function() {
      var clearTriggerFn;
      angularElement.on = {};
      sandbox.stub(angularElement, 'on', function(trigger, callback) {
        trigger.should.eql('mouseover');
        clearTriggerFn = callback;
      });

      var deferred = $q.defer();
      spyOn(element, 'removeClass');
      sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {clearTrigger: 'mouseover'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);

      ctrl.count = 10;
      clearTriggerFn();
      ctrl.count.should.eql(0);
    });

    it('should appear if not visible and count goes above 0', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope);
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      // Element should now be visible
      ctrl.visible.should.eql(true);
      addClassStub.should.have.been.calledWith(element, 'grow'); // Default animation was played

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['grow']);
    });

    it('should play appear animation if set', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {appearAnimation: 'some-animation'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      // Element should now be visible
      ctrl.visible.should.eql(true);
      addClassStub.should.have.been.calledWith(element, 'some-animation');

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['some-animation']);
    });

    it('should update if visible and the count changes', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope);
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      ctrl.visible = true;
      scope.$scope.$digest();

      addClassStub.should.have.been.calledWith(element, 'grow'); // Default animation was played

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['grow']);
    });

    it('should play update animation if set', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {updateAnimation: 'some-animation'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      ctrl.visible = true;
      scope.$scope.$digest();

      addClassStub.should.have.been.calledWith(element, 'some-animation');

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['some-animation']);
    });

    it('should set the appear animation based on the \'animation\' property', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {animation: 'some-animation'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      // Element should now be visible
      ctrl.visible.should.eql(true);
      addClassStub.should.have.been.calledWith(element, 'some-animation');

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['some-animation']);
    });

    it('should set the update animation based on the \'animation\' property', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {animation: 'some-animation'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      ctrl.visible = true;
      scope.$scope.$digest();

      addClassStub.should.have.been.calledWith(element, 'some-animation');

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['some-animation']);
    });

    it('should disappear if visible and the count goes to or below 0', function() {
      var ctrl = $controller('NotificationDirectiveController', scope, {});
      spyOn(element, 'removeClass');
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 0;
      ctrl.visible = true;
      scope.$scope.$digest();

      ctrl.visible.should.eql(false);
    });

    it('should play disappear animation if set', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {disappearAnimation: 'some-animation'});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 0;
      ctrl.visible = true;
      scope.$scope.$digest();

      addClassStub.should.have.been.calledWith(element, 'some-animation');

      // Class was removed after animation finished
      deferred.resolve();
      scope.$scope.$apply();
      removeClassSpy.secondCall.args.should.eql(['some-animation']);
    });

    it('should interrupt an animation that is already playing', function() {
      var deferred = $q.defer();
      spyOn(element, 'removeClass');
      sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var cancelStub = sandbox.stub($animate, 'cancel');

      var ctrl = $controller('NotificationDirectiveController', scope);
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      ctrl.count = 2;
      scope.$scope.$digest();

      cancelStub.should.have.callCount(1);
    });

    it('should add .wide-icon if the count is higher than the wide threshold', function() {
      var deferred = $q.defer();
      var addClassSpy = spyOn(element, 'addClass');
      sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {wideThreshold: 10});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 11;
      scope.$scope.$digest();

      addClassSpy.should.have.been.calledWith('wide-icon');
    });

    it('should remove .wide-icon if the count is lower than the wide threshold', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope, {wideThreshold: 10});
      sandbox.stub(ctrl, 'getElement').returns(element);
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      removeClassSpy.firstCall.args.should.eql(['wide-icon']);
    });
  });

  describe('notificationIcon directive', function() {
    var $compile;
    var $scope;

    beforeEach(inject(function(_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
    }));

    it('should compile with a count', function() {
      var element = $compile('<notification-icon count="10"><div id="inner-test-div"></div></notification-icon>')($scope);
      $scope.$digest();

      var ctrl = element.isolateScope().notification;
      ctrl.count.should.eql(10);

      element.find('.inner-test-dev').should.exist;
    });
  });
});