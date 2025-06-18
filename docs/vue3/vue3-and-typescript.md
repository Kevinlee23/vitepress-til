---
outline: deep
---

# vue3 中的类型标注

## props 类型标注

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string;
  bar?: number;
}>();
</script>
```

也可以从另一个源文件中引入：

```vue
<script setup lang="ts">
import type { Props } from "./foo";

const props = defineProps<Props>();
</script>
```

### props 解构默认值

```ts
export interface Props {
  msg?: string;
  labels?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  msg: "hello",
  labels: () => ["one", "two"],
});
```

### 复杂 prop 类型

```ts
import type { PropType } from "vue";

interface Book {
  title: string;
  author: string;
  year: number;
}

const props = defineProps({
  book: Object as PropType<Book>,
});
```

## ref 类型标注

```ts
import { ref } from "vue";

const year = ref<string | number>("2020");

year.value = 2020;
```

or

```ts
import { ref } from "vue";
import type { Ref } from "vue";

const year: Ref<string | number> = ref("2020");

year.value = 2020;
```

## reactive 类型标注

```ts
import { reactive } from "vue";

interface Book {
  title: string;
  year?: number;
}

const book: Book = reactive({ title: "Vue 3 指引" });
```

## computed 类型标注

```ts
import { ref, computed } from "vue";

const count = ref<number>(0);
const double = computed<number>(() => count.value);
```

## 模板引用类型标注

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";

const el = ref<HTMLInputElement | null>(null);

onMounted(() => {
  el.value?.focus();
});
</script>

<template>
  <input ref="el" />
</template>
```

## 组件模板引用

对于已知的 `custom` 组件，可以通过 `typeof` 得到其类型，再使用 `InstanceType` 工具类型来获取其实例类型

```vue
<!-- App.vue -->
<script setup lang="ts">
import MyModal from "./MyModal.vue";

const modal = ref<InstanceType<typeof MyModal> | null>(null);

const openModal = () => {
  modal.value?.open();
};
</script>
```

对于具体类型无法获得的情况，使用 `ComponentPublicInstance`

```ts
import { ref } from "vue";
import type { ComponentPublicInstance } from "vue";

const child = ref<ComponentPublicInstance | null>(null);
```

## emits 类型标注

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();

// 3.3+ shorter
const emit = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
</script>
```

## 事件处理函数类型标注

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value);
}
```

## vue-router

### 基本用法

```ts
// src/router/routes.ts

// 使用 `import type` 导入类型，这是一种最佳实践
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于我们'
    }
  }
];

export default routes;
```

然后在 `src/router/index.ts` 导入：

```ts
// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // routes 数组在这里被使用
});

export default router;
```

### 扩展元信息 meta

自定义 meta：

```ts
// src/router/typed-router.d.ts

// 必须导入 'vue-router'，以使其正常工作
import 'vue-router';

declare module 'vue-router' {
  // 扩展 RouteMeta 接口
  interface RouteMeta {
    title: string;          // 页面标题
    requiresAuth?: boolean; // 是否需要认证
    icon?: string;          // 菜单图标
    // ...可以添加更多自定义属性
  }
}
```