# 图层显隐效果

> filter + mask

```vue
<script setup>
import { useMouseInElement } from '@vueuse/core'

const wrapEl = ref(null)
// 使用 vueuse 类库 追踪鼠标的移动
const { x, y } = useMouseInElement(wrapEl.value)
</script>

<template>
  <div class="relative w-full bg-black">
    <div ref="wrapEl" class="pt-[80px] w-[1600px] mx-auto">
      <div class="w-full h-[436px] bg-mask">
        <div class="absolute top-0 left-0 w-full h-full z-[5] bg-noise" />
        <div class=" bg-transform" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-mask {
  // 蒙版图片
  mask-image: url(/src/assets/image/payload.svg);
  mask-size: cover;
  mask-repeat: no-repeat;
  transition: all 1s cubic-bezier(.165,.84,.44,1);
  transform-origin: bottom;
}

.bg-noise {
  // 噪点图片
  background: url(/src/assets/image/noise.png);
}

.bg-transform {
  --mouse-x: v-bind(x);
  --mouse-y: v-bind(y);

  width: 70rem;
  height: 70rem;
  position: absolute;
  filter: blur(100px);
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  transition: opacity 1s cubic-bezier(.165,.84,.44,1);
  // 图层显示的区域
  transform: translate3d(calc(var(--mouse-x, -100%)* 1px - 35rem), calc(var(--mouse-y, -100%)* 1px - 35rem), 0);
  // 显示颜色
  background: radial-gradient(circle at center, hsla(0, 0%, 100%, .2), hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, 0));
}
</style>
```

展示效果:

![filter-mask](/images/filter-mask.gif)

摘抄自 [payloadcms.com](https://payloadcms.com/)