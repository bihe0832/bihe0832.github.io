---
layout: post
title: 照片整理系之视频归档整理方案
category: 在路上
tags: tags
keywords: 照片 整理
description: 
---

### 背景

从17年开始，陆续归档整理历史照片，在经过多次发现新的零星照片并归档以后，目前照片归档应该已经彻底OK了，这里是之前关于照片归档的几篇文章：

- 照片整理系列之整理及归档的总体方案： [https://blog.bihe0832.com/photos.html](https://blog.bihe0832.com/photos.html) 

- 照片整理系列之单次整理流程： [https://blog.bihe0832.com/photos-process.html](https://blog.bihe0832.com/photos-process.html) 

- 照片整理系列之基于命令行的照片整理及查看工具： [https://blog.bihe0832.com/photomanage.html](https://blog.bihe0832.com/photomanage.html) 

在归档完照片以后开始归档视频，视频的归档整理就方便多了，视频归档的总体方案以及遇到有问题的视频的处理方式与 [照片整理系列之整理及归档的总体方案](https://blog.bihe0832.com/photos.html) 里面的一致。因为视频的有效信息容易携带，但是极难丢失，因此这里仅介绍视频怎么获取视频的拍摄时间。

### 原理

- 获取视频的 creation_time 作为拍摄时间

- 使用 ffprobe 获取视频的基本信息，然后解析获取 creation_time

- 备注：

	 在整理的过程中发现，估计是之前的误操作，将一批视频的时间给抹去了，但是进一步研究发现，除了使用 creation_time ，还可以使用 tag_data ，这部分数据竟然没有抹去。
	 
####  ffprobe

- 下载：

	- iMac 下载：[https://evermeet.cx/ffmpeg/](https://evermeet.cx/ffmpeg/)
	
	- Windows下载：[https://www.gyan.dev/ffmpeg/builds/](https://www.gyan.dev/ffmpeg/builds/)

- 使用事例：

		➜  PhotoManager git:(master) ✗ ~/zixie/lib/ffprobe -v quiet -show_format  ./2/1/2020-09-10_11-28-11.MOV
			[FORMAT]
			filename=./2/1/2020-09-10_11-28-11.MOV
			nb_streams=2
			nb_programs=0
			format_name=mov,mp4,m4a,3gp,3g2,mj2
			format_long_name=QuickTime / MOV
			start_time=0.000000
			duration=88.375011
			size=9468829
			bit_rate=857149
			probe_score=100
			TAG:major_brand=mp42
			TAG:minor_version=1
			TAG:compatible_brands=isommp41mp42
			TAG:creation_time=2020-09-10T11:28:11.000000Z
			[/FORMAT]

### 整理

1. 统一文件名

	检查并自动优化命名不规范文件。

		/bin/bash ~/zixie/github/PhotoManager/shell/optimize.sh ./

	例如：

		➜  201802  /bin/bash ~/zixie/github/PhotoManager/shell/optimize.sh ~/3/
			~/3
			============ zixe check photos start ======================
			----------- process photo start -----------
			~/3/ start to check:
			process *.jpg
			mv: rename *.jpg to *.JPG: No such file or directory
			process *.png
			mv: rename *.png to *.PNG: No such file or directory
			----------- process photo end -----------
			----------- process photo start -----------
			~/3/201802/ start to check:
			process 2018-02-01_09-21-52.jpg
			process 2018-02-01_15-53-55.jpg
			process 2018-02-01_20-15-28.jpg
			process 2018-02-02_12-02-13.jpg
			process 2018-02-02_12-16-01.jpg
			process 2018-02-02_19-02-23.jpg
			process *.png
			mv: rename *.png to *.PNG: No such file or directory
			----------- process photo end -----------
			----------- delete DS_Store-----------
			----------- find bad name photo -----------
			~/3//201802/2018-02-03_13-05.JPG
			~/3//201802/2018-02-03-12-44-03.JPG
			============ zixe check photos finished ======================
			➜  201802  ls
			2018-02-01_09-21-52.JPG 2018-02-01_20-15-28.JPG 2018-02-02_19-02-23.JPG
			2018-02-01_15-50-00.JPG 2018-02-02_12-02-13.JPG 2018-02-03-12-44-03.JPG
			2018-02-01_15-53-55.JPG 2018-02-02_12-16-01.JPG 2018-02-03_13-05.JPG


2. 使用脚本根据拍摄时间归档视频

	在视频源文件目录运行脚本：
	
		/bin/bash ~/zixie/github/PhotoManager/shell/video.sh ./
		
	例如：
	
		➜  PhotoManager git:(master) ✗ /bin/bash ~/zixie/github/PhotoManager/shell/video.sh /Volumes/Document/Documents/temp/2/1/
		/Volumes/Document/Documents/temp/2/1
		============ zixe check video start a.MP4 ======================
		a.MP4
		2020-11-29_09-36-01
		rename a.MP4  to 2020-11-29_09-36-01.MP4
		============ zixe check video finished a.MP4 ======================
		============ zixe check video start a.MOV ======================
		a.MOV
		2020-09-10_11-28-11
		rename a.MOV  to 2020-09-10_11-28-11.MOV
		============ zixe check video finished a.MOV ======================
		============ zixe check video start a.M4V ======================
		a.M4V
		2018-10-28_07-23-17
		rename a.M4V  to 2018-10-28_07-23-17.M4V
		============ zixe check video finished a.M4V ======================
		----------- delete DS_Store-----------

3. 对于无法自动归档的视频，手动分析归档。归档方法可以参考：照片整理系列之整理及归档的总体方案： [https://blog.bihe0832.com/photos.html](https://blog.bihe0832.com/photos.html) 

#### 五、 备份

将归档后的视频迁移到常用盘，再次用常用盘复制到备份盘