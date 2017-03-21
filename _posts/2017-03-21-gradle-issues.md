---
layout: post
title: gradle常见错误解决方案
category: 终端开发
tags: gradle 
keywords: gradle jvmargs daemon parallel configureondemand javaMaxHeapSize
description: desc
---

在平时开发中，经常会遇到一些gradle相关的问题，本篇文章将用于收集整理这些问题，免得以后再去google。

### 构建失败，提示Could not resolve all dependencies for configuration ':classpath'

- 问题现象

		➜  ./gradlew clean
		Parallel execution with configuration on demand is an incubating feature.
		
		FAILURE: Build failed with an exception.
		
		* What went wrong:
		A problem occurred configuring root project 'test'.
		> Could not resolve all dependencies for configuration ':classpath'.
		   > Could not resolve com.android.tools.build:gradle:2.1.2.
		     Required by:
		         :test:unspecified
		      > Could not resolve com.android.tools.build:gradle:2.1.2.
		         > Could not get resource 'http://test.bihe0832.com/nexus/content/groups/androidbuild/com/android/tools/build/gradle/2.1.2/gradle-2.1.2.pom'.
		            > Could not HEAD 'http://test.bihe0832.com/nexus/content/groups/androidbuild/com/android/tools/build/gradle/2.1.2/gradle-2.1.2.pom'.
		               > Connection to http://test.bihe0832.com refused
		
		* Try:
		Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.
		
		BUILD FAILED
		
		Total time: 1 mins 18.198 secs

- 解决方法

	修改项目根目录build.gradle中对于使用的maven库的声明，具体方法可以参考文章[终端基于gradle的开源项目运行环境配置指引](http://blog.bihe0832.com/android-as-gradle-config.html)

### 构建失败，提示Downloading gradle Operation timed out

- 问题现象

		➜  Assistant_7.0_size_reduce  ./gradlew clean
		Downloading http://test.bihe0832.com/gradle/gradle-2.10-all.zip
		
		Exception in thread "main" java.net.ConnectException: Operation timed out
			at java.net.PlainSocketImpl.socketConnect(Native Method)
			at java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:339)
			at java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:200)
			at java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:182)

- 解决方法

	修改项目根目录gradle/wrapper/gradle-wrapper.properties中使用的gradle版本的地址，具体方法可以参考文章[终端基于gradle的开源项目运行环境配置指引](http://blog.bihe0832.com/android-as-gradle-config.html)

### 构建失败，提示gc overhead limit exceeded 或者java.lang.outofmemoryerror java heap space 

- 问题现象

	构建过程失败或者不停报错，错误提示如下：

		:module:lintVitalRelease
		Failed converting ECJ parse tree to Lombok for file *.java
		java.lang.OutOfMemoryError: Java heap space
			at lombok.ast.ListAccessor.of(ListAccessor.java:539)
			at lombok.ast.MethodInvocation.<init>(MethodInvocation.java:8)
			at lombok.ast.ecj.EcjTreeConverter$2.visitMessageSend(EcjTreeConverter.java:1041)
	
- 解决方案

	这种问题是因为构建时内存溢出了，比较容易解决，如果是使用android studio，那就在对应modele的build.gradle里面添加dexOptions：

		android {
		
			……
			
			dexOptions {
		        javaMaxHeapSize "4g"
		        incremental true
		    }
		}
		

	如果是使用gradlew，就在项目的build.gradle文件中添加：

		org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
	
	建议最好是直接按照[gradle常见配置项](http://blog.bihe0832.com/gradle_config.html)里面关于构建速度优化提到的方式配置所有的选项。