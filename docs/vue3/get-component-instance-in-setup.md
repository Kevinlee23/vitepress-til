# 拿到组件实例
某些情况下，我们需要获取组件的实例，例如：`qiankun` 的子应用中，我们想要调用基座应用中共享的方法时

:::code-group

```typescript [main.ts]
import root from "./App.vue";

function render(props: { container: Element | string; utils: any }) {
  const { container, utils } = props;

  instance = createApp(root);
  instance.use(router).use(store);

  // 父级下发的方法挂载全局
  instance.config.globalProperties.parentUtils = utils;

  instance.mount(
    container instanceof Element
      ? (container.querySelector("#app") as Element)
      : (container as string)
  );
}
```

```vue [a.vue]
<script setup>
import { getCurrentInsatance } from "vue";
const instance = getCurrentInstance();
const parentUtils = instance.appContext.config.globalProperties.parentUtils;
parentUtils.someMethod();
</script>
```

:::
