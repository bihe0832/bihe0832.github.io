---
layout: post
title: iMac（OS X）El Capitan 更新遇到的那些坑
category: 开发必备
tags: iMac android
keywords: OS X El Capitan 请等待 com.apple.appstore xcrun missing  Library Developer CommandLineTools jdk  xcode select install
description: OS X El Capitan 作为最新苹果最新推出的OS X，让你能以更简单、更智能的方式，在 Mac 上处理日常事务。例如，借助 Split View 同时在多个 apps 中进行操作等。最近更新的时候遇到了一些坑，简单列举一下。
---
## OS X El Capitan:

OS X El Capitan 作为最新苹果最新推出的OS X，让你能以更简单、更智能的方式，在 Mac 上处理日常事务。例如，借助 Split View 同时在多个 apps 中进行操作等。最近更新的时候遇到了一些坑，简单列举一下。

OS X El Capitan官方介绍地址：[https://www.apple.com/cn/osx/whats-new/](https://www.apple.com/cn/osx/whats-new/)

## 下载与安装

### 下载过程网络异常以后出现请等待，无法继续下载，也无法取消……

由于El Capitan有6G多，比较大再加上服务器不稳定，所以下载起来比较麻烦，很容易因为网络问题下载失败。

- 正常失败时，App store会提示您到已购项目重新下载。
- **但是有时候会发现进入已购项目，但是提示请等待，无法下载。也无法取消**。这个时候可以按照下面的步骤删除本地 缓存重新下载：

	1. 强制退出 Mac的 App Store
	
	- 进入下载缓存目录，直接在终端输入：
	
			sudo open $TMPDIR/../C/
	
	- 直接删除 com.apple.appstore 目录

	- 启动 Mac的 App Store，重新下载。如果还是显示请等待。重复以上三步以后重启系统，在打开mac App store。一般即可重新下载。

## 软件运行异常

### xcrun异常导致git、brew不可用。

#### 错误现象：

在执行brew或者git相关的命令时，出现如下报错：

	xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
	xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
	
问题原因以及具体的说明在homebrew的github以及有说明。具体内容可点击查看：[https://github.com/Homebrew/homebrew/issues/23500](https://github.com/Homebrew/homebrew/issues/23500)。再次直接附上解决方案：

1. 直接在终端输入：
		
		xcode-select --install
		
2. 系统弹框提示安装命令行开发者工具，如下图

	![系统弹框提示安装命令行开发者工具](../public/images/xcode-select-install.jpg "系统弹框提示安装命令行开发者工具")
	
- 点击安装。一般安装过程需要1分钟左右。安装好以后即可正常使用。

### brew 没有权限访问/usr/local 目录

直接输入命令：

	sudo chown -R $(whoami):admin /usr/local
	
### jekyll安装

	sudo chown -R $(whoami):admin /Library/Ruby/Gems/2.0.0 && gem install jekyll


### JDK缺失导致Android studio等依赖JVM的工具异常。

这个问题没有仔细研究，不知道是因为换了路径（可能性太小了）。还是没有内置。反正手头有1.7，就直接更新了。这里的处理方法很简单，安装jdk即可。由于墙的原因，jdk下载速度奇慢，用代理也还是太慢，这里就共享一下自己的下载包，现在非官方版闹的大家人心惶惶，就顺手附上官方包的md5查询地址吧。

#### jdk-7u75-macosx-x64.dmg
- 下载链接：[http://share.weiyun.com/997d6394f05c7dd67c5f9e829f4a9cf5](http://share.weiyun.com/997d6394f05c7dd67c5f9e829f4a9cf5) （密码：r1Ut）

- 官网md5查询：[https://www.oracle.com/webfolder/s/digest/7u75checksum.html](https://www.oracle.com/webfolder/s/digest/7u75checksum.html)




