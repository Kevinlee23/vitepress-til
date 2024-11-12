<script lang="ts" setup>
import { ref } from "vue";

type Commit = {
  author: { date: string };
  message: string;
  url: string;
};
type CAuthor = {
  login: string;
  avatar_url: string;
  id: string;
  date: string;
};
type GitItem = {
  commit: Commit;
  author: CAuthor;
  html_url: string;
};

const list = ref<Array<GitItem> | null>(null);

fetch("https://api.github.com/repos/Kevinlee23/vitepress-til/commits")
  .then((res) => {
    return res.json();
  })
  .then((res: Array<GitItem>) => {
    list.value = res.slice(0, 10);
  });
</script>

<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="flex items-center gap-x-[10px] mt-[20px]"
    >
      <div
        :style="{
          width: '24px',
          height: '24px',
          borderRadius: '999px',
          backgroundSize: 'cover',
          backgroundImage: `url(${item.author.avatar_url})`,
        }"
      ></div>
      <div class="flex flex-col gap-y-[4px]">
        <div>- {{ item.author.login }}</div>
        <a class="w-fit cursor-pointer" :href="item.html_url">
          - {{ item.commit.message }}
        </a>
        <div class="text-[14px]">- {{ new Date(item.commit.author.date) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
