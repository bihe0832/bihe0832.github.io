---
layout: post
title: 使用 Jekyll 搭建技术博客并部署到 CentOS 服务器
category: 开发工具
tags: tags
keywords:  Jekyll 静态 网站 Linux CentOS
description: 使用 Jekyll 搭建技术博客并部署到 CentOS 服务器
---

## 背景

博客默认是放在GitHub的，最近有人反馈速度很慢，测试发下由于墙的原因，国内访问确实很慢。因此就打算部署两套：

- 海外访问继续用GitHub，使用域名：[http://blog-oversea.bihe0832.com/](http://blog-oversea.bihe0832.com/)

- 国内访问用国内服务器，使用域名：[http://blog.bihe0832.com/](http://blog.bihe0832.com/)

最开始打算用腾讯云的静态托管，大概结合流量算了下，穷，不划算，还是在自己的服务器搭建吧。中间没想到竟然还是遇到了问题，简单总结下，文章重点介绍，环境搭建，基本上不涉及Jekyll相关的内容。如果想了解怎么基于 Jekyll搭建博客，可以参考文章：[使用 Jekyll 搭建技术博客](https://blog.bihe0832.com/jekyll.html)

## 环境

### 服务器环境

- 服务器：

		$ cat /proc/version
		Linux version 3.10.0-862.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-28) (GCC) ) #1 SMP Fri Apr 20 16:44:24 UTC 2018
		$ hostnamectl
		   Static hostname: VM_0_17_centos
		         Icon name: computer-vm
		           Chassis: vm
		        Machine ID: c28d40cbc8e3adcb4e32d9779a77b39e
		           Boot ID: 32408570e27148c5a18f1e0d97096680
		    Virtualization: kvm
		  Operating System: CentOS Linux 7 (Core)
		       CPE OS Name: cpe:/o:centos:centos:7
		            Kernel: Linux 3.10.0-862.el7.x86_64
		      Architecture: x86-64

### 环境部署

Jekyll 依赖Ruby，而且不同的OS 版本对于 Ruby的支持版本也不一样，经过多次尝试，发现下面的组合最合适。由于安装需要多个步骤，因此我在调试通以后直接把所有的步骤，写了一个shell 脚本。源码在：[https://github.com/bihe0832/Settings-Tools/tree/master/webInit](https://github.com/bihe0832/Settings-Tools/tree/master/webInit) ，建议使用前去 clone 最新的

	#!/bin/bash
	# author code@bihe0832.com
	
	function checkResult() {  
	   result=$?
	   echo "result : $result"
	   if [ $result -eq 0 ];then
	      echo "checkResult: execCommand succ"
	   else
	    echo "checkResult: execCommand failed"
	    exit $result
	   fi
	}  
	
	gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
	\curl -sSL https://get.rvm.io | bash -s stable
	source /etc/profile.d/rvm.sh
	rvm install ruby-2.4.1
	rvm 2.4.1 --default
	ruby -v
	rvm install rubygems 2.6.12 --force
	gem -v
	gem sources -l
	gem install jekyll bundler github-pages jekyll-paginate
	jekyll -v
	
	chmod 755 /usr/local/rvm/gems/ruby-2.4.1/bin/*

## 代码部署

这一步就是把你的Jekyll的代码 checkout到服务器。例如：

	git clone https://github.com/bihe0832/bihe0832.github.io.git 

## 编译构建

在项目根目录直接命令行运行 ` jekyll build ` 即可查看构建结果
	
	➜  blog git:(master) ✗/usr/local/rvm/gems/ruby-2.4.1/bin/jekyll build
	Already up-to-date.
	Configuration file: /bihe0832.github.io/_config.yml
	            Source: /bihe0832.github.io
	       Destination: /bihe0832.github.io/_site
	 Incremental build: disabled. Enable with --incremental
	      Generating... 
	                    done in 5.529 seconds.
	 Auto-regeneration: disabled. Use --watch to enable

如果构建没有报错，你就可以选择将构建结果 `_site ` 部署到你的服务器。

## 定时自动构建

这一步是所有的流程中仅次于环境部署的折腾的。由于有多个域名，因此我通过 crontab 自动 checkout 最新的代码并自动构建。结果发现就是不成功，最后通过不断完善日志终于解决。

在编译构建的时候，Shell中使用的命令是：

	/usr/local/rvm/gems/ruby-2.4.1/bin/jekyll build
	
如果你想要在 crontab 中自动构建，要把上面的bin  换为 wrappers ，也就是：

	/usr/local/rvm/gems/ruby-2.4.1/wrappers/jekyll build --incremental

