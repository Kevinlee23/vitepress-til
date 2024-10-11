<script setup lang="ts"></script>

<template>
  <footer>
    Powered by
    <a href="https://github.com/Kevinlee23" target="_blank" title="作者">
      Snowinlu
    </a>
    | Copyright © 2024- | MIT License
  </footer>
</template>

<style lang="scss" scoped>
footer {
  @apply w-full px-0 py-[20px] text-center text-[14px];

  a {
    @apply text-[#2c9678];

    &:hover {
      @apply text-black;
    }
  }
}
</style>
