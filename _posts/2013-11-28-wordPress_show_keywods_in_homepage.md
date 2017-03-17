---
layout: post
title: 怎么让WordPress首页显示文章摘要(主题Twenty Twelve)
category: web前端
tags: wordpress
keywords:  wordpress Twenty Twelve
description: 在WordPress系统中，默认的首页和目录页使用的书全文输出，这对于文章内容较长的博客来说很不方面，下面我介绍一个方法，可以简单的实现在WordPress首页和目录页显示摘要而非全文。找到wp-content/themes下你使用的模板目录，查找目录中的文件，如果有home.php则修改home.php，没有的话就修改index.php。WordPress的功能很强大，可以根据自己的需求来修改自己的网站。 
---

在WordPress系统中，默认的首页和目录页使用的书全文输出，这对于文章内容较长的博客来说很不方面，下面我介绍一个方法，可以简单的实现在WordPress首页和目录页显示摘要而非全文。找到`wp-content/themes`下你使用的模板目录，查找目录中的文件，如果有`home.php`则修改`home.php`，没有的话就修改`index.php`。WordPress的功能很强大，可以根据自己的需求来修改自己的网站。 

在Wordpress 3.5.1的中提供了默认的主题Twenty Twelve，很不错，但是首页是全文信息，这不仅使得页面太长，也使得加载速度变的很慢，小哈就通过对Twenty Twelve的修改简单介绍下修改的方法。 选择模版目录下的`index.php文件`，在里面可以看到语句

	<?php while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'content', get_post_format() ); ?>
	<?php endwhile; ?>

可以看出，`index.php`是嵌套一个 `content.php` 的文件用于专门显示文章的内容，这就是为什么在首页老是显示文章全文。那么，打开`content.php`文件找到 

	<?php the_content( __( 'Continue reading &lt;span&gt;&rarr;&lt;/span&gt;','twentyeleven')); ?>

将它修改为

	<pre lang="php" line="1" colla="+"><?php 
	  if(!is_single()) {
	      the_excerpt();
	  } else {
	      the_content(__('(more…)'));
	  } 
	?>

保存，现在去看看你的首页，是不是只显示摘要了？