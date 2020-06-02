---
layout: post
title: Gradle Android插件使用的中那些特别注意的点
category: 终端开发
tags: android gradle
keywords: keywords
description: desc
---

## Gradle 插件

这是截至目前在使用Gradle的过程中遇到的最大的坑。目前**gradle的Android插件官方提供了两个版本：标准版本和实验性版本。而实验性版本对于Gradle的版本和NDK的版本都有特别说明，另外实验性版本中对于一些参数的定义和声明的方式与标准版并不一致。**

对于gradle的两个版本的配置之间的区别，个人专门写了开源项目来介绍，详情可以查看：[https://github.com/bihe0832/Android-gradle-jni-so](https://github.com/bihe0832/Android-gradle-jni-so)

### Gradle Plugin User Guide

下面是标准版本的官方用户使用指南：

- Gradle Plugin User Guide：[http://tools.android.com/tech-docs/new-build-system/user-guide](http://tools.android.com/tech-docs/new-build-system/user-guide)
- 由于这部分内容出现较早，已经有翻译好的版本《Gradle Android插件用户指南翻译》，附上对应的gitbook、github地址、和第一翻译作者博客地址：
	- gitbook：[http://avatarqing.github.io/Gradle-Plugin-User-Guide-Chinese-Verision/](http://avatarqing.github.io/Gradle-Plugin-User-Guide-Chinese-Verision/) 
	- github：[https://github.com/AvatarQing/Gradle-Plugin-User-Guide-Chinese-Verision](https://github.com/AvatarQing/Gradle-Plugin-User-Guide-Chinese-Verision)
	- 第一翻译作者：[http://blog.csdn.net/qinxiandiqi/article/details/37757065](http://blog.csdn.net/qinxiandiqi/article/details/37757065)

### Experimental Plugin User Guide

下面是实验性版本的官方用户使用指南：

- Experimental Plugin User Guide：[http://tools.android.com/tech-docs/new-build-system/gradle-experimental](http://tools.android.com/tech-docs/new-build-system/gradle-experimental)

- 为了防止有些被墙的人看不到，添加一篇个人博客对于官方文档的引用地址：[http://blog.bihe0832.com/Experimental_Plugin_User_Guide.html](http://blog.bihe0832.com/Experimental_Plugin_User_Guide.html)

其实对于编译中的大部分问题，以及上面说的参数定义的问题官方文档都已经有具体说明，可以参照文档来修改对应的gradle脚本。

### 对于实验性版本的一些特别说明

#### 相关环境

1. 必须使用特定的Gradle版本：使用gradle 2.5
- 必须使用特定的NDK的版本：r10e
- 必须使用19.0.0以上的Android build tools

#### 相关配置

1. JNI 不再需要Android.mk和Application.mk文件，相关配置都添加在build.gradle中
- Native的so不是放在libs下面，而是放在代码目录中，与java和res同级，文件夹为jniLibs
- 实验性版本里面的参数配置与标准版本很不一致，而且差距很大。例如对于key-value的参数，标准版是用空格分割，但是实验性版本中必须用“＝”

## Gradle 编译

使用Gradle的时候，当切换了配置的时候（例如修改了gradle版本、增加了新的依赖库）后再次编译的时候就需要重新去下载资源，然而由于墙的原因，这个过程会相当慢，反而会大大的影响开发的效率。因此推荐将一些常用的资源预下载到本地。

### Gradle 本地配置

1. 下载好Gradle的版本文件，建议下载gradle-2.5-all和最新的gradle的压缩包。一般这两个就可以满足需要。

	- 下载地址：[https://services.gradle.org/distributions/](https://services.gradle.org/distributions/)
- 将下载好的zip文件，根据自己计算机的配置，放置到对应的文件夹，例如本地都是放在

		/Users/zixie/lib/gradle/distribution/
3. 修改对应项目根目录gradle下gradle-wrapper.properties中对于gradle版本的说明，改为使用本地文件，例如：

		#Wed Apr 10 15:27:10 PDT 2013
		distributionBase=GRADLE_USER_HOME
		distributionPath=wrapper/dists
		zipStoreBase=GRADLE_USER_HOME
		zipStorePath=wrapper/dists
		distributionUrl=file\:/Users/zixie/lib/gradle/distribution/gradle-2.5-all.zip

### Maven库配置

由于墙的原因，很多资源更新很慢，正好nexus也推荐搭建私库，因此最好的办法就是自己搭建一套私服。自己也是在自己的Mac机器上部署一套私有仓库代理，即用于自己的开发，也可以提供给团队或者自己其余的机器使用。

具体部署的方法可以查看：[Mac搭建私有maven仓库，提供Nexus Responsitory镜像](http://blog.bihe0832.com/private_maven.html)


## 一些gradle相关的博客：

1. Android Studio分模块自动化构建实战
	- 来源：[http://blog.csdn.net/asce1885/article/details/46572931](http://blog.csdn.net/asce1885/article/details/46572931)
	- 说明：基于shell，主要是介绍怎么把多个jar合为一个jar
- gradle学习(17)-被合并的ant
	- 来源：[http://blog.csdn.net/itfootball/article/details/42651705](http://blog.csdn.net/itfootball/article/details/42651705)
	- 说明：怎么在gradle中使用ant
- android studio 使用gradle 导出jar包，并打包assets目录
	- 来源：[http://www.cnblogs.com/wuya/p/android-studio-gradle-export-jar-assets.html](http://www.cnblogs.com/wuya/p/android-studio-gradle-export-jar-assets.html)
	- 说明：使用gradle导出jar包，并打包assets目录到jar中
- Gradle实践之自定义打包jar+Log开关自动关闭
	- 来源：[http://unclechen.github.io/2015/10/25/Gradle%E5%AE%9E%E8%B7%B5%E4%B9%8B%E6%89%93%E5%8C%85jar+Log%E5%BC%80%E5%85%B3%E8%87%AA%E5%8A%A8%E5%85%B3%E9%97%AD/](http://unclechen.github.io/2015/10/25/Gradle%E5%AE%9E%E8%B7%B5%E4%B9%8B%E6%89%93%E5%8C%85jar+Log%E5%BC%80%E5%85%B3%E8%87%AA%E5%8A%A8%E5%85%B3%E9%97%AD/)
	- 说明：使用gradle自定义打出jar并修改buildConfig中ENABLE_DEBUG的值
- Android Studio使用新的Gradle构建工具配置NDK环境
	- 来源：[http://www.codeceo.com/article/android-studio-gradle-ndk.html](http://www.codeceo.com/article/android-studio-gradle-ndk.html)
	- 说明：手把手教怎么让AS支持Native开发
