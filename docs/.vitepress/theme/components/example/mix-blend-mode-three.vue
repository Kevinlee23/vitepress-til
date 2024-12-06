<script setup></script>

<template>
  <div class="flex gap-x-[20px]">
    <div class="img-1" />
    <div class="img-2" />
  </div>
</template>

<style lang="scss" scoped>
.img-1 {
  background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2874945695.jpg"),
    #0ff;
  background-size: cover;
  background-blend-mode: lighten;

  @apply relative w-[300px] h-[533px];

  &:after {
    content: "";

    @apply absolute ml-[10px] w-[300px] h-[533px];

    background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2874945695.jpg"),
      #f00;
    background-blend-mode: lighten;
    background-size: cover;
    mix-blend-mode: darken;
  }
}

.img-2 {
  background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2612429822.jpg"),
    #0ff;
  background-size: cover;
  background-blend-mode: lighten;

  @apply relative w-[300px] h-[533px];

  &:after {
    content: "";

    @apply absolute ml-[10px] w-[300px] h-[533px];

    background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2612429822.jpg"),
      #f00;
    background-blend-mode: lighten;
    background-size: cover;
    mix-blend-mode: darken;
  }
}
</style>
