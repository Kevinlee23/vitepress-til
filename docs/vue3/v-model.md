---
outline: deep
---

# v-model

vue3 支持多个 v-model, 修改 props 使用 `$emit('update:model')`

## 框架中使用

### update:model

:::code-group

```vue [father.vue]
<template>
  <child v-model:name="name" v-model:age="age"></child>
</template>
<script setup>
const name = ref("luxiaxue");
const age = ref(26);
</script>
```

```vue [child.vue]
<script setup>
const props = defineProps({ name: String, age: Number });
const emit = defineEmits(['update:name', 'update:age']);

// 修改入参 props.name
const handleNameChange = () => {
  emit('update:name', 'lixiuxian')
}
<scirpt>
```

:::

### 使用计算属性 computed 来简化

`Child.vue`

```vue
<script setup>
const props = defineProps({ name: String, age: Number });
const emit = defineEmits(["update:name", "update:age"]);

const model = computed({
  get() {
    return props.name;
  },
  set(val) {
    emit("update:name", val);
  },
});

const handleNameChange = () => {
  model.value = "lixiuxian";
};
</script>
```

## 使用类库 vue-use 究极简化

```vue
<script setup>
import { useVModel, useVModel } from "@vueuse/core";

const props = definePrpos({
  foo: String,
  bar: Number,
  zbb: Boolean,
});

const fooModel = useVModel(props, 'foo' emit);
const { barModel, zbbModel } = useVmodels(props, emit);

console.log(fooModel.value, barModel) // props.foo, props.bar
zbbModel.value = false // emit('updata:zbb', false)
</script>
```
