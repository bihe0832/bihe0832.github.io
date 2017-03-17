---
layout: post
title: Android开发中一些常用命令备忘
category: 开发必备
tags: 常用工具 android
keywords: keywords
description: 一些开发中经常要敲的命令，备忘一下懒得经常敲
---

### apkTool

- 反编译： 
		
		cd /d D:\apk & java -jar D:/apk/apktool.jar -f d D:\apk\AGSDKDemo.apk
		cd ~/temp & java -jar ~/lib/apktool_2.0.0rc2.jar d -f  ~/temp/MSDKDemo.apk

- 重新打包：

		cd /d D:\apk & java -jar D:/apk/apktool.jar b D:/apk/a
		cd ~/temp & java -jar ~/lib/apktool_2.0.0rc2.jar b  ~/temp/MSDKDemo

### Javah生成native头文件

-	
		cd /d E:\MSDK_SVN\trunk\android\OpenId\MSDK\bin\MSDKDemo\bin\classes & javah -classpath E:\MSDK_SVN\trunk\android\OpenId\MSDK\bin\msdk.jar;"D:\Program Files\adt-bundle-windows-x86-20131030\sdk\platforms\android-8\android.jar";. com.example.wegame.PlatformTest
	
		cd ~/msdk/trunk/android/TMGS/MSDKDemo/bin/classes/ & javah -jni com.example.wegame.MSDKApiNative
		
		javah -classpath ../../../MSDK/bin/msdk.jar:$ANDROID_HOME/platforms/android-8/android.jar:. com.example.wegame.PlatformTest
	
### adb

- monkey:

		adb shell monkey -p com.example.agsdkdemo 10000 -s500 -v

- robotium:

		adb shell am instrument -w com.example.agsdkdemo.test/android.test.InstrumentationTestRunner
		
- screencap:

		adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png /tmp/ && adb shell rm /sdcard/screen.png && open file:/tmp/screen.png

- 获取设备型号，厂商，CPU等信息:		
		
		adb shell getprop | grep product
		
- 通过scheme带参数拉起应用：

		adb -d shell am start -d msdkmainactivity://test -a android.intent.action.VIEW

