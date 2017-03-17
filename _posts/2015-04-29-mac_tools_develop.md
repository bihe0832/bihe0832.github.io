---
layout: post
title: MAC常用开发工具介绍
category: 开发必备
tags: mac 工具
keywords: 包管理 Homebrew 流程图 Gliffy Diagrams 抓包 网络代理 chairs   Fiddler 快速启动工具 Alfred 终极 Shell zsh 最强终端 iTerm 订阅管理 Reeder
description: desc
---

工欲善其事，必先利其器。每个程序员都会有一套自己喜欢的，适用自己的提供工作效率的工具。之前每次换电脑总是要折腾一次，总会遗漏一些，这次就统一整理一下。这里主要介绍MAC下的一些提高效率或者很好用的工具。

### 包管理：Homebrew

主要用来安装一些开源软件，简化了开源软件的安装过程。Mac系统上主要的包管理有Macport和Homebrew，两者的区别主要是对依赖包处理方式不一样，MacPorts是下载所有依赖库的源代码，本地编译安装所有依赖，Homebrew是尽量查找本地依赖库，然后下载包源代码编译按照。

- 官网：

	[http://brew.sh/index_zh-cn.html](http://brew.sh/index_zh-cn.html)
- github：

	[https://github.com/Homebrew/homebrew](https://github.com/Homebrew/homebrew)

- 安装及使用方法：

	[http://blog.bihe0832.com/Homebrew.html](http://blog.bihe0832.com/Homebrew.html)

### 快速启动工具：Alfred

Mac下一款完美替代spotlight的工具，可以快速的搜索本地程序、使用搜索引擎搜索、查询词典、发送邮件、查找文件、剪贴板 管理、音乐控制等等功能，十分强大。

- 官网地址：

	[http://www.alfredapp.com/](http://www.alfredapp.com/)

- 使用手册：

	和spotlight一样，无需什么手册

- 高阶用法：

	[http://www.zhihu.com/question/20656680](http://www.zhihu.com/question/20656680)

### 终极 Shell：zsh

Zsh是一款强大的虚拟终端，既是一个系统的虚拟终端，也可以作为一个脚本语言的交互解析器。它在兼容Bash的同时有如下优点：更快、优化了的自动补全、优化的模式识别、Improved array handling、全面可定制。

- 使用方法：

	网上有很多，自行google。后续自己出一个。

- 个人配置文件：
	
	[https://github.com/bihe0832/Settings-Tools/blob/master/config/.zshrc](https://github.com/bihe0832/Settings-Tools/blob/master/config/.zshrc)

- oh-my-zsh相关文件：

	[https://github.com/bihe0832/Settings-Tools/blob/master/config/.oh-my-zsh.zip](https://github.com/bihe0832/Settings-Tools/blob/master/config/.oh-my-zsh.zip)，

	给懒人准备的，Mac自带了zsh，因此可以不用再安装，只需要加上对应的配置即可。

### 最强终端：iTerm

- iterm的一些主要优点：

   * 兼容性好
   * 快捷键丰富，自带/自己定义都很方便
   * 分屏简单方便，可以根据自己需要同时搭配上tmux，大屏用起来爽到爆  （分屏只需要 command ＋（shift）＋ d）
   
- 常用的快捷键和功能：

  1. ⌘ + 数字         ： 各 tab 标签切换
  2. ⌘ + f              ： 查找 ，所查找的内容会被自动复制 ,输入查找的部分字符，找到匹配的值按tab，即可复制
  3. ⌘ + d             ： 横着分屏 
  4. ⌘ + shift + d  ： 竖着分屏
  5. ⌘ + r = clear  ： 换到新一屏，而不是 类似clear ，会创建一个空屏
  6. ctrl + u            ：清空当前行，无论光标在什么位置
  7. (**) + ⌘ + ;     ： [(**) 输入的命令开头字符],会自动列出输入过的命令
  8. ⌘ + shift + h  ： 会列出剪切板历史
  9. ⌘← / ⌘→       :   到一行命令最左边/最右边 
  10. ⌘ + enter        :   全屏 
  
- 官网地址：

	[http://iterm2.com/](http://iterm2.com/)

- 使用手册：

	貌似有上面的快捷键就够了


### 流程图：Gliffy Diagrams

Gliffy Diagrams是一种全新类别的谷歌浏览器程序，它甚至可以脱机使用！适合于：基本绘图、流程图、 UML图表、网络图表、线框图和图样、网站地图、业务流程模型、组织机构图、平面图、文氏图、四点分析、技术图等。

- 特点：
	- 使用HTML5创建的易于使用的界面
	- 成千上万种行业标准的形状、箭头和图标
	- 网格对齐，绘图向导，形状对准和分布工具
	- 将您的图片拖放至画布上
	- 将图表导出成PNG格式（还将推出更多种文件格式）

- 官网地址：

	[https://www.gliffy.com/](https://www.gliffy.com/)

- chrome插件：

	[https://chrome.google.com/webstore/detail/gliffy-diagrams/bhmicilclplefnflapjmnngmkkkkpfad](https://chrome.google.com/webstore/detail/gliffy-diagrams/bhmicilclplefnflapjmnngmkkkkpfad)

### 抓包、网络代理：Charles & Fiddler

总的一句话：mac下Charles和windows下的Fiddler绝对是你最爱的抓包工具。


- Charles官网地址：

	[http://www.charlesproxy.com/](http://www.charlesproxy.com/)

- Charles使用方法：

	[http://drops.wooyun.org/tips/2423](http://drops.wooyun.org/tips/2423)

- Fiddler官网地址：

	[http://www.telerik.com/fiddler](http://www.telerik.com/fiddler)

- Fiddler使用方法：

	[http://blog.csdn.net/ihadl/article/details/7415904](http://blog.csdn.net/ihadl/article/details/7415904)

**备注：**上面附的关于chairs和fiddler的使用方法是随机找了，大概浏览还可以的。个人使用太久了，当时参考的博客找不到了。不过类似的网上很多



### Markdown 处理神器：MacDown

Markdown([点击了解](http://blog.bihe0832.com/markdow_intrduce.html))算是一门新兴语言。它设计的初衷就是让写字的人专注于写字，用纯文本简单的符号标记格式，最后再通过工具转换成鬼畜的 HTML/XHTML。Mou和MacDown都是 Mac 上的 Markdown 编辑器，两栏界面，直观清爽，功能简洁到位，会用的才知道。以前推荐mou，后来发现MacDown比Mou好太多……

- Mou官网地址：

	[http://25.io/mou/](http://25.io/mou/)

- MacDown官网地址：

	[http://macdown.uranusjr.com/](http://macdown.uranusjr.com/)

### 订阅管理：Reeder

在Google Reader关闭服务后，Feedly、Digg reader等产品异军突起，纷纷抢占这一市场。目前使用最爽的还是Reeder 2。

- 官网地址：

	[http://reederapp.com/](http://reederapp.com/)

- 个人RSS：

	[https://github.com/bihe0832/Settings-Tools/blob/master/xml/Subscriptions.opml](https://github.com/bihe0832/Settings-Tools/blob/master/xml/Subscriptions.opml)
