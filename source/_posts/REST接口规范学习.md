---
title: REST接口规范学习
date: 2020-10-03
---

# REST 接口规范学习

[toc]

## 面向资源设计

> REST 的架构风格在 2000 年首次被引入，与 HTTP/1.1 有着良好的相性。他的核心原则在于定义一些可以被少量方法操作的资源。毫无疑问资源是个名词，方法是个动词。在 HTTP 协议中，资源名称很自然地被映射到 URLs 上，方法则被映射成了 HTTP 的 POST、GET、PUT 和 DELETE 四种方法

### REST API

REST API 被建模为可以被单独寻址的资源（API 的名词）的集合。资源可以被他们的资源名称引用，并通过一小组方法（也称为动词或操作）来进行操作

### 资源

一个面向资源的 API 通常被建模为资源层级，其中每个节点都是一个简单资源或是一个集合资源。为了方便起见，它们通常分别被称为资源和集合

集合包含相同类型的资源列表。例如，用户拥有一个联系人集合。

资源有一些状态和零个或多个子资源。 每个子资源可以是简单资源或集合资源。

例如，Gmail API 包含一个用户集合，每个用户都有一个消息集合，一个邮件线集合，一个标签集合，一个个人资料资源以及多个设置资源。
尽管存储系统和 REST API 之间存在一些概念上的一致性，但具有面向资源的 API 的服务不一定是数据库，并且在解释资源和方法方面具有极大的灵活性。例如，创建一个日历事件（资源）可能为与会者创建其他事件，向与会者发送电子邮件邀请，预定会议室以及更新视频会议日程安排。

### 方法

#### 标准方法

参考https://google-cloud.gitbook.io/api-design-guide/standard_methods

一个面向资源的 API 的关键特征是它强调资源（数据模型）而不是在资源上执行的方法（功能）。一个典型的面向资源的 API 会暴露大量携带少量方法的资源。

基于 http 协议，方法我们映射为 HTTP 的 POST、GET、PUT 和 DELETE 四种标准动词

HTTP METHOD

作用范围:

- GET-获取资源,
- POST-创建资源
- PUT-更新资源，不区分资源全量、部分属性更新
- DELETE-删除资源

#### 自定义方法

自定义方法指的是除了五种标准方法以外的 API 方法。他们只会用于那些无法轻易通过标准方法来表达的功能上。一般来说，API 设计者应该在条件允许的情况下尽可能地使用标准方法。标准方法有着更简单且定义明确的语义，更为大部分开发人员所熟知，所以他们更容易被使用且更不容易出错。标准方法的另一个优势是 API 平台对标准方法有着更好的支持，例如错误处理、日志、监控等。

一个自定义方法可以与资源、集合或服务相关联。它可能携带任意请求、返回任意响应，也可能支持流式请求和流式响应。

对于自定义方法，它们应该使用如下通用 HTTP 映射：

```
POST https://service.name/v1/some/resource/name:customVerb
```

使用:代替'/'来将自定义动词从资源名称中分离是为了支持任意的路径。举个例子，撤销删除一个文件可以映射到

```
POST /files/a/long/file/name:undelete
```

通用自定义方法可参考：https://google-cloud.gitbook.io/api-design-guide/custom_methods#tong-yong-zi-ding-yi-fang-fa

目前我们使用自定义方法的场景举例

GET 请求参数过多，有些浏览器和 Server 对 url 长度有限制，这种情况下无法使用 GET

针对分页查询，如果使用自定义方法，分页参数应该放置于 Query Params 中

### 资源名称

参考https://google-cloud.gitbook.io/api-design-guide/resource_names

完整资源名称：//API 服务名/相对资源名称

在这个基础上，调整 API 服务名

API 服务名 = 内部服务专用的伪 DNS 名/应用名称

以中台用户服务获取用户信息为例：

API 服务名应该为：abp-test.ayla.com.cn/mp-user

相对资源名称：/users/{userId}

完整资源路径：//abp-test.ayla.com.cn/mp-user/users/{userId}

客户端访问完整的资源名称：GET https://abp-test.ayla.com.cn/mp-user/users/{userId}

以中台用户服务获取用户设置信息为例：

客户端访问完整的资源名称：GET https://abp-test.ayla.com.cn/mp-user/users/{userId}/settings

版本管理

使用前期确定的版本管理规范：https://aylaasia.atlassian.net/wiki/spaces/RDCEN/pages/1613987936

在资源路径前添加 API 主版本

GET https://api.abp-test.ayla.com.cn/mp-user/v1/users/{userId}

GET https://api.abp-test.ayla.com.cn/mp-user/v2/users/{userId}
