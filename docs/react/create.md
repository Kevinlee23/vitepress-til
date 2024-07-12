---
outline: deep
---

# 新建一个 react 项目

```bash
# pnpm,  --template [react-ts / react-swc / react-swc-ts]
yarn create vite my-react-app --template react
```

## 安装 UI 库

### shadcn/ui

:::code-group

```bash [install]
pnpm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

# Edit tsconfig.json file

# import path
pnpm i -D @types/node

# Edit vite.config.ts(js)

npx shadcn-ui@latest init

# adding components to your project
npx shadcn-ui@latest add button
```

```json [tsconfig.json]
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

```js [vite.config.ts(js)]
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

:::


## 安装必备库

```bash
# 避免 mutation 问题
pnpm install use-immer
```