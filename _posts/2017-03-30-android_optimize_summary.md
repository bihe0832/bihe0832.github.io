---
layout: post
title: Android安装包精简系列（总纲）
category: 终端开发
tags: Android apk
keywords: Android 安装包 精简
description: 
recommand: true
---
### 写在前面


根据日常的使用经验和相关的数据介绍，我们发现目前安卓应用的apk包已经越来越大，目前Android安装包的瘦身或者精简相关的成熟项目也已经很多。最近工作正好与这部分相关，参与过程中发现很多其实都是可以总结成为方法论或者工具的东西，因此一边优化，一边陆续把一些方案整理总结一下，出一个关于应用安装包优化的系列。

这里都是自己结合网上大神们的指导，然后结合自己代码验证总结验证的。所有结论性的内容，会用红色特别标注出来的。

### 相关项目：

- Android-APK-Optimize：

	- 简介:
	
		安装包精简项目的事例demo代码
		
	- github:
		
		[https://github.com/bihe0832/Android-APK-Optimize](https://github.com/bihe0832/Android-APK-Optimize)

- getImageInfo：
	
	- 简介:

		安装包精简项目中关于图片精简相关工具的源码，包括获取图片信息（大小、透明度以及编码方案）、图片压缩等
	
	- github:
	
		[https://github.com/bihe0832/getImageInfo](https://github.com/bihe0832/getImageInfo)

### 文章列表：

目前还没有非常详细的文章列表，大体少就是从资源精简和代码精简两个方向入手。大纲里面的文章在规划好以后陆续补充吧

#### 总纲
 	
- `Android安装包精简系列（总纲）`：[点击查看](https://blog.bihe0832.com/android_optimize_summary.html)

	也就是你正在看的这篇，算是个开头和总体总结，主要是相关文章的列表和概述。
	
- `Android安装包精简系列之为什么要优化精简安装包`：[点击查看](https://blog.bihe0832.com/android-optimize-why.html)

	主要总结一下为什么要优化精简安装包，包括为什么安卓包越来越大和精简优化安装包有哪些好处和弊端。

#### 资源精简

这里主要分析关于安装包优化中，与资源相关的一些优化手段。

- `Android安装包精简系列之图标转字体`：[点击查看](https://blog.bihe0832.com/android-optimize-icontofont.html)
	
	这是个人总结的应用安装精简系列的关于图片精简的第一篇，主要介绍怎么使用图标字体库来代替图标达到精简图片的效果。

- `Android安装包精简系列之图片优化`：[点击查看](https://blog.bihe0832.com/android-optimize-img.html)

	这是个人总结的应用安装精简系列的关于图片精简的第二篇，主要介绍在不降低用户体验的前提下，尽可能的精简图片的相关方案。`优化总体原则就是：在不降低图片效果、保证用户体验的前提下尽最大可能缩小图片文件的大小`。	

- `Android安装包精简系列之资源精简`：[点击查看](https://blog.bihe0832.com/android-optimize-resources.html)
	
	主要介绍整体资源的优化，包括怎么梳理apk里面的未被使用资源并精简优化以及怎么通过资源混淆等达到存量资源的精简。
	
#### 代码精简

- `Android安装包精简系列之Native代码精简`：

- `Android安装包精简系列之so代码精简`：

- `Android安装包精简系列之第三方库精简`：

- `Android安装包精简系列之功能、组件插件化`：

