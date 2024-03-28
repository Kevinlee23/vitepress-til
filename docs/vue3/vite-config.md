---
outline: deep
---

# vite 简单设置

## 设置代理

```js
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "localhost:port",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\api/, ""),
      },
    },
  },
});
```

## 增加预处理器支持

```sh
# .scss and .sass
npm add -D sass

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

```vue
<style lang="scss" scoped>
// 引入 scss 文件
@import "./../variables.module.scss";
</style>
```

## 路径别名设置

```js
import path from "node:path";

export default defineConfig({
  // ...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

## 增加 jsx 支持

```js
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

## Web Workers 引入

`通过构造器导入`

```js
// 只有在 new Worker() 声明中直接使用 new URL() 构造函数时, work 线程的检测才会生效
// 此外，所有选项参数必须是静态值
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});
```

`带有查询后缀的导入`

```js
import MyWorker from "./worker?worker";

const worker = new MyWorker();
```

## 环境变量

### 环境变量

`Vite` 在一个特殊的 `improt.mate.env` 对象上暴露环境变量:

- `import.meta.env.MODE` 应用运行的模式
- `import.meta.env.BASE_URL` 部署应用时的基本 `URL`
- `import.meta.env.PROD` 应用是否运行在生产环境
- `import.meta.env.DEV` 应用是否运行在开发环境
- `import.meta.env.SSR` 应用是否运行在 `server` 上

### .env 文件

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

只有带 `VITE_` 前缀的变量才会暴露给经过 vite 处理的代码: `VITE_SOME_KEY`

### 模式

```sh
# 测试环境
vite build --mode test
# 预发布环境
vite build --mode stage
# 默认生产模式构建, 可忽略 --mode
vite build --mode production
```