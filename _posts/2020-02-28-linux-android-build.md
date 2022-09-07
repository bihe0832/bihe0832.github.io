---
layout: post
title: Linux 搭建 Android 编译构建环境
category: 终端开发
tags: android linux 
keywords: keywords
description: 在腾讯云的服务器搭建一套 Android 编译环境
recommand: true
---

最近因为在家办公，需要发布两个jcenter的库，也不知道什么情况VPN访问bintray.com 超时和丢包格外严重，最后决定选一台在腾讯云的服务器 搭建一套 Android 编译环境用来发布。这里记录一下。

### 安装 JDK

**使用sdkmanager安装时，请确认当前系统Java版本不是Java 11 ，Java 11 运行 sdkmanager 会报错，如果是 Java 11，建议先回退到Java 8** ，如何卸载及重装JDK可以参考文章：[Linux JDK 安装、卸载、路径查看（https://blog.bihe0832.com/linux_java.html）](https://blog.bihe0832.com/linux_java.html)

### 安装 Android-SDK

#### 下载sdktools

在 Android 开发者官网（[https://developer.android.com/studio#downloads](https://developer.android.com/studio#downloads)）上找到最新版本的sdktools的下载地址，然后直接使用 curl 下载：

- 命令：

    ` curl -O https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip`
    
- 事例：

        ➜  android-sdk-linux  curl -O https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip                    
          % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                         Dload  Upload   Total   Spent    Left  Speed
             39  147M   39 57.8M    0     0  10.0M      0  0:00:14  0:00:05  0
             
        ➜  android-sdk-linux  unzip sdk-tools-linux-4333796.zip
        ……
            
        ➜  android-sdk-linux   cd tools
        ➜  tools  bin/sdkmanager --version
        26.1.1

#### 安装需要的组件

使用`sdkmanager `命令可以查看和安装所需的配套组件。

    
    ➜  tools  bin/sdkmanager --list
    Warning: File /root/.android/repositories.cfg could not be loaded.              
    Installed packages:=====================] 100% Computing updates...             
      Path    | Version | Description              | Location
      ------- | ------- | -------                  | ------- 
      tools   | 26.1.1  | Android SDK Tools 26.1.1 | tools/  
    
    Available Packages:
      Path                                                                                     | Version      | Description                                                         
      -------                                                                                  | -------      | -------                                                             
      add-ons;addon-google_apis-google-15                                                      | 3            | Google APIs                                                         
      add-ons;addon-google_apis-google-16                                                      | 4            | Google APIs                                                         
      add-ons;addon-google_apis-google-17                                                      | 4            | Google APIs                                                         
      add-ons;addon-google_apis-google-18                                                      | 4            | Google APIs                                                         
      add-ons;addon-google_apis-google-19                                                      | 20           | Google APIs                                                         
      add-ons;addon-google_apis-google-21                                                      | 1            | Google APIs                                                         
      add-ons;addon-google_apis-google-22                                                      | 1            | Google APIs                                                         
      add-ons;addon-google_apis-google-23                                                      | 1            | Google APIs                                                         
      add-ons;addon-google_apis-google-24                                                      | 1            | Google APIs                                                         
      add-ons;addon-google_gdk-google-19                                                       | 11           | Glass Development Kit Preview                                       
      build-tools;19.1.0                                                                       | 19.1.0       | Android SDK Build-Tools 19.1                                        
      build-tools;20.0.0                                                                       | 20.0.0       | Android SDK Build-Tools 20                                          
      build-tools;21.1.2                                                                       | 21.1.2       | Android SDK Build-Tools 21.1.2                                      
      build-tools;22.0.1                                                                       | 22.0.1       | Android SDK Build-Tools 22.0.1                                      
      build-tools;23.0.1                                                                       | 23.0.1       | Android SDK Build-Tools 23.0.1                                      
      build-tools;23.0.2                                                                       | 23.0.2       | Android SDK Build-Tools 23.0.2                                      
      build-tools;23.0.3                                                                       | 23.0.3       | Android SDK Build-Tools 23.0.3                                      
      build-tools;24.0.0                                                                       | 24.0.0       | Android SDK Build-Tools 24                                          
      build-tools;24.0.1                                                                       | 24.0.1       | Android SDK Build-Tools 24.0.1                                      
      build-tools;24.0.2                                                                       | 24.0.2       | Android SDK Build-Tools 24.0.2                                      
      build-tools;24.0.3                                                                       | 24.0.3       | Android SDK Build-Tools 24.0.3                                      
      build-tools;25.0.0                                                                       | 25.0.0       | Android SDK Build-Tools 25                                          
      build-tools;25.0.1                                                                       | 25.0.1       | Android SDK Build-Tools 25.0.1                                      
      build-tools;25.0.2                                                                       | 25.0.2       | Android SDK Build-Tools 25.0.2                                      
      build-tools;25.0.3                                                                       | 25.0.3       | Android SDK Build-Tools 25.0.3                                      
      build-tools;26.0.0                                                                       | 26.0.0       | Android SDK Build-Tools 26                                          
      build-tools;26.0.1                                                                       | 26.0.1       | Android SDK Build-Tools 26.0.1                                      
      build-tools;26.0.2                                                                       | 26.0.2       | Android SDK Build-Tools 26.0.2                                      
      build-tools;26.0.3                                                                       | 26.0.3       | Android SDK Build-Tools 26.0.3                                      
      build-tools;27.0.0                                                                       | 27.0.0       | Android SDK Build-Tools 27                                          
      build-tools;27.0.1                                                                       | 27.0.1       | Android SDK Build-Tools 27.0.1                                      
      build-tools;27.0.2                                                                       | 27.0.2       | Android SDK Build-Tools 27.0.2                                      
      build-tools;27.0.3                                                                       | 27.0.3       | Android SDK Build-Tools 27.0.3                                      
      build-tools;28.0.0                                                                       | 28.0.0       | Android SDK Build-Tools 28                                          
      build-tools;28.0.1                                                                       | 28.0.1       | Android SDK Build-Tools 28.0.1                                      
      build-tools;28.0.2                                                                       | 28.0.2       | Android SDK Build-Tools 28.0.2                                      
      build-tools;28.0.3                                                                       | 28.0.3       | Android SDK Build-Tools 28.0.3                                      
      build-tools;29.0.0                                                                       | 29.0.0       | Android SDK Build-Tools 29                                          
      build-tools;29.0.1                                                                       | 29.0.1       | Android SDK Build-Tools 29.0.1                                      
      build-tools;29.0.2                                                                       | 29.0.2       | Android SDK Build-Tools 29.0.2                                      
      build-tools;29.0.3                                                                       | 29.0.3       | Android SDK Build-Tools 29.0.3                                      
      build-tools;30.0.0-rc1                                                                   | 30.0.0 rc1   | Android SDK Build-Tools 30-rc1                                      
      cmake;3.10.2.4988404                                                                     | 3.10.2       | CMake 3.10.2.4988404                                                
      cmake;3.6.4111459                                                                        | 3.6.4111459  | CMake 3.6.4111459                                                   
      cmdline-tools;1.0                                                                        | 1.0          | Android SDK Command-line Tools                                      
      cmdline-tools;latest                                                                     | 1.0          | Android SDK Command-line Tools (latest)                             
      docs                                                                                     | 1            | Documentation for Android SDK                                       
      emulator                                                                                 | 30.0.0       | Android Emulator                                                    
      extras;android;gapid;1                                                                   | 1.0.3        | GPU Debugging tools                                                 
      extras;android;gapid;3                                                                   | 3.1.0        | GPU Debugging tools                                                 
      extras;android;m2repository                                                              | 47.0.0       | Android Support Repository                                          
      extras;google;auto                                                                       | 1.1          | Android Auto Desktop Head Unit emulator                             
      extras;google;google_play_services                                                       | 49           | Google Play services                                                
      extras;google;instantapps                                                                | 1.9.0        | Google Play Instant Development SDK                                 
      extras;google;m2repository                                                               | 58           | Google Repository                                                   
      extras;google;market_apk_expansion                                                       | 1            | Google Play APK Expansion library                                   
      extras;google;market_licensing                                                           | 1            | Google Play Licensing Library                                       
      extras;google;simulators                                                                 | 1            | Android Auto API Simulators                                         
      extras;google;webdriver                                                                  | 2            | Google Web Driver                                                   
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0        | 1            | Solver for ConstraintLayout 1.0.0                                   
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-alpha4 | 1            | com.android.support.constraint:constraint-layout-solver:1.0.0-alpha4
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-alpha8 | 1            | Solver for ConstraintLayout 1.0.0-alpha8                            
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-beta1  | 1            | Solver for ConstraintLayout 1.0.0-beta1                             
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-beta2  | 1            | Solver for ConstraintLayout 1.0.0-beta2                             
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-beta3  | 1            | Solver for ConstraintLayout 1.0.0-beta3                             
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-beta4  | 1            | Solver for ConstraintLayout 1.0.0-beta4                             
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.0-beta5  | 1            | Solver for ConstraintLayout 1.0.0-beta5                             
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.1        | 1            | Solver for ConstraintLayout 1.0.1                                   
      extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.2        | 1            | Solver for ConstraintLayout 1.0.2                                   
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0               | 1            | ConstraintLayout for Android 1.0.0                                  
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-alpha4        | 1            | com.android.support.constraint:constraint-layout:1.0.0-alpha4       
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-alpha8        | 1            | ConstraintLayout for Android 1.0.0-alpha8                           
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-beta1         | 1            | ConstraintLayout for Android 1.0.0-beta1                            
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-beta2         | 1            | ConstraintLayout for Android 1.0.0-beta2                            
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-beta3         | 1            | ConstraintLayout for Android 1.0.0-beta3                            
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-beta4         | 1            | ConstraintLayout for Android 1.0.0-beta4                            
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.0-beta5         | 1            | ConstraintLayout for Android 1.0.0-beta5                            
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.1               | 1            | ConstraintLayout for Android 1.0.1                                  
      extras;m2repository;com;android;support;constraint;constraint-layout;1.0.2               | 1            | ConstraintLayout for Android 1.0.2                                  
      lldb;2.0                                                                                 | 2.0.2558144  | LLDB 2.0                                                            
      lldb;2.1                                                                                 | 2.1.2852477  | LLDB 2.1                                                            
      lldb;2.2                                                                                 | 2.2.3271982  | LLDB 2.2                                                            
      lldb;2.3                                                                                 | 2.3.3614996  | LLDB 2.3                                                            
      lldb;3.0                                                                                 | 3.0.4213617  | LLDB 3.0                                                            
      lldb;3.1                                                                                 | 3.1.4508709  | LLDB 3.1                                                            
      ndk-bundle                                                                               | 21.0.6113669 | NDK                                                                 
      ndk;16.1.4479499                                                                         | 16.1.4479499 | NDK (Side by side) 16.1.4479499                                     
      ndk;17.2.4988734                                                                         | 17.2.4988734 | NDK (Side by side) 17.2.4988734                                     
      ndk;18.1.5063045                                                                         | 18.1.5063045 | NDK (Side by side) 18.1.5063045                                     
      ndk;19.2.5345600                                                                         | 19.2.5345600 | NDK (Side by side) 19.2.5345600                                     
      ndk;20.0.5594570                                                                         | 20.0.5594570 | NDK (Side by side) 20.0.5594570                                     
      ndk;20.1.5948944                                                                         | 20.1.5948944 | NDK (Side by side) 20.1.5948944                                     
      ndk;21.0.6113669                                                                         | 21.0.6113669 | NDK (Side by side) 21.0.6113669                                     
      patcher;v4                                                                               | 1            | SDK Patch Applier v4                                                
      platform-tools                                                                           | 29.0.6       | Android SDK Platform-Tools                                          
      platforms;android-10                                                                     | 2            | Android SDK Platform 10                                             
      platforms;android-11                                                                     | 2            | Android SDK Platform 11                                             
      platforms;android-12                                                                     | 3            | Android SDK Platform 12                                             
      platforms;android-13                                                                     | 1            | Android SDK Platform 13                                             
      platforms;android-14                                                                     | 4            | Android SDK Platform 14                                             
      platforms;android-15                                                                     | 5            | Android SDK Platform 15                                             
      platforms;android-16                                                                     | 5            | Android SDK Platform 16                                             
      platforms;android-17                                                                     | 3            | Android SDK Platform 17                                             
      platforms;android-18                                                                     | 3            | Android SDK Platform 18                                             
      platforms;android-19                                                                     | 4            | Android SDK Platform 19                                             
      platforms;android-20                                                                     | 2            | Android SDK Platform 20                                             
      platforms;android-21                                                                     | 2            | Android SDK Platform 21                                             
      platforms;android-22                                                                     | 2            | Android SDK Platform 22                                             
      platforms;android-23                                                                     | 3            | Android SDK Platform 23                                             
      platforms;android-24                                                                     | 2            | Android SDK Platform 24                                             
      platforms;android-25                                                                     | 3            | Android SDK Platform 25                                             
      platforms;android-26                                                                     | 2            | Android SDK Platform 26                                             
      platforms;android-27                                                                     | 3            | Android SDK Platform 27                                             
      platforms;android-28                                                                     | 6            | Android SDK Platform 28                                             
      platforms;android-29                                                                     | 4            | Android SDK Platform 29                                             
      platforms;android-7                                                                      | 3            | Android SDK Platform 7                                              
      platforms;android-8                                                                      | 3            | Android SDK Platform 8                                              
      platforms;android-9                                                                      | 2            | Android SDK Platform 9                                              
      platforms;android-R                                                                      | 1            | Android SDK Platform R                                              
      sources;android-15                                                                       | 2            | Sources for Android 15                                              
      sources;android-16                                                                       | 2            | Sources for Android 16                                              
      sources;android-17                                                                       | 1            | Sources for Android 17                                              
      sources;android-18                                                                       | 1            | Sources for Android 18                                              
      sources;android-19                                                                       | 2            | Sources for Android 19                                              
      sources;android-20                                                                       | 1            | Sources for Android 20                                              
      sources;android-21                                                                       | 1            | Sources for Android 21                                              
      sources;android-22                                                                       | 1            | Sources for Android 22                                              
      sources;android-23                                                                       | 1            | Sources for Android 23                                              
      sources;android-24                                                                       | 1            | Sources for Android 24                                              
      sources;android-25                                                                       | 1            | Sources for Android 25                                              
      sources;android-26                                                                       | 1            | Sources for Android 26                                              
      sources;android-27                                                                       | 1            | Sources for Android 27                                              
      sources;android-28                                                                       | 1            | Sources for Android 28                                              
      sources;android-29                                                                       | 1            | Sources for Android 29                                              
      system-images;android-10;default;armeabi-v7a                                             | 5            | ARM EABI v7a System Image                                           
      system-images;android-10;default;x86                                                     | 5            | Intel x86 Atom System Image                                         
      system-images;android-10;google_apis;armeabi-v7a                                         | 6            | Google APIs ARM EABI v7a System Image                               
      system-images;android-10;google_apis;x86                                                 | 6            | Google APIs Intel x86 Atom System Image                             
      system-images;android-14;default;armeabi-v7a                                             | 2            | ARM EABI v7a System Image                                           
      system-images;android-15;default;armeabi-v7a                                             | 5            | ARM EABI v7a System Image                                           
      system-images;android-15;default;x86                                                     | 5            | Intel x86 Atom System Image                                         
      system-images;android-15;google_apis;armeabi-v7a                                         | 6            | Google APIs ARM EABI v7a System Image                               
      system-images;android-15;google_apis;x86                                                 | 6            | Google APIs Intel x86 Atom System Image                             
      system-images;android-16;default;armeabi-v7a                                             | 6            | ARM EABI v7a System Image                                           
      system-images;android-16;default;mips                                                    | 1            | MIPS System Image                                                   
      system-images;android-16;default;x86                                                     | 6            | Intel x86 Atom System Image                                         
      system-images;android-16;google_apis;armeabi-v7a                                         | 6            | Google APIs ARM EABI v7a System Image                               
      system-images;android-16;google_apis;x86                                                 | 6            | Google APIs Intel x86 Atom System Image                             
      system-images;android-17;default;armeabi-v7a                                             | 6            | ARM EABI v7a System Image                                           
      system-images;android-17;default;mips                                                    | 1            | MIPS System Image                                                   
      system-images;android-17;default;x86                                                     | 4            | Intel x86 Atom System Image                                         
      system-images;android-17;google_apis;armeabi-v7a                                         | 6            | Google APIs ARM EABI v7a System Image                               
      system-images;android-17;google_apis;x86                                                 | 6            | Google APIs Intel x86 Atom System Image                             
      system-images;android-18;default;armeabi-v7a                                             | 5            | ARM EABI v7a System Image                                           
      system-images;android-18;default;x86                                                     | 4            | Intel x86 Atom System Image                                         
      system-images;android-18;google_apis;armeabi-v7a                                         | 6            | Google APIs ARM EABI v7a System Image                               
      system-images;android-18;google_apis;x86                                                 | 6            | Google APIs Intel x86 Atom System Image                             
      system-images;android-19;default;armeabi-v7a                                             | 5            | ARM EABI v7a System Image                                           
      system-images;android-19;default;x86                                                     | 6            | Intel x86 Atom System Image                                         
      system-images;android-19;google_apis;armeabi-v7a                                         | 38           | Google APIs ARM EABI v7a System Image                               
      system-images;android-19;google_apis;x86                                                 | 38           | Google APIs Intel x86 Atom System Image                             
      system-images;android-21;android-tv;armeabi-v7a                                          | 3            | Android TV ARM EABI v7a System Image                                
      system-images;android-21;android-tv;x86                                                  | 3            | Android TV Intel x86 Atom System Image                              
      system-images;android-21;default;armeabi-v7a                                             | 4            | ARM EABI v7a System Image                                           
      system-images;android-21;default;x86                                                     | 5            | Intel x86 Atom System Image                                         
      system-images;android-21;default;x86_64                                                  | 5            | Intel x86 Atom_64 System Image                                      
      system-images;android-21;google_apis;armeabi-v7a                                         | 30           | Google APIs ARM EABI v7a System Image                               
      system-images;android-21;google_apis;x86                                                 | 30           | Google APIs Intel x86 Atom System Image                             
      system-images;android-21;google_apis;x86_64                                              | 30           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-22;android-tv;x86                                                  | 3            | Android TV Intel x86 Atom System Image                              
      system-images;android-22;default;armeabi-v7a                                             | 2            | ARM EABI v7a System Image                                           
      system-images;android-22;default;x86                                                     | 6            | Intel x86 Atom System Image                                         
      system-images;android-22;default;x86_64                                                  | 6            | Intel x86 Atom_64 System Image                                      
      system-images;android-22;google_apis;armeabi-v7a                                         | 24           | Google APIs ARM EABI v7a System Image                               
      system-images;android-22;google_apis;x86                                                 | 24           | Google APIs Intel x86 Atom System Image                             
      system-images;android-22;google_apis;x86_64                                              | 24           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-23;android-tv;armeabi-v7a                                          | 12           | Android TV ARM EABI v7a System Image                                
      system-images;android-23;android-tv;x86                                                  | 19           | Android TV Intel x86 Atom System Image                              
      system-images;android-23;android-wear;armeabi-v7a                                        | 6            | Android Wear ARM EABI v7a System Image                              
      system-images;android-23;android-wear;x86                                                | 6            | Android Wear Intel x86 Atom System Image                            
      system-images;android-23;default;armeabi-v7a                                             | 6            | ARM EABI v7a System Image                                           
      system-images;android-23;default;x86                                                     | 10           | Intel x86 Atom System Image                                         
      system-images;android-23;default;x86_64                                                  | 10           | Intel x86 Atom_64 System Image                                      
      system-images;android-23;google_apis;armeabi-v7a                                         | 31           | Google APIs ARM EABI v7a System Image                               
      system-images;android-23;google_apis;x86                                                 | 31           | Google APIs Intel x86 Atom System Image                             
      system-images;android-23;google_apis;x86_64                                              | 31           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-24;android-tv;x86                                                  | 20           | Android TV Intel x86 Atom System Image                              
      system-images;android-24;default;arm64-v8a                                               | 7            | ARM 64 v8a System Image                                             
      system-images;android-24;default;armeabi-v7a                                             | 7            | ARM EABI v7a System Image                                           
      system-images;android-24;default;x86                                                     | 8            | Intel x86 Atom System Image                                         
      system-images;android-24;default;x86_64                                                  | 8            | Intel x86 Atom_64 System Image                                      
      system-images;android-24;google_apis;arm64-v8a                                           | 25           | Google APIs ARM 64 v8a System Image                                 
      system-images;android-24;google_apis;armeabi-v7a                                         | 25           | Google APIs ARM EABI v7a System Image                               
      system-images;android-24;google_apis;x86                                                 | 25           | Google APIs Intel x86 Atom System Image                             
      system-images;android-24;google_apis;x86_64                                              | 25           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-24;google_apis_playstore;x86                                       | 19           | Google Play Intel x86 Atom System Image                             
      system-images;android-25;android-tv;x86                                                  | 14           | Android TV Intel x86 Atom System Image                              
      system-images;android-25;android-wear-cn;armeabi-v7a                                     | 4            | China version of Android Wear ARM EABI v7a System Image             
      system-images;android-25;android-wear-cn;x86                                             | 4            | China version of Android Wear Intel x86 Atom System Image           
      system-images;android-25;android-wear;armeabi-v7a                                        | 3            | Android Wear ARM EABI v7a System Image                              
      system-images;android-25;android-wear;x86                                                | 3            | Android Wear Intel x86 Atom System Image                            
      system-images;android-25;default;x86                                                     | 1            | Intel x86 Atom System Image                                         
      system-images;android-25;default;x86_64                                                  | 1            | Intel x86 Atom_64 System Image                                      
      system-images;android-25;google_apis;arm64-v8a                                           | 16           | Google APIs ARM 64 v8a System Image                                 
      system-images;android-25;google_apis;armeabi-v7a                                         | 16           | Google APIs ARM EABI v7a System Image                               
      system-images;android-25;google_apis;x86                                                 | 16           | Google APIs Intel x86 Atom System Image                             
      system-images;android-25;google_apis;x86_64                                              | 16           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-25;google_apis_playstore;x86                                       | 9            | Google Play Intel x86 Atom System Image                             
      system-images;android-26;android-tv;x86                                                  | 12           | Android TV Intel x86 Atom System Image                              
      system-images;android-26;android-wear-cn;x86                                             | 4            | China version of Android Wear Intel x86 Atom System Image           
      system-images;android-26;android-wear;x86                                                | 4            | Android Wear Intel x86 Atom System Image                            
      system-images;android-26;default;x86                                                     | 1            | Intel x86 Atom System Image                                         
      system-images;android-26;default;x86_64                                                  | 1            | Intel x86 Atom_64 System Image                                      
      system-images;android-26;google_apis;x86                                                 | 14           | Google APIs Intel x86 Atom System Image                             
      system-images;android-26;google_apis;x86_64                                              | 14           | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-26;google_apis_playstore;x86                                       | 7            | Google Play Intel x86 Atom System Image                             
      system-images;android-27;android-tv;x86                                                  | 7            | Android TV Intel x86 Atom System Image                              
      system-images;android-27;default;x86                                                     | 1            | Intel x86 Atom System Image                                         
      system-images;android-27;default;x86_64                                                  | 1            | Intel x86 Atom_64 System Image                                      
      system-images;android-27;google_apis;x86                                                 | 9            | Google APIs Intel x86 Atom System Image                             
      system-images;android-27;google_apis_playstore;x86                                       | 3            | Google Play Intel x86 Atom System Image                             
      system-images;android-28;android-tv;x86                                                  | 8            | Android TV Intel x86 Atom System Image                              
      system-images;android-28;android-wear-cn;x86                                             | 3            | China version of Wear OS Intel x86 Atom System Image                
      system-images;android-28;android-wear;x86                                                | 3            | Wear OS Intel x86 Atom System Image                                 
      system-images;android-28;default;x86                                                     | 4            | Intel x86 Atom System Image                                         
      system-images;android-28;default;x86_64                                                  | 4            | Intel x86 Atom_64 System Image                                      
      system-images;android-28;google_apis;x86                                                 | 10           | Google APIs Intel x86 Atom System Image                             
      system-images;android-28;google_apis;x86_64                                              | 9            | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-28;google_apis_playstore;x86                                       | 9            | Google Play Intel x86 Atom System Image                             
      system-images;android-28;google_apis_playstore;x86_64                                    | 8            | Google Play Intel x86 Atom_64 System Image                          
      system-images;android-29;default;x86                                                     | 7            | Intel x86 Atom System Image                                         
      system-images;android-29;default;x86_64                                                  | 7            | Intel x86 Atom_64 System Image                                      
      system-images;android-29;google_apis;x86                                                 | 9            | Google APIs Intel x86 Atom System Image                             
      system-images;android-29;google_apis;x86_64                                              | 9            | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-29;google_apis_playstore;x86                                       | 8            | Google Play Intel x86 Atom System Image                             
      system-images;android-29;google_apis_playstore;x86_64                                    | 8            | Google Play Intel x86 Atom_64 System Image                          
      system-images;android-Q;android-tv;x86                                                   | 1            | Android TV Intel x86 Atom System Image                              
      system-images;android-R;google_apis;x86                                                  | 1            | Google APIs Intel x86 Atom System Image                             
      system-images;android-R;google_apis;x86_64                                               | 1            | Google APIs Intel x86 Atom_64 System Image                          
      system-images;android-R;google_apis_playstore;x86                                        | 1            | Google Play Intel x86 Atom System Image                             
      system-images;android-R;google_apis_playstore;x86_64                                     | 1            | Google Play Intel x86 Atom_64 System Image                          
      tools                                                                                    | 26.1.1       | Android SDK Tools                                                   
    
    ➜  tools  ./bin/sdkmanager --install "build-tools;19.1.0" "build-tools;28.0.3" "platforms;android-28"
    [                                       ] 3% Fetch remote repository... 

### 环境变量设置

将 Android SDK的下载路径添加到环境变量：

    export ANDROID_HOME=~/android-sdk-linux
    export PATH=${ANDROID_HOME}/tools/bin:$PATH

OK 至此就算搭建安装完成~

### 命令汇总

    
    #/bin/bash
    
    mkdir android-sdk-linux
    cd  android-sdk-linux
    yum install java-1.8.0-openjdk-devel.x86_64
    yum install git
    # sudo apt-get update
    # sudo apt-get install openjdk-8-jdk
    java -version
    curl -O https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
    unzip sdk-tools-linux-4333796.zip
    localpath=`pwd`
    export ANDROID_HOME=$localpath
    export PATH=${ANDROID_HOME}/tools/bin:$PATH
    echo $ANDROID_HOME
    sdkmanager --version
    sdkmanager --install "build-tools;19.1.0" "build-tools;28.0.3" "platforms;android-28"


### 常见错误

#### 安装提示 java.lang.NoClassDefFoundError

- 错误事例：

	    ➜  android-sdk-linux  ./sdkmanager 
		Exception in thread "main" java.lang.NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema
	        at com.android.repository.api.SchemaModule$SchemaModuleVersion.<init>(SchemaModule.java:156)
	        at com.android.repository.api.SchemaModule.<init>(SchemaModule.java:75)
	        at com.android.sdklib.repository.AndroidSdkHandler.<clinit>(AndroidSdkHandler.java:81)
	        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:73)
	        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:48)
		Caused by: java.lang.ClassNotFoundException: javax.xml.bind.annotation.XmlSchema
		        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:581)
		        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
		        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:522)
		        ... 5 more
- 问题原因：

	当前系统的JDK 版本过高。
	
- 解决方案：

	先回退系统JDK 版本到 1.8，SDK更新结束以后再升级JDK版本。如何卸载及重装JDK可以参考文章：[Linux JDK 安装、卸载、路径查看（https://blog.bihe0832.com/linux_java.html）](https://blog.bihe0832.com/linux_java.html)
