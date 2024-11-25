<template>
  <div
    class="w-full h-screen bg-cover relative"
    :style="{ 'background-image': `url(${wallpage})` }"
  >
    <div
      class="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-white"
    >
      <div class="text-[40px] text-[#2c9678] motion-preset-slide-down motion-duration-500">Snowinlu</div>
      <div class="text-[28px] motion-preset-slide-down motion-duration-1000">TIL(Today I Learned)</div>
      <div class="text-[28px] mb-[10px] motion-preset-slide-down motion-duration-2000">
        A week is 2% of a year, keep learning
      </div>
      <div
        class="w-fit px-[6px] py-[2px] rounded-[4px] border-[1px] border-white text-[16px] cursor-pointer hover:bg-[#2c9678] hover:border-[#2c9678]"
        @click="handleScroll"
      >
        开始阅读
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize, useWindowScroll } from "@vueuse/core";
import wallpage from "../assets/images/wallhaven-vqkdo5.jpg";

const { height } = useWindowSize();

const handleScroll = () => {
  const { y } = useWindowScroll({ behavior: "smooth" });

  y.value = height.value;
};
</script>

<style lang="scss" scoped></style>
