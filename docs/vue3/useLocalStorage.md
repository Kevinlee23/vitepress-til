# useLocalStorage

将 `localStorage` 作为 `ref` 对象使用，随着对象的修改，`localStorage` 修改

```vue
<script setup>
import { useLocalStorage } from "@vueuse/core";

// with inital
// bind with obj
const userInfo = useLocalStorage("userInfo", { username: "snowinlu", age: 27 });

// bind with boolean, returns Ref<boolean>
const flag = useLcalStorage("flag", true);

// bind with number, returns Ref<number>
const count = useLocalStorage("count", 0);
count.value++;

// remove localStorage
userInfo.value = undefined;
</script>
```
