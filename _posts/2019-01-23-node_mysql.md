---
layout: post
title: nodejs入门之连接mysql
category: 后台开发
tags: tags
keywords: node mysql ER_NOT_SUPPORTED_AUTH_MODE 1396
description: 总结node链接mysql相关的各种问题
---
最近工作项目有调整，需要熟悉一些前端的内容，就顺便看看node，同时边学习边总结一下。这篇文章主要总结node链接mysql相关的各种问题。

### 示例Demo

- 准备环境：
	
		➜  1  mkdir node-mysql
		➜  1  cd node-mysql
		➜  node-mysql  tnpm install mysql
		npm WARN saveError ENOENT: no such file or directory, open '/Volumes/Document/Document/temp/1/node-mysql/package.json'
		npm WARN enoent ENOENT: no such file or directory, open '/Volumes/Document/Document/temp/1/node-mysql/package.json'
		npm WARN node-mysql No description
		npm WARN node-mysql No repository field.
		npm WARN node-mysql No README data
		npm WARN node-mysql No license field.
		
		+ mysql@2.16.0
		added 11 packages from 15 contributors and audited 13 packages in 1.524s
		found 0 vulnerabilities
		
		➜  node-mysql  touch demo.js

- 准备事例代码，在`demo.js`中增加下面的代码

		var mysql = require('mysql');

		var con = mysql.createConnection({
		  host: "127.0.0.1",
		  user: "zixie",
		  password: "zixie"
		});
		
		con.connect(function(err) {
			if (err) {
				throw err;
			}else{
				console.log("Connected to zixie!");
			}
		});
		
		con.query('SELECT 1 + 1 AS solution', function (err, results, fields) {
		  	if (err) {
				throw err;
			}else{
				console.log('The solution is: ', results[0].solution);
			}
		});

- 运行测试效果：

		➜  node-mysql  node demo.js
		Connected to zixie!
		The solution is:  2

### 异常处理

- 1. 连接mysql失败，报错：`ER_NOT_SUPPORTED_AUTH_MODE`或添加权限出错

	- 可能错误信息1
	
	        throw err; // Rethrow non-MySQL errors
	        ^
	
			Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
			
	- 可能错误信息2
		
			mysql> ALTER USER 'zixie'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zixie';
			ERROR 1396 (HY000): Operation ALTER USER failed for 'zixie'@'localhost'
			
	- 解决方案
	
		root登录登录mysql，并查看用户信息
	
			➜  1  mysql -uroot -p
			Enter password:
			Welcome to the MySQL monitor.  Commands end with ; or \g.
			Your MySQL connection id is 39
			Server version: 8.0.13 Homebrew
			
			Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
			
			Oracle is a registered trademark of Oracle Corporation and/or its
			affiliates. Other names may be trademarks of their respective
			owners.
			
			Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
			
			mysql> ALTER USER 'zixie'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zixie';
			ERROR 1396 (HY000): Operation ALTER USER failed for 'zixie'@'localhost'
			mysql> use mysql
			Reading table information for completion of table and column names
			You can turn off this feature to get a quicker startup with -A
			
			Database changed
			mysql> select user,host from user;
			+------------------+-----------+
			| user             | host      |
			+------------------+-----------+
			| zixie            | %         |
			| mysql.infoschema | localhost |
			| mysql.session    | localhost |
			| mysql.sys        | localhost |
			| root             | localhost |
			+------------------+-----------+
			5 rows in set (0.00 sec)
		
		找到自己对应的账号，然后执行下面的授权命令，切记账号和host要对应：
	
		
			ALTER USER 'USERNAME'@'HOST' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
	
		例如
	
			mysql> ALTER USER 'zixie'@'%' IDENTIFIED WITH mysql_native_password BY 'zixie';
			Query OK, 0 rows affected (0.10 sec)
			
			mysql>