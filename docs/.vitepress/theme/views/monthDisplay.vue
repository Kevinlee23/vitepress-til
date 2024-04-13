<script lang="ts" setup>
import { onMounted } from "vue";
import useMonthCompute from "../hooks/use-month-compute";

const props = defineProps({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  length: { type: Number, required: true },
  markedDate: { type: Array<number>, required: true },
});

const { monColor, monthInit } = useMonthCompute(
  props.year,
  props.month,
  props.length
);

onMounted(() => {
  monthInit(props.markedDate);
});
</script>

<template>
  <div class="block-container">
    <div
      v-for="(item, index) in monColor(props.markedDate)"
      :key="index"
      class="block"
      :style="{ backgroundColor: item.color }"
      :title="`日期: ${item.text}; 笔记数: ${item.num}`"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.block-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  max-width: 92px;
  margin-bottom: 16px;
}

.block {
  width: 12px;
  height: 12px;
  border-radius: 2.5px;
  cursor: pointer;

  &:hover {
    border-width: 1px;
    border-color: #000;
    border-style: solid;
  }
}
</style>
