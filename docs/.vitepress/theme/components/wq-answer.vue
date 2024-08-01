<script setup>
defineProps({ detail: { type: Object, required: true } });

const answerMap = ["A", "B", "C", "D"];
</script>

<template>
  <div class="my-[20px]">
    <div class="mb-[10px] px-[8px] py-[4px] w-fit text-[#2c9678] bg-[#eee] rounded-[4px]">来源: {{ detail.from }}</div>
    <div class="mb-[10px] font-bold">关键字: 【{{ detail.keywords }}】</div>
    <div class="mb-[10px]">{{ detail.title }}</div>
    <div class="flex flex-col gap-y-[10px] mb-[20px]">
      <div
        v-for="(option, index) in detail.options"
        :key="index"
        :class="{
          'font-bold': answerMap[index] === detail.answer,
        }"
      >
        {{ option }}
      </div>
    </div>
    <div class="p-[10px] bg-[#eee] text-[#333] whitespace-pre-wrap">{{ detail.resolve }}</div>
    <div class="py-[10px] border-b-[1px] border-[#666]"></div>
  </div>
</template>
