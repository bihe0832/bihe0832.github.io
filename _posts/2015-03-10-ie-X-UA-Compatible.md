---
layout: post
title: IE文档模式以及X-UA-Compatible
category: web前端
tags: web bug
keywords: IE X-UA-Compatible 
description: 文件兼容性用于定义让IE如何编译你的网页。此文件解释文件兼容性，如何指定你网站的文件兼容性模式以及如何判断一个网页该使用的文件模式。
---

最近SDK的Wiki遇到了新的问题，明明Wiki是可以支持IE8以上版本的，可是有个开发是IE11就是不可以。最后发现是兼容模式搞的鬼。他IE的兼容模式被设置为了IE7的标准。虽然可以通过手动调整兼容模式可以解决，但是每次去改还是模范，然后开发建议可以通过增加一个HTTP的X-UA-Compatible头解决。大概了解了下发现确实可以，修改完了已经OK了，顺便备忘下。

## 简介

为了帮助确保您的网页在将来的 Internet Explorer 版本中具有一致的外观，Internet Explorer 8 引入了文档兼容性。 文档兼容性是对 Microsoft Internet Explorer 6 中引入的兼容性模式的扩展，使您可以选择 Internet Explorer 用于显示网页的特定呈现模式。
本文将说明文档兼容性的必要性，列出对近来的 Internet Explorer 版本可用的文档兼容性模式，并演示如何选择特定的兼容性模式。

## 官方说明：

- 说明链接：https://technet.microsoft.com/zh-cn/scriptcenter/cc288325(v=vs.95).aspx

- 官方说明已经相当的详细，完全够用了，所以我就不费话了，这里就把最重要的列举一下。

## 怎么用

		<meta http-equiv="X-UA-Compatible" content="IE=7" /> 
		
## 怎么取值

| 内容值 | 含义 |
|: ---- :|: ---- :|
| IE=5 | 使用 Internet Explorer 5 Quirks 模式呈现内容。|
| IE=7 | 使用 Inernet Explorer 7 标准模式呈现内容。 |
| IE=8 | 使用 Internet Explorer 8 标准模式呈现内容。 |
| IE=9 | 使用 Internet Explorer 9 标准模式呈现内容。 |
| IE=10 | 使用 Internet Explorer 10 标准模式呈现内容。 |
| IE=Edge | 使用最新模式呈现内容。建议所有网站都采用此模式。 |
