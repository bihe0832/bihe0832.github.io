---
layout: post
title: Linux JDK 安装、卸载、路径查看
category: 开发工具
tags: 常用工具
keywords: Linux Java JDK yum
description: Linux 系统中 JDK 安装、卸载、路径查看
recommand: false
---

最近因为升级Androidx以及对应的AGP版本，需要同步升级构建机的 JDK 版本，整理过程中发现很多知识点都记得不太清了，再整理记录一下。

### 查找安装的rpm包有哪些

- 命令：

	`rpm -qa | grep jdk`
	
- 事例：

		➜  ~  rpm -qa | grep jdk
		
		java-1.8.0-openjdk-devel-1.8.0.342.b07-1.el7_9.x86_64
		copy-jdk-configs-3.3-10.el7_5.noarch
		java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64
		java-1.8.0-openjdk-headless-1.8.0.342.b07-1.el7_9.x86_64

### 卸载原有JDK

- 命令：

	`rpm -e 包名` 或者 `yum remove包名`

- 事例：

		➜  ~  rpm -e java-1.8.0-openjdk-devel-1.8.0.342.b07-1.el7_9.x86_64
		➜  ~  

### 安装 JDK

由于腾讯云的机器已经有yum，因此直接使用yum安装jdk

- 命令：

    `yum install java-1.8.0-openjdk-devel.x86_64`
    
- 事例：

        ➜  AndroidAppFactory git:(master) ✗ yum install java-1.8.0-openjdk-devel.x86_64
        Loaded plugins: fastestmirror, langpacks
        Repository epel is listed more than once in the configuration
        Repository nodesource is listed more than once in the configuration
        Repository nodesource-source is listed more than once in the configuration
        Loading mirror speeds from cached hostfile
         * remi-safe: mirrors.tuna.tsinghua.edu.cn
            
                 ……
    
        ➜  AndroidAppFactory git:(master) ✗ java -version
        openjdk version "1.8.0_242"
        OpenJDK Runtime Environment (build 1.8.0_242-b08)
        OpenJDK 64-Bit Server VM (build 25.242-b08, mixed mode)
    

### 寻找JDK 安装目录

#### which java 找到

`which java` 定位到的是java程序的执行路径，通过不停的回源，最终就能找到。

- 命令：

    `java -version` & `ls -lrt `
    
- 事例：

		➜  ~  java -version
		openjdk version "1.8.0_342"
		OpenJDK Runtime Environment (build 1.8.0_342-b07)
		OpenJDK 64-Bit Server VM (build 25.342-b07, mixed mode)
		➜  ~  which java
		/usr/bin/java
		➜  ~  ls -lrt /usr/bin/java
		lrwxrwxrwx 1 root root 22 Sep  7 14:44 /usr/bin/java -> /etc/alternatives/java
		➜  ~  ls -lrt /etc/alternatives/java
		lrwxrwxrwx 1 root root 73 Sep  7 14:44 /etc/alternatives/java -> /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/bin/java
		➜  ~  cd /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64
		➜  java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64  ls
		ASSEMBLY_EXCEPTION  bin  include  jre  lib  LICENSE  tapset  THIRD_PARTY_README
		➜  java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64  
		
### rpm -ql 找到

如果是通过yum 安装，还可以用这种方式

- 命令：

    `rpm -qa` & ` rpm -ql`
    
- 事例：

		➜  ~  java -version
		openjdk version "1.8.0_342"
		OpenJDK Runtime Environment (build 1.8.0_342-b07)
		OpenJDK 64-Bit Server VM (build 25.342-b07, mixed mode)
		➜  ~  rpm -qa | grep java
		javapackages-tools-3.4.1-11.el7.noarch
		tzdata-java-2022c-1.el7.noarch
		python-javapackages-3.4.1-11.el7.noarch
		java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64
		java-1.8.0-openjdk-devel-1.8.0.342.b07-1.el7_9.x86_64
		java-1.8.0-openjdk-headless-1.8.0.342.b07-1.el7_9.x86_64
		➜  ~  rpm -ql java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64 | head
		/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/bin/policytool
		/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/lib/amd64/libawt_xawt.so
		/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/lib/amd64/libjawt.so
		/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/lib/amd64/libjsoundalsa.so
		/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64/jre/lib/amd64/libsplashscreen.so
		/usr/share/applications/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.x86_64-policytool.desktop
		/usr/share/icons/hicolor/16x16/apps/java-1.8.0-openjdk.png
		/usr/share/icons/hicolor/24x24/apps/java-1.8.0-openjdk.png
		/usr/share/icons/hicolor/32x32/apps/java-1.8.0-openjdk.png
		/usr/share/icons/hicolor/48x48/apps/java-1.8.0-openjdk.png