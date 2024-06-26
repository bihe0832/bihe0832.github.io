---
layout: post
title: 安卓开发那些事之开发规范
category: 终端开发
tags: tags
keywords: 安卓 组件化 规范
description: 这篇文章总结组件化开发框架相关的一些开发规范，这些规范是保证组件化框架可以持续保持生命力的基本条件。
---

这篇文章总结组件化开发框架相关的一些开发规范，这些规范是保证组件化框架可以持续保持生命力的基本条件。

## 总体原则

- 高内聚，低耦合；无论是代码还是资源，尽可能都放在功能所属的模块

- 尽量通过接口下沉来解决不同模块调用问题，**除非必须，不使用反射**
	
## 通用规范

#### 环境设置

- 文件编码一律使用UTF-8；结尾符使用LF，而非CRLF

#### UI相关

- 添加布局或资源
	
	- **通用资源都放到Applicaion，方便复用，不要每个模块搞一份，（即使当前只是个别模块使用，但是可复用的都要下沉复用）**
	
	- 图片资源一律添加到对应模块的 mipmap，且仅添加 xxdpi
		
	-  **所有图片资源必须设定宽高，然后选择剪裁模式，不可以warp_content**

	- 所有的资源，设计稿可能是浮点数，开发中一律取整为整数，包括高度、宽度、字体大小等
		
	- 文字字体一律使用dp，**不使用sp**
		
	- 能用drawable做的效果，尽量不要用图片
	
	- 尽量使用约束布局ConstraintLayout，尽可能减少布局层级， **不可以include来复用布局**
	
	- **通用卡片尽量内聚**，方便第三方复用，数据结构尽可能简单，并且提供转换方式。如果多个模块都用到，下沉到更底层
	

- Action 设置

	1. **Activity或者Fragment不可以implement各种Listener**
	
	2. **不可以自定义一个OnClickListener等，然后一堆控件set，之后再if else 处理**

## 组件化框架规范

#### 组件命名规范

- 基础组件 LibXXX

- 业务组件 BaseXXX

- 应用组件 PubXXX

#### 组件依赖关系

- 所有依赖统一在 dependencies.gradle 维护

#### UI相关

- 继承关系

	1. Activity 必须继承自 BaseActivity
	    
	2. Applicaion 必须继承自 BaseApplication
	    
	3. Fragment 必须继承自 BaseFragment

- 页面跳转

	页面跳转使用路由，如非必要，不要使用 startActivity