---
layout: post
title: SDK热更之gradle插件（如何在SDK代码中自动插桩及如何生成补丁包）
category: 终端开发
tags: SDK
keywords: keywords
description: Android SDK 热更
---

### 写在前面

本文是SDKHotfix相关的SDK热更系列文章中的一篇，以下为项目及系列文章相关链接：

- **SDKHotfix整体介绍**：[http://blog.bihe0832.com/sdk_hotfix_project.html](http://blog.bihe0832.com/sdk_hotfix_project.html)

- **SDKHotfix对应github地址**：[https://github.com/bihe0832/SDKHoxFix](https://github.com/bihe0832/SDKHoxFix)

---

这篇文章主要介绍一下SDK热更中的gradle插件，该插件实现了自动在代码中插桩以及生成补丁包。文中提到所有代码地址：**SDKHotfix中插桩及补丁生成对应gradle插件的github地址**：[https://github.com/bihe0832/SDKHoxFix/tree/master/BuildPatch](https://github.com/bihe0832/SDKHoxFix/tree/master/BuildPatch)

## 插件简介

该插件是一个基于groovy开发的gradle的插件，为了方便理解整个项目没有把他集成到SDK的构建中，而是通过shell脚本一步一步完成插桩和生成补丁。开发者可以根据个人兴趣整合到项目gradle中或者保持隔离。已经对插件代码填了一部分注释因此不会专门详细介绍具体实现，这里重点介绍一下插件定义的几个变量。

- HashSet<String> excludeClass

	项目中所有不可以被热更的类列表，可以是具体类名，也可以是包名
	
- int oldSDKVersion

	被热更的SDK的版本号，或者说有问题的SDK的版本号，在生成补丁时通过该版本号可以获取到老版本SDK所有文件的md5值
	
- int newSDKVersion

	热更后SDK的版本号，也就是SDK在热更以后升级到的版本

- String patchCoreClass

	SDK热更中保存SDK的版本、热更测试函数的核心类，这个类在生成补丁包时一定会保留
	
- String patchPileClass

	SDK插桩使用的类的类名，这个类在生成SDK或者补丁的时候一定会被删除
	
## 主要task
	
### 代码插桩（processJarAndGetJarHash）

#### 为什么要插桩

在SDK所有需要热更的代码中插桩是所有使用mutlidex的热更方案的基本原理。通过代码插桩的方式可以解决应用启动dex预检验时因补丁类不在相同dex的报错。详细的原理内容可以参照Qzone的原理介绍文章：[安卓App热补丁动态修复技术介绍](https://zhuanlan.zhihu.com/p/20308548?columnSlug=magilu)

#### 基本原理

- 在SDK的源码中保留插桩类`com.bihe0832.hotfix.Fix`，保证SDK工程正常使用不出错

- 自动构建时完成对所有需要插桩类的默认构造函数插桩

- 自动构建完成对所有需要插桩的类插桩后删除插桩类`com.bihe0832.hotfix.Fix`

- 自动构建的过程中计算生成所有该版本对应每个class文件的md5，例如`3_hash.txt`

#### 对应代码

- 自动构建相关代码（具体代码参考根目录build.sh）：

		cd $localPath/MD5 && ./gradlew processJarAndGetJarHash

- 插件相关代码

	`BuildPatch`项目`BuildPatchPlugin.groovy`中task`processJarAndGetJarHash`对应的内容。

### 生成补丁包（buildPatch）

#### 基本原理

- 自动构建完成所有代码的插桩以及对应文件及其md5

- 根据版本号获取到历史版本保存对应版本所有文件及其hash值的文件

- 获取自动构建目录下所有的文件列表，逐个文件与历史版本中的文件对比md5，如果一致则删除，不一致则保留

- 所有文件对比完成以后，清除空目录，将剩余文件打包为jar，并转为dex

- 由于补丁信息类`com.bihe0832.hotfix.FixInfo`中保存了SDK的补丁的版本号等信息，因此该文件一定保留不会删除

#### 对应代码

- 自动构建相关代码（具体代码参考根目录build.sh）：

		cd $localPath/MD5 && ./gradlew buildPatch
		deleteempty
		jar cvf $localPath/MD5/bin/temp/jar/bihe0832_patch.jar *
		cp -r $localPath/MD5/bin/temp/jar/bihe0832_patch.jar $localPath/MD5/bin/bihe0832_patch.jar
		$ANDROID_HOME/build-tools/23.0.2/dx --dex --output=$localPath/MD5/bin/bihe0832_patch_dex.jar $localPath/MD5/bin/temp/jar/bihe0832_patch.jar

- 插件相关代码

	`BuildPatch`项目`BuildPatchPlugin.groovy`中task`buildPatch`对应的内容。
