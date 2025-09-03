---
outline: deep
---

# vite 简单设置

## 设置代理

```js
// vite.config.js
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

## 指定 host

指定服务器应该监听哪个 IP 地址。如果设置为 `0.0.0.0` 或 `true` 将监听所有地址，包括局域网和公网地址

```js
// vite.config.js
export default defineConfig({
  server: {
    host: "0.0.0.0", // or true
  },
});
```

## 路径别名设置

```js
// pmpm add -D @types/node
// vite.config.js
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

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// tsconfig.app.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

## 增加 jsx 支持

```js
// vite.config.js
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

## 导入时省略扩展名

```js
// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    extensions: [".js", ".ts", ".json"], // 导入时想要省略的扩展名列表
  },
});
```

## 增加预处理器支持

```sh
# .scss and .sass
$ npm add -D sass

# .less
$ npm add -D less

# .styl and .stylus
$ npm add -D stylus
```

```vue
<style lang="scss" scoped>
// 引入 scss 文件
@import "./../variables.module.scss";
</style>
```

## Web Workers 引入

通过构造器导入：

```js
// 只有在 new Worker() 声明中直接使用 new URL() 构造函数时，work 线程的检测才会生效
// 此外，所有选项参数必须是静态值
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});
```

带有查询后缀的导入：

```js
import MyWorker from "./worker?worker";

const worker = new MyWorker();
```

## 环境变量

`Vite` 在一个特殊的 `improt.mate.env` 对象上暴露环境变量：

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

指定模式是指：

- vite --mode dev, 此时的 mode = dev

默认情况下：

- pnpm run dev mode = development;
- pnpm run build, mode = prodcution;
- 如果需要指定模式，看下节代码

只有带 `VITE_` 前缀的变量才会暴露给经过 `vite` 处理的代码：`VITE_SOME_KEY`

### 模式

```sh
# 测试环境
$ vite build --mode test
# 预发布环境
$ vite build --mode stage
# 默认生产模式构建，可忽略 --mode
$ vite build --mode production
```
