---
layout: post
title: iMac上Android Studio 相关设置及常见问题
category: 终端开发
tags: android 工具
keywords: Mac Android Studio 快捷键
description: desc
---
最近忙着写代码和倒腾AS，好久没写博客了，今天就小小总结一下个人使用AS中遇到的不太顺手的点，备忘一下。

电脑上的Android Studio装了已经有些时间了，然而因为所有工作中的项目都是ADT，所以虽然垂涎已久，但都是浅尝辄止。最近发现个开源项目挺好，终于强迫自己走上AS的不归路～～

因为用久了Eclipse，刚上手确实很不习惯，但是就算奔着分分种编出包也要用下去呀，中间遇到一些问题，这里简单记录一下啊。

## 界面风格和字体

1. AS的界面风格和编辑器中的字体风格是分开的。
- AS的界面风格在Apperance中调整，只需要关注Theme就可以了。
- AS的编辑器中字体的风格在Editor->Colors&Fonts->Font里面，但是因为你用了默认主题，所以字体大小是不能改的，要先点一下Save As变成你自己的主题，然后修改。

## 常用快捷键

遇到的第一个问题，就是快捷键，本来想改为和Eclipse一致的，最终在基友的劝说下决定既然走上不归路，就重新适应他的快捷键。整理了下常用的一些快捷键。

|操作             |     对应快捷键  |
----------------|----------------
| 删除行 | Cmd + del   |
| 格式化代码  | Cmd + Option + L |
| 查找+替换  | Cmd + R |
| 使用推荐 | option + enter |
| 清除无效包引用      | Option + Control + O |
| 查找调用的位置 | Option + F7|
| 全局修改 | Shift + F6|
| 上下移动代码        | Option + Shift + Up/Down |
| 注释代码(//)        | Cmd + /|
| 注释代码(/**/)      | Cmd + Option + / |
| 全局查找类       | Cmd + O|
| 全局设置及工具查找 | Cmd + Shift + A |
| 当前类查找变量或函数     | Cmd + F12|
 
## 重要插件

- Easy Gradle：https://plugins.jetbrains.com/plugin/index?xmlId=cn.renyuzhuo.plugin.easygradle

- Save Actions

- RoboPOJOGenerator ：https://plugins.jetbrains.com/plugin/8634-robopojogenerator

## 异常处理

### 通用大法

- clean整个工程

- Invalid Caches/Restart

- 关闭Android Studio，删除项目根目录的.idea 和.gradle 重启以后选择Open，重新打开，注意不是Open Recent

### 代码提示失效

Android Studio 默认会开启代码自动提示功能，发现不生效时，原因可能是开启了省电模式，当设置了省电模式，AS会禁掉一些辅助功能，所以代码自动提示也被禁掉了。省电模式阔以通过下面的方式关闭：File选项 -> 最后一项：Power Save Mode；取消选中即可。

### 更新AAR后没有生效

- clean 

- 去gradle的缓存删除对应aar的缓存

- Invalid Caches/Restart

- **最有效的方法：AAR换个名字，重编生效以后再改回去**

### 清空缓存

Android 项目生成的缓存包括：

- Gradle缓存目录下的第三方引用的完整缓存

- 项目根目录下的.gradle 和 .idea

- Android Studio 的缓存

- 项目代码build目录生成的内容
	