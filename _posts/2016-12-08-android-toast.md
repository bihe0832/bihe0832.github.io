---
layout: post
title: Google也看不下去被玩坏的悬浮窗了么？
category: 终端开发
tags: android bug
keywords: Adding more than one toast window for UID at a time
description: Adding more than one toast window for UID at a time ;Unable to add window;window android.view.ViewRootImpl; has already been added
---

## 现象

使用全局悬浮窗的应用，在Android 7.1.1 (Android N MR1)上会crash，crash 堆栈类似下面：

	E/AndroidRuntime: FATAL EXCEPTION: main
         android.view.WindowManager$BadTokenException: Unable to add window -- window android.view.ViewRootImpl$W@32622a4 has already been added
             at android.view.ViewRootImpl.setView(ViewRootImpl.java:691)
             at android.view.WindowManagerGlobal.addView(WindowManagerGlobal.java:342)
             at android.view.WindowManagerImpl.addView(WindowManagerImpl.java:93)
             at com.tencent.ysdk.module.icon.impl.a.g(Unknown Source)
             at com.tencent.ysdk.module.icon.impl.floatingviews.q.onAnimationEnd(Unknown Source)
             at android.view.animation.Animation$3.run(Animation.java:381)
             at android.os.Handler.handleCallback(Handler.java:751)
             at android.os.Handler.dispatchMessage(Handler.java:95)
             at android.os.Looper.loop(Looper.java:154)
             at android.app.ActivityThread.main(ActivityThread.java:6119)
             at java.lang.reflect.Method.invoke(Native Method)
             at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:886)
             at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:776)
       	
	
同时在堆栈附近有下面这样一句话：

	Adding more than one toast window for UID at a time
	
## 背景

最近在开发一个悬浮窗功能，为了方便应用开发者的调用，个人采用了使用全局悬浮窗的方案；同时为了突破厂商的限制，同时又使用了将悬浮窗的type设置为Toast类型。下面是事例代码：

	WindowManager.LayoutParams params = new WindowManager.LayoutParams();
	params.format = PixelFormat.RGBA_8888;
	params.gravity = Gravity.LEFT | Gravity.TOP;
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
		params.type = WindowManager.LayoutParams.TYPE_TOAST;
	} else {
		params.type = WindowManager.LayoutParams.TYPE_PHONE;
	}

今天上午Google提示Android 7.1.1可以升级更新，然后就愉快的更新了系统，然后悲催的发现开发中的版本忽然crash了，其中上面的现象中已经说了问题现象。

- 官方关于 7.1.1的更新说明：[https://android-developers.blogspot.com/2016/12/welcoming-android-711-nougat.html](https://android-developers.blogspot.com/2016/12/welcoming-android-711-nougat.html)

## 解决思路

### 确定问题起因

根据crash的现象，感觉确定是在addView的时候出了问题。然后最近有调整的只有两个方面：

- 最近对模块相关的代码有修改，但是没有修改view添加相关的内容

原则上不是这个问题。为了缩小范围排除问题范围，因此先使用代码调整前的版本验证。结果发现问题依然存在，因此确定不是因为代码引起的。

- 今天上午升级了Android 7.1.1

使用另外一台同机型的 Android 7.0的设备验证，相同的包也不会出问题，因此基本上确认就是更新系统引起的。但是google应该不会把这么大的bug遗留下来，那就有可能是有一些变化和调整。

### 进一步分析原因

结合上面的crash堆栈和问题提示，个人感觉更有可能和`Adding more than one toast window for UID at a time`这句话有关，去google搜索一下，排在第一位的就是关于Android源码的说明：

- Android源码关于Toast修改的说明：[https://android.googlesource.com/platform/frameworks/base/+/dc24f93](https://android.googlesource.com/platform/frameworks/base/+/dc24f93)

- 核心内容：

		Prevent apps to overlay other apps via toast windows
		
		It was possible for apps to put toast type windows
		that overlay other apps which toast winodws aren't
		removed after a timeout.
		
		Now for apps targeting SDK greater than N MR1 to add a
		toast window one needs to have a special token. The token
		is added by the notificatoion manager service only for
		the lifetime of the shown toast and is then removed
		including all windows associated with this token. This
		prevents apps to add arbitrary toast windows.
		
		Since legacy apps may rely on the ability to directly
		add toasts we mitigate by allowing these apps to still
		add such windows for unlimited duration if this app is
		the currently focused one, i.e. the user interacts with
		it then it can overlay itself, otherwise we make sure
		these toast windows are removed after a timeout like
		a toast would be.
		
		We don't allow more that one toast window per UID being
		added at a time which prevents 1) legacy apps to put the
		same toast after a timeout to go around our new policy
		of hiding toasts after a while; 2) modern apps to reuse
		the passed token to add more than one window; Note that
		the notification manager shows toasts one at a time.
		
		bug:30150688
		
		Change-Id: Icc8f8dbd060762ae1a7b1720e96c5afdb8aff3fd


恩，看来滥用悬浮窗的问题已经很严重了，基本确认这次遇到的异常就是这个问题引起的。

## 解决方案

根据上面官方的说明，这个变更应该只涉及到Toast，因此只需要保证在7.1.1以上不滥用Toast即可。

### 临时解决方案

在代码中添加对于7.1.1以上版本的判断，7.1.1以上版本用回phone。代码如下：


	WindowManager.LayoutParams params = new WindowManager.LayoutParams();
	params.format = PixelFormat.RGBA_8888;
	params.gravity = Gravity.LEFT | Gravity.TOP;
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
	    if(Build.VERSION.SDK_INT > 24){
	        params.type = WindowManager.LayoutParams.TYPE_PHONE;
	    }else{
	        params.type = WindowManager.LayoutParams.TYPE_TOAST;
	    }
	} else {
	    params.type = WindowManager.LayoutParams.TYPE_PHONE;
	}

然后测试问题确实已经解决~

#### 对应github地址：[https://github.com/bihe0832/android-UCToast](https://github.com/bihe0832/android-UCToast)

### 最终解决方案

通过使用phone类型确实解决了crash的问题，但是没有解决厂商的限制，等厂商都升级到7.1.1以后，我们的悬浮窗弹出成功率又会大幅下降。由于我们的实际诉求本来就不是要添加全局的悬浮窗，之所以选择悬浮窗是为了降低第三方的接入成本。在目前这种前提下我们只好添加与第三方的交互，在新的版本调整实现方式，弃用全局悬浮窗，改为在应用内，通过应用添加悬浮窗实现。

## 题外话

目前对于全局的悬浮窗，不管是厂商还是官方，都已经出手开始限制，可见悬浮窗已经彻底被玩坏了~



