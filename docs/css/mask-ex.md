---
outline: deep
---

# mask 实例

## 壹

<div class="container relative w-[480px] h-[240px]">
  <div class="img1" />
  <div class="img2" />
</div>

## 贰

<div class="container-2" />

<style lang="scss" scoped>
@keyframes maskMove {
    from {
        mask-position: 0 0;
    }
    to {
        mask-position: 100% 0;
    }
}

.img1 {
  @apply absolute w-full h-full left-0 top-0;
  background: url(https://snowinlu.oss-cn-beijing.aliyuncs.com/wallhaven-2ed8qx.jpg);
  background-size: cover;
}

.img2 {
  @apply absolute w-full h-full left-0 top-0;

  background: url(https://snowinlu.oss-cn-beijing.aliyuncs.com/wallhaven-73wyk9.jpg);
  background-size: cover;
  mask: url(https://i.imgur.com/AYJuRke.png);
  mask-size: 3000% 100%;
  animation: maskMove 3s steps(29) infinite;
}

.container-2 {
  @apply w-[480px] h-[200px];
  position: relative;
  background: url(https://snowinlu.oss-cn-beijing.aliyuncs.com/wallhaven-73wyk9.jpg);
  background-size: cover;

  &::before {
    position: absolute;
    content: "";
    top: 0;left: 0; right: 0;bottom: 0;
    background: url(https://snowinlu.oss-cn-beijing.aliyuncs.com/wallhaven-2ed8qx.jpg);
    background-size: cover;
    mask: linear-gradient(45deg, #000 40%, transparent 60%);
  }
}
</style>