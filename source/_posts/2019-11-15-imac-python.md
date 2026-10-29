---
title: iMac上安装Python2.7 和 Python3
categories: 开发工具
tags: [iMac]
keywords: iMac Python 2.7 Python Python3
description: 在日常开发中有时候需要在本地用python做一些测试，iMac自带的python为2.7 而且版本比较老，发现升级比较麻烦，最后就用brew重新安装了，这里汇总整理一下
---

在日常开发中有时候需要在本地用python做一些测试，iMac自带的python为2.7 而且版本比较老，发现升级比较麻烦，最后就用brew重新安装了，这里汇总整理一下

## 查看 iMac自带Python版本

	➜  web  python --version
	Python 2.7.10
	➜  web

## 使用 Homebrew 安装 Python

- 开始安装python2：

		➜  blog git:(master) ✗ brew install python@2
		Updating Homebrew...
		==> Downloading https://homebrew.bintray.com/bottles/python@2-2.7.17.mojave.bottle.tar.gz
		Already downloaded: ~/Homebrew/downloads/3ab8f8c12c3b4584160a2f720d7934121010c8631c632b1bf50c75b64343963c--python@2-2.7.17.mojave.bottle.tar.gz
		==> Pouring python@2-2.7.17.mojave.bottle.tar.gz
		==> /usr/local/Cellar/python@2/2.7.17/bin/python -s setup.py --no-user-cfg install --force --verbose --single-version-externally-managed --record
		==> /usr/local/Cellar/python@2/2.7.17/bin/python -s setup.py --no-user-cfg install --force --verbose --single-version-externally-managed --record
		==> /usr/local/Cellar/python@2/2.7.17/bin/python -s setup.py --no-user-cfg install --force --verbose --single-version-externally-managed --record
		==> Caveats
		Pip and setuptools have been installed. To update them
		  pip install --upgrade pip setuptools
		
		You can install Python packages with
		  pip install <package>
		
		They will install into the site-package directory
		  /usr/local/lib/python2.7/site-packages
		
		See: https://docs.brew.sh/Homebrew-and-Python
		==> Summary
		🍺  /usr/local/Cellar/python@2/2.7.17: 3,807 files, 51.3MB
		➜  blog git:(master) ✗ pip install --upgrade pip setuptools
		DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
		Requirement already up-to-date: pip in /usr/local/lib/python2.7/site-packages (19.3.1)
		Collecting setuptools
		  Downloading https://files.pythonhosted.org/packages/d9/de/554b6310ac87c5b921bc45634b07b11394fe63bc4cb5176f5240addf18ab/setuptools-41.6.0-py2.py3-none-any.whl (582kB)
		     |████████████████████████████████| 583kB 255kB/s
		Installing collected packages: setuptools
		  Found existing installation: setuptools 41.4.0
		    Uninstalling setuptools-41.4.0:
		      Successfully uninstalled setuptools-41.4.0
		Successfully installed setuptools-41.6.0
		➜  blog git:(master) ✗ brew list
		gdbm		gifsicle	libidn2		libyaml		openssl		pkg-config	readline	sqlite		wget
		gettext		icu4c		libunistring	node		openssl@1.1	python@2	ruby		tree		xz

	如上所示，表示python2安装成功

- 开始安装python3： 

		➜  blog git:(master) ✗ brew install python3
		Updating Homebrew...
		==> Downloading https://homebrew.bintray.com/bottles/python-3.7.5.mojave.bottle.tar.gz
		Already downloaded: ~/Homebrew/downloads/7794177f83ae954016ce1dcdffbbea049e471017b473f3ed7cba6c3eee1bdc33--python-3.7.5.mojave.bottle.tar.gz
		==> Pouring python-3.7.5.mojave.bottle.tar.gz
		==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7
		==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7
		==> /usr/local/Cellar/python/3.7.5/bin/python3 -s setup.py --no-user-cfg install --force --verbose --install-scripts=/usr/local/Cellar/python/3.7
		==> Caveats
		Python has been installed as
		  /usr/local/bin/python3
		
		Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
		`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
		  /usr/local/opt/python/libexec/bin
		
		If you need Homebrew's Python 2.7 run
		  brew install python@2
		
		You can install Python packages with
		  pip3 install <package>
		They will install into the site-package directory
		  /usr/local/lib/python3.7/site-packages
		
		See: https://docs.brew.sh/Homebrew-and-Python
		==> Summary
		🍺  /usr/local/Cellar/python/3.7.5: 3,972 files, 60.7MB
		➜  blog git:(master) ✗ brew list
		gdbm		icu4c		libyaml		openssl@1.1	python@2	sqlite		xz
		gettext		libidn2		node		pkg-config	readline	tree
		gifsicle	libunistring	openssl		python		ruby		wget

	如上所示，表示python3安装成功
	
## 查看版本及使用指定版本的方式
	
iMac系统自带的Python在`/usr/bin`目录下，而通过homebrew安装的在`/usr/local/bin`目录下，下面是分别使用各种方式调用不同位置不同版本python的方法

- 使用默认的python，可以看出对应的是homebrew安装python2.7

		➜  blog git:(master) ✗ python -V
		Python 2.7.17
		➜  blog git:(master) ✗ which python
		/usr/local/bin/python
		➜  blog git:(master) ✗ python2.7 -V
		Python 2.7.17
		➜  blog git:(master) ✗ which python2.7
		/usr/local/bin/python2.7

- 使用默认的python3，可以看出对应的是homebrew安装python3.7

		➜  blog git:(master) ✗ python3 -V
		Python 3.7.5
		➜  blog git:(master) ✗ which python3
		/usr/local/bin/python3
		➜  blog git:(master) ✗ which python3.7
		/usr/local/bin/python3.7

- 如果此时要使用系统默认的python，可以用下面的方式
	
		➜  blog git:(master) ✗ /usr/bin/python -V
		Python 2.7.10
		➜  blog git:(master) ✗ /usr/bin/python2.7 -V
		Python 2.7.10
		➜  blog git:(master) ✗
		
## 其他

- 安装指定扩展的指定库

	以为使用homebrew安装的 `python2` 安装扩展`pyelliptic`的 `1.5.7` 版本

		➜  blog git:(master) ✗ which pip2
		/usr/local/bin/pip2
		➜  blog git:(master) ✗ pip2  install pyelliptic==1.5.7
		DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
		Requirement already satisfied: pyelliptic==1.5.7 in /usr/local/lib/python2.7/site-packages (1.5.7)
		➜  blog git:(master) ✗ /usr/local/bin/pip2 install pyelliptic==1.5.7
		DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
		Requirement already satisfied: pyelliptic==1.5.7 in /usr/local/lib/python2.7/site-packages (1.5.7)
		➜  blog git:(master) ✗
	
- 安装扩展提示openssl 版本异常

	- 错误示例
	
			➜  blog git:(master) ✗  pip3.7 install Appium-Python-Client
			pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.
			Collecting Appium-Python-Client
			  Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError("Can't connect to HTTPS URL because the SSL module is not available.")': /simple/appium-python-client/
			  Retrying (Retry(total=3, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError("Can't connect to HTTPS URL because the SSL module is not available.")': /simple/appium-python-client/
			  Retrying (Retry(total=2, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError("Can't connect to HTTPS URL because the SSL module is not available.")': /simple/appium-python-client/
			  Retrying (Retry(total=1, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError("Can't connect to HTTPS URL because the SSL module is not available.")': /simple/appium-python-client/
			  Retrying (Retry(total=0, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError("Can't connect to HTTPS URL because the SSL module is not available.")': /simple/appium-python-client/
			  Could not fetch URL https://pypi.org/simple/appium-python-client/: There was a problem confirming the ssl certificate: HTTPSConnectionPool(host='pypi.org', port=443): Max retries exceeded with url: /simple/appium-python-client/ (Caused by SSLError("Can't connect to HTTPS URL because the SSL module is not available.")) - skipping
			  Could not find a version that satisfies the requirement Appium-Python-Client (from versions: )
			No matching distribution found for Appium-Python-Client
			pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.
			Could not fetch URL https://pypi.org/simple/pip/: There was a problem confirming the ssl certificate: HTTPSConnectionPool(host='pypi.org', port=443): Max retries exceeded with url: /simple/pip/ (Caused by SSLError("Can't connect to HTTPS URL because the SSL module is not available.")) - skipping
	
	- 解决方案 
	
		删除Python的OpenSSL依赖并重装
	
			brew update && brew upgrade
			brew uninstall --ignore-dependencies openssl; 
			brew install https://github.com/tebelorg/Tump/releases/download/v1.0.0/openssl.rb
			brew reinstall python
			
	
				

