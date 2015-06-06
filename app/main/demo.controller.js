'use strict';

var DemoController = function($interval) {
  var vm = this;

  var autoCounter = function(counterIdx, start, steps, delay) {
    var numIterations = 0;
    vm.pending[counterIdx] = start;
    $interval(function() {
      if (++numIterations > steps) {
        vm.pending[counterIdx] = start;
        numIterations = 0;
      } else {
        vm.pending[counterIdx] = vm.pending[counterIdx] + 1;
      }
    }, delay);
  };
  

  vm.pending = [0, 0];
  autoCounter(1, 1, 9, 700);
};

angular.module('angular-notifications.demo.controllers')
  .controller('DemoController', ['$interval', DemoController]);
