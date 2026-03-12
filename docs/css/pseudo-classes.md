---
title: 伪类
date: 2026-03-12
noComment: true
outline: deep
---

# 伪类

## :has()

:has(selector)

> 这是一个父选择器，选择包含 selector 所匹配元素的那个元素。

### #1. 具有图片的卡片元素

```css
.card:has(img) {
  border: 2px solid #61dafb;
  padding: 10px;
}
```

### #2. 表单校验高亮

```css
input:has(+ .error-message) {
  border-color: red;
}
```

### #3. 超过 5 个子项的容器

```css
.grid-container:has(div:nth-child(6)) {
  grid-template-columns: repeat(3, 1fr); /* 切换到三列布局 */
}
```

总结：has: 可以将以前需要使用 JS 的场景，降级为只需要写 CSS

## :is(), :where()

> 匹配选择器列表中的任何一个

Before:

```css
article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  color: #333;
  margin-bottom: 1em;
}
```

Now: 

```css
article :is(h1, h2, h3, h4, h5, h6) {
  color: #333;
  margin-bottom: 1em;
}

/* :hover */
article :is(h1, h2, h3, h4, h5, h6):hover {
  color: #61dafb;
}
```

这两个用法一样，但是权重不同：

- :is() 的权重，等于它括号所有选择器中，权重最高的那个
- :where() 的权重，永远是 0

如何选择：

- 当你只是想简化选择器，并且希望它能正常地覆盖掉默认样式时，用 :is() 。
- 当你希望提供一个“可被轻松覆盖”的默认样式时，用 :where() 。