---
layout: post
title: Android编译编译速度提升
category: 终端开发
tags: gradle 
keywords: gradle jvmargs daemon parallel configureondemand javaMaxHeapSize
description: desc
---

在平时开发中，经常会发现当项目工程越来越大时，编译速度会大大影响编译器的编译效率。这里集中总结一下项目开发中用到的一些优化方式。

## 调整全局配置

修改项目的gradle.properties文件，添加一些gradle相关的全局配置，配置项的说明参照配置文件中的介绍。具体内容参考如下配置文件：

	# Specifies the JVM arguments used for the daemon process.
	# The setting is particularly useful for tweaking memory settings.
	# Default value: -Xmx10248m -XX:MaxPermSize=256m
	org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
	
	
	# The Gradle daemon aims to improve the startup and execution time of Gradle.
	# When set to true the Gradle daemon is to run the build.
	org.gradle.daemon=true
	
	
	# When configured, Gradle will run in incubating parallel mode.
	# This option should only be used with decoupled projects. More details, visit
	# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
	org.gradle.parallel=true
	
	# Enables new incubating mode that makes Gradle selective when configuring projects.
	# Only relevant projects are configured which results in faster builds for large multi-projects.
	# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:configuration_on_demand
	org.gradle.configureondemand=true

	// To re-enable the build cache, either delete the following
	// line or set the property to 'true'.
	android.enableBuildCache=true

## 常用task

- debug和release相关

	build会同时生成debug和release的apk，如果存在自动测试还会运行测试用例，如果为了方便调试，可以仅生成测试包，此时运行下面的命令即可
	
		./gradlew clean assembleDebug


- install和uninstall

	install和uninstall可以自动完成应用的安装和卸载，例如生成测试包并安装可以运行下面的命令 ：
	
		./gradlew clean assembleDebug installDebug
		

- 缓存相关clean 和 cleanBuildCache
		
	Android 插件的 clean 任务可以清除您的项目的 build/ 目录，与之类似，您可以运行 cleanBuildCache 任务来清除您的项目的构建缓存。


		./gradlew cleanBuildCache
		
		./gradlew clean
		
## 分析构建耗时

- 命令：

		./gradlew --profile --recompile-scripts --offline --rerun-tasks clean build 

- 使用方法：

	优化您的构建速度 - 分析您的构建：[https://developer.android.com/studio/build/optimize-your-build?hl=zh-CN#profile](https://developer.android.com/studio/build/optimize-your-build?hl=zh-CN#profile)

## 跳过耗时构建

在平时的调试过程中，为了加快项目的构建速度，可以通过添加一些参数来快速跳过一些构建步骤，例如通过lint和lintVitalRelease跳过极其耗时的资源lint过程：

	./gradlew clean assembleRelease -x lint -x verifyReleaseResources -x lintVitalRelease

- 个人常用命令事例

		./gradlew clean assembleDebug -x lint uninstallDebug installDebug
			
### 参考文章

- [How I save 5h/week on Gradle builds](https://android.jlelse.eu/speeding-up-gradle-builds-619c442113cb#.4fw1hvk3d)
- [探索 Android Studio - Android Developers](https://developer.android.com/studio/intro/?hl=zh-CN)