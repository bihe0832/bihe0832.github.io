---
layout: post
title: SDK热更系列之如何获取应用在当前设备上的so对应的指令集
category: 终端开发
tags: SDK
keywords: Android SDK 热更
description: desc
---

开始之前先来几句废话。

今年的博客更新频率低了很多，而且最近几周微信公共账号的更新也暂停了一段时间，没能坚持下来，确实是自己的问题。不过今年这半年确实事情太多，不管是工作还是私事，从来都感觉时间完全不够用。目前SDK的相关工作已经正常，热更也基本上进入开发的中后期，因此开始逐渐把一些之前积累的内容补上，后续会把上半年遇到的计划的文章陆续更新完成。

由于上半年做的事情中，最大的一块就是SDK的热更新，因此就从SDK的热更新开始分享，后面会穿插分享别的内容。

这篇文档优先介绍在SDK热更中遇到到的第一个比较头疼的特殊的问题：如何获取应用在当前设备上的so对应的指令集。具体来说就是当要更新so的时候，怎么才能知道当前机器上安装的应用使用的是哪个指令集对应的so，然后给他下发对应指令集的so。接下来会从为什么要获取、目前主流热更怎么获取、为什么SDK热更获取会更麻烦，我们的解决思路等多个方面逐一介绍。

## 指令集介绍

Different Android handsets use different CPUs, which in turn support different instruction sets. Each combination of CPU and instruction sets has its own Application Binary Interface, or ABI. The ABI defines, with great precision, how an application's machine code is supposed to interact with the system at runtime. You must specify an ABI for each CPU architecture you want your app to work with.

来源于官方介绍：[ABI Management](https://developer.android.com/ndk/guides/abis.html)

不同类型的移动设备在运行APP时，需要加载自己支持的类型的so库，不然就Crash了。通过 Build.SUPPORTED_ABIS 我们可以判断当前设备支持的ABI，不过一般情况下，不需要开发者自己去判断ABI，Android系统在安装APK的时候，不会安装APK里面全部的so库文件，而是会根据当前CPU类型支持的ABI，从APK里面拷贝最合适的so库，并保存在APP的libs目录下面。

## 目前主流 Android 热更方案的实现方式

目前关于Android热更的文章和方案其实已经很多了，然而所有的方案都有几个特点：

1. 都是应用的热更
2. 都重点介绍dex更新和资源更新，对于so的更新介绍都很简单

分析了一下原因，主要是：

1. 目前hotfix等方案都是Android应用热更新使用的一些方案。
2. 一般应用都很少使用so，而且即使使用so，很多应用都是直接只使用armeabi，所以热更时直接下发对应的so就行。
3. 一般应用使用的so都不会很大，所以即使下发所有指令集的so并没有太大影响。

当然也了解了一下目前通用或者比较多的做法：

1. 直接下发armeabi的so
2. 下发所有指令集下的so，然后逐个去加载，如果抛出异常就尝试下一个类型，直到成功

## 为什么SDK遇到这个问题就会变这么难

1. SDK是提供基础服务给第三方开发者，SDK不能保证开发者对于SDK所有接口的调用时机和调用方式
2. 游戏开发者并不一定会提供全指令集的so

带来的结果就是在SDK更新so时：

1. 不能直接下发armeabi的so，因为对于对指令集兼容很好的游戏，我们应该根据对应的CPU类型提供对应的so
2. 不能简单的下发CPU对应的so，因为大部分游戏还是会偷懒，只使用某一个指令集的CPU，这时候游戏使用的指令集和CPU类型并不般配
3. 不能直接下发所有的so，然后通过逐个加载的方式来找合适的配型，因为目前YSDK的so是YSDK的加密逻辑，启动前必须加载，如果用这种方式，会大大加长游戏启动时间。

## 我们的解决之道


### 解决思路

在整个过程中我们的**最终诉求就是热更时要下发与当前机型和应用都适配的指令集对应的so**。

而且我们已知：

1. 游戏肯定已经集成了我们的so
2. 根据Android应用安装和启动的原理我们知道：在应用安装的时候，系统会选择加载应用已经集成的，最适合当前机型的so

因此基于上面的两个原因，我们可以借助系统来帮我们选择最合适的so，我们只需要保证我们下发的so和应用当前加载的so是同一个指令集就可以解决这个问题

**此时核心诉求就变成了怎么获取当前加载的so对应的指令集**。

### 具体方案

进一步分解，获取当前加载的so对应的指令集就进一步细化为两个问题：

1. 怎么找到当前加载的so
2. 怎么根据当前加载的so，获取他的指令集

接下来的内容将会介绍一下我们在解决这两个问题的时候尝试过的一些方法。

### 怎么找到当前加载的so

#### 1. 直接去应用安装目录找

根据应用安装的原理，所有应用安装的时候，系统都会选择与机型相匹配的so，然后拷贝到`/data/app-lib`目录下，因此我们可以直接去对应目录读取，或者直接到/data/data/libs下面读取。但是这个方法可能会有兼容性的问题，所以不建议使用。例如在Nexus 6P上，这个目录就变成了：`/data/app/packageName/lib/`

#### 2. 通过PathClassLoader

平时如果我们使用默认so加载的时候，都是直接使用System.loadLibrary，这个时候我们并没有提供具体的路径，系统是怎么找到的呢？通过分析源码可以看看他的实现原理：

	/**
     * See {@link Runtime#loadLibrary}.
     */
    public static void loadLibrary(String libName) {
        Runtime.getRuntime().loadLibrary(libName, VMStack.getCallingClassLoader());
    }

实现非常简单，先获取到虚拟机的全局的ClassLoader，然后由Runtime通过Runtime.loadLibrary()的实现，这里还是看不出他是怎么获取so的路径的。继续深入Runtime的loadLibrary

	/*
     * Searches for and loads the given shared library using the given ClassLoader.
     */
    void loadLibrary(String libraryName, ClassLoader loader) {
        if (loader != null) {
            String filename = loader.findLibrary(libraryName);
            if (filename == null) {
                // It's not necessarily true that the ClassLoader used
                // System.mapLibraryName, but the default setup does, and it's
                // misleading to say we didn't find "libMyLibrary.so" when we
                // actually searched for "liblibMyLibrary.so.so".
                throw new UnsatisfiedLinkError(loader + " couldn't find \"" +
                                               System.mapLibraryName(libraryName) + "\"");
            }
            String error = doLoad(filename, loader);
            if (error != null) {
                throw new UnsatisfiedLinkError(error);
            }
            return;
        }

        String filename = System.mapLibraryName(libraryName);
        List<String> candidates = new ArrayList<String>();
        String lastError = null;
        for (String directory : mLibPaths) {
            String candidate = directory + filename;
            candidates.add(candidate);

            if (IoUtils.canOpenReadOnly(candidate)) {
                String error = doLoad(candidate, loader);
                if (error == null) {
                    return; // We successfully loaded the library. Job done.
                }
                lastError = error;
            }
        }

        if (lastError != null) {
            throw new UnsatisfiedLinkError(lastError);
        }
        throw new UnsatisfiedLinkError("Library " + libraryName + " not found; tried " + candidates);
    }

通过loadLibrary的代码可以发现他一执行就是根据ClassLoader是否为空进入不同的逻辑找到so，然后调用nativeLoad来加载，这里我们重点关注怎么找到so：

1. 当ClassLoader非空，就调用loader.findLibrary函数来获取so的路径
2. 当ClassLoader为空，先根据so的名称，获取so的完整文件名，然后在mLibPaths里面去逐个查找

一般的，由于这个ClassLoader因为是java虚拟机提供的，因此可以认为这个case并不会发生，尤其是在应用启动以后，所以我们重点关注当ClassLoader非空时，调用loader.findLibrary函数来获取so的路径的方法。

直接使用应用的ClassLoader加载，结果发现竟然 getApplicationContext().getClassLoader()竟然没有findLibrary函数，原来在ClassLoader里面，他被声明为protected，通过查文档发现PathClassLoader继承自BaseDexClassLoader（继承自ClassLoader），同时BaseDexClassLoader的findLibrary函数是public的，因此，**我们可以直接用PathClassLoader的findLibrary来获取so的路径**。因此最终获取so文件路径的代码如下：

	final String YSDK_SO_NAME = "YSDK";
	PathClassLoader pathClassLoader = (PathClassLoader)getApplicationContext().getClassLoader();
	String soPath = pathClassLoader.findLibrary(YSDK_SO_NAME);
	File soFile = new File(soPath);
 	
#### 3. 使用ApplicationInfo的nativeLibraryDir字段

在使用PathClassLoader已经调试通过的时候，查看ApplicationInfo的代码的时候，发现里面有一个nativeLibraryDir的字段，查看文档，官网文档介绍如下：

	nativeLibraryDir			Added in API level 9
	String nativeLibraryDir
	Full path to the directory where native JNI libraries are stored.

因此我们也可以直接使用这个参数来获取so的路径，具体代码如下：

	final String YSDK_SO_NAME = "YSDK";
	String filepath = getApplicationContext().getApplicationInfo().nativeLibraryDir;
	filepath = filepath + "/" + System.mapLibraryName(YSDK_SO_NAME);
	File soFile = new File(filepath);

但是需要注意正如文档描述的，这个字段在Android 2.3.3才引入。当然目前2.3.3一下的占用率已经可以忽略，但是作为SDK的开发者，如果兼容并不太麻烦的话还是应该兼顾到，因此我们最终获取so的路径方法为同时使用了第二和第三种方案：

	final String YSDK_SO_NAME = "YSDK";
    String filepath = "";
    try{
        if(Build.VERSION.SDK_INT > 8 ){
            filepath = getApplicationContext().getApplicationInfo().nativeLibraryDir;
        }
    }catch (Exception e){
        e.printStackTrace();
        filepath = "";
    }
    if(null == filepath || filepath.equals("")){
        PathClassLoader pathClassLoader = (PathClassLoader)YSDKSystem.getInstance().getActivity().getClassLoader();
        filepath = pathClassLoader.findLibrary(YSDK_SO_NAME);
    }else{
        filepath = filepath + "/" + System.mapLibraryName(YSDK_SO_NAME);
    }
    File soFile = new File(filepath);

### 怎么根据当前加载的so，获取他的指令集

最开始以为找到应用最终加载的so是一件麻烦的事，结果最后发现找到so了然后确定so对应的指令集也一样是一件烦人的事情。最开始尝试了两种方法效果都不是很好。

#### 1. 通过获取的so目录来确定

最开始是看到在Nexus 6P上，通过上面获取so路径的方法获取路径时，其返回的路径事例如下：

	/data/app/com.tencent.tmgp.yybtestsdk-1/lib/arm64
	
最后一个字段就是对应的指令集类型，但是后来经过多种机型测试以后发现，同样这里也存在比较多的兼容性问题，不同机型目录并不一样，而且不能精确区分精准的指令集，所以这个方案并不合适

#### 2. 通过file命令来确定

在linux中，可以通过file命令获取当前文件的类型，以下为YSDK的so通过file命令获取的结果：
	
	➜  ~  file armeabi/libYSDK.so
	armeabi/libYSDK.so: ELF 32-bit LSB shared object, ARM, version 1 (SYSV), dynamically linked (uses shared libs), stripped
	➜  ~  file armeabi-v7a/libYSDK.so
	armeabi-v7a/libYSDK.so: ELF 32-bit LSB shared object, ARM, version 1 (SYSV), dynamically linked (uses shared libs), stripped
	➜  ~  file arm64-v8a/libYSDK.so
	arm64-v8a/libYSDK.so: ELF 64-bit LSB shared object, version 1 (SYSV), dynamically linked, stripped
	➜  ~  file x86/libYSDK.so
	x86/libYSDK.so: ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV), dynamically linked, stripped
	➜  ~  file x86_64/libYSDK.so
	x86_64/libYSDK.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, stripped

通过结果可以看到，file命令结果的第二段内容就是当前文件的指令集，但是这里有一个问题，arm和arm-v7在file命令下并不能区分出来，当然arm和arm-v7是天然兼容的，这个问题影响并不大。

#### 3. 通过获取当前文件的md5，传回后台对比

前面两种方式都是纯粹依赖客户端的逻辑判断来处理，而且两种方式都不能完美的解决问题。只好换个思路，结合客户端和后台的数据一起来确定，因此最终使用的方案为：

**在请求更新时，客户端上传当前so的md5，后台会根据SDK版本和so文件的md5判断出当前使用的so对应的指令集，然后在下发新的so时选择对应指令集的so**。

至此，问题基本解决了，但是问题真的就彻底解决了么？并没有，有些游戏在集成so的时候使用了prebuild的方式，所以会出现SDK的so被NDK再一次优化导致md5发生了变化，这样后台就会查询不到对应的指令集，无法提供匹配的so热更新，对于这个问题，又该如何解决呢？因为目前的方案还没有经过全面的验证，就暂时不表了~

### 方案汇总

在so热更新时，为了保证下发准确的so内容，YSDK采取下发与当前已经加载的so保持相同CPU指令集的策略。具体的，在每次请求更新时，客户端获取当前加载的so并计算其md5上报到SDK后台，SDK后台根据版本号和上传的so的md5确定当前的so类型，然后下发同指令集下的so。


