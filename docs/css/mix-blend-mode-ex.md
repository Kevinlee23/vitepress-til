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
import MixBlendModeFour from '../.vitepress/theme/components/example/mix-blend-mode-four.vue'
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

## 肆 · 故障效果

> 使用: 混合模式，滤镜，位移和遮罩完成

### 预览

<MixBlendModeFour />

### 实现

```vue
<script setup></script>

<template>
  <div class="w-full relative mt-[20px] bg-black h-[200px]">
    <div
      class="glitch-art absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[60px] text-white"
      data-word="404"
    >
      404
      <div class="white" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes whiteMove {
  8% {
    top: 90px;
  }
  14% {
    top: 12px;
  }
  20% {
    top: 42px;
  }
  32% {
    top: 2px;
  }
  99% {
    top: 90px;
  }
}

@keyframes redShadow {
  20% {
    height: 80px;
  }
  60% {
    height: 12px;
  }
  100% {
    height: 90px;
  }
}

@keyframes redHeight {
  20% {
    height: 90px;
  }
  35% {
    height: 24px;
  }
  50% {
    height: 40px;
  }
  60% {
    height: 36px;
  }
  70% {
    height: 24px;
  }
  80% {
    height: 12px;
  }
  100% {
    height: 0px;
  }
}

.white {
  position: absolute;
  left: -10px;
  width: 100%;
  height: 4px;
  background: #000;
  z-index: 4;
  animation: whiteMove 3s ease-out infinite;
}

.glitch-art {
  &::before {
    content: attr(data-word);
    animation: redShadow 1s ease-in infinite;
    filter: contrast(200%);
    text-shadow: 1px 0 0 red;

    @apply absolute top-0 left-[0.5px] h-0 text-[rgba(255,255,255,0.9)] overflow-hidden z-[2];
  }

  &::after {
    content: attr(data-word);
    animation: redHeight 1.5s ease-out infinite;
    filter: contrast(200%);
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: darken;

    @apply absolute top-0 left-[-3px] h-[60px] text-[rgba(255,255,255,0.8)] overflow-hidden z-[3] bg-[rgba(0,0,0,0.9)];
  }
}
</style>
```