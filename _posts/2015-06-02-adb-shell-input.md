---
layout: post
title: ADB命令系列之 adb shell input（Android模拟输入）简单总结
category: 终端开发
tags: android adb
keywords: adb shell input keyevent text
description: 最近开发一个新的接口，在调试的时候要手动输入蛮多参数，关键是参数又都太长，就专门看了下adb有木有模拟输入，果然adb shell里是有的。这样以后开发调试、自动化测试等就更加方便了。
---
最近开发一个新的接口，在调试的时候要手动输入蛮多参数，关键是参数又都太长，就专门看了下 adb 有木有模拟输入，果然adb shell里是有的。这样以后开发调试、自动化测试等就更加方便了。专门简单总结下：
 
## 相关文章
 
- ADB命令系列之 Base Command：[https://blog.bihe0832.com/adb-base.html](https://blog.bihe0832.com/adb-base.html)

	重点介绍一些基本的adb命令，例如devices，start-server，kill-server，install，uninstall，push，pull，bugreport，logcat等。

- ADB命令系列之  Advanced Command：[https://blog.bihe0832.com/adb-advanced.html](https://blog.bihe0832.com/adb-advanced.html)

	重点介绍一些相对比较复杂的adb命令，主要是adb shell 相关的。例如screencap，monkey，getprop，setprop，pm，am，dumpsys等。

- ADB命令系列之 adb shell input：[https://blog.bihe0832.com/adb-shell-input.html](https://blog.bihe0832.com/adb-shell-input.html)

	重点介绍adb shell input的用法，包括怎么输入内容，怎么模拟按键，模拟屏幕滑动等各种输入模拟。
	
-   ADB命令系列之 再说ADB：[https://blog.bihe0832.com/review_adb.html](https://blog.bihe0832.com/review_adb.html)

	重点结合使用场景介绍ADB 的使用，例如解锁手机、截屏、Monkey点击、获取厂商机型等

## 简介
    
input可以用来模拟各种输入设备的输入操作。
    
### 命令说明
      
	  Usage: input [<source>] <command> [<arg>...]

      The sources are:
            trackball
            joystick
            touchnavigation
            mouse
            keyboard
            gamepad
            touchpad
            dpad
            stylus
            touchscreen

      The commands and default sources are:
            text <string> (Default: touchscreen)
            keyevent [--longpress] <key code number or name> ... (Default: keyboard)
            tap <x> <y> (Default: touchscreen)
            swipe <x1> <y1> <x2> <y2> [duration(ms)] (Default: touchscreen)
            press (Default: trackball)
            roll <dx> <dy> (Default: trackball)
            
### 部分参数说明
 
1. source对应各种输入源。一般开发中都是用默认值即可。也就是说一般使用中我们的参数中并没有source。
2. `输入命令中text 和 keyevent是通用的；tap和swipe适用于触摸屏；而press和roll用于有触摸球的设备，由于使用的很少，因此不做说明。`
 
## 模拟输入文本（text） 

### 用法与事例

主要用于在输入框中输入内容。命令很简单。例如：

	adb shell input text "hello,world"

### 注意事项

1. **使用的前提是当前要输入的位置已经获得了焦点。**
2. 特殊字符的输入：adb shell input text中空格、'\'、&都是有特殊含义的特殊字符，无法直接输入，要想输入只能使用keyevent。
3. 输入过程中左移右移、删除等都需要使用keyevent。

## 模拟按键(keyevent)

### 用法与事例

主要用于模拟键盘的输入，因此是在用键盘的地方才用得到。例如：

	adb shell input keyevent 67

### 常用按键：

| 按键键码 | 功能 | 对应Android定义KeyEvent |
| :---: | ---| --- |
| 1 | 按menu键 | KEYCODE_MENU |
| 3 | 按home键 | KEYCODE_HOME |
| 4 | 按back键 | KEYCODE_BACK |
| 21 | 光标左移 | KEYCODE_DPAD_LEFT |
| 22 | 光标右移 | KEYCODE_DPAD_RIGHT |
| 67 | 按删除按钮 | KEYCODE_DEL |

### 完整按键键码查询

[http://developer.android.com/reference/android/view/KeyEvent.html](http://developer.android.com/reference/android/view/KeyEvent.html)

## 模拟屏幕滑动（swipe）

### 用法与事例

主要用于模拟手指在屏幕的滑动。例如：

	adb shell input swipe 0 20 300 500 #意思从屏幕(0,20)滑动到(300,500)

### 参数含义

1. 四个参数，分别是其实位置的横竖坐标和结束位置的横竖坐标
2. 参数的意思是模拟在屏幕上的直线滑动
3. 参数可以正值，可以负值

## 模拟屏幕轻触（tap）

### 用法与事例

主要用于模拟手指在屏幕的轻触点击。例如：

	adb shell input tap 100 400

### 参数含义

1. 两个参数，先横后竖
2. 参数的意思是模拟在屏幕上点击的位置。
