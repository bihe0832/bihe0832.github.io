---
layout: post
title: iOS开发 -- 首次使用Xcode运行iOS项目代码
category: 终端开发
tags: tags
keywords: iOS 终端
description: 主要介绍首次使用Xcode运行iOS项目代码
---

由于工作的原因，现在开始接触一些iOS相关的开发工作，刚好是从零开始，因此就逐渐汇总整理一些开发过程中的基础问题吧。这篇主要介绍首次使用Xcode运行iOS项目代码

### 1. 安装IDE等环境

做iOS开发一定要有苹果的软件环境：Mac OS操作系统、Objective-C编译器、设备模拟器等。

- Mac OS

  拥有Mac OS环境最简单的方法是找一台苹果电脑，包括iMac, MacBook Pro, MacBook Air。
  
- Xcode、iOS SDK和模拟器
  
  - 下载地址：[https://developer.apple.com/Xcode/index.php](https://developer.apple.com/Xcode/index.php)

  - 其他：安装Xcode时会自动安装iOS SDK和模拟器

## 2. checkout代码

如果已经有现成的iOS项目，阔以直接checkout下来，如果没有，直接去官网下载一个：
  
  [https://developer.apple.com/library/archive/navigation/#section=Resource%20Types&topic=Sample%20Code](https://developer.apple.com/library/archive/navigation/#section=Resource%20Types&topic=Sample%20Code)
  
## 3. 启动IDE、配置工程
	
启动Xcode，导入代码。阔以通过下面的方式启动Xcode并导入代码

- 双击project文件

    打开Finder，进入项目根目录，找到*.Xcodeproj文件，双击运行，Xcode会自动启动并打开项目

-  在Xcode里选择Project打开

    启动Xcode，点击右下角的“Open another project”按钮，选择项目根目录，然后点击“Open”
  
    如果Xcode已经启动，可以点击其菜单栏的“File” -> “Open”，选择项目根目录，然后点击“Open”


## 4. 运行项目

点击Xcode左上角的Run按钮，编译成功后会在屏幕上显示“Build Succeeded”，然后在模拟器中运行这个应用。
