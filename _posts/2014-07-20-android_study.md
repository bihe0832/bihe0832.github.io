---
layout: post
title: Android学习之路
category: 终端开发
tags: android 学习资源
keywords: android 入门
description: 最近看到的一篇极好的关于Android入门的系列文章，回头在看，温故而知新！
---

### 最近看到的一篇极好的关于Android入门的系列文章，回头在看，温故而知新！

       原文地址：http://stormzhang.github.io/android/2014/07/07/learn-android-from-rookie/
    

## 开发环境

*   [Eclipse ADT][1]
    
        Google帮你集成了一个完整的Android开发环境，包含一个定制的Eclipse + ADT plugin，以及最新的SDK及源码
        

*   [IntelliJ IDEA][2]
    
        相比与Eclipse更推荐使用IDEA，以后可以无缝过渡到Android Studio
        

*   [Android Studio][3]
    
        首先说明这个不适合新手们使用，但是你必须知道这是Google最新推出的Android开发工具，基于IDEA，编译依赖[Gradle][5]，目前还没有推出1.0的正式版，但是你依然可以业余项目熟悉了解下，因为这也许是Android开发工具的未来
        

<!--more-->

## Google Android官方教程 {#google_android}

[Android Training Course in Chinese][4]

## Android基础 {#android}

上面可能是一个比较全面系统的培训教程，对于新手们可能对某些需要着重掌握的东西比较迷茫，于是整理下个人认为新手们必须要掌握的知识点，顺便也会附带相应觉得不错的讲解博客地址。

*   [两分钟彻底让你明白Android Activity生命周期(图文)!][5]
    
        Activity实际开发中使用频率最高，这个必须要理解
        

*   [Android四大基本组件介绍与生命周期][6]
    
        Android中的四大组件必须得知道，也是面试常问到的
        

*   [ListView的基本使用与优化][7]
    
        ListView是所有控件中最常使用且对新手来说比较复杂的用法，各种Adapter的使用以及ListView的优化都是必须掌握的
        

*   [Android系统用于Activity的标准Intent][8]
    
        Intent解决了Android中四大组件的通讯，非常有用，这篇博客收集整理了系统的标准Intent
        

*   [Android 屏幕适配][9]
    
        介绍一些Android屏幕适配的基础
        

*   [Android中SQLite应用详解][10]
    
        Android中的SQLite需要掌握，这篇博客很适合新手
        

*   [Android Fragment完全解析][11]
    
        3\.0之后新加的Fragment，必须要掌握，目前使用的场景也是越来越普遍了
        

## Android中级 {#android_2}

*   [Android应用程序的生命周期][12]
    
        Android的应用程序的生命周期需要理解，面试也是经常会被问的
        

*   [带你一步步深入了解View][13]
    
        View做为UI开发中最常用到的，必须要深入理解
        

*   [Android Service完全解析][14]
    
        Service作为Android四大组件之一，在每一个应用程序中都扮演着非常重要的角色
        

*   [Android Gson][15]
    
        目前比较常用比较流行的数据格式就是json了，这篇博客教你如何使用Google Gson库来进行json解析
        

*   [Android 布局优化][16]
    
        Android开发中经常会用到xml布局，那么布局优化方面的知识更是需要掌握的了
        

*   [Android中Intent传递对象的两种方法(Serializable,Parcelable)][17]
    
        详细讲解了Android中Intent中如何传递对象
        

*   [Android异步消息处理机制完全解析][18]
    
        Android开发中异步操作是经常使用的，必须理解掌握
        

*   [Android AsyncTask完全解析][19]
    
        Android异步操作的另一种方法
        

*   [Android Custom Loading][20]
    
        很早的一个小demo，教你如果做一个App的Loading动画
        

## Android进阶 {#android_3}

*   [Android Gradle][21]
    
        Google官方Android新的构建系统，可以很方便的管理依赖、编译打包等
        

*   [Android 性能优化][22]
    
        一系列的性能调优教程，让你的代码以及App更畅通！
        

*   [一个完整的开源项目–9GAG][23]
    
        一个开源客户端，教你使用Studio、Gradle以及一些流行的开源库快速开发一个不错的Android客户端
        

*   [整理的Android开发资源][24]
    
        自己整理的一些Android开发资源，包括开发、工具、设计等，相信会对你有用的
        

## Android设计 {#android_4}

    在开发一款Android App之前，你需要了解下Android平台的设计规范，这里有一系列关于Android Design的讲解以及Google最新推出的Material Design中文翻译版
    

*   [Android Design][25]

*   [Material Design][26]

## Android开发必知的一些开源库 {#android_5}

说到开源库就不得不提[GitHub][27]，只能说是目前最活跃的开源社区，不知道的赶紧去注册个账号使用起来，绝对是你快速提升技术的利器。

#### [Volley][28] {#volley}

App开发中免不了要和服务端进行交互，而volley是Google官方推出的一个开源的网络通信库，它能使网络通信更简单，更快速。

*   [Volley完全解析][29]

*   [Android volley sample][30]

#### [ActiveAndroid][31] {#activeandroid}

ActiveAndroid算是一个轻量级的ORM(对象关系映射(Object Relation Mapping))框架，简单地通过如save()和delete()等方法来做到增删改查等操作。

*   [ActiveAndroid–Android轻量级ORM框架][32]

#### [Retrofit][33] {#retrofit}

Retrofit和Java领域的ORM概念类似， ORM把结构化数据转换为Java对象，而Retrofit 把REST API返回的数据转化为Java对象方便操作。同时还封装了网络代码的调用。

*   [Retrofit – Java(Android) 的REST 接口封装类库][34]

#### [Android-Universal-Image-Loader][35] {#androiduniversalimageloader}

Android-Universal-Image-Loader是一个强大的开源图片异步加载库，该项目的目的是提供一个可重复使用的仪器为异步图像加载，缓存和显示。

*   [Android-Universal-Image-Loader][36]

#### [Android开源项目分类汇总][37] {#android_6}

非常全面的GitHub开源项目汇总，不需要重复发明轮子，尽情遨游在开源世界里吧

 [1]: http://developer.android.com/sdk/index.html
 [2]: http://www.jetbrains.com/idea/
 [3]: http://developer.android.com/sdk/installing/studio.html
 [4]: http://hukai.me/android-training-course-in-chinese/index.html
 [5]: http://blog.csdn.net/android_tutor/article/details/5772285
 [6]: http://www.cnblogs.com/bravestarrhu/archive/2012/05/02/2479461.html
 [7]: http://www.cnblogs.com/noTice520/archive/2011/12/05/2276379.html
 [8]: http://blog.csdn.net/zhangjg_blog/article/details/10901293
 [9]: http://stormzhang.github.io/android/2014/05/16/android-screen-adaptation/
 [10]: http://blog.csdn.net/liuhe688/article/details/6715983
 [11]: http://blog.csdn.net/guolin_blog/article/details/8881711
 [12]: http://blog.csdn.net/android_tutor/article/details/4952960
 [13]: http://blog.csdn.net/guolin_blog/article/details/12921889
 [14]: http://blog.csdn.net/guolin_blog/article/details/11952435
 [15]: http://stormzhang.github.io/android/2014/05/22/android-gson/
 [16]: http://stormzhang.github.io/android/2014/04/10/android-optimize-layout/
 [17]: http://blog.csdn.net/android_tutor/article/details/5740845
 [18]: http://blog.csdn.net/guolin_blog/article/details/9991569
 [19]: http://blog.csdn.net/guolin_blog/article/details/11711405
 [20]: http://stormzhang.github.io/openandroid/2013/11/15/android-custom-loading/
 [21]: http://stormzhang.github.io/android/2014/02/28/android-gradle/
 [22]: http://www.trinea.cn/android/android-performance-demo/
 [23]: https://github.com/stormzhang/9GAG
 [24]: http://stormzhang.github.io/android/2014/06/05/android-awesome-resources/
 [25]: http://www.geekpark.net/tag/Android%20Design
 [26]: http://design.1sters.com/
 [27]: https://github.com/
 [28]: https://android.googlesource.com/platform/frameworks/volley
 [29]: http://blog.csdn.net/guolin_blog/article/details/17482095
 [30]: https://github.com/stormzhang/AndroidVolley
 [31]: http://github.com/pardom/ActiveAndroid
 [32]: http://stormzhang.github.io/openandroid/android/sqlite/2013/12/20/android-orm-tools-activeandroid/
 [33]: http://square.github.io/retrofit/
 [34]: http://blog.chengyunfeng.com/?p=491
 [35]: https://github.com/nostra13/Android-Universal-Image-Loader
 [36]: http://stormzhang.github.io/android/openandroid/2013/12/01/android-universal-image-loader/
 [37]: https://github.com/Trinea/android-open-project