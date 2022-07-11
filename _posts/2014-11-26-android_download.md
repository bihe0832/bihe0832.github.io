---
layout: post
title: Android简单实现的多线程下载模块
category: 终端开发
tags: Android
keywords: Android download 多线程 下载
description: desc
---

## 此文档及组件均不再更新维护，最新组件请点击链接查看：[https://android.bihe0832.com/doc/use/libs/noui/lib-download.html](https://android.bihe0832.com/doc/use/libs/noui/lib-download.html)

在项目开发中遇到一个从服务器下载图片的需求。使用一些开源的库也能解决问题，但是对于这个简单的需求又有点重，因为项目对包大小的要求更高。
在四处浏览和自己努力下，最终写了一个可以满足以下需求的简单的工具类：

- 多线程下载
- 可以获取到下载进度
- 所有下载结束以后有通知
- 可以校验下载图片是否正确

github 地址：[https://github.com/bihe0832/MyDemo/tree/master/Download](https://github.com/bihe0832/MyDemo/tree/master/Download)

具体如下：

## 1. 下载对象类

	class DownloadItem{
		// 文件的下载进度
		public float mPercent = 0;
		// 文件URL，需要是下载路径
		public URL mFileUrl;
		// 要下载文件的hash值，用于校验下载是否完整
		public String mHashValue;
		// 要下载的文件大小
		public long mFileLength;
		// 文件下载后的保存路径，需要是完整路径，包括文件名
		public String mLocalFilePath;
		public DownloadItem(URL url, String filePath,String hashValue) {
			this.mFileUrl = url;
			this.mLocalFilePath = filePath;
			this.mHashValue = hashValue;
		}
		public DownloadItem() {
		}
	}

## 2. 具体的实现

	public class DownloadThread extends Thread {
		// 开始下载
		public final static int THREAD_BEGIN = 1;
		// 下载结束，图片正确
		public final static int THREAD_FINISHED_SUCC = 2;
		// 下载结束，图片错误
		public final static int THREAD_FINISHED_FAIL = 3;
		// 线程锁
		private static Lock sLock = new ReentrantLock();
		// 是否已经下载完成
		private static boolean sIsFinished = false;
		// 任务集合
		private static Queue<DownloadItem> needDownloadLists = new LinkedList<DownloadItem>();
		// 正在进行中的下载列表
		private static Queue<DownloadItem> downloadList = new LinkedList<DownloadItem>();
		public static final String LOG_TAG = "Download";
		//当前的下载线程已启动
		private boolean mIsStarted = false;
		//当前的下载线程下载的图片
		private DownloadItem mDownloadItem = null;
		
		public DownloadThread(DownloadItem tempDownloadItem) {
			mDownloadItem = tempDownloadItem;
		}
	
		public static void addToDownloadQueue(URL url, String filePath,String hashValue) {
			if(null == url || T.ckIsEmpty(filePath) || T.ckIsEmpty(hashValue)){
				Logger.w("url or filePath or hashValue is null");
				return ;
			}
			sLock.lock();
			try {
				DownloadItem tempDownloadThread = new DownloadItem(url,filePath,hashValue);
			    if(!needDownloadLists.contains(tempDownloadThread)){
			        needDownloadLists.add(tempDownloadThread);
			    }
			    DownloadThread.setFinished(false);
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            sLock.unlock();
	        }
			Message message = new Message();
			message.what = DownloadThread.THREAD_BEGIN;
			myHandler.sendMessage(message);
		}
	
		// 开始下载任务
		@Override
		public void run() {
			this.mIsStarted = true;
			BufferedInputStream bis = null;
			BufferedOutputStream bos = null;
			try {
				HttpURLConnection conn = (HttpURLConnection) this.mDownloadItem.mFileUrl
						.openConnection(); // 建立一个远程连接句柄，此时尚未真正连接
				conn.setConnectTimeout(5 * 1000); // 设置连接超时时间为5秒
				conn.setRequestMethod("GET"); // 设置请求方式为GET
				conn.setRequestProperty(
						"Accept",
						"image/gif, image/jpeg, image/pjpeg, image/pjpeg, application/x-shockwave-flash, application/xaml+xml, application/vnd.ms-xpsdocument, application/x-ms-xbap, application/x-ms-application, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*");
				conn.setRequestProperty("Charset", "UTF-8"); // 设置客户端编码
				conn.setRequestProperty(
						"User-Agent",
						"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)"); // 设置用户代理
				conn.setRequestProperty("Connection", "Keep-Alive"); // 设置Connection的方式
				conn.connect(); // 和远程资源建立真正的连接，但尚无返回的数据流
	
				this.mDownloadItem.mFileLength = conn.getContentLength();
				byte[] buffer = new byte[4096]; // 下载的缓冲池为4KB
				bis = new BufferedInputStream(conn.getInputStream()); 
				File tempPic = new File(this.mDownloadItem.mLocalFilePath+"_temp");
				// 后续可以修改这部分内容，即可实现断点续传
				if (tempPic.exists()) {
					delFileByPath(this.mDownloadItem.mLocalFilePath+"_temp");
				}
				bos = new BufferedOutputStream(new FileOutputStream(tempPic));
				long downloadLength = 0;// 当前已下载的文件大小
				int bufferLength = 0;
				MessageDigest md5 = MessageDigest.getInstance("MD5");
				String picMd5 = "";
				while ((bufferLength = bis.read(buffer)) != -1) {
					bos.write(buffer, 0, bufferLength);
					md5.update(buffer, 0, bufferLength);
					bos.flush();
					// 计算当前下载进度
					downloadLength += bufferLength;
					this.mDownloadItem.mPercent = downloadLength / this.mDownloadItem.mFileLength;
				}
				byte[] bs = md5.digest();
				picMd5 = HexUtil.bytes2HexStr(bs).toLowerCase(Locale.CHINA);
				//下载完成，对比md5
				Message msg = new Message();
				msg.obj = this.mDownloadItem;
				if(picMd5.equalsIgnoreCase(this.mDownloadItem.mHashValue)){
					File localFile = new File(this.mDownloadItem.mLocalFilePath);
					if (localFile.exists()) {
						delFileByPath(this.mDownloadItem.mLocalFilePath);
					}
					boolean flag = tempPic.renameTo(localFile);
					if(flag){
						msg.what = THREAD_FINISHED_SUCC;
						Logger.d("rename pic succ："+this.mDownloadItem.mLocalFilePath);
					}else{
						msg.what = THREAD_FINISHED_FAIL;
						Logger.d("rename pic failed："+this.mDownloadItem.mLocalFilePath);
					}
				}else{
					msg.what = THREAD_FINISHED_FAIL;
					Logger.w("picMd5:"+picMd5+";hashValue:"+this.mDownloadItem.mHashValue);
					delFileByPath(this.mDownloadItem.mLocalFilePath);
				}
				// 发送下载完毕的消息
				DownloadThread.myHandler.sendMessage(msg);
			} catch (Exception e) {
				e.printStackTrace();
				// 这里处理下载失败（建议发送下载失败的消息）
			} finally {
				try {
					if (bis != null) {
						bis.close();
					}
					if (bos != null) {
						bos.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		private static boolean isFinished() {
			return sIsFinished;
		}
		
		private static void setFinished(boolean isFinished) {
			sIsFinished = isFinished;
		}
	
		private boolean isStarted() {
			return mIsStarted;
		}
	
		public static void delFileByPath(String filePath){
			if(T.ckIsEmpty(filePath)){
				return ;
			}
			File tempPicFile = new File(filePath);
			if(null != tempPicFile){
				tempPicFile.delete();
			}
		}
	
		private static Handler myHandler = new Handler() {
	
			@Override
			public void handleMessage(Message msg) {
				Message message = new Message();
				DownloadItem tempDownloadItem = new DownloadItem();
				switch (msg.what) {
				case DownloadThread.THREAD_BEGIN:
					sLock.lock();
					if (!needDownloadLists.isEmpty()) {
						do{
							tempDownloadItem = needDownloadLists.poll();
							if(!downloadList.contains(tempDownloadItem)){
								DownloadThread tempDownloadThread = new DownloadThread(tempDownloadItem);
								if (!tempDownloadThread.isStarted()) {
									tempDownloadThread.start();
								}
								downloadList.add(tempDownloadItem);
							}
						}while(!downloadList.contains(tempDownloadItem));
						
					} else {
						if(!downloadList.isEmpty()){
							//没有新的要下载图片了
							Logger.d("no new task");
						}else{
							// 下载已经完成了
							if(DownloadThread.isFinished()){
								//下载结束不重复通知
								Logger.d("all task finished have been notified");
							}else{
								DownloadThread.setFinished(true);
								Logger.d("all task finished");
							}
						}
					}
					sLock.unlock();
					break;
				case DownloadThread.THREAD_FINISHED_SUCC:
					sLock.lock();
					tempDownloadItem = (DownloadItem) msg.obj;
					if(downloadList.contains(tempDownloadItem)){
						//移除
						downloadList.remove(tempDownloadItem);
					}
					message.what = DownloadThread.THREAD_BEGIN;
					sendMessage(message);
					sLock.unlock();
					break;
				case DownloadThread.THREAD_FINISHED_FAIL:
					sLock.lock();
					tempDownloadItem = (DownloadItem) msg.obj;
					if(downloadList.contains(tempDownloadItem)){
						//移除
						downloadList.remove(tempDownloadItem);
					}
					message.what = DownloadThread.THREAD_BEGIN;
					sendMessage(message);
					sLock.unlock();
					break;
				}
			}
	
		};
		// 具体的功能测试和调用方法
		public static void main(String[] args)
	    {
			//TODO 找个MSDK的日志
			addToDownloadQueue(null, null, null);
			addToDownloadQueue(null, null, null);
			addToDownloadQueue(null, null, null);
			addToDownloadQueue(null, null, null);
	        
	    }
	}
