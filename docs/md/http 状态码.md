---
title: http 状态码
date: 2020-03-11
---

## 状态码

#### 1\*\*：请求已被接受，需要后续处理

● 100：客户端临时请被服务端接收
● 101：服务端根据客户端请求切换协议，用于 websocket 、 http/2.0

#### 2\*\* : 代表请求成功

● 200：成功
● 206：部分处理成功。（大文件分解下载、断点续传）
○ 发送给服务端：Range: bytes=startOffset-targetOffset/sum 从 startOffset 开始到 targetOffset 字节，总数为 sum
○ 发送到客户端：Content-Range=bytes startOffset-targetOffset/sum

#### 3\*\*：重定向(浏览器要执行特殊处理)

● 301：永久性重定向（URL）
● 302：临时性重定向(URL)
● 304：not modified，允许访问资源但未达到条件，命中协商缓存

#### 4\*\*：客户端错误

● 400：报文语法错误
● 401：http 认证失败
● 403：forbidden，请求资源被拒绝访问
● 404：服务器找不到资源

#### 5\*\*：服务端错误

● 500：服务端执行时错误
● 503：无法处理请求
