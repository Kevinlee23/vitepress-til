<script lang="ts" setup>
import { ref } from "vue";
import { long2short } from "../../utils/shortUrl";

const text = ref("复制短链接");

let timer: any;
const handleCopy = () => {
  clearTimeout(timer);

  const path = window.location.pathname;
  const key = decodeURI(path).replace("/vitepress-til", "");
  const shortUrl = long2short[key];

  navigator.clipboard.writeText(
    `${window.location.host}/s?u=${shortUrl}`
  );
  text.value = "复制成功";
  timer = setTimeout(() => {
    text.value = "复制短链接";
  }, 2000);
};
</script>
<template>
  <div class="copy-button group/item" @click="handleCopy">
    {{ text }}
    <span class="copy-icon">🔗</span>
  </div>
</template>
<style lang="scss" scoped>
.copy-button {
  @apply w-fit ml-[8px] p-[8px] text-[14px]/[18px] rounded-[4px] cursor-pointer;
  .copy-icon {
    @apply hidden;
  }
  &:hover {
    .copy-icon {
      @apply inline-block;
    }
  }
}
</style>
