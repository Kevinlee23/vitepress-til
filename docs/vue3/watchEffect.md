# watchEffect

`watchEffect` 是传入一个立即执行函数，默认第一次就会执行，且不需要传入监听内容，会自动收集函数内的数据源作为依赖，当依赖发生变化时会重新执行函数

```vue
<script setup>
watchEffect(() => {
  // 会自动收集函数内使用到的属性作为依赖, 进行监听
  // 监听的是 userInfo.name 属性， 不会监听 userInfo
  console.log(userInfo.name);
});

watchEffect(
  () => {
    console.log("empty");
  },
  {
    flush: "pre", // 'pre' | 'post' | 'sync' 默认: 'pre'
    onTrack: (e) => {
      debugger;
    },
    onTrigger: (e) => {
      debugger;
    },
  }
);
</script>
```

部分时候使用 watchEffect 替代 watch，代码会简洁很多

```vue
<script setup>
const todoId = ref(1);
const data = ref(null);

watch(
  todoId,
  async () => {
    const res = await fetch(`xxx/${todoId.value}`);
    data.value = await res.json();
  },
  { immediate: true }
);
</script>
```

可以替换为:

```vue
<script setup>
watchEffect(async () => {
  const response = await fetch(`xxx/${todoId.value}`);
  data.value = await response.json();
});
</script>
```
