# 全局挂载属性，方法

:::code-group

```js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.name = "麓下雪"; // 挂载全局属性
// 挂载全局方法
app.config.globalProperties.sayHello = (name) => {
  console.log(`hello, ${name}`);
};
```

```vue
<script setup>
const { proxy, appContext } = getCurrentInstance();
const global = appContext.config.globalProperties;

console.log(global.name); // 麓下雪
console.log(global.sayHello(global.name)); // hello, 麓下雪
</script>
```

:::
