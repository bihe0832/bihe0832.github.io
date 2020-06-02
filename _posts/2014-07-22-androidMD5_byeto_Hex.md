---
layout: post
title: Android MD5后 bye数组转化为Hex字符串的坑（记一次为女神排忧解难的经历）
category: 终端开发
tags: android md5 bug
keywords: android md5 hex byte
description: 在java中：**一个byte是8位，而16进制是4位，所以要把一个bye转化为hex的时候，其高四位和低四位分别转化为为2个16进制字符。当高四位为0时，转化完要用‘0’补齐。**
---

前些天女神在接入我们的组件时候忽然遇到一个问题，女神青睐自然要积极表现，最终问题顺利解决，今天总结下。先说下结论：**一个byte是8位，而16进制是4位，所以要把一个bye转化为hex的时候，其高四位和低四位分别转化为为2个16进制字符。当高四位为0时，转化完要用‘0’补齐。**

## 代码地址：<https://github.com/bihe0832/MyDemo/tree/master/JavaDemo/src>

## 问题描述：

        女神在生成请求的sign时用md5加密偶现生成的sign不可用。女神表示问题应该出在从sign到MD5生成md5值的过程。
    

<!--more-->

## 问题现象：

        抓了一个女神出现问题的时候的sign：4578e54fb3a1bd18e0681bc1c734514e。
             使用站长工具测试一下MD5:   3dcb16d67b01d6f6b279a61d5bb043fb
             对比一下女神md5以后的内容：3dcb16d67b1d6f6b279a61d5bb043fb
        发现问题的原因在于女神的md5结果转化为str以后少了一个0，好诡异啊。
    

## 问题代码：

    找到了问题的表现，然后让女神把代码发给我，出现问题的代码内容如下：
    public static String goddessMD5(String s) {
        try {
            MessageDigest digest = java.security.MessageDigest.getInstance("MD5");
            digest.update(s.getBytes());
            byte messageDigest[] = digest.digest();
    
            StringBuffer hexString = new StringBuffer();
            for (int i=0; i<messageDigest.length; i++){
                hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
            }
            return hexString.toString();
    
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }
    

仔细看了一遍还是没有发现问题，那就加个log看一下少0的位置为什么会少一个0

    07-22 19:09:30.020: I/MyDemo(16687): 3d
    07-22 19:09:30.020: I/MyDemo(16687): cb
    07-22 19:09:30.020: I/MyDemo(16687): 16
    07-22 19:09:30.020: I/MyDemo(16687): d6
    07-22 19:09:30.020: I/MyDemo(16687): 7b
    07-22 19:09:30.020: I/MyDemo(16687): 1
    07-22 19:09:30.020: I/MyDemo(16687): d6
    07-22 19:09:30.020: I/MyDemo(16687): f6
    07-22 19:09:30.020: I/MyDemo(16687): b2
    07-22 19:09:30.020: I/MyDemo(16687): 79
    07-22 19:09:30.020: I/MyDemo(16687): a6
    07-22 19:09:30.020: I/MyDemo(16687): 1d
    07-22 19:09:30.020: I/MyDemo(16687): 5b
    07-22 19:09:30.020: I/MyDemo(16687): b0
    07-22 19:09:30.020: I/MyDemo(16687): 43
    07-22 19:09:30.020: I/MyDemo(16687): fb
    07-22 19:09:30.020: I/MyDemo(16687): goddess md5 :3dcb16d67b1d6f6b279a61d5bb043fb
    

其余位置一个bye都会转化为两位的str，只有1的地方有问题，而且倒数第三个0出现在第二位是没有问题的，看来只是0在第一位有问题，更加诡异。debug下查看messageDigest里面的内容：

    [61, -53, 22, -42, 123, 1, -42, -10, -78, 121, -90, 29, 91, -80, 67, -5]
    

### 可以看到从bye转化为hex的string的时候转化为了两个字符，这是为什么呢？

*   一个byte是8位，而16进制是4位，所以要把一个bye转化为hex的时候，其高四位和低四位分别转化为为2个16进制字符。当高四位为0时，转化完自然要用‘0’补齐。
*   数字1(00000001)转化以后为‘01’，再toString就丢了一位，导致少了0。

## 修改后代码：

    按照上面定位的原因，修改代码，果然解决！代码如下：
    
    public static String myMD5(String s) {
        try {
            MessageDigest digest = java.security.MessageDigest.getInstance("MD5");
            digest.update(s.getBytes());
            byte messageDigest[] = digest.digest();
    
            StringBuffer hexString = new StringBuffer();
            String tempStr = "";
            for (int i=0; i<messageDigest.length; i++){
                if(Integer.toHexString(0xFF & messageDigest[i]).length() < 2){
                    tempStr = "0"+Integer.toHexString(0xFF & messageDigest[i]);
                }else{
                    tempStr = Integer.toHexString(0xFF & messageDigest[i]);
                }
                hexString.append(tempStr);
            }
            return hexString.toString();
    
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }
    
    运行结果：
    
        07-22 19:48:31.198: I/MyDemo(17796): originalSig:4578e54fb3a1bd18e0681bc1c734514e
        07-22 19:48:31.248: I/MyDemo(17796): my      md5 :3dcb16d67b01d6f6b279a61d5bb043fb
        07-22 19:09:30.020: I/MyDemo(16687): goddess md5 :3dcb16d67b1d6f6b279a61d5bb043fb

### 附一个SDK常用的各种进制之间转换的基础类：<https://github.com/bihe0832/MyDemo/tree/master/Common>
