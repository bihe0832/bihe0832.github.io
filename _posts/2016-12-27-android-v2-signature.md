---
layout: post
title: Android的APK Signature Scheme v2签名及一款基于Java环境的校验工具介绍
category: 终端开发
tags: android 
keywords: APK Signature Scheme v2 v2SigningEnabled false
description: desc
---

## 背景

### APK Signature Scheme v2官方介绍

Android 7.0 引入一项新的应用签名方案 APK Signature Scheme v2，它能提供更快的应用安装时间和更多针对未授权 APK 文件更改的保护。在默认情况下，Android Studio 2.2 和 Android Plugin for Gradle 2.2 会使用 APK Signature Scheme v2 和传统签名方案来签署您的应用。

如果您使用 APK Signature Scheme v2 签署您的应用，并对应用进行了进一步更改，则应用的签名将无效。出于这个原因，请在使用 APK Signature Scheme v2 签署您的应用之前、而非之后使用 zipalign 等工具。

**官方关于v2的详细介绍：[https://source.android.com/security/apksigning/v2.html](https://source.android.com/security/apksigning/v2.html)**

### 渠道或者开发者关于渠道包的解决方案

目前主流的渠道号方案主要有以下几种：

1. 修改后重新打包或签名的，例如在AndroidMainfest里面添加mata-data等
2. 修改后不需要重新签名，主要有两种：

	- 直接把apk包看成一个zip包，然后在zip包的注释段添加对应的渠道信息
	- 直接把apk包看成一个zip包，然后利用相关命令在META-INF内注入${channel}.txt 文件

其中下面两种不需要重新签名的方法，被各主要渠道广泛使用。

### 渠道包与V2签名的冲突

然而，为了提高Android系统的安全性，Google从Android N增强了签名模式，该模式在原有的签名模式上，增加校验APK的SHA256哈希值；这种新引入的签名机制，会对整个文件的每个字节都会做校验，包括 comment 区域。**`如果签名后对APK作了任何修改，例如上面提到的修改注释段或者注入文件，在Android 7.0以上的机型安装时都会校验失败，提示没有签名无法安装。`**

## 解决方案

为了解决使用V2引起的问题，官方提供了不启用V2签名的方法，但是随着Android越来越完善，这种方案最终肯定是要全面使用的。目前已经有团队找到了基于V2签名的新的渠道号方案，由于种种原因，暂时不详细论述怎么实现。这里仅提供其余的解决方案：

### 怎么禁用V2签名

对于怎么禁用V2签名，官方提供了对应的方法，下文内容为禁用方法

虽然我们建议您对您的应用采用 APK Signature Scheme v2，但这项新方案并非强制性的。如果您的应用在使用 APK Signature Scheme v2 时不能正确开发，您可以停用这项新方案。禁用过程会导致 Android Studio 2.2 和 Android Plugin for Gradle 2.2 仅使用传统签名方案来签署您的应用。要仅用传统方案签署，打开模块级 build.gradle 文件，然后将行 v2SigningEnabled false 添加到您的版本签名配置中：

	  android {
	    ...
	    defaultConfig { ... }
	    signingConfigs {
	      release {
	        storeFile file("myreleasekey.keystore")
	        storePassword "password"
	        keyAlias "MyReleaseKey"
	        keyPassword "password"
	        v2SigningEnabled false
	      }
	    }
	  }
	
官方说明对应地址：[https://developer.android.google.cn/about/versions/nougat/android-7.0.html](https://developer.android.google.cn/about/versions/nougat/android-7.0.html?hl=zh-cn#apk_signature_v2)

### 怎么检查一个apk是否使用了V2签名以及V2校验是否通过

对于渠道SDK的开发者或者渠道来说，如果开发者上传的应用V2签名校验不能通过的话，那将是非常严重的问题，这样的安装包在Android 7.0以上版本的机器上是完全无法安装的。目前官方提供了校验一个apk签名校验是否通过的工具。

- **官方APK再签名或者校验签名工具apksigner介绍**：

	[https://developer.android.com/studio/command-line/apksigner.html](https://developer.android.com/studio/command-line/apksigner.html)

- **官方APK再签名或者校验签名工具apksigner源码**：

	[https://android.googlesource.com/platform/tools/apksig](https://android.googlesource.com/platform/tools/apksig)

除了官方没有提供的工具。通过阅读源码发现在`ApkSignatureSchemeV2Verifier.java`里面也有对应的逻辑实现，目前个人已经把对应代码迁移出来制作了独立的工具提供使用。

#### 工具下载

- 下载地址：

	- [https://github.com/bihe0832/AndroidAPKInfo](https://github.com/bihe0832/AndroidAPKInfo)


- MD5:

		MD5 (./CheckAndroidV2Signature.jar) = 22646da1410256ce93979b33525c888e		

#### 使用事例


- 查看帮助

		➜  java -jar CheckAndroidV2Signature.jar

		usage: java -jar ./CheckAndroidV2Signature.jar [--version] [--help] [filePath]
		
		such as:
		
			 java -jar ./CheckAndroidV2Signature.jar --version
			 java -jar ./CheckAndroidV2Signature.jar --help
			 java -jar ./CheckAndroidV2Signature.jar ./test.apk
		
		after check,the result will be a string json such as:
		
			 {"ret":0,"msg":"ok","isV2":true,"isV2OK":true}
		
			 ret: result code for check
		
				 0 : command exec succ
				 -1 : file not found
				 -2 : file not an Android APK file
				 -3 : check File signature error ,retry again
		
			 msg: result msg for check
			 isV2: whether the file is use Android-V2 signature or not
			 isV2OK: whether the file's Android-V2 signature is ok or not
			
			
- 查看版本

		➜  java -jar ./CheckAndroidV2Signature.jar --version
		com.tencent.ysdk.CheckAndroidV2Signature version 1.0.1 (CheckAndroidV2Signature - 2)
		homepage : https://github.com/bihe0832/AndroidGetAPKInfo
		blog : http://blog.bihe0832.com
		github : https://github.com/bihe0832		
- 查看应用信息

		➜  java -jar ./CheckAndroidV2Signature.jar ./YSDK_Android_1.3.1_629-debug-ysdktest-inner.apk
		{"ret":0,"msg":"ok","isV2":false,"isV2OK":false}
		

#### 源码地址:

- [https://github.com/bihe0832/AndroidAPKInfo/tree/master/CheckAndroidV2Signature](https://github.com/bihe0832/AndroidAPKInfo/tree/master/CheckAndroidV2Signature)

