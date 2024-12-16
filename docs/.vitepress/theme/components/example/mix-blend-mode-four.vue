<script setup></script>

<template>
  <div class="w-full relative mt-[20px] bg-black h-[200px]">
    <div
      class="glitch-art absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[60px] text-white"
      data-word="404"
    >
      404
      <div class="white" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes whiteMove {
  8% {
    top: 90px;
  }
  14% {
    top: 12px;
  }
  20% {
    top: 42px;
  }
  32% {
    top: 2px;
  }
  99% {
    top: 90px;
  }
}

@keyframes redShadow {
  20% {
    height: 80px;
  }
  60% {
    height: 12px;
  }
  100% {
    height: 90px;
  }
}

@keyframes redHeight {
  20% {
    height: 90px;
  }
  35% {
    height: 24px;
  }
  50% {
    height: 40px;
  }
  60% {
    height: 36px;
  }
  70% {
    height: 24px;
  }
  80% {
    height: 12px;
  }
  100% {
    height: 0px;
  }
}

.white {
  position: absolute;
  left: -10px;
  width: 100%;
  height: 4px;
  background: #000;
  z-index: 4;
  animation: whiteMove 3s ease-out infinite;
}

.glitch-art {
  &::before {
    content: attr(data-word);
    animation: redShadow 1s ease-in infinite;
    filter: contrast(200%);
    text-shadow: 1px 0 0 red;

    @apply absolute top-0 left-[0.5px] h-0 text-[rgba(255,255,255,0.9)] overflow-hidden z-[2];
  }

  &::after {
    content: attr(data-word);
    animation: redHeight 1.5s ease-out infinite;
    filter: contrast(200%);
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: darken;

    @apply absolute top-0 left-[-3px] h-[60px] text-[rgba(255,255,255,0.8)] overflow-hidden z-[3] bg-[rgba(0,0,0,0.9)];
  }
}
</style>
