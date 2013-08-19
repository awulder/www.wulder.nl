'use strict';

angular.module('myApp')
  .controller('FirstTabCtrl', function ($scope) {
    console.log('Loading FirstTabCtrl');
    $scope.title = 'Tab 1';
  });
