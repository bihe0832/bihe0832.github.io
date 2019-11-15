---
layout: post
title: iMac 使用自带的 Apache 启用本地web服务
category: 开发工具
tags: iMac
keywords: Apache iMac Forbidden permission  access permission server unable htaccess denying access
description: 在日常开发中有时候需要在本地启用web服务做一些测试，最近想直接用iMac自带的Apache，本以为很容易，结果启动过程中发现问题还挺多，汇总整理一下
---

在日常开发中有时候需要在本地启用web服务做一些测试，最近想直接用iMac自带的Apache，本以为很容易，结果启动过程中发现问题还挺多，汇总整理一下

## 确认 Apache 版本

由于不同的Apache的启动方式都不太一样，因此先确认下自己的iMac当前Apache的版本：

打开终端，输入 httpd -v 可以查看 Apache 版本

	➜  Sites  httpd -v
	Server version: Apache/2.4.34 (Unix)
	Server built:   Feb 22 2019 19:30:04
	➜  Sites

## 添加用户Web服务配置

#### 创建用户web服务跟目录

我将web服务的代码放在了` ~/zixie/web` 目录下

#### 给web服务目录分配访问权限

使用chmod给给web服务目录分配访问权限，切记如果存在软链接，在这里使用绝对路径。否则会导致启动以后提示没有访问权限。

	➜  web  sudo chmod -R 755 /zixie/web
	Password:
	
#### 配置虚拟主机

- 在终端运行`sudo vi /etc/apache2/httpd.conf`，打开Apche的配置文件
	
		➜  web  sudo vi /etc/apache2/httpd.conf
		Password:
		➜  web		
		
- 在httpd.conf中找到 `#Include /private/etc/apache2/extra/httpd-vhosts.conf`，去掉前面的“＃”，保存并退出。

- 运行`sudo vi /etc/apache2/extra/httpd-vhosts.conf`，配置虚拟主机：

		➜  web  sudo vi /etc/apache2/extra/httpd-vhosts.conf

	该文件中默认有两个配置，可以将其中一个注释了，只配置你需要的，我的最终配置如下：

		#<VirtualHost *:80>
		#    ServerAdmin webmaster@dummy-host.example.com
		#    DocumentRoot "/usr/docs/dummy-host.example.com"
		#    ServerName dummy-host.example.com
		#    ServerAlias www.dummy-host.example.com
		#    ErrorLog "/private/var/log/apache2/dummy-host.example.com-error_log"
		#    CustomLog "/private/var/log/apache2/dummy-host.example.com-access_log" common
		#</VirtualHost>
		
		<VirtualHost *:80>
		    DocumentRoot "/zixie/web"
		    ServerName local.bihe0832.com
		    ErrorLog "/private/var/log/apache2/local.bihe0832.com"
		    CustomLog "/private/var/log/apache2/local.bihe0832.com" common
		    <Directory />
		      Options Indexes MultiViews
			  AllowOverride All
			  # OSX 10.10 / Apache 2.4
			  Require all granted
		  </Directory>
		</VirtualHost>
		
- **备注：在添加`DocumentRoot`时切记不要使用软链接，如果路径存在软链接，请修改为绝对链接。否则会导致出现以下两种403没有权限的错误。**
		
		Forbidden
		You don't have permission to access /index.html on this server.
		
	或者
	
		You don't have permission to access /index.html on this server.
		Server unable to read htaccess file, denying access to be safe

## 配置本地Host

将上方配置的ServerName添加到本地的host文件，运行`sudo vi /etc/hosts`，打开hosts配置文件

	➜  web  sudo vi /etc/hosts

在文件中添加一行配置

	127.0.0.1 local.bihe0832.com

## 启动 Apache

在终端输入 `sudo apachectl start` 即可启动 Apache。

停止 Apache：`sudo apachectl stop`

重启 Apache：`sudo apachectl restart`

测试配置是否有误：`sudo apachectl -t`
