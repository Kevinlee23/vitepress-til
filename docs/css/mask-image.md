# 给图片加上阴影遮罩

## 预览

`从右向左`

<img class="left" src="/images/56-250x250.jpg">

`从下到上`

<img class="top" src="/images/287-250x250.jpg">

<style lang="scss" scoped>
img {
  --s: 200px; /* the image size */
  
  width: var(--s);
  height: var(--s); 
  box-sizing: border-box;
  object-fit: cover;
  background-blend-mode: luminosity; 
  transition: .5s;
  cursor: pointer;
}

img.left {
  object-position: right;
  padding-left: var(--s);
  background: url("/images/56-250x250.jpg") 50%/cover #000;
}

img.top {
  object-position: bottom;
  padding-top: var(--s);
  background: url("/images/287-250x250.jpg") 50%/cover #000;
}

img:hover {
  padding: 0;
}
</style>

## 实现

```vue
<template>
  <img class="left" src="/images/56-250x250.jpg" />
  <img class="top" src="/images/287-250x250.jpg" />
</template>

<style lang="scss" scoped>
img {
  --s: 200px; /* the image size */

  width: var(--s);
  height: var(--s);
  box-sizing: border-box;
  object-fit: cover;

  /* 阴影mask */
  background-blend-mode: luminosity;

  transition: 0.5s;
  cursor: pointer;
}

img.left {
  /* 从右向左恢复颜色 */
  object-position: right;
  padding-left: var(--s);

  /* 阴影mask */
  background: url("/images/56-250x250.jpg") 50% / cover #000;
}

img.top {
  object-position: bottom;
  padding-top: var(--s);

  /* 阴影mask */
  background: url("/images/287-250x250.jpg") 50% / cover #000;
}

img:hover {
  padding: 0;
}
</style>
```
