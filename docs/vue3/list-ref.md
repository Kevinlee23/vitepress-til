# 在列表中批量管理 ref

```vue
<template>
  <div>
      <div v-for="item in list" :key="item.id" :ref="(el) => handleEl(item, el)">
        {{ item.content }}
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
  { id: 1, content: '这是第一段', el: null },
  { id: 2, content: '这是第二段', el: null },
  { id: 3, content: '这是第三段', el: null },
  { id: 4, content: '这是第四段', el: null },
])

const handleEl = (item, el) => {
  item.el = el
  
  // do some special in element
  // ...
}
</script>
```