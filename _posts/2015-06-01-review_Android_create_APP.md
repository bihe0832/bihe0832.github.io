---
layout: post
title: 再看Android官方文档之建立第一个APP
category: 终端开发
tags: android 学习
keywords: build gradle gradlew android
description: desc
---

转眼开始投身Android开发已经一年多，一直在不停的写写写，查查查。但是慢慢发现有些基础的东西又开始慢慢忘记了。今天是国际儿童节，决心重新在把Android的官方文档翻出来，重新过一遍。同时把一些自己之前忽略或者遗忘的点整理记录一下。

关于SDK开发的总结还没有写完，剩下的东西都是比较难写，需要考虑更多的，时机合适的时候，编剧会一次搞定。

#### app/build.gradle

build.gradle文件存放编译依赖设置，包括defaultConfig设置：

- compiledSdkVersion 是我们的应用将要编译的目标Android版本

- applicationId 创建新项目时指定的包名。

- targetSdkVersion 表示你测试过你的应用支持的最高Android版本(同样用API level表示).

#### android（通过命令行直接创建工程，唤起模块）

	android create project --target <target-id> --name MyFirstApp --path <path-to-workspace>/MyFirstApp --activity MyActivity --package com.example.myfirstapp
	
	android sdk
	android avd

#### gradle编译

- **切换当前目录到Andriod项目的根目录**，在debug模式下使用Gradle编译项目，使用gradle脚本执行assembleDebug编译项目，执行后会在build/目录下生成MyFirstApp-debug.apk。

- gradlew代表 gradle wrapper，意思是gradle的一层包装，即gradle wrapper。常用命令：

		gradlew -v 版本号

		gradlew clean 清除build文件夹

		gradlew build 检查依赖并编译打包，该命令会把debug、release环境的包都打出来
		
		gradlew assembleDebug 编译并打Debug包

		gradlew assembleRelease 编译并打Release的包

#### android:id

+号只是当你第一次定义一个资源ID的时候需要。这里是告诉SDK此资源ID需要被创建出来。

#### android:hint

当文本框为空的时候,会默认显示这个字符串。

#### android:layout_weight

- 使用权重的前提一般是给View的宽或者高的大小设置为0dp，然后系统根据上面的权重规则来计算View应该占据的空间。

- 如果给View设置了match_parent的属性，那么上面计算权重时则不是通常的正比，而是反比，也就是权重值大的反而占据空间小

- 对于所有的View默认的权重是0，如果只设置了一个View的权重大于0，则该View将占据除去别的View本身占据的空间的所有剩余空间。

- 如果设置"wrap_content"作为宽度，系统需要自己去计算这个部件所占有的宽度，而此时设置了权重，所以系统自动会占据剩余空间，这种做法和设置为0dp相比消耗了更多的性能。

#### android:parentActivityName

- android:parentActivityName属性声明了在应用程序中该Activity逻辑层面的父类Activity的名称。 系统使用此值来实现默认导航操作。

- 使用Support Library和<meta-data>元素可以为安卓旧版本提供相同功能。例如：

		<activity
        	android:name="com.mycompany.myfirstapp.DisplayMessageActivity"
        	android:label="@string/title_activity_display_message"
        	android:parentActivityName="com.mycompany.myfirstapp.MyActivity" >
        	<meta-data
            	android:name="android.support.PARENT_ACTIVITY"
            	android:value="com.mycompany.myfirstapp.MyActivity" />
    	</activity>
    

#### Intent

- 在Android Studio中，按Alt + Enter 可以导入缺失的类(在Mac中使用option + return)

- 在putExtra()中，应该定义key为一个public型的常量，通常使用应用程序包名作为前缀来定义键是很好的做法，这样在应用程序与其他应用程序进行交互时仍可以确保键是唯一的。例如：

		public final static String EXTRA_MESSAGE = "com.mycompany.myfirstapp.MESSAGE";


