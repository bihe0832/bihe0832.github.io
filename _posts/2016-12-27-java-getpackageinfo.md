---
layout: post
title: 一款基于Java环境的读取应用包名、签名、是否V2签名等基本信息的工具
category: 终端开发
tags: android 工具
keywords: Java Android 包名 签名
description: desc
---

## 背景

作为基于Android平台的渠道SDK的开发者或者联调同学每天都会面对大量的apk，需要检查他们的包名、版本、应用签名等信息，尤其现在Android-V2Sginature带来的问题更多(我会在另一篇文章中介绍)，为了提高工作效率，整理了一个获取应用基本信息的工具。下面主要是工具使用的方法，具体怎么实现可以参考源码。

具体的实现原理包括怎么生成可执行jar，怎么混淆jar等，会在另一篇文章中说明

## 资源

#### 源码地址：

- [https://github.com/bihe0832/AndroidAPKInfo](https://github.com/bihe0832/AndroidAPKInfo)

#### 工具下载：

- 下载地址：
	
	- [https://github.com/bihe0832/AndroidAPKInfo](https://github.com/bihe0832/AndroidAPKInfo)

- MD5:

		MD5 (GetAPKInfo.jar) = be02c0f33345a743f75f3a2ccccf9ef3

## 目录介绍
	
 
	├── GetAPKInfo.jar : 混淆前的可执行jar
	│ 
	├── libs  : 第三方包依赖
	│   │
	│   ├── AXMLPrinter2.jar : 解析AndroidMainfest
	│   │ 
	│   └── jdom.jar : 解析Xml
	│ 
	├── proguard.pro : 代码混淆规则
	│ 
	└── src : 源码


## 使用事例

### 查看帮助

	➜  java -jar ./getPackageInfo.jar
	
	 usage: java -jar ./getPackageInfo.jar [--version] [--help] [filePath]
	
	such as:
	
		 java -jar ./getPackageInfo.jar --version
		 java -jar ./getPackageInfo.jar --help
		 java -jar ./getPackageInfo.jar ./test.apk

### 查看版本号


	➜  java -jar ./getPackageInfo.jar --version
	com.bihe0832.getPackageInfo version 1.0.0 (getPackageInfo - 1)
	homepage : https://github.com/bihe0832/AndroidGetAPKInfo
	blog : http://blog.bihe0832.com
	github : https://github.com/bihe0832
	
	
### 查看应用信息

	➜  java -jar ./getPackageInfo.jar ./YSDK_Android_1.3.1_629-debug-ysdktest-inner.apk
	
	执行结果: 成功
	应用信息:
	  包名: com.tencent.tmgp.yybtestsdk
	  版本名: 1.3.1
	  版本号: 1
	  渠道号: null
	  签名: 252e3ded833125ed3e3bb010bc24f4dc
	  使用V2签名: false
	  V2签名验证通过: false	