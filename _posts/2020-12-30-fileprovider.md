---
layout: post
title: Android开发之FileProvider相关知识
category: 终端开发
tags: tags
keywords: File Provider Android
description: 之前开发的时候涉及到 FileProvider 相关的功能，梳理了一次，但是没有记录，最近再次遇到了，发现又要查询一次，就顺便总结记录一下。
---

之前开发的时候涉及到 FileProvider 相关的功能，梳理了一次，但是没有记录，最近再次遇到了，发现又要查询一次，就顺便总结记录一下。

### FileProvider使用方法

#### 配置FileProvider文件共享的路径

在res目录下创建一个xml目录，在xml目录下新建一个filepaths.xml，例如：

	<paths xmlns:android="https://schemas.android.com/apk/res/android"> 
	    <files-path name="ziexie_download" path="download/"/> 
	    ...
	</paths>
	
	
在<paths>标签中配置至少一个或多个path子元素，path子元素则用来定义content uri所对应的路径目录。以<files-path>为例：

- path 类型

		<files-path name="name" path="path" />
		
	返回 Context.getFilesDir() + path

		<cache-path name="name" path="path" />

	返回 Context. getCacheDir() + path

		<external-path name="name" path="path" />
		
	返回 Environment.getExternalStorageDirectory() + path

		<external-files-path name="name" path="path" />
		
	返回 Context.getExternalFilesDir(null) + path

		<external-cache-path name="name" path="path" />
		
	返回 Context.getExternalCacheDir() + path

		<external-media-path name="name" path="path" />
		
	返回 Context.getExternalMediaDirs() + path
		
		 <root-path name="zixie_file_provider" path="" />
		
	返回整个存储目录

- name属性：

	指明了 FileProvider 在content uri中需要添加的部分，这里的name为ziexie_download，所以对应的content uri为

		content://com.example.myapp.bihe0832/zixie_download
		
- path属性：

	对应的路径的子路径，这里的path值为"download/"。
	
	
以上面的例子，对应的配置当访问文件 content://com.example.myapp.bihe0832/zixie_download/test.apk 时，就会找到path路径Content.getFilesDir() + "/download/" 并查找 test.apk 文件

#### 获取FileProvider文件共享的路径

配置完共享地址后，获取content uri的值，这个uri即提供给第三方进行访问的uri地址

	File apkPath = new File(Context.getFilesDir(), "download");
	File apkFile = new File(apkPath, "test.apk");
	Uri contentUri = getUriForFile(getContext(), "com.example.myapp.bihe0832", newFile);
	