---
layout: post
title: Instrumentation框架介绍-Android自动化测试系列（三）
category: 终端开发
tags: android 测试
keywords: Instrumentation Activity Manager manifest TestCase ActivityTestCase  SyncBaseInstrumentation  SingleLaunchActivityTestCase ActivityUnitTestCase SyncBaseInstrumentation ActivityInstrumentationTestCase2 TestRunner InstrumentationTestRunner
description: 这篇里面主要介绍一下Instrumentation框架以及其实现原理、相关的工具类以及驱动类，介绍一下框架中主要的组成部分。
---

这篇里面主要介绍一下Instrumentation框架以及其实现原理、相关的工具类以及驱动类，介绍一下框架中主要的组成部分。

## Instrumentation框架介绍

Android测试环境的核心是一个Instrumentation框架，在这个框架下，你的测试应用程序可以精确控制应用程序。使用Instrumentation，你可以

- 在主程序启动之前，创建模拟的系统对象，如Context；
- 控制应用程序的多个生命周期；
- 发送UI事件给应用程序；
- 在执行期间检查程序状态。

###Instrumentation 原理

当你运行一个测试程序时，首先会运行一个系统工具叫做Activity Manager。Activity Manager使用Instrumentation框架来启动和控制TestRunner，这个TestRunner反过来又使用Intrumentation来关闭任何主程序的实例，然后启动测试程序及主程序（同一个进程中）。这就能确保测试程序与主程序间的直接交互。 


**Instrumentation框架通过将主程序和测试程序运行在同一个进程来实现这些功能。**Instrumentation和Activity有点类似，只不过Activity是需要一个界面的，而Instrumentation不需要，我们可以将它理解为一种没有图形界面的，具有启动能力的，用于监控其他类的工具类。

### 如何指定被测应用

通过在测试工程的manifest文件中添加<instrumentation>元素来指定要测试的应用程序。例如：

	<instrumentation
       android:name="com.example.wegame.test.MSDKTestInstrumentationTestRunner"
       android:targetPackage="com.example.wegame" />

这个元素的特性指明了要测试的应用程序包名targetPackage，以及告诉Android如何运行测试程序。

##Instrumentation TestCase类 

继承自JUnit TestCase类，并可以使用Instrumentation框架，用于测试Activity。使用Instrumentation，Android可以向程序发送事件来自动进行UI测试，并可以精确控制Activity的启动，监测Activity生命周期的状态。 

基类是InstrumentationTestCase。它的所有子类都能发送按键或触摸事件给UI。子类还可以注入一个模拟的Intent。 

子类有： 

- ActivityTestCase

	Activity测试类的基类。 

- SingleLaunchActivityTestCase

	测试单个Activity的类。**它能触发一次setup()和tearDown()，而不是每个方法调用时都触发**。如果你的测试方法都是针对同一个Activity的话，那就使用它吧。 

- SyncBaseInstrumentation

	测试Content Provider同步性的类。**使用它Instrumentation在启动测试同步性之前取消已经存在的同步对象**。 

- ActivityUnitTestCase

	对单个Activity进行单一测试的类。使用它，你**可以注入模拟的Context或Application**，或者两者。它用于对Activity进行单元测试。不同于其它的Instrumentation类，这个测试类不能注入模拟的Intent。 

- ActivityInstrumentationTestCase2

	在正常的系统环境中测试单个Activity的类。你不能注入一个模拟的Context，但你可以注入一个模拟的Intent。另外，你还**可以在UI线程（应用程序的主线程）运行测试方法，并且可以给应用程序UI发送按键及触摸事件**。 

##Instrumentation TestRunner 

Android提供了自定义的运行测试用例的类，叫做InstrumentationTestRunner。这个类控制应用程序处于测试环境中，在同一个进程中运行测试程序和主程序，并且将测试结果输出到合适的地方。IntrumentationTestRunner在运行时对整个测试环境的控制能力的关键是使用Instrumentation。而且即使你的测试类不使用Instrumentation，你也可以使用这个TestRunner。 

当你运行一个测试程序时，首先会运行Activity Manager。Activity Manager使用Instrumentation框架来启动和控制TestRunner，这个TestRunner反过来又使用Intrumentation来关闭任何主程序的实例，然后启动测试程序及主程序（同一个进程中）。这就能确保测试程序与主程序间的直接交互。 