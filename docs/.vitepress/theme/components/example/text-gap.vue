<script setup></script>

<template>
  <div class="text-gap" data-text="Text Crack">
    <span>Text Crack</span>
  </div>
</template>

<style lang="scss" scoped>
@keyframes text-gap {
  0% {
    transform: translateY(-1px);
    filter: blur(1px);
  }

  12% {
    transform: translateY(0px);
  }

  21% {
    transform: translateY(1px);
  }

  35% {
    transform: translateY(0px);
    filter: none;
  }

  42% {
    transform: translateY(-1px);
    filter: blur(1px);
  }

  53% {
    transform: translateY(0px);
  }

  65% {
    transform: translateY(1px);
    filter: none;
  }

  74% {
    transform: translateY(0px);
    filter: blur(1px);
  }

  82% {
    transform: translateY(-1px);
  }

  100% {
    transform: translateY(0px);
    filter: none;
  }
}

.text-gap {
  @apply text-[40px];

  animation: text-gap 1s linear forwards;

  span {
    clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
  }
}

.text-gap::before,
.text-gap::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

.text-gap::before {
    // animation: crack1 2.5s linear forwards;
    clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

.text-gap::after {
    // animation: crack2 2.5s linear forwards;
    clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

</style>
