---
layout: post
title: 开发环境通用设置
category: 开发必备
tags: 工具
keywords: 保护色
description: desc
---

最近IDE有点问题，每次调整完设置的时候都要搜一次，烦了，直接自己记下来。

## 开发IDE设置保护色


- RGB：
	
	red:204;green:232;blue:207

- 十六进制：
	
	CCE8CF
	
## Mac 设置环境变量

- 打开配置文件：
		
		vi ~/.bash_profile
		
- 加入配置并保存：
	
		ANDROID_NDK_CMD=/Users/hardyshi/Documents/Library/android-ndk-r9c/ndk-build
		export ANDROID_NDK_CMD

		ANDROID_TOOLS=/Users/hardyshi/Documents/Library/SDK/platform-tools
		export ANDROID_TOOLS

		export PATH=${PATH}:$ANDROID_TOOLS:$ANDROID_NDK_CMD

- 立即生效：

		source ~/.bash_profile

- 个人配置：[https://github.com/bihe0832/Settings-Tools/tree/master/shell](https://github.com/bihe0832/Settings-Tools/tree/master/shell)

## Mac 安装brew

		ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

个人也写了一个Homebrew相关的介绍，可以[点击查看：OS X 不可或缺的套件管理器 —— Homebrew](http://blog.bihe0832.com/Homebrew.html)
