<script setup>
import { ref } from "vue";

defineProps({
  detail: { type: Object, required: true },
  type: { type: String, default: "single" },
});

const answerMap = ["A", "B", "C", "D", "E"];

const show = ref(false);
</script>

<template>
  <div class="my-[20px]">
    <div
      class="mb-[10px] px-[8px] py-[4px] w-fit text-[#2c9678] bg-[#eee] rounded-[4px]"
    >
      来源: {{ detail.from }}
    </div>
    <div class="mb-[10px] font-bold">关键字: 【{{ detail.keywords }}】</div>
    <div class="mb-[10px]">{{ detail.title }}</div>
    <div class="flex flex-col gap-y-[10px] mb-[20px]">
      <div
        v-for="(option, index) in detail.options"
        :key="index"
        :class="{
          'font-bold text-[#2c9678] transition-[color] duration-500':
            (type === 'single'
              ? answerMap[index] === detail.answer
              : detail.answer.includes(answerMap[index])) && show,
        }"
      >
        {{ option }}
      </div>
    </div>
    <div class="p-[10px] bg-[#eee] text-[#333] whitespace-pre-wrap">
      <div class="cursor-pointer" @click="show = !show">
        点我查看答案 {{ show ? "⬆︎" : "⬇" }}
      </div>
      <div v-if="show">
        {{ detail.resolve }}
      </div>
    </div>
    <div class="py-[10px] border-b-[1px] border-[#666]"></div>
  </div>
</template>
