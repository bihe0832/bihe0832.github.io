---
layout: post
title: android.view.WindowManager$BadTokenException,Unable to add window
category: 终端开发
tags: android bug
keywords: android.view.WindowManager$BadTokenException,Unable to add window dialog
description: 通过谷歌和stackFlow找到报错在new AlertDialog.Builder(mcontext)中，虽然这里的参数是Context，但我们不能使用getApplicationContext()获得的Context，而必须使用Activity的上下文。
---
## 问题概述：

今天SDK的bita测试遇到不少异常的crash，其中crash的关键日志都是类似这种：

	com.example.wegame,8928838,android.view.WindowManager$BadTokenException,Unable to add window -- token null is not for an application  

通过谷歌和stackFlow找到报错在new AlertDialog.Builder(mcontext)中，虽然这里的参数是Context，但我们不能使用getApplicationContext()获得的Context，而必须使用Activity的上下文，原因也很简单。**因为只有一个Activity才能添加一个窗体。 **

**`出错代码`**：

	Context appContext = this.getApplicationContext();
	dialog = new Dialog(appContext);

## 解决方法：

将new AlertDialog.Builder(Context context)中参数你要弹框的Activity的上下文即可。

	dialog = new Dialog(YourActivity.this);


## 参考文章：
- [http://code.google.com/p/android/issues/detail?id=11199](http://code.google.com/p/android/issues/detail?id=11199)
- [http://stackoverflow.com/questions/2634991/android-1-6-android-view-windowmanagerbadtokenexception-unable-to-add-window](http://stackoverflow.com/questions/2634991/android-1-6-android-view-windowmanagerbadtokenexception-unable-to-add-window)