<template>
  <div class="mt-[16px]">
    <div class="pb-[10px] border-t-[1px] border-[#eaeaea]"></div>
    <Transition>
      <div
        v-if="y > 1000"
        class="go-top-button"
        @click.stop="handleToTop"
        v-html="content"
      ></div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";

const content = "Go Top 👆";
const { y } = useWindowScroll({ behavior: "smooth" });

const handleToTop = () => {
  y.value = 0;
};
</script>

<style lang="scss">
.go-top-button {
  @apply p-[12px] text-white bg-[#2c9678] rounded-[8px] cursor-pointer;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
