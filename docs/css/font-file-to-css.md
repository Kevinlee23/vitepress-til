---
title: 将自定义字体作为 css 文件引入
date: 2024-10-11
---

# 将自定义字体作为 css 文件引入

示例如下：

```css
/* light */
@font-face {
  font-family: "LxgwWenKai";
  src: url("./fonts/LXGWWenKai-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}

/* regular */
@font-face {
  font-family: "LxgwWenKai";
  src: url("./fonts/LXGWWenKai-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

/* medium */
@font-face {
  font-family: "LxgwWenKai";
  src: url("./fonts/LXGWWenKai-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

/* semibold */
@font-face {
  font-family: "LxgwWenKai";
  src: url("./fonts/LXGWWenKai-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}

/* bold */
@font-face {
  font-family: "LxgwWenKai";
  src: url("./fonts/LXGWWenKai-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}
```

```css
body {
  font-family: "LxgwWenKai", sans-serif; /* 使用自定义字体 */
}
```
