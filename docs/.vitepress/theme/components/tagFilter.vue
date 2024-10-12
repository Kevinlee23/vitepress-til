<script lang="ts" setup>
defineProps({ filterTag: { type: String, default: "" } });
const emit = defineEmits(["update"]);

const filter = [
  { text: "BETA", color: "#915930" },
  { text: "MERGED", color: "#b8272c" },
  { text: "UPDATED", color: "#2c9678" },
];
const handleFilter = (value: string) => {
  emit("update", value);
};
</script>

<template>
  <div class="bg-[#eee] p-[20px]">
    <div class="mb-[8px]">Filter</div>
    <div class="flex flex-row items-center gap-x-[10px]">
      <div
        v-for="(item, index) in filter"
        :key="index"
        class="px-[8px] py-[4px] text-white rounded-[999px] cursor-pointer"
        :class="{ 'border-[2px] border-black': filterTag === item.text }"
        :style="{ backgroundColor: item.color }"
        @click="handleFilter(item.text)"
      >
        {{ item.text }}
      </div>
      <div
        v-if="filterTag"
        class="cursor-pointer hover:border-b-black hover:border-b-[1px]"
        @click="handleFilter('')"
      >
        Clear
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
