---
layout: post
title: iMac（OS X）常用开发工具介绍
category: 开发工具
tags: 工具 iMac
keywords: 包管理 Homebrew 流程图 Gliffy Diagrams 抓包 网络代理 chairs   Fiddler 快速启动工具 Alfred 终极 Shell zsh 最强终端 iTerm 订阅管理 Reeder
description: 主要介绍iMac下提高效率的一些工具，包括：Homebrew、Alfred、zsh、iTerm2、Charles & Fiddler等
---

工欲善其事，必先利其器。每个程序员都会有一套自己喜欢的，适用自己的提供工作效率的工具。之前每次换电脑总是要折腾一次，总会遗漏一些，这次就统一整理一下。这里主要介绍iMac下的一些提高效率或者很好用的工具。

### 包管理：Homebrew

主要用来安装一些开源软件，简化了开源软件的安装过程。Mac系统上主要的包管理有Macport和Homebrew，两者的区别主要是对依赖包处理方式不一样，MacPorts是下载所有依赖库的源代码，本地编译安装所有依赖，Homebrew是尽量查找本地依赖库，然后下载包源代码编译按照。

- 官网：

	[http://brew.sh/index_zh-cn.html](http://brew.sh/index_zh-cn.html)
- github：

	[https://github.com/Homebrew/homebrew](https://github.com/Homebrew/homebrew)

- 安装及使用方法：

	[http://blog.bihe0832.com/Homebrew.html](http://blog.bihe0832.com/homebrew.html)

### 快速启动工具：Alfred

Mac下一款完美替代spotlight的工具，可以快速的搜索本地程序、使用搜索引擎搜索、查询词典、发送邮件、查找文件、剪贴板 管理、音乐控制等等功能，十分强大。

- 官网地址：

	[http://www.alfredapp.com/](http://www.alfredapp.com/)

- 使用手册：

	和spotlight一样，无需什么手册

- 高阶用法：

	[http://www.zhihu.com/question/20656680](http://www.zhihu.com/question/20656680)

### 最强终端：iTerm2

- iterm的一些主要优点：

   * 兼容性好
   * 快捷键丰富，自带/自己定义都很方便
   * 分屏简单方便，可以根据自己需要同时搭配上tmux，大屏用起来爽到爆  （分屏只需要 command ＋（shift）＋ d）
   
- 常用的快捷键和功能：

  1. ⌘ + 数字         ： 各 tab 标签切换
  2. ⌘ + f              ： 查找 ，所查找的内容会被自动复制 ,输入查找的部分字符，找到匹配的值按tab，即可复制
  3. ⌘ + d             ： 横着分屏 
  4. ⌘ + shift + d  ： 竖着分屏
  5. ⌘ + r = clear  ： 换到新一屏，而不是 类似clear ，会创建一个空屏
  6. ctrl + u            ：清空当前行，无论光标在什么位置
  7. (**) + ⌘ + ;     ： [(**) 输入的命令开头字符],会自动列出输入过的命令
  8. ⌘ + shift + h  ： 会列出剪切板历史
  9. ⌘← / ⌘→       :   到一行命令最左边/最右边 
  10. ⌘ + enter        :   全屏 
  
- 官网地址：

	[http://iterm2.com/](http://iterm2.com/)

- 使用手册：

	貌似有上面的快捷键就够了
	
- 个性化设置：

	目前关于iTerm的个性化设置，都保存在 [https://github.com/bihe0832/Settings-Tools/raw/master/config/mac/Profiles.json](https://github.com/bihe0832/Settings-Tools/raw/master/config/mac/Profiles.json)，直接import即可。
	
	最近看到一个皮卡丘的主题，发现还挺好看，专门整理一下怎么切换设置
	
	- 下载并安装主题：

			cd ~/zixie/github/ && git clone https://github.com/zixieTools/Pokemon-Terminal.git && cd Pokemon-Terminal && python3.7 setup.py install
	
	- 应用主题：

			pokemon pikachu

	- 主题包含很多个设置，具体设置，可以参考shell [https://github.com/bihe0832/Settings-Tools/config/mac/pokemon-terminal.sh](https://github.com/bihe0832/Settings-Tools/config/mac/pokemon-terminal.sh)

### 终极 Shell：zsh

Zsh是一款强大的虚拟终端，既是一个系统的虚拟终端，也可以作为一个脚本语言的交互解析器。它在兼容Bash的同时有如下优点：更快、优化了的自动补全、优化的模式识别、Improved array handling、全面可定制。

- 使用方法：

	网上有很多，自行google。后续自己出一个。

- 切换方法：

	输入命令查看系统支持的shell以及当前使用的shell：

		➜  ~  cat /etc/shells
		# List of acceptable shells for chpass(1).
		# Ftpd will not allow users to connect who are not using
		# one of these shells.
		
		/bin/bash
		/bin/csh
		/bin/ksh
		/bin/sh
		/bin/tcsh
		/bin/zsh
		➜  ~  echo $SHELL
		/bin/bash

	可以看到系统默认的shell还是bash，而且Mac已经支持了zsh，因此只需要执行下面的命令切换即可：

		➜  ~  chsh -s /bin/zsh
		Changing shell for zixie.
		Password for zixie:
	
	切换以后，关闭并重启终端，运行命令查看已经切换为zsh了。
	
		➜  ~  echo $SHELL
		/bin/zsh

- 增加自定义配置 

	由于个人已经把自己常用的各种环境配置等使用了专门的github仓库来管理，因此这一步就需要去github仓库clone对应的开发配置。包括：zsh的配置、环境变量配置等。将配置clone到`~/zixie/github`以后，执行下面的命令设置并生效配置：

		wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
		cp -fr ~/zixie/github/Settings-Tools/config/mac/.zshrc ~/.zshrc
		source ~/.zshrc

- 个人配置：
	
	- 配置对应github：[https://github.com/bihe0832/Settings-Tools](https://github.com/bihe0832/Settings-Tools)
	

### 抓包：Charles & Fiddler

总的一句话：mac下Charles和windows下的Fiddler绝对是你最爱的抓包工具。


- Charles官网地址：

	[http://www.charlesproxy.com/](http://www.charlesproxy.com/)

- Charles使用方法：

	[http://drops.wooyun.org/tips/2423](http://drops.wooyun.org/tips/2423)

- Fiddler官网地址：

	[http://www.telerik.com/fiddler](http://www.telerik.com/fiddler)

- Fiddler使用方法：

	[http://blog.csdn.net/ihadl/article/details/7415904](http://blog.csdn.net/ihadl/article/details/7415904)

**备注：**上面附的关于chairs和fiddler的使用方法是随机找了，大概浏览还可以的。个人使用太久了，当时参考的博客找不到了。不过类似的网上很多


### 网络代理设置：

- 日常开发中各种代理设置方法汇总（shell、Android Studio、gem、npm）：[http://blog.bihe0832.com/proxy.html](http://blog.bihe0832.com/proxy.html)

### 订阅管理：Reeder

在Google Reader关闭服务后，Feedly、Digg reader等产品异军突起，纷纷抢占这一市场。目前使用最爽的还是Reeder 2。

- 官网地址：

	[http://reederapp.com/](http://reederapp.com/)

- 个人RSS：

	[https://github.com/bihe0832/Settings-Tools/blob/master/xml/Subscriptions.opml](https://github.com/bihe0832/Settings-Tools/blob/master/xml/Subscriptions.opml)
