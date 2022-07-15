---
title: Sentry 接入考虑
date: 2021-07-11
---

# Sentry 接入思考

### 前提

目的准确收集定位线上问题。
调研了 fundebug、阿里 Arms、腾讯 badjs 和 sentry，考虑到以后会做本地化和多端兼容的情况，决定使用 sentry。

### 整体流程

#### 错误捕获

异常捕获 --> 数据存储 --> 数据上传

异常捕获 --> 数据上传

- js 运行时错误 – onerror
- js 运行时错误 – promise，unhandledrejection
- 重写 window.XMLHttpRequest 的方法
- console.error
- Vue 提供了全局错误捕获方法 errorHandler
- 异常触发者信息: url / userAgent

#### 错误上报

- 后台服务
  `new XMLHttpRequest().send`
- 页面跳转时发送数据,不受当前页面 unload 影响:
  `navigator.sendBeacon(url, data)`
- 图片地址, 没有跨域问题，请求数据小
  `const img = new Image(); img.src = url + "?data=XXX";`

- 离线上报
  存放在 indexDB, 在联网后自动上传服务器。
- 支持上报 console 信息
  console 打印的所有信息进行上报，协助完成业务侧数据上报。
  ```
  // babel.config.js
  plugins.push([
    'transform-remove-console',
    {
      exclude: ['error']
    }
  ])
  ```

#### 上传流程

##### API 错误上报

采用 Sentry.captureException 手动上报

```
// 例如：在axios拦截器中使用
import * as Sentry from '@sentry/vue'

const captureError = (response, code) => {
  Sentry.setTag('api', response.config.url)
  Sentry.setExtra('data', {
    request: response.config.data,
    response: response.data
  })
  Sentry.captureException(new Error(`API-${response.config.url}-${code}`))
}

request.interceptors.response.use((response) => {
  ...
  captureError(response, response.data.code)
  return response.data
}, errorHandler)

// 在errorHandler中对其他异常进行上报
const errorHandler = (error) => {
    ...
    captureError(error.response, error.response.status)
}

```

#### 上传 sourceMap

##### webpack-sentry-plugin

缺点：sentry 相关依赖包一直下载不下来，切淘宝镜像

##### sentry-cli 上传方式

##### API 上传
