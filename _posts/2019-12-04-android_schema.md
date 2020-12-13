---
layout: post
title: H5页面通过指定Schema拉起Android应用
category: 终端开发
tags: android schema 
keywords: android schema h5 web 
description: 在终端开发中，经常会遇到Web页面与终端联动的需求，因此基本上终端都会添加schema支持。终端测试总是很方便，但是一旦和H5结合，尤其H5的页面还没开发好的时候，联动测试就比较麻烦。最近就顺手撸了一个工具，一劳永逸。这里不介绍终端页面如何添加schema支持。
---

在终端开发中，经常会遇到Web页面与终端联动的需求，因此基本上终端都会添加schema支持。终端测试总是很方便，但是一旦和H5结合，尤其H5的页面还没开发好的时候，联动测试就比较麻烦。最近就顺手撸了一个工具，一劳永逸。这里不介绍终端页面如何添加schema支持。

## Demo 使用

1. 使用PC浏览器打开URL：[https://cdn.bihe0832.com/tools/router/index.html](https://cdn.bihe0832.com/tools/router/index.html)

2. 按照下图的指引，输入URL后使用手机扫描即可跳转体验

	<img src="https://blog.bihe0832.com/public/images/router_page.png" width="80%" />

## 相关代码

- Demo 相关页面代码：

	[https://github.com/bihe0832/demo.bihe0832.com/tree/main/tools/router](https://github.com/bihe0832/demo.bihe0832.com/tree/main/tools/router)

- Demo 中浏览器及设备检测：

	[https://github.com/bihe0832/MultiQrcode](https://github.com/bihe0832/MultiQrcode)

## 实现原理

终端链接，实质上就是一个URL，然而不管是原生浏览器还是一些第三方浏览器，都对地址栏做了一些扩展功能，导致在地址栏直接输入URL并不能直接跳转。

我们只需要做一个中转页，在中转页加载或者点击的时候，使用window.location.href重定向到我们的schema即可。