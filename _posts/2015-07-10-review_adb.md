---
layout: post
title: ADB命令系列之再说ADB
category: 终端开发
tags: android adb
keywords: adb
description: desc
---

之前其实已经写过好几篇过于adb的文档了，而且基本上说的已经比较全了。奈何adb就是这么好用，而且就是这么强大，因此今天再对一些开发者使用很频繁但是之前说的并不详细的内容进一步说明下。（其实主要是把一些常用的命令列一下）

### 相关文章

之前已经写过三篇关于ADB的文章了，也在这里汇总一下。算作大纲吧。

- ADB命令系列之 Base Command[点击查看](http://blog.bihe0832.com/adb-base.html)

	重点介绍一些基本的adb命令，例如devices，start-server，kill-server，install，uninstall，push，pull，bugreport，logcat等。

- ADB命令系列之  Advanced Command[点击查看](http://blog.bihe0832.com/adb-advanced.html)

	重点介绍一些相对比较复杂的adb命令，主要是adb shell 相关的。例如screencap，monkey，getprop，setprop，pm，am，dumpsys等。

- ADB命令系列之 adb shell input[点击查看](http://blog.bihe0832.com/adb-shell-input.html)

	重点介绍adb shell input的用法，包括怎么输入内容，怎么模拟按键，模拟屏幕滑动等各种输入模拟。

### 常用命令

这里是根据我的开发环境使用的一些常用命令，具体使用根据自己的环境修改路径或者包名即可。

#### 解锁手机：
	
	adb shell input keyevent 26 && adb shell input swipe 250 250 800 800
	
#### 截屏：

	adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png /tmp/ && adb shell rm /sdcard/screen.png && open file:/tmp/screen.png
	
#### Monkey点击

	adb shell monkey -p com.example.agsdkdemo 10000 -s500 -v
	
#### 自动化测试

	adb shell am instrument -w com.example.agsdkdemo.test/android.test.InstrumentationTestRunner
	
#### 获取厂商机型等

	adb shell getprop | grep product
	
#### 根据APK获取应用包名、权限配置等信息(配合grep)
	
	$ANDROID_HOME/build-tools/android-4.4/aapt d badging
	
#### 直接拉起应用
	
	adb shell am start -n com.example.wegame/com.example.wegame.MainActivity

#### 退出应用

	adb shell am force-stop com.example.wegame
		
#### 模拟输入

- 空格：adb shell input keyevent 62
- 删除：adb shell input keyevent 67
- MENU：adb shell input keyevent 1
- HOME：adb shell input keyevent 2
- back：adb shell input keyevent 3
- 字符：adb shell input text 'hello,world'
