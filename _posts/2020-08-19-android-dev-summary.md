---
layout: post
title: 安卓开发那些事总纲
category: 终端开发
tags: tags
keywords: 安卓 组件化 路由 
description: 开始做酱油的时候发现做开发那么久竟然没有一整套顺手的开发方案，要从头开始一个一个搭建（相当于之前做的就没什么沉淀），因此开始逐渐整理一整套相对全面并且顺手的开发方案。随着这几年逐渐完善，现在基本上具备雏形了，逐渐总结一下。
---

开始做酱油的时候发现做开发那么久竟然没有一整套顺手的开发方案，要从头开始一个一个搭建（相当于之前做的就没什么沉淀），因此开始逐渐整理一整套相对全面并且顺手的开发方案。随着这几年逐渐完善，现在基本上具备雏形了，逐渐总结一下。

目前主要总结方案的实现思路和方法，同时提供对于整体方案实现比较关键的代码片段。后续脱敏以后会逐渐将完整的方案代码整理出来。

## 方案范围

终端项目其实就是一个个版本。所以方案**将会从版本的日常开发、发布升级和遇到问题怎么回溯**逐渐整理总结，可能也会把之前写的一些东西整合一下加入进来。

对于版本的日常开发，首先会从整体框架、开发模式逐渐总结，把一些之前已经沉淀的技术方案加入进来。由于整套框架的核心就是组件化开发，因此这部分文章都会围绕组件化展开。为了用标题党吸引眼球，也为了突出重点，部分文章可能都以组件化为题；但是对于整个方案，组件化只是其中的一部分。

版本的发布升级与回溯，可能会一起来总结。主要包括我们对于一个版本有哪些标识，以及这些标识怎么生成，用于什么场景，解决什么问题。

## 方案目标

在新方案的设计和优化过程中，我们的最终目标是统一技术栈，同一个问题彻底研究一次，然后提供唯一的解决方案，后续可以直接放心使用。最终做到技术方案可以轻松的从一个项目复用到另一个项目，或者可以快速在这一系列框架基础上开发出另一个独立的应用，开发过程中基本聚焦在新业务的逻辑，而不是基础功能。

具体到开发就是一套代码可以支持所有项目（尤其是业务无关的底层逻辑），即使不能支持所有项目，也要做到相同逻辑的代码尽可能只有一份。这份代码是经过认真优化和项目考验的。

## 相关链接

在下面的文章中，将会详细的介绍在这几个方面我们做的一些沉淀。

### 组件化框架

由于整套框架的核心就是组件化开发，因此日常开发文章都会围绕组件化展开，框架设计将整体的设计，接下来的内容都是围绕组件管理、组件及调试运行、组件的自动构建来介绍；主要还是对整体设计中的一些细节的进一步完善。

- `安卓组件化之框架设计`：[https://blog.bihe0832.com/android-dev-architecture.html](https://blog.bihe0832.com/android-dev-architecture.html)

   介绍整体的组件化框架的设计，包括背景和具体的方案。框架核心就是组件化开发，设计中遵循组件单一职责、分层、高内聚低耦合、依赖倒置的原则。

- `安卓组件化之组件管理（导入、依赖、升级）`：[https://blog.bihe0832.com/android-dev-module-denpendencies.html](https://blog.bihe0832.com/android-dev-module-denpendencies.html)

    当项目随着业务模块的增加组件数量变多以后，组件依赖复杂，维护成本越来越高。这篇文章介绍我们对整个组件化项目的工程配置、编译、依赖管理等的优化。包括**模块怎么导入、依赖关系怎么添加、修改以后怎么更新组件**。

- `安卓组件化之组件调试和运行`：[https://blog.bihe0832.com/android-dev-module-debug.html](https://blog.bihe0832.com/android-dev-module-debug.html)

    这篇文章主要集中在怎么基于组件化更好的提升开发效率。包括如何做到最小单元运行、怎么提供更便捷的调试。
    
- `安卓组件化之持续集成与自动构建`：[https://blog.bihe0832.com/android-dev-module-build.html](https://blog.bihe0832.com/android-dev-module-build.html)

	这篇文章总结组件化开发框架怎么通过自动构建，完成一套代码同时支撑超过多款APP的构建发布。

- `安卓组件化之组件通信及拦截`：[https://blog.bihe0832.com/android-dev-router.html](https://blog.bihe0832.com/android-dev-router.html)

	这篇文章主要总结了我们基于路由的组件通信怎么设计的，包括路由怎么配置、怎么生成，以及怎么基于路由处理通用拦截及页面返回等逻辑。

- `H5页面通过指定Schema拉起Android应用的实现（H5调用路由）`：[https://blog.bihe0832.com/android_schema.html](https://blog.bihe0832.com/android_schema.html)

	在路由的使用场景中，有一个就是和H5结合。但是H5的页面还没开发好的时候，联调测试比较麻烦，因此专门写了一个通用的路由测试工具

- `安卓开发那些事之版本管理`：[https://blog.bihe0832.com/android-dev-module-version.html](https://blog.bihe0832.com/android-dev-module-version.html)

	这篇文章和组件化的关系不大，主要是讲应用的版本，包括版本怎么定义，有哪些标识，以及这些标识怎么生成，用于什么场景，解决什么问题。以及版本发布方法，遇到问题怎么回溯。
	
### 通用技术方案

- `Android JSBridge简介`：[https://blog.bihe0832.com/android_jsbridge.html](https://blog.bihe0832.com/android_jsbridge.html)

	Android JSBridge 的实现及测试方法总结。	
- `Android安装包精简系列（总纲）`：[https://blog.bihe0832.com/android_optimize_summary.html](https://blog.bihe0832.com/android_optimize_summary.html)

	Android安装包精简的方案的总结，包括为什么精简、怎么精简等

### 其他工具和流程

这部分内容主要是一些通用内容以及为了提升开发效率开发的一些工具。

- `安卓开发那些事之组件开发基本规范` 

	这篇文章总结组件化开发框架相关的一些开发规范，这些规范是保证组件化框架可以持续保持生命力的基本条件。对应链接为：[https://blog.bihe0832.com/android-dev-rules.html](https://blog.bihe0832.com/android-dev-rules.html)

- `Android-GetAPKInfo`

	通过命令行或者安装APK后 获取 手机已安装应用基本信息的工具集，对应 Github 为：[https://github.com/bihe0832/Android-GetAPKInfo](https://github.com/bihe0832/Android-GetAPKInfo)

- `Gradle-Dependencies-Check`

	一款检查Gradle依赖配置是否冲突的插件，梳理并检查项目中多个 module 的 gradle 依赖配置是否存在冲突。
	
	- 对应 Github： [https://github.com/bihe0832/Gradle-Dependencies-Check](https://github.com/bihe0832/Gradle-Dependencies-Check)
	
	- 对应介绍：[https://blog.bihe0832.com/gradle-dependencies-check.html](https://blog.bihe0832.com/gradle-dependencies-check.html)
	
- `Android编译编译速度提升`

	集中总结了项目开发中用到的一些优化Android编译编译速度的方式。对应链接为：[https://blog.bihe0832.com/gradle-config.html](https://blog.bihe0832.com/gradle-config.html)

- `Android开发常用工具资源`

	个人常用的一些简单的终端开发相关资源的地址以及功能。例如：开发调试常用工具、图片压缩及查看、制作Iocn，ActionBar，点9 图、查看方法数等。对应链接为：[https://blog.bihe0832.com/my_android.html](https://blog.bihe0832.com/my_android.html)

### 开发环境及技术

- `iMac（OS X）搭建私有maven仓库，提供Nexus Responsitory镜像`

	iMac 机器上部署一套私有仓库代理，即用于自己的开发，也提供给团队或者自己其余的机器使用。对应链接为： [https://blog.bihe0832.com/private_maven.html](https://blog.bihe0832.com/private_maven.html)

- `Linux 搭建 Android 编译构建环境`

	使用Linux服务搭建专用构建环境的简单总结。对应链接为：[https://blog.bihe0832.com/linux-android-build.html](https://blog.bihe0832.com/linux-android-build.html)
	
- `Gradle插件开发系列`

	在开发 Gradle 插件的过程中发现由于每次间隔时间太久，之前的坑又踩了一轮，因此系统总结整理了一下。对应链接为：[https://blog.bihe0832.com/gradle_plugin_summary.html](https://blog.bihe0832.com/gradle_plugin_summary.html)

- `发布开源代码到jcenter`

	从头开始介绍怎么把开源代码发布到 jcenter，并在项目中使用。包括注册账号，发布，发布后使用以及发布中一些常见的问题。对应链接为： [https://blog.bihe0832.com/jcenter.html](https://blog.bihe0832.com/jcenter.html)