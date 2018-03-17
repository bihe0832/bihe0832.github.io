---
layout: post
title: 日常开发中各种代理设置方法汇总
category: 终端开发
tags: tags
keywords: keywords
description: desc
---

## 写在前面 

由于各种各样的墙的原因，导致日常开发中我们会遇到各种各样的因为网络的问题导致的不能访问、超时等问题。每次遇到都会去查一遍，很是费时，今天专门总结汇总一下。

对于mac环境，我们大部分时间都是使用命令行，因此代理配置相关的主要就是关于shell的代理配置。很奇怪shell命令行下配置的代理仅仅对shell相关的部分命令（例如wget等）生效，不是对整个机器生效（例如npm、gem还是要使用专门的代理）。当然也有可能由于公司网络异常复杂，因此会有各种代理配置，是别的代理配置的问题，引起代理在部分命令下没有生效。不管是什么原因，这里都总结一下相关命令的代理配置。

## shell下的代理配置

#### 配置方法

shell的网络代理有两种方法，一种是直接通过命令行配置，一种是直接设置在配置文件，在终端启动时自动加载。两种方法都是使用export设置环境变量的方式来实现，方法一致：
	
	# 配置生效
	export http_proxy='http://proxy.com:8080';
	export https_proxy='http://proxy.com:8080';
		
	# 删除配置
	export http_proxy='';
	export https_proxy='';
	
	
#### 命令行配置事例

通过命令行可以完成网络代理的切换，包括代理添加、删除代理以及修改代理。具体事例如下

	# 添加
	➜  temp export http_proxy='http://proxy.com:8080';
	➜  temp export https_proxy='http://proxy.com:8080';
	# 查看
	➜  temp echo $http_proxy $https_proxy
	http://proxy.com:8080 http://proxy.com:8080
	# 修改
	➜  temp export https_proxy='http://test-proxy.com:8080';
	# 查看
	➜  temp echo $http_proxy $https_proxy
	http://dev-proxy.oa.com:8080 http://test-proxy.com:8080
	# 删除
	➜  temp export http_proxy='';
	➜  temp echo $http_proxy $https_proxy
	http://dev-proxy.oa.com:8080
	➜  temp export https_proxy='';
	➜  temp echo $http_proxy $https_proxy
	
	➜  temp
	
#### shell环境变量配置事例

如果是在环境变量中设置对应的参数，一般都是默认添加代理，然后当需要取消代理的时候再通过命令行使配置不生效。之所以已经有命令行的情况下还提供环境变量的设置是因为环境变量的配置会在每次shell终端启动时自动加载，因此不需要每次配置。目前个人使用的shell为zsh，因此以zsh的配置来说明。打开zsh的配置文件（默认为`~/.zshrc`）,然后添加上面的代理配置即可，事例如下：
	
	➜  temp tail ~/.zshrc
	export FixVersion=0
	export BuildNo=11
	export SVN_REVISION=100
	export oldSDKTag=Tag_YSDK_1.3.1.45_635
	export isPatch=false
	export isRelease=false
	
	export https_proxy='http://proxy.com:8080';
	export http_proxy='http://proxy.com:8080';

## Android Studio 下的代理配置

Android开发中我们会用到两种模式，一种是直接IDE编译运行，一种是直接在命令行运行，两种场景下的代理配置并不一致。其中在命令行下运行时的代理配置与shell下的一致，因此不再专门介绍，仅仅介绍IDE的环境变量配置。

#### 配置方法

Android studio提供了IDE全局的环境变量的配置模式，就在 Appearance & Behavior > System Settings > HTTP Proxy 中，由于这个配置是全局的，因此开发中并不是很方便，主要表现在：

- 不同的项目可能不一定需要配置代理，或者需要的代理并不一致
- 如果项目有多个开发者，每个开发者都需要配置一次

因此个人更多的都是直接修改项目相关的配置文件来设置项目相关的代理。具体的就是在项目的根目录的gradle.properties中添加如下的配置：


	System.http.proxyHost='proxy.com'
	System.http.proxyPort='8080'
	System.https.proxyHost='proxy.com'
	System.https.proxyPort='8080'

这里需要注意的是，很多android的maven依赖都是使用https的，因此不要仅仅配置http相关的代理，需要同时配置https的

## gem 代理设置

正如前面提到的，在某些情况下会出现shell配置了代理，但是gem并没有生效的情况，因此这里专门介绍一下gem设置代理的方法：








