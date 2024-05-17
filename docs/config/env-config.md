---
outline: deep
---

# 部署环境配置

一般来说环境分为:

- `development` 开发环境
- `staging` 本地测试环境
- `test` 远程测试环境
- `production` 生产环境 （正式环境）

## 不同环境的配置

### 环境变量

具体见: [链接](/vue3/vite-config#环境变量)

### 根据环境变量自动分发 \[部署地址\]

`config/index.js`

```js
const CONFIG = {
  development: {
    timeout: 10000, // 接口超时时间
    frontHref: "http://localhost:8080", // 前台部署地址
    frontBase: "", // 前台导航地址
    backHref: "http://localhost:3030", // 后台部署地址
    backBase: "", // 后台导航地址
  },
  staging: {
    // ...
  },
  // ...
};

const config = (key, APP_TYPE) => {
  return CONFIG[import.meta.env.VITE_ENV || APP_TYPE][key];
};

// 根据环境变量和预设定义来自动获取当前环境下的部署地址
// Base: config('frontBase')
```
