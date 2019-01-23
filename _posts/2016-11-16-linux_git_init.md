---
layout: post
title: 在Linux服务器（ubuntu 16）上部署并配置git 
category: 开发工具
tags: web git 工具
keywords: ubuntu git id_rsa.pub  ssh authorized_keys passwd /usr/bin/git-shell 22
description: 在Linux服务器（ubuntu 16）上部署并配置git
---

近期终于忍痛将所有的代码从SAE切换到了个人的vps，为方便代码管理，需要在服务器上部署git。为了方便后续查看，把过程简单整理总结一下。本教程基于：

- 服务器：

		$ cat /proc/version
		Linux version 4.8.3-x86_64-linode76 (maker@build) (gcc version 4.7.2 (Debian 4.7.2-5) ) #1 SMP Thu Oct 20 19:05:39 EDT 2016
		$ lsb_release -a
		No LSB modules are available.
		Distributor ID:	Ubuntu
		Description:	Ubuntu 16.04.1 LTS
		Release:	16.04
		Codename:	xenial

- 客户端：macOS（10.12.1）

描述过程中，所有没有特别说明的操作都是在服务器上操作，客户端相关的操作会特别说明。

## 安装git

### 准备：切换到sudo权限账号

首先确保你当前的账号有sudo权限，如果没有，请切换到有sudo权限的账号

### 第一步：安装git

	$ sudo apt-get install git

## 配置用户

​接下来我们将模拟在服务器上创建一个名gituser的用户，后续所有的仓库操作都是使用这个用户。
​

### 第一步：创建git用户

	$ sudo adduser gituser
 
### 第二步：禁用git用户的shell登录

为了安全考虑，我们的git用户不允许登录shell，修改方法如下。

- 打开系统的`/etc/passwd`文件

		$ sudo vi /etc/passwd
		
- 找到git用户gituser的权限信息，类似下面这行

		gituser:x:1001:1001:,,,:/home/git:/bin/bash

- 修改gituser的权限，禁用shell登录，改为下面这样

		gituser:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

## 管理公钥

为了方便我们使用git，不用每次提交时都输入密码，我们可以在服务器添加客户端的ssh证书。

### 第一步：在客户端生成ssh公钥

默认情况下，用户的ssh密钥存储在其 ~/.ssh 目录下。进入该目录并列出其中内容，你便可以快速确认自己是否已拥有密钥：
	
	➜  /  cd ~/.ssh
	➜  .ssh  ls
	github_rsa	github_rsa.pub	id_rsa	id_rsa.pub  

如果没有的话，可以用下面的命令ssh-keygen生成，在生成过程中ssh-keygen会确认密钥的存储位置，要求你输入两次密钥口令（如果你不想在使用密钥时输入口令，将其留空即可）等，如果没有特别操作，一路点击回车确认即可。操作结束以后 ~/.ssh 目录下便会存在对应的文件，具体命令如下：
	
	➜ .ssh  ssh-keygen
	Generating public/private rsa key pair.
	Enter file in which to save the key (/Users/test/.ssh/id_rsa):
	/Users/test/.ssh/id_rsa already exists.
	Overwrite (y/n)? y
	Enter passphrase (empty for no passphrase):
	Enter same passphrase again:
	Your identification has been saved in /Users/test/.ssh/id_rsa.
	Your public key has been saved in /Users/test/.ssh/id_rsa.pub.
	The key fingerprint is:
	SHA256:dfitE9e2zsYBu9e2zsYja9e2zsYEZI9e2zsY1c9e2zs test@iMac.local

### 第二步：在服务端找到公钥配置文件

首先检查git用户是否存在.ssh目录及authorized_keys文件：
	
	$ sudo cat /home/gituser/.ssh/authorized_keys
	
如果提示文件不存在，则运行touch命令创建，如下
	
	$ sudo cat /home/gituser/.ssh/authorized_keys
	cat: /home/gituser/.ssh/authorized_keys: No such file or directory
	$ sudo touch /home/gituser/.ssh/authorized_keys

authorized_keys保存了所有的ssh连接的公钥证书

### 第三步： 在服务器端配置客户端的公钥文件

使用vi打开上一步生成的authorized_keys文件，然后在文末追加插入客户端的公钥文件的文本内容。建议不同的客户端的公钥用一个空行隔开
	
## 配置仓库

接下来我们将模拟在服务器test目录下创建一个名为test的git仓库。

### 第一步：初始化Git仓库

切换到仓库存放目录，并使用下面的命令初始化git仓库：

	$ sudo git init --bare test.git
	Initialized empty Git repository in ~/test/test.git/

此时已经初始化了一个空的git仓库。然后需要修改文件权限：

	sudo chown -R gituser:gituser test.git

这样通过git用户gituser就可以访问这个仓库了

### 第二步：客户端克隆Git仓库

在上一步配置OK以后，就可以在客户端运行git clone来获取远程仓库了，例如

	git clone gituser@HOST:PATH/test.git

其中`HOST`为对应的ip或者域名，`PATH`为对应的文件完整路径。接下来就可以在自己的git仓库正常的修改和提交代码修改了~

## 其他

### 默认端口修改

由于安全或者其它原因，我们可能会修改默认的SSH服务端口号，默认情况下，已有的git项目在pull或者push的时候会报错，不存在的项目在clone时会报错，例如：

	➜  git push
	ssh: connect to host 1.1.1.1 port 22: Connection refused
	fatal: Could not read from remote repository.

	Please make sure you have the correct access rights
	and the repository exists.

现在假设将服务器SSH默认端口修改为3022后，我们怎么操作：

- 无法pull或者push
	
		➜ git remote set-url origin ssh://gituser@HOST:PORT/PATH/test.git
		
	例如：
	
		➜ git remote set-url origin ssh://gituser@1.1.1.1:3022/User/gituser/test/test.git

- clone出错

		➜ git clone ssh://gituser@HOST:PORT/PATH/test.git
	 
	 例如：
	
		➜ git clone ssh://gituser@1.1.1.1:3022/User/gituser/test/test.git
	