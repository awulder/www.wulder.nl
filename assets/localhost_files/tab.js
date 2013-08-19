'use strict';

angular.module('myApp')
  .directive('tab', [function () {
    return {
      restrict: 'E',
      replace: true,
      require: '^tabset',
      scope: {
        title: '@',
        url: '@'
      },
      link: function(scope, element, attrs, tabsetController) {
        scope.selected = false;
        tabsetController.addTab(scope);

        scope.select = function () {
          scope.selected = !scope.selected;
          tabsetController.openTab(scope);
        }
      },
      template: '<li ng-class="{active: selected}"><a href="" ng-click="select()">{{title}}</a></li>'
    };
  }]
);
