---
layout: post
title: iMac配置基于crontab的定时任务
category: 开发必备
tags: tags
keywords: iMac crontab 恢复模式  "/usr/bin/vi" exited with status 1 Operation not permitted Rootless
description: 最近工作过程中需要跑一些定时任务，之前都是放在服务器上，这次的因为比较零散，就打算在iMac上自己跑，本来以为会很简单，结果发现竟然需要一番折腾，因此专门总结一下。尤其是里面有些步骤比如恢复模式，没有权限，查看启动项等，后续还是会遇到。
---

最近工作过程中需要跑一些定时任务，之前都是放在服务器上，这次的因为比较零散，就打算在iMac上自己跑，本来以为会很简单，结果发现竟然需要一番折腾，因此专门总结一下。尤其是里面有些步骤比如恢复模式，没有权限，查看启动项等，后续还是会遇到。

这篇文章只介绍配置crontab时遇到的问题，不介绍crontab相关的内容。个人会按照自己遇到问题的顺序，一步一步来介绍：

首先查看一下并创建一条crontab，结果发现失败了，报错如下：


	➜  temp  crontab -l
	crontab: no crontab for zixie
	➜  temp  crontab -e
	crontab: no crontab for zixie - using an empty one
	crontab: "/usr/bin/vi" exited with status 1
	
这个问题的原因是我们切换了系统默认的shell，但是没有配置默认的编辑器，在对应shell的配置文件（例如：bash的.bash_profile，zsh的.zshrc）添加下面的配置

	export EDITOR=vim

然后重启终端，所以重新加载配置，例如：

	➜  temp  source ~/.zshrc
		
然后再重新执行crontab

	➜  temp  crontab -e
	crontab: no crontab for zixie - using an empty one
	crontab: installing new crontab	

然后发现，到点以后竟然没有执行，没有启动。结合google的结果得知，OS X的定时任务统统都由 launchctl 来管理了，就看看 cron 任务有没有在里面，切换到LaunchAgents，执行下面的命令：

	➜  temp  cd ~/Library/LaunchAgents
	➜  LaunchAgents  ls
	com.adobe.GC.Invoker-1.0.plist com.alipay.refresher.plist
	➜  LaunchAgents  sudo launchctl list | grep cron
	Password:
	-	0	com.vix.cron

可以看到OS X的定时任务包含了cron，然后检查一下这个的启动项：
	
	➜  LaunchAgents  locate com.vix.cron
	
	WARNING: The locate database (/var/db/locate.database) does not exist.
	To create the database, run the following command:
	
	  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist
	
	Please be aware that the database can take some time to generate; once
	the database has been created, this message will no longer appear.
	
结果发现和大部分博客的结果都不一样，然后根据系统提示，键入命令：

	➜  LaunchAgents  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist
	
然后发现这个过程会持续几分钟，我在中途继续尝试查看启动项，发现还是一样的提示，然后再次load他也会提示已经在load：
	
	➜  LaunchAgents  locate com.vix.cron
	
	WARNING: The locate database (/var/db/locate.database) does not exist.
	To create the database, run the following command:
	
	  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist
	
	Please be aware that the database can take some time to generate; once
	the database has been created, this message will no longer appear.
	
	➜  LaunchAgents  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist
	/System/Library/LaunchDaemons/com.apple.locate.plist: service already loaded

在等待一段时间以后，再次键入命令，终于出现了预期的结果

	➜  LaunchAgents  locate com.vix.cron
	/System/Library/LaunchDaemons/com.vix.cron.plist
	➜  LaunchAgents  locate com.vix.cron
	/System/Library/LaunchDaemons/com.vix.cron.plist
	
输入命令查看启动项的具体内容，发现同样和其余文章一样提示需要存在`etc/crontab`文件
	
	➜  LaunchAgents  cat /System/Library/LaunchDaemons/com.vix.cron.plist
	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN"
		"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
	<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>com.vix.cron</string>
		<key>ProgramArguments</key>
		<array>
			<string>/usr/sbin/cron</string>
		</array>
		<key>KeepAlive</key>
		<dict>
			<key>PathState</key>
			<dict>
				<key>/etc/crontab</key>
				<true/>
			</dict>
		</dict>
		<key>QueueDirectories</key>
		<array>
			<string>/usr/lib/cron/tabs</string>
		</array>
		<key>EnableTransactions</key>
		<true/>
	</dict>
	</plist>
	
然后查看文件，果然不存在，那就新建一个，结果报错了~

	➜  LaunchAgents  cat /etc/crontab
	ls: /etc/crontab: No such file or directory
	➜  LaunchAgents   sudo touch /etc/crontab
	touch: /etc/crontab: Operation not permitted
	
再次谷歌，然后发现从El Capitan起，OS X 加入了Rootless机制，对于一些特殊路径增加了保护，即使root 权限也不可以操作，只好尝试关闭 Rootless。

根据苹果官网介绍([https://support.apple.com/zh-cn/HT201314](https://support.apple.com/zh-cn/HT201314))，重启iMac，按住 Command + R，直到看到 Apple 标志或旋转的地球，等到看到“实用工具”窗口时，启动即完成，进入macOS 恢复功能。点击页面左上角菜单栏中的“实用工具”菜单，选择进入终端，然后键入下面的命令：

	csrutil disable
	
然后重启电脑。此时再次尝试新建文件：

	➜  LaunchAgents  sudo touch /etc/crontab
	Password:
	
发现已经阔以了，然后重新配置crontab.
	
	➜  LaunchAgents  crontab -e
	crontab: no crontab for zixie - using an empty one
	crontab: installing new crontab
	➜  LaunchAgents  crontab -l
	* * * * * /bin/bash ~/zixie/temp/test.sh
	
然后等一分钟以后，发现成功执行，至此终于完成了iMac上的crontab配置
