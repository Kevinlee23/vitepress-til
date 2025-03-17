# useEventListener

快速订阅事件，并且在组件卸载时自动销毁

```js
import { useEventListener } from '@vueuse/core'

useEventListener(document, 'visibilitychange', (evt) => {
  console.log(evt)
})
```

如果在 ssr 中使用可能会遇到类似于：`document is not defined` 的问题，在 onMounted 中使用：

```js
// onMounted will only be called in the client side, so it guarantees the DOM APIs are available.
onMounted(() => {
  useEventListener(document, 'keydown', (e) => {
    console.log(e.key)
  })
})
```