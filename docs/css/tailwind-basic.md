# tailwind 常用写法

## 字体和行高简写

``

```css
.normal {
  /* 完整写法 */
  @apply text-[14px] leading-[14px];
}

.short {
  /* 简写 */
  @apply text-[14px]/[14px];
}
```

## 分组

```css
.group-container {
  @apply group/item;
}

.group-item {
  @apply group-hover/item:text-primary;
}
```
