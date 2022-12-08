---
layout: post
title: Gradle介绍
category: 终端开发
tags: android gradle 工具
keywords: keywords
description: desc
---

最近看一些github上的Android源码用到Android Studio，在开发和运行demo中遇到了比较多的Gradle相关的问题，之前对Gradle其实没有太多了解，导致每次解决问题都很头疼，最终觉得系统看一下。这边文章主要汇总一些基础知识和一些基本语法。

## Gradle简介

Gradle是一种构建工具，它抛弃了基于XML的构建脚本，取而代之的是采用一种基于Groovy的内部领域特定语言。

### 安装

Mac下直接使用homebrew（[点击了解安装及使用方法](https://blog.bihe0832.com/Homebrew.html)）。命令如下：

	brew install gradle

### 版本查看

		
	➜  gradle -v

	------------------------------------------------------------
	Gradle 2.5
	------------------------------------------------------------

	Build time:   2015-07-08 07:38:37 UTC
	Build number: none
	Revision:     093765bccd3ee722ed5310583e5ed140688a8c2b

	Groovy:       2.3.10
	Ant:          Apache Ant(TM) version 1.9.3 compiled on December 23 2013
	JVM:          1.7.0_75 (Oracle Corporation 24.75-b04)
	OS:           Mac OS X 10.10.4 x86_64
	

## Gradle构建名词解释

### 项目和任务：

点击查看官方说明：[Projects and tasks](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html)

每一次Gradle的构建都包含一个或多个项目。

- 项目是指我们的构建产物（比如Jar包）或实施产物（将应用程序部署到生产环境）。一个项目包含一个或多个任务。

- 任务是指不可分的最小工作单元，执行构建工作（比如编译项目或执行测试）。

### 相关配置：


- Gradle构建脚本（build.gradle）：指定了一个项目和它的任务。

- Gradle属性文件（gradle.properties）：用来配置构建属性。

- Gradle设置文件（gradle.settings）：对于只有一个项目的构建而言是可选的，如果我们的构建中包含多于一个项目，那么它就是必须的，因为它描述了哪一个项目参与构建。每一个多项目的构建都必须在项目结构的根目录中加入一个设置文件。

- Gradle属性设置文件（gradle-wrapper.properties）：声明了Gradle的目录与下载路径以及当前项目使用的gradle版本，这些默认的路径我们一般不会更改。

## Gradle构建依赖

### 构建中增加Maven：

官网关于构建中加入maven的说明[section 50.6.4 Maven Repositories of the Gradle User Guide](https://docs.gradle.org/current/userguide/dependency_management.html#sub:maven_repo)

在Gradle构建中，我们可以通过URL地址或本地地址，将Maven仓库加入到我们的构建中。例如：

	repositories {
    	maven {       
        	url "../maven2"
        	
        	url "http://repo.mycompany.com/maven2"
    	}
	}

同时Gradle也提供了三个方法供我们使用：

- mavenCentral()，表示依赖是从Central Maven 2 仓库中获取的。
- jcenter()，表示依赖是从Bintary’s JCenter Maven 仓库中获取的。使用较多。
- mavenLocal()，表示依赖是从本地的Maven仓库中获取的。

例如我们是将Jcenter加入构建，就可以加入以下代码：

	repositories {
    	jcenter()
	}
他等同于：

	repositories {
    	jcenter {
       		url "http://jcenter.bintray.com/"
    	}
	}
	
### 声明项目依赖

最普遍的依赖称为外部依赖，这些依赖存放在外部仓库中。在maven中一个外部依赖可以由以下属性指定：

- group：指定依赖的分组（在Maven中，就是groupId）。
- name：指定依赖的名称（在Maven中，就是artifactId）。
- version：指定外部依赖的版本（在Maven中，就是version）。

例如我们要声明一个junit的外部依赖：

	dependencies {
    	classpath group: 'junit', name: 'junit', version: '4.11'
	}

也可以直接使用下面的快捷方式：
 	
 	dependencies {
        testCompile 'junit:junit:4.11'
    }
    
 