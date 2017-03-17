---
layout: post
title: 基于Instrumentation框架的自动化测试 - Android自动化测试系列（四）
category: 终端开发
tags: android  测试
keywords: Instrumentation Android TestCase JUnit setUp tearDown
description: 这篇里面主要介绍一下使用Instrumentation框架来进行自动化测试时的测试工程的结构和组成，以及运行自动化测试时的执行原理。
---

这篇里面主要介绍一下使用Instrumentation框架来进行自动化测试时的测试工程的结构和组成，以及运行自动化测试时的执行原理。

在之前的文章中提到过，基于Instrumentation框架的测试程序以单独的Android工程存在，他通过在manifest文件中指定要测试的应用程序。当你运行测试程序，Android会在相同进程里加载主程序，然后触发每个测试用例里的测试方法。 这里主要介绍下基于Instrumentation框架的自动化测试的组成。

## 测试工程 

基于Instrumentation框架的测试程序的工程与一般的Android并无太大区别，最关键的部分就是需要在应用的AndroidMainfest里面添加被测试的应用程序的声明。 

## 测试用例类 

一个测试程序包含一个或多个测试用例，它们都继承自Android TestCase类。测试用例类的选择取决于你要测试的Android组件的类型以及你要做什么样的测试。一个测试程序可以测试不同的组件，但每个测试用例类设计时只能测试单一类型的组件。 
 
## 测试方法 

每个测试用例类提供了可以建立测试环境和控制应用程序的方法。所有的测试用例类都提供了JUnit的setUp()方法来搭建测试环境，tearDown()方法在测试结束后完成资源回收等。但是不同的测试类对应两者执行的时间点并不一致。

测试用例类也提供了大量的对组件启动和停止控制的方法，在运行测试之前，你需要明确告诉Android启动一个组件，在整个测试用例期间，你只能调用这个方法一次，或者每个测试方法一次。例如，你可以使用getActivity()来启动一个Activity。甚至你可以在单个测试方法中，调用它的finishing()来销毁Activity，然后再调用getActivity()重新启动一个。 

## 运行测试并查看结果 

编译完测试工程后，你就可以使用am来运行测试程序。

- 给Activity Manager提供被测试程序的包名和TestRunner的名称。
- Activity Manager就会加载并启动你的测试程序，杀死主程序的任何实例，然后在测试程序的同一个进程里加载主程序
- 然后传递测试程序的第一个测试用例。这时，TestRunner会接管这些测试用例，运行里面的每个测试方法，直到所有的方法运行结束。 

## 测试什么？ 

除了一些功能测试外，这里还有一些你应该考虑测试的内容： 

- Activity生命周期事件

	你应该测试Activity处理生命周期事件的正确性。例如，一个Activity应该在pause或destroy事件时保存它的状态。记住一点的是屏幕方向的改变也会引发当前Activity销毁，因此，你需要测试这种偶然情况确保不会丢失应用程序状态。 

- 屏幕大小和分辨率

	在发布程序之前，确保在所有要运行的屏幕大小和分辨率上测试通过。你可以使用AVD来测试，或者使用真实的目标设备进行测试。 

- UI测试 

	在UI线程里处理动作，触屏和按键事件
 