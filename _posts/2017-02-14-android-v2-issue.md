---
layout: post
title: 一个关于APK Signature Scheme v2签名的神奇bug定位经历
category: 终端开发
tags: android
keywords: keywords
description: desc
---

## 背景

前段时间因为项目关系，根据官方文档和Android源码写了一个校验APK是否使用了Android V2 签名的工具：[Android的APK Signature Scheme v2签名及一款基于Java环境的校验工具介绍
](http://blog.bihe0832.com/android-v2-signature.html)。当时的思路**检查一个APK的ZIP Central Directory前面是否包含V2签名必需的APK Signing Block，如果有说明这个包是V2签名的包，然后校验其V2签名验证是否通过**。

在工具写完以后，官方签名校验工具的开发者Alex邮件联系我告诉官方其实已经提供了类似的工具apksig，对应源码为：[https://android.googlesource.com/platform/tools/apksig](https://android.googlesource.com/platform/tools/apksig)，但是因为工具已经有了，而且和他交流他表示直接使用Android源码的方式也是可以行的，因此就没有仔细去对比官方实现和自己方案的异同。也没有对比官方代码对校验工具做优化。

## 问题现象

工具写完以后对应用库里面的应用进行了一次扫描，发现果然很多应用存在问题，当时判断自己写的工具是有效的，抽样检查发现他们确实无法在7.0 以上设备安装，也使用官方工具校验了发现确实没有问题就没有再管。

年前上班的最后一天，忽然有开发反馈过来，发现有应用使用工具校验没有问题

	➜  java -jar ~/lib/CheckAndroidV2Signature.jar  ./test.apk
	{"ret":0,"msg":"ok","isV2":false,"isV2OK":false}

但是却在Android 7.0及以上的机器上无法安装，提示错误

	➜  adb install ./test.apk
	Failed to install test.apk Failure [INSTALL_PARSE_FAILED_NO_CERTIFICATES: Failed to collect certificates from /data/app/vmdl2077545153.tmp/base.apk: META-INF/YSDK.SF indicates /data/app/vmdl2077545153.tmp/base.apk is signed using APK Signature Scheme v2, but no such signature was found. Signature stripped?]

拿到应用的apk后用官方的工具验证存在问题，下面是使用官方工具验证的结果：

	$ANDROID_HOME/build-tools/25.0.0/apksigner verify ./test.apk
	DOES NOT VERIFY
	ERROR: JAR signer YSDK.RSA: JAR signature META-INF/YSDK.SF indicates the APK is signed using APK Signature Scheme v2 but no such signature was found. Signature stripped?

解压缩apk以后发现`META-INF`文件夹中的摘要文件中关于应用签名版本的字段的内容如下：

	X-Android-APK-Signed: 2

也就是签名的摘要文件中标记该应用使用Android V2签名，但是为什么在校验签名的时候，又找不到V2签名必需的APK Signing Block呢？

由于马上春节放假了，因此没有足够时间对问题做详细的定位，只能是先临时解决问题，调整了校验方案改为**检查一个APK的ZIP Central Directory前面是否包含V2签名必需的APK Signing Block或者摘要文件中X-Android-APK-Signed的定义是否为2，如果有签名块或者定义确实为2说明这个包是V2签名的包，然后校验其V2签名验证是否通过。** 

修改工具以后再取校验有问题的apk

	➜  java -jar ~/lib/CheckAndroidV2Signature.jar  ./test.apk
	{"ret":-3,"msg":"com.bihe0832.checksignature.ApkSignatureSchemeV2Verifier$SignatureNotFoundException: No APK Signing Block before ZIP Central Directory","isV2":true,"isV2OK":false}

恩，虽然没有找到原因，但是看来这一类有问题的APK应该是可以通过这个方法过滤了。使用优化后的工具一扫，发现竟然存在非常大的一批应用存在这个问题，一度怀疑是工具有问题，通过抽样检测验证确实都有问题以后才放心放假回家。

## 问题分析

因为发现基本上所有使用了V2签名但是又检验不通过的APK都是因为开发者使用了老的渠道包打包方式但是又不了解V2签名造成的，而且这个通过这个问题扫出来的应用的量非常大，因此个人初步认为这类APK应该是使用了一种特殊改包方式造成的，而且这种方式在开发者中很流行，应用非常广泛。

目前应用最广的几种APK内注入内容的方法主要有：

### 反编译添加内容以后再签名

这种情况下原则上不会影响签名，莫非是使用了V2打包，注入以后又用了jarsigner签名导致的？于是自己选了一个使用V2打的包，先用工具校验一下：

	➜  java -jar ~/lib/CheckAndroidV2Signature.jar ./test.apk
	{"ret":0,"msg":"ok","isV2":true,"isV2OK":true}

然后反编译apk

	➜  java -jar -Duser.language=en -Duser.home=$ANDROID_HOME/build-tools/25.0.2 ~/lib/apktool.jar d -f ./test.apk
	
在assets文件夹中添加`channel.txt`文件后重新打包并使用jarsigner签名

	➜  java -jar -Duser.language=en -Duser.home=$ANDROID_HOME/build-tools/25.0.2 ~/lib/apktool.jar b -o ~/a.apk ./test/
	1  jarsigner -verbose -keystore ~/lib/ysdk.keystore -signedjar ./test.apk ./a.apk 'ysdk'
	输入密钥库的密码短语:
	   正在添加: META-INF/MANIFEST.MF
	   正在添加: META-INF/YSDK.SF
	   正在添加: META-INF/YSDK.RSA
	  正在签名: AndroidManifest.xml
	  
	  …………
	  

然后使用工具校验

	➜  java -jar ~/lib/CheckAndroidV2Signature.jar ./test.apk
	{"ret":0,"msg":"ok","isV2":false,"isV2OK":false}

也就是完全是一个V1签名的包，不会有问题，因此可以确定不是这个原因引起的。

### 直接在zip包的注释段添加内容

这种是另一种使用比较广泛的渠道包打包方案，但是这种方案打的包不会破坏V2打包的APK Signing Block，使用第一版的工具就可以校验出来，这类包使用工具校验的时候会报下面的错误：

	➜  1  java -jar ~/lib/CheckAndroidV2Signature.jar ./test.apk
	{"ret":0,"msg":"get signature failed, throw an SecurityException","isV2":true,"isV2OK":false}
	
### 通过脚本在`META-INF`文件夹注入内容

这种方案实现起来比较简单，而且可操作性比较强，因此是一种使用非常广泛的方案，他的核心原理是首先生成一个签名以后的包，然后使用脚本在`META-INF`文件夹中注入一个文件，该文件的内容或者文件名就是需要注入APK的信息。由于在V1签名下，`META-INF`文件夹中注入内容并不会破坏APK的签名，因此这种方法和上面的注释段添加内容的方法都被开发者在具体的开发中广泛的应用。接下来我们通过脚本尝试一下这种注入会带来什么问题:

首先准备注入的脚本，这里我用了一个Python写的注入脚本，功能是使用脚本用数据流在`META-INF`文件夹注入一个`channel_`的文件，里面保存对应的渠道号。因为注入不是重点，因此不专门说明脚本的运行规则。

	#!/usr/bin/python
	# coding=utf-8
	import zipfile
	import shutil
	import os
	import sys
	
	# 目标apk名字前缀
	targetApkNamePrefix = "YSDK-TEST"
	# 当前打包的apk版本
	targetApkVersion = "v1.0.0"
	    
	target_channel = "channel1"
	
	if len(sys.argv) < 2 :
	
	    print("\n\tplease enter the apk name as command para like:")
	    print("\n\tpython MultiChannelBuildTool.py ./test.apk")
	    os._exit(0)
	
	src_apk = sys.argv[1];
	extension = os.path.splitext(src_apk)[1][1:]
	
	if extension != 'apk':
	    print("first para must be the apk with extension name")
	
	src_apk_file_name = os.path.basename(src_apk)
	# 分割文件名与后缀
	temp_list = os.path.splitext(src_apk_file_name)
	# name without extension
	src_apk_name = temp_list[0]
	# 后缀名，包含.   例如: ".apk "
	src_apk_extension = temp_list[1]
	
	# 创建生成目录,与文件名相关
	output_dir = 'bin_' + src_apk_name + '/'
	# 目录不存在则创建
	if not os.path.exists(output_dir):
	    os.mkdir(output_dir)
	
	# 拼接对应渠道号的apk
	target_apk = output_dir + targetApkNamePrefix + "_" + target_channel + "_" + targetApkVersion + src_apk_extension
	# 拷贝建立新apk
	shutil.copy(src_apk, target_apk)
	# zip获取新建立的apk文件
	zipped = zipfile.ZipFile(target_apk, 'a', zipfile.ZIP_DEFLATED)
	# 初始化渠道信息
	empty_channel_file = "META-INF/channel_{channel}".format(channel=target_channel)
	# 写入渠道信息
	zipped.writestr(empty_channel_file, target_channel + "\n")
	# 关闭zip流
	zipped.close()
	print("打包完成")

脚本OK以后，我们选择测试应用，先用工具检测，没有问题

	➜  java -jar ~/lib/CheckAndroidV2Signature.jar test.apk
	{"ret":0,"msg":"ok","isV2":true,"isV2OK":true}

然后运行命令注入内容：
	
	➜  1  python ./test.py ./test.apk
	打包完成

使用脚本验证生成的apk

	➜  1  java -jar ~/lib/CheckAndroidV2Signature.jar ./bin_test/YSDK-TEST_channel1_v1.0.0.apk
	{"ret":-3,"msg":"com.bihe0832.checksignature.ApkSignatureSchemeV2Verifier$SignatureNotFoundException: No APK Signing Block before ZIP Central Directory","isV2":true,"isV2OK":false}

就是如此神奇，问题复现了~~

我们把APK包解压缩了以后检查一下，果然在`META-INF`文件夹中已经注入一个`channel_`的文件，打开对应的`*.SF`文件，果然里面的关于应用签名版本的字段的内容如下：

	X-Android-APK-Signed: 2

至此问题终于确定了，找到了复现的办法以后，问题的原因就很容易理解了~
	

## 问题总结

当确定是因为在`META-INF`文件夹注入内容引起APK校验失效以后，瞬间就可以可理解为什么是这样了。

1. 应用使用了V2签名出包，因此整个包都是一个V2的包，然后在`*.SF`中自然也会记录为使用V2签名。
2. 应用开发者在出包以后使用脚本动态注入了一个文件到`META-INF`文件夹中，此时因为文件内容有变化，APK Signing Block的文件头位置已经发生了位移，但是这种方式并没有去修改文件头起始位置
3. 当应用安装的时候，读取签名文件中的签名版本发现是使用V2签名，因此就去校验V2，但是发现并不能找到APK Signing Block，所以报上面的错误。

## 解决方案

至此，问题已经定位清楚，可以确定修改以后的脚本可以解决所有的问题。

- 对于应用开发者，如果想要继续使用上面的第二第三种打包方式的话，只能是选择禁用V2签名，禁用方法可以参考文章：[Android的APK Signature Scheme v2签名及一款基于Java环境的校验工具介绍](http://blog.bihe0832.com/android-v2-signature.html)；或者是使用新开发的注入方法，目前了解已经有多个团队都已经实现了基于V2的注入方法，方法和点评团队开源的类似，相关文档可以参考：[新一代开源Android渠道包生成工具Walle](http://tech.meituan.com/android-apk-v2-signature-scheme.html )

- 对于渠道，如何检测开发者提供的APK是否使用V2签名可以继续使用本文开头提到的工具，而且目前个人也已经完成了官方校验工具的封装，也可以直接使用封装了官方校验工具的jar，均在同一个gtihub下开源：[https://github.com/bihe0832/AndroidGetAPKInfo](https://github.com/bihe0832/AndroidGetAPKInfo)