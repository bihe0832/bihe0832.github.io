---
layout: post
title: 再看Android官方文档之ActionBar和兼容性
category: 终端开发
tags: android
keywords: ActionBar 兼容性
description: Action Bar是我们可以为activity实现的最重要的设计元素之一。其提供了多种 UI 特性，可以让我们的 app 与其他 Android app 保持较高的一致性，从而为用户所熟悉。
---
这部分内容确实比较少，感觉像是凑文章数一样啊。犹豫再三，还是继续保持吧，每日有更新，自己有收获就好。
### ActionBar

Action Bar是我们可以为activity实现的最重要的设计元素之一。其提供了多种 UI 特性，可以让我们的 app 与其他 Android app 保持较高的一致性，从而为用户所熟悉。

#### 建立ActionBar

- 仅支持 Android 3.0 及以上版本：如果创建了一个自定义主题，需确保这个主题使用一个 Theme.Holo的主题作为父类。
- 支持 Android 2.1 及以上版本：如果创建一个自定义主题，需确保其使用一个 Theme.AppCompat 主题作为父类。
- 为自定义主题和样式声明一个合适的父主题，这点很重要。如果没有父样式，action bar将会失去很多默认的样式属性。
- 隐藏和显示action bar，可以通过调用hide和show来实现。但是，这将导致 activity 基于新尺寸重新计算与绘制布局。
- 在叠加模式下，action bar会叠加在布局之上。当action bar隐藏或显示时，系统不再需要调整布局而是无缝过渡。


#### 添加Action按钮

- 默认情况下，所有的操作都显示在 action overflow 中，不过可以通过android:showAsAction来设置
- 使用了 Support 库，在 android 命名空间下 showAsAction 属性是不可用的。Support 库会提供替代它的属性，我们必须声明自己的 XML 命名空间，并且使用该命名空间作为属性前缀。

### 兼容性

#### 多语言：

- 为支持多国语言，在res/中创建一个额外的values目录（以连字符和ISO国家代码结尾命名）。

- ISO国家代码：[http://www.loc.gov/standards/iso639-2/php/code_list.php](http://www.loc.gov/standards/iso639-2/php/code_list.php)

#### 屏幕：

- 一般layout更关注尺寸：小(small)，普通(normal)，大(large)，超大(xlarge)
- bitmap等资源文件更关注分辨率：低精度(ldpi), 中精度(mdpi), 高精度(hdpi), 超高精度(xhdpi)
- land和port与尺寸可以组合使用，例如：values-large-land等

#### 系统：

- 平台风格和主题：[https://developer.android.com/guide/topics/ui/themes.html](https://developer.android.com/guide/topics/ui/themes.html)

- Build常量：[https://developer.android.com/reference/android/os/Build.html](https://developer.android.com/reference/android/os/Build.html)
