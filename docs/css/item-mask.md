# 项目 item 遮罩

## 预览

<div class="relative mt-[30px] p-[10px] w-[400px] border-[1px] border-black rounded">
  <div class="text-[20px]">
    title
  </div>
  <img src="/images/287-250x250.jpg" class="w-[200px] h-[200px]">
  <div class="item-mask">
    <span class="mask-content">维护中</span>
  </div>
</div>

<style lang="scss" scoped>

.item-mask {
  background-color: rgba(125, 125, 125, 0.5);

  /* 设置 inset-0 将 mask 撑开到父容器 */
  @apply absolute inset-0 text-center z-[1] rounded cursor-not-allowed;

  .mask-content {
    /* top-[50%] translate-y-[-50%] 将 mask 内文字垂直居中 */
    @apply absolute left-0 top-[50%] translate-y-[-50%] w-full px-[10px] text-[20px] text-white;
  }
}
</style>

## 实现

```vue
<template>
  <div
    class="relative mt-[30px] p-[10px] w-[400px] border-[1px] border-black rounded"
  >
    <div class="text-[20px]">title</div>
    <img src="/images/287-250x250.jpg" class="w-[200px] h-[200px]" />
    <div class="item-mask">
      <span class="mask-content">维护中</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-mask {
  background-color: rgba(125, 125, 125, 0.5);

  /* 设置 inset-0 将 mask 撑开到父容器 */
  @apply absolute inset-0 text-center z-[1] rounded cursor-not-allowed;

  .mask-content {
    /* top-[50%] translate-y-[-50%] 将 mask 内文字垂直居中 */
    @apply absolute left-0 top-[50%] translate-y-[-50%] w-full px-[10px] text-[20px] text-white;
  }
}
</style>
```
