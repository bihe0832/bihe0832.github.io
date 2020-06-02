---
layout: post
title: macOS（Sierra 10.12）上Android源码（AOSP）的下载、编译与导入到Android Studio
category: 终端开发
tags: mac android 
keywords: AOSP Sierra 10.12.1 MacOSX-SDK MacPorts Repo aosp_arm-eng 
description: 本人使用macOS(Sierra 10.12.1)在本地checkout出AOSP(7.1.1)并编译导入Android Studio的完整过程
---

## 背景

### 背景简介

最近因为项目需要，要研究Android系统中应用安装的详细过程。在这种场景下，最好的办法就是Read the Fucking Source Code。之前都是在线看，这次因为看的内容比较多，而且看的比较细，因此打算在本地checkout一份。这篇文章就**`主要记录本人使用macOS(Sierra 10.12.1)在本地checkout出AOSP(7.1.1)并编译导入Android Studio的完整过程`**。

### 参考内容

关于如果checkout源码，其实网上已经有很详细的内容，个人在checkout的过程中主要参考了以下内容，也可直接按照他们的建议尝试：

- Google官方关于checkout的指引：

	[https://source.android.com/source/index.html](https://source.android.com/source/index.html)

- 清华大学Android镜像关于checkout的指引：

	[https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/#section-1](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/#section-1)

- 中国科学技术大学AOSP(Android) 镜像使用帮助：

	[https://lug.ustc.edu.cn/wiki/mirrors/help/aosp](https://lug.ustc.edu.cn/wiki/mirrors/help/aosp)

- Android源码的下载、编译与导入到Android Studio：

	[http://wl9739.github.io/2016/05/09/Android%E6%BA%90%E7%A0%81%E7%9A%84%E4%B8%8B%E8%BD%BD%E3%80%81%E7%BC%96%E8%AF%91%E4%B8%8E%E5%AF%BC%E5%85%A5%E5%88%B0Android-Studio/](http://wl9739.github.io/2016/05/09/Android%E6%BA%90%E7%A0%81%E7%9A%84%E4%B8%8B%E8%BD%BD%E3%80%81%E7%BC%96%E8%AF%91%E4%B8%8E%E5%AF%BC%E5%85%A5%E5%88%B0Android-Studio/)

**checkout时推荐使用清华大学的镜像，checkout过程中有交替切换测试，发现清华大学的镜像会比VPN的效果相对好一点（也可能是个人的VPN不够快）。**

### 系统环境

**在完成下面的准备工作相关的内容以后，本机的系统环境如下**：

- macOS Sierra 10.12.1
- JDK 1.8.0_77
- Xcode 8.2.1
- 本地源码地址：/Volumes/Document/android (对应分区存储空间450G)
- shell：bash

## 准备工作

### 创建分区

由于macOS默认的文件系统是大小写不敏感的，如果不做处理，编译过程会引起下面的异常

	Checking build tools versions...
	build/core/main.mk:159: ************************************************************
	build/core/main.mk:160: You are building on a case-insensitive filesystem.
	build/core/main.mk:161: Please move your source tree to a case-sensitive filesystem.
	build/core/main.mk:162: ************************************************************
	build/core/main.mk:163: *** Case-insensitive filesystems not supported.
	make: *** [out/build-aosp_arm.ninja] Error 1


为了避免该异常，我们要首先在macOS里面创建一个支持大小写敏感的文件系统。具体的方法可以参考下面两篇文章：

- Android官网的Setting up a Mac OS build environment：[https://source.android.com/source/initializing.html#setting-up-a-mac-os-x-build-environment](https://source.android.com/source/initializing.html#setting-up-a-mac-os-x-build-environment)
- 个人博客的macOS中设置大小写敏感的分区并切换：[http://blog.bihe0832.com/mac-disk-utility.html](http://blog.bihe0832.com/mac-disk-utility.html)

**本人选择checkout的源码是android-7.1.1_r6，下载完占用空间22.12 GB，编译完占用空间 67.4G，因此建议分区的时候，Android源码至少使用 80G**

### 创建目录

在新的分区磁盘创建你放保存源码的目录，例如我直接放在新建分区（Document）根目录的android文件夹。

	$ mkdir /Volumes/Document/android

然后进入对应目录继续开始接下来的工作

	$ cd /Volumes/Document/android

### 切换shell

**由于Android的相关编译只能是使用bash，因此如果是使用zsh等其余的shell，请先切换shell到bash。**切换方法

- 用如下命令切换shell: 

		$ chsh -s /bin/bash

- 重启终端。只有重启终端shell切换才会生效。可以使用下面的命令检查当前的shell:

		$ echo $0
		-bash

### 安装软件

下面的软件是在编译源码过程中需要使用到的软件，建议提前下载好。最好是按照下面的顺序来下载，部分软件间有一定的依赖关系。

#### Xcode

- 使用场景：在编译源码是使用，我直接下载了最新版
- 下载地址：[https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)

#### MacOSX-SDK

- 使用场景：在编译源码是使用，macOS10.12.SDK弃用了编译源码需要的syscall，因此需要单独下载更早版本的macOS的SDK
- 下载地址：[https://github.com/phracker/MacOSX-SDKs](https://github.com/phracker/MacOSX-SDKs)
- 暂时下载准备好即可，会在后文中具体介绍怎么使用。另外由于整个github项目也不大，可以直接全部下载下来，这样比较方便。

#### JDK

- 使用场景：在编译源码是使用，我使用的版本是：jdk1.8.0_77
- 下载地址：[http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html#jdk-8u45-oth-JPR](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html#jdk-8u45-oth-JPR)

#### MacPorts

- 使用场景：用来下载其余编译源码需要的软件，我使用的版本是macOS Sierra v10.12对应的版本
- 下载地址：[https://www.macports.org/install.php](https://www.macports.org/install.php)

#### 其他软件

- 使用场景：用来下载其余编译源码需要的软件，可以使用MacPorts来安装
- 安装方法：在MacPorts安装好以后运行下面的命令即可安装gmake等编译工具

		$ POSIXLY_CORRECT=1 sudo port install gmake libsdl git gnupg
- 备注：
	1. 如果这里报错`port: command not found`，说找不到port命令，就需要在命令行运行下面的命令:
	
			$ export PATH=/opt/local/bin:$PATH
			
	- 如果在这里报错`Port gmake not found`，那就在安装之前需要先执行下面的命令。

			$ sudo port -d sync

		然后就可以再执行上面的命令安装相关的工具了

### 概览

在上述内容都安装完毕以后，本机的系统环境如下：

- macOS Sierra 10.12.1
- JDK 1.8.0_77
- Xcode 8.2.1
- shell：bash

## 下载

### 下载Repo

Repo is a tool that makes it easier to work with Git in the context of Android.简单理解，Repo就是一个方便你checkout Android相关源码的工具。官方、清华和中科大镜像都提供了对应的Repo的下载。

**备注：下载Repo之前，官方提示需要创建一个bin文件，并且将路径写入到path中，下面是官方给出的操作步骤**：

	$ mkdir ~/bin
	$ PATH=~/bin:$PATH

我没有设置环境变量，直接跳转到上一步创建的目录下，然后在命令行中输入下面的命令，下载Repo，并且修改属性。建议直接你使用的镜像提供的Repo。本人是直接下载了官方提供的镜像。

	$ curl https://storage.googleapis.com/git-repo-downloads/repo > ./repo
	$ chmod a+x ~/bin/repo

下面是官方给出的三个版本的Repo的sha。

- For version 1.21, the SHA-1 checksum for repo is b8bd1804f432ecf1bab730949c82b93b0fc5fede

- For version 1.22, the SHA-1 checksum for repo is da0514e484f74648a890c0467d61ca415379f791

- For version 1.23, the SHA-1 checksum for repo is ac9d646f6d699f6822a6bc787d3e7338ae7ab6ed

### 初始化Repo

继续在根目录，初始化Repo，主要是设置你使用的镜像以及想要checkout的Android的版本。例如使用官方的镜像，下载android-7.1.1_r6的源码，运行下面的命令

	$ repo init -u https://android.googlesource.com/platform/manifest -b  android-7.1.1_r6

如果是使用清华的镜像，运行

	$ repo init -u https://aosp.tuna.tsinghua.edu.cn/platform/manifest -b android-7.1.1_r6


关于源码和tag的对应关系，可以在官网查看，Source Code Tags and Builds：[https://source.android.com/source/build-numbers.html#source-code-tags-and-builds](https://source.android.com/source/build-numbers.html#source-code-tags-and-builds)

### 下载源码

完成上面的初始化任务以后，就可以开始调用下面的命令来下载源码，repo同步是支持断点续传。因此如果下载过程中终端以后，继续执行下面的命令就可以接着下载，并不会从头开始：

	$ repo sync -j4

**命令最后的j4的意思是同时发起四个并发请求，之所以选择4是因为清华的镜像的并发请求的限制的上限就是4个。**

由于下载时间太长，中途可能会出现链接断开的情况，尤其是很多人会选择半夜下载，如果链接断开了没能继续就白白浪费了一个晚上，湫水长天的博客里面提供了一个自己写的简单的shell脚本可以参考，本人略做了修改。


	#!/bin/bash 
	repo sync -j4
	while [ $? = 1 ]; do 
	   echo "================sync failed, re-sync again =====" 
	   sleep 3 
	   repo sync
   	done
	
将上面的代码保存成repo_sync.sh，放在下载源码的根目录，例如我的/Volumes/Document/android，然后在命令行运行

	/bin/bash ./get_android.sh


源码的下载时间会非常长，因此建议选择晚上下载。**由于macOS默认的节能设置，为了防止mac在长时间无操作以后休眠，因此建议修改macOS中关于节能相关的配置。修改路径为：系统偏好设置-》节能。下图为本人修改后的效果：**

![macOS中关于节能相关配置](../public/images/imac_android_source_resave.jpg '节能信息')

## 编译

当源码全部下载完成以后，就进入了源码编译环节。

### 编译前准备

#### 切换shell

在准备工作中已经提醒，为防止有人遗忘，再次提示一次。**由于Android的相关编译只能是使用bash，因此如果是使用zsh等其余的shell，请先切换shell到bash。**切换方法：

- 用如下命令切换shell: 

		$ chsh -s /bin/bash

- 重启终端。只有重启终端shell切换才会生效。	

	
#### 设置文件描述符限制

在macOS中，默认限制的同时打开的文件数量很少，不能满足编译过程中的高并发需要，因此需要在shell中运行命令：

	$ ulimit -S -n 1024

### 编译源码
	
#### 环境设置

在源码根目录（/Volumes/Document/android）下调用下面的命令：

	$ source build/envsetup.sh
	
#### 选择设备	

在命令行输入下面的命令选择打算编译的源码类型

	$ lunch
		
		You're building on Darwin
		
		Lunch menu... pick a combo:
		     1. aosp_arm-eng
		     2. aosp_arm64-eng
		     3. aosp_mips-eng
		     4. aosp_mips64-eng
		     5. aosp_x86-eng
		     6. aosp_x86_64-eng
		     7. full_fugu-userdebug
		     8. aosp_fugu-userdebug
		     9. mini_emulator_arm64-userdebug
		     10. m_e_arm-userdebug
		     11. m_e_mips-userdebug
		     12. m_e_mips64-eng
		     13. mini_emulator_x86-userdebug
		     14. mini_emulator_x86_64-userdebug
		     15. aosp_dragon-userdebug
		     16. aosp_dragon-eng
		     17. aosp_marlin-userdebug
		     18. aosp_sailfish-userdebug
		     19. aosp_flounder-userdebug
		     20. aosp_angler-userdebug
		     21. aosp_bullhead-userdebug
		     22. hikey-userdebug
		     23. aosp_shamu-userdebug
		
		Which would you like? [aosp_arm-eng]

根据后缀可以判断出使用的场景如下：

|类型 | 用途 |
|:---:|:---:|
|user|权限少，用于刷机使用|
|userdebug|和“user”类似，但可以root，并且可以调试|
|eng|具有开发配置，并且有额外的调试工具|

根据需要选择对应的类型，比如我选择 “1”

	Which would you like? [aosp_arm-eng] 1

	============================================
	PLATFORM_VERSION_CODENAME=REL
	PLATFORM_VERSION=7.1.1
	TARGET_PRODUCT=aosp_arm
	TARGET_BUILD_VARIANT=eng
	TARGET_BUILD_TYPE=release
	TARGET_BUILD_APPS=
	TARGET_ARCH=arm
	TARGET_ARCH_VARIANT=armv7-a
	TARGET_CPU_VARIANT=generic
	TARGET_2ND_ARCH=
	TARGET_2ND_ARCH_VARIANT=
	TARGET_2ND_CPU_VARIANT=
	HOST_ARCH=x86_64
	HOST_2ND_ARCH=x86
	HOST_OS=darwin
	HOST_OS_EXTRA=Darwin-16.1.0-x86_64-i386-64bit
	HOST_CROSS_OS=
	HOST_CROSS_ARCH=
	HOST_CROSS_2ND_ARCH=
	HOST_BUILD_TYPE=release
	BUILD_ID=NMF26Q
	OUT_DIR=out
	============================================

#### 开始编译

为了加快编译的速度，我们最好并发来编译，首先查看下本机CPU的内核数与线程数：

	$ sysctl machdep.cpu
	machdep.cpu.tsc_ccc.denominator: 0
	machdep.cpu.tsc_ccc.numerator: 0
	machdep.cpu.thread_count: 8
	machdep.cpu.core_count: 4

可以看到线程数为8，因此我们执行下面的命令开始源码相关的编译

	$ make -j16

参数-jN中的数字N，即为根据电脑线程数量设置的并发值，一般为线程数的1～2倍。**之后就会开启漫长的一到两个小时的编译过程。编译过程可能出错，出错以后继续运行命令编辑即可。**

编译结束以后，会显示下面的日志

	#### make completed successfully (01:28:02 (hh:mm:ss)) ####


#### 编译异常解决

在启动编译的过程中，比较常见的遇到的问题主要有：

- 文件分区不支持大小写

	- 错误现象

			Checking build tools versions...
			build/core/main.mk:159: ************************************************************
			build/core/main.mk:160: You are building on a case-insensitive filesystem.
			build/core/main.mk:161: Please move your source tree to a case-sensitive filesystem.
			build/core/main.mk:162: ************************************************************
			build/core/main.mk:163: *** Case-insensitive filesystems not supported.
			make: *** [out/build-aosp_arm.ninja] Error 1
	- 解决方案
			
		查看文章最开始准备工作中关于macOS分区配置的说明
	
- could not find jdk tools.jar

	- 错误现象
	
			$ make -j16
			build/core/config.mk:600: *** Error: could not find jdk tools.jar at /System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/../lib/tools.jar, please check if your JDK was installed correctly.  Stop.

	- 解决方案
			
		主要是因为环境变量没有设置`ANDROID_JAVA_HOME `导致的，添加对应的环境变量即可，输入下面的命令：
		
			export ANDROID_JAVA_HOME=$(/usr/libexec/java_home -v 1.8)

- 'syscall' is deprecated:

	- 错误现象：
	
		编译过程中直接报错，看编译报类似下文的错误：
		
			system/core/libcutils/threads.c:38:10: error: 'syscall' is deprecated: first deprecated in OS X 10.12 - syscall(2) is unsupported; please switch to a supported interface. For SYS_kdebug_trace use kdebug_signpost(). [-Werror,-Wdeprecated-declarations]
  			return syscall(SYS_thread_selfid);

	- 解决方案
		
		这是因为最新的macOS的调整引起的，个人下载的最新版的源码也没有解决这个问题，最终采用的方法是使用更早版本的macOS的SDK，下载地址参考前面准备工作中的说明。解压(也会用时比较久)zip包以后将`MacOSX10.11.sdk`拷贝到`/Applications/XCode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs`。为了避免下次升级的时候再被删除，建议拷贝到自定义目录，然后建立软链接。例如我放在~/lib目录下，再给它创建一个软链接：
		
			$ sudo ln -s ~/lib/MacOSX10.11.sdk /Applications/XCode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.11.sdk

	- 参考博客：解决macOSX10.12.SDK下编译Android Open Source Project出错的问题:[http://palanceli.com/2016/09/25/2016/0925AOSPOnMac/](http://palanceli.com/2016/09/25/2016/0925AOSPOnMac/)

- Jack server installation not found:

	- 错误现象：
	
			FAILED: /bin/bash -c "(prebuilts/sdk/tools/jack-admin install-server prebuilts/sdk/tools/jack-launcher.jar prebuilts/sdk/tools/jack-server-4.8.ALPHA.jar  2>&1 || (exit 0) ) && (JACK_SERVER_VM_ARGUMENTS=\"-Dfile.encoding=UTF-8 -XX:+TieredCompilation\" prebuilts/sdk/tools/jack-admin start-server 2>&1 || exit 0 ) && (prebuilts/sdk/tools/jack-admin update server prebuilts/sdk/tools/jack-server-4.8.ALPHA.jar 4.8.ALPHA 2>&1 || exit 0 ) && (prebuilts/sdk/tools/jack-admin update jack prebuilts/sdk/tools/jacks/jack-2.28.RELEASE.jar 2.28.RELEASE || exit 47; prebuilts/sdk/tools/jack-admin update jack prebuilts/sdk/tools/jacks/jack-3.36.CANDIDATE.jar 3.36.CANDIDATE || exit 47; prebuilts/sdk/tools/jack-admin update jack prebuilts/sdk/tools/jacks/jack-4.7.BETA.jar 4.7.BETA || exit 47 )"
			Unsupported curl, please use a curl not based on SecureTransport
			Jack server installation not found
			Unsupported curl, please use a curl not based on SecureTransport
			Unsupported curl, please use a curl not based on SecureTransport
			
			……
			
			make: *** [ninja_wrapper] Error 1	
	- 解决方案

		这是因为Jack需要基于OpenSSL的CURL，系统默认的并不是，因此选择用Homebrew重新安装一个。在命令行敲命令：

			$ brew install curl --with-openssl 
			
		安装好以后执行下面的命令修改环境变量，覆盖系统自带版本：
		
			$ export PATH=$(brew --prefix curl)/bin:$PATH

## 导入

至此源码已经编译OK，为了方便导入到Android Studio，我们还需要做一些准备工作。具体如下：

### 生成IDEA工程配置文件

首先是要编译idegen模块，在shell中执行如下命令:

	$ mmm development/tools/idegen/

如果在编译时得到了类似下面的错误信息

	-bash: mmm: command not found

只需要在源码目录下执行下面的明明后重试即可

	$ source build/envsetup.sh

在编译结束以后会有下面的提示：

	#### make completed successfully (46 seconds) ####

此时继续运行下面的命令生成对应的`android.ipr`、`android.iml` IDEA工程配置文件

	$ development/tools/idegen/idegen.sh

	Read excludes: 17ms
	Traversed tree: 218013ms

17s以后就完成了编译，在源码根目录下生成`android.ipr`和`android.iml`。

### 导入源码

启动Android Studio，然后选择打开一个已存在的Android Studio工程，选择源码根目录的`android.ipr`，经过**`漫长(我首次导入用了20分钟)`**的加载过程以后，Android 源码就已经成功的加载到了Android Studio中。

OK，至此我们就完成了在macOS(Sierra 10.12.1)上checkout出AOSP(7.1.1)并编译导入Android Studio的完整过程。

## 其他

1. 整个过程会非常长，耗时耗力，而且上面所有步骤间有互相依赖，建议严格按照顺序执行。
2. 个人在第一次分区时忘记修改文件系统为大小写敏感，重新分区时选择把下载的内容拷贝出去，重新分区，拷贝回来的方法，结果在编译时各种报错，最后选择删除根目录下除`repo、get_android.sh、.repo`以外的其余所有文件后重新运行repo init 和repo sync后重新checkout，再次编译就没有任何异常。因此**一定记得要建立正确的文件分区并选择正确的文件系统类型。**
3. 下载编译的时间都会很久，建议选择晚上进行。
