---
layout: post
title: Android 检查应用是否有root权限
category: 终端开发
tags: android
keywords: Android root
description: 最近写项目的自动化测试，为了尽可能的模拟真实的使用场景，会有一些夸应用的用户点击、输入等事件的模拟。对于ROOT的机器，这个自然很容易做到，但是对于非root的机器，只能提供降级服务。总不能因为这个原因根据是否root还要用两套测试程序或者工具。要根据不同的机器上应用能获取的权限类型不同和差异化的提供测试脚本，就需要在代码中检查当前应用是否有root权限。个人采用的是直接在代码中执行一个需要root权限的adb命令，根据返回值来检测。
---

最近写项目的自动化测试，为了尽可能的模拟真实的使用场景，会有一些夸应用的用户点击、输入等事件的模拟。对于ROOT的机器，这个自然很容易做到，但是对于非root的机器，只能提供降级服务。总不能因为这个原因根据是否root还要用两套测试程序或者工具。

要根据不同的机器上应用能获取的权限类型不同和差异化的提供测试脚本，就需要在代码中检查当前应用是否有root权限。个人采用的是直接在代码中执行一个需要root权限的adb命令，根据返回值来检测。

事例代码：

	……
	
	File file = new File(filePath);
	if (file.exists()) {
		file.delete();
		Log.d(MSDKTest.TAG, "File :" + filePath + "  deleted!");
	}

	String cmdStr = "uiautomator dump " + filePath;
	mIsRoot = CommonUntil.exeCmdWithRoot(cmdStr);
	
	……
	
CommonUntil中关于exeCmdWithRoot的实现如下：

	public static boolean exeCmdWithRoot(String cmdStr){
		if(null == cmdStr || "".equals(cmdStr)){
			Log.d(MSDKTest.TAG,"bad cmdStr" );
			return false;
		}
		Process process = null;
		String[] cmds = new String[] { cmdStr };
		try {
			process = Runtime.getRuntime().exec("su");

			DataOutputStream os = new DataOutputStream(process.getOutputStream());
			for (String cmd : cmds) {
				os.write(new String(cmd + "\n").getBytes());
			}
			os.flush();
			os.close();
		} catch (Exception e) {
			String message = "executeCmd: " + cmdStr + " error: " + e.toString();
			Log.d(MSDKTest.TAG,"errorMessage:"+message);
		}

		if (process != null) {
			Log.d(MSDKTest.TAG,"process wait execed");
			try {
				int status = process.waitFor();
				process.getOutputStream().close();
				process.getErrorStream().close();
				process.getInputStream().close();
				Log.d(MSDKTest.TAG,"status:"+status);
				//这里是关键代码，其实只有status为1的时候是没有权限，这里个人直接把所有运行shell命令的异常都归为失败
				if(0 == status){
					return true;
				}else{
					return false;
				}
			} catch (InterruptedException e) {
				Log.d(MSDKTest.TAG,"InterruptedException");
				e.printStackTrace();
			} catch (IOException e) {
				Log.d(MSDKTest.TAG,"IOException");
				e.printStackTrace();
			}
		}
		return false;
	}
	

通过上面的代码，即可轻松获取当前机器上，被测试的应用是否可以获取到root权限。然后根据是否root，对于同一个测试用例采用不同的测试方法。