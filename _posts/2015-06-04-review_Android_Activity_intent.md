---
layout: post
title: 再看Android官方文档之Activity&Intent
category: 终端开发
tags: android 
keywords: Activity onCreate OnDestroy onPause
description: Activity
---

#### Activity生命周期：

![Activity生命周期](../public/images/android-activity-basic-lifecycle.png "Activity生命周期")

#### 指定程序首次启动的Activity

- 如果程序中没有声明MAIN action或者LAUNCHER category的activity，那么在设备的主界面列表里面不会呈现app图标。

### 创建与销毁

#### onCreate

- onCreate里面尽量少做事情，避免程序启动太久都看不到界面
- activity在onStart()被调用后开始被用户可见

#### OnDestroy

- activity应该在onPause()与onStop()中执行清除activity资源的操作
- 如果activity含有在onCreate调用时创建的后台线程，或者是其他有可能导致内存泄漏的资源，则应该在OnDestroy()时进行资源清理，杀死后台线程。
- 除非程序在onCreate()方法里面就调用了finish()方法，系统通常是在执行了onPause()与onStop() 之后再调用onDestroy() 。

### 暂停与恢复

#### onPause

- 为了切换的顺畅要减少在OnPause()方法里面的工作量(避免在onPause时执行CPU-intensive 的工作，如写数据到DB等，它会导致切换变得缓慢。应该把他们放到onStop去做)。


### 停止与重启

#### onStop

- 当activity调用onStop()方法, activity不再可见，并且应该释放那些不再需要的所有资源。

- 极端情况下，系统会直接杀死app进程而并不执行activity的onDestroy()回调方法（系统内存紧张不在此情况下）, 因此我们需要使用onStop()来释放资源，从而避免内存泄漏。(这点需要注意)

- 应用不需在恢复到Resumed状态前重新初始化那些被保存在内存中的组件，系统在activity已经停止后，会将Activity对象保存在内存。

### 重新创建

#### onSaveInstanceState

- 被系统用来恢复之前状态而保存的数据被叫做 "instance state" ，它是一些存放在Bundle对象中的key-value pairs。

- 当用户离开Activity时，系统会调用onSaveInstanceState。当系统调用这个函数后，会在Activity被异常Destory时传递 Bundle 对象，这样我们就可以增加额外的信息到Bundle中并保存到系统中。

- 若系统在Activity被Destory之后想重新创建这个Activity实例时，之前的Bundle对象会(系统)被传递到你我们activity的onRestoreInstanceState()方法与 onCreate() 方法中。

- 跳转到其他的activity或者是点击Home都会导致当前的activity执行onSaveInstanceState。

- 从跳转的activity点击back回到前一个activity，那么跳转前的activity是执行退栈的操作，所以这种情况下是不会执行onSaveInstanceState的，因为这个activity不可能存在需要重建的操作。

- 必须要调用 onSaveInstanceState() 方法的父类实现，这样默认的父类实现才能保存视图状态的信息。

### 恢复Activity

#### onRestoreInstanceState

- onCreate与 onRestoreInstanceState回调方法都接能收到onSaveInstanceState回调的Bundle

- onRestoreInstanceState方法会在 onStart方法之后执行. 系统仅仅会在存在需要恢复的状态信息时才会调用 onRestoreInstanceState。

### Intent的发送

#### 建立隐式的Intent

- 为了验证是否有合适的activity会响应隐式的intent，需要执行queryIntentActivities() 来获取到能够接收这个intent的所有activity的list。若返回的List非空，那么我们才可以安全的使用这个intent。

- 为了显示chooser, 需要使用createChooser()来创建Intent，这样就可以列出可以响应createChooser()中Intent的app，并且指定了标题。

#### 接收Activity返回的结果

- 在执行startActivityForResult()时，可以使用explicit 或者 implicit 的intent。当`启动另外一个位于的程序中的activity时，我们应该使用explicit intent来确保可以接收到期待的结果。`

#### Intent过滤

- 当app被安装到设备上时，系统可以识别intent filter并把这些信息记录下来。当其他app使用implicit intent执行 startActivity() 或者 startActivityForResult()时，系统会自动查找出那些可以响应该intent的activity。

- 返回Result时默认的result code是RESULT_CANCELED.因此，如果用户在没有完成操作之前点击了back key，那么之前的activity接受到的result code就是"canceled"。
