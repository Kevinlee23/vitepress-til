# css 绑定 js 变量

`normal`: 直接使用 `v-bind`

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

需要进行`cacl`计算: 找一个中间值

```vue
<template>
  <div class="container">
    <!-- 内容 -->
  </div>
</template>
<script setup>
import { ref } from "vue";

const width = ref("50%");
</script>

<style scoped>
.container {
  --container-width: v-bind(width);
  width: calc(var(--container-width) + 20px);
}
</style>
```
