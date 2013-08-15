---
layout: post
title: Play! 2.0 and Jenkins
tags : [Build tools, Development, ]
---

Lately I am doing a lot of coding with <a href="http://www.playframework.org/" target="_blank">Play! 2.0</a> in my spare time and I must say it is a really nice framework that makes web application development easier. I am also trying to figure out if I can do all the stuff with a Play! 2.0 project like I can do with a Java EE project. An important aspect for me is adding the project in <a href="http://jenkins-ci.org/" title="Jenkins CI" target="_blank">Jenkins</a>. Since there is not a Jenkins plugin (yet) that supports Play! 2.0 does not mean that it is not possible!

Instead of waiting for a Play! 2.0 plugin for Jenkins you can also use <a href="https://github.com/harrah/xsbt/wiki" target="_blank">SBT</a>. The Play! 2.0 build tool is just a thin wrapper around SBT so it should be possible to use the SBT Jenkins plugin and you can!

To get started install the SBT Jenkins plugin. You can install (or remove and update) plugins with the plugin manager in Jenkins. Install the SBT Jenkins plugin at http://&lt;jenkins_url&gt;/pluginManager.

![alt "SBT Jenkins plugin"](http://blog.xebia.com/wp-content/uploads/2012/07/sbt-jenkins-plugin.png)

Jenkins will restart after the plugin is successfully installed. The next step is to configure SBT in Jenkins. Configure the SBT Jenkins plugin at http://&lt;jenkins_url&gt;/configure and add the path to SBT launch jar. I have used Homebrew on my Mac for installing SBT so the path is /usr/local/Cellar/sbt/0.11.3-2/libexec/sbt-launch.jar.

![alt "SBT Jenkins plugin configuration"](http://blog.xebia.com/wp-content/uploads/2012/07/sbt-config.png)

Now you are ready to create a job in Jenkins. The version of Jenkins I am using is 1.474 so I had to create a new “*Build a free-style software project*”. Once it is created you can add a SCM repository to get the code. The last thing is to add a SBT build step.

![alt "Jenkins build configuration"](http://blog.xebia.com/wp-content/uploads/2012/07/job-build-step.png)

The <code>-Dsbt.log.noformat=true</code> flag turns off the colour formatting, making test output legible in log files. In the action field you can add SBT commands like: clean, compile, test, dist or a combination of commands. Now Jenkins is ready to build your Play! 2.0 project.

I have not tried to add a Play! 2.0 project in other CI servers like Teamcity or Bamboo, but if there is not a plugin that supports Play! 2.0 try to do it with an available SBT plugin.

>**Note**
>The first time I started the job in Jenkins the build failed because of unresolved dependencies. I had to delete the ~/.ivy2 directory to make it work. The first time after you have deleted the ~/.ivy2 directory it will take a while before the build has finished because all the dependencies needs to be downloaded.
