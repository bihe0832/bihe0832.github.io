---
layout: post
title: mysql迁移之新建用户、备份还原数据库
category: 后台开发
tags: tags
keywords: mysql backup mysqldump
description: 最近要把之前的一个项目迁移到云上，涉及到数据库迁移，然后发现太久没搞很多都忘了，就变搞边整理一下吧
---

最近要把之前的一个项目迁移到云上，涉及到数据库迁移，然后发现太久没搞很多都忘了，就变搞边整理一下吧

## 导出数据

### 备份数据

- 操作命令：

		mysqldump -uUSERNAME -pPASSWORD DBNAME > FILENAME.sql

- 具体事例：

		zixie-vps# mysqldump -uzixie -p'zixie' zixieDB > zixie_back.sql
		mysqldump: [Warning] Using a password on the command line interface can be inse.
		zixie-vps# ll
		total 5452
		-rw-r--r-- 1 root root 5580687 Jan 23 12:53 zixie_back.sql.sql

### 下载备份

- 操作命令：

		scp -P PORT -r USERNAME@HOST:PATH LOCALPATH

- 具体事例：

		➜  1  scp -r root@127.0.0.1:/temp/zixie_back.sql ./
		
## 新建用户

### 操作步骤

- root账号登录mysql

		➜  1  mysql -uroot -p
		Enter password:
		Welcome to the MySQL monitor.  Commands end with ; or \g.
		Your MySQL connection id is 8
		Server version: 8.0.13 Homebrew
		
		Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
		
		Oracle is a registered trademark of Oracle Corporation and/or its
		affiliates. Other names may be trademarks of their respective
		owners.
		
		Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
		
		mysql>

- 新增用户	

	- 命令:
	
			CREATE USER 'USERNAME'@'HOST' IDENTIFIED BY 'PASSWORD';
	
	- 说明：HOST指定该用户在哪个主机上可以登陆，如果是本地用户用localhost，如果可以从任意远程主机登陆，可以使用通配符%

	- 事例
	
			mysql> CREATE USER 'zixie'@'%' IDENTIFIED BY 'zixie';
			Query OK, 0 rows affected (0.10 sec)
			
			mysql> select User from mysql.user where User='zixie';
			+-------+
			| User  |
			+-------+
			| zixie |
			+-------+
			1 row in set (0.00 sec)

			mysql>
- 授权访问

	- 命令:

			GRANT PRIVILEGES ON DBNAME.TABLENAME TO 'USERNAME'@'HOST' WITH GRANT OPTION;

	- 说明:

		- PRIVILEGES是用户的操作权限，如SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL
		- DBNAME.TABLENAME是要授权的数据库和表，如果给不限制用*表示
		- WITH GRANT OPTION表示该用户还阔以给其余用户授权

	- 事例

			mysql> GRANT ALL ON *.* TO 'zixie'@'%';
			Query OK, 0 rows affected (0.12 sec)
			
			mysql> flush privileges;
			Query OK, 0 rows affected (0.01 sec)
			
			mysql>
			
### 异常情况

- 使用root用户登录，提示 Can't connect to local MySQL server through socket '/tmp/mysql.sock'

	- 事例：
	
			➜  1  mysql -uroot -p""
			Enter password:
			ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
	
	
	- 原因：你的mysql还没有启动，阔以使用`mysql.server start`启动
	- 解决方案：
	
			➜  1  mysql.server start
			Starting MySQL
			.. SUCCESS!
			➜  1  mysql -uroot -p
			Enter password:
			Welcome to the MySQL monitor.  Commands end with ; or \g.
			Your MySQL connection id is 8
			Server version: 8.0.13 Homebrew
			
			Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
			
			Oracle is a registered trademark of Oracle Corporation and/or its
			affiliates. Other names may be trademarks of their respective
			owners.
			
			Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
			
			mysql>
			
- 忘记root密码，可以参照文档：[Linux 下修改mysql的root密码](http://blog.bihe0832.com/mysql-modify-root.html)

## 新建DB，导入数据

- 登录新的数据库，并新建DB，设置字符集

	
		➜  1  mysql -uzixie -p"zixie"
		mysql: [Warning] Using a password on the command line interface can be insecure.
		Welcome to the MySQL monitor.  Commands end with ; or \g.
		Your MySQL connection id is 28
		Server version: 8.0.13 Homebrew
		
		Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
		
		Oracle is a registered trademark of Oracle Corporation and/or its
		affiliates. Other names may be trademarks of their respective
		owners.
		
		Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
		
		mysql> create database game;
		Query OK, 1 row affected (0.09 sec)
		
		mysql> use game;
		Database changed
		mysql> set names utf8;
		Query OK, 0 rows affected, 1 warning (0.00 sec)
		
		mysql> exit;
		
- 导入数据

	- 命令:
	
			mysql -uUSERNAME -pPASSWORD DBNAME < FILENAME.sql
	
	- 事例

			➜  1  mysql -uzixie -p'zixie' game < /temp/zixie_back.sql
			mysql: [Warning] Using a password on the command line interface can be insecure.
			➜  1  mysql -uzixie -p"zixie"
			mysql: [Warning] Using a password on the command line interface can be insecure.
			Welcome to the MySQL monitor.  Commands end with ; or \g.
			Your MySQL connection id is 30
			Server version: 8.0.13 Homebrew
			
			Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
			
			Oracle is a registered trademark of Oracle Corporation and/or its
			affiliates. Other names may be trademarks of their respective
			owners.
			
			Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
			
			mysql> use game;
			Reading table information for completion of table and column names
			You can turn off this feature to get a quicker startup with -A
			
			Database changed
			mysql> show tables;
			+----------------+
			| Tables_in_game |
			+----------------+
			| t_admin        |
			| t_adventure    |
			| t_advice       |
			| t_game         |
			| t_player       |
			| t_statistic    |
			| t_tips         |
			| t_userinput    |
			| t_vampire      |
			| t_vampirenum   |
			| t_vampiretimes |
			| t_vampirewords |
			+----------------+
			12 rows in set (0.00 sec)
			
			mysql>	
			