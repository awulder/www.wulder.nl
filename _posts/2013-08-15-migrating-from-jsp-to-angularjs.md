---
layout: post
title: "Lessons learned: Migrating from JSP to AngularJS"
image: "angularjs.jpg"
published: false
tags:
- AngularJS
- JavaScript
---

I'm just halfway of migrating a project I'm working on for about two years now to <a href="http://www.angularjs.org" target="_blank">AngularJS</a> and I want to share a few lessons I learned so far. First of all I'm really impressed by AngularJS. The <a href="https://github.com/angular/angular.js" target="_blank">internal code</a> is easy to read and there are a lot of helpful resources like <a href="http://egghead.io">egghead.io</a>, other blogs and the community.

### Background
I wanted to learn AngularJS and I was looking for a pet project. I could have written a to-do app but the projects I'm working on are much more complex than that. I decided to use the current project I'm working on. This project has a lot of forms with all kind of field validation, data that is retrieved by AJAX and put in tables with sort en filter functionalities and other DOM manipulation done by jQuery and jQuery plugins. The stack of the current project is a Java and Spring backend, JSP with Tiles for the view rendering and jQuery and a couple of jQuery plugins for DOM manipulation. Maybe it's not the ideal project for AngularJS but I think it will give me a good insight of the framework.

### The Angular way of thinking
The first couple of pages I tried to refactor the JSP pages and started to add AngularJS directives. In the beginning all went well but then I had the feeling that I spent more time on making hacks to make the pages work instead of writing clean code and taking advantage of what AngularJS had to offer.

I started over and this time I looked at the data the page needed. I created an AngularJS model and from there I started to create the view and al of its functionalities. The code I wrote was clean, easy to test and I didn't had the feeling I was hacking.

### Code organisation
At the moment of writing this post I've reorganized the code once already and I think I will reorganize my code again. First I started putting all the controllers in a controllers.js, directives in directives.js and the same for the services and filters. The project I'm migrating is actually large and has many views. ..... The first approach looked like this:

* components/
* img/
* scripts/
  * app.js
  * controllers.js
  * directives.js
  * filters.js
  * services.js
* styles/
* views/

My second approach was to put each controller, directive, filter and service in a seperate file. This way the code is much more readable and better to test. Then again, with many controllers you have a lot of files and you can't see directly what files are used by a specific component. The current approach looks like this:

* components/
* img/
* scripts/
  * controllers/
    * FirstCrtl.js
    * SecondCtrl.js
  * directives/
    * directive.js
  * filters/
  * services/
    * FirstService.js
    * SecondService.js
* styles/
* views/

Although this approach is must better than the first it's still has its downsides. After reading the article of <a href="http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript" target="_blank">Cliff Meyers</a> about code organization in large AngularJS and JavaScript applications I decided that this is the way to go for this project and I will start reorganizing my code this way soon.

### Build tool
I use Maven as build tool for the Java projects I work on. I could have used Maven but then I had to put all the client side code in my Java project. If I wanted to start a server it would mean that I also had to bootstrap Spring. Instead of using Maven for all the client side stuff like minification
I'm used to use Maven or any other build tool for managing my dependencies. With <a href="http://yeoman.io" target="_blank">Yeoman</a> you can do the same and even more. YeomanYeoman contains three tools.

* Yeoman
  Yeoman is a workflow tool and contains three other toosl:
  * *Yo* for scaffolding
  * *Grunt* the build tool
  * *Bower* is used for dependency management
* AngularJS
* Java / Spring

Yeoman is a great tool especially if you used to Maven or another kind of build tool. I just had to learn how to work with Yeoman and I was ready to go.

### Lessons learned (so far)

1. Think about the functionality you have to rebuild instead of trying to get a piece of legacy in AngularJS. I've noticed that AngularJS does things the AngularJS way and some of the functionalities are pretty simple to create in Angular.
2. Before you start writing code think about how you will organize your code. I think it's a matter of how large the application will be because it will save you time if you do it right the first time.
3. I have no regrets using Yeoman (a second build tool) instead of using Maven. The backend en the front end code are completely seperated and for both I think I'm using the best tool for the job.
