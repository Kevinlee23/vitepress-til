# nuxt 配置

## proxy

```js
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      "/proxy/example": { target: "https://example.com", changeOrigin: true },
    },
    routeRules: {
      "/proxy/**": {
        proxy: "...",
      },
    },
  },
});
```

## 全局引入 css

```js
export default defineNuxtConfig({
  css: [
    "~/assets/css/main.css", // css
    "~/assets/css/config.scss", // scss
    "...", // other
  ],
});
```

## App configuration

```js
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { type: "text/javascript", src: "..." }, // 外部第三方包引入
      ],
    },
    baseURL: "/", //The base path of your Nuxt application.
    buildAssetsDir: "/", // 取消打包文件存放位置"/_nuxt/"文件
  },
});
```
