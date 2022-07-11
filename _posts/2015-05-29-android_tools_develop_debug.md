---
layout: post
title: Android开发调试常用工具
category: 终端开发
tags: 调试 android
keywords: Android开发调试常用工具 apktool dex2jar aapt ndk-stack jd-gui
description: desc
recommand: true
---
Android开发或者联调中经常会使用一些工具，今天就简单总结一下。

## adb

开发调试第一神器，具体的在这里不做太多介绍，之前专门写过两篇文章。

### 下载地址：

无需安装，位于Android SDK的platform-tools文件夹下，增加环境变量即可使用

### adb 基础用法

介绍一些常用的adb命令，例如install、push这些：[点击查看](http://blog.bihe0832.com/adb-base.html)

### adb 进阶用法

介绍一些相对复杂的adb命令，主要是adb shell相关的：[点击查看](http://blog.bihe0832.com/adb-base.html)

### adb shell input

重点介绍adb shell input的用法，包括怎么输入内容，怎么模拟按键，模拟屏幕滑动等各种输入模拟：[点击查看](http://blog.bihe0832.com/adb-shell-input.html)

## apktool

apktool主要用来反编译或重打包apk，在需要修改apk文件或者联调时检查APK的配置时很有效果。目前主要用于反编译以后查看AndroidMainfest和assert下面的一些配置。

	说明：反编译或者重新打包
    命令： apktool.jar  [options] XXX.apk [PATH]
    		-f 反编译的时候如果存在目录，直接覆盖
    		 d 即decode，反编译
         	 b 即build，重新打包    

### 下载地址：

[http://ibotpeaches.github.io/Apktool/](http://ibotpeaches.github.io/Apktool/)

### 反编译：

使用下面的命令可以切换到指定目录下并将对应目录下的某个APK反编译到对应目录下

	cd /d D:\apk & java -jar D:/apk/apktool.jar -f d D:\apk\AGSDKDemo.apk
	cd ~/temp & java -jar ~/lib/apktool_2.0.0rc2.jar d -f  ~/temp/MSDKDemo.apk

### 重新打包：

使用下面的命令可以切换到指定目录下并将对应目录下的某个APK反编译到对应目录下

	cd /d D:\apk & java -jar D:/apk/apktool.jar b D:/apk/a
	cd ~/temp & java -jar ~/lib/apktool_2.0.0rc2.jar b  ~/temp/MSDKDemo

## dex2jar

dex2jar主要用于把dex文件转换为jar。需要配置环境变量或者专门下载。

	说明：将dex文件编译为jar
    命令：dex2jar.sh -f XXX.dex -o XXX.jar
    		-f 需要转换的dex文件
    		-o 最终生成的jar

### 下载地址：

[https://github.com/pxb1988/dex2jar](https://github.com/pxb1988/dex2jar)

### 使用方法：

下面命令可把AGSDKDemoMainActivity.dex转换为AGSDKDemoMainActivity.jar：

	$ cd ~/temp & dex2jar.sh -f AGSDKDemoMainActivity.dex -o AGSDKDemoMainActivity.jar
	
## JD-GUI

JD-GUI 是一个用 C++ 开发的 Java 反编译工具。一般用他来查看jar包的源代码

### 下载地址：

[http://jd.benow.ca/](http://jd.benow.ca/)

### 使用方法：

无需专门说明吧，已经是一个带界面的软件了，用它打开jar即可。

## aapt

aapt即Android Asset Packaging Tool , 该工具可以查看, 创建, 更新ZIP格式的文档附件(zip, jar, apk). 也可将资源文件编译成二进制文件。

### 下载地址：

无需安装，位于Android SDK的在SDK的tools/目录下

### 使用方法：

关于aapt的使用也可以专门用一个文档来说明了。这里只介绍怎么用它获取一个APK的基本信息，例如包名，版本这些。

获取一个应用的基本信息，用下面的命令可以获取到MSDKDemo-development-2.6.2.13_55206.apk的一些基本信息，包名、版本、权限等：

	$ANDROID_HOME/build-tools/android-4.4/aapt d badging d badging MSDKDemo-development-2.6.2.13_55206.apk

结合grep就能获取更具体的信息了，例如：

	获取启动Activity：$ANDROID_HOME/build-tools/android-4.4/aapt d badging MSDKDemo-development-2.6.2.13_55206.apk | grep activity
	
	获取包名、版本：$ANDROID_HOME/build-tools/android-4.4/aapt d badging MSDKDemo-development-2.6.2.13_55206.apk | grep package

## ndk-stack

ndk-stack 是一个可以将.so文件的地址映射到相应的编译此.so文件的.h/.cpp的具体地址的工具，是JNI层的Crash的问题定位神器。回头会专门写一个文章出来。
