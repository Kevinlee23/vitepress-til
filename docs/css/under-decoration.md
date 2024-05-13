# 下划线装饰

## 效果

![under decoration](/images/under-decoration.gif)

## 实现

```vue
<template>
  <div class="c-decoration">麓下雪</div>
</template>

<style lang="scss" scoped>
.c-decoration {
  @apply relative w-fit px-[2px];
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 66%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 0.2s cubic-bezier(0, 0.8, 0.13, 1);
    background-color: rgba(79, 192, 141, 0.5);
  }

  &:hover::after {
    top: 0;
  }
}
</style>
```
