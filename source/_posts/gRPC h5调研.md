---
title: gRPC h5调研
date: 2020-05-28
---

## gRPC 简介

官方地址：[Introduction to gRPC](https://grpc.io/docs/what-is-grpc/introduction/)

gRPC 是一个高性能、通用的开源 RPC 框架，其由 Google 主要面向移动应用开发并基于 HTTP/2 协议标准而设计，基于 ProtoBuf(Protocol Buffers) 序列化协议开发

一些 HTTP/2 的术语：

Stream： 一个双向流，一条连接可以有多个 streams。

Message： 也就是逻辑上面的 request，response。

Frame:：数据传输的最小单位。每个 Frame 都属于一个特定的 stream 或者整个连接。一个 message 可能有多个 frame 组成。

gRPC 通常有四种模式：

unary：一元请求，一请求一返回

client streaming：客户端通过流向服务端发送一系列消息，然后等待服务端读取完数据并返回处理结果

server streaming：客户端发送一个请求，服务端返回一个流给客户端，客户从流中读取一系列消息，直到读取完成

bidirectional streaming：客户端和服务端都可以独立向对方发送或接受一系列的消息。客户端和服务端读写的顺序是任意。

## ProtoBuf

是作为 gRPC 的 IDL（接口定义语言）来定义信息交换格式的

关于 Protocol Buffers：[Language Guide (proto3) | Protocol Buffers | Google Developers](https://developers.google.com/protocol-buffers/docs/proto3)

## Grpc In Browser

[The state of gRPC in the browser](https://grpc.io/blog/state-of-grpc-web/)

js 不能强制使用 http2，也无法进行细粒度的控制

浏览器支持 http2 更多的是在底层，比如资源加载的时候

各个 grpc 库的支持
GitHub - johanbrandhorst/grpc-web-compatibility-test: Test various implementations of gRPC-Web Clients with various implementations of gRPC-Web proxies

所有的库都是基于 http1.1 进行的降级处理，目前它们都需要额外的 proxy 支持

grpcWeb 是官方的，需要 envoy。improbable 需要 grpcwebproxy（一个 go 语言的 proxy）

其中 improbableWS 是基于 websocket 的

开发过程：通过对 Protocol Buffers 格式的.proto 文件进行编译，编译成对应语言的 js 或者 ts 的代码，代码包含 client 和请求方法。调用相关函数，设置参数完成请求调用

（PS：后端自身的 grpc 调试工具，grpcui，貌似本质上是基于 go 语言的 client，只是在 web 浏览器进行表单的形式的组织。）

protoc 全局编译工具
.proto 文件需要全局编译工具 mac 推荐 brew 安装 brew install protobuf

对于非 mac，安装包地址见 [Releases · protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf/releases)
eg：for windows，https://codeload.github.com/protocolbuffers/protobuf/zip/v3.15.6

该工具具备插件功能，前面提到的两个 gRPC-web 工具，由于实现不同，非官方的那个用了自定义的插件，所以虽然都是 js，实际上打包出来代码是不一样的。

TODO:  
所以目前后端 grpc 对 h5 是转 restful 提供接口（一个 go 的 grpc-gateway）。

但期望是一份文件对多端都有约束。

h5 这边目前没能像其它端一样自动生成代码。
