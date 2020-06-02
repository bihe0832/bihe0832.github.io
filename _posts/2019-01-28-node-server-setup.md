---
layout: post
title: nodejs入门之后台服务的几种启动方式
category: 后台开发
tags: tags
keywords: node nodemon npm pm2
description: 介绍了使用node搭建的web服务的几种服务启动方式
---

### 背景信息

最近工作项目有调整，需要熟悉一些前端的内容，就顺便看看node，同时边学习边总结一下。如果使用node搭建后台服务，可以直接使用http创建一个服务器对象，也阔以选择Express框架。如果只是想使用node搭建一个简单的server，可以参考 [https://github.com/bihe0832/node-demo/tree/master/http](https://github.com/bihe0832/node-demo/tree/master/http)。

这里因为我们只是示例几种启动方式，因此就选择了最简单的demo，示例所有代码参照 [https://github.com/bihe0832/node-demo/tree/master/setup](https://github.com/bihe0832/node-demo/tree/master/setup)

### 几种启动方式

#### node 启动

这是最常见的启动方式

- 命令：
	
	node 入口js

- 事例：

		➜  setup git:(master) ✗ node server.js
		Server running at http://127.0.0.1:3000/
		
- 备注：

	使用node启动服务以后，应用程序的每次修改都需要停掉服务以后重启。
	
#### nodemon 启动
	
nodemon用来监视node.js应用程序中的任何更改并自动重启服务，非常适合用在开发环境中。

- 命令：
	
	nodemon 入口js

- 事例：

		➜  setup git:(master) ✗ npm install nodemon
		npm WARN deprecated duplexer3@0.1.4: Sadly, duplexer3 is no longer with us. It will be missed.
		
		> nodemon@1.18.9 postinstall /temp/1/node-demo/setup/node_modules/nodemon
		> node bin/postinstall || exit 0
		
		npm WARN saveError ENOENT: no such file or directory, open '/temp/1/node-demo/setup/package.json'
		npm WARN enoent ENOENT: no such file or directory, open '/temp/1/node-demo/setup/package.json'
		npm WARN setup No description
		npm WARN setup No repository field.
		npm WARN setup No README data
		npm WARN setup No license field.
		
		+ nodemon@1.18.9
		added 223 packages from 130 contributors and audited 2238 packages in 11.378s
		found 0 vulnerabilities

		➜  setup git:(master) ✗ nodemon server.js
		[nodemon] 1.18.9
		[nodemon] to restart at any time, enter `rs`
		[nodemon] watching: *.*
		[nodemon] starting `node server.js`
		Server running at http://127.0.0.1:3000/
		[nodemon] restarting due to changes...
		[nodemon] starting `node server.js`
		Server running at http://127.0.0.1:3000/
		[nodemon] restarting due to changes...
		[nodemon] starting `node server.js`

- 备注：

	从日志可以看到，当应用程序有代码修改时，不需要重启服务，刷新页面就可以看到更新后的内容

#### npm 启动

- 命令：
	
	npm start
	
- 事例：

		➜  setup git:(master) ✗ npm start
		
		> setup@1.0.0 start /temp/1/node-demo/setup
		> nodemon server.js
		
		[nodemon] 1.18.9
		[nodemon] to restart at any time, enter `rs`
		[nodemon] watching: *.*
		[nodemon] starting `node server.js`
		Server running at http://127.0.0.1:3000/

- 备注：

	npm start 和前面的两种启动方式并没有区别，他只是将前面的启动方式做了进一步的封装，并且提升到工程模式
	
#### pm2 启动

PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。在项目正式部署的时候一般都是使用他来管理。

- 命令：
	
	pm2 start 入口js --watch
	
- 事例：
	
		➜  setup git:(master) ✗ pm2 start server.js --watch
		[PM2] Applying action restartProcessId on app [server](ids: 1)
		[PM2] [server](1) ✓
		[PM2] Process successfully started
		┌──────────┬────┬─────────┬──────┬──────┬─────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
		│ App name │ id │ version │ mode │ pid  │ status  │ restart │ uptime │ cpu │ mem       │ user │ watching │
		├──────────┼────┼─────────┼──────┼──────┼─────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
		│ app      │ 0  │ 0.0.0   │ fork │ 0    │ stopped │ 16      │ 0      │ 0%  │ 0 B       │ root │ disabled │
		│ server   │ 1  │ 0.0.0   │ fork │ 1494 │ online  │ 35      │ 0s     │ 0%  │ 15.5 MB   │ root │ enabled  │
		└──────────┴────┴─────────┴──────┴──────┴─────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
		 Use `pm2 show <id|name>` to get more details about an app
	
- 备注：

	pm2的启动和前面一样没有区别，只是针对服务器环境做了一些优化，更方便做性能监控、自动重启、负载均衡等
		
### 总结

- 项目开发中，建议使用npm配置nodemon来开发调试，即方便工程迁移，同时开发时也比较便捷
- 项目部署时，建议使用pm2，优点上面已经说过了
