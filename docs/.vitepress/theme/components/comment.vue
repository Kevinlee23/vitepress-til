<template>
  <div v-if="showFlag" id="comment-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import md5 from "blueimp-md5";

const showFlag = ref(true);
const gitDefault = {
  clientID: "Ov23li60QSciq9KaehKQ",
  clientSecret: "1ff63abbe933dc252b24df9982e9de001391aa96",
  repo: "vitepress-til",
  owner: "Kevinlee23",
  admin: ["Kevinlee23"],
  id: md5(location.pathname),
  language: "zh-CN",
};

onMounted(() => {
  nextTick(() => {
    const gitalk = new Gitalk(gitDefault);
    gitalk.render("comment-container");
  });
});
</script>
