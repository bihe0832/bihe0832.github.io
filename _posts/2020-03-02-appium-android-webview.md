---
layout: post
title: appium 爬坑之基于 Chromedriver 测试 Android webview
category: 终端开发
tags: Android 自动 测试 appium webview
keywords: appium Android iMac
description: 最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。这边文章主要介绍完整流程，后续会在其他文章介绍结合场景介绍具体的测试用例书写。
---

最近因为项目需要对于一些Android的基础功能添加自动化测试。以前都是基于Robotium来写，比较费时费力，这次选择用Appium，而且这样测试也可以完全黑盒。

### 背景

在终端开发中，难免会涉及到一些weview的界面，appium提供了基于 Chromedriver 的webview测试方法，这边文章主要介绍在iMac上搭建基于 Chromedriver 测试Android webview 的自动测试环境及测试脚本。

在整个测试过程会设计到几个定义专门列一下：

- Chrome 或者 Chrome内核版本：这个是指你的内置浏览器所使用的web内核的版本
- Chromedriver ：ChromeDriver 是 google 为网站开发人员提供的自动化测试接口，它是 selenium2 和 chrome浏览器 进行通信的桥梁。是你的电脑上的独立应用
- appium-chromedriver ：Appium 用于webview自动测试的基于ChromeDriver的扩展，通过npm安装

### webview测试事例

	from appium import webdriver
	
	caps={}
	caps['platformName']= "Android"
	caps['deviceName']= "6518ac77"
	caps["chromeOptions"] = {
	    "androidProcess":"com.bihe0832.readhub:web",
	    "androidPackage":"com.bihe0832.readhub"
	}
	caps["chromedriverExecutableDir"] = "/Users/zixie/temp/1/1mna"
	driver = webdriver.Remote("http://127.0.0.1:4725/wd/hub", caps)
	
	contexts = driver.contexts
	print(contexts)
	print(driver.current_context)
	if len(contexts)  < 2 :
	    print("no web context" + driver.current_activity)
	    exit
	# 切换到webview
	driver.switch_to.context(contexts[1])
	print(driver.current_context)

### 常见错误

- **错误1：Original error: Could not load a driver for platformName 'Android'. Please verify your Appium installation**

	- 错误事例：
				
		selenium.common.exceptions.WebDriverException: Message: An unknown server-side error occurred while processing the command. Original error: Could not load a driver for platformName 'Android'. Please verify your Appium installation
	
	- 解决方案：

		这个问题一般是因为没有安装appium-chromedriver扩展引起，可以参考 [http://appium.io/docs/en/writing-running-appium/web/chromedriver/](http://appium.io/docs/en/writing-running-appium/web/chromedriver/) 的提示安装。或者直接用下面的命令重装appium：
			
			sudo npm install -g appium --unsafe-perm=true --allow-root --chromedriver_version="2.46"
			
		然后再启动Appium的时候增加参数：`--allow-insecure chromedriver_autodownload`，例如：
		
			/usr/local/bin/appium  --allow-insecure chromedriver_autodownload -a 127.0.0.1 -p 4725 -g ./log/appium_server_4725.log


- **错误2：There must be at least one Chromedriver executable available for use if the current Chrome version cannot be determined**

	- 错误事例：
					
		WebDriverException('An unknown server-side error occurred while processing the command. Original error: There must be at least one Chromedriver executable available for use if the current Chrome version cannot be determined', None, None)
		
	- 解决方案：

		这个问题一般是因为没有无法找到适合你的 webview 的 Chromedriver引起的，可以，根据你的webview对应的内核。然后再测试脚本中添加 `chromedriverExecutableDir` 的定义，例如：
		
			caps={}
			caps['platformName']= "Android"
			caps['deviceName']= "6518ac77"
			caps["chromedriverExecutableDir"] = "./appium"
			driver = webdriver.Remote("http://127.0.0.1:4725/wd/hub", caps)

	对于如何知道你的webview对应的内核版本，可以用下面的方法：
	
	1. 打开应用的webview界面
	
	2. 在PC的Chrome 浏览器里面输入：`chrome://inspect/#devices`
	
	3. 在 `Remote Target` 里面选择你的webview，然后点击下方的 `inspect `
	
	4. 在弹出的 DevTools 界面里面切换到Console 的tab，然后输入命令 `window.navigator.userAgent`，就可以得到类似下面的信息：
	
			"Mozilla/5.0 (Linux; Android 7.1.1; OS105 Build/NGI77B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045118 Mobile Safari/537.36/  MnaVersion/3.0.0/4889/1/JSVersion/1.0.0/1"
	
		就可以看到Chrome内核的版本
	
	5. 去 [http://appium.io/docs/en/writing-running-appium/web/chromedriver/](http://appium.io/docs/en/writing-running-appium/web/chromedriver/) 查看 Chrome 与 Chromedriver的对应关系然后前往 [https://chromedriver.storage.googleapis.com/index.html](https://chromedriver.storage.googleapis.com/index.html) 下载适合你的PC的与webview对应的Chromedriver版本。

- **错误3：Unable to automate Chrome version because it is too old for this version of Chromedriver**

	- 错误事例：
		
		selenium.common.exceptions.WebDriverException: Message: An unknown server-side error occurred while processing the command. Original error: Unable to automate Chrome version because it is too old for this version of Chromedriver.
Chrome version on the device: Chrome/66.0.3359.126
Visit 'https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/web/chromedriver.md' to troubleshoot the problem.
A new session could not be created. Details: session not created: Chrome version must be between 71 and 75
  (Driver info: chromedriver=2.46.628411 (3324f4c8be9ff2f70a05a30ebc72ffb013e1a71e),platform=Mac OS X 10.14.4 x86_64)
  
  	- 解决方案：

		这个问题一般是因为没有无法找到适合你的 webview 的 Chromedriver引起的，或者自动下载，你手动下载的 Chromedriver 版本与你的webview无法对应引起的，解决方案参考错误2。
		
-  **错误4：Failed to get sockets matching: `@webview_devtools_remote_.*15531`   (make sure the app has its WebView configured for debugging)**

	- 错误事例：

		repr(e):	 WebDriverException('An unknown server-side error occurred while processing the command. Original error: An unknown server-side error occurred while processing the command. Original error: unknown error: Failed to get sockets matching: @webview_devtools_remote_.*15531\n  (make sure the app has its WebView configured for debugging)\n  (Driver info: chromedriver=2.40.565386 (45a059dc425e08165f9a10324bd1380cc13ca363),platform=Mac OS X 10.15.1 x86_64)', None, None)
	  
	- 解决方案：

		这个问题可能是因为你的webview是独立进程的，导致无法获取，只需要在 chromeOptions 添加 androidProcess 即可，例如：
		
			desired_caps={}
			desired_caps['platformName']= "Android"
			desired_caps['deviceName']= uuid
			desired_caps["chromeOptions"] = {
			    "androidProcess":"com.bihe0832.readhub:web",
			    "androidPackage":"com.bihe0832.readhub"
			}
			desired_caps["chromedriverExecutableDir"] = "./appium"
			driver=webdriver.Remote('http://127.0.0.1:'+str(port)+'/wd/hub',desired_caps)
		
-  **错误5： Original error: Could not find a connected Android device**

	- 错误事例：
			
		selenium.common.exceptions.WebDriverException: Message: An unknown server-side error occurred while processing the command. Original error: Could not find a connected Android device.

	- 解决方案：

		这个问题可能是因为你的webview是独立进程的，导致无法获取，只需要在 chromeOptions 添加 androidPackage 即可，添加方法可以参考错误4


