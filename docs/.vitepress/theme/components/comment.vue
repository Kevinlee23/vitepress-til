<template>
  <div id="comment-container"></div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useData, useRouter } from "vitepress";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import md5 from "blueimp-md5";
import { onMounted } from "vue";

const deleteChild = (element: HTMLDivElement | null) => {
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
};

const renderComment = () => {
  const gitDefault = {
    clientID: "Ov23li60QSciq9KaehKQ",
    clientSecret: "1ff63abbe933dc252b24df9982e9de001391aa96",
    repo: "vitepress-til",
    owner: "Kevinlee23",
    admin: ["Kevinlee23"],
    id: md5(location.pathname),
    language: "zh-CN",
  };

  if (
    !(frontmatter as unknown as { [key: string]: any; noComment: string }).value
      .noComment
  ) {
    const gitalk = new Gitalk(gitDefault);
    gitalk.render("comment-container");
  }
};

const { frontmatter } = useData();
const { route } = useRouter();

watch(route, () => {
  const element: HTMLDivElement | null =
    document.querySelector("#comment-container");
  if (!element) {
    return;
  }

  deleteChild(element);

  renderComment();
});
onMounted(() => {
  renderComment();
});
</script>
