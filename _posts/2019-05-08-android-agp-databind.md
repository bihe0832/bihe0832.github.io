---
layout: post
title: 记一次升级Android Gradle Plugin后databing编译报错填坑经历
category: 终端开发
tags: tags
keywords: Android Gradle Plugin AGP databing compiler NullPointerException androidx.databinding com.android.databinding
description: 最近在新的项目重构项目代码加上升级一下项目的Android Gradle Plugin的版本，升级后编译出现java.lang.NullPointerException
---

最近在新的项目重构项目代码加上升级一下项目的Android Gradle Plugin的版本，老人们至今还在用2.3，不得不佩服。在升级过程中遇到了一些坑，这里总结一个databing相关的问题。备忘一下

#### 问题背景：

- 升级前版本号：
	
	- Android Gradle Plugin版本：`classpath "com.android.tools.build:gradle:3.0.0"`
	
	- databing compile依赖：`kapt "com.android.databinding:compiler:3.0.0"`

- 	升级后版本号：
	
	- Android Gradle Plugin版本：3.2.1
	
	- databing compile依赖：`kapt "com.android.databinding:compiler:3.0.0"`

#### 遇到问题：

升级前编译正常，升级后编译失败，报错如下：

	[kapt] An exception occurred: java.lang.NullPointerException
    at java.io.File.<init>(File.java:277)
    at android.databinding.annotationprocessor.ProcessExpressions.onHandleStep(ProcessExpressions.java:77)
    at android.databinding.annotationprocessor.ProcessDataBinding$ProcessingStep.runStep(ProcessDataBinding.java:203)
    at android.databinding.annotationprocessor.ProcessDataBinding$ProcessingStep.access$000(ProcessDataBinding.java:188)
    at android.databinding.annotationprocessor.ProcessDataBinding.doProcess(ProcessDataBinding.java:90)
    at android.databinding.annotationprocessor.ProcessDataBinding.process(ProcessDataBinding.java:65)
    
		……
		
    at java.security.AccessController.doPrivileged(Native Method)
    at sun.rmi.transport.tcp.TCPTransport$ConnectionHandler.run(TCPTransport.java:682)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
    at java.lang.Thread.run(Thread.java:745)

也有可能是编译后databing自动生成的类报下面的错误：

	~/CommonLoadingMoreLayoutBinding.java:57: error: cannot find symbol
	      @Nullable DataBindingComponent component) {
	                ^
	  symbol:   class DataBindingComponent
	  location: class CommonLoadingMoreLayoutBinding

#### 解决方案：

在尝试了stackoverflow的各种方案以后，最终找到了问题原因，总结如下：

- 	解决方案：
	
	- Android Gradle Plugin版本升级为：`classpath "com.android.tools.build:gradle:3.2.1"`
	
	- databing compile依赖升级为：`kapt "androidx.databinding:databinding-compiler:3.2.1"`

- 注意事项：

	1. **databing compile依赖从`com.android.databinding:compiler`切换为`androidx.databinding:databinding-compiler`**
	
	2. **databing compile依赖的版本号与Android Gradle Plugin版本保持一致。**

	3. **目前Android官方逐渐把support等相关库都切换到了androidx，所以后续这一类问题都可以考虑替换到androidx**
