---
layout: post
title: 关于终端设备的设备唯一性的那些事之MAC地址
category: 终端开发
tags: android
keywords: 终端 设备 android MAC
description: desc
---

最近和别人聊起来数据上报，一起讨论到imei和MAC地址，然后发现一个问题：知道这两个东西都不唯一，但是不知道为什么…………

回来上各种小网站巴拉巴拉找了一下，终于大概了解了前世今生，这里简单汇总一下MAC地址相关的内容。会在另一篇文章汇总imei相关的内容。链接如下：

[关于终端设备的设备唯一性的那些事之IMEI](https://blog.bihe0832.com/Android_IMEI.html)

## 什么是MAC地址？

MAC（Media Access Control或者Medium Access Control）地址，意译为媒体访问控制，或称为物理地址、硬件地址，用来定义网络设备的位置。在OSI模型中，第三层网络层负责 IP地址，第二层数据链路层则负责 MAC地址。因此一个主机会有一个MAC地址，而每个网络位置会有一个专属于它的IP地址。

## MAC地址的组成？

MAC（Media Access Control，介质访问控制）地址，也叫硬件地址，长度是48比特（6字节），由16进制的数字组成，分为前24位和后24位：

- 组织唯一标志符

MAC地址前24位叫做组织唯一标志符（Organizationally Unique Identifier，即OUI），是由IEEE的注册管理机构RA给不同厂家分配的代码，区分了不同的厂家。

- 扩展标识符

MAC地址后24位称为扩展标识符，是由各厂家自行指派给生产的适配器接口。同一个厂家生产的网卡中MAC地址后24位是不同的。


## 为什么需要MAC地址？

MAC地址对应于OSI参考模型的第二层数据链路层，工作在数据链路层的交换机维护着计算机MAC地址和自身端口的数据库，交换机根据收到的数据帧中的“目的MAC地址”字段来转发数据帧。

## MAC地址与IP地址

MAC地址对应于OSI参考模型的第二层数据链路层，IP地址工作在OSI参考模型的第三层网络层。两者之间分工明确，默契合作，完成通信过程。

IP地址专注于网络层，将数据包从一个网络转发到另外一个网络；而MAC地址专注于数据链路层，将一个数据帧从一个节点传送到相同链路的另一个节点。

数据链路层协议可以使数据从一个节点传递到相同链路的另一个节点上（通过MAC地址），而网络层协议使数据可以从一个网络传递到另一个网络上。

## MAC地址与Android设备

### MAC地址保存在什么地方？

网卡的物理地址通常是由网卡生产厂家烧入网卡的EPROM，它存储的是传输数据时真正赖以标识发出数据的电脑和接收数据的主机的地址。

### MAC地址可修改么？

可以确定，可以。修改方法自行百度或者谷歌。

### 为什么MAC地址不唯一

只要可以修改就不会唯一，而且修改并不复杂。

### 关于MAC不可不知的一段代码

不废话，先上代码：

	The offending kernel code:
	
	if((tuna_MAC_addr[4] == 0) && (tuna_mac_addr[5] == 0)) {
		srandom32((uint)jiffies); //
		rand_mac = random32(); //
		tuna_mac_addr[3] = (unsigned char)rand_mac;
		tuna_mac_addr[4] = (unsigned char)(rand_mac >> 8);
		tuna_mac_addr[5] = (unsigned char)(rand_mac >> 16);
	}
	memcpy(buf, tuna_mac_addr, IFHWADDRLEN);
	
这段代码的野史解释说最初 Google 和三星不想掏钱买 MAC 地址，某个神一样的的伟大的程序员同学就写了个函数，随机生成 MAC 地址的后六位。然后这段内核的代码被别的厂家直接拿去了，就导致很多手机都有这个问题。

拥有这段代码的手机，在每次启动的时候都会随机生成一个MAC地址。这就更加加剧了MAC地址的不唯一，导致了MAC地址的唯一性不再存在，想用它作为设备唯一标示也不可能了。

## 参考资料

1. [为什么说 MAC 是一个存在严重漂移的 ID](http://bbs.umeng.com/thread-5849-1-1.html)
- [MAC地址 百度百科](http://baike.baidu.com/view/69334.htm)
- [MAC地址 维基百科](https://zh.wikipedia.org/wiki/MAC%E5%9C%B0%E5%9D%80)
- [Galaxy Nexus (VZW/LTE) wifi MAC address changes with every reboot](https://code.google.com/p/android/issues/detail?id=23330#c9)
- [【技术贴】安卓手机修改 WIFI 的物理 MAC 地址](http://group.wanggouchao.com/article/1051)
