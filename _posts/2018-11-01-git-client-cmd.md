---
layout: post
title: git常用命令整理（已包括branch、tag等持续更新~）
category: 开发工具
tags: git 常用工具
keywords: git branch tag origin config user.name user.email --global --system
description: 总遇到使用git的时候需要敲一些不常用的命令，每次敲的时候都要搜索引擎查一次很麻烦，因此专门整理一篇文章.
---

之前写过一篇文章[在Linux服务器（ubuntu 16）上部署并配置git（点击查看）](http://blog.bihe0832.com/linux_git_init.html)来专门介绍git的服务端部署相关的内容。最近总遇到使用git的时候需要敲一些不常用的命令，每次敲的时候都要搜索引擎查一次很麻烦，因此专门整理一篇文章，所有命令基于github上的项目[Android-GetAPKInfo](https://github.com/bihe0832/Android-GetAPKInfo)

## 提交相关

主要是删除本地提交或者远程提交

### 回退本地提交

将dev-2.0的最新一次提交删除

- 命令

		git reset --hard COMMIT
	
- 事例

		➜  readhub git:(dev-2.0) git log
		On branch dev-2.0
		Your branch is ahead of 'origin/dev-2.0' by 2 commits.
		  (use "git push" to publish your local commits)
		
		commit 0795c1ac4a172c8b50074cc5bb0a6181c03a314e (HEAD -> dev-2.0)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 11:15:42 2018 +0800
		
		    test add
		
		commit 53c24ee06dc2aa6abaae3d16a38891f7fcc164f9
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 11:15:16 2018 +0800
		
		    test add
		
		commit 9926a26e10c36373ca85103d403c174a97bc18b1 (tag: V2.0.3, origin/master, origin/dev-2.0, origin/HEAD, master)
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:38:37 2018 +0800
		
		    2.0.3 版本换包	
	    ➜  readhub git:(dev-2.0) git reset --hard 9926a26
		HEAD is now at 9926a26 2.0.3 版本换包
		➜  readhub git:(dev-2.0) git log
		commit 9926a26e10c36373ca85103d403c174a97bc18b1 (HEAD -> dev-2.0, tag: V2.0.3, origin/master, origin/dev-2.0, origin/HEAD, master)
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:38:37 2018 +0800
		
		    2.0.3 版本换包
		
		commit 5b25dfff3f53f49893f448f956427d927bbcc223
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:37:12 2018 +0800
		
		    2.0.3 版本内容	
		
- 详细说明

	 --hard 切换到指定commit，此commit之后的修改都不保留，谨慎使用

### 回退远程提交

将dev-2.0的最新一次远程提交删除，做法其实是先拉下来远程所有的提交，然后本地回退，然后把本地的回退强制提交

- 命令

		git log origin/BRANCH -n 3	
		
		git push -f
		
- 事例

		➜  readhub git:(dev-2.0) git log origin/dev-2.0 -n 3
		commit acba683aae382938828b90c496c42d1438c1a515 (HEAD -> dev-2.0, origin/dev-2.0)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 12:44:19 2018 +0800
		
		    add test
		
		commit 9926a26e10c36373ca85103d403c174a97bc18b1 (tag: V2.0.3, origin/master, origin/HEAD, master)
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:38:37 2018 +0800
		
		    2.0.3 版本换包
		
		commit 5b25dfff3f53f49893f448f956427d927bbcc223
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:37:12 2018 +0800
		
		    2.0.3 版本内容
	    ➜  readhub git:(dev-2.0) git pull --rebase
		Already up to date.
		Current branch dev-2.0 is up to date.
	    ➜  readhub git:(dev-2.0) git reset --hard 9926a26
		HEAD is now at 9926a26 2.0.3 版本换包
		➜  readhub git:(dev-2.0) git push -f
		Total 0 (delta 0), reused 0 (delta 0)
		To https://github.com/bihe0832/readhub-android.git
		 + acba683...9926a26 dev-2.0 -> dev-2.0 (forced update)
		➜  readhub git:(dev-2.0) git log origin/dev-2.0 -n 3
		commit 9926a26e10c36373ca85103d403c174a97bc18b1 (HEAD -> dev-2.0, tag: V2.0.3, origin/master, origin/dev-2.0, origin/HEAD, master)
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:38:37 2018 +0800
		
		    2.0.3 版本换包
		
		commit 5b25dfff3f53f49893f448f956427d927bbcc223
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:37:12 2018 +0800
		
		    2.0.3 版本内容
		
		commit 5339fbf511fa805926bb79b899ed777247f4a5a3
		Merge: c3c0d5b a3eaabe
		Author: 子勰 <code@bihe0832.com>
		Date:   Sun Aug 12 18:34:53 2018 +0800
		
		    V2.0.3合入
		
- 详细说明

	 --hard 切换到指定commit，此commit之后的修改都不保留，谨慎使用
	 
	 -f 会强制提交，此commit之后的修改都不保留，谨慎使用

## branch相关操作

主要是branch的增删改查相关的内容

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

#### 同步远程分支

- 命令

		git remote prune origin
	
- 事例

		➜  Android-GetAPKInfo git:(master) git remote prune origin
		

- 详细说明

	该命令的作用是同步远程已经删除的分支，例如部分分支远程已经删除，但是本地还存在，调用该命令即可删除。
	
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

### 一个分支多次提交合并为一次merge到另一分支

在需求开发中，我们可能在某个分支开发了几天，又多次提交，当需求开发完成，我们可能会想把所有的功能变更合并为一次提交合并到主干，做到不破坏主干的工作流，此时就需要用到分支多次提交合并为一次merge。

- 命令

		git merge --squash BRANCH_NAME
		
- 事例

		➜  readhub git:(dev-2.0) git branch test
		➜  readhub git:(dev-2.0) git checkout test
		Switched to branch 'test'
		➜  readhub git:(test) git status
		On branch test
		nothing to commit, working tree clean
		➜  readhub git:(test) echo "fsdfdsf" > a.txt
		➜  readhub git:(test) ✗ git commit -am"modify a"
		[test 15f4eee] modify a
		 1 file changed, 1 insertion(+)
		➜  readhub git:(test) echo "fsdfdsfwerer" > a.txt
		➜  readhub git:(test) ✗ git commit -am"modify a"
		[test d8ea821] modify a
		 1 file changed, 1 insertion(+), 1 deletion(-)
		➜  readhub git:(test) git log
		commit d8ea82168b27a51dfa07ecc70d5d9ba6b4fa2b6d (HEAD -> test)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 13:00:06 2018 +0800
		
		    modify a
		
		commit 15f4eeef3c50d2a8592116875393dec49c8b4a78
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 12:59:57 2018 +0800
		
		    modify a
		
		commit 959ca16540453fbda4dca303c5f359bf1d840941 (dev-2.0)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 12:57:22 2018 +0800
		
		    add test
	    ➜  readhub git:(dev-2.0) git merge --squash test
		Updating 97a96c1..d8ea821
		Fast-forward
		Squash commit -- not updating HEAD
		 a.txt | 1 +
		 b.txt | 0
		 2 files changed, 1 insertion(+)
		 create mode 100644 b.txt
		➜  readhub git:(dev-2.0) ✗ git commit -am"merge test"
		[dev-2.0 bd593d1] merge test
		 2 files changed, 1 insertion(+)
		 create mode 100644 b.txt
		 ➜  readhub git:(dev-2.0) git log
		 commit bd593d122437618ba50f8933fcaa9c4622e8454b (HEAD -> dev-2.0)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 13:14:52 2018 +0800
		
		    merge test
		
		commit 97a96c1ba212913336bd4d0e308296847ad1571d
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Nov 1 12:56:42 2018 +0800
		
		    add test

		
- 详细说明

	git merge --squash 执行完以后需要手动执行一次commit将所有变更提交

## tag相关操作

### 查看Tag

#### 列出所有Tag

- 命令

		git tag
			
	如果在查看标签时加上-n，可以查看标示标签的注释

- 事例

		➜  Android-GetAPKInfo git:(master) git tag -n
		
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)

#### 查看Tag信息

- 命令

		git show TAG_NAME
			
- 事例

		➜  Android-GetAPKInfo git:(master) git show v1.0.0
		
		commit ea1cb4708a4c35568b7c4973b711a8df3fe6c862 (tag: v1.0.0, origin/v1.0)
		Author: 子勰 <code@bihe0832.com>
		Date:   Fri Dec 23 18:29:06 2016 +0800
		
		    目录结构调整
		
		……
		
		
### 新建Tag

#### 在当前commit新建Tag

- 命令

		git tag TAG_NAME
					
	新建Tag时加上-a参数可以创建标识标签，标示标签的参数可以通过-m 参数或者-f参数来添加

- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git tag -a test -m"This is a test"
		➜  Android-GetAPKInfo git:(master) ✗ git tag -n
		
		
		test            This is a test
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)

		➜  Android-GetAPKInfo git:(master) ✗ git tag -a testFile --file=./README.md
		➜  Android-GetAPKInfo git:(master) ✗ git tag -n
		
		test            This is a test
		testFile        作为基于Android平台的渠道SDK的开发者或者联调同学每天都会
		面对大量的apk，需要检查他们的包名（packageName）、版本(versionName\versionCode)、应用签名(Signature)等信息，尤其现在Android的V2签名认证(APK Signature Scheme v2)带来的问题更多，为了提高工作效率，整理了一个获取应用基本信
		息的系列工具集。
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)

#### 在指定commit新建Tag

- 命令

		git tag TAG_NAME COMMIT_INFO
					
	新建Tag时加上-a参数可以创建标识标签，标示标签的参数可以通过-m 参数或者-f参数来添加

- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git log
		
		commit fc0c0d33bef839cce5abe9521c6695a03c648efb (HEAD -> master, tag: testFile, tag: test, origin/master, origin/HEAD)
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Sep 21 17:07:05 2017 +0800
		
		    修改为Android Studio 构建
		
		commit 6e5b24a2a9ce60678a8e02c9d89a5cb3a22e8aea
		Author: 子勰 <code@bihe0832.com>
		Date:   Thu Sep 21 17:03:12 2017 +0800
		
		    修改为使用Android Studuio 构建
		
		➜  Android-GetAPKInfo git:(master) ✗ git tag tag_6e5b24 6e5b24
		➜  Android-GetAPKInfo git:(master) ✗ git tag -n
		
		tag_6e5b24      修改为使用Android Studuio 构建
		test            This is a test
		testFile        作为基于Android平台的渠道SDK的开发者或者联调同学每天都会
		面对大量的apk，需要检查他们的包名（packageName）、版本(versionName\versionCode)、应用签名(Signature)等信息，尤其现在Android的V2签名认证(APK Signature Scheme v2)带来的问题更多，为了提高工作效率，整理了一个获取应用基本信
		息的系列工具集。
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)

### 推送Tag

#### 推送指定Tag

- 命令

		git push origin TAG_NAME
					
- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git tag
		
		test
		v1.0.0
		v1.1.0
		v1.1.1
		(END)
		
		➜  Android-GetAPKInfo git:(master) ✗ git push origin test
		Total 0 (delta 0), reused 0 (delta 0)
		To https://github.com/bihe0832/Android-GetAPKInfo.git
		 * [new tag]         test -> test

#### 推送所有Tag

- 命令

		git push origin --tags
					
- 事例
		
		➜  Android-GetAPKInfo git:(master) ✗ git tag test1
		➜  Android-GetAPKInfo git:(master) ✗ git tag test2
		➜  Android-GetAPKInfo git:(master) ✗ git tag
		
		test
		test1
		test2
		v1.0.0
		v1.1.0
		v1.1.1
		(END)

		➜  Android-GetAPKInfo git:(master) ✗ git push origin --tags
		Total 0 (delta 0), reused 0 (delta 0)
		To https://github.com/bihe0832/Android-GetAPKInfo.git
		 * [new tag]         test1 -> test1
		 * [new tag]         test2 -> test2

### 删除Tag

#### 删除本地tag

- 命令

		git tag -d TAG_NAME	

- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git tag -n
		
		tag_6e5b24      修改为使用Android Studuio 构建
		test            This is a test
		testFile        作为基于Android平台的渠道SDK的开发者或者联调同学每天都会
		面对大量的apk，需要检查他们的包名（packageName）、版本(versionName\versionCode)、应用签名(Signature)等信息，尤其现在Android的V2签名认证(APK Signature Scheme v2)带来的问题更多，为了提高工作效率，整理了一个获取应用基本信
		息的系列工具集。
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)

		➜  Android-GetAPKInfo git:(master) ✗ git tag -d tag_6e5b24 test testFile
		Deleted tag 'tag_6e5b24' (was 6e5b24a)
		Deleted tag 'test' (was 09a7f5f)
		Deleted tag 'testFile' (was 4d144d6)
		➜  Android-GetAPKInfo git:(master) ✗ git tag -n
		
		v1.0.0          目录结构调整
		v1.1.0          内容调整
		v1.1.1          Update README.md
		(END)


#### 删除远程tag

- 命令

		git push origin :refs/tags/TAG_NAME

- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git tag
		
		test
		v1.0.0
		v1.1.0
		v1.1.1

		➜  Android-GetAPKInfo git:(master) ✗ git push origin :refs/tags/test
		To https://github.com/bihe0832/Android-GetAPKInfo.git
		 - [deleted]         test### 推送Tag
		➜  Android-GetAPKInfo git:(master) ✗ git tag
		
		test
		v1.0.0
		v1.1.0
		v1.1.1

- 详细说明： 如果没有删除本地tag的前提下直接删除远程tag，本地tag并不会被删除

#### 同步远程Tag

- 命令

		git tag -l | xargs git tag -d
		git fetch	
		
- 事例

		➜  app git:(master) git tag -l | xargs git tag -d
		Deleted tag 'Tag_JYP_0.0.0.1_382' (was 60a846b15)
		Deleted tag 'Tag_JYP_0.0.0.1_388' (was 1697a8231)
		Deleted tag 'Tag_JYP_0.0.0_0_20180523' (was e2eb990b5)
		➜  app git:(publish_815) git fetch
		From https://github.com/bihe0832/
	 		 * [new tag]             Tag_JYP_0.2.3.1608_1213  -> Tag_JYP_0.2.3.1608_1213
			 * [new tag]             Tag_JYP_0.2.4.1742_1254  -> Tag_JYP_0.2.4.1742_1254
		
- 详细说明

	该命令的作用是同步远程的Tag，例如部分分支Tag已经删除，但是本地还存在，调用该命令即可完成同步（先删除本地的，然后再把远程的同步下来）。
	
	
### 新建指向Tag的分支

- 命令

		git branch origin :refs/tags/TAG_NAME

- 事例

		➜  Android-GetAPKInfo git:(master) ✗ git branch test_branch v1.0.0
		➜  Android-GetAPKInfo git:(master) ✗ git branch -a
		* master
		  test_branch
		  remotes/origin/HEAD -> origin/master
		  remotes/origin/eclipse
		  remotes/origin/master
		  remotes/origin/v1.0
		  remotes/origin/v1.1
		  remotes/origin/v1.1-preview-1	

## 日志相关

### 日志展示参数

git log包含了相当丰富的版本提交信息，平时我们有时候想要更加简洁或者定制的信息，就可以使用利用他提供的参数来获取。下面列出一些常用的占位符参数：

- 提交状态基础信息

	主要是版本基础信息，例如作者、日期、commit哈希等

	| 参数 | 含义                                       |
	|------|--------------------------------------------|
	| %H   | 提交对象（commit）的完整哈希字串           |
	| %h   | 提交对象的简短哈希字串                     |
	| %T   | 树对象（tree）的完整哈希字串               |
	| %t   | 树对象的简短哈希字串                       |
	| %P   | 父对象（parent）的完整哈希字串             |
	| %p   | 父对象的简短哈希字串                       |
	| %an  | 作者（author）的名字                       |
	| %ae  | 作者的电子邮件地址                         |
	| %ad  | 作者修订日期（可以用 -date= 选项定制格式） |
	| %ar  | 作者修订日期，相对格式按多久以前的方式显示（1 day ago）|
	| %at  | 作者修订日期，UNIX timestamp        |
	| %ai | 作者修订日期，ISO 8601 格式 (2019-11-15 13:06:25 +0800)       |
	| %d   | ref名称                                   |
	| %cn  | 提交者(committer)的名字                    |
	| %ce  | 提交者的电子邮件地址                       |
	| %cd  | 提交日期（可以用 -date= 选项定制格式） |
	| %cr  | 提交日期，相对格式按多久以前的方式显示（1 day ago）|
	| %ct  | 提交日期，UNIX timestamp        |
	| %ci  | 提交日期，ISO 8601 格式 (2019-11-15 13:06:25 +0800)       |
	| %s   | commit信息标题                                   |
	| %f   | sanitized subject line, suitable for a filename |
	| %b   | commit信息内容 |
	| %N   | commit notes |

- 提交内容信息

	主要是每次提交的数据统计、版本树形图等
	
	| 选项            | 说明                       |
	|-----------------|----------------------------|
	| -p              | 按补丁格式显示每个更新之间的差异   |
	| --stat          | 显示每次更新的文件修改统计信息 |
	| --shortstat     | 只显示 --stat 中最后的行数修改添加移除统计  |
	| --name-only     | 仅在提交信息后显示已修改的文件清单      |
	| --name-status   | 显示新增、修改、删除的文件清单  |
	| --abbrev-commit | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符 |
	| --relative-date | 使用较短的相对时间显示（比如，“2 weeks ago”） |
	| --graph         | 显示 ASCII 图形表示的分支合并历史       |
	| --pretty        | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式） |
	| --decorate      | 显示指向这个提交的所有引用（比如说分支、标签等）   |
	| --date      | 日期展示格式，例如--date=short 或  --date=format:'%Y-%m-%d %H:%M:%S' |

- 筛选参数

	主要是用于提交日志的筛选，例如指定数量，指定日期，指定作者等 
	
	| 选项            | 说明                       |
	|----------------|----------------------------|
	| -(n)           | 仅显示最近的 n 条提交   |
	| --since, --after  | 仅显示指定时间之后的提交  |
	|--until, --before  | 仅显示指定时间之前的提交   |
	| --author | 仅显示指定作者相关的提交   |
	| --committer  | 仅显示指定提交者相关的提交   |

- 展示优化

	| 选项            | 说明                       |
	|----------------|----------------------------|
	|%C(...)|指定颜色，可选值有：black、red、green、yellow、blue、magenta、cyan、white，定义可以查看 [https://en.wikipedia.org/wiki/ANSI_escape_code](https://en.wikipedia.org/wiki/ANSI_escape_code)|
	|%n           | 换行   |
	
	

### 命令事例

	➜  _posts git:(master) ✗  git log --graph --decorate --abbrev-commit --no-merges --date=short  --pretty=format:"%Cred%h%Creset%C(yellow)%d%Creset | %Cgreen%ad%Creset | %s %C(yellow)[%an]%Creset"
	
	* 2de8443 (HEAD -> master, origin/master, origin/HEAD) | 2019-12-24 | js [子勰]
	* 55df910 | 2019-12-06 | android schema [子勰]
	* 7951c7e | 2019-12-02 | android res [子勰]
	* 9f9202f | 2019-11-29 | 二维码API [子勰]
	* f8a4b23 | 2019-11-22 | 更正 [子勰]

	➜  _posts git:(master) ✗ git log --graph --decorate --abbrev-commit --no-merges --date=format:'%Y-%m-%d %H:%M:%S'  --stat  --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset'
	
	* 2de8443 - (HEAD -> master, origin/master, origin/HEAD) js (2019-12-24 14:31:15) <子勰>|
	|  _posts/2014-11-11-tools_for_developer.md | 7 ++++++-
	|  1 file changed, 6 insertions(+), 1 deletion(-)
	
	* 55df910 - android schema (2019-12-06 16:34:10) <子勰>|
	|  _posts/2019-12-04-androir_schema.md |  34 ++++++++++++++++++++++++++++++++++
	|  public/images/router_page.png       | Bin 0 -> 282166 bytes
	|  2 files changed, 34 insertions(+)

### 添加快捷方式

如果每次输入上面的事例，过于麻烦，可以通过给命令设置快捷方式来实现。利用命令

`git config --global alias.ALIAS "COMMAND"` 设置快捷方式以后，再使用 `git ALIAS` 执行的效果就和 `git COMMAND` 一致了，例如上面的两个命令修改以后的效果：

	➜  _posts git:(master) ✗ git config --global alias.logl "log --graph --decorate --oneline --abbrev-commit --no-merges --date=short  --pretty=format:'%Cred%h%Creset%C(yellow)%d%Creset | %Cgreen%ad%Creset | %s %C(yellow)[%an]%Creset'"
	➜  _posts git:(master) ✗ git config --global alias.logc "log --graph --decorate --abbrev-commit --no-merges --date=format:'%Y-%m-%d %H:%M:%S'  --stat  --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset'"
	➜  _posts git:(master) ✗ git l
	log       -- show commit logs
	logc      -- alias for 'log --graph --decorate --abbrev-commit --no-merges --date=format:'%Y-%m-%d %H
	logl      -- alias for 'log --graph --decorate --oneline --abbrev-commit --no-merges --date=short  --
	ls-files  -- information about files in index/working directory
	
	➜  _posts git:(master) ✗ git logc
	
	* 2de8443 - (HEAD -> master, origin/master, origin/HEAD) js (2019-12-24 14:31:15) <子勰>|
	|  _posts/2014-11-11-tools_for_developer.md | 7 ++++++-
	|  1 file changed, 6 insertions(+), 1 deletion(-)
	
	* 55df910 - android schema (2019-12-06 16:34:10) <子勰>|
	|  _posts/2019-12-04-androir_schema.md |  34 ++++++++++++++++++++++++++++++++++
	|  public/images/router_page.png       | Bin 0 -> 282166 bytes
	|  2 files changed, 34 insertions(+)

	➜  _posts git:(master) ✗ git logl
	
	* 2de8443 (HEAD -> master, origin/master, origin/HEAD) | 2019-12-24 | js [子勰]
	* 55df910 | 2019-12-06 | android schema [子勰]
	* 7951c7e | 2019-12-02 | android res [子勰]
	* 9f9202f | 2019-11-29 | 二维码API [子勰]
	* f8a4b23 | 2019-11-22 | 更正 [子勰]
	* 8d5683d | 2019-11-19 | 整理介绍 [子勰]

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