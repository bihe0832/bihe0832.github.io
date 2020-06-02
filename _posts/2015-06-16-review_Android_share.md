---
layout: post
title: 再看Android官方文档之分享
category: 终端开发
tags: android
keywords: keywords
description: desc
---

## 分享简单数据

### 发送

- intent调用了Intent.createChooser()，那么Android总是会显示可供选择。

		Intent sendIntent = new Intent();
		sendIntent.setAction(Intent.ACTION_SEND);
		sendIntent.putExtra(Intent.EXTRA_TEXT, "This is my text to send.");
		sendIntent.setType("text/plain");
		startActivity(Intent.createChooser(sendIntent, getResources().getText(R.string.send_to));

- 分享二进制的数据需要结合设置特定的MIME类型，需要在EXTRA_STREAM里面放置数据的URI

- 我们可以使用`*/*`这样的方式来指定MIME类型，但是这仅仅会match到那些能够处理一般数据类型的Activity

- 接收的程序需要有访问URI资源的权限，可以将数据存储在ContentProvider中或者使用MediaStore系统。

### 接收

- 由于无法知道其他程序发送过来的数据内容是文本还是其他类型的数据，若数据量巨大，则需要大量处理时间，因此我们应避免在UI线程里面去处理那些获取到的数据。

## 分享文件

- Android的FileProvider组件提供了getUriForFile()方法创建一个文件的content URI。

### 建立文件分享

1. 指定FileProvider

	- android:authorities字段指定了希望使用的Authority，该Authority针对于FileProvider所生成的content URI
	
	- `<provider>`下的`<meta-data>`指向了一个XML文件，该文件指定了我们希望共享的目录路径

- 指定可共享目录路径
	
		<paths>
    		<files-path path="images/" name="myimages" />
		</paths>

	- “name”属性字段告知FileProvider在“files/images/”子目录中的文件的Content URI添加路径分段（path segment）标记：“myimages”。
	
	- `<files-path>`标签共享的是在我们应用的内部存储中“files/”目录下的目录
	
	- `<external-path>`标签共享的是位于外部存储的目录
	
	- Content URI将会包含下列信息：

		- <provider>标签中指定的Authority（“com.example.myapp.fileprovider”）；
		
		- 路径“myimages/”；
		
		- 文件的名字。
		
		- 事例：
				
				content://com.example.myapp.fileprovider/myimages/default_image.jpg
				
				
### 分享文件

- 调用setFlags()来为文件授予临时被访问权限是唯一的安全的方法。尽量避免对文件的Content URI调用Context.grantUriPermission()，因为通过该方法授予的权限，只能通过调用Context.revokeUriPermission()来撤销。

### 请求分享文件

- 因为客户端应用程序所收到的所有数据只有文件的Content URI而已。由于URI不包含目录路径信息，客户端应用程序无法查询或打开任何服务端应用程序的其他文件。

- openFileDescriptor()方法返回一个文件的ParcelFileDescriptor对象。客户端应用程序从该对象中获取FileDescriptor对象，然后利用该对象读取这个文件了

## PS，文件分享这部分内容好多都忘了，这里先停一下，做点东西实践一下

	
	
	