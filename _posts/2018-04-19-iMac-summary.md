---
layout: post
title: iMac（OS X）开发和使用中经验汇总（持续更新）
category: 开发必备
tags: iMac
keywords: iMac 经验 gem 
description: 个人写的所有关于iMac相关的文章汇总
---

最近有时候在开发或者使用mac的过程中总会遇到一些坑，每次都要专门去搜索引擎查询太麻烦，因此也专门整理总结一下。

## 已有文章列表：

#### [iMac（OS X）常用开发工具介绍](http://blog.bihe0832.com/mac_tools_develop.html)

- 链接：[http://blog.bihe0832.com/mac_tools_develop.html](http://blog.bihe0832.com/mac_tools_develop.html)

- 概述：主要介绍iMac下提高效率的一些工具，包括：Homebrew、Alfred、zsh、iTerm2、Charles & Fiddler等

#### [iMac（OS X）日常开发中各种代理设置方法汇总（shell、Android Studio、gem、npm）](http://blog.bihe0832.com/proxy.html)

- 链接：：[http://blog.bihe0832.com/proxy.html](http://blog.bihe0832.com/proxy.html)

- 概述：主要介绍iMac下关于网络相关的问题，主要是各种情况下网络代理的使用
	
#### [iMac（OS X）中设置大小写敏感的分区并切换](http://blog.bihe0832.com/mac-disk-utility.html)

- 链接：[http://blog.bihe0832.com/mac-disk-utility.html](http://blog.bihe0832.com/mac-disk-utility.html)

- 概述：由于历史原因，OS X虽然支持文件系统大小写敏感，但是默认是不敏感，再开发中就很蛋疼，这篇文章介绍如何设置大小写敏感分区

#### [iMac（OS X）搭建私有maven仓库，提供Nexus Responsitory镜像](http://blog.bihe0832.com/private_maven.html)

- 链接：[http://blog.bihe0832.com/private_maven.html](http://blog.bihe0832.com/private_maven.html)

- 概述：在iMac机器上部署一套私有maven仓库代理

#### [iMac（OS X）El Capitan 更新遇到的那些坑](http://blog.bihe0832.com/os_X_El_Capitan_update.html)

- 链接：[http://blog.bihe0832.com/os_X_El_Capitan_update.html](http://blog.bihe0832.com/os_X_El_Capitan_update.html)
	
- 概述：OS X El Capitan 更新的时候遇到了一些坑，目前已经不是最新的系统了，进攻参考。

#### [iMac（OS X）不可或缺的套件管理器 —— Homebrew](http://blog.bihe0832.com/homebrew.html)

- 链接：[http://blog.bihe0832.com/homebrew.html](http://blog.bihe0832.com/homebrew.html)

- 概述：Homebrew，OS X 不可或缺的套件管理器。类似于Debian系列的apt-get，Redhat的yum，主要用来安装一些开源软件，这些工具的存在大大简化了开源软件的安装过程。

## 其他零碎问题

#### gem相关

在iMac下面如果使用gem安装部分软件的时候很容易遇到下面的错误：

	
	➜  temp: sudo gem install --http-proxy http://proxy.com:8080 gollum
	Password:
	
	Building native extensions. This could take a while...
	ERROR:  While executing gem ... (Gem::FilePermissionError)
	    You don't have write permissions for the /usr/bin directory.
	%	
	
原因就是字面意思的原因, gem 要往目录`/usr/bin`写文件但是权限不够. 因为此时使用的是系统自带的 ruby, 他会在尝试往系统库中安装内容。有时候即使是使用sudo或许也不可以安装。解决这个问题有两种方法：

- 切换用户，使用root尝试或者修改 /Library/Ruby/Gems/XXX 的用户组

- 重新在别的目录再安装一套ruby

切换用户方法很简单，使用`sudo chown -R`即可。不过个人更推荐在安装一个ruby。直接使用homebrew安装即可。这样我们自定义的和系统的就可以很好的区分开。示例如下：


	➜  temp: brew install ruby
	Updating Homebrew...
	==> Installing dependencies for ruby: libyaml, openssl
	==> Installing ruby dependency: libyaml
	……
	🍺  /usr/local/Cellar/ruby/2.5.1: 16,227 files, 27.5MB
	
	➜  temp:  gem list --local
	/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/universal-darwin17/rbconfig.rb:214: warning: Insecure world writable dir /Users/hardyshi/lib/android-sdk in PATH, mode 040777
	
	*** LOCAL GEMS ***
	
	addressable (2.5.2)
	
	……
	
	safe_yaml (1.0.4)
	sass (3.5.5)
	sass-listen (4.0.0)
	sqlite3 (1.3.11)
	test-unit (3.1.5)
	➜  temp: gem install --http-proxy http://dev-proxy.oa.com:8080 gollum
	Fetching: charlock_holmes-0.7.6.gem (100%)
	Building native extensions. This could take a while...
	
	……
	
	23 gems installed
