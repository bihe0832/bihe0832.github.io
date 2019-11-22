---
layout: post
title: iMac搭建jekyll本地环境
category: 开发工具
tags: jekyll ruby
keywords: jekyll ruby
description: 每次更新机器的时候都因为iMac默认的Ruby导致搭建本地的jekyll环境格外麻烦，之前都是零零散散的总结，这次彻底总结一下正确的步骤
---

每次更新机器的时候都因为iMac默认的Ruby导致搭建本地的jekyll环境格外麻烦，之前都是零零散散的总结，这次彻底总结一下正确的步骤。

## 卸载系统默认Ruby安装的所有插件

由于系统默认Ruby安装过程中容易出现各种问题，因此建议自定义安装新的Ruby，原因以及安装方法可以参考文章 [iMac上RubyGems相关的问题汇总](https://blog.bihe0832.com/imac_gem.html)

首先第一步就是卸载系统默认Ruby安装的所有插件，如果已经使用了默认的Ruby，那就仅卸载jekyll相关的插件就行

	➜  blog git:(master) ✗ sudo gem uninstall --all
	
	You have requested to uninstall the gem:
		activesupport-4.2.10
		
		……

## 使用homebrew安装新的Ruby

- 安装Ruby

		➜  blog git:(master) ✗ brew install ruby
		Updating Homebrew...
		==> Downloading https://homebrew.bintray.com/bottles/ruby-2.6.2.mojave.bottle.tar.g
		######################################################################## 100.0%
		==> Pouring ruby-2.6.2.mojave.bottle.tar.gz
		==> Caveats
		By default, binaries installed by gem will be placed into:
		  /usr/local/lib/ruby/gems/2.6.0/bin
		
		You may want to add this to your PATH.				
		……
		
- 设置环境变量

	设置环境变量，优先使用自定义安装的Ruby，并将插件目录添加到环境变量:

		➜  blog git:(master) ✗ echo 'export PATH="/usr/local/lib/ruby/gems/2.6.0/bin:/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
		➜  blog git:(master) ✗ source ~/.zshrc
		
## 安装Jekyll等插件

	➜  blog git:(master) ✗ gem install jekyll
	Fetching mercenary-0.3.6.gem	
					
		……
		
		25 gems installed
	➜  blog git:(master) ✗ gem install github-pages
	Fetching addressable-2.5.2.gem
					
		……
		
		62 gems installed
	➜  blog git:(master) ✗
	
## 运行本地环境：

	➜  blog git:(master) ✗ jekyll server
	Configuration file: /Documents/github/blog/_config.yml
	            Source: /Documents/github/blog
	       Destination: /Documents/github/blog/_site
	 Incremental build: disabled. Enable with --incremental
	      Generating...
	                    done in 3.337 seconds.
	 Auto-regeneration: enabled for '/Documents/github/blog'
	    Server address: http://127.0.0.1:4000
	  Server running... press ctrl-c to stop.
