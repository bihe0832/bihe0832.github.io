---
layout: post
title: appium爬坑之iMac上appium环境搭建及使用真机测试Android项目简介
category: 终端开发
tags: Android 自动 测试 
keywords: appium Android iMac
description: 最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。这边文章主要介绍完整流程，后续会在其他文章介绍结合场景介绍具体的测试用例书写。
---

最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。

这边文章主要介绍完整流程，后续会在其他文章介绍结合场景介绍具体的测试用例书写。

## 环境准备

#### 设备环境

- 系统版本

    系统版本：	macOS 10.15.1 (19B88)
    内核版本：	Darwin 19.0.0

- 工具版本

        ➜  ~  echo $SHELL
        /bin/zsh
        ➜  ~  java -version
        java version "1.8.0_201"
        Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
        Java HotSpot(TM) 64-Bit Server VM (build 25.201-b09, mixed mode)
        ➜  ~  python3.7 -V
        Python 3.7.5
        ➜  ~  pip3.7 -V
        pip 19.3.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
        ➜  ~  node -v
        v13.1.0
        ➜  ~  cnpm -v
        6.12.1

####  下载Appium桌面版

官方的Appium桌面安装包可以从github下载，桌面版我主要是用来录制测试用例。

下载地址：[https://github.com/appium/appium-desktop/releases](https://github.com/appium/appium-desktop/releases)

下载后安装方法与其余应用安装一致。

#### 安装 Appium-Client

Appium-Client 主要用于提供后续自动化测试用例自动运行的环境。我们的测试用例使用python编写，因此这里指介绍Python的安装方式：

	pip install Appium-Python-Client

对于Python安装相关的问题，可以参考 [https://blog.bihe0832.com/imac-python.html](https://blog.bihe0832.com/imac-python.html)

## 编写或录制自动化测试

我直接选择了使用appium-desktop 来录制：

- 启动appium-desktop，然后直接点击“Start Server”
- 启动以后点击右上角的放大镜 ，启动录制Session配置界面
- 在上方切换到“Custom Server” TAB
- 在左下角的“Desired Capabilities”添加配置，具体配置项及对应说明，可以参考文档：
	
	[https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md)

	我是测试Android 加上使用真机，因此只添加了两项：

		{
		  "platformName": "Android",
		  "deviceName": "4fb845e3"
		}
	
- 配置OK，点击右下角Start Session
- 点击顶部录制按钮，开始录制
- 操作结束，点击 Recorder 右侧的复制按钮，复制生成的测试用例，然后保存到test.py文件

## 运行自动化测试用例

在命令行输入命令运行刚才的测试用例：

	python3.7 ./test.py
