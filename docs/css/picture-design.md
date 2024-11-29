---
outline: deep
---

# 图片设计

## 带链接跳转的图片元素

### 预览

normal

![picture-1](/images/picture-design-1.png)

hover

![picture-2](/images/picture-design-2.png)

### 实现

```vue
<script setup>
import { NIcon, NImage } from "naive-ui";
import { ExternalLinkAlt } from "@vicons/fa";

const props = defineProps({
  picUrl: { type: String, required: true },
  picContent: { type: String, default: "" },
  link: { type: String, default: "" },
});

function handleNav() {
  window.open(props.link);
}
</script>

<template>
  <div class="p-[20px]">
    <div class="w-[300px] relative group/item">
      <NImage
        class="w-[300px] h-[300px] rounded-2xl"
        :src="picUrl"
        :preview-disabled="true"
      />
      <NIcon
        v-if="link"
        class="absolute top-[10px] right-[10px] cursor-pointer invisible group-hover/item:visible"
        color="#003153"
        :size="30"
      >
        <ExternalLinkAlt @click="handleNav" />
      </NIcon>
      <div
        v-if="picContent"
        class=" absolute bottom-[20px] left-[10px] w-[150px] truncate bg-[#003153] text-white px-[5px] rounded-[5px] invisible group-hover/item:visible"
      >
        {{ picContent }}
      </div>
    </div>
  </div>
</template>
```
