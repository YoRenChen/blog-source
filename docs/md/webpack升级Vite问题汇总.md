---
title: webpack升级Vite问题汇总
date: 2021-12-20
---

# webpack升级Vite问题汇总

#### The following dependencies are imported but could not be resolved

【别名未正确配置】
```
import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2"

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    /** 添加alias规则 */
    alias: [
      { find: '@/', replacement: '/src/' }
    ],
  },
})
```

#### Failed to resolve import "./App" from "src/main.js
【引入App组件的时候没有带文件后缀.vue】
1. 手动添加.vue后缀
2. 配置vite.config.js的extensions字段，来添加自动查找文件扩展名后缀
  ```
  export default defineConfig({
      extensions: [".vue", ".js", ".ts"],
    },
  })
  ```
#### dependency "less" not found. Did you install it
【安装vite中解析less插件】
``npm install less -D``

在vite中只需要安装，vite会自动处理sass,less文件。

#### Internal server error: '~ant.../default.less' wasn't found.
直接引入 @import '~组件库.less'样式库导致
```
export default defineConfig({
  // ...
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ],
  }
});
```

#### require is not defined
vite 不支持 ``require``
1. 使用 ES6 import
2. 路径访问
3. import.meta.glob()，异步，适合配置懒加载动态路由

#### Failed to resolve import ‘../xxx.png’.
注意编译之后的路径是public

#### 处理项目兼容低版本浏览器
``@vitejs/plugin-legacy``

```
import legacy from '@vitejs/plugin-legacy'

legacy({
  targets: ['ie >= 9'],
  additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
})
```

#### css 前缀
``npx install autoprefixer -D``
```
css: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 9', '> 1%'],
          grid: true,
        }),
      ]
    }
  }
```
