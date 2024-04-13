<template>
  <Transition>
    <div
      v-if="y !== 0"
      class="go-top-button"
      style="position: fixed; right: 40px; bottom: 40px"
      @click="handleToTop"
    >
      Go Top 👆
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();

const handleToTop = () => {
  y.value = 0;
};
</script>

<style lang="scss">
.go-top-button {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;

  color: white;
  background-color: #2c9678;
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
