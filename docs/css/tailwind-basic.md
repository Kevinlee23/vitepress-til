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

## 渐变 (gradient)

### 方向

- bg-gradient-to-t => top
- bg-gradient-to-tr => top right
- bg-gradient-to-r => right
- bg-gradient-to-br => bottom right
- bg-gradient-to-b => bottom
- bg-gradient-to-bl => bottom left
- bg-gradient-to-l => left
- bg-gradient-to-tl => top left

### 起始距离，颜色

bg-gradient-to-b from-15% to-100% from-[#E60000] to-[#1B0909] 

=>

linear-gradient(180deg, #E60000 15%, #1B0909 100%)

### 中间值

- via-purple-500
- via-30% via-sky-500
