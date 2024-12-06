<script setup>
import QrCode from "../../../../public/images/qr-code.png";
</script>

<template>
  <div class="img-wrap mt-[20px] w-[200px] h-[200px]">
    <img :src="QrCode" />
  </div>
</template>

<style lang="scss" scoped>
.img-wrap {
  @apply relative;

  &::after {
    @apply absolute inset-0;

    content: "";
    background: linear-gradient(45deg, #673ab7, #ff5722);
    mix-blend-mode: lighten;
  }
}
</style>
