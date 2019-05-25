---
layout: post
title: Gradle环境变量那些事
category: 开发工具
tags: tags
keywords: Gradle 环境变量 gradle properties
description: Gradle环境变量相关的内容，然后整理一下
---

最近真的是多灾多难，搞各种杂七杂八。带来的现象就是要不停的切换项目和工程，因为网络策略的问题，不同的项目使用了网络代理也不一样。专门去看了下Gradle环境变量相关的内容，然后整理一下。

#### 官方介绍：

- 官网地址：

	[https://docs.gradle.org/current/userguide/build_environment.html](https://docs.gradle.org/current/userguide/build_environment.html)
- 核心内容：
	
	> Gradle provides multiple mechanisms for configuring behavior of Gradle itself and specific projects. The following is a reference for using these mechanisms.
	> 
	> When configuring Gradle behavior you can use these methods, listed in order of highest to lowest precedence (first one wins):
	> 
	> Command-line flags such as --build-cache. These have precedence over properties and environment variables.
	> 
	> System properties such as systemProp.http.proxyHost=somehost.org stored in a gradle.properties file.
	> 
	> Gradle properties such as org.gradle.caching=true that are typically stored in a gradle.properties file in a project root directory or GRADLE_USER_HOME environment variable.
	> 
	> Environment variables such as GRADLE_OPTS sourced by the environment that executes Gradle.
	> 
	> Aside from configuring the build environment, you can configure a given project build using Project properties such as -PreleaseType=final.

#### 个人总结

和git的配置类似，gradle的配置有四份：

- 针对整个设备生效：

	这部分配置保存在系统的环境变量中，一般都比较有限，例如`GRADLE_OPTS`、`GRADLE_USER_HOME`等这些基础配置。

- 针对整个用户生效：

	这部分配置保存在文件` $GRADLE_USER_HOME/gradle.properties `中，对于当前用户下的的所有项目都适用。
	
- 针对整个项目生效：

	这部分配置保存在对应项目根目录的文件` gradle.properties `中，这里的配置仅仅针对当前项目有效。
	
- 针对某次执行生效

	这部分配置在执行命令时通过参数传入，这里的配置仅仅对当次执行生效
	
在实际项目中，用到的基本是下面三份配置，这三份配置的优先级关系是**命令行高于项目高于全局**。

#### 具体使用

- 在` $GRADLE_USER_HOME/gradle.properties `中添加所有项目通用的内容，例如网络代理，例如插件发布的密钥等私有配置，这样其余项目不再需要设置

- 在项目根目录的文件 ` gradle.properties `中添加项目相关的配置，例如是否使用NDK等

- 在命令行中使用一些临时命令，例如--refresh-dependencies --no-daemon等

#### 注意事项：

- 可以通过`./gradlew properties`命令查看项目的所有属性

- 对于开启了daemon的项目，当修改了gradle.properties的配置后，建议执行下面的命令更新一下配置，否则因为缓存，修改并不会及时生效：

		./gradlew --refresh-dependencies --no-daemon
	
		