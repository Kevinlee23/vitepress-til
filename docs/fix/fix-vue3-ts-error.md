# vue3-vite-ts 报错汇总

## 解决 vue3-ts 环境下引入组件报错的问题

在 `vite-env.d.ts` 中加入以下代码:

```ts
declare module "*.vue" {
  import { Component } from "vue";
  const component: Component;
  export default component;
}
```

## 解决 ts 文件引用报错的问题

在 `tsconfig.json` 中加入以下代码:

```json
{
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## 解决 `<script lang="ts" setup>` 中引入 `js` 文件的问题

```json
{
  "allowJs": true,
}
```