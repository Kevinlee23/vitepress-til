# pinia-plugin-persistedstate

`pinia-plugin-persistedstate` 是一个为 `pinia store` 提供持久化存储的插件

## 安装

:::code-group

```sh [pnpm]
pnpm i pinia-plugin-persistedstate
```

```sh [npm]
npm i pinia-plugin-persistedstate
```

```sh [yarn]
yarn add pinia-plugin-persistedstate
```

:::

## 将插件添加到 pinia 实例上

```js
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // [!code highlight]
```

## 创建 store 时设置持久化

```js
import { defineStore } from "pinia";

export const useStore = defineStore(
  "main",
  () => {
    const someState = ref("你好 pinia");
    return { someState };
  },
  {
    persist: true, // [!code highlight]
  }
);
```
