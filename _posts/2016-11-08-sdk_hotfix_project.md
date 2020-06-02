---
layout: post
title: SDK热更系列之概述(持续整理编辑中~)
category: 终端开发
tags: SDK
keywords: Android SDK 热更
description: desc
---

## 项目介绍

继插件化后，热补丁技术在2015年开始爆发，目前已经是非常热门的Android开发技术。目前的热更新方案中比较著名的有淘宝的Dexposed、支付宝的AndFix以及Qzone的multidex和微信的tinker等。然而这些热更新方案基本上都有以下两个特点：

1. 都是APP级别的的热更新解决方案，对于SDK的开发者来说很多地方需要一些调整
2. 理解、开发成本都比较高；而且很多更多的是方案的推广。

到现在为止自己做SDK已经三年了，为了解决SDK的热更新，也为了方便大家了解Android热更新，因此在github上开发了项目SDKHotfix来介绍。

**目前个人会陆续通过一系列文档来介绍这个项目的实现原理及运行方法。由于工作的原因，不能及时更新完成，可能会持续比较长的时间，请持续关注，如果有任何问题，可以及时通过github上的issues联系协助。~**

## 一些说明

1. **该项目主要是提供给SDK的开发者使用，提供了SDK开发者如何实现SDK自身热更新（包括Java代码和Native），如果是APP的开发者了解应用的热更新，建议参考dodola的HotFix项目，里面介绍的更全面。**

2. **由于本项目重点介绍重点SDK的热更新相关的内容，因此项目中的代码虽然是实现简单的功能，但是使用了SDK和demo等多个项目以及java和Native多层调用。**本项目中不会再介绍SDK相关的内容，建议可以先通过下面的链接了解这个项目的结构，然后再看热更新项目的内容，[点击了解Android-gradle-jni-so](https://github.com/bihe0832/Android-gradle-jni-so)。

## 文章列表

### SDKHotfix的Demo相关介绍

主要介绍SDKHotfix的Demo如何使用，以及Demo相关的源码，运行方式等

1. `SDK热更之SDK项目Android-gradle-jni-so介绍`：[点击查看](https://github.com/bihe0832/Android-gradle-jni-so)

	因为我们的SDK热更项目的前提是这个项目是一个完成的SDK，而一个SDK又涉及到SDK库文件、和SDK的demo工程。Android-gradle-jni-so是一个使用Android Studio创建的，通过gradle编译的，存在多个模块的工程的gradle构建的事例。完整的模拟了第三方SDK，自己SDK以及Demo之前的调用关系以及相关的gradle编译脚本。
	
2. `SDK热更之Demo体验方法`：[点击查看](http://blog.bihe0832.com/sdk_hotfix_demo.html)

	为了方便大家SDK的热更项目，先介绍Demo相关的内容，先让大家熟悉Demo的使用，然后再基于此来了解SDKHotfix的原理，这篇文章就重点介绍Demo的体验方法，包括项目运行、补丁生成、热更效果验证等。
	
3. `SDK热更之Demo工程介绍`：[点击查看](http://blog.bihe0832.com/sdk_hotfix_demo_project.html)

	为了方便大家SDK的热更项目，先介绍Demo相关的内容，先让大家熟悉Demo的使用，然后再基于此来了解SDKHotfix的原理。这篇文章就重点介绍Demo工程相关的内容，以及大家再体验demo的过程中需要关注到的一些点
	
### SDKHotfix的原理相关介绍

这部分内容主要介绍SDKHotfix相关的理论原理，由于与App热更新的原理一致，在后续陆续补充。目前可以参照下面文章中的介绍：

1. [微信Android热补丁实践演进之路](http://mp.weixin.qq.com/s?__biz=MzAwNDY1ODY2OQ==&mid=2649286306&idx=1&sn=d6b2865e033a99de60b2d4314c6e0a25&mpshare=1&scene=1&srcid=10266hBPguvWvTgHybtNDiCy#rd)
2. [安卓App热补丁动态修复技术介绍](http://zhuanlan.zhihu.com/magilu/20308548)

### SDKHotfix源码介绍

这部分内容主要介绍SDKHotfix相关实现，包括怎么编译，怎么出版本，怎么出补丁等，在后续陆续补充。

1. `SDK热更之gradle插件（如何在SDK代码中自动插桩及如何生成补丁包）`：[点击查看](http://blog.bihe0832.com/sdk_hotfix_patch.html)

	主要介绍SDK热更中用到的gradle插件，包括怎么插桩、怎么生成补丁的原理；文章主要是介绍原理，没有对具体实现的代码做详细解读。

### SDKHotfix项目中的遗留问题

这部分内容主要介绍目前SDKHotfix项目没有介绍到的或者没有实现的一些功能点以及待优化项

1. `SDK热更之SDKHotfix待优化点`：[点击查看](http://blog.bihe0832.com/sdk_hotfix_need_to_do.html)

	主要从安全性、后续的代码维护两个方面介绍了SDKHotfix中没有增加的相关内容。

2. `SDK热更之如何获取应用在当前设备上的so对应的指令集`：[点击查看](http://blog.bihe0832.com/sdk_hotfix_so_abi.html)

	目前的demo中只使用了arm的so，但是对于SDK的热更新，肯定要提供完整的so，当需要提供完整的so的时候，怎么下发正确的so主要在这边文章介绍
	
## 相关源码

- **SDK项目对应github地址**：[https://github.com/bihe0832/Android-gradle-jni-so](https://github.com/bihe0832/Android-gradle-jni-so)

- **SDKHotFix项目对应github地址**：[https://github.com/bihe0832/Android-HoxFix-SDK-Native-Java](https://github.com/bihe0832/Android-HoxFix-SDK-Native-Java)



