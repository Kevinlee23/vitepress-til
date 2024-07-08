# 横向走马灯

## 效果

![slider](/images/slider.gif)

## 实现

```vue
<script setup>
import { computed, onMounted, ref } from 'vue'
import image from '@/assets/image/image-1.jpg'
import image2 from '@/assets/image/image-2.jpg'
import image3 from '@/assets/image/image-3.jpg'
import image4 from '@/assets/image/image-4.jpg'
import image5 from '@/assets/image/image-5.jpg'

const list = [image, image2, image3, image4, image5, image, image2]

const wrapEl = ref(null)
const fullWidth = ref('0')

onMounted(() => {
  fullWidth.value = `${list.length * 400 + (list.length - 1) * 20 + 40}px`
})
</script>

<template>
  <div ref="wrapEl">
    <div class="scroll-el">
      <div v-for="(item, index) in list" :key="index" class="w-[400px] rounded-[20px]">
        <n-image class="h-[225px] rounded-[20px]" :src="item" width="400" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-el {
  --scrollWidth: v-bind(fullWidth);

  @apply mt-[20px] w-fit flex gap-x-[20px];

  @keyframes scroll {
  100% {
    transform: translateX((calc(100vw - var(--scrollWidth))));
  }
}

  animation: scroll 30s linear infinite;
}
</style>
```
