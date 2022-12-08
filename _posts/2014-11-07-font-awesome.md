---
layout: post
title: Font Awesome, 为 Bootstrap 而创造的图标字体
category: 前端开发
tags: web 工具
keywords: Awesome Bootstrap css 酷炫
description: Font Awesome 是一套完美的图标字体，主要目的是和 Bootstrap 搭配使用
---

## 快速检索

[https://blog.bihe0832.com/pages/font-awesome.html](https://blog.bihe0832.com/pages/font-awesome.html)

## 特性

###一个字体文件， 249 个图标

一个字体文件包含了所有图标。Font Awesome 助你完整表达web页面上每个动作的含义。

### 用CSS控制样式

用CSS能非常容易的改变这些图标的颜色、大小、阴影以及任何CSS能控制的属性。

###无限缩放
  矢量图意味着每个图标都能在所有大小的屏幕上完美呈现。
### 专为Bootstrap设计
Font Awesome是完全从头设计的整套图标，完全和<a href="https://www.bootcss.com/" target="_blank">Bootstrap 2.2.2</a>版本兼容.

## 集成

将Font Awesome 集成到 Bootstrap 非常容易，还可以被单独使用。

### 最简单的 Bootstrap + Font Awesome 集成方式

使用这种方式将 Font Awesome 集成到默认的 Bootstrap CSS中。

1. 拷贝 Font Awesome 字体目录到你的项目中。
- 拷贝 font-awesome.min.css 文件到你的项目中。
- 打开你的项目中的 font-awesome.min.css 文件并编辑字体路径指向正确的位置。**字体路径是相对于你的 CSS 目录的。**
- 在html文档中的 <head> 部分，引入 font-awesome.min.css 文件。

		<link rel="stylesheet" href="../css/bootstrap.min.css">
		<link rel="stylesheet" href="../css/font-awesome.min.css">

- 在浏览器中打开页面，检查是否正确启用了 Font Awesome!

### 需要支持 IE7 浏览器？

1. Get Font Awesome working properly in a modern browser.
- Copy font-awesome-ie7.min.css into your project.
- In the <head> of your html, reference the location to your font-awesome-ie7.min.css.

		<link rel="stylesheet" href="../css/bootstrap.min.css">
		<link rel="stylesheet" href="../css/font-awesome.min.css">
		<!--[if IE 7]>
		<link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css">
		<![endif]-->
- Go complain to whoever decided your project needs IE7 support.

## HTML实例

### 使用事例：

	<a href="https://weibo.com/bihe0832" target="_blank"><i class="fa fa-weibo fa-x"></i></a>

### 图标列表

[https://blog.bihe0832.com/pages/font-awesome.html](https://blog.bihe0832.com/pages/font-awesome.html)

## 参考内容

1. [https://www.bootcss.com/p/font-awesome/](https://www.bootcss.com/p/font-awesome/)
2. [https://www.thinkcmf.com/font/icons#web-application](https://www.thinkcmf.com/font/icons#web-application)
