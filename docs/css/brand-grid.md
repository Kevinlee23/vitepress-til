# 品牌宫格图

```vue{8,22,26}
<script setup>
import image from '@/assets/image/ptnr-14.png'
</script>

<template>
  <div class="p-[60px] mb-[20px] w-[723px] h-[470px] flex flex-wrap bg-white rounded-[20px]">
    <div
      v-for="(item, index) in 9" :key="index"
      class="box-border p-[40px] bg-transparent group/item"
      :class="{ 'not-last-row': item <= 6, 'not-last-col': item % 3 !== 0 }"
    >
      <div class="relative h-[26px] overflow-hidden cursor-pointer">
        <img :src="image" class="image-gray image-gray-hover w-[120px] ">
        <img :src="image" class="image-color-hover w-[120px] invisible -translate-y-[100%] absolute top-0 left-0">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 图片置灰
.image-gray {
  filter: brightness(200%) contrast(0%) saturate(0%) blur(0px) hue-rotate(0deg);
}

.image-gray-hover {
 @apply group-hover/item:translate-y-[100%] group-hover/item:invisible duration-300;
}

.image-color-hover {
  @apply group-hover/item:translate-y-[100%] group-hover/item:visible group-hover/item:top-[-100%] duration-300;
}

.not-last-row {
  @apply border-b-[1px] border-r-[rgba(0,0,0,0.04)];
}

.not-last-col {
  @apply border-r-[1px] border-r-[rgba(0,0,0,0.04)];
}
</style>
```

关键点

- 外层容器的 `overflow-hidden`
- `image` 的 `hover` 样式中加入 `translate` 和 `duration`
- 两张图片在外层容器 `hover` 与否时的来回切换

效果:

`before hover`
![brand-grid-1](/images/brand-grid-1.png)

`hover`
![brand-grid-2](/images/brand-grid-2.png)