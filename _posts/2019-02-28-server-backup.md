---
layout: post
title: 服务器迁移到腾讯云笔记
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
- 在线PPT：show.bihe0832.com
- 一些个人相关的内容：we.bihe0832.com

### 依赖环境：

- php
- mysql
- git
- node

## 迁移过程

### 环境安装

    #!/bin/sh
    # author code@bihe0832.com

    function checkResult() {  
       result=$?
       echo "result : $result"
       if [ $result -eq 0 ];then
          echo "checkResult: execCommand succ"
       else
        echo "checkResult: execCommand failed"
        exit $result
       fi
    }  
    #zsh git
    sudo yum update
    sudo yum install zsh
    sudo yum install git
    cd ~/
    mkdir temp 
    cd ~/zixie/github/
    checkResult
    if [ ! -d "./Settings-Tools" ]; then
      git clone https://github.com/bihe0832/Settings-Tools.git
    fi
    cp -fr ~/zixie/github/Settings-Tools/config/.oh-my-zsh/ ~/
    cp -fr ~/zixie/github/Settings-Tools/config/linux/.zshrc ~/
    chsh -s /bin/zsh

    sudo yum install tree
    sudo yum install rz
    sudo yum install lrzsz

    sudo yum erase nodejs npm -y   # 卸载旧版本的nodejs
    sudo rm /usr/local/bin/npm
    sudo rm /usr/local/share/man/man1/node.1
    sudo rm /usr/local/lib/dtrace/node.d
    sudo rm -rf ~/.npm
    sudo rm -rf ~/.node-gyp
    sudo rm /opt/local/bin/node
    sudo rm /opt/local/include/node
    sudo rm -rf /opt/local/lib/node_modules
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
    export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    nvm install node
    nvm install nodejs
    nvm install npm

    sudo yum update
    sudo yum install nginx
    sudo yum install php
    sudo yum install mysql
    sudo yum install php-fpm
    sudo yum install mysql-server

### 梳理源码与域名的对应关系并部署（已整理脚本）

- MyWeb：个人常用web相关资源收集

    - 主目录对应  microdemo.bihe0832.com/MyJS
    - res特殊 对应microdemo.bihe0832.com根目录的res
    - crossDomain/server特殊，对应microdemotest/crossDomain

- MultiQrcode：浏览器组件

    - 对应 SVN microdemo/MultiQrcode
    
- QrcodeSign：扫码登陆

    - 对应SVN microdemo/QrcodeSign

- WechatAPI：微信公共账号

    - 对应SVN microdemo/WechatAPI

- readhub-server

	- 对应readhub.bihe0832.com 

- Shakeba

	- 对应shakeba.bihe0832.com

- we

	- 对应show.bihe0832.com

- Show

	- 对应we.bihe0832.com

- vampire-wechat

	- 对应wxapp.bihe0832.com，注意使用node-version分支

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

- nginx.conf

		
		user nginx;
		worker_processes auto;
		pid /run/nginx.pid;
		
		events {
			worker_connections 10000;
		}
		
		http {
		
			sendfile on;
			tcp_nopush on;
			tcp_nodelay on;
			keepalive_timeout 65;
			types_hash_max_size 2048;

			include /etc/nginx/mime.types;
			default_type application/octet-stream;
		
			……
			
			include /etc/nginx/conf.d/*.conf;
			include /etc/nginx/sites-enabled/*;
		}
	


- microdemotest.bihe0832.com

		server {
			listen 80;
			listen [::]:80;
		
			server_name microdemotest.bihe0832.com; 
		
			error_page 404 https://blog.bihe0832.com/404.html;
		
			root ~/web/microdemotest;
			index index.html;
		
			location / {
				try_files $uri $uri/ =404;
			}
			location ~ \.php$ {
		            include fastcgi_params;
		            fastcgi_pass  localhost:9000;
		            fastcgi_param SCRIPT_FILENAME ~/web/microdemotest/$fastcgi_script_name;
		    }
		}
	
- wxapp.bihe0832.com

		server {

			listen 443 ssl http2;
		  	listen [::]:443 ssl http2;
		
			server_name wxapp.bihe0832.com; 
		
			error_page 404 http://blog.bihe0832.com/404.html;
		
			ssl on;
			ssl_certificate wxapp.bihe0832.com_bundle.crt; 
			ssl_certificate_key wxapp.bihe0832.com.key;
		   	ssl_session_timeout 5m;
			ssl_protocols TLSv1.2;
			ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
			ssl_prefer_server_ciphers on;
		
		    root ~/web/vampire-wechat/wx-app;
		    index index.html index.php;
		
			location / {
				proxy_intercept_errors on;
				proxy_pass http://127.0.0.1:3000/;
			}
		}
		
		server {
		    listen 80;
		    listen [::]:80;
		
			server_name wxapp.bihe0832.com; 
			rewrite ^(.*) https://$server_name$1 permanent;
		}




