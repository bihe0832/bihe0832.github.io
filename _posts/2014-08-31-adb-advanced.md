---
layout: post
title: ADB命令系列之 Advanced Command
category: 终端开发
tags: android adb
keywords: android adb monkey getprop setprop pm am dumpsys  
description: adb中一些相对复杂的命令，主要有monkey、getprop、setprop、pm、am、dumpsys等。monkey主要用于自动化测试，而getprop和dumpsys则在定位问题的时候非常有用。
recommand: true
---

# 相关文章

- ADB命令系列之 Base Command：[https://blog.bihe0832.com/adb-base.html](https://blog.bihe0832.com/adb-base.html)

      重点介绍一些基本的adb命令，例如devices，start-server，kill-server，install，uninstall，push，pull，bugreport，logcat等。

- ADB命令系列之  Advanced Command：[https://blog.bihe0832.com/adb-advanced.html](https://blog.bihe0832.com/adb-advanced.html)

      重点介绍一些相对比较复杂的adb命令，主要是adb shell 相关的。例如screencap，monkey，getprop，setprop，pm，am，dumpsys等。

- ADB命令系列之 adb shell input：[https://blog.bihe0832.com/adb-shell-input.html](https://blog.bihe0832.com/adb-shell-input.html)

      重点介绍adb shell input的用法，包括怎么输入内容，怎么模拟按键，模拟屏幕滑动等各种输入模拟。

- ADB命令系列之 再说ADB：[https://blog.bihe0832.com/review_adb.html](https://blog.bihe0832.com/review_adb.html)

      重点结合使用场景介绍ADB 的使用，例如解锁手机、截屏、Monkey点击、获取厂商机型等

- ADB命令系列之 ADB快捷输入法：[https://blog.bihe0832.com/input.html](https://blog.bihe0832.com/input.html)

      主要解决 ADB hell input 无法输入中文的问题

# 命令介绍

## adb shell screencap

*   **说明：**
    
    screencap主要是用来进行截屏的操作。截屏结果可以放在指定的位置。
    
*   **命令：**
    
        screencap [-hp] [-d display-id] [FILENAME]
  			-h: this message
   			-p: save the file as a png.
   			-d: specify the display id to capture, default 0.
           
*   **事例：**
    
        adb shell screencap -p /sdcard/screen.png
        
*   **其余说明：**
    
    目前这种方法比较麻烦，需要3步：
    
    1. 截图保存到sdcard : adb shell screencap -p /sdcard/screen.png
    - 将图片导出 : adb pull /sdcard/screen.png
    - 删除sdcard中的图片: adb shell rm /sdcard/screen.png
	
	可以简单封装一下：

		adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png ~/temp/ && adb shell rm /sdcard/screen.png
            
## adb shell monkey

*   **说明：**
    
    Monkey是Android中的一个命令行工具，可以运行在模拟器里或实际设备中。它向系统发送伪随机的用户事件流(如按键输入、触摸屏输入、手势输入等)，实现对正在开发的应用程序进行压力测试。Monkey测试是一种为了测试软件的稳定性、健壮性的快速有效的方法

*   **命令：**
    
        adb shell monkey  [options]
            -p 表示对象包，多个包重复使用-p
            –v 表示反馈信息级别（信息级别就是日志的详细程度），总共分3个级别
                 –v :日志级别 Level0 缺省值，仅提供启动提示、测试完成和最终结果等少量信息
                 –v -v ：日志级别 Level1，提供较为详细的日志，包括每个发送到Activity的事件信息
                 –v -v –v ：日志级别 Level 2，最详细的日志，包括了测试中选中/未选中的Activity信息
            –s 表示指定伪随机数生成器的seed值，如果seed相同，则两次Monkey测试所产生的事件序列也相同的。
            具体参照：https://developer.android.com/tools/help/monkey.html
        

*   **事例：**
    
        adb shell monkey -p com.example.wegame 100
        adb shell monkey -p com.example.wegame -p com.example.Mydemo 100 -v
        adb shell monkey -p com.example.wegame 100 -s500 -v
        

*   **其余说明：**
    
        测试的对象仅为应用程序包，有一定的局限性。
        Monky测试使用的事件流数据流是随机的，不能进行自定义。
        可对MonkeyTest的对象，事件数量，类型，频率等进行设置。
        

## adb shell getprop

<!--more-->

*   **说明：**
    
    getprop就是将配置文件里的信息读取出来并经过整理后，并以字典的形式展示给用户的。

*   **命令：**
    
        adb shell getprop [key] 
            [key] ：取得对应的key的属性值，不填返回所有配置
            属性分类：
                gsm开头的是移动电话的一些版本信息（软硬件，基带版本等）、所在国家、漫游状态、序列号等一系列与sim相关的信息
                ro开头的是只读属性，一旦赋值不能修改
                sys开头的是系统信息
                persist和ril开头的不知道啥意思
                init.svc手机当前进程的状态（启动的显示running未启动的显示stopped）。进程是否启动是有init.rc文件中定义的
                net开头的是与网络相关的信息，比如dns、主机名、为各功能预留的缓冲区大小
                dhcp.wlan 是网关、IP地址等无线网络相关信息；
                external_sd_path 是外部存储SD卡的路径
                fmradio.driver 是FMradio相关属性
                具体的内容可以参照：https://baike.baidu.com/view/9775823.htm?fr=aladdin
        

*   **事例：**
    
        adb shell getprop qemu.sf.lcd_density
        adb shell getprop
        

*   **其余说明：**
    
        getprop上述属性分类不是手机每项必有，不同的手机命名方式不同。
        

## adb shell setprop

*   **说明：**
    
    Dalvik虚拟机支持一系列的命令行参数（使用adbshell dalvikvm –help获取列表），但是不可能通过android应用运行时来传递任意参数，但是可以通过特定的系统参数来影响虚拟机行为。

*   **命令：**
    
        adb shell setprop [key] [value]
            [key] ：计划设置的属性对应的key值
            [value] ：计划设置的key对应的属性值
        

*   **事例：**
    
        adb shell setprop qemu.sf.lcd_density 320
        

*   **其余说明：**
    
        必须重启android运行时从而使得改变生效（adb shell stop：adb shell start）。这是因为，这些设定在zygote进程中处理，而zygote最早启动并且永远存活。
        如果你不想在设备重启之后特性消失，在/data/local.prop上加一行：
        <name>= <value>（adb shell “echo name =value >> /data/local.prop”）
        重启之后这样的改变也会一直存在，但是如果data分区被擦除了就消失了。
        

## adb shell pm

*   **说明：**
    
    pm命令则主要用于管理应用package的管理，有点像控制面板的添加和删除程序。

*   **命令：**
    
        adb shell pm [list|path|install|uninstall]
            list packages [-f] [-d] [-e] [-u] [FILTER]
            list permission-groups
            list permissions [-g] [-f] [-d] [-u] [GROUP]
            list instrumentation [-f] [TARGET-PACKAGE]
            list features
            list libraries
            path PACKAGE
            install [-l] [-r] [-t] [-i INSTALLER_PACKAGE_NAME] [-s] [-f] PATH
            uninstall [-k] PACKAGE
            clear PACKAGE
        pm enable PACKAGE_OR_COMPONENT
        pm disable PACKAGE_OR_COMPONENT
        pm setInstallLocation [0/auto] [1/internal] [2/external]。
            具体参照：https://developer.android.com/tools/help/adb.html#pm
        

*   **事例：**
    
        adb shell pm uninstall -k com.bihe0832.mydemo
        adb shell pm list packages
        

*   **其余说明：**
    
        暂无
        

## adb shell am

*   **说明：**
    
    am命令主要用于管理Activity，例如启动，停止Activity（eclipse在运行Activity就使用了这个命令），发送intent。

*   **命令：**
    
        adb shell am start [options] <INTENT>
            作用：启动一个activity
        
        adb shell am startservice [options] <INTENT>
            作用：启动一个service
        
        adb shell am force-stop <PACKAGE>
            作用：强制关闭一个应用程序
        
        adb shell am broadcast [options] <INTENT>
            作用：发送一个广播
        
        [options]与<INTENT>具体参照：https://developer.android.com/tools/help/adb.html#am
        

*   **事例：**
    
        adb shell am start -n com.example.wegame/com.example.wegame.MainActivity
        Camera（照相机）的启动方法为：
            adb shell am start -n com.android.camera/com.android.camera.Camera
        Browser（浏览器）的启动方法为：
            adb shell am start -n com.android.browser/com.android.browser.BrowserActivity
        启动浏览器 :
            adb shell am start -a android.intent.action.VIEW -d  https://www.google.cn/
        拨打电话 :
            adb shell am start -a android.intent.action.CALL -d tel:10086
        

*   **其余说明：**
    
        暂无
        

## adb shell dumpsys

*   **说明：**
    
    dumpsys命令可以显示手机中所有应用程序的信息，并且也会给出现在手机的状态。该命令用户打印出当前系统信息，默认打印出所有service信息，可以在命令后面加入activity参数，只打印出activity相关的信息。 可跟参数有：SurfaceFlinger, accessibility, account, activity, alarm, appwidget, audio, backup, battery, batteryinfo, bluetooth, bluetooth_a2dp, clipboard, connectivity, content, cpuinfo, device_policy, devicestoragemonitor, diskstats, dropbox, entropy, hardware, hdmi, input_method, iphonesubinfo, isms, location, media.audio_flinger, media.audio_policy, media.camera, media.player, meminfo, mount, netstat, network_management, notification, package, permission, phone, power, search, sensor, simphonebook, statusbar, telephony.registry, throttle, uimode, usagestats, vibrator, wallpaper, wifi, window

*   **命令：**
    
        adb shell dumpsys activity 显示activity相关的信息，这个是最常用的，可以分析当前栈上的内存信息
        adb shell dumpsys statusbar 显示状态栏相关的信息
        adb shell dumpsys meminfo $package_name or $pid 使用程序的包名或者进程id显示内存信息
        adb shell "dumpsys window | grep mCurrentFocus" 获取当前界面的Activity
        
*   **事例：**
    
        adb shell dumpsys activity activities
        

*   **其余说明：**
    
        这个命令相关的内容，通过这个命令实现很多有用的小应用和很多功能的测试，可以在使用中不断积累一些特殊的用法
