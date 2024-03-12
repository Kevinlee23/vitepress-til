# css 绑定 js 变量

```vue
<template>
  <div class="name">麓下雪</div>
</template>
<script setup>
import { ref } from "vue";
const color = ref("#f00"); // 红色
</script>
<style scoped lang="scss">
.name {
  background-color: v-bind(color); // JS 中的色值变量 #f00 就赋值到这来了
}
</style>
```
