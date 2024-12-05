# sticky 滑动效果

最近工作中遇到一个需求：网站的文章页面有分享功能，首先出现在侧边栏的内容下面，随着滑动变成 sticky 效果，附着在侧边栏顶部，然后等到文章最下面的分享按钮出现时，侧边栏的分享功能随着滑动消失，效果如下:

## 预览

![git](/images/sticky-over.gif)

## 实现

```vue
<template>
  <div class="mt-[58px]">
    <div class="flex gap-x-[40px] mx-[100px]">
      <div class="w-[1200px] bg-[#EEE] h-[1800px] p-[10px]">主内容</div>
      <div class="h-[1100px] p-[10px] relative flex-1 bg-[#999]">
        <div class="h-[600px] bg-[#666]">侧边栏内容</div>
        <div class="sticky top-[68px] h-[100px] bg-[#fff]">分享</div>
      </div>
    </div>
    <div class="mx-[100px] mt-[20px] p-[10px] border-[1px] border-[#333]">分享</div>
    <footer class="w-full mt-[200px] h-[500px] bg-[#666]">footer</footer>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

实现起来很简单，左右两栏布局，左高右低，但是右边一栏必须显式定义高度