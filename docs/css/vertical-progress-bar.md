# 纵轴进度条

![progress bar](/images/vertical-progress-bar.png)

## 实现一：滚动距离计算

`UI` 框架使用的是 `NavieUI`

:::code-group

```vue [app.vue]
<script setup>
import { ref, watch } from "vue";
import { useElementSize, useWindowScroll, useWindowSize } from "@vueuse/core";
import { NConfigProvider, NScrollbar, dateZhCN, zhCN } from "naive-ui";
import Scroll from "./views/scroll/index.vue";
import { useScrollStore } from "@/store/useScroll";

const scrollEl = ref(null);
const { setElement } = useScrollStore();

watch(scrollEl, (val) => {
  if (val)
    // 当 NScrollbar 组件的引用生成时, 使用 pinia 将 scroll 的节点存储
    setElement(scrollEl.value.scrollbarInstRef.containerRef);
});
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <!-- 将 scroll 事件下放到 NScrollbar 组件中 -->
    <div class="w-full h-[100vh] overflow-auto">
      <NScrollbar ref="scrollEl" class="w-full h-full">
        <div class="min-h-[100vh]">
          <Scroll />
        </div>
      </NScrollbar>
    </div>
  </NConfigProvider>
</template>
```

```vue [scroll.vue]
<script lang="js" setup>
import { computed, onMounted, ref } from 'vue'
import useVertialScroll from '@/hooks/use-vertial-scroll'
import { useScrollStore } from '@/store/useScroll'

const wrapEl = ref(null)
const scrollStore = useScrollStore()
const scrollEl = computed(() => scrollStore.scrollEl)

// 通过 hook 来计算滚动条高度
const { barHeight } = useVertialScroll(scrollEl, wrapEl)
</script>

<template>
  <!-- 这里假设滚动的页面高度为 2000px, 页面的高度为 993px -->
  <!-- 那么滚动差即为 (2000 - 993)px -->
  <div ref="wrapEl" class="flex h-[2000px]">
    <div class="w-[5px] h-full">
      <div
        class="fixed top-0 w-[5px] bg-[#ffd111]"
        :style="{ height: `${barHeight}px` }"
      />
    </div>
    <div class="flex-1">滚动内容</div>
  </div>
</template>
```

```js [useScroll.js]
import { ref, watch } from "vue";
import { useElementSize, useScroll, useWindowSize } from "@vueuse/core";

export default function useVertialScroll(scrollEl, wrapEl) {
  const { y: scrollY } = useScroll(scrollEl); // 滚动对象的y距
  const { height: windowH } = useWindowSize(); // 浏览器窗口的高度
  const { height: wrapH } = useElementSize(wrapEl); // 滚动内容的高度

  const barHeight = ref(0); // 计算得出的滚动块高度

  // 当滚动对象触发滚动事件, 或者滚动内容的高度变化时, 计算滚动块的高度
  watch([scrollY, wrapH], () => {
    const rat = scrollY.value / (wrapH.value - windowH.value);

    barHeight.value = rat * windowH.value;
  });

  return { barHeight };
}
```

:::

## 实现二：纯 css 实现方法

> 采用滚动驱动动画 (`Scroll-driven Animations`): `animation-timeline`

:::code-group

```vue [app.vue]
<template>
  <div class="w-full h-[100vh] overflow-auto">
    <NScrollbar ref="scrollEl" class="c-scroll w-full h-full">
      <div class="min-h-[100vh]">
        <RouterView />
      </div>
    </NScrollbar>
  </div>
</template>

<style lang="scss">
// 由于 animation-timeline 默认情况下只能使用 nearest | root | self ...
// 所以要自定义元素, 需要配合 scroll-timeline-name
.c-scroll {
  .n-scrollbar-container {
    scroll-timeline-name: --my-custom-timeline;
  }
}
</style>
```

```vue [scroll.vue]
<template>
  <div class="relative">
    <div class="scrollElement" />
    <h1>不可思议的纯 CSS 进度条效果</h1>
    <p v-for="i in 100" :key="i">不可思议的纯 CSS 进度条效果</p>
  </div>
</template>
<style lang="scss" scoped>
@keyframes scale {
  0% {
    height: 0px;
  }
  100% {
    height: 100%;
  }
}

.scrollElement {
  @apply fixed top-[0px] w-[5px] bg-[#ffdd11];

  animation: scale 3s linear;
  animation-timeline: --my-custom-timeline; // 使用预先自定义的元素
  transform-origin: 0 50%;
}
</style>
```

:::

## 实现效果

![Alt text](/images/vertical-progress-bar-result.png)
