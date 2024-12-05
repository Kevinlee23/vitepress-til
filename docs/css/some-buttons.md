---
outline: deep
---

# 一些按钮

## 壹

### 预览

<div class="one-hover-animation">
  Try it free
</div>

### 实现

```scss
.one-hover-animation {
  transition: all 0.4s;
  display: inline-block;
  width: fit-content;
  position: relative;
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  border-width: 4px;
  border-style: solid;
  border-color: black;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    width: 0px;
    z-index: -1;
    background: black;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }
  &:hover {
    color: white;
  }
  &:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
```

## 贰

### 预览

<div class="c-decoration">麓下雪</div>

### 实现

```vue
<template>
  <div class="c-decoration">麓下雪</div>
</template>

<style lang="scss" scoped>
.c-decoration {
  @apply relative w-fit px-[2px] cursor-pointer;
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 66%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 0.2s cubic-bezier(0, 0.8, 0.13, 1);
    background-color: rgba(79, 192, 141, 0.5);
  }

  &:hover::after {
    top: 0;
  }
}
</style>
```


<style lang="scss">
.one-hover-animation {
  transition: all 0.4s;
  display: inline-block;
  width: fit-content;
  position: relative;
  margin-top: 10px;
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  border-width: 4px;
  border-style: solid;
  border-color: black;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    width: 0px;
    z-index: -1;
    background: black;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }
  &:hover {
    color: white;
  }
  &:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}

.c-decoration {
  @apply relative w-fit px-[2px] mt-[10px] cursor-pointer;
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 66%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 0.2s cubic-bezier(0, 0.8, 0.13, 1);
    background-color: rgba(79, 192, 141, 0.5);
  }

  &:hover::after {
    top: 0;
  }
}
</style>

