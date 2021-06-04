---
layout: post
title: nginx下多域名配置示例
category: 后台开发
tags: tags
keywords: nginx conf server http https root index location
description: 最近把服务器从海外迁移到腾讯云，迁移的过程中对环境重新整理了一遍，同时体验了一下nodejs写服务，由于只有一台服务器，这样就会导致nginx的配置相对比较复杂，这里就集中整理一下，后续不断完善
---

### 背景

最近把服务器从海外迁移到腾讯云，迁移的过程中对环境重新整理了一遍，同时体验了一下nodejs写服务，由于只有一台服务器，这样就会导致nginx的配置相对比较复杂，这里就集中整理一下，后续不断完善。这里只列配置内容，对于具体的配置项不做详细解释

- 环境

		[zixie@VM_89_48_centos ~]# nginx -v
		nginx version: nginx/1.12.2
		[zixie@VM_89_48_centos ~]# cat /proc/version
		Linux version 3.10.0-514.26.2.el7.x86_64 
			(builder@kbuilder.dev.centos.org) 
			(gcc version 4.8.5 20150623 (Red Hat 4.8.5-11) (GCC) ) #1 SMP Tue Jul 4 15:04:05 UTC 2017

- 业务

	- 静态资源站点
	- 基于PHP的服务
	- 基于nodejs的服务

- 服务类型：

	- http
	- https	

### 具体配置

- 全局配置

	下面的文件列表是`/etc/nginx`下的部分关键文件列表，主要包括nginx的核心配置、HTTPS证书、站点配置文件。

		
		|-- 1_wxapp.bihe0832.com_bundle.crt 	：https证书
		|-- 2_wxapp.bihe0832.com.key		：https证书
		|-- nginx.conf			：nginx全局配置文件
		|-- nginx.conf.default
		|-- sites-enabled			：站点配置目录
		|   |-- game.bihe0832.com		：game.bihe0832.com的配置
		|   |-- microdemo.bihe0832.com
		|   |-- microdemotest.bihe0832.com
		|   |-- readhub.bihe0832.com
		|   |-- shakeba.bihe0832.com
		|   |-- show.bihe0832.com
		|   |-- we.bihe0832.com
		|   `-- wxapp.bihe0832.com
		`-- win-utf
	
	下面是全局配置`nginx.conf`的内容：
	
		user nginx;
		worker_processes auto;
		pid /run/nginx.pid;
		
		events {
		        worker_connections 768;
		        # multi_accept on;
		}
		
		http {
	
	        ##
	        # Basic Settings
	        ##
	
	        sendfile on;
	        tcp_nopush on;
	        tcp_nodelay on;
	        keepalive_timeout 65;
	        types_hash_max_size 2048;
	        # server_tokens off;
	
	        # server_names_hash_bucket_size 64;
	        # server_name_in_redirect off;
	
	        include /etc/nginx/mime.types;
	        default_type application/octet-stream;
	
	        ##
	        # SSL Settings
	        ##
	
	        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	        ssl_prefer_server_ciphers on;
	
	        ##
	        # Logging Settings
	        ##
	
	        access_log /var/log/nginx/access.log;
	        error_log /var/log/nginx/error.log;
	
	        ##
	        # Gzip Settings
	        ##
	
	        gzip on;
	        gzip_disable "msie6";
	
	        ##
	        # Virtual Host Configs
	        ##
	
	        include /etc/nginx/conf.d/*.conf;
	        include /etc/nginx/sites-enabled/*;
		}
		
- 业务配置

	下面是两个具体业务的服务配置，第一个是使用nodejs写的服务，并且配置了https的业务
	

		[zixie@VM_89_48_centos ~]# cat /etc/nginx/sites-enabled/wxapp.bihe0832.com 
		server {

        	listen 443 ssl http2;
          	listen [::]:443 ssl http2;
        
        	server_name wxapp.bihe0832.com; 
        
        	error_page 404 https://blog.bihe0832.com/404.html;
        
        	ssl_certificate /etc/nginx/site-key/1_wxapp.bihe0832.com_bundle.crt; 
        	ssl_certificate_key /etc/nginx/site-key/2_wxapp.bihe0832.com.key;
           	ssl_session_timeout 5m;
        	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        	ssl_prefer_server_ciphers on;
        
            root /data/zixie/wx-app;
            index index.html index.php;
        
        	location / {
        		proxy_intercept_errors on;
        		proxy_pass http://127.0.0.1:3000/;
        	}	
        }
        
        server {
            listen 80;
        	server_name wxapp.bihe0832.com; 
        	rewrite ^(.*) https://$server_name$1 permanent;
        }
	
	第二个是使用php写的服务，并且配置了http的业务
	
		[zixie@VM_89_48_centos ~]# cat /etc/nginx/sites-enabled/show.bihe0832.com 
		server {
        	listen 443 ssl http2;
          	listen [::]:443 ssl http2;
        
        	server_name show.bihe0832.com; 
        
        	charset utf-8;
        
        	error_page 404 https://blog.bihe0832.com/404.html;
        
        	ssl_certificate /etc/nginx/site-key/1_show.bihe0832.com_bundle.crt; 
        	ssl_certificate_key /etc/nginx/site-key/2_show.bihe0832.com.key;
        	ssl_session_timeout 5m;
        	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        	ssl_prefer_server_ciphers on;
        
        
        	root /data/zixie/Show;
        	index index.html;
        	
        	# 精确匹配 优先级最高
        	location = /marry/welcome.php {
        		return 301 https://we.bihe0832.com/marry/welcome.php;
        	}
        
        	# 匹配路径的前缀，如果找到停止搜索 location，第二优先级
        	location ^~ /marry/ {
        		rewrite ^(.*)$ http://we.bihe0832.com$1 permanent;
        	}
        
        	# 不区分大小写的正则匹配，第三优先级
        	location ~* \.(?:html?|xml|json|md)$ {
        		expires -1;
        	}
        	# Feed
        	location ~* \.(?:rss|atom)$ {
        		expires 1h;
        		add_header Cache-Control "public";
        	}
        	# Media: images, icons, video, audio, HTC
        	location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
        		expires 1M;
        		access_log off;
        		add_header Cache-Control "public";
        	}
        	# CSS and Javascript
        	location ~* \.(?:css|js)$ {
        		expires 1y;
        		access_log off;
        		add_header Cache-Control "public";
        	}
        
        	# 正则匹配，解析第四优先级 
        	location ~ \.php$ {
                include fastcgi_params;
                fastcgi_pass  localhost:9000;
                fastcgi_param SCRIPT_FILENAME /data/zixie/web/Show/$fastcgi_script_name;
            }
        
        	# 普通路径前缀匹配 最低优先级
        	location / {
        		try_files $uri $uri/ =404;
        	}
        }
        
        server {
            listen 80;
        
        	server_name show.bihe0832.com; 
        	rewrite ^(.*) https://$server_name$1 permanent;
        }
