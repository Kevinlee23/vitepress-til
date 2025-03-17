# nuxt 目录结构

## 一览

```txt
---- api 接口
---- components 复用组件
---- composables 组合式函数
---- layouts 页面框架结构
---- locales 本地化文件
---- middleware 导航守卫，导航到特定路由之前运行的代码
---- pages 页面
     ---- products
     ---- [id].vue // localhost:3000/products/10 -- route.params.id = 10
---- plugins 插件系统，会被 nuxt 自动读取
---- utils 公共方法
```

## layout

```vue
<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>
```

## middleware

```js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // navigateTo
  // return navigateTo(route-path)
  // - - - -
  // abort
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
});
```

## plugins

```js
export default defineNuxtPlugin((nuxtApp) => {
  // app hook
  // more: https://www.nuxt.com.cn/docs/api/advanced/hooks#nitro-app-hooks-runtime-server-side
  nuxtApp.hook("page:start", () => {
    /* write code */
  });

  if (process.client) {
    // only client
  }

  if (process.server) {
    // only server
  }
});
```

## composables

```js
export function useMyComposable() {
  // same to use in plugin or component
  const nuxtApp = useNuxtApp();

  // provide utils function
  nuxtApp.provide("hello", (name) => `Hello ${name}!`);
  console.log(nuxtApp.$hello("name")); // 输出 "Hello name!"
}
```
