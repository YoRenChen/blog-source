---
title: Vue SSR 浅结
date: 2021-09-15
---

# Vue SSR 浅结
将从Vue SSR的构建流程、运行流程、SSR的特点和利弊总结
![](/images/ssr-01.png)

### vue ssr 构建流程
#### app.js入口文件
通用Entry，构建实例。服务端放在Client-entry，客户端挂载dom中。
#### 两个entry
- Client-entry: 挂载Vue实例到指定的dom元素上
- Server-entry: 使用export导出的函数
#### webpack打包构建
通过 webpack 打包生成 Server Bundle 和 Client Bundle。
- Server Bundle：运行在服务器上通过node生成预渲染的HTML字符串，发送到我们的客户端以便完成初始化渲染
- Client Bundle：拿到服务端返回的HTML字符串后，“激活” HTML，由Vue动态管理的DOM，以便响应后续数据的变化。
### 运行原理

1. 需要使用一个工厂函数封装。使返回是一个新的实例以免污染。
2. 通过 asyncData 获取到初始化渲染的数据。
3. 启动node服务，跑entry里的函数，将Vue渲染成html，数据混入到html字符串中，推送到客户端。
