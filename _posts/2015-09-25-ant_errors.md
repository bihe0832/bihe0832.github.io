---
layout: post
title: ant常见错误解决方案
category: 终端开发
tags: android ant 工具
keywords: ant gradle 
description: 
---
最近修改项目的打包脚本的时候又遇到了一些之前的问题，又去网上查一遍，实在折腾，就自己逐渐整理积累吧。

### 代码混淆无法输出混淆后的jar

#### 错误信息：

	[proguard] Shrinking...

	BUILD FAILED
	~/build.xml:30: The output jar is empty. Did you specify the proper '-keep' options?
	
#### 解决方案：

这种情况一般是因为混淆文件`proguard-project.txt`中尚未加入应用对应的混淆规则导致。我遇到的时候就是因为想先走通整个流程，所以在混淆文件中只配置了一些混淆的配置，没有加入具体项目的混淆规则。这时有两种方法：

1. 增加混淆配置：

	直接在`proguard-project.txt`中增加一行：
	
		-dontshrink


- 增加混淆规则：

	在混淆配置中增加项目相关的混淆规则，只要有一条即可。