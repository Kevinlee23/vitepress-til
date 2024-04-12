<template>
  <div class="jump-link-container">
    <div class="center">正在跳转中...</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { short2long } from "../../utils/shortUrl";

function getQueryParam(param: string) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == param) {
      return pair[1];
    }
  }
  return false;
}

onMounted(() => {
  const shortUrl = getQueryParam("u");

  if (!shortUrl) {
    return;
  } else {
    setTimeout(() => {
      window.location.href = "/vitepress-til" + short2long[shortUrl];
    }, 4000);
  }
});
</script>
<style scoped>
.jump-link-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  text-align: center;
}
</style>
