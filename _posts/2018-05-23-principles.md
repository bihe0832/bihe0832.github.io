---
layout: post
title: 接口设计六大原则
category: 经验总结
tags: tags
keywords: 接口 设计 原则
description: 弱小和无知不是生存的障碍，傲慢才是！服~ 
---


### 一. 单一职责原则

Single Responsibility Principle, 简称SRP。

#### 定义

 - **There should never be more than one reason for a class to change**
 - **应该有且仅有一个原因引起类的变**

#### 准则

- 职责的划分？单一的定义和级别？

- 应该根据实际业务情况而定。关注变化点。

- 实际使用时，类很难做到职责单一，但是接口的职责应该尽量单一。


### 二. 里氏替换原则

Liskov Substitution Principle, 简称LSP。

#### 定义

- **Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it**
- **所有引用基类的地方必须能透明地使用其子类的对象**

#### 准则

里氏替换原则为良好的继承定义了一个规范：

1. 子类必须完全实现父类的方法

2. 子类可以有自己的个性（属性和方法）。

3. 覆盖或实现父类的方法时输入参数可以被放大。
 
4. 覆写或实现父类的方法时输出结果可以被缩小。

注：在类中调用其他类时务必要使用父类或接口，如果不能使用父类或接口，则说明类的设计已经违背了LSP原则。


### 三. 依赖倒置原则

Dependence Inversion Principle, 简称DIP

#### 定义

 - **High level modules should not depend upon low level modules.Both should depend upon abstractions.Abstractions should not depend upon details.Details should depend upon abstractions.**

 - **翻译过来，包含三层含义：**
  
  1. 高层模块不应该依赖低层模块，两者都应该依赖其抽象

  2. 抽象不应该依赖细节。

  3. 细节应该依赖抽象。

    
**精简的定义： 面向接口编程。**

 
#### 案例

Test-Driven Development 测试驱动开发是依赖倒置原则的最好体现。

测试驱动开发要求先写测试类，测试通过才写实现类，这就要求你要先想接口定义。

 
依赖的三种写法：

1. 构造函数传递依赖对象。

2. Setter方法传递依赖对象。

3. 接口声明依赖对象。

 

#### 最佳实践：

1. 每个类尽量都有接口或抽象类，或者抽象类和接口两者都具备。
2. 变量的表面类型尽量是接口或抽象类。
3. 任何类都不应该从具体类派生。
4. 尽量不要覆写基类的方法。
5. 结合里氏替换原则使用。

### 四. 接口隔离原则：

接口这里指用interface关键字定义的接口。

#### 定义：

- **Clients should not be forced to depend upon interfaces that they don't use.(客户端不应该依赖它不需要的接口)**
- **The dependency of one class to anther one should depend on the smallest possible interface.(类间的依赖关系应该建立在最小的接口上)**

概括：建立单一接口，不要建立臃肿庞大的接口。

通俗来讲：接口尽量细化，同时接口中的方法尽量少。

#### 准则

如何细化？细化到什么程序？

没有统一的标准，应根据业务合理细分，适合业务才是重点。

保证接口的纯结性：

1. 接口要尽量小。
2. 接口要高内聚。
3. 定制服务。
4. 接口的设计是有限度的。

#### 最佳实践：

1. 一个接口只服务于一个子模块或业务逻辑。
2. 通过业务逻辑压缩接口中的public方法，接口时常去回顾，尽量让接口达到“满身筋骨肉”，而不是“肥嘟嘟”的一大堆方法。
3. 已经被污染了的接口，尽量去修改，若变更的风险较大，则采用适配器模式进行转化处理。
4. 了解环境，拒绝盲从。每个项目或产品都有特定的环境因素，不要盲从大师的设计，要根据业务逻辑进行最好的接口设计。

### 五.迪米特法则

Law of Demeter, LOD。又称最少知识原则（Least Knowledge Principle, LKP）。

#### 定义：

- 一个对象应该对其他对象保持最少的了解。

#### 准则：

**通俗来讲：一个类应该对自己需要耦合或调用的类知道得最少，你（被耦合或调用的类）的内部是如何复杂都和我没有关系，那是你的事情，我就调用你提供的public方法，其他一概不关心。**

- 低耦合要求：

  1. 只和朋友交流
  
      朋友类：出现在成员变量、方法的输入输出参数中的类。方法体内部的类不属于朋友类。

  2. 朋友间也是有距离的

      迪米特法则要求类“羞涩”一点，尽量不要对外公布太多的public方法和非静态的public变量，尽量内敛，多使用private、package-private、protected等访问权限。
  
  3. 是自己的就是自己的
      
      如果一个方法放在本类中，既不增加类间关系，也对本类不产生负面影响，就放置在本类中。

  4. 谨慎使用Serializable

 

### 六.开闭原则

#### 定义：

- **Software entities like classes, modules and functions should be open for extension but closed for modifications.**
- 一个软件实体如类、模块和函数应该对扩展开放，对修改关闭

#### 准则：

软件实体包括以下几个部分：

1. 项目和软件产品中按照一定的逻辑规则划分的模块。
2. 抽象和类。
3. 方法。

变化的三种类型：

1. 逻辑变化
2. 子模块变化
3. 可见视图变化