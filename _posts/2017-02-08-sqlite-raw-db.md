---
layout: post
title: 如何随apk一起打包并使用SQLite
category: 终端开发
tags: androir sqlite
keywords: android sqlite
description: desc
---

## 背景

最近在开发摇吧的过程需要在应用发布的时候就顺便把应用相关的数据库一起发布，写完以后专门写了这篇文章总结一下。

- 开发环境

	- macOS：Sierra 10.12.1
	- SQLite：3.9.2
	- JDK：1.8.0_77
	- shell：zsh

- 对应源码：

	shakeba：[https://github.com/bihe0832/Shakeba](https://github.com/bihe0832/Shakeba)

- SQLite SQL语法

	[`https://www.tutorialspoint.com/sqlite/sqlite_data_types.htm`](https://www.tutorialspoint.com/sqlite/sqlite_data_types.htm)

## 准备数据库

### 创建数据表

- 创建DB文件

	在shell中输入下面的命令创建db.

		➜  1  sqlite3 shakeba.db
		SQLite version 3.9.2 2015-11-02 18:31:45
		Enter ".help" for usage hints.

- 查看DB信息

	继续输入下面的命令，即可看到创建的db将会保存的位置，另外可以发现sqlite会默认创建名为main的数据库。
	
		sqlite> .databases
		seq  name             file
		---  ---------------  ----------------------------------------------------------
		0    main             /Volumes/Document/Document/temp/1/shakeba.db

- 关联DB

	开发中可能并不想直接用默认的数据库名，可以通过ATTACH关联自定义的名称。例如
	
		sqlite> ATTACH DATABASE 'shakeba.db' as shakeba;
		sqlite> .databases
		seq  name             file
		---  ---------------  ----------------------------------------------------------
		0    main             /Volumes/Document/Document/temp/1/shakeba.db
		2    shakeba          /Volumes/Document/Document/temp/1/shakeba.db	
这样就可以按照自定义的数据库名来操作了。

### 添加数据

- 添加默认表

	为了防止android程序出错，需要在shakeba.db中创建表android_metadata，并插入一行数据具体命令如下：
		
		sqlite> CREATE TABLE "android_metadata" ("locale" TEXT DEFAULT 'zh_CN');
		sqlite> INSERT INTO "android_metadata" VALUES ('zh_CN');

	通过查看表确实已经创建好，而且内容OK
	
		sqlite> .tables
		android_metadata
		sqlite> .header on
		sqlite> select * from android_metadata;
		locale
		zh_CN

- 添加个人表

	这部分内容主要是添加应用相关的数据表，简单举例：
	
		DROP TABLE IF EXISTS "t_adventure";
		CREATE TABLE "t_adventure" (
			"id" INT PRIMARY KEY NOT NULL,
			"item_type" SMALLINT NOT NULL DEFAULT 1,
			"item_category" SMALLINT NOT NULL DEFAULT 1,
			"content" NVARCHAR(4096) NOT NULL DEFAULT ""
		);
		
	添加数据
		
		INSERT INTO "t_adventure" VALUES 
		(1,2,'1','背一位异性绕场一周'),
		(3,2,'1','做一个大家都满意的鬼脸'),
		(4,2,'2','抱一位异性直到下一轮真心话大冒险结束');

至此就已经完成了前期的数据库文件的准备。

### 定义版本号

为了保证二进制的数据文件与代码使用的一致，可以在二进制的数据文件中定义数据库的版本号，在应用初始化的时候对比版本号是否一致，如果一致再拷贝使用。

	PRAGMA shakeba.user_version = 1;

## 集成数据库到APK

将前面创建好的数据库放在项目工程下源码的/res/raw路径下。至此我们就完成了前期的db的准备并添加到项目中，接下来就是数据处理相关的内容。

## 数据操作

### 拷贝DB

因为raw中的db无法直接访问，因此我们在应用初始化的时候要先把db拷贝到应用的私有目录 getApplicationContext().getDatabasePath(`DATABASE_NAME`)中。

- 具体代码

		InputStream myInput = Shakeba.getInstance().getApplicationContext().getResources().openRawResource(getRawDatabaseResID());

        File file = Shakeba.getInstance().getApplicationContext().getDatabasePath(getDatabaseName());

        if (!file.exists()) {
            try {
                OutputStream myOutput = new FileOutputStream(file);

                byte[] buffer = new byte[1024];
                int length;
                while ((length = myInput.read(buffer))>0){
                    myOutput.write(buffer, 0, length);
                }
                myOutput.close();
                myInput.close();
                mIsDBOK = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
- 代码位置

	在shakeba项目中，这部分逻辑在com.bihe0832.shakeba.framework.database.BaseRawDatabaseHelper中实现
	
### 增删改查

在上面的拷贝DB的动作完成以后，原本打包在APK中的db就已经拷贝到了应用私有目录下，此时对于数据库的增删改查的操作就和正常的使用SQLiteOpenHelper的操作一致了，因此不再特别说明。这部分内容可以参考shakeba项目的以下代码：

- `com.bihe0832.shakeba.framework.database.*`
- `com.bihe0832.shakeba.module.game.adventure.AdventureTableModel`