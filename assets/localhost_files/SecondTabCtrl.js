'use strict';

angular.module('myApp')
  .controller('SecondTabCtrl', function ($scope) {
    console.log('Loading SecondTabCtrl');
    $scope.title = 'Tab 2';
  });
