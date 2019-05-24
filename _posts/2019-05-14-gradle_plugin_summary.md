---
layout: post
title: Gradle插件开发系列之总纲
category: 终端开发
tags: tags
keywords: Gradle 插件 plugin
description: desc1
---
## 背景

在平时的开发中，大家经常会遇到因为gradle的构建配置错误引起的各种奇奇怪怪的问题，每次梳理依赖关系都需要很长时间。为了更方便的找出项目中的依赖冲突，打算开发一个Android Studio的插件，结果在开发过程中发现AS插件找出项目中多个Module之间的依赖关系非常复杂，最终决定改为先写一个gradle的插件，后续让AS插件调用他来实现。

目前插件已经开发完成，可以点击：[一款检查Gradle依赖配置是否冲突的插件](https://blog.bihe0832.com/gradle-dependencies-check.html)了解详情。同时在开发插件的过程中发现由于每次间隔时间太久，之前的坑又踩了一轮，因此系统总结整理一下。接下来会逐渐写五篇文章来介绍，具体包括：

- `Gradle插件开发系列之总纲`：[点击查看](https://blog.bihe0832.com/gradle_plugin_summary.html)

	也就是你正在看的这篇，算是个开头和总体总结。

- `开发第一个gradle插件`：[点击查看](https://blog.bihe0832.com/gradle_plugin_new.html)

	主要介绍如何从0新建一个简单的gradle插件并可以在本地运行的过程

- `gradle插件调试方法`：[点击查看](https://blog.bihe0832.com/gradle_plugin_debug.html)

	主要介绍gradle插件开发过程中，如何动态调试你的gradle插件

- `发布gradle插件到gradle插件库`：待写

	gradle插件开发主要就是为了方便更多的人，这篇文章介绍怎么把一个gradle插件发布到gradle插件库和jcenter，并使用发布后的插件

- `发布开源代码到jcenter`：[点击查看](https://blog.bihe0832.com/jcenter.html)

	这篇主要介绍如何发布开源代码到jcenter，包括注册账号，上传并发布项目，发布后使用以及常见问题汇总。

