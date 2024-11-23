---
outline: deep
---

# 两种锚点定位

## 一、 hook + scrollIntoView

> scrollIntoView, store

:::code-group

```vue [index]
<script setup>
import ItemContent from "./item-content.vue";
import { useAnchorStore } from "@/store/useAnchor";

const textList = ref([
  "javascript",
  "vue",
  "react",
  "flutter",
  "ui",
  "boke",
  "系统设计",
]);
const store = useAnchorStore();

function handleClick(index) {
  store.setAnchorId(index);
}
</script>

<template>
  <div class="relative p-[20px]">
    <div class="flex items-center fixed top-[0px] z-10">
      <div>快速定位</div>
      <div class="flex gap-x-[20px] ml-[48px]">
        <div
          v-for="(item, index) in textList"
          :key="index"
          class="anchor-point"
          @click="handleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="mt-[30px] grid gap-4 grid-cols-2">
      <ItemContent
        v-for="(item, index) in textList"
        :id="index"
        :key="index"
        :text="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-point {
  cursor: pointer;
  @apply w-fit p-[4px] rounded-md;

  &:hover {
    @apply bg-[#3170a7] text-white;
  }
}

.content-box {
  @apply min-h-[400px] p-[10px] bg-white rounded-lg;
}
</style>
```

```vue [item-content]
<script setup>
import { useAnchorStore } from "@/store/useAnchor";

const props = defineProps({
  text: { type: String },
  id: { type: Number },
});

const store = useAnchorStore();
const currentId = computed(() => {
  return store.anchorId;
});

const contentEl = ref();

const flashActive = ref(false);
watch(currentId, () => {
  if (currentId.value === props.id) {
    flashActive.value = true;
    nextTick(() => {
      contentEl.value.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    setTimeout(() => {
      flashActive.value = false;
    }, 2000);
  }
});
</script>

<template>
  <div class="content-box" :class="{ 'stroke-flash': flashActive }">
    <div class="text-[20px]">
      {{ text }}
    </div>
    <div ref="contentEl" class="anchor" />
  </div>
</template>

<style lang="scss" scoped>
.content-box {
  @apply relative min-h-[400px] p-[10px] bg-white rounded-lg border-[1px] border-white;
}

.anchor {
  @apply absolute -top-[177px] left-0 w-[20px] h-[5px];
}

@keyframes strokeFlash {
  0%,
  100% {
    border-color: transparent;
  }

  50% {
    border: 1px solid #246fe5;
  }
}

.stroke-flash {
  /* 动画名称、动画时长、缓入缓出效果、循环次数 */
  border-radius: 12px;
  animation: strokeFlash 1100ms ease-in-out 2;
}
</style>
```

```js [useAnchor]
import { defineStore } from "pinia";

export const useAnchorStore = defineStore("anchor", {
  state: () => ({
    anchorId: null,
  }),
  actions: {
    setAnchorId(id) {
      this.anchorId = id;
    },
  },
});
```

:::

效果:

![image-01](/images/anchor-01.gif)

## 二、 纯 CSS - (view-timeline, animation-timeline)

```vue
<script setup>
const textList = ref([
  { title: "javascript", id: 1, scope: "--t1" },
  { title: "vue", id: 2, scope: "--t2" },
  { title: "react", id: 3, scope: "--t3" },
  { title: "flutter", id: 4, scope: "--t4" },
  { title: "ui", id: 5, scope: "--t5" },
  { title: "boke", id: 6, scope: "--t6" },
  { title: "系统设计", id: 7, scope: "--t7" },
]);

const scopes = computed(() => {
  const arr = [];
  textList.value.map((item) => {
    arr.push(item.scope);

    return item;
  });

  return arr.join(",");
});

const navEls = ref(null);

function handleNav(index) {
  // 跳转
  navEls.value[index].scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div
    class="anchor-body relative p-[20px] w-[50%]"
    :style="{ 'timeline-scope': scopes }"
  >
    <div class="fixed right-16 top-4 p-2 border-[1px] border-black rounded-md">
      <div
        v-for="(item, index) in textList"
        :key="item.id"
        class="nav-title cursor-pointer"
        :style="{ '--scope': item.scope }"
        @click="handleNav(index)"
      >
        {{ item.title }}
      </div>
    </div>

    <div
      v-for="item in textList"
      :key="item.id"
      class="content w-full"
      :style="{ '--scope': item.scope }"
    >
      <div ref="navEls" class="font-bold">
        {{ item.title }}
      </div>
      <div class="w-full grid grid-cols-6 gap-[10px]">
        <div
          v-for="block in 5"
          :key="block"
          class="col-span-2 h-[200px] bg-[#333]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  view-timeline-name: var(--scope);
  view-timeline-inset: 10% 90%;
}

.nav-title {
  animation: active;
  animation-timeline: var(--scope);
}

@keyframes active {
  0%,
  100% {
    background-color: #000;
    color: #fff;
  }
}
</style>
```

效果：

![iamge-02](/images/anchor-02.gif)

### 适用性

animation-timeline:

![animation-timeline](/images/caniuse(animation-timeline).png)

view-timeline:

![view-timeline](/images/caniuse(view-timeline).png)