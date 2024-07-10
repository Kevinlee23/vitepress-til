# useImage

手动获取 `image` 对象

```vue
<script setup>
import { useImage } from "@vueuse/core";

onMonunted(async () => {
  let src = "...";
  const { execute } = useImage({ src });
  let imgLoading = await execute();
  if (imgLoading === undefined) {
    imgLoading = new Image();
  }

  // 获取 image 的长宽进一步使用
  const srcWidth = imgLoading?.width;
  const srcHeight = imgLoading?.height;

  // other logic...
});
</script>
```
