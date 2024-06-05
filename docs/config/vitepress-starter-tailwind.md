# vitepress 中集成 tailwind

## install

`yarn add -D tailwindcss autoprefixer postcss`

## code

:::code-group

```js [./tailwind.config.js]
module.exports = {
  content: ["./docs/.vitepress/**/*.{js,ts,vue}", "./docs/**/*.md"],
};
```

```css [.vitepress/theme/index.css]
@tailwind base;

@tailwind components;

@tailwind utilities;
```

```js [.vitepress/theme/index.js]
import "./tailwind.postcss";

import DefaultTheme from "vitepress/theme";

export default { ...DefaultTheme };
```

:::

`then enjoy tailwind`
