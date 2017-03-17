---
layout: post
title: 制作终端产品演示的gif
category: 终端开发
tags: 工具 Android adb
keywords: 工具 Android adb gif imac mac macOS androidtool screenrecord PicGif GIF Brewery ezgif
description: 作为终端开发，经常需要展示项目进度或者UI的效果，此时最好的方法自然是提供安装包来亲自体验，然而有些时候有些场合做一些产品展示时这种形式并不适用，提供一个简单的视频或者动图是一种更好的演示方法。最近正好想做一些演示的gif，在网上查阅了很多录屏的方法，但都不是很好用，因此专门整理了一下制作终端产品演示的gif的工具和方法。
---

## 概述

作为终端开发，经常需要展示项目进度或者UI的效果，此时最好的方法自然是提供安装包来亲自体验，然而有些时候有些场合做一些产品展示时这种形式并不适用，提供一个简单的视频或者动图是一种更好的演示方法。最近正好想做一些演示的gif，在网上查阅了很多录屏的方法，但都不是很好用，因此专门整理了一下制作终端产品演示的gif的工具和方法。

### windows

在windows下有一款非常好用的工具，`ScreenToGif`，下载安装后即可使用，由于个人没有windows设备，因此不详细说明。

- ScreenToGif官网：[http://www.screentogif.com/](http://www.screentogif.com/)

### macOS

搜索看了下，目前mac上暂时没有类似windows上`ScreenToGif`这种成熟的应用，看来只能是曲线救国了，最终用了下面的方案来实现：

1. 录屏，首先操作手机录制操作过程的视频
2. 视频转gif，采用工具将录制的视频转为gif

接下来会逐个列出关于两个步骤的几种方案，实操过程中尝试过很多工具就不一一列出，仅提供个人试用后选择的方案。

## 录屏

录屏又有几种方式，具体如下

### androidtool-mac

androidtool-mac是一款使用Swift语言编写的工具，可在mac上对Android手机和智能手表进行一键截屏、录制视频和安装APK等操作。他其实也可以生成gif图片，只是生成效果不太好(相同的内容，gif的大小可能是视频的两倍)，因此一般建议只用来获取视频文件。

- github地址：

	[https://github.com/mortenjust/androidtool-mac](https://github.com/mortenjust/androidtool-mac)
	
-  下载地址：

	[https://github.com/mortenjust/androidtool-mac/releases/](https://github.com/mortenjust/androidtool-mac/releases/)


### android studio

其实，Android Studio 已经提供了屏幕截图和录制的方式，在Android Studio开发界面视图的Android Monitor界面中就有截图和屏幕录制的按钮，他可以提供最长三分钟的屏幕录制。

### command line

自然还是使用强大的adb命令。

- 录制命令

	视频格式为mp4，存放到手机sd卡里，默认录制时间为180s，可用ctrl + c结束录制。
	
		adb shell screenrecord /sdcard/screenre.mp4

- 指定录制时间：–time-limit，例如指定录制10S：
	
		adb shell screenrecord  --time-limit 10 /sdcard/screenre.mp4

- 指定分辨率：–size [`宽*高`]，例如指定录制分辨率为720*1280：
	
		adb shell screenrecord --size 720*1280 /sdcard/screenre.mp4

## gif转换

gif图片转换主要是两部分，一部分是将前一步的录制的视频转换为gif，另一步是将生成的gif进行进一步的压缩。

### 视频转gif

- PicGif Lite

	PicGif的功能非常强大,它允许用户在极短的时间内将照片和视频转换成栩栩如生的动态GIF图片. 用户可自定义GIF的大小, 播放顺序, 速度等。而且可以删除图片内容

- GIF Brewery 3

	GIF Brewery 是一款mac上的免费的视频转gif工具，它支持修改时长，剪切，在gif中插入文字图片等功能。

- ezgif

	ezgif 是一款在线的视频转gif工具。官网地址为：[https://ezgif.com/video-to-gif](https://ezgif.com/video-to-gif)

### gif 压缩

上面提供的几款工具都是将视频转化为gif的，但是部分gif转化后占用空间还是很大，因此可以通过一些gif的压缩工具来修改大小，下面是几款在线的压缩工具：

- [http://www.iloveimg.com/zh_cn/compress-image/compress-gif](http://www.iloveimg.com/zh_cn/compress-image/compress-gif)

- [http://www.tuhaokuai.com/image](http://www.tuhaokuai.com/image)

- [http://optimizer.youfiles.net/](http://optimizer.youfiles.net/)

