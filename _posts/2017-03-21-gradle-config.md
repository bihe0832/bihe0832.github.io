---
layout: post
title: gradle常见配置项
category: 终端开发
tags: gradle 
keywords: gradle jvmargs daemon parallel configureondemand javaMaxHeapSize
description: desc
---

在平时开发中，经常会遇到一些gradle相关的配置，本篇文章将用于收集整理这些问题，免得以后再去google。

## 构建速度优化

主要是通过增加一些gradle的配置和开发调试中跳过一些非关键路径来加快构建速度。

### 修改配置文件

修改gradle.properties文件，添加一些gradle相关的全局配置，相关配置项的说明参照配置文件中的介绍。如果是全局的配置，把他放在gradle的用户目录（对于mac，如果没有特别配置，就在~/.gradle/目录下，如果不存在就新建一个)，具体内容参考如下配置文件：

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

### 跳过耗时步骤

在平时的调试过程中，为了加快项目的构建速度，可以通过添加一些参数来快速跳过一些构建步骤，例如跳过及其耗时的lint和lintVitalRelease：

	./gradlew clean build -x lint -x lintVitalRelease

## 参考文章

- [How I save 5h/week on Gradle builds](https://android.jlelse.eu/speeding-up-gradle-builds-619c442113cb#.4fw1hvk3d)