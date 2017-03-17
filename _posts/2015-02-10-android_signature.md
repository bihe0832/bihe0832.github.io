---
layout: post
title: Android签名校验机制（数字证书）
category: 终端开发
tags: android 签名 工具
keywords: Android 签名 signature keystore keytool jarsigner
description: 在Android 系统中，所有安装到系统的应用程序都必有一个数字证书，此数字证书用于标识应用程序的作者和在应用程序之间建立信任关系,如果一个permission的protectionLevel为signature，那么就只有那些跟该permission所在的程序拥有同一个数字证书的应用程序才能取得该权限。
---

之前有多个游戏遇到关于签名错误的问题，加上有些游戏开发不熟悉Android签名校验的机制以及打包的方法，就专门总结了一下，现在整理一下。
首先放上官方文档链接:[http://developer.android.com/tools/publishing/app-signing.html](http://developer.android.com/tools/publishing/app-signing.html)

## 什么是签名

就是只有信息的发送者才能产生的别人无法伪造的一段数字串，这段数字串同时也是对信息的发送者发送信息真实性的一个有效证明。数字签名是个加密的过程，数字签名验证是个解密的过程。

## 为什么有签名

- 最简单直接的回答： 系统要求的。

- 通俗的解答：

	Android系统要求每一个Android应用程序必须要经过数字签名才能够安装到系统中，也就是说如果一个Android应用程序没有经过数字签名，是没有办法安装到系统中的！

- 装逼的解答：  
   
	在Android 系统中，所有安装到系统的应用程序都必有一个数字证书，此数字证书用于标识应用程序的作者和在应用程序之间建立信任关系,如果一个permission的protectionLevel为signature，那么就只有那些跟该permission所在的程序拥有同一个数字证书的应用程序才能取得该权限。

## 签名怎么来

数字证书的私钥保存在程序开发者的手中。Android将数字证书用来在应用程序的作者和应用程序之间建立信任关系，不是用来决定最终用户可以安装哪些应用程序。这个数字证书并不需要权威的数字证书签名机构认证，它只是用来让应用程序包自我认证的。

## 签名的两种模式

### 调试模式(debug mode)

在调试模式下，ADT会自动的使用debug密钥为应用程序签名，因此我们可以直接运行程序。

- debug密钥：一个名为debug.keystore的文件

- 存放位置：C:\Users\用户名\.android\debug.keystore

debug签名的两个风险：

1. debug签名的应用程序不能在Android Market上架销售，它会强制你使用自己的签名；

- debug.keystore在不同的机器上所生成的可能都不一样，就意味着如果你换了机器进行apk版本升级，那么将会出现程序不能覆盖安装的问题。

### 发布模式(release mode)

发布程序时，开发者需要使用自己的数字证书给apk包签名。使用自己的数字证书给APK签名有两种方法。将在下文描述。

## 签名方法

### 使用keytool签名

1. 生成私钥：

		keytool -genkey -keystore bihe0832.keystore -alias bihe0832 -keypass android -keyalg RSA -validity 40000
	
	**常用参数含义：**

	- genkey 在用户主目录中创建一个默认文件”.keystore”
	- alias 产生别名 每个keystore都关联这一个独一无二的alias，这个alias通常不区分大小写
	- keystore 指定密钥库的名称(产生的各类信息将不在.keystore文件中)
	- keyalg 指定密钥的算法 (如 RSA DSA，默认值为：DSA)
	- list 显示密钥库中的证书信息 keytool -list -v -keystore 指定keystore -storepass 密码
	- v 显示密钥库中的证书详细信息
	
	**非常用参数含义：**

	- validity 指定创建的证书有效期多少天(默认 90)
	- keysize 指定密钥长度 （默认 1024）
	- storepass 指定密钥库的密码(获取keystore信息所需的密码)
	- keypass 指定别名条目的密码(私钥的密码)
	- dname 指定证书发行者信息 其中： “CN=名字与姓氏,OU=组织单位名称,O=组织名称,L=城市或区域名 称,ST=州或省份名称,C=单位的两字母国家代码”
	- export 将别名指定的证书导出到文件 keytool -export -alias 需要导出的别名 -keystore 指定keystore -file 指定导出的证书位置及证书名称 -storepass 密码
	- file 参数指定导出到文件的文件名
	- delete 删除密钥库中某条目 keytool -delete -alias 指定需删除的别 -keystore 指定keystore – storepass 密码
	- printcert 查看导出的证书信息 keytool -printcert -file g:\sso\michael.crt
	- keypasswd 修改密钥库中指定条目口令 keytool -keypasswd -alias 需修改的别名 -keypass 旧密码 -new 新密码 -storepass keystore密码 -keystore sage
	- storepasswd 修改keystore口令 keytool -storepasswd -keystore g:\sso\michael.keystore(需修改口令的keystore) -storepass pwdold(原始密码) -new pwdnew(新密码)
	- import 将已签名数字证书导入密钥库 keytool -import -alias 指定导入条目的别名 -keystore 指定keystore -file 需导入的证书

2. 对APK进行签名

 - 使用jarsigner 签名
 
		jarsigner -verbose -keystore bihe0832.keystore -signedjar agsdkdemo_signed.apk  agsdkdemo.apk bihe0832.keystore
    
		
	**参数含义：**    
	
	- verbose 输出签名的详细信息
	- keystore  bihe0832.keystore 密钥库位置
	- agsdkdemo_signed.apk :名后产生的文件demo_signed
	- agsdkdemo.apk :要签名的文件demo.apk
	- bihe0832.keystore:密钥库
			
	**注意事项：**android工程的bin目录下的demo.apk默认是已经使用debug用户签名的，所以不能使用上述步骤对此文件再次签名。正确步骤应该是:在工程点击右键->Anroid Tools-Export Unsigned Application Package导出的apk采用上述步骤签名。

 - 使用apksigner 签名

		$ANDROID_HOME/build-tools/25.0.1/apksigner sign --ks ~/lib/bihe0832.keystore ./debug-ysdk.apk
 
	**参数含义：**   
	 
	- sign 给应用签名
	- --ks ~/lib/bihe0832.keystore 密钥库位置
	- ./debug-ysdk.apk 要签名的应用
	
	**注意事项：** apksigner是Android官方提供的签名及校验工具，从Android SDK Build Tools的24.0.3版本开始支持，具体路径在SDK目录的build-tools目录下。
		
		
### 使用Eclipse直接导出带签名的APK

Eclipse直接能导出带签名的最终apk，非常方便，推荐使用，步骤如下：

1. 导出

	![导出](../public/images/android_signure_eclipse_export.png "导出")

- 选择工程：选择你要导出apk的工程

- 创建密钥库keystore,输入密钥库导出位置和密码，要记住密码

	![创建密钥库keystore](../public/images/android_signure_eclipse_export.png "创建密钥库keystore")

- 填写密钥库信息，填写一些apk文件的密码，使用期限和组织单位的信息

- 输入生成带签名的apk文件的位置。

## 常见问题

1. 如果遇到了ZipException invalid entry compressed size的错误，主要原因是平时Eclipse使用的ADT插件已经赋予了DEBUG权限的数字签名，我们可以通过导出一个未签名的APK文件就可以解决。

- 使用jarsigner工具来签名，出现无法对jar进行签名：java.util.zip.ZipException: invalid entry compressed size (expected xxx but got xxx bytes)这样的提示。这些问题主要是由于资源文件造成的，对于android开发来说应该检查res文件夹中的文件，逐个排查。这个问题可以通过升级系统的JDK和JRE版本来解决。

- 安装apk过程中出现：INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES。这样的问题主要是签名冲突造成的，比如你使用了ADB的debug权限签名，但后来使用标准sign签名后再安装同一个文件会出现这样的错误提示，解决的方法只有先老老实实从手机上卸载原有版本再进行安装，而adb install -r参数也无法解决这个问题。

## 参考文章：

1. [http://www.cnblogs.com/wanqieddy/p/3556060.html](http://www.cnblogs.com/wanqieddy/p/3556060.html)
2. [http://www.tttabc.com/android/keytool-keystore-jarsigner-apk.htm](http://www.tttabc.com/android/keytool-keystore-jarsigner-apk.htm)
3. [http://yangguangfu.iteye.com/blog/723182](http://yangguangfu.iteye.com/blog/723182)
4. [关于Android的APK Signature Scheme v2签名相关的资料汇总](http://blog.bihe0832.com/android-v2.html)



