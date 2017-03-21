---
layout: post
title: gradle常见配置项
category: 终端开发
tags: gradle 
keywords: gradle jvmargs daemon parallel configureondemand javaMaxHeapSize
description: desc
---

在平时开发中，经常会遇到一些gradle相关的配置，本篇文章将用于收集整理这些问题，免得以后再去google。

## 全局配置文件

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


## task

### task 列表

	------------------------------------------------------------
	All tasks runnable from root project
	------------------------------------------------------------
	
	Android tasks
	-------------
	androidDependencies - Displays the Android dependencies of the project.
	signingReport - Displays the signing info for each variant.
	sourceSets - Prints out all the source sets defined in this project.
	
	Build tasks
	-----------
	assemble - Assembles all variants of all applications and secondary packages.
	assembleAndroidTest - Assembles all the Test applications.
	assembleDebug - Assembles all Debug builds.
	assembleRelease - Assembles all Release builds.
	build - Assembles and tests this project.
	buildDependents - Assembles and tests this project and all projects that depend on it.
	buildNeeded - Assembles and tests this project and all projects it depends on.
	clean - Deletes the build directory.
	compileDebugAndroidTestSources
	compileDebugSources
	compileDebugUnitTestSources
	compileReleaseSources
	compileReleaseUnitTestSources
	mockableAndroidJar - Creates a version of android.jar that's suitable for unit tests.
	
	Build Setup tasks
	-----------------
	init - Initializes a new Gradle build. [incubating]
	wrapper - Generates Gradle wrapper files. [incubating]
	
	Help tasks
	----------
	buildEnvironment - Displays all buildscript dependencies declared in root project 'Assistant_7.0_size_reduce'.
	components - Displays the components produced by root project 'Assistant_7.0_size_reduce'. [incubating]
	dependencies - Displays all dependencies declared in root project 'Assistant_7.0_size_reduce'.
	dependencyInsight - Displays the insight into a specific dependency in root project 'Assistant_7.0_size_reduce'.
	help - Displays a help message.
	model - Displays the configuration model of root project 'Assistant_7.0_size_reduce'. [incubating]
	projects - Displays the sub-projects of root project 'Assistant_7.0_size_reduce'.
	properties - Displays the properties of root project 'Assistant_7.0_size_reduce'.
	tasks - Displays the tasks runnable from root project 'Assistant_7.0_size_reduce' (some of the displayed tasks may belong to subprojects).
	
	Install tasks
	-------------
	installDebug - Installs the Debug build.
	installDebugAndroidTest - Installs the android (on device) tests for the Debug build.
	installRelease - Installs the Release build.
	uninstallAll - Uninstall all applications.
	uninstallDebug - Uninstalls the Debug build.
	uninstallDebugAndroidTest - Uninstalls the android (on device) tests for the Debug build.
	uninstallRelease - Uninstalls the Release build.
	
	Verification tasks
	------------------
	check - Runs all checks.
	connectedAndroidTest - Installs and runs instrumentation tests for all flavors on connected devices.
	connectedCheck - Runs all device checks on currently connected devices.
	connectedDebugAndroidTest - Installs and runs the tests for debug on connected devices.
	deviceAndroidTest - Installs and runs instrumentation tests using all Device Providers.
	deviceCheck - Runs all device checks using Device Providers and Test Servers.
	lint - Runs lint on all variants.
	lintDebug - Runs lint on the Debug build.
	lintRelease - Runs lint on the Release build.
	test - Run unit tests for all variants.
	testDebugUnitTest - Run unit tests for the debug build.
	testReleaseUnitTest - Run unit tests for the release build.

### 常用task

- debug和release相关

	build会同时生成debug和release的apk，如果存在自动测试还会运行测试用例，如果为了方便调试，可以仅生成测试包，此时运行下面的命令即可
	
		./gradlew clean assembleDebug


- install和uninstall

	install和uninstall可以自动完成应用的安装和卸载，例如生成测试包并安装可以运行下面的命令 ：
	
		./gradlew clean assembleDebug installDebug
		
- lint相关

	在平时的调试过程中，为了加快项目的构建速度，可以通过添加一些参数来快速跳过一些构建步骤，例如通过lint和lintVitalRelease跳过及其耗时的资源lint过程：

		./gradlew clean build -x lint -x lintVitalRelease

### 常用命令

- 个人常用命令事例

		./gradlew clean assembleDebug -x lint uninstallDebug installDebug
			
### 参考文章

- [How I save 5h/week on Gradle builds](https://android.jlelse.eu/speeding-up-gradle-builds-619c442113cb#.4fw1hvk3d)