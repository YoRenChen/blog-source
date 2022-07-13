---
title: vue打包优化
date: 2020-07-03
---

# vue 打包优化

### productionSourceMap: false

如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

### chainWebpack

#### webpack-bundle-analyzer

打包结果分析，不能与 CompressionWebpackPlugin 一起使用

```
 if (process.env.NODE_ENV === 'production') {
   config.plugin('webpack-bundle-analyzer')
     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
     .end()
 }
```

#### prefetch

prefetch 是一种 resource hint，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

禁用：config.plugins.delete('prefetch')

当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：

```
 import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
```

Prefetch 链接将会消耗带宽。

### configureWepack

#### ignorePlugin

阻止依赖的某些模块打包到 bundle 中

moment 优化 locale

```
 plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
```

#### externals

防止将某些 import 的包（package）打包到 bundle 中

防止 Vconsole 打包到生产环境

```
 externals: process.env.NODE_ENV === 'production'
   ? {
       vconsole: 'Vconsole'
     }
   : {}
```

#### CompressionWebpackPlugin

准备资产的压缩版本，以使用 Content-Encoding 服务。需要相应的 nginx 配置

```
plugins: [
   new CompressionWebpackPlugin({
     test: /\.(js|json|css|jp?eg|png)$/,
     threshold: 0,   // 当资源大于该值时进行压缩
     minRatio: 1,    // 压缩率小于这个值的资源会被压缩，默认为 0.8
     deleteOriginalAssets: true // 删除源文件, 配合webpack-bundle-analyzer时不能删除源文件，且需要配置静态服务器
   })
 ]
     #gzip  on;
     gzip_static on;
 ​
     # 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
     gzip_min_length 1k;
 ​
     # gzip 压缩级别 1-10
     gzip_comp_level 2;
 ​
     # 进行压缩的文件类型，静态压缩设置 gzip_types 没用
     # gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
 ​
     # 是否在http header中添加Vary: Accept-Encoding，建议开启
     gzip_vary on;
```
