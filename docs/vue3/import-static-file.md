# Vue3 中引入静态文件 (vite)

在 `vue3` 中引入静态文件的三种方法

## new URL

```js
// 必须是静态的, 不能够是变量, vite 不会进行转换
const imageUrl = new URL("../assets/images/pic-name.jpg", import.meta.url).href;
```

## import

```js
import imageName from "@/assets/images/pic-name.jpg";

// use img
```

### in style

```css
.imgDiv {
  background-image: url("../../assets/images/pic-name.jpg");
}
```
