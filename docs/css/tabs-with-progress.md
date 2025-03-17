# 实现带进度条的 tabs

## 预览

![picture-1](/images/tabs-01.gif)

## 实现

:::code-group

```html [index.html]
<div class="flex gap-x-[20px]">
  <div class="w-[384px]">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="p-[10px] mb-[30px] text-[#a1a1aa] cursor-pointer border-[1px] border-[#a1a1aa] hover:border-white"
      :class="[active === index ? activeClass : '']"
      @click="handleSwitch(index)"
    >
      <div class="mb-[10px] text-[18px]">{{ item.title }}</div>
      <div class="mb-[10px] text-[16px]">{{ item.content }}</div>
      <div class="w-fit text-[14px]">Learn more -></div>
    </div>
  </div>
  <div class="flex-1 relative">
    <div class="process-top transition-all" :style="{ width: `${percent}%` }" />
    <img class="w-full h-[400px]" :src="tabList[active].image" />
  </div>
</div>
```

```css [index.css]
.process-top {
  background: linear-gradient(90deg, #407cff, #da8bff, #fb7185);
  content: "";
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
```

```vue [utils.js]
<script setup>
import { ref, watch, onUnmounted } from "#imports";
import image1 from "@/assets/image/image-1.jpg";
import image2 from "@/assets/image/image-2.jpg";
import image3 from "@/assets/image/image-3.jpg";

const active = ref(0);
const percent = ref(0);
const activeClass = ref("!text-white !border-white");
const tabList = [
  // ...
];

const timer = ref(false);
const timeCalc = () => {
  timer.value = setInterval(() => {
    // 这里按照具体展示时间来将时间刻度切细，e.g.: 6s
    const temp = percent.value + Number(((1 / 6) * 10).toFixed(2));
    if (temp > 100) {
      percent.value = 100;
    } else {
      percent.value = temp;
    }

    if (percent.value === 100) {
      clearInterval(timer.value);
    }
  }, 100);
};
const handleSwitch = (index) => {
  if (index === active.value) return;
  clearInterval(timer.value);
  percent.value = 0;
  active.value = index;
  setTimeout(() => {
    timeCalc();
  }, 200);
};

// 进度条 100% 后自动切换下一个
watch(percent, () => {
  if (percent.value === 100) {
    percent.value = 0;
    active.value = active.value + 1 > tabList.length - 1 ? 0 : active.value + 1;
    setTimeout(() => {
      timeCalc();
    }, 200);
  }
});

timeCalc();

// 组件卸载后自动清除定时器
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
```
