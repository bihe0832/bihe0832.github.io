---
layout: post
title: Linux & MacOS中一些常用命令备忘
category: 开发工具
tags: 常用工具 mac
keywords: xargs find kill crontab chmod chown pbcopy pbpaste open screencapture lsof 
description: 一些开发中经常要敲的命令，备忘一下懒得经常敲
recommand: true
---

## 通用

### xargs：

xargs命令是给其他命令传递参数的一个过滤器，也是组合多个命令的一个工具。

- 格式转换：

	xargs的默认命令是echo，空格是默认定界符。这意味着**通过管道传递给xargs的输入的换行和空白将被空格取代**。

		➜	adb devices | tail -n +2 | cut -sf 1
		1727da5c
		84B5T15B03010873
		➜	adb devices | tail -n +2 | cut -sf 1 | xargs
		1727da5c 84B5T15B03010873
		
		➜	echo "sd    v \n sdsd    s   sd\n    dsd"
		sd    v
		 sdsd    s   sd
		    dsd
		➜	echo "sd    v \n sdsd    s   sd\n    dsd" | xargs
		sd v sdsd s sd dsd

- 将xargs过滤的参数作为下一个命令的参数

		➜	adb devices | tail -n +2 | cut -sf 1 | xargs -I {} echo "设备："{}
		设备：84B5T15B03010873
		设备：1727da5c

- 每次执行前都询问是否执行，用y和n来选择是否执行

		➜	adb devices | tail -n +2 | cut -sf 1 | xargs -I {} -p echo "设备："{}
		echo 设备：84B5T15B03010873?...n
		echo 设备：1727da5c?...y
		设备：1727da5c

### find：

	find PATH -name 'NAME' 支持通配符

### grep:


- 以xxx开头：` ^`

	`ls -l | grep ^xxx`  	过滤出以d开头的内容
	
	`ls -l | grep ^_`  		过滤出所有以下划线_开头的

	`ls -l | grep -v ^_` 	将下划线开头的不显示

- 以xxx结尾：`$`

	`ls -f | grep .apk$`   	过滤出以.apk结尾的内容
 
- 空行：`^$`

- 任意一个字符：`.`

### kill
		
- kill -9 pid

	强行在运行时突然终止，进程在结束后不能自我清理。危害是导致系统资源无法正常释放，一般不推荐使用，除非其他办法都无效。

- kill -HUP PID

	缓的执行进程关闭，然后立即重启。在对配置文件修改后需要重启进程时就可以执行此命令。

- kill -l PID

	kill命令用好像启动进程的用户已注销的方式结束进程。当使用该选项时，kill命令也试图杀死所留下的子进程。但这个命令也不是总能成功--或许仍然需要先手工杀死子进程，然后再杀死父进程。

### chmod

chmod命令用于改变linux系统文件或目录的访问权限。用它控制文件或目录的访问权限。文件或目录的访问权限分为只读，只写和可执行三种。

- 必要参数：
	- -c 当发生改变时，报告处理信息
	- -f 错误信息不输出
	- -R 处理指定目录以及其子目录下的所有文件
	- -v 运行时显示详细处理信息

- 权限范围：
	- u ：目录或者文件的当前的用户
	- g ：目录或者文件的当前的群组
	- o ：除了目录或者文件的当前用户或群组之外的用户或者群组
	- a ：所有的用户及群组

- 权限代号：
	- r ：读权限，用数字4表示
	- w ：写权限，用数字2表示
	- x ：执行权限，用数字1表示
	- - ：删除权限，用数字0表示

- 事例：
	
		chmod a+x FILE
		chmod -R a+x PATH

### chown

chown将指定文件的拥有者改为指定的用户或组，用户可以是用户名或者用户ID；组可以是组名或者组ID；文件是以空格分开的要改变权限的文件列表，支持通配符。

- 必要参数:

 - -c 显示更改的部分的信息
 - -f 忽略错误信息
 - -h 修复符号链接
 - -R 处理指定目录以及其子目录下的所有文件
 - -v 显示详细的处理信息

- 选择参数:
	- --reference=<目录或文件> 把指定的目录/文件作为参考，把操作的文件/目录设置成参考文件/目录相同拥有者和群组
	- --from=<当前用户：当前群组> 只有当前用户和群组跟指定的用户和群组相同时才进行改变
	- --help 显示帮助信息
	- --version 显示版本信息

- 事例：

		chown -R -v USER:GROUP PATH
		chown USER:GROUP FILE

### xxd

xxd命令主要用来查看文件对应的十六进制形式，也可以讲文件对应的十六进制形式输出到一个指定的文件

- 选择参数:

	- -a : 它的作用是自动跳过空白内容，默认是关闭的
	
	- -c : 它的后面加上数字表示每行显示多少字节的十六进制数，默认是16bytes，最大是256bytes
	
	- -g : 设定以几个字节为一块，默认为2bytes
	
	- -l : 显示多少字节的内容
	
	- -s : 后面接【+-】和address。“+”表示从地址处开始的内容，“-”表示距末尾address开始的内容
	
	- -b:以二进制（0 or 1）的形式查看文件内容

- 事例：

		xxd -g 1 -c 48 ~/a.jpg > ~/zixie/temp/jpg.log


### crontab 

crontab 是用来让使用者在固定时间或固定间隔执行程序。

- 参数说明：

	-e : 执行文字编辑器来设定时程表，内定的文字编辑器是 VI，如果你想用别的文字编辑器，则请先设定 VISUAL 环境变数来指定使用那个文字编辑器(比如说 setenv VISUAL joe)
	
	-r : 删除目前的时程表
	
	-l : 列出目前的时程表

- 时间格式如下：

	f1 f2 f3 f4 f5 program
		
	其中 f1 是表示分钟，f2 表示小时，f3 表示一个月份中的第几日，f4 表示月份，f5 表示一个星期中的第几天。program 表示要执行的程序。
		
	当 f1 为 * 时表示每分钟都要执行 program，f2 为 * 时表示每小时都要执行程序，其它类推
		
	当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行，f2 为 a-b 时表示从第 a 到第 b 小时都要执行，其它类推
		
	当 f1 为 */n 时表示每 n 分钟个时间间隔执行一次，f2 为 */n 表示每 n 小时个时间间隔执行一次，其它类推
		
	当 f1 为 a, b, c,... 时表示第 a, b, c,... 分钟要执行，f2 为 a, b, c,... 时表示第 a, b, c...个小时要执行，其它类推
	
		*    *    *    *    *
		-    -    -    -    -
		|    |    |    |    |
		|    |    |    |    +----- 星期中星期几 (0 - 7) (星期天 为0)
		|    |    |    +---------- 月份 (1 - 12) 
		|    |    +--------------- 一个月中的第几天 (1 - 31)
		|    +-------------------- 小时 (0 - 23)
		+------------------------- 分钟 (0 - 59)
		
	使用者也可以将所有的设定先存放在文件中，用 crontab file 的方式来设定执行时间。

- 在线测试：[https://crontab.guru/](https://crontab.guru/)

## lsof

查看端口占用：

	➜  ~  sudo lsof -wni tcp:4000
	COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
	ruby    46559 zixie    9u  IPv4 0xbb90ea0c4aa06c0b      0t0  TCP 127.0.0.1:terabase (LISTEN)
	➜  ~ lsof -wni :5037
	
常用端口：

- 5037 ： ADB

## unzip 

查看压缩包是否包含指定文件：

	$ unzip -l your_app.apk | grep channel.ini

## MAC

### pbcopy & pbpaste

这两个工具可以打通命令行和剪贴板，将这两个工具用作管道、IO重定向以及和其他命令的整合。例如：

	$ ls ~ | pbcopy
	$ pbcopy < blogpost.txt
	$ pbpaste >> tasklist.txt

### open

	open -n /Applications/eclipse/Eclipse.app/


### screencapture

screencapture命令可以截图。和Grab.app与cmd + shift + 3或cmd + shift + 4热键相似，但更加的灵活。

- 用鼠标选择一个矩形范围并包含光标的范围，并复制到剪贴板，同时在preview打开

		$ screencapture -s -c -C -P /tmp/screen.png

- 用鼠标选择抓取窗口（及阴影）的截图并复制到剪贴板


		$ screencapture -W -c -C -P /tmp/screen.png
