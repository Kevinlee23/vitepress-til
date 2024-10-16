<template>
  <div id="comment-container"></div>
</template>

<script lang="ts" setup>
import { onContentUpdated, useData } from "vitepress";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import md5 from "blueimp-md5";

function deleteChild(element: HTMLDivElement | null) {
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}

const { frontmatter } = useData();
onContentUpdated(() => {
  const gitDefault = {
    clientID: "Ov23li60QSciq9KaehKQ",
    clientSecret: "1ff63abbe933dc252b24df9982e9de001391aa96",
    repo: "vitepress-til",
    owner: "Kevinlee23",
    admin: ["Kevinlee23"],
    id: md5(location.pathname),
    language: "zh-CN",
  };

  const element: HTMLDivElement | null =
    document.querySelector("#comment-container");
  if (!element) {
    return;
  }

  deleteChild(element);

  if (!(frontmatter as unknown as { [key: string]: any, noComment: string }).value.noComment) {
    
    const gitalk = new Gitalk(gitDefault);
    gitalk.render("comment-container");
  }
});
</script>
