# 使用组合式函数来缓存数据

简单的例子：`缓存滚动容器`

:::code-group

```vue [hook]
<script setup>
import { ref } from "vue";

// 将缓存的数据写在组合式函数外面
const scrollEl = ref(null);

export const usePageScroll = () => {
  const setScrollEl = (el) => {
    scrollEl.value = el;
  };

  return { scrollEl, setScrollEl };
};
</script>
```

```vue [entry]
<script setup>
const scrollEl = ref(null);
const { setScrollEl } = usePageScroll();

watch(scrollEl, () => {
  if (scrollEl.value) {
    setScrollEl(scrollEl.value);
  }
});
</script>
```

```vue [use]
<script setup>
const { scrollEl } = usePageScroll();

const { arrivedState } = useScroll(scrollEl);
const { bottom } = toRefs(arrivedState);
watch(bottom, () => {
  if (bottom.value) {
    // logic...
  }
});
</script>
```

:::
