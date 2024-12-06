<script setup>
import { ref } from "vue";

const actve = ref("1");
const menu = ref([
  { id: "1", title: "博客" },
  { id: "2", title: "归档" },
  { id: "3", title: "友联" },
  { id: "4", title: "关于" },
]);
</script>

<template>
  <div class="mt-[20px]">
    <div class="menu-wrap w-fit flex gap-x-[4px]">
      <div
        v-for="item in menu"
        :index="item.id"
        class="menu-item p-[4px] bg-[#EEE] border-b-[2px] border-b-white hover:bg-[#fff] hover:border-b-black cursor-pointer"
        :class="{ 'bg-[#fff] !border-b-black': actve === item.id }"
        @click="actve = item.id"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-wrap {
  @apply relative;

  &::after {
    content: "";
    mix-blend-mode: darken;

    @apply absolute bottom-0 left-0 w-full h-[2px] bg-[#f0f1f2];
  }

  .menu-item {
    transition: background linear 300ms;
  }
}
</style>