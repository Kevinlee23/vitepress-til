# 圆形 pulse 动画

## 预览

![animation](/images/circle-animation.gif)

## 实现

```vue
<template>
  <div
    class="contact-icon-animation relative flex items-center justify-center w-[70px] h-[70px] rounded-[999px] bg-white"
  >
    hover
  </div>
</template>

<style lang="scss" scoped>
@keyframes pulse-border {
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
    opacity: 0;
  }
}

.contact-icon-animation {
  &:hover::before {
    content: "";
    animation: pulse-border 1500ms ease-out infinite;

    @apply block absolute left-[50%] top-[50%] z-0 translate-x-[-50%] translate-y-[-50%] w-[70px] h-[70px] bg-white rounded-[999px] opacity-100 visible;
  }
}
</style>
```
