---
layout: post
title: Robotium介绍-Android自动化测试系列（一）
category: 终端开发
tags: Android 测试
keywords: Monkey MonkeyRunner ActivityInstrumentationTestCase2 单元测试 Robotium 基于UI 黑盒 Junit
description: Robotium是一个基于模拟点击事件的用于进行黑盒测试的android测试的开源项目:[http://code.google.com/p/robotium/](http://code.google.com/p/robotium/)。不用做太多介绍哈。
---

最近项目提交测试的时候要求开发自测的内容越来越多，加上版本测试周期越来越长。为了提高版本的质量，因此在提测前会对一些主要功能点过一遍测试用例。由于功能模块太多，感觉手动测试太心酸。于是研究了一下Android的自动化测试，提升一下工作效率。个人主要用了以下的几个工具

- Monkey：主要是做一些模拟点击，看看有木有crash。另外也是做一些暴力测试。
- MonkeyRunner：自己没用，是看测试的黑盒是用这个写的，看了下不是很喜欢，所以没用。
- ActivityInstrumentationTestCase2：主要是用来做单元测试，尤其是对于接口参数的验证等，还是不错的
- Robotium：Robotium是一个对ActivityInstrumentationTestCase2的优化，主要用它做了基于UI的黑盒测试。

使用过程有一些心得，慢慢梳理。在本文中先梳理下一些常见的自动化测试工具以及简单介绍一下Robotium。

##Android 自动化测试工具

### Monkey & MonkeyRunner	

- 使用场景：一般用于做一些黑盒的暴力测试，使用MonkeyRunner也可以做一些基于UI的测试，但是由于按钮是通过像素定位，太局限。使用的也不是很多
- 优点: 上手简单，只需要apk
- 缺点: 如果做UI测试，需要编写脚本

### Android 的Junit

- 优点: 无所不能
- 缺点: 上手不容易，需要源码。（这部分做的不多，不做太多介绍）

### ActivityInstrumentationTestCase2 & Robotium

- 使用场景：个人主要是用于单元测试和基于UI的黑盒测试
- 优点: 足够简单，足够强大，支持apk测试
- 缺点: 还不能替代Android Junit

##Robotium

Robotium是一个基于模拟点击事件的用于进行黑盒测试的android测试的开源项目:[http://code.google.com/p/robotium/](http://code.google.com/p/robotium/)。

- 官网：[http://robotium.com/pages/user-guidem](http://robotium.com/pages/user-guide)

- 完整API：[http://robotium.googlecode.com/svn/doc/index.html](http://robotium.googlecode.com/svn/doc/index.html)

###一个简单的Robotium实例

这个是单机b版本的一个Robotium自动化测试的部分代码。里面已经涉及到了测试工程的整个生命周期：

	public class PlatformTestTest extends
		ActivityInstrumentationTestCase2<AGSDKActivity> {
	    
	    private Solo mSolo = null;
		//通用的一个暂停函数
	    public static int sLongTime = 1500;
	    
		public PlatformTestTest() {
			super(com.example.agsdkdemo.AGSDKActivity.class);
			mSolo = new Solo(getInstrumentation(), getActivity());
		}
		//测试用例执行前初始化，自动化测试准备
		@Override
		protected void setUp() throws Exception {
	        super.setUp();
		}
		//测试结束，释放资源，然后开始下一个测试用例
		@Override
		protected void tearDown() throws Exception {
			super.tearDown();
			getActivity().finish();
			mSolo.finishOpenedActivities();
		}
	
		//测试主体，在初始化以后会自动执行test开头的函数
		public void testAGSDKActivity() {
			mSolo.hideSoftKeyboard();
			getChannelID();
			getVersion();
			mSolo.sleep(PlatformTestTest.sLongTime);
		}
	
		public void getChannelID() {
			mSolo.clickOnView(
				mSolo.getCurrentActivity().findViewById(
					mSolo.getCurrentActivity().getResources	().getIdentifier(
						"getChannel","id",mSolo.getCurrentActivity().getPackageName())));
			mSolo.sleep(PlatformTestTest.sLongTime);
		}
		
		public void getVersion() {
			mSolo.clickOnView(mSolo.getCurrentActivity().findViewById(
					mSolo.getCurrentActivity().getResources	().getIdentifier(
						"getVersion","id",mSolo.getCurrentActivity().getPackageName())));
			mSolo.sleep(PlatformTestTest.sLongTime);
		}
	}

##附录

### 相关资源地址

官网：[http://robotium.com/pages/user-guidem](http://robotium.com/pages/user-guide)

Google Code：[http://code.google.com/p/robotium](http://code.google.com/p/robotium)

Robotium 官方提供的示例：[https://code.google.com/p/robotium/wiki/Getting_Started](https://code.google.com/p/robotium/wiki/Getting_Started)

官方FAQ：[https://code.google.com/p/robotium/wiki/QuestionsAndAnswers](https://code.google.com/p/robotium/wiki/QuestionsAndAnswers)

完整API：[http://robotium.googlecode.com/svn/doc/index.html](http://robotium.googlecode.com/svn/doc/index.html)

Robotium学习论坛：[http://www.robotium.cn/archives/category/course](http://www.robotium.cn/archives/category/course)

Robotium源码解析：[http://www.robotium.cn/archives/category/api](http://www.robotium.cn/archives/category/api)