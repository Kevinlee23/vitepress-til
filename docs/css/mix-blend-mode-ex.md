---
outline: deep
---

# 混合模式实例

## 混合模式可取值

```js
const modeValue = {
  /* 基础型混合模式 */
  'mix-blend-mode': normal,         // 正常

  /* 减色模式 */
  'mix-blend-mode': darken,         // 变暗
  'mix-blend-mode': multiply,       // 正片叠底
  'mix-blend-mode': color-burn,     // 颜色加深
  
  /* 加色模式 */
  'mix-blend-mode': lighten,         // 变亮
  'mix-blend-mode': screen,         // 滤色
  'mix-blend-mode': color-dodge,    // 颜色减淡
  
  /* 融合图像型混合模式 */
  'mix-blend-mode': overlay,        // 叠加
  'mix-blend-mode': soft-light,     // 柔光
  'mix-blend-mode': hard-light,     // 强光

  /* 变异图像型混合模式 */
  'mix-blend-mode': difference,     // 差值
  'mix-blend-mode': exclusion,      // 排除
  
  /* 色彩叠加型混合模式 */
  'mix-blend-mode': hue,            // 色相
  'mix-blend-mode': saturation,     // 饱和度
  'mix-blend-mode': color,          // 颜色
  'mix-blend-mode': luminosity,     // 亮度
  
  'mix-blend-mode': initial,
  'mix-blend-mode': inherit,
  'mix-blend-mode': unset,
}
```
<script setup>
import MixBlendModeOne from '../.vitepress/theme/components/example/mix-blend-mode-one.vue'
import MixBlendModeTwo from '../.vitepress/theme/components/example/mix-blend-mode-two.vue'
import MixBlendModeThree from '../.vitepress/theme/components/example/mix-blend-mode-three.vue'
</script>

## 壹 · 层叠优先级重叠

> 子元素底部有 border, 当想要让父元素的底部带通用的一条其他颜色的底边, 让父元素的底边和子元素的底边 border 同时显示

### 预览

<MixBlendModeOne/>

### 实现

```vue {35}
<script setup>
import { ref } from "vue";

const actve = ref("1");
const menu = ref([
  { id: "1", title: "博客" },
  { id: "2", title: "归档" },
  { id: "3", title: "友联" },
  { id: "4", title: "关于" },
]);
</script>

<template>
  <div class="mt-[20px]">
    <div class="menu-wrap w-fit flex gap-x-[4px]">
      <div
        v-for="item in menu"
        :index="item.id"
        class="p-[4px] bg-[#EEE] border-b-[2px] border-b-white hover:bg-[#fff] hover:border-b-black cursor-pointer menu-item "
        :class="{ 'bg-[#fff] !border-b-black': actve === item.id }"
        @click="actve = item.id"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-wrap {
  @apply relative;

  &::after {
    content: "";
    mix-blend-mode: darken;

    @apply absolute bottom-0 left-0 w-full h-[2px] bg-[#f0f1f2];
  }

  .menu-item {
    transition: background linear 300ms;
  }
}
</style>
```

## 贰 · 彩色二维码

### 预览

<MixBlendModeTwo />

### 实现

```vue
<script setup>
import QrCode from "../../assets/images/qr-code.png";
</script>

<template>
  <div class="img-wrap mt-[20px] w-[200px] h-[200px]">
    <img :src="QrCode" />
  </div>
</template>

<style lang="scss" scoped>
.img-wrap {
  @apply relative;

  &::after {
    @apply absolute inset-0;

    content: "";
    background: linear-gradient(45deg, #673ab7, #ff5722);
    mix-blend-mode: lighten;
  }
}
</style>

```

## 叁 · 抖音风格 glitch art

### 预览

<MixBlendModeThree />

### 实现

```vue
<script setup></script>

<template>
  <div class="flex gap-x-[20px]">
    <div class="img-1" />
    <div class="img-2" />
  </div>
</template>

<style lang="scss" scoped>
.img-1 {
  background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2874945695.jpg"),
    #0ff;
  background-size: cover;
  background-blend-mode: lighten;

  @apply relative w-[300px] h-[533px];

  &:after {
    content: "";

    @apply absolute ml-[10px] w-[300px] h-[533px];

    background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2874945695.jpg"),
      #f00;
    background-blend-mode: lighten;
    background-size: cover;
    mix-blend-mode: darken;
  }
}

.img-2 {
  background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2612429822.jpg"),
    #0ff;
  background-size: cover;
  background-blend-mode: lighten;

  @apply relative w-[300px] h-[533px];

  &:after {
    content: "";

    @apply absolute ml-[10px] w-[300px] h-[533px];

    background: url("https://snowinlu.oss-cn-beijing.aliyuncs.com/p2612429822.jpg"),
      #f00;
    background-blend-mode: lighten;
    background-size: cover;
    mix-blend-mode: darken;
  }
}
</style>

```