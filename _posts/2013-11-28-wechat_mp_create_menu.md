---
layout: post
title: 微信公共帐号自定义菜单创建
category: 微信公共平台
tags: 公共平台
keywords: 微信 公共帐号 自定义菜单 公共平台
description: 微信5.0新版本成为行业内外讨论的焦点。除了对移动支付、街景电商等话题的热议外，公众帐号的调整也受到了广泛关注。公众帐号被分为订阅号和服务号两类放在二级页面的两个文件夹中，让用户自已选择阅读的信息。本人是技术宅，不探讨运营策略方面的问题，只从技术的角度给那些新升级到服务号又不知如何添加自定义菜单的攻城狮们献上一点绵薄之力，让大家尽快尝尝鲜。看看自定义菜单好在哪里。
---

# 前言：

微信5.0新版本成为行业内外讨论的焦点。除了对移动支付、街景电商等话题的热议外，公众帐号的调整也受到了广泛关注。公众帐号被分为订阅号和服务号两类放在二级页面的两个文件夹中，让用户自已选择阅读的信息。

本人是技术宅，不探讨运营策略方面的问题，只从技术的角度给那些新升级到服务号又不知如何添加自定义菜单的攻城狮们献上一点绵薄之力，让大家尽快尝尝鲜。看看自定义菜单好在哪里。

<!--more-->

**【注】虽然这个时代大家都是抄，但是看在确实方便了大家的份上，转载前请尽量注明作者和出处哈。**

**【作者】：子勰(blog@bihe0832.com)**

**【推荐公共帐号】：[大家来捉鬼][1]（zhuoguizhushou）这是一个业余做的木有菜单的帐号，但是极力推荐哈。**

不废话了，进入正题。

## 第〇步：准备装备。

工欲善其事必先利其器，装备必不可少。Firefox和httprequester（firefox上的一个插件）就是绝配。具体工具的使用说明和简介自己可以去查。在此处不再赘述。附上httprequester的在firefox下的插件安装地址。<https://addons.mozilla.org/en-us/firefox/addon/httprequester/>

## 第一步：确定你是否有自定义菜单的权限。

说简单点就是有APPID和APPSECRET。这个办法很简单啦。去你公共平台后台一看便知。如下图：如果你的配置有这么多，就证明你应该是可以创建自定义菜单咯。

![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image001.jpg)

## 第二步：获取一个access_token。

根据微信公共平台的文档，开发者获取使用凭证（[点击查看如何获取凭证][2]）后，可以使用该凭证对公众账号的自定义菜单进行创建、查询和删除等操作。详细说明可以点击链接查看：[点击查看如何获取凭证][2]

1.  在浏览器中打开连接：<https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET>

*   替换APPID&APPSECRET获取access_token，把连接最后面的APPID和APPSECRET用你自己的替换，然后刷新就可以得到一个属于自己的access_token。成功返回如下：
    
        {"access_token":"pxxxXXXXXXXXXXXXXXXXXUg","expires_in":7200}
        

## 第三步：创建菜单。

1.  启动firefox
2.  打开httprequester 选择工具—》httprequester
    
![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image002.png)

*   在URL中填上下面的链接（access_token 用你自己的替代）： <https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN>
*   配置其余参数。配置参照下图：
    
![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image003.jpg)

*   填入自定义菜单信息，如下图。
    
![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image004.png)

*   点击submit提交。
    
![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image005.jpg)

*   查看结果。提交结束以后弹出窗口，等待片刻在右侧窗口就会出现对应的提示消息。
    
![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image006.png)

*   登入APP查看。为了方便开发者调试，公共帐号的自定义菜单在设置后24小时才会生效，开发者可以重新关注公共帐号就可以及时看到效果。取消关注并再次关注以后就可以看到最终的效果。

## 第四步：菜单就是这么简单。

查询和删除菜单的方法相对简单，不再赘述。如果有人感兴趣补上，那就更是感谢。最后附上开头的公共帐号的二维码。

![demo](http://blog.bihe0832.com/public/images/wechat_mp_create_menu_image007.png)

**大家来捉鬼，一路走来，因为由您！**

 [1]: http://game.bihe0832.com
 [2]: http://mp.weixin.qq.com/wiki/index.php?title=%E9%80%9A%E7%94%A8%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3