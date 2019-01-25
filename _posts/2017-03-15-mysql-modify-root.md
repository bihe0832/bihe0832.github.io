---
layout: post
title: Linux 下修改mysql的root密码
category: 后台开发
tags: mysql 工具
keywords: mysql root version service authentication_string password ERROR 1054  42S22
description: Unknown column 'password' in 'field list'
---

## 背景

服务部署在mysql上应该有好几个月了，因为现在的工作基本都在终端，因此很少登陆，今天要修改个东西，忽然发现我竟然已经彻底忘记了mysql的密码，去代码里面爬终于找到了业务数据库的密码，但是root密码还是没有找到，权限没法改呀，于是开始爬坑之旅，估计以后还会遇到，就整理记录一下。

### 系统参数
	
- 服务器
	
		$ cat /proc/version
		  Linux version 4.8.3-x86_64-linode76 (maker@build) (gcc version 4.7.2 (Debian 4.7.2-5) ) #1 SMP Thu Oct 20 19:05:39 EDT 2016
		  $ lsb_release -a
		  No LSB modules are available.
		  Distributor ID:	Ubuntu
		  Description:	Ubuntu 16.04.1 LTS
		  Release:	16.04
		  Codename:	xenial
	
- mysql

		mysql> show variables like "%version%";
		+-------------------------+-------------------------+
		| Variable_name           | Value                   |
		+-------------------------+-------------------------+
		| innodb_version          | 5.7.16                  |
		| protocol_version        | 10                      |
		| slave_type_conversions  |                         |
		| tls_version             | TLSv1,TLSv1.1           |
		| version                 | 5.7.16-0ubuntu0.16.04.1 |
		| version_comment         | (Ubuntu)                |
		| version_compile_machine | x86_64                  |
		| version_compile_os      | Linux                   |
		+-------------------------+-------------------------+

## 解决方案

以安全模式启动mysql，可以直接以root身份登录，然后重设密码。下面是具体步骤

- 停掉在运行的MySQL服务：

		sudo service mysql stop

- 以安全模式启动mysql：

		sudo mysqld_safe --skip-grant-tables --skip-networking &

- 直接用root登录，无需密码：

		mysql -u root

- 重设密码：

		mysql> use mysql;
		mysql> update user set authentication_string=password('password') where user='root';
		mysql> flush privileges;

- 退出mysql

		mysql > quit

- 重启mysql

		sudo service mysql restart

- 密码登录：

		mysql -u root -p

## 异常处理

### 修改密码报错，提示ERROR 1054 (42S22)

在修改密码的时候，网上比较多的文档都是提示输入一下命令修改：

		mysql> update user set password=PASSWORD("password") where User='root';

结果使用这个命令的时候报错：

		ERROR 1054 (42S22): Unknown column 'password' in 'field list'

原因是从mysql 5.7开始，password字段被替换为了`authentication_string`，可以使用下面的命令来修改

		update user set authentication_string=password('password') where user='root';
		
### 修改密码报错，提示ERROR 1064 (42000)

在iMac上使用上面的命令修改密码还是报错，提示：
		
	mysql> update user set authentication_string=password('password') where User='zixie';
	ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right 			syntax to use near '('zixie@2019') where User='zixie'' at line 1

怀疑是版本问题，查看版本如下：

	mysql> show variables like "%version%";
	+-------------------------+-----------------------+
	| Variable_name           | Value                 |
	+-------------------------+-----------------------+
	| innodb_version          | 8.0.13                |
	| protocol_version        | 10                    |
	| slave_type_conversions  |                       |
	| tls_version             | TLSv1,TLSv1.1,TLSv1.2 |
	| version                 | 8.0.13                |
	| version_comment         | Homebrew              |
	| version_compile_machine | x86_64                |
	| version_compile_os      | osx10.14              |
	| version_compile_zlib    | 1.2.11                |
	+-------------------------+-----------------------+
	
直接去google搜索`8.0.13 mysql modify password`，最终查询到已经又更换了命令：[https://dev.mysql.com/doc/refman/8.0/en/set-password.html](https://dev.mysql.com/doc/refman/8.0/en/set-password.html)，使用最新命令修改即可：

	mysql> SET PASSWORD FOR 'zixie'@'localhost'= 'auth_string';
	Query OK, 0 rows affected (0.03 sec)


### 修改密码后登录mysql失败，提示ERROR 2002 (HY000)

在修改密码并重启以后，登录mysql的时候竟然登录不了，提示

	ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)

搜索以后反馈是因为我安装了多个版本的mysql，顺序执行下面的命令即可解决。

- 查看运行的mysql

		ps -A|grep mysql

- kill运行的mysql

		sudo pkill mysql

- 查看运行的mysqld

		ps -A|grep mysqld

- kill运行的mysqld

		sudo pkill mysqld

- 重启mysql

		service mysql restart

- 登录mysql

		mysql -u root -p
