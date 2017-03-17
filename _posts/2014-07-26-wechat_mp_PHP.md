---
layout: post
title: 多微信公共账号同时接入微信公共平台API（PHP)
category: 微信公共平台
tags: 公共平台
keywords: 微信公共平台 php API
description: 支持多微信公共账号同时接入的微信公共账号第三方平台框架
---

支持多微信公共账号同时接入的微信公共账号第三方平台框架

### 应用案例：

[http://zixie.sinaapp.com](http://zixie.sinaapp.com)
	
### demo路径：

[http://microdemo.sinaapp.com/WechatAPI/](http://microdemo.sinaapp.com/WechatAPI/)

线上代码结构与本地一致，可以追加完整的路径测试效果

### 对应demo二维码：

![demo](http://microdemo.sinaapp.com/WechatAPI/demo.png)

### 代码结构：

     — app：具体微信公共账号业务逻辑层
     	- app.do.php：公共账号逻辑处理的基类
     	- app.test.conf.php：对于appDo的测试用例
     	- app.test.php：对于appDo的测试入口地址
     	- zixie：具体公共账号demo（zixie）相关的代码，每一个公共账号相关的所有内容都在这里
     		- conf：
     			zixie.conf.php：具体公共账号demo（zixie）的基本配置
     		- main：
     			zixie.do.php：具体公共账号demo（zixie）的业务逻辑处理类
     			zixie.test.conf.php：对于zixieDo的测试用例
     			zixie.test.php：zixieDo测试入口地址
     		- tools：
     			zixie.auth.do.php：具体公共账号demo（zixie）网页授权处理类
     			zixie.auth.php：具体公共账号demo（zixie）网页授权跳转地址
     			zixie.tools.php：具体公共账号demo（zixie）工具类，负责菜单，临时二维码生成等
     		- zixie.php：具体公共账号demo（zixie）的公共平台入口地址，配置在微信公共平台
     	……
     - basic：
     	- debug.php：日志记录类
     	- wechatAuth.class.php：微信公共账号网页授权基础类
     	- wechatAuth.getData.php：微信公共账号网页授权测试，获取code等数据页面
     	- wechatAuth.test.php：微信公共账号网页授权基础类测试代码
     	- wechatBase.class.php：框架基础类，完成通用函数、框架配置；关注、取消关注等基础功能
     	- wechatBase.test.php：框架基础类测试代码
     	- wechatTools.class.php：微信公共账号工具类，完成菜单、二维码相关功能
     	- wechatTools.do.php：微信公共账号工具类接口封装类
     	- wechatTools.test.php：微信公共账号工具类测试代码
     - conf：
     	- conf_basic.php：框架与环境相关的基本配置
     	- conf_conn.php：框架与DB、cache、通用错误码相关的配置
     - data：
     	- data.sql：框架依赖的一些数据表，记录用户信息、授权信息、提示消息等
     - log：系统日志文件夹
     - wechat：
     	- wechatApi.php：框架对微信所有接口的封装，主要分为六个部分
     	- wx_sample.php：微信提供的php接入demo

### 使用步骤

	1.把整个项目目录clone到你的工程
	2.修改WechatAPI下conf目录中的平台的配置文件
	3.根据业务逻辑重写WechatAPI下app目录的app.do.php
	4.参照WechatAPI下app目录下的demo（zixie）按照自己的业务逻辑完成对应公共账号业务逻辑的开发
	5.修改对应公共账号文件夹下conf目录中的配置，并把TOKEN和根目录中的连接配置到微信公共账号管理端

### 数据表说明

- t_user：记录用户的基本信息
- t_basictips：微信公共账号中的一些提示信息
- t_authorize：用户网页授权以后保存的授权信息
	
### 部分使用建议

- 建议开启memcache，对于有些数据库查询、授权信息框架会优先使用缓存中的信息；如果使用memcached，只需要修改初始化的地方即可
- 开发调试期间可以参照API中的test.conf模拟微信的返回在本地调试，开发完成以后再用微信调试
- 建议上线以后删除所有的test文件，同时将conf_conn.php中的$debug设置为true，将conf_basic.php中的ZIXIE_DEBUG设置为false
- 当在对接微信遇到问题以后可以将conf_basic.php中的ZIXIE_DEBUG设置为true，这样会打印所有来自微信公共平台的用于消息到log


 
