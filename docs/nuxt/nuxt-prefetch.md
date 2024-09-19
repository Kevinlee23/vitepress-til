# prefetch on NuxtLink [3.13]

> 通过 `prefetch` （预取）设置，用户访问当前页面时加载下一个页面，这样当用户实际点击下一个页面时，加载速度会更快

使用 `<NuxtLink>`, 默认会进行预取，这将造成资源浪费，通过设置何时触发预取将有利合理的利用前端资源

# two prefetch method

- `visibility` 当链接 `visible` 的时候触发预取
- `interaction` 当链接 `hover/focus` 的时候触发预取

# config setting

可以在 `nuxt.config.js(ts)` 进行默认触发设置

```js
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLinks: {
        prefetchOn: {
          visibility: false,
          interaction: true,
        },
      },
    },
  },
});
```
