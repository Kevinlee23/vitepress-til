<script lang="ts" setup>
import Enlarge from '../.vitepress/theme/views/enlarge.vue'
</script>

# 购物车图片放大效果

## 效果

<Enlarge />

## 实现

```vue
<script setup>
import { useMouseInElement } from "@vueuse/core";
import image from "@/assets/image/image-4.jpg";

const target = ref(null);
const { isOutside, elementX, elementY, elementWidth, elementHeight } =
  useMouseInElement(target);

const maskPosition = computed(() => {
  let x = elementX.value;
  let y = elementY.value;
  if (elementX.value + 50 > elementWidth.value) {
    // right
    x = 350;
  }

  if (elementY.value + 50 > elementHeight.value) y = 350;

  if (elementX.value - 20 < 0) x = 0;

  if (elementY.value - 20 < 0) y = 0;

  return {
    x,
    y,
  };
});
</script>

<template>
  <div class="m-[50px] flex gap-x-[10px]">
    <div class="relative">
      <img ref="target" :src="image" class="w-[400px] h-[400px]" />

      <div
        v-show="!isOutside"
        class="w-[50px] h-[50px] bg-[#999] absolute opacity-20"
        :style="{ top: `${maskPosition.y}px`, left: `${maskPosition.x}px` }"
      />
    </div>
    <div
      v-show="!isOutside"
      class="w-[200px] h-[200px] border-[1px] border-black bg-no-repeat"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundPositionX: `-${maskPosition.x * 4}px`,
        backgroundPositionY: `-${maskPosition.y * 4}px`,
        backgroundSize: '1600px 1600px',
      }"
    />
  </div>
  <div v-show="!isOutside" class="mx-[100px]">
    <div>x: {{ elementX }}, 4 plus: {{ elementX * 4 }}</div>
    <div>y: {{ elementY }}, 4 plus: {{ elementY * 4 }}</div>
  </div>
</template>
```
