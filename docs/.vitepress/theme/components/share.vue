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
    `${window.location.host}/vitepress-til/s?u=${shortUrl}`
  );
  text.value = "复制成功";
  timer = setTimeout(() => {
    text.value = "复制短链接";
  }, 2000);
};
</script>
<template>
  <div class="btn" @click="handleCopy">{{ text }}</div>
</template>
<style lang="scss" scoped>
.btn {
  width: fit-content;
  margin-left: 10px;
  padding: 8px 16px;

  font-size: 14px;
  line-height: 18px;
  color: white;
  background-color: #407d53;
  border-radius: 4px;
  cursor: pointer;
}
</style>
