---
noComment: true
---

# 较少使用的css属性

> 平时使用的地方较少，或者新特性（有实用价值的）的属性

## backface-visibility

指定当元素背面朝向观察者时是否可见:

- hidden
- visible (default)

实例: 配合 transform: rotateX(Y) 做翻转的时候使用

## text-underline-offset

控制文本基线和下划线之间的距离

## overscroll-behavior: contain

使用该特性会将滚动隔离到所包含的区域，一旦到达滚动边界，就会将其移动到父页面，从而防止继续滚动

## color-mix

混合颜色的函数:

color-mix(in function, color1, color2, ...,)

in-xxx (颜色命名空间):

- in 极性颜色空间: hsl, hwb, lch, oklch
- in 矩形颜色空间: srgb, srgb-linear, ...
- in 自定义颜色空间

实例 (css 颜色关键字的透明度表示):

```css
canvas {
  border: 1px solid color-mix(in srgb, deepskyblue 75%, transparent);
  background-color: color-mix(in srgb, deepskyblue 25%, transparent);
}
```

实例 (主色，次色的维护):

```css
:root {
  --primary: #7350C7;
  --primary-weak: color-mix(in srgb, var(--primary), white 25%);
}
```