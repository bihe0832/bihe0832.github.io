---
layout: post
title: 再看Android官方文档之Fragment&数据保存
category: 终端开发
tags: android
keywords: keywords
description: description
---

额，发现最近看的都有点快，总结的内容都有点少。不过只要不是为了总结而总结就好了，不想太多了。截至今天，看完了training的第一章。其实还是比较快的。

## Fragment

#### 创建Fragment

- 当创建Fragment的时，必须重写onCreateView()回调方法来定义布局。

- 当fragment从activity添加或者移除、当activity生命周期发生变化时，fragment通过生命周期回调函数管理其状态。

#### 将Fragment添加到Activity

- ActionBarActivity是FragmentActivity的一个子类。

- FragmentTransaction完成操作，准备开始执行改变时，必须调用commit()方法。

- 为了让用户向后导航fragment事务，我们必须在FragmentTransaction提交前调用addToBackStack()方法

#### Fragments间的交互

- 所有fragment之间的交互需要通过他们关联的activity，两个fragment之间不应该直接交互。

## 数据保存

#### Preference

- 如果创建了一个MODE_WORLD_READABLE或者MODE_WORLD_WRITEABLE 模式的shared preference文件，则其他任何app均可通过文件名访问该文件。
- 写Shared Preference时，commit是同步方法，apply是异步方法，如果不需要返回值的话，可以完全用apply替代commit。

#### 文件

- app是默认被安装到internal storage的，但是可以通过在程序的manifest文件中声明android:installLocation 属性来指定程序安装到external storage

- 目前，所有的apps都可以在不指定某个专门的权限下做读external storage的动作。但这在以后的安卓版本中会有所改变。为了确保app能持续地正常工作，我们现在在编写程序时就需要声明读权限。

- getFilesDir 返回一个Fileapp的internal目录。

- getCacheDir 返回app的internal缓存目录。确保这个目录下的文件能够在一旦不再需要的时候马上被删除，并对其大小进行合理限制，例如1MB。

- 在访问external storage之前应对其可用性进行检查。可以通过getExternalStorageState来查询external storage的状态。

- Public files 当用户卸载我们的app时，会被保留。例如，那些被我们的app拍摄的图片或者下载的文件。

- Private files 当用户卸载我们的app时，系统会删除其下的private目录。例如，那些被我们的app下载的缓存文件。

- getExternalFilesDir 方法创建的目录会在app被卸载时被系统删除。如果文件想在app被删除时仍然保留，使用getExternalStoragePublicDirectory.

- 并没有强制要求在写文件之前去检查剩余容量。我们可以尝试先做写的动作，然后通过捕获 IOException 。

#### 数据库

- 确保在background thread（AsyncTask or IntentService）里面去执行 getWritableDatabase 或者 getReadableDatabase 。

