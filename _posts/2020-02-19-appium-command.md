---
layout: post
title: appium爬坑之iMac上appium自动测试环境搭建
category: 终端开发
tags: Android 自动 测试 appium
keywords: appium Android iMac
description: 最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。这边文章主要介绍完整流程，后续会在其他文章介绍结合场景介绍具体的测试用例书写。
---

最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。

在用例写好以后，我们就需要有专门的环境来定时运行测试用例，这边文章主要介绍在iMac上搭建appium自动测试的服务器环境及自动控制脚本。

## 环境准备

- 系统版本

    系统版本：	macOS 10.15.1 (19B88)
    
    内核版本：	Darwin 19.0.0

- 工具版本

        ➜  ~  echo $SHELL
        /bin/zsh
        ➜  ~  java -version
        java version "1.8.0_201"
        Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
        Java HotSpot(TM) 64-Bit Server VM (build 25.201-b09, mixed mode)
        ➜  ~  python3.7 -V
        Python 3.7.5
        ➜  ~  pip3.7 -V
        pip 19.3.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
        ➜  ~  node -v
        v13.1.0
        ➜  ~  cnpm -v
        6.12.1
        
####  安装Appium服务端

官方的Appium服务端是基于node的，因此直接使用npm安装即可。


    > ➜  ~  cnpm install -g appium
    /usr/local/bin/appium -> /usr/local/lib/node_modules/appium/build/lib/main.js
    /usr/local/bin/authorize-ios -> /usr/local/lib/node_modules/appium/node_modules/.bin/authorize-ios
    + appium@1.16.0
    updated 1 package in 5.02s
    ➜  ~  cnpm install wd
    
    ……

安装以后测试是否安装成功：

    ➜  ~  appium
    [Appium] Welcome to Appium v1.16.0
    [Appium] Appium REST http interface listener started on 0.0.0.0:4723
    ^C[Appium] Received SIGINT - shutting down

#### 安装 Appium-Client

Appium-Client安装可以参考文章：[appium爬坑之iMac上appium环境搭建及使用真机测试Android项目简介](https://blog.bihe0832.com/appium-desktop-imac.html)

## 命令行运行自动化测试用例

#### 启动服务器

在命令行输入命令启动Appium服务端：

     ➜  ~  appium
        [Appium] Welcome to Appium v1.16.0
        [Appium] Appium REST http interface listener started on 0.0.0.0:4723
        ^C[Appium] Received SIGINT - shutting down

#### 运行测试用例

在命令行输入命令运行测试用例：

	python3.7 ./test.py

## 多进程并发运行测试用例

在实际开发中 ，我们可能会同时在多台设备上运行测试用例，为了提高效率，个人专门开发了多进程并发运行测试用例的demo。相关代码在：[https://github.com/bihe0832/Android-appium](https://github.com/bihe0832/Android-appium)

#### 启动服务器

    ➜  Android-appium git:(master) ✗  find ./ -name "__pycache__" | xargs -I {} rm -fr {} && find ./log | xargs -I {} rm -fr {} &&  find ./screenshot | xargs -I {} rm -fr {} && python3.7 appium/appium_server.py

    List of devices attached
    4fb845e3	device
    
    
    ['4fb845e3']
    lsof -i tcp:4725
    COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    node    75277 zixie   22u  IPv4 0x28a52c751176dd2f      0t0  TCP localhost:4725 (LISTEN)
    
    check_port port 4725 already be in use!
    lsof -i tcp:4725
    COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    node    75277 zixie   22u  IPv4 0x28a52c751176dd2f      0t0  TCP localhost:4725 (LISTEN)
    
    ['node', '', '', '', '75277', 'zixie', '', '', '22u', '', 'IPv4', '0x28a52c751176dd2f', '', '', '', '', '', '0t0', '', 'TCP', 'localhost:4725', '(LISTEN)']
    ['node', '75277', 'zixie', '22u', 'IPv4', '0x28a52c751176dd2f', '0t0', 'TCP', 'localhost:4725', '(LISTEN)']
    kill 75277
    release_port port 4725 already be in use ,but now is available!
    /usr/local/bin/appium -a 127.0.0.1 -p 4725 -g ./log/4725.log at Wed Feb 19 13:54:21 2020

#### 运行测试用例

    ➜  Android-appium git:(master) ✗     python3.7 main.py
    List of devices attached
    4fb845e3	device
    
    
    ['4fb845e3']
    appium port:4725 start run 4fb845e3 at Wed Feb 19 13:56:37 2020
    ************** device info of :4fb845e3 **************
    brand:blackshark
    
    model:SKW-A0
    
    manufacturer:blackshark
    
    version.release:9
    
    version.sdk:28
    
    ************** device info of :4fb845e3 **************
    2020-02-19 13:56:43/1582091803 start wechat app

#### 指定设备调试

    ➜  Android-appium git:(master) ✗ python3.7 develop.py
    appium start run 4fb845e3 at Wed Feb 19 13:58:17 2020
    ************** device info of :4fb845e3 **************
    brand:blackshark
    
    model:SKW-A0
    
    manufacturer:blackshark
    
    version.release:9
    
    version.sdk:28
    
    ************** device info of :4fb845e3 **************
    2020-02-19 13:58:22/1582091902 start wechat app
