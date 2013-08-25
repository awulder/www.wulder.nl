---
layout: post
title: "AngularJS Bootstrap tab directive and lazy loading"
image: "angularjs.jpg"
published: true
tags:
- AngularJS
- Bootstrap
- directive
---

I was looking for an <a href="http://www.angularjs.org" target="_blank" title="AngularJS">AngularJS</a> tab directive based on Twitter Bootstrap's markup and CSS that supports lazy loading. So the data of a tab should only be loaded when the tab is active. There are some frameworks like <a href="http://angular-ui.github.io/bootstrap/" target="_blank" title="Angular UI">Angular UI</a> and <a href="http://mgcrea.github.io/angular-strap/" target="_blank" title="AngularStrap">AngularStrap</a> that do have tab directives but none of them supports lazy loading. That's why I created a tab directive that supports lazy loading.

### Tabset directive

{% highlight javascript %}
'use strict';

angular.module('bootstrap.tabset', [])
.directive('tabset', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: function($scope) {
      $scope.templateUrl = '';
      var tabs = $scope.tabs = [];
      var controller = this;

      this.selectTab = function (tab) {
        angular.forEach(tabs, function (tab) {
          tab.selected = false;
        });
        tab.selected = true;
      };

      this.setTabTemplate = function (templateUrl) {
        $scope.templateUrl = templateUrl;
      }

      this.addTab = function (tab) {
        if (tabs.length == 0) {
          controller.selectTab(tab);
        }
        tabs.push(tab);
      };
    },
    template:
      '<div class="row-fluid">' +
        '<div class="row-fluid">' +
          '<div class="nav nav-tabs" ng-transclude></div>' +
        '</div>' +
        '<div class="row-fluid">' +
          '<ng-include src="templateUrl">' +
        '</ng-include></div>' +
      '</div>'
  };
})
.directive('tab', function () {
  return {
    restrict: 'E',
    replace: true,
    require: '^tabset',
    scope: {
      title: '@',
      templateUrl: '@'
    },
    link: function(scope, element, attrs, tabsetController) {
      tabsetController.addTab(scope);

      scope.select = function () {
        tabsetController.selectTab(scope);
      }

      scope.$watch('selected', function () {
        if (scope.selected) {
          tabsetController.setTabTemplate(scope.templateUrl);
        }
      });
    },
    template:
      '<li ng-class="{active: selected}">' +
        '<a href="" ng-click="select()">{{ "{{ title " }}}}</a>' +
      '</li>'
  };
});
{% endhighlight %}

### How to use it
* Copy the code in a file within your project. Let say you have it stored in <em class="em3">scripts/directives/tabset.js</em>
* Add a script tag on your page to define the script.
{% highlight html %}
<script src="scripts/directives/tabset.js"></script>
{% endhighlight %}
* Inject the namespace when you load:
{% highlight javascript %}
'use strict'

angular.module('myApp', ['bootstrap.tabset']);
{% endhighlight %}
* The final step is to use the directive. The following code snippet is an example of how to create the HTML.
{% highlight html %}
<tabset>
  <tab title="Tab 1" template-url="/views/tab1.html"></tab>
  <tab title="Tab 2" template-url="/views/tab2.html"></tab>
  <tab title="Tab 3" template-url="/views/tab3.html"></tab>
</tabset>
{% endhighlight %}

### Update
I have added <a href="https://github.com/awulder/demo-code.wulder.nl/tree/master/angularjs-bootstrap-tabs-demo-code" target="_blank">demo code</a> at Github.
