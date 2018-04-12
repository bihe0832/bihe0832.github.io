---
layout: post
title: git常用命令（持续更新~）
category: 开发必备
tags: git 常用工具
keywords: git branch tag origin config user.name user.email --global --system
description: 总遇到使用git的时候需要敲一些不常用的命令，每次敲的时候都要搜索引擎查一次很麻烦，因此专门整理一篇文章.
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
	
### 合并branch

#### 分支合并

为了方便解决冲突，一般是选择将远程的或者本地的分支合并到本地，然后解决冲突以后再提交到远程

- 命令

		git merge -Xignore-space-change  BRANCH_NAME
		
		-Xignore-space-change：可以忽略空白修改的冲突
		
- 事例

	将本地的dev-2.0 合并到本地的master
	
		➜  readhub-android git:(dev-2.0) git branch
		* dev-2.0
		  master
		➜  readhub-android git:(master) git merge dev-2.0
		Updating b9287e9..455bc62
		Fast-forward
		
		……
		
		➜  readhub-android git:(master) git status
		On branch master
		Your branch is ahead of 'origin/master' by 18 commits.
		  (use "git push" to publish your local commits)
		
		nothing to commit, working tree clean
		➜  readhub-android git:(master)	

	将远程的dev-2.0 合并到本地的master

		➜  readhub-android git:(master) git status
		On branch master
		Your branch is up-to-date with 'origin/master'.
		
		nothing to commit, working tree clean
		➜  readhub-android git:(master) git branch -a
		* master
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/dev-2.0
		  remotes/origin/master
		➜  readhub-android git:(master) git merge remotes/origin/dev-2.0
		Removing Main/src/main/res/values/strings.xml

		➜  readhub-android git:(master) ✗ git status
		On branch master
		Your branch is up-to-date with 'origin/master'.
		
		All conflicts fixed but you are still merging.
		  (use "git commit" to conclude merge)
		
		Changes to be committed:

		modified:   Framework_core/src/main/java/com/ottd/libs/framework/OttdFramework.java
		modified:   Framework_core/src/main/res/values/com_bihe0832_readhub_res.xml
		modified:   Main/src/main/java/com/bihe0832/readhub/topic/TopicDetailActivity.kt
		modified:   Main/src/main/java/com/bihe0832/readhub/topic/TopicListAdapter.kt
		modified:   Main/src/main/res/layout/activity_topic_detail.xml
		modified:   Main/src/main/res/layout/activity_topic_detail_news_item.xml
		modified:   Main/src/main/res/layout/activity_topic_detail_timeline_item.xml
		modified:   Main/src/main/res/layout/com_bihe0832_activity_splash.xml
		modified:   Main/src/main/res/layout/fragment_topic_item_summary.xml
		modified:   Main/src/main/res/values/card_res.xml
		deleted:    Main/src/main/res/values/strings.xml
	

- 详细说明

	合并以后还需要完成冲突解决、合并后代码本地提交和远程提交
	
	
## 多账号相关操作

目前越来越多的地方都开始使用git了，GitHub，oschina等等，再加上公司的git，就会存在多账号的问题。例如有一天忽然发现公司的git上提交的代码，显示的  `user.name` 和 `user.email` 竟然是github的用户名和邮箱。这里汇总一下git多账号相关的问题怎么解决：

### git配置关系

其实git相关配置很简单，一般分为几类：

- 针对整个设备生效：

	这部分配置保存在文件 ` /etc/gitconfig `中，对于这台设备上的所有用户都适用。若使用 git config 时用 --system 选项，读写的就是这个文件。

- 针对设备具体用户生效：

	这部分配置保存在对应设备用户目录的文件 ` ~/.gitconfig `中，对于对应用户适用。若使用 git config 时用 --global 选项，读写的就是这个文件。
	
- 针对当前项目生效：

	这部分配置保存在对应项目工作跟目录的文件 ` .git/config `中，这里的配置仅仅针对当前项目有效。
	
对于这三级配置，他们的优先级从项目到用户到设备逐渐上升，每一个级别的配置都会覆盖上层的相同配置。所以对于 `user.name` 和 `user.email`  ，你可以将常用的name和email设置全局，然后对于具体有特殊要求的项目，然后再在项目目录设置项目自身的配置。例如下面是我的全局配置和某一个项目的特殊配置：

	➜  Settings-Tools git:(master) git config --global -l
	filter.media.clean=git-media-clean %f
	filter.media.smudge=git-media-smudge %f
	user.name=子勰
	user.email=code@bihe0832.com
	
	……
	
	core.excludesfile=/Users/zixie/.gitignore_global
	➜  Settings-Tools git:(master) git config -l
	credential.helper=osxkeychain
	filter.media.clean=git-media-clean %f
	filter.media.smudge=git-media-smudge %f
	user.name=zixie
	user.email=blog@bihe0832.com
	
	……
	
	core.excludesfile=/Users/zixie/.gitignore_global

其余的可以不用特别关注，可以看到里面的 `user.name` 和 `user.email` 并不一样，而实际开发中最终生效的为下面的配置。

### git配置修改方法

git的配置修改有两种方法：

- 直接修改配置文件：上面介绍配置关系的时候已经具体指出了不同级别文件的保存位置。可以直接去对应的配置文件修改。

- 使用命令修改：

	git修改配置还是使用git-config命令，后面只需要跟上对应的配置名和值即可。具体命令为：
	
		git config KEY "VALUE"
	
	当然，对应如果修改用户或者设备的配置，就添加对应的参数即可(用户使用 `--global` , 设备使用 `--system`)。上面介绍配置关系的时候已经具体指出。具体事例如下：
	
		➜  Settings-Tools git:(master) git config --system user.name "zixie1"
		error: could not lock config file /etc/gitconfig: Permission denied
		➜  Settings-Tools git:(master) sudo git config --system user.name "zixie1"
		Password:
		➜  Settings-Tools git:(master) git config --global user.name "zixie2"
		➜  Settings-Tools git:(master) git config user.name "zixie3"
		➜  Settings-Tools git:(master) git config -l | grep name
		user.name=zixie1
		user.name=zixie2
		user.name=zixie3