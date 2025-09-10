<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import image01 from "../assets/images/1.svg";
import image02 from "../assets/images/2.svg";
import image03 from "../assets/images/3.svg";
import image04 from "../assets/images/4.svg";
import image05 from "../assets/images/5.svg";
import image06 from "../assets/images/6.svg";
import image07 from "../assets/images/7.svg";
import image08 from "../assets/images/8.svg";
import image09 from "../assets/images/9.svg";
import image10 from "../assets/images/10.svg";
import image11 from "../assets/images/11.svg";
import image12 from "../assets/images/12.svg";

const now: Date = new Date();
const monthList: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let fullYear = ref(365);
const today = computed(() => now.getHours());
const week = computed(() => now.getDay());
const date = computed(() => now.getDate());
const month = computed(() => now.getMonth());
const year = computed(() => now.getFullYear());
const pastDay = computed(() => {
  let day = 0;
  for (let i = 0; i < month.value; i++) {
    day += monthList[i];
  }

  return day + date.value;
});

const baseYear = ref(2020);
const yearIcons = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
];
const currentIcon = computed(
  () => yearIcons[(year.value - baseYear.value) % 12]
);

onMounted(() => {
  const isLeap =
    (year.value % 4 === 0 && year.value % 100 !== 0) || year.value % 400 === 0;
  if (isLeap) {
    monthList[1] += 1;
    fullYear.value += 1;
  }
});
</script>

<template>
  <footer>
    <div class="w-full flex justify-center">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-x-[10px] mb-[4px]"
      >
        <div class="flex items-center">
          {{ year }}( <img class="w-[24px] h-[24px]" :src="currentIcon" />)
        </div>
        <div class="w-full group/today hidden sm:block">
          <div class="group-hover/today:hidden">
            今日 {{ ((today / 24) * 100).toFixed(2) }}%
          </div>
          <div class="hidden group-hover/today:block">
            还剩{{ 24 - today }}小时
          </div>
        </div>
        <div class="group/week hidden md:block">
          <div class="group-hover/week:hidden">
            本周 {{ week === 0 ? "100" : ((week / 7) * 100).toFixed(2) }}%
          </div>
          <div class="hidden group-hover/week:block">
            还剩 {{ week === 0 ? 0 : 7 - week }}天
          </div>
        </div>
        <div class="group/month hidden md:block">
          <div class="group-hover/month:hidden">
            本月 {{ ((date / monthList[month]) * 100).toFixed(2) }}%
          </div>
          <div class="hidden group-hover/month:block">
            还剩 {{ monthList[month] - date }}天
          </div>
        </div>
        <div class="group/year hidden md:block">
          <div class="group-hover/year:hidden">
            本年 {{ ((pastDay / fullYear) * 100).toFixed(2) }}%
          </div>
          <div class="hidden group-hover/year:block">
            还剩 {{ fullYear - pastDay }}天
          </div>
        </div>
      </div>
    </div>

    <div class="px-[10px] text-wrap">
      Powered by
      <a href="https://github.com/Kevinlee23" target="_blank" title="作者">
        Snowinlu
      </a>
      | Copyright © 2024- | MIT License
    </div>
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
