---
layout: post
title: Java参数引用传递引发的惨案（又一次Java的String的“非对象”特性的踩坑经历）
category: 终端开发
tags: android bug
keywords: Java参数引用传递引发的惨案（又一次Java的String的“非对象”特性的踩坑经历）
description: Java参数引用传递引发的惨案（又一次Java的String的“非对象”特性的踩坑经历）
---

前几天帮别人写一个SDK的Demo代码，遇到个问题。里面有一个接口，参数为String，要引用传递。然后发现代码执行结束以后，这个String对象的值并没修改。

查了好久才发现又进了一个之前踩过的坑。果然基础知识要定期巩固，就专门对Java的参数传递和String简单汇总整理下。先在上面说了结论，然后再在后面举证。

### 总结：

#### 传值传递：

**参数传入方法时，无论该参数在方法内怎样被改变，外部的变量原型总是不变，叫做“值传递”。即方法操作的是参数变量（也就是原型变量的一个值的拷贝）改变的也只是原型变量的一个拷贝而已，而非变量本身。所以变量原型并不会随之改变。**

#### 传址传递：

**参数传入方法时，方法改变参数变量的同时变量原型也会随之改变，这种特性就叫做“引用传递”，也叫做传址。即方法操作参数变量时是拷贝了变量的引用，而后通过引用找到变量（在这里是对象）的真正地址，并对其进行操作。**


#### Java的参数传递：

- **Java对于基本类型的参数以值传递的方式，对于非基本类型（对象类型）的参数以引用传递的方式。**
- **String虽然是对象类型，但是String是不可变的对象，在每次对String 类型进行改变的时候，都会生成一个新的 String 对象。因此导致当String作为参数传递的时候，感官上是传值传递。**具体的说：当String作为参数传递时，确实是以地址传递过去的，但是在对String类型的变量的值进行改变时，由于String类的值是常量，在创建后不能更改，所以对String参数进行操作，相当于new String()，已经改变了String对象的地址了，所以实参不会改变。

- **如果非要用类似String类型的变量参数引用传递，可以使用StringBuffer或者StringBuilder**

#### String的“非对象”特性：

**String是不可变的对象, 因此在每次对String 类型进行改变的时候，都会生成一个新的 String 对象，然后将指针指向新的 String 对象**

#### 推荐好文：

之前在ImportNew的微信公共号上看到一篇关于[Java String、StringBuilder和StringBuffer（点击查看）](http://mp.weixin.qq.com/s?__biz=MjM5NzMyMjAwMA==&amp;mid=205005129&amp;idx=1&amp;sn=bd657e94b5b3545fc7ad3f2ea5e03f22&amp;scene=1#rd)的文章，感觉还不错，推荐一下，也是备忘。

### 举证：

#### Java 基本类型传递：

**测试代码1:**

	public class Test{

    	public static void testFunction(int para){
        	para = para + 5;
        	System.out.println("Func para is:"+ para);
    	}
    
    	public static void main(String[] args) {
    		int a = 5;
    		System.out.println("Main para is:"+ a);
    		testFunction(a);
    		System.out.println("Main para after func is:"+ a);
    	}
	}

**运行结果1：**

	➜  temp  javac Test.java && java Test
		Main para is:5
		Func para is:10
		Main para after func is:5
	➜  temp

**测试代码2:**

	public class Test {

		public static void testFunction(Integer para) {
			para = para + 5;
			System.out.println("Func para is:" + para);
		}

		public static void main(String[] args) {
			Integer a = 5;
			System.out.println("Main para is:" + a);
			testFunction(a);
			System.out.println("Main para after func is:" + a);
		}
	}
	
**运行结果2：**	
	
	➜  temp  javac Test.java && java Test
		Main para is:5
		Func para is:10
		Main para after func is:5
	➜  temp
	
**概要分析：**

- 基本类型作为参数时，只是值传递，因此函数执行结果不会影响参数的原值。
- Integer 作为int的一个封装类在作为参数的时候存在和int一样的特性。以此类推，在Java中Float、Double这些对基本类型进行封装的类同样也是值传递。

#### Java 对象类型传递：

**测试代码:**

	public class TestObj {

		public String mKey = "";

		public TestObj(String para) {
			this.mKey = para;
		}

		public String toString() {
			return mKey;
		}
	}
	
	public class Test {

		public static void testFunction(TestObj para) {
			para.mKey = para.mKey + " world!";
			System.out.println("Func para is:" + para.toString());
		}

		public static void main(String[] args) {
			TestObj a = new TestObj("hello");
			System.out.println("Main para is:" + a.toString());
			testFunction(a);
			System.out.println("Main para after func is:" + a.toString());
		}
	}

**运行结果：**

	➜  temp  javac TestObj.java Test.java && java Test
		Main para is:hello
		Func para is:hello world!
		Main para after func is:hello world!
	➜  temp

**概要分析：**

- 对象类型最为参数的时候是引用传递，因此在函数中对TestObj的mKeyde修改会被永久的修改，一直保存下来。

#### Java String类型传递：

**测试代码:**

	public class Test{

    	public static void testFunction(String para){
        	para = para + " world!";
        	System.out.println("Func para is:"+ para);
    	}
    
    	public static void main(String[] args) {
    		String a = "hello";
    		System.out.println("Main para is:"+ a);
    		testFunction(a);
    		System.out.println("Main para after func is:"+ a);
    	}
	}

**运行结果：**

	➜  temp  javac Test.java && java Test
		Main para is:hello
		Func para is:hello world!
		Main para after func is:hello
	➜  temp

**概要分析：**

- String作为函数参数的时候，最终的表现类似值传递。这是因为String是一个长度不可变的常量。当在函数中对String的值进行修改的时候，其实是重新new了一个对象。而这个对象的地址已经不是main函数中para所指向的位置。函数结束以后，这个String自动销毁，para的值保持不变。

#### Java StringBuilder类型传递：

**测试代码:**

	public class Test {

		public static void testFunction(StringBuilder para) {
			para = para.append(" world!");
			System.out.println("Func para is:" + para.toString());
		}

		public static void main(String[] args) {
			StringBuilder a = new StringBuilder("hello");
			System.out.println("Main para is:" + a.toString());
			testFunction(a);
			System.out.println("Main para after func is:" + a.toString());
		}
}

**运行结果：**

	➜  temp  javac Test.java && java Test
		Main para is:hello
		Func para is:hello world!
		Main para after func is:hello world!
	➜  temp

**概要分析：**

- StringBuilder作为函数参数的时候，因为是一个对象，所以是引用传递。StringBuffer、StringBuilder 长度都是可变的，因此在做append操作的时候并不是重新new 一个对象，而是直接在原对象继续操作。所以这种修改也被永久的保存了下来。