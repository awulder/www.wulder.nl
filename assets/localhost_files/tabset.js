'use strict';

angular.module('myApp')
  .directive('tabset', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      controller: function($scope) {
        $scope.tabUrl = '';
        var tabs = $scope.tabs = [];

        this.addTab = function (tab) {
          tabs.push(tab);
        };

        this.openTab = function (selectedTab) {
          $scope.tabUrl = selectedTab.url;
          angular.forEach(tabs, function (tab) {
            if (selectedTab != tab) {
              tab.selected = false;
            }
          });
        };
      },
      link: function(scope, element, attrs, controller) {
        var t = '';
      },
      template:
        '<div class="row-fluid">' +
          '<div class="row-fluid">' +
            '<div class="nav nav-tabs" ng-transclude></div>' +
          '</div>' +
          '<div class="row-fluid"><ng-include src="tabUrl"></ng-include></div>' +
        '</div>'
    };
  });
