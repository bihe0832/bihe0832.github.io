---
layout: post
title: Robotium二三事-Android自动化测试系列（二）
category: 终端开发
tags: Android 测试
keywords: clickOnView clickOnText scrollToSide getCurrentActivity clearEditText enterText setText sleep  hideSoftKeyboard takeScreenshot goBack 反射 基于APK测试 生命周期 堆栈
description: 这篇里面主要记录一些个人在使用Robotium的时候遇到的问题，以及解决的过程。也会留下一些尚未解决的问题，后续慢慢整理。
---

这篇里面主要记录一些个人在使用Robotium的时候遇到的问题，以及解决的过程。也会留下一些尚未解决的问题，后续慢慢整理。

##个人常用函数

Robotium提供了非常丰富的函数来模拟用户的各种输入。所有的API可以在这里查询：[http://robotium.googlecode.com/svn/doc/index.html](http://robotium.googlecode.com/svn/doc/index.html)。这里列出以下个人用的比较多，而且觉的好用的函数：

### 点击、滑动：
由于botton、TextView、ImageView等都继承自View，因此一般如果是模拟点击，或者基于View的事件，其实不需要具体到对应的控件，直接调用view的对应的点击事件即可。这也是为什么只有clickOnView，没有clickOnButton等的原因。具体常用的有

- clickOnView：执行控件的点击事件，需要获得该view的对象。
	
		mSolo.clickOnView(
            mSolo.getCurrentActivity().findViewById(
                mSolo.getCurrentActivity().getResources ().getIdentifier(
                    "getChannel","id",mSolo.getCurrentActivity().getPackageName())));

- clickOnText：执行控件的点击事件，参数为控件按钮的文字内容。（这个太强大了）。例如下面的代码：
		
		mSolo.clickOnText("关闭"); 

- scrollToSide：滑动屏幕

		mSolo.scrollToSide(Solo.RIGHT);

### 上下文：

- getCurrentActivity：获取当前的context。一般用于获取资源或者判断当前Activity的类型。例如下面的代码：

		while(mSolo.getCurrentActivity() instanceof com.tencent.agsdk.module.notice.view.AlertMsgActivity){
			//点击关闭键关闭公告
			mSolo.goBack();
			mSolo.sleep(PlatformTestTest.shortTime);
		}

### 输入：

- clearEditText：清空输入框内容，需要获得该View的对象。
- enterText：给指定的view输入内容，个人一般喜欢用view的setText函数。

		EditText input = 
			(EditText)mSolo.getCurrentActivity().findViewById(
				mSolo.getCurrentActivity().getResources().getIdentifier(
					"specialInput","id",mSolo.getCurrentActivity().getPackageName()));
		mSolo.clearEditText(input);
		input.setText("1");

### 系统函数：

- hideSoftKeyboard：隐藏键盘。。例如下面的代码：

		mSolo.hideSoftKeyboard();

- sleep：等待一段时间，单位为毫秒。一般是为了让程序点击后有足够时间来响应。测试用例中可能有多个地方需要sleep，为了方便修改，可以用个变量把所有的sleep的时间归在一处。

		mSolo.sleep(PlatformTestTest.shortTime);

- takeScreenshot：屏幕截图，保存在/sdcard/Robotium-Screenshots/
	
		mSolo.takeScreenshot("setUp");

- goBack：模拟点击退回键

		mSolo.goBack();

常用函数还有不少，目前个人主要是用上面的函数。所有函数的列表可以参考api文档。

## 开发中的一些经验

在开发中也遇到了几个坑，同时也总结出来一些经验，简单分享下。

### 获取ID的几种方式

在界面中，要想获取一个控件，有几种方法，直接getView也行，它支持通过ID，文字等获取。但是个人更喜欢使用原生的方式，因此更喜欢使用findViewById。这里就遇到一个问题。怎么获取一个资源的资源ID，也可以理解为指针。获取的方法一般有两种：

- 根据被测文件的gen中的R定义。
	
	这种情况下很容易获取到，尤其是如果是测试工程和被测工程在一起，基于源码测试就不会有问题。代码如下：

		EditText input = 
			(EditText)mSolo.getCurrentActivity().findViewById(com.example.agsdkdemo.R.id.specialInput);

	但是**在基于APK的测试中就很容易出问题，例如这里有两种情况就会有问题**：
	- 如果是基于APK的测试，当资源有变化的时候，R文件对应的值已经变化了，测试工程就会出错。
	- 动态打包：我们的demo是ant脚本根据SDK的级别生成的不同demo，同一个资源文件，不同demo中的R文件对应的值必然不一致。
	
以上两个原因，让基于APK的测试，想编译好一个包以后给测试同学长期使用就变得不现实了。每次重新出版本就发现自动化测试的工具不可用了，最终初步定位为是因为上面的问题（后面会再进一步确认）。为了解决这个问题，只好使用另一种方法：

- 反射调用（就想上面的例子中一样）
	
		EditText input = 
			(EditText)mSolo.getCurrentActivity().findViewById(
				mSolo.getCurrentActivity().getResources().getIdentifier(
					"specialInput","id",mSolo.getCurrentActivity().getPackageName()));
		
	这样即使更换了R文件的值，因为是反射调用，依然不会有问题。但是代码内容太多了，所以就简单封装了一个函数：

		public int getElementIdByName(String name) {
			return mSolo.getCurrentActivity().getResources().getIdentifier(
				name,"id",mSolo.getCurrentActivity().getPackageName());
		}


### 点击都直接用view

这个在介绍上面常用的函数的时候说过。这里列一下Android 中控件类的扩展结构。这里所有的控件的点击等公用方法都可以直接使用view的方法即可。

![Android 中控件类](../public/images/android_view.png "Android 中控件类")

### 怎么基于APK测试

基于源码的测试很简单，`工程 Run as Android Junit即可`。但是基于APK的测试，由于测试应用安装以后不会有icon显示，因此只好借助adb命令。主要以下几个步骤

1. 把测试工程和被测工程都安装在同一台机器上（真机或者模拟器均可）
2. 通过adb shell 的 am命令启动测试工程。命令示例如下：

		adb shell am instrument -w com.example.agsdkdemo.test/android.test.InstrumentationTestRunner

	其中`com.example.agsdkdemo.test`为测试应用的包名。输入命令以后如果安装正确即可启动自动化测试

## 目前还存在的一些困惑

上面是一些自己已经解决的问题，在开发中其实还有一些问题，是到目前为止还没解决的。暂时抛出来，后面慢慢解决。

### Activity 的生命周期

目前Robotium只提供了setUp和tearDown两个函数，但是目前对launcher Activity的生命周期与这两个函数的关系还有一些困惑。

2016年1月6日更新：

之前对于setUp和tearDown两个函数的理解有误，后来一直忘了更新，最近集中整理的时候发现这里一直没有更正，setUp和tearDown两个函数和应用activity的生命周期并无关系，这两个函数是在每个测试用例执行开始和结束以后执行，用户初始化对应测试用例的资源以及该用例结束以后的系统回收（基于SingleLaunchActivityTestCase的除外）。而对于具体的Activity的创建是在调用getActivity时完成的。
### 获取堆栈有问题

我们的被测试应用在启动的时候会弹出一个用Activity实现的对话框，然后当启动结束以后，发现通过adb dumpsys获取的堆栈是对的，但是通过getStack获取的和getCurrentActivity获取的都有问题。getStack的堆栈没有弹出的activity，getCurrentActivity获取到的是launcher Activity。由于别的事情打扰，这个地方还没有认真定位，也是一个遗留问题。