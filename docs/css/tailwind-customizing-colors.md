# 定制颜色

## 定义变量

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

$aeon-primary: #b11111;

@function hex2rgb($color) {
  @return (red($color), green($color), blue($color));
}

@layer base {
  :root {
    --color-primary: 255 115 179; // normal
    --color-secondary: 111 114 185; // normal
    --color-primary-error: rgb(255, 155, 179); // error // [!code error]
    --color-primary-right: #{hex2rgb($aeon-primary)}; // right // [!code highlight]
    /* ... */
  }
}
```

## 定义 tailwind.config.js 文件

`tailwind.config.js`

```js
const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    colors: {
      // Using default colors // [!code highlight]
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,

      // Using custom colors // [!code highlight]
      black: {
        DEFAULT: "#000000", // bg-black / text-black
        1: "#F4F4F4",
        2: "#F9F9F9",
        3: "#FBFBFB",
        4: "#F1F1F1",
        5: "#1B1B1B",
        6: "#F3F3F3",
        7: "#575757",
        8: "#f0f2f5",
        9: "#F7F8FA",
        10: "#F6F6F6",
        11: "#EEEEEE",
        12: "#f0f1f2",
        13: "#3F3F3F",
        14: "#CCCCCC",
      },

      // Using the CSS variables // [!code highlight]
      // Using modern `rgb`
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",

      // Using modern `hsl`
      primary: "hsl(var(--color-primary) / <alpha-value>)",
      secondary: "hsl(var(--color-secondary) / <alpha-value>)",

      // Using legacy `rgba`
      primary: "rgba(var(--color-primary), <alpha-value>)",
      secondary: "rgba(var(--color-secondary), <alpha-value>)",
    },
  },
};
```
