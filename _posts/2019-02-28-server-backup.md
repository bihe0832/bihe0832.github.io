---
layout: post
title: 服务器 迁移到 腾讯云 记录
category: 后台开发
tags: tags
keywords: 服务器 nginx http https
description: 由于目前个人域名已经备案了，而且因为小程序也买了国内的服务器，因此顺便把海外的服务器裁撤了。这里简单对过程记录了一下，(目前已经基本完成了迁移，迁移后已经把所有流程整理为脚本自动化，oh yeah!)
---

由于目前个人域名已经备案了，而且因为小程序也买了国内的服务器，因此顺便把海外的服务器裁撤了。这里简单对过程记录了一下，(目前已经基本完成了迁移，迁移后已经把所有流程整理为脚本自动化，oh yeah!)

## 迁移前准备

### 目标：

- 将服务器从linode迁移到腾讯云
- 整理出迁移列表，方便后续再次迁移，尝试写个脚本
- 全站逐步切换到https、http2
- 尝试用node重写部分逻辑

### 需要迁移列表：

- 个人博客：blog.bihe0832.com
- 各种示例和Demo：microdemo.bihe0832.com, microdemotest.bihe0832.com
- 大家来捉鬼微信公众号后台：game.bihe0832.com
- 摇吧官网：shakeba.bihe0832.com
- readhub官网：readhub.bihe0832.com
- 个人展示内容（PPT、小玩意等）：show.bihe0832.com
- 一些个人相关的内容：we.bihe0832.com
- 一些通用工具：demo.bihe0832.com，后对接cdn.bihe0832.com

### 依赖环境：

- php
- mysql
- git
- node

## 迁移过程

### 环境安装

    source <(curl -s https://raw.githubusercontent.com/bihe0832/Settings-Tools/master/webInit/install.sh)
        
### 梳理源码与域名的对应关系并部署（已整理脚本）

- MyWeb：个人常用web相关资源收集

    - 主目录对应  microdemo.bihe0832.com/MyJS
    - crossDomain/server特殊，对应microdemotest/crossDomain

- MultiQrcode：浏览器组件

    - 对应仓库 microdemo/MultiQrcode
    
- QrcodeSign：扫码登陆

    - 对应SVN microdemo/QrcodeSign

- WechatAPI：微信公共账号

    - 对应SVN microdemo/WechatAPI

- readhub-server

	- 对应readhub.bihe0832.com 

- Shakeba

	- 对应shakeba.bihe0832.com

- we

	- 对应we.bihe0832.com

- Show

	- 对应show.bihe0832.com

- vampire-wechat

	- 对应wxapp.bihe0832.com，注意使用node-version分支

- demo.bihe0832.com

	- 对应demo.bihe0832.com，作为cdn.bihe0832.com的源


### 迁移数据库

- 参考文章 [mysql迁移之新建用户、备份还原数据库 - 子勰的博客](https://blog.bihe0832.com/mysql_backup.html)

### 修改nginx 配置：

以一个普通站和一个https站为例

- 目录结构

		├── nginx-conf：nginx配置
		│   ├── fastcgi.conf
		│   ├── fastcgi.conf.default
		│   ├── fastcgi_params
		│   ├── fastcgi_params.default
		│   ├── koi-utf
		│   ├── koi-win
		│   ├── mime.types
		│   ├── mime.types.default
		│   ├── nginx.conf
		│   ├── nginx.conf.default
		│   ├── scgi_params
		│   ├── scgi_params.default
		│   ├── sites-enabled
		│   │   ├── game.bihe0832.com
		│   │   ├── microdemo.bihe0832.com
		│   │   ├── microdemotest.bihe0832.com
		│   │   ├── readhub.bihe0832.com
		│   │   ├── shakeba.bihe0832.com
		│   │   ├── show.bihe0832.com
		│   │   ├── ………
		│   │   ├── we.bihe0832.com
		│   │   └── wxapp.bihe0832.com
		│   ├── uwsgi_params
		│   ├── uwsgi_params
		│   ├── uwsgi_params.default
		│   └── win-utf
		└── shell：搭建脚本(所有shell的参数都是服务器web目录)
		    ├── conf.sh：重置nginx配置并重启
		    ├── env.sh：服务器环境安装
		    ├── init.sh：所有web代码首次部署
		    └── update.sh：所有web代码更新

