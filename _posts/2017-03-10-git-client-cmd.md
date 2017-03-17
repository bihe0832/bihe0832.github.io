---
layout: post
title: git常用命令（持续更新~）
category: 开发必备
tags: git 常用工具
keywords: git branch tag origin
description: desc
---

之前写过一篇文章[在Linux服务器（ubuntu 16）上部署并配置git（点击查看）](http://blog.bihe0832.com/linux_git_init.html)来专门介绍git的服务端部署相关的内容。最近总遇到使用git的时候需要敲一些不常用的命令，每次敲的时候都要搜索引擎查一次很麻烦，因此专门整理一篇文章，所有命令基于github上的项目[Android-GetAPKInfo](https://github.com/bihe0832/Android-GetAPKInfo)

## branch和tag相关操作

主要是branch的增删改查相关的内容，tag同理，这里仅列出branch

### 分支查看

- 命令

		git branch
		
	查看分支时加上-a参数可以查看远程分支
	
- 事例

		➜  Android-GetAPKInfo git:(master) git branch -a
		* master
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/master
		  remotes/origin/v1.0
		  remotes/origin/v1.1
		  remotes/origin/v1.1-preview-1

- 详细说明

	远程分支以`remotes`开头，在开启颜色支持的时候同时以红色显示。当前环境所在的分支会以`*`来标示。
	
### 新建branch

- 命令

		git branch BRANCH_NAME
		
- 事例

		➜  Android-GetAPKInfo git:(master) git branch 0d35e98
		➜  Android-GetAPKInfo git:(master) git branch
		  0d35e98
		* master
	
- 详细说明

	运行命令时会基于当前的项目环境创建一个分支，此时只会创建分支并不会自动切换
	

### 分支切换

- 命令

		git checkout BRANCH_NAME
	
- 事例

		➜  Android-GetAPKInfo git:(master)  git checkout 0d35e98
		warning: refname '0d35e98' is ambiguous.
		Switched to branch '0d35e98'
		➜  Android-GetAPKInfo git:(0d35e98)

- 详细说明

	运行完命令就会发现`git:`后面的括号里面的当前分支已经更改了

### 提交本地分支

- 命令

		git push origin BRANCH_NAME
	
- 事例

		➜  Android-GetAPKInfo git:(master) git push origin 0d35e98
		Total 0 (delta 0), reused 0 (delta 0)
		To https://github.com/bihe0832/Android-GetAPKInfo.git
		 * [new branch]      0d35e98 -> 0d35e98
		➜  Android-GetAPKInfo git:(master) git branch -a
		  0d35e98
		* master
		  remotes/origin/0d35e98
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/master
		  remotes/origin/v1.0
		  remotes/origin/v1.1
		  remotes/origin/v1.1-preview-1

- 详细说明

	运行完命令就会发现分支列表本地和远程都有该分支了
	
### 删除branch

#### 删除本地

- 命令

		git branch -d BRANCH_NAME
	
- 事例

	
		➜  Android-GetAPKInfo git:(master) git branch -d 0d35e98
		Deleted branch 0d35e98 (was 0d35e98).
		➜  Android-GetAPKInfo git:(master) git branch -a
		* master
		  remotes/origin/0d35e98
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/master
		  remotes/origin/v1.0
		  remotes/origin/v1.1
		  remotes/origin/v1.1-preview-1

- 详细说明

	运行完命令就会发现分支列表仅有远程有该分支

#### 删除远程

- 命令

		git push origin :BRANCH_NAME
	
- 事例

	
		➜  Android-GetAPKInfo git:(master) git push origin :0d35e98
		To https://github.com/bihe0832/Android-GetAPKInfo.git
		 - [deleted]         0d35e98
		➜  Android-GetAPKInfo git:(master) git branch -a
		* master
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/master
		  remotes/origin/v1.0
		  remotes/origin/v1.1
		  remotes/origin/v1.1-preview-1

- 详细说明

	运行完命令就会发现分支列表中的远程分支也已经被删除。