---
layout: post
title: 一款检查Gradle依赖配置是否冲突的插件
category: 终端开发
tags: tags
keywords: android gradle plugin
description: 在平时的开发中，大家经常会遇到因为gradle的构建配置错误引起的各种奇奇怪怪的问题，每次梳理依赖关系都需要很长时间，为了更方便的找出项目中的依赖冲突，专门开发了这个插件。
---

## 背景介绍



## 此文档不再更新，最新文档请点击链接查看：[https://android.bihe0832.com/doc/tools/gradle-dependencies-check.html](https://android.bihe0832.com/doc/tools/gradle-dependencies-check.html)

在平时的开发中，大家经常会遇到因为gradle的构建配置错误引起的各种奇奇怪怪的问题，每次梳理依赖关系都需要很长时间，为了更方便的找出项目中的依赖冲突，专门开发了这个插件。

## 使用方法：

### 在项目中添加插件

- 在项目根目录的build.gradle中添加插件仓库：
	
	    buildscript {
	       repositories {
		        jcenter()
		    }
		    dependencies {
		        classpath "com.bihe0832:GradleDependenciesCheck:1.0.2"
		    }
		}

-	引入插件，并添加插件相关配置

	你可以选择在每个project都添加一份，也可以选择参考demo，在根build.gradle的subprojects中添加

		subprojects {
		    /************************** 应用插件 Start ***********************/
		    //应用插件
		    apply plugin: 'com.bihe0832.gradleDependenciesCheck'
		    //配置插件相关配置
		    GradleDependenciesCheckConfig {
		        /**
		         * 检查结果提示类型:
		         *  1 以warning形式在命令行提示
		         *  2 直接编辑报错，并提示错误
		         */
		        showResultType = 2
		    }
		    /************************** 应用插件 End ***********************/
		
		}

- 将插件添加到其余系统任务中自动执行

		subprojects {
			afterEvaluate { Project project ->
		        project.getTasks().getByName('clean').dependsOn("checkGradleDependencies")
		        project.getTasks().getByName('preBuild').dependsOn("checkGradleDependencies")
		    }
	    }

完整的插件使用方式，可以参考项目的事例Sample的根目录的build.gradle

### 运行插件

- 在IED右侧的Gradle窗口选择others，然后点击`checkGradleDependencies`
- 直接在命令行运行`./gradlew  checkGradleDependencies`
- 直接运行已经添加了依赖的系统task

### 运行效果

- 在命令行运行效果如下：
		
		> Task :app:listGradleDependencies FAILED
		listGradleDependencies start ...
		
		FAILURE: Build failed with an exception.
		
		* What went wrong:
		Execution failed for task ':app:listGradleDependencies'.
		> [ERROR] org.jetbrains.kotlin:kotlin-stdlib has different version: 
		  	1.3.0 found from: 
		  	 	 app:org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.3.0
		  	 	 app:Sample:sdk:unspecified
		  	1.2.71 found from: 
		  	 	 app:org.jetbrains.kotlin:kotlin-compiler-embeddable:1.2.71
		
		
		* Try:
		Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
		
		* Get more help at https://help.gradle.org
		
		Deprecated Gradle features were used in this build, making it incompatible with Gradle 5.0.
		Use '--warning-mode all' to show the individual deprecation warnings.
		See https://docs.gradle.org/4.10/userguide/command_line_interface.html#sec:command_line_warnings
		
		BUILD FAILED in 1s
		1 actionable task: 1 executed
		[ERROR] org.jetbrains.kotlin:kotlin-stdlib has different version: 
			1.3.0 found from: 
			 	 app:org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.3.0
			 	 app:Sample:sdk:unspecified
			1.2.71 found from: 
			 	 app:org.jetbrains.kotlin:kotlin-compiler-embeddable:1.2.71
		
		4:39:17 PM: Task execution finished 'listGradleDependencies'.
	
## 项目相关：

### 源码地址

-  项目源码及使用Demo：[https://github.com/bihe0832/Gradle-Dependencies-Check](https://github.com/bihe0832/Gradle-Dependencies-Check)

### 后续规划

- 检查所有依赖的最新版，然后推荐更新

- 推荐把support等相关库都切换到了androidx

- 对于一些需要版本对应的，提示对应。例如：databing compile依赖的版本号与Android Gradle Plugin版本保持一致等

## 参考及文章

- Gradle插件开发系列之总纲：[https://blog.bihe0832.com/gradle_plugin_summary.html](https://blog.bihe0832.com/gradle_plugin_summary.html)

- 开发第一个gradle插件：[https://blog.bihe0832.com/gradle_plugin_new.html](https://blog.bihe0832.com/gradle_plugin_new.html)

- gradle插件调试方`：[https://blog.bihe0832.com/gradle_plugin_debug.html](https://blog.bihe0832.com/gradle_plugin_debug.html)

- 发布gradle插件到开源库：[https://blog.bihe0832.com/gradle_plugin_publish.html](https://blog.bihe0832.com/gradle_plugin_publish.html)

- 发布开源代码到jcenter：[https://blog.bihe0832.com/jcenter.html](https://blog.bihe0832.com/jcenter.html)


