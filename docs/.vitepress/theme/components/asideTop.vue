<template>
  <div class="aside-top-container">
    <share class="share" />
  </div>
</template>
<script setup lang="ts">
import share from "./share.vue";
</script>
<style>
/* 仅在侧边栏不显示时显示这部分 */
.aside-top-container {
  padding-top: 9px;
  padding-bottom: 9px;
  border-left: 1px solid var(--vp-c-divider);
}
</style>
