---
layout: post
title: iMac上Android Studio 的一些设置
category: 终端开发
tags: android 工具
keywords: Mac Android Studio 快捷键
description: desc
---
最近忙着写代码和倒腾AS，好久没写博客了，今天就小小总结一下个人使用AS中遇到的不太顺手的点，备忘一下。

电脑上的Android Studio装了已经有些时间了，然而因为所有工作中的项目都是ADT，所以虽然垂涎已久，但都是浅尝辄止。最近发现个开源项目挺好，终于强迫自己走上AS的不归路～～

因为用久了Eclipse，刚上手确实很不习惯，但是就算奔着分分种编出包也要用下去呀，中间遇到一些问题，这里简单记录一下啊。

## 界面风格和字体

1. AS的界面风格和编辑器中的字体风格是分开的。
- AS的界面风格在Apperance中调整，只需要关注Theme就可以了。
- AS的编辑器中字体的风格在Editor->Colors&Fonts->Font里面，但是因为你用了默认主题，所以字体大小是不能改的，要先点一下Save As变成你自己的主题，然后修改。

## 常用快捷键

遇到的第一个问题，就是快捷键，本来想改为和Eclipse一致的，最终在基友的劝说下决定既然走上不归路，就重新适应他的快捷键。整理了下常用的一些快捷键。

操作             |     对应快捷键    
----------------|----------------
删除行 | Cmd + del   
格式化代码  | Cmd + Option + L 
查找+替换  | Cmd + R 
import | option + enter 
清除无效包引用      | Option + Control + O 
查找调用的位置 | Ctrl + Option + H
上下移动代码        | Option + Shift + Up/Down 
注释代码(//)        | Cmd + /
注释代码(/**/)      | Cmd + Option + / 
快捷覆写方法        | Cmd + O
 
## 异常处理

### 升级gralde以后编译报错

- 问题现象 

	升级gradle到高版本，例如我升级到3.3以后编译报错。然而查看`File`-> `Project Structure` -> `SDK Location`里面的JDK已经是1.7
	
		Error:Gradle 3.3 requires Java 7 or later to run. You are currently using Java 6.
		
- 问题原因

	Android Studio会自己设置默认的jdk位置，默认的jdk是`1.6*，1.7+`，虽然修改了Project Structure，但是plist里面并没有修改。

- 解决办法：

	进入Android Studio的私有目录，需要修改/Application/Android Studio/Contents/info.plist中下面的配置：
	
		<key>JVMVersion</key> <string>1.6*,1.7+</string>

	例如我改为了，之后重试发现已经OK

		<key>JVMVersion</key> <string>1.7*,1.7+</string>

	