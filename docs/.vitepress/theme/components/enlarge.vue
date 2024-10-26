<script setup>
import { ref, computed } from "vue";
import { useMouseInElement } from "@vueuse/core";
import image from "/images/wallhaven-3l7vqy.jpg";

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
  <div>
    <div class="flex">
      <div class="relative">
        <img ref="target" :src="image" class="w-[400px] h-[400px]" />

        <div
          v-show="!isOutside"
          class="absolute"
          :style="{
            width: '50px',
            height: '50px',
            backgroundColor: '#999',
            opacity: 0.2,
            top: `${maskPosition.y}px`,
            left: `${maskPosition.x}px`,
          }"
        />
      </div>
      <div
        v-show="!isOutside"
        class="w-[200px] h-[200px] border-[1px] border-black bg-no-repeat"
        :style="{
          marginLeft: '10px',
          backgroundImage: `url(${image})`,
          backgroundPositionX: `-${maskPosition.x * 4}px`,
          backgroundPositionY: `-${maskPosition.y * 4}px`,
          backgroundSize: '1600px 1600px',
        }"
      />
    </div>
    <div v-show="!isOutside" class="mt-[20px]">
      <div>x: {{ elementX }}, 4 plus: {{ elementX * 4 }}</div>
      <div>y: {{ elementY }}, 4 plus: {{ elementY * 4 }}</div>
    </div>
  </div>
</template>
