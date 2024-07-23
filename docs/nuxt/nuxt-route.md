# nuxt 路由

## 动态路由

`/products/[id].vue` 匹配:
- `/products/1`
- `/products/2`
- `/products/3`
- ...

`id = $route.params.id`

or

`/user-[group]/[id].vue`

- `group = $route.params.group`;
- `id = $route.params.id`

## 可选参数

`/search/[type]/[[key]].vue`

可以匹配:
- `/search/product/123`
- `/search/product`
- ...

## 嵌套路由

```txt
--| prodcut
---| type
------| index.vue
---| type.vue
```


`product/type`
```vue
<template>
  <div>
    <!-- Render type/index.vue -->
    <nuxt-page />
    <!-- Other -->
    <div>...</div>
  </div>
</template>
```