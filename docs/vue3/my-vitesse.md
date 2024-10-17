---
outline: deep
---

# My Vitesse

基座: `Vue3`, `Vite`, `Yarn`

## 项目启动

```sh
# or npm create vite@latest --template vue
# or pnpm create vite --template vue
# or --template vue-ts
$ yarn create vite --template vue
```

## UI 库

推荐的 `UI` 库如下：

- `ElementPlus ***`
- `Naive UI`
- `Vuetify`
- `Vant 4 (Mobile) ***`
- `Nut UI (Mobile)`
- `Tailwind CSS ***`

### Tailwind CSS :heart:

:::code-group

```sh [安装]
$ yarn add -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

```js [配置一]
// tailwindcss.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css [配置二]
// @/plugins/tailwind/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

:::

## 状态管理

### pinia :heart:

```sh
# or npm install pinia
# or pnpm install pinia
# 下同
$ yarn add pinia
```

[基本使用见 pinia 章节](/vue3/pinia-basic)

## 路由管理

### vue-router@4 :heart:

```sh
$ yarn add vue-router@4
```

## 工具库

### lodash :heart:

无需多言，每个前端应该都接触过的工具类库


$ arn add lodash
```

### radash

`Readable`

与同类竞品相比, `Radash` 的源码易于阅读和学习

`Semi-Functional`

大多数的 `Radash` 函数是确定性和纯函数

`Types`

`Radash` 使用 `Typescript` 编写

```sh
$ yarn add radash
```

[官方文档](https://radash-docs.vercel.app/docs/getting-started#love-and-hate)

## 插件

### vue-use :heart:

```sh
$ yarn add @vueuse/core
```

### Vue-i18n :heart:

国际化插件

```sh
$ yarn add vue-i18n@9
```

```ts
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  // something vue-i18n options here ...
});

const app = createApp({
  // something vue options here ...
});

app.use(i18n);
app.mount("#app");
```

### unplugin-vue-components

自动引入组件（不需要显示地 `import` 引入）

:::code-group

```sh [安装]
$ yarn install unplugin-vue-components -D
```

```ts [配置]
// vite.config.ts

import components from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from "unplugin-vue-components/resolvers";

// default dir: src/components
// { dirs: [...] } to set dirs
export default defineConfig({
  plugins: [
    components({
      /* options */
      dirs: ["src/views", "src/components"],
      // 第三方 UI 库的设置
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
        VantResolver(),
      ],
    }),
  ],
});
```

:::

> [!TIP]
> [Configuration](https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#configuration)

### unplugin-auto-import

自动引入核心库文件

:::code-group

```sh [安装]
$ yarn unplugin-auto-import -D
```

```ts [配置一]
// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core", "..."],
    }),
  ],
});
```

```json [配置二]
// tsconfig.json
{
  "include": ["./auto-imports.d.ts"]
}
```

:::

> [!TIP]
> [Configuration](https://github.com/unplugin/unplugin-auto-import?tab=readme-ov-file#configuration)

### @antfu/eslint-config

`eslint` 配置插件

```sh
$ yarn add eslint @antfu/eslint-config -D
```

创建文件 `eslint.config.js`, 写入:

```js
import antfu from "@antfu/eslint-config";

export default antfu();
```

> [!TIP]
> [Configuration](https://github.com/antfu/eslint-config)
