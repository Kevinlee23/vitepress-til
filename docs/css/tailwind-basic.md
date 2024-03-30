# tailwind 常用写法

## 字体和行高简写

`text-[14px] leading-[14px]`

->

`text-[14px]/[14px]`

## 分组

```css
.group-container {
  @apply group/item;
}

.group-item {
  @apply group-hover/item:text-primary;
}
```
