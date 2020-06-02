---
layout: post
title: SDK热更系列之Demo体验方法
category: 终端开发
tags: 总结
keywords: Android SDK 热更
description: desc
---

### 写在前面

本文是SDKHotfix相关的SDK热更系列文章中的一篇，以下为项目及系列文章相关链接：

- **SDKHotfix整体介绍**：[http://blog.bihe0832.com/sdk_hotfix_project.html](http://blog.bihe0832.com/sdk_hotfix_project.html)

- **SDKHotfix对应github地址**：[https://github.com/bihe0832/SDKHoxFix](https://github.com/bihe0832/SDKHoxFix)

---

继插件化后，热补丁技术在2015年开始爆发，目前已经是非常热门的Android开发技术。为了解决SDK的热更新，也为了方便大家了解Android热更新，因此开发这个系列。这篇文章主要介绍一下SDK热更Demo相关的内容。

## APK及补丁生成

###  直接下载：

直接下载的方式，补丁包已经放在作者的服务器，体验时直接下载安装APK即可。
	
- [点击下载](http://blog.bihe0832.com/public/resource/Hotfix-debug.apk)
	
- 扫码下载APK：
	
![Demo下载二维码](http://blog.bihe0832.com/public/images/gradle-test-hotfix-apk-download.png)

### 运行项目生成：

1. 生成支持热更的SDK

	- 修改MD5下local.properies中的ndk.dir和sdk.dir的环境配置
	- 修改MD5下gradle/wrapper/gradle-wrapper.properties 关于使用的gradle版本的地址的修改
	- 修改MD5下build.gradle中对于使用的maven库的声明
	- 修改MD5下HotFixConsts中关于热更补丁下载地址的配置：`PATCH_DOWNLOAD_URL`，建议其余配置不要修改
	- 在整个根目录执行命令 `/bin/bash ./build.sh md5`
	- 执行命令结束以后，根目录bin目录会生成如下文件
	
			└── MD5
				│
				├── *_hash.txt ：当前版本的所有类文件的md5，用于后续生成补丁包
				│
				├── bihe0832MD5.jar ：支持热更的SDK的版本
				│
				├── bihe0832MD5_old.jar ：SDK编译生成的原始jar
				│
				├── armeabi
				│		│
				│		└─── libbihe0832MD5.so ：arm指令集下的so文件
				│
				└── …… 其余so文件，因为我们仅关注arm，因此忽略其余的指令集


2. 生成集成了支持热更的SDK的apk

	- 修改GradleTest下local.properies中的ndk.dir和sdk.dir的环境配置
	- 修改GradleTest下gradle/wrapper/gradle-wrapper.properties 关于使用的gradle版本的地址的修改
	- 修改GradleTest下build.gradle中对于使用的maven库的声明
	- 拷贝步骤1生成的支持热更的SDK的jar文件bihe0832MD5.jar到GradleTest项目下app目录中的libs目录下
	- 拷贝步骤1生成的armeabi文件夹到GradleTest项目下app目录的src/main/jniLibs下
	- 运行项目，生成apk文件

3. 生成热更使用的补丁包

	- 修改MD5项目目录下FixInfo中的`VERSION_NAME`、`VERSION_CODE`、测试热更的bug函数
	- 修改MD5项目目录下MD5文件中的getLowerMD5函数的bug
	- 修改MD5项目目录下`com_bihe0832_md5_MD5.cpp`中的VERSION
	- 修改根目录下build.sh中使用的build-tool的版本（`$ANDROID_HOME/build-tools/23.0.2/dx --dex ……`），例如默认使用的为23.0.2
	- 在整个根目录执行命令 `/bin/bash ./build.sh patch`
	- 执行命令结束以后，根目录bin目录会生成Patch目录，如下：

			└── Patch
			    │
			    ├──  armeabi
			    │		│
			    │		└─── libbihe0832MD5.so ：arm指令集下的更新的so文件
			    │
			    ├── bihe0832_patch.jar ：需要通过热更修复的相关代码class文件
			    │
			    └── bihe0832_patch_dex.jar ：需要通过热更修复的相关代码的dex文件

4. 配置补丁
	
	- 将So和patch上传到对应的服务器地址，**切记不要修改名称**

### 2. 体验方法

1. 安装本文提供或者自己运行工程生成的apk文件，然后体验功能，重点看日志中的版本号变化和输入任意字符的大小写md5。事例如下：

		bihe0832 Hotfix: version_name:1.0.0
		bihe0832 Hotfix: version_code:1
		bihe0832 Hotfix: onCreate
		bihe0832 Hotfix: checkFileExist
		bihe0832 Hotfix: File not found
		bihe0832 Hotfix: loadLibsSo
		bihe0832 Hotfix: checkJarInFileExist
		bihe0832 Hotfix: File not found
		bihe0832 MySDKInnerApi: onCreate
		bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832 MD5: MD5 version name:1.0.0
		bihe0832 MD5: MD5 version code:1
		bihe0832 MD5: MD5 CPP version code:1
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: testHotfix
		bihe0832.hotfixdemo D/bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832.hotfixdemo D/bihe0832 Hotfix: bug class
		bihe0832.hotfixdemo D/bihe0832 Gradle: getUserInput:fsfddsfsdf
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: getUpperMD5
		bihe0832.hotfixdemo D/bihe0832 Gradle: showResult:DBBCF8D34E9FB98A67B7DBFAFA9437AA
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: testHotfix
		bihe0832.hotfixdemo D/bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832.hotfixdemo D/bihe0832 Hotfix: bug class
		bihe0832.hotfixdemo D/bihe0832 Gradle: getUserInput:fsfddsfsdf
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: getLowerMD5
		bihe0832.hotfixdemo D/bihe0832 Gradle: showResult:DBBCF8D34E9FB98A67B7DBFAFA9437AA

2. 点击界面按钮触发热更新文件下载

3. 热更新内容下载完成以后，会有toast，收到toast以后，重启应用然后体验功能，重点看日志中的版本号变化和输入任意字符的大小写md5。事例如下：

		bihe0832 Hotfix: version_name:1.0.0
		bihe0832 Hotfix: version_code:1
		bihe0832 Hotfix: onCreate
		bihe0832 Hotfix: checkFileExist
		bihe0832 Hotfix: File exists:/data/data/com.bihe0832.hotfixdemo/files/libbihe0832MD5.so
		bihe0832 Hotfix: loadFilesSo
		bihe0832 Hotfix: checkJarInFileExist
		bihe0832 Hotfix: File exists:/data/data/com.bihe0832.hotfixdemo/files/bihe0832_patch_dex.jar
		bihe0832 Hotfix: loadClassFromJar
		bihe0832 MySDKInnerApi: onCreate
		bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832 MD5: MD5 version name:1.0.1
		bihe0832 MD5: MD5 version code:2
		bihe0832 MD5: MD5 CPP version code:2
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: testHotfix
		bihe0832.hotfixdemo D/bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832.hotfixdemo D/bihe0832 Hotfix: fixed class
		bihe0832.hotfixdemo D/bihe0832 Gradle: getUserInput:fsfddsfsdf
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: getUpperMD5
		bihe0832.hotfixdemo D/bihe0832 Gradle: showResult:DBBCF8D34E9FB98A67B7DBFAFA9437AA
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: testHotfix
		bihe0832.hotfixdemo D/bihe0832 MD5: com.bihe0832.hotfix.Fix
		bihe0832.hotfixdemo D/bihe0832 Hotfix: fixed class
		bihe0832.hotfixdemo D/bihe0832 Gradle: getUserInput:fsfddsfsdf
		bihe0832.hotfixdemo D/bihe0832 MySDKInnerApi: getLowerMD5
		bihe0832.hotfixdemo D/bihe0832 Gradle: showResult:dbbcf8d34e9fb98a67b7dbfafa9437aa


