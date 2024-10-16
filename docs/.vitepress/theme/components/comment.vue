<template>
  <div v-if="showFlag" id="comment-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

const showFlag = ref(true);
const gitDefault = {
  clientID: "Ov23li60QSciq9KaehKQ",
  clientSecret: "1ff63abbe933dc252b24df9982e9de001391aa96",
  repo: "vitepress-til",
  owner: "Kevinlee23",
  admin: ["Kevinlee23"],
  id: location.pathname.substring(0, 50),
  language: "zh-CN",
};

onMounted(() => {
  nextTick(() => {
    const gitalk = new Gitalk(gitDefault);
    gitalk.render("comment-container");
  });
});
</script>
