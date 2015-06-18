'use strict';

describe('angular-notifications-icon', function() {
  beforeEach(module('angular-notification-icons'));

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
      angularElement = {
        find: function() {
          return element;
        }
      };
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
      var findSpy = spyOn(angularElement, 'find');

      var ctrl = $controller('NotificationDirectiveController', scope);
      ctrl.init(angularElement);
      findSpy.getCall(0).args[0].should.equal('.angular-notifications-icon');
    });

    it('should set a clear trigger if specified', function() {
      var onSpy = spyOn(angularElement, 'on');

      var ctrl = $controller('NotificationDirectiveController', scope, {clearTrigger: 'mouseover'});
      ctrl.init(angularElement);
      onSpy.should.have.been.calledWithMatch('mouseover');
    });

    it('should appear if not visible and count goes above 0', function() {
      var deferred = $q.defer();
      var removeClassSpy = spyOn(element, 'removeClass');
      var addClassStub = sandbox.stub($animate, 'addClass').returns(deferred.promise);

      var ctrl = $controller('NotificationDirectiveController', scope);
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
      ctrl.init(angularElement);
      scope.$scope.self = ctrl;

      ctrl.count = 1;
      scope.$scope.$digest();

      removeClassSpy.firstCall.args.should.eql(['wide-icon']);
    });
  });
});