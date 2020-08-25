---
layout: post
title: 安卓组件化之持续集成与自动构建
category: 终端开发
tags: tags
keywords: 安卓 组件化 持续集成 自动构建
description: 这篇文章总结组件化开发框架怎么通过自动构建，完成一套代码同时支撑超过5款以上的APP的构建发布等。
---

这篇文章总结组件化开发框架怎么通过自动构建，完成一套代码同时支撑超过5款以上的APP的构建发布等。

## 写在前面

在平时日常的版本发布中，由于很多版本相关的字段是通过手动维护的，我们经常会遇到下面的问题：

- 版本编完了，发现有配置忘了改，包括版本号、功能开关

- 内测版本和对外发布版本有一些特殊的配置要手动改，导致一次只能编出来一个包

如果项目只有一个应用上面的问题还不算麻烦，当基于组件化重构以后，我们目前一套代码维护超过5款应用，此时上面的问题就已经非常影响了。为了解决这些问题，我们梳理了所有的相关的配置项 然后通过自动构建时动态修改来完成。

## 我们的构建流程

关于自动构建，也阔以看一篇以前写的 [SDK开发经验之自动构建](https://blog.bihe0832.com/sdk_experience_auto_build.html) ，两者算是一脉相承不断完善吧。

这里仅仅列出我们的调试包的构件流程，正式包的流程基本一致，只是多了各种文件和资源的备份。在启动构建时，提供即将构建应用的几个基本信息即可。例如：

```
/bin/bash ./build_apk.sh APP PubA com.bihe0832.puba com.bihe0832.application.BaseApplication
```
### 预处理

- 更新代码到最新

	```
	branchName=$(git symbolic-ref --short -q HEAD)
	echo "branchName:"${branchName}
	if [ x"$branchName" = x ]; then
	  branchName=${SVN_BRANCH}
	fi
	echo "branchName:"${branchName}
	git checkout --force ${branchName} && git pull
	git status
	
	git tag -l | xargs git tag -d
	git fetch
	```

- 构建环境设置
	
	```
	echo "ANDROID_HOME:"$ANDROID_HOME
	echo "JAVA_HOME:"$JAVA_HOME
	echo "ANDROID_NDK_HOME:"$ANDROID_NDK_HOME
	```

-  根据参数，确定构建的应用，此时会根据外部传递的变量，确定最终构建哪个应用

	```
	echo "********APK build define consts *******"
	appPrefix=${1}
	echo "appPrefix:${appPrefix}"
	if [ "$appPrefix"x = x ]; then
	  appPrefix="APP"
	fi
	echo "appPrefix:${appPrefix}"
	
	appModule=${2}
	echo "appModule:${appModule}"
	if [ "$appModule"x = x ]; then
	  appModule="PubA"
	fi
	echo "appModule:${appModule}"
	
	appPackageName=${3}
	echo "appPackageName:${appPackageName}"
	if [ "appPackageName"x = x ]; then
	  appPackageName="com.bihe0832.puba"
	fi
	
	appApplicationName=${4}
	echo "appApplicationName:${appApplicationName}"
	if [ "appApplicationName"x = x ]; then
	  appApplicationName="com.bihe0832.application.BaseApplication"
	fi
	```

- 获取版本信息
	
	```
	echo "MajorVersion before:"$MajorVersion
	echo "MinorVersion before:"$MinorVersion
	echo "FixVersion before:"$FixVersion
	
	timeinfo=$(date +'%m%d')
	version_code=$(git rev-list HEAD --count)
	version_code=$((version_code + 3001))
	version="${MajorVersion}.${MinorVersion}.${FixVersion}"
	versionWithCode=${version}_${version_code}
	tag=Tag_${appPrefix}_${versionWithCode}
	commitId=$(git rev-parse HEAD)
	
	echo "version:"$version
	echo "timeinfo:"$timeinfo
	echo "version_code:"$version_code
	echo "versionWithCode:"$versionWithCode
	echo "commitId:"$commitId
	echo "tag:"$tag
	```

-  修改版本信息
	
	```
	src="versionCode *= *[0-9]*"
	dst="versionCode = ${version_code}"
	cat $localPath/config.gradle | sed "s/$src/$dst/g" >$localPath/bin/temp/config.gradle
	mv -f $localPath/bin/temp/config.gradle $localPath/config.gradle
	
	src="versionName *= *\\\"[0-9]*\.[0-9]*\.[0-9]*\\\""
	dst="versionName = \"${version}\""
	cat $localPath/config.gradle | sed "s/$src/$dst/g" >$localPath/bin/temp/config.gradle
	mv -f $localPath/bin/temp/config.gradle $localPath/config.gradle
	
	src="TAG *= *\\\"Tag_ZIXIE_[0-9]*\.[0-9]*\.[0-9]*_[0-9]*\\\""
	dst="TAG = \\\"$tag"\\\"
	cat $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt | sed "s/$src/$dst/g" >$localPath/bin/temp/Context.kt
	mv -f $localPath/bin/temp/Context.kt $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt
	```

### 调试包构建

- 设置为内部测试版本

	```
	src="IS_TEST_VERSION *= *false"
	dst="IS_TEST_VERSION = true"
	cat $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt | sed "s/$src/$dst/g" >$localPath/bin/temp/Context.kt
	mv -f $localPath/bin/temp/Context.kt $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt
	
	src="IS_OFFICIAL_VERSION *= *true"
	dst="IS_OFFICIAL_VERSION = false"
	cat $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt | sed "s/$src/$dst/g" >$localPath/bin/temp/Context.kt
	mv -f $localPath/bin/temp/Context.kt $localPath/Framework/src/main/java/com/bihe0832/framework/Context.kt
	```

- 打入版本信息

	```
	echo -e "${version} info：\n-----------------------------\n\nVERSION_NAME=${version}\nVERSION_CODE=${version_code}\nTAG=${tag}\nDATETIME=${timeinfo}\nCOMMIT=${commitId}\nisCompletedBuild=${isCompletedBuild}\nisOfficial=${isOfficial}\nisRelease=${isRelease}\n\n-----------------------------" >$localPath/Framework/src/main/assets/app.ini
	```

- APPTest 设置为主入口

	```
	src=" *ext.mainProject *= *\\\""
	dst="ext.mainProject = \\\"APPTest,${appModule}\\\""
	cat $localPath/dependencies.gradle | sed "/$src/s/.*/$dst/" >$localPath/bin/dependencies.gradle
	mv -f $localPath/bin/dependencies.gradle $localPath/dependencies.gradle
	
	src=" *ext.developModule *= *\\\""
	dst="ext.developModule = \\\"Framework\\\""
	cat $localPath/dependencies.gradle | sed "/$src/s/.*/$dst/" >$localPath/bin/dependencies.gradle
	mv -f $localPath/bin/dependencies.gradle $localPath/dependencies.gradle


	echo "appPackageName:${appPackageName}"
	echo "appPrefix:${appPrefix}"
	if [ -n "$appPackageName" ]; then
	  echo "change appPackageName"
	  src="project.ext.applicationID *= *\\\""
	  dst="project.ext.applicationID = \\\"$appPackageName"\\\"
	  cat $localPath/APPTest/build.gradle | sed "/$src/s/.*/$dst/" >$localPath/bin/temp/build.gradle
	  mv -f $localPath/bin/temp/build.gradle $localPath/APPTest/build.gradle
	fi
	
	if [ -n "$appPrefix" ]; then
	  echo "change appPrefix"
	  src="project.ext.applicationPrefix *= *\\\""
	  dst="project.ext.applicationPrefix = \\\"$appPrefix"\\\"
	  cat $localPath/APPTest/build.gradle | sed "/$src/s/.*/$dst/" >$localPath/bin/temp/build.gradle
	  mv -f $localPath/bin/temp/build.gradle $localPath/APPTest/build.gradle
	fi


	dst="android:name=\\\"$appApplicationName\\\""
	cat $localPath/APPTest/src/main/AndroidManifest.xml | sed "/<application/,/android:name/s/android:name.*/$dst/" >$localPath/bin/temp/AndroidManifest.xml
	mv -f $localPath/bin/temp/AndroidManifest.xml $localPath/APPTest/src/main/AndroidManifest.xml
	```
	
- 将PubA 添加到APPTest的依赖

	```
	src=" *ext.pubModuleIsApplication *="
	dst="ext.pubModuleIsApplication = false"
	cat $localPath/dependencies.gradle | sed "/$src/s/.*/$dst/" >$localPath/bin/dependencies.gradle
	mv -f $localPath/bin/dependencies.gradle $localPath/dependencies.gradle


	dst="\\\"apidependenciesList\\\" : [ \\\"${appModule}\\\","
	cat $localPath/dependencies.gradle | sed "/ *\\\"APPTest\\\" *: */,/\\\"apidependenciesList\\\"/s/\\\"apidependenciesList\\\".*/$dst/" >$localPath/bin/temp/dependencies.gradle
	mv -f $localPath/bin/temp/dependencies.gradle $localPath/dependencies.gradle
	```
- 返回上层目录启动构建

	```
	chmod +x $localPath/gradlew
	cd $localPath && ./gradlew clean
	cd $localPath && ./gradlew :APPTest:assembleRelease -x lint -x verifyReleaseResources -x lintVitalRelease
	```

- 添加资源混淆

	```
	mkdir $localPath/bin/temp/beta
	rm -fr $localPath/bin/temp/beta/*
	java -jar $localPath/AndResGuard-cli-1.2.0.jar $localPath/APPTest/build/outputs/apk/release/${appPrefix}_V${versionWithCode}_release.apk -config $localPath/proguard-rules-resource.xml -out $localPath/bin/temp/beta
	```
- 签名完整包

	```
	$ANDROID_HOME/build-tools/27.0.3/zipalign -p -v 4 $localPath/bin/temp/beta/${appPrefix}_V${versionWithCode}_release_unsigned.apk $localPath/bin/temp/beta/${appPrefix}_V${versionWithCode}_${timeinfo}_beta_unsigned_zipalign.apk
	$ANDROID_HOME/build-tools/27.0.3/apksigner sign --ks $localPath/zixie.keystore --out $localPath/bin/${appPrefix}_V${versionWithCode}_${timeinfo}_beta.apk --ks-pass pass:zixie $localPath/bin/temp/beta/${appPrefix}_V${versionWithCode}_${timeinfo}_beta_unsigned_zipalign.apk
	```

## 总结

通过自动构建，我们动态修改关键配置，我们可以做到日常开发随意修改配置，不会最终同步到现网正式版本，大大降低了开发维护的成本。

