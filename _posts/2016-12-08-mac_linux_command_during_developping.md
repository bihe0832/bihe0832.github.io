---
layout: post
title: Linux & MacOS中一些常用命令备忘
category: 开发工具
tags: 常用工具 mac
keywords: keywords
description: 一些开发中经常要敲的命令，备忘一下懒得经常敲
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

## lsof

查看端口占用：

	➜  ~  sudo lsof -wni tcp:4000
	COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
	ruby    46559 zixie    9u  IPv4 0xbb90ea0c4aa06c0b      0t0  TCP 127.0.0.1:terabase (LISTEN)
	➜  ~