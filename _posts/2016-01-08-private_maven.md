---
layout: post
title: iMac（OS X）搭建私有maven仓库，提供Nexus Responsitory镜像
category: 开发必备
tags: android iMac 工具
keywords: android iMac 工具
description: 在iMac机器上部署一套私有maven仓库代理
---

## 背景

最近项目陆续都切换到了Android Studio，同时切换到gradl编译，但是经常由于墙的问题使用的新的插件更新的速度非常慢。因此决定在自己的Mac机器上部署一套私有仓库代理，即用于自己的开发，也可以提供给团队或者自己其余的机器使用。

## 安装步骤

### 前置条件：

1. 已经安装有jdk；如果没有安装jdk可以[点击查看Mac下怎么安装JDK](http://blog.bihe0832.com/OS_X_El_Capitan_update.html)。

### 安装Sonatype Nexus

Sonatype Nexus是现在比较流行和成熟的私有仓库搭建工具，透过nexus可以很轻松的搭建私有仓库。

1. 下载nexus

	将工作目录切换到下载目录，然后使用命令行下载nexus最新版的安装包

		wget http://www.sonatype.org/downloads/nexus-latest-bundle.tar.gz
	
	目前最新版为nexus-2.12.0-01，下载完以后，目录会存在名为nexus-2.12.0-01-bundle.tar.gz的文件。

- 解压缩

	在目录下运行解压缩命令：
		
		tar zxvf nexus-2.12.0-01-bundle.tar.gz
	
	解压缩以后目录出现名为nexus-2.12.0-01文件夹	
- 拷贝到目标位置

	将解压后的nexus-2.12.0-01文件夹拷贝到你的用户库目录。通常为`/usr/loal/`，个人一般用自己专门的位置。
	
		mv nexus-2.12.0-01 ~/zixie/Library/
		
至此nexus已经安装OK了，等修改好相关的启动配置，就可以使用了。

## 配置修改

1. 在Nexus的安装目录找到/bin/nexus
- 使用文本编辑器（如sublime）打开nexus
- 修改Nexus home

	设置Nexus的根目录，就是上面部署nexus的为位置，例如：
	
		NEXUS_HOME="/Users/zixie/zixie/Library/nexus-2.12.0-01"
- 设置平台类型和启动方式
	
		RUN_AS_USER=root
		PLATFORM=macosx-universal-64
		PLATFORM_DIR="${NEXUS_HOME}/bin/jsw/${PLATFORM}"
		
5. 设置wrapper相关配置

		WRAPPER_CMD="${PLATFORM_DIR}/wrapper"
		WRAPPER_CONF="${PLATFORM_DIR}/../conf/wrapper.conf"
		PIDDIR="${NEXUS_HOME}"
	
## 启动服务

至此所有安装以及配置相关的内容都已经OK，接下来需要启动Nexus服务。

1. 切换到root。

	Nexus启动需要使用root用户，在命令行输入：
	
		sudo su
	输入密码以后即可切换到root用户。
- 启动服务

	在root用户下，运行安装目录下/bin下面的Nexus命令，即可启动Nexus：
	
		/Users/zixie/zixie/Library/nexus-2.12.0-01/bin/nexus start

	当然也可以将bin目录配置到环境变量，后续就可以直接敲命令而不用带上路径了，这个看个人需求。
	
## 验证和配置Nexus Respository

### 验证

Nexus安装完成以后，成功启动服务以后，打开浏览器，输入：[http://localhost:8081/nexus/](http://localhost:8081/nexus/)即可打开配置管理段的页面。则说明安装成功了。

### 配置Respository

点击界面右上角 “Log in”，然后输入账号密码（默认用户名：admin密码：admin123）即可登入管理段。

进入界面以后，点击左侧Repositories，右侧会出现很多库的配置，由于个人只是用来代理第三方库，因此把除了Central以外的其余库都删了。然后根据个人需求配置对应的repository。

点击add，选择 proxy Repository，然后添加相关配置。下图为个人添加oschina的镜像的相关配置：

![添加oschina的镜像](http://blog.bihe0832.com/public/images/nexus-repository-add-new.jpeg "添加oschina的镜像")

配置完所有配置以后点击save，即可把oschina添加到代理仓库。

### 开启自动下载

选择一个Repositories，然后点击下面的Configuration，然后将Remote Repository Access里面的Download Remote Indexes设置为true，Nexus就会自动从中央仓库更新资源了。

**特别说明：一般很多镜像库都非常大，建议只选择自己需要的部分添加就可以了，不然自动下载的结果就是硬盘被吃满**

### 代理设置

由于公司内网存在代理，因此为了让仓库正常使用，需要添加网络代理。在左侧Administraion中选择Server，在里面有设置Http Proxy的地方，配置对应的代理即可。如下图：

![代理设置](http://blog.bihe0832.com/public/images/nexus-proxy.jpeg "代理设置")

## 使用私有库

到目前为止，就完成了私有库的搭建，项目此时build.gradle脚本中的repository就可以使用自己的库了。例如在某个Android的build中，就可以将build.gradle修改为下面这样：

	// Top-level build file where you can add configuration options common to all sub-projects/modules.
	
	buildscript {
	    repositories {
	        maven { url "http://localhost:8081/nexus/content/repositories/android"}
	    }
	    dependencies {
	        classpath "com.android.tools.build:gradle-experimental:0.2.+"
	    }
	}
	
	allprojects {
	    repositories {
	        maven { url "http://localhost:8081/nexus/content/repositories/android"}
	    }
	}


## 常见问题

### 1. Nexus私服忘记用户名密码，怎么处理？

太久不登录，忽然会发现忘记了账号密码（默认账号密码为admin,admin123），如果是自己的私服，有一种彻底不需要账号密码的方式，配置如下：

1.  关闭Nexus服务：
	
		/Users/zixie/zixie/Library/nexus-2.12.0-01/bin/nexus stop

2. 打开Nexus安装目录下/sonatype-work/nexus/conf目录。
- 找到并打开security.xml文件。
- 找到如下节点
	
		 <userRoleMapping>
	      <userId>anonymous</userId>
	      <source>default</source>
	      <roles>
	        <role>anonymous</role>
	        <role>repository-any-read</role>
	      </roles>
	    </userRoleMapping>

	在其中roles行中添加：

		<role>nx-admin</role> 
	
	添加后变为：
	
		 <userRoleMapping>
	      <userId>anonymous</userId>
	      <source>default</source>
	      <roles>
	        <role>anonymous</role>
	        <role>nx-admin</role>
	        <role>repository-any-read</role>
	      </roles>
	    </userRoleMapping>

- 再起启动服务，此时就发现不再需要登陆了。
