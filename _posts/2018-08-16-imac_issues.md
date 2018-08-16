---
layout: post
title: iMac使用过程中的简单故障解决
category: 开发必备
tags: iMac
keywords: iMac mac 耳机 音响 空格 回车 失灵 风扇 噪音
description: 这篇文章主要总结记录一下在使用过程中遇到的一些常见问题，免得以后每次去谷歌。具体包括插了耳机还用音响播放、空格回车失灵、风扇噪音等
---

## mac 回车键、空格键失灵（非物理原因）、耳机失效、风扇异常等

- 问题现象：
	
	- 有时候iMac的键盘会忽然出现回车键和空格键失灵，其余按键都正常的现象。
	
	- 有时候忽然间iMac的风扇声音会非常大，而且即使不运行任何程序，也不会停下来

	- 有时候会遇到iMac或者mac Air插了耳机还是用音响播放音乐

- 解决方案：

	重置 Mac 上的系统管理控制器 (SMC)和 NVRAM 或 PRAM
	
- 具体步骤	

	1. 关机

	2. 按住 shift + control + option + 开关机键，10秒以上

	3. 关机
	
	4. 然后同时按住 option + command + r + p，等待电脑响4声后，放开

- 备注：
	
	以上四步并非都是必须，可以参考官方文档，看对应的问题需要重置那一个模块，如果无法确定，那就都重置吧
	
- 官方资料：

	-  [重置 Mac 上的 NVRAM 或 PRAM - Apple 支持](https://support.apple.com/zh-cn/HT204063)

	- [如何重置 Mac 上的系统管理控制器 (SMC) - Apple 支持](https://support.apple.com/zh-cn/HT201295)